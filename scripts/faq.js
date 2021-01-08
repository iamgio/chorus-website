function addAnswer(question, answer) {
    const div = document.getElementById("container");
    const answerDiv = document.createElement("div");
    answerDiv.className = "answer-container";
    const questionH = document.createElement("h3");
    const answerP = document.createElement("p");
    questionH.innerHTML = question;
    answerP.innerHTML = answer;
    answerDiv.appendChild(questionH);
    answerDiv.appendChild(answerP);
    div.appendChild(answerDiv);
    div.appendChild(answerDiv);
    document.body.appendChild(div);
}
