import React from "react";
import '../App.css';
import Question from './Question'
import {nanoid} from 'nanoid'
import shuffle from "../helper/shuffle";
import htmlDecode from "../helper/htmlDecode";
import Confetti from "react-confetti"

export default function Quiz(props){

    const [questions, setQuestions] = React.useState([])
    const [messageElement, setMessageElement] = React.useState()
    const [isChecked, setIsChecked] = React.useState(false)
    const [wonConfetti, setWonConfetti] = React.useState()

    React.useEffect(() =>{
        if(props.loaded) {
            setQuestions(getAllQuestions())
            setMessageElement(null);
        }   // eslint-disable-next-line
    }, [props.loaded])

    function getAllQuestions(){
        return props.data.map(q => ({
            id: nanoid(),
            question: htmlDecode(q.question),
            correctAnswer: htmlDecode(q.correct_answer),
            answers: getAllAnswers(q.correct_answer, q.incorrect_answers)
        }))
    }

    function getAllAnswers(correctAnswer, incorrectAnswers){
        const array = shuffle([correctAnswer, ...incorrectAnswers])
        return array.map(ans => ({id: nanoid(), answer: htmlDecode(ans), isSelected: false}))
    }

    function selectedAnswer(selectedQuestionId, selectedAnswerId){
        setQuestions(prevQuestions => prevQuestions.map(q => {
            if(selectedQuestionId === q.id ){
                return {...q, answers: q.answers.map(a => setIsSeletedOnAnswerArray(selectedAnswerId, a))}
            }else{
                return {...q}
            }
        }))
    }

    function setIsSeletedOnAnswerArray(selectedAnswer, answerObj){
        return selectedAnswer === answerObj.answer ? {...answerObj, isSelected:true} : {...answerObj, isSelected:false}
    }



    let elements = []
    let checkAnswersButton = null
    if(props.loaded){
        elements = questions.map(q => 
            <Question key={q.id} 
                      id={q.id}
                      question={q.question}
                      correctAnswer={q.correctAnswer}
                      answers={q.answers}
                      selectedAnswer={selectedAnswer}
                      isChecked={isChecked}
            />
        )
        checkAnswersButton = <button className="btn quiz-btn" onClick={checkAnswers}>Check Answers</button>        
    }
    

    function checkAnswers(){
        let correctAnswerCount = 0

        questions.forEach(q => {
            q.answers.forEach(a => {
                if(a.isSelected && q.correctAnswer === a.answer ){
                    correctAnswerCount++
                }
            })
        })
        setMessageElement(<span className="message-text">You scored {correctAnswerCount}/{questions.length} correct answers</span>)
        if(correctAnswerCount === questions.length){
            setWonConfetti(<Confetti />)
        }
        
        setIsChecked(true)
    }

    return ( 
            <div className="quiz">
                {wonConfetti}
                {props.loaded ? elements : <h1>Loading...</h1>}
                <div className="bottom-quiz">
                    {messageElement}
                    {!isChecked ? checkAnswersButton : <button className="btn quiz-btn" onClick={props.resetGame}>Play Again</button>} 
                </div>
            </div>
    )
}