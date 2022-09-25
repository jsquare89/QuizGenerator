import React from "react";

export default function Answer(props){

    const {answer, correctAnswer, isChecked, isSelected, selectedAnswer} = props

    function getClassName(){
        let className = "answer-btn "
    
        if(!isChecked){
            className += ( isSelected? "answer-selected" : "answer-deselected" )
        }else{
            if(answer === correctAnswer){
                className += "answer-correct"
            }else if(isSelected){
                className += "answer-incorrect"
            }else{
                className += "answer-gray"
            } 
        }
        return className
    }

    return (
        <button disabled={isChecked ? true: false} className={getClassName()} onClick={selectedAnswer}>{answer}</button>
    )
}