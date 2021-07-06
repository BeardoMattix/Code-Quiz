const question = document.querySelector("#question");
const choices = Array.from(document.querySelectorAll(".choice-text"));
const progressText = document.querySelector("#progressText");
const scoreText = document.querySelector("#score");
const progressBarFull = document.querySelector("#progressBarFull");

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let qeustionCounter = 0;
let availableQuestions = [];

let questions = [
  {
    question: "Which HTML element do we use to link a javascript file?",
    choice1: "<script>",
    choice2: "<js>",
    choice3: "<link>",
    choice4: "<a>",
    answer: 1,
  },
  {
    question: "Commonly used data types do NOT include...",
    choice1: "Strings",
    choice2: "Booleans",
    choice3: "Numbers",
    choice4: "Alerts",
    answer: 4,
  },
  {
    question: "To select an element with an id, you would use:",
    choice1: "document.querySelector",
    choice2: "document.getElementById",
    choice3: "a For loop",
    choice4: "document.addEventListener",
    answer: 2,
  },
  {
    question: "How do you create a function in JavaScript?",
    choice1: "function:myFunction()",
    choice2: "function = myFunction()",
    choice3: "function myFunction()",
    choice4: "All of the above",
    answer: 3,
  },
];

const SCORE_POINTS = 100;
const MAX_QUESTIONS = 4;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  getNewQuestions();
};

getNewQuestions = () => {
  if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);
    return window.location.assign("/pages/end.html");
  }

  questionCounter++;
  progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`;
  progressBarFull.getElementsByClassName.width = `${
    (questionCounter / MAX_QUESTIONS) * 100
  } %`;

  const questionsIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionsIndex];
  question.innerText = currentQuestion.question;

  choices.forEach((choice) => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuestions.splice(questionsIndex, 1);

  acceptingAnswers = true;
};

choices.forEach((choice) => {
  choice.addEventListener("click", (e) => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    let classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "correct") {
      incrementScore(SCORE_POINTS);
    } else decrementScore(SCORE_POINTS);

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestions();
    }, 1000);
  });
});

incrementScore = (num) => {
  score += num;
  scoreText.innerText = score;
};
// Added a function to decrement the score if wrong answer is chosen.
decrementScore = (num) => {
  score -= num;
  scoreText.innerText = score;
  time -= 10;
};

startGame();

// COUNTDOWN TIMER FUNCTION
const startingMinutes = 1;
let time = startingMinutes * 60;

const countdownTimer = document.getElementById("countdown");

setInterval(updatedCountdown, 1000);

function updatedCountdown() {
    const minutes = Math.floor(time / 60);
    let seconds = time % 60;

    seconds = seconds < 10 ? '0' + seconds : seconds;

    countdownTimer.innerHTML = `${minutes}: ${seconds}`;
    time--;
    if(time < 0) {
        alert("GAME OVER!")
        clearInterval(startingMinutes);
        localStorage.setItem("mostRecentScore", score);
        return window.location.assign("/pages/end.html");
    }
}
