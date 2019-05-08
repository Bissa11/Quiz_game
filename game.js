const question = document.getElementById("question");
const options = Array.from(document.getElementsByClassName("option-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");
const loader = document.getElementById("loader");
const game = document.getElementById("game");
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [];

const correctBonus = 10;
const maxQuestions = 10;

/*** API ***/
fetch(
  "https://opentdb.com/api.php?amount=10&category=18&type=multiple" //Computers, mix
  //"https://opentdb.com/api.php?amount=10&category=23&type=multiple" //History, mix
  //"https://opentdb.com/api.php?amount=10&category=9&difficulty=medium&type=multiple" //General knowledge, medium
  //"https://opentdb.com/api.php?amount=10&category=10&difficulty=easy&type=multiple" //Books, easy
)
  .then(function(res) {
    return res.json();
  })
  .then(function(loadedQuestions) {
    //console.log(loadedQuestions.results);
    questions = loadedQuestions.results.map(function(loadedQuestion) {
      const formattedQuestion = {
        question: loadedQuestion.question
      };

      const answerOptions = [...loadedQuestion.incorrect_answers];
      formattedQuestion.answer = Math.floor(Math.random() * 3) + 1;
      answerOptions.splice(
        formattedQuestion.answer - 1,
        0,
        loadedQuestion.correct_answer
      );

      answerOptions.forEach(function(option, index) {
        formattedQuestion["option" + (index + 1)] = option;
      });

      return formattedQuestion;
    });

    startGame();
  })
  .catch(function(err) {
    console.error(err);
  });


//Start game
const startGame = function() {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  getNewQuestion();
  game.classList.remove("hidden");
  loader.classList.add("hidden");
};


//Load new question
const getNewQuestion = function() {
  if (availableQuestions.length === 0 || questionCounter >= maxQuestions) {
    localStorage.setItem("mostRecentScore", score);
    //go to the end page
    return window.location.assign("/end.html");
  }
  questionCounter++;
  progressText.innerText = `Question ${questionCounter}/${maxQuestions}`;
  //updating progress bar
  progressBarFull.style.width = `${(questionCounter / maxQuestions) * 100}%`;

  //randomizer
  const questionIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionIndex];
  question.innerHTML = currentQuestion.question;

  options.forEach(function(option){
    const number = option.dataset["number"];
    option.innerHTML = currentQuestion["option" + number];
  });

  availableQuestions.splice(questionIndex, 1);
  acceptingAnswers = true;
};

//Event for each question: correct/incorrect
options.forEach(function(option) {
  option.addEventListener("click", 
  function(event) {
    if (!acceptingAnswers) return;
    acceptingAnswers = false;
    const selectedOption = event.target;
    const selectedAnswer = selectedOption.dataset["number"];

    const classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "correct") {
      incrementScore(correctBonus);
    }

    selectedOption.parentElement.classList.add(classToApply);

    setTimeout(function(){
      selectedOption.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  }
  );
});

//Increment score
const incrementScore = function(num) {
  score += num;
  scoreText.innerText = score;
  console.log(score);
};
