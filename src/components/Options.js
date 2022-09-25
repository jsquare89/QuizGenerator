import { nanoid } from "nanoid";
import React from "react";
import Category from "./Category";
import Difficulty from "./Difficulty";

export default function Options(props){
    const {categories, configureOptions, selectedCategory} = props
    const defaultDifficulty = "Medium"
    const [difficulty, setDifficulty] = React.useState(getDifficulty())

    function getDifficulty(){
        return [{
            id: nanoid(),
            value: "Easy",
            isSelected: false
        },{
            id: nanoid(),
            value: "Medium",
            isSelected: true
        },{
            id: nanoid(),
            value: "Hard",
            isSelected: false
        }]
    }

    function selectedDifficulty(difficulty){
        setDifficulty(prevDifficulty => prevDifficulty.map(d => difficulty.value === d.value ? 
                                                                     {...d, isSelected:true} : 
                                                                     {...d, isSelected: false} ))
    }

    function getDifficultyElements(){
        return difficulty.map(d => <Difficulty key={d.id}
                                                     id={d.id}
                                                     value={d.value}
                                                     isSelected={d.isSelected}
                                                     selectedDifficulty={() => selectedDifficulty(d)}
                                                      />)
    }


    function getCategoryElements(){
        return categories.map(c => <Category key={c.id}
                                             category={c.name}   
                                             isSelected={c.isSelected} 
                                             selectedCategory={() => selectedCategory(c)}
                                    />)
    }

    function getSelectedDifficulty(){
        const obj = difficulty.find(d => d.isSelected)
        return obj !== undefined ? obj.value : defaultDifficulty
    }

    function getSelectedCategory(){
        const obj = categories.find(c => c.isSelected)
        return obj !== undefined ? obj : null
    }

    function saveOptions(){
        configureOptions(5, getSelectedDifficulty(), getSelectedCategory())
    }

    return (
        <div className="options">
            <h3 className="options-style">Please select a difficulty level</h3>
            <div className="difficulty-btns">
                {getDifficultyElements()}
            </div>

            <h3>Please select a category</h3>
            <div className="category-btns">
                {getCategoryElements()}
            </div>
            <button className="btn saveOptions-btn" onClick={saveOptions}>Save Options</button>
        </div>
    )
}