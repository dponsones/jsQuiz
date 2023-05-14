const questions = [
  {
    question: "What does HTML stand for?",
    answers: [
      { text: "Hyper Text Markup Language", correct: true },
      { text: "Hyper Text Makeup Language", correct: false },
      { text: "Huge Text Markup Language", correct: false },
      { text: "Hyper Textile Markup Language", correct: false },
    ],
  },
  {
    question: "What does OOP stand for",
    answers: [
      { text: "Object Oriented Programming", correct: true },
      { text: "Object Oriented Programming", correct: false },
      { text: "Object Oriented Programming", correct: false },
      { text: "Object Oriented Programming", correct: false },
    ],
  },
  {
    question: "Which one is an example of a string?",
    answers: [
      { text: "String", correct: true },
      { text: "5", correct: false },
      { text: "3.14", correct: false },
      { text: "Boolean", correct: false },
    ],
  },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const timerElement = document.getElementById("timer");
const initialsInput = document.getElementById("initials");
const saveButton = document.getElementById("save-btn");
const highScoresList = document.getElementById("high-scores-list");

let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 60;
let timerIntervalId;

function startQuiz () {
  currentQuestionIndex = 0;
  score = 0;
  timeLeft = 60;
  timerIntervalId = setInterval(updateTimer, 1000);
  nextButton.innerHTML = "Next";
  showQuestion();
}

function showQuestion(){
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.answers.forEach (answer => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);
    if(answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

function resetState(){
  nextButton.style.display = "none";
  while(answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if(isCorrect){
    selectedBtn.classList.add("correct");
    score++; 
  }else{
    selectedBtn.classList.add("incorrect");
    timeLeft -= 10; // subtract 10 seconds for incorrect answer
  }
  Array.from(answerButtons.children).forEach(button => {
    if(button.dataset.correct === "true"){
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}

function showScore(){
  resetState();
  questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
  nextButton.innerHTML = "Play Again";
  nextButton.style.display= "block";
}

function handleNextButton(){
  currentQuestionIndex++;
  if(currentQuestionIndex < questions.length){
    showQuestion();
  }else{
    showScore();
  }
}


function updateTimer() {
  timeLeft--;
  timerElement.innerHTML = `Time left: ${timeLeft}s`;
  if (timeLeft <= 0) {
    clearInterval(timerIntervalId);
    showScore();
  }
}

function saveScore() {
  const initials = initialsInput.value;
  if (initials !== "") {
    const highScore = { initials, score };
    let highScores = JSON.parse(localStorage.getItem("highScores")) || [];
    highScores.push(highScore);
    highScores.sort((a, b) => b.score - a.score);
    highScores = highScores.slice(0, 5); // keep only top 5 scores
    localStorage.setItem("highScores", JSON.stringify(highScores));
    showHighScores();
  }
}

function showHighScores() {
  let highScores = JSON.parse(localStorage.getItem("highScores")) || [];
  highScoresList.innerHTML = "";
  highScores.forEach(highScore => {
    const li = document.createElement("li");
    li.innerHTML = `${highScore.initials}: ${highScore.score}`;
    highScoresList.appendChild(li);
  });
  quizContainer.innerHTML = "";
}
nextButton.addEventListener("click", ()=>{
  if(currentQuestionIndex < questions.length){
    handleNextButton();
  }else{
    startQuiz();
  }
})


startQuiz();