import React from "react";
import '../App.css';
import { capitalizeFirstLetter } from "../helper/helper";

export default function Startup(props){
    const {startQuiz, renderOptions, options} = props

    return (
        <div className="startup">
            <h1>Quizzical</h1>
            <p>A quiz to test your wit!</p>
            <button className="start-btn btn" onClick={startQuiz}>Start Quiz</button>
            
            <button className="options-btn btn" onClick={renderOptions}>Options</button>
            <span className="options-text">{options.numberOfQuestions} Questions from {options.category.name} on {capitalizeFirstLetter(options.difficulty)} Difficulty</span>
        </div>

    )
}

//