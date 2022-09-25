import React from "react";
import '../App.css';
import htmlDecode from "../helper/htmlDecode";
import Answer from "./Answer";

export default function Question(props){

    const answerElements = getAllAnswerElements()

    function getAllAnswerElements(){
        return props.answers.map((a) =>
            <Answer key={a.id} 
                    answer={a.answer}
                    isSelected={a.isSelected}
                    isChecked={props.isChecked}
                    correctAnswer={props.correctAnswer}
                    selectedAnswer={() => props.selectedAnswer(props.id, a.answer)} 
            />
        )
    }

    return (
        <div className="question">
            <span className="question-text">{htmlDecode(props.question)}</span>
            <div className="answers">
                {answerElements}
            </div>
            <hr className="rounded"></hr>
        </div>
    )
}