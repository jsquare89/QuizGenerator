export default function getApiUrl(numberOfQuestions, category, difficulty){
    return `https://opentdb.com/api.php?type=multiple&amount=${numberOfQuestions}&category=${category}&difficulty=${difficulty}`
}