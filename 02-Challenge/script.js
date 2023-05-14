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

let currentQuestionIndex = 0;
let score = 0;

function startQuiz () {
  currentQuestionIndex = 0;
  score = 0;
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
  }else{
    selectedBtn.classList.add("incorrect");
  }
}

startQuiz();