import './App.css';
import Startup from './components/Startup'
import Quiz from './components/Quiz'
import React from 'react';
import RenderBlob from './components/RenderBlob';
import Options from './components/Options';
import getApiUrl from './helper/opentdbApiUrlBuilder';

function App() {

  const [quizStarted, setQuizStarted] = React.useState(false)
  const [data, setData] = React.useState([])
  const [loaded, setLoaded] = React.useState(false)
  const [options, setOptions] = React.useState({numberOfQuestions: 5, difficulty: "medium", category: {id: "", name:"Multiple", isSelected: true}})
  const [categories, setCategories] = React.useState([])
  
  const [optionsSelected, setOptionsSelected] = React.useState(false)

  function startQuiz(){
    setQuizStarted(prevQuizStarted => !prevQuizStarted)
  }

  const shouldGetQuestions = React.useRef(true)

  React.useEffect(() => {
    loadCategoriesAsync()    
  },[])

  React.useEffect(()=> {
    if(quizStarted && shouldGetQuestions.current){
      shouldGetQuestions.current = false;
      loadQuestionsAsync()
    }
  }, [quizStarted])

  async function loadQuestionsAsync(){
    const url = getApiUrl(options.numberOfQuestions, options.category.id, options.difficulty.toLowerCase())
    const response = await fetch(url)
    const data = await response.json()
    setData(data.results)
    setLoaded(true)
  }
  
  async function loadCategoriesAsync(){
    const url = "https://opentdb.com/api_category.php"
    const response = await fetch(url)
    const data = await response.json()
    const categories = data.trivia_categories.map(c => {
      return {...c, isSelected: false}
    })
    categories.unshift({id: "", name:"Multiple", isSelected: true})
    setCategories(categories)
  }

  

  // Using fetch promise - prefer async/await leaving here for reference
  // function loadQuestions(){
  //   fetch(apiUrl)
  //   .then(response => response.json())
  //   .then(data => setQuestions(data.results))
  // }

  function resetGame(){
        setQuizStarted(false)
        setLoaded(false)
        shouldGetQuestions.current = true
  }

  function configureOptions(numberOfQuestions, difficulty, category){
    setOptions({
        numberOfQuestions: numberOfQuestions,
        difficulty: difficulty,
        category: category
    })
    setOptionsSelected(false)
  }

  function renderOptions(){
    setOptionsSelected(true)
  }

  function selectedCategory(category){
        setCategories(prevCategories => prevCategories.map(c => category.name === c.name ?
                                                                  {...c, isSelected:true} :
                                                                  {...c, isSelected:false} ))
  }

  
  return (
    <div className="app">
      <RenderBlob />
      {
        quizStarted && <Quiz data={data} 
                             loaded={loaded}
                             resetGame={resetGame} /> 
      }
      {!quizStarted && (optionsSelected ? <Options configureOptions={configureOptions} 
                                                   categories={categories}
                                                   selectedCategory={selectedCategory}
                                          /> : 
                                          <Startup startQuiz={startQuiz}
                                                   renderOptions={renderOptions}
                                                   options={options}
                                                   categories={categories}
                                          />)}
    </div>
  );
}

export default App;
