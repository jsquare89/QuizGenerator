import React from "react";

export default function Difficulty(props){

    const {value, isSelected, selectedDifficulty} = props

    function getClassName(){
        return isSelected ? "btn option-btn option-selected" : "btn option-btn"
    }

    return (
        <button className={getClassName()} onClick={selectedDifficulty}>{value}</button>
    )
}