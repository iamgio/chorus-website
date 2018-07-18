function addAnswer(question, answer) {
    var div = document.getElementById("container");
    var answerDiv = document.createElement("div");
    answerDiv.className = "answer-container";
    var questionH = document.createElement("h3");
    var answerP = document.createElement("p");
    questionH.innerHTML = question;
    answerP.innerHTML = answer;
    answerDiv.appendChild(questionH);
    answerDiv.appendChild(answerP);
    div.appendChild(answerDiv);
    div.appendChild(answerDiv);
    document.body.appendChild(div);
}
