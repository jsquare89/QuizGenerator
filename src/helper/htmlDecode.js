export default function htmlDecode(input){
    var e = document.createElement('span');
    e.className ="question-text"
    e.innerHTML = input;
    // handle case of empty input
    return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
}