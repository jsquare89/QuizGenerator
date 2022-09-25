import React from "react";

export default function Category(props){

    const {category, isSelected, selectedCategory} = props

    function getClassName(){
        return isSelected ? "btn option-btn option-selected" : "btn option-btn"
    }

    return (
        <button className={getClassName()} onClick={selectedCategory}>{category}</button>
    )
}