// array of questions/options
var questions = [
    {
        question: "What does DOM stand for?",
        options: ["a. Document Object Model", "b. Data Ordered Modem", "c. Dumb Old Me", "d. Data Object Model"],
        answer: "a. Document Object Model"
    },
    {
        question: "What does HTML stand for?",
        options: ["a. Holy Text Markup Language", "b. Hyper Text Makeup Language", "c. Hyper Text Markup Language", "d. How To Make Lyrics"],
        answer: "c. Hyper Text Markup Language"
    },
    {
        question: "____ is very useful tool to use when you do not understand something.",
        options: ["a. Google", "b. Thoughts and Prayers", "c. Crying", "d. Giving Up"],
        answer: "a. Google"
    },
    {
        question: "String values must be enclosed within _____ when being assigned to variables.",
        options: ["a. loving arms", "b. quotes", "c. curly brackets", "d. parenthesis"],
        answer: "b. quotes"
    },
    {
        question: "Arrays in JavaScript can be used to store _____.",
        options: ["a. numbers and strings", "b. other arrays", "c. booleans", "d. all of the above"],
        answer: "d. all of the above"
    },
    {
        question: "Commonly used data types DO NOT include:",
        options: ["a. strings", "b. booleans", "c. alerts", "d. numbers"],
        answer: "c. alerts"
    },
    {
        question: "The first index of an array is ____.",
        choices: ["a. first", "b. 1", "c. 8", "d. 0"],
        answer: "d. 0"
    },
]

// declare variables
var quizWrapperEl = document.getElementById("quizwrapper");

var timerEl = document.getElementById("timer");
var timeLeftEl = document.getElementById("timeleft");

var infoEl = document.getElementById("info");
var startBtnEl = document.getElementById("start-btn");

var quizDivEl = document.getElementById("quiz");
var questionEl = document.getElementById("question");
var optionAEl = document.getElementById("btn1");
var optionBEl = document.getElementById("btn2");
var optionCEl = document.getElementById("btn3");
var optionDEl = document.getElementById("btn4");
var checkAnswerEl = document.getElementById("checkanswer");

var endScreenEl = document.getElementById("endscreen");
var initialSubmitBtnEl = document.getElementById("initial-btn");
var initialInputEl = document.getElementById("initials");

var highScorePageEl = document.getElementById("scorepage");
var finalScoreEl = document.getElementById("finalscore");

var goBackEl = document.getElementById("reset");
var clearHighScoresEl = document.getElementById("clear");
var viewHighScoresEl = document.getElementById("highscores");
var highScoreListEl = document.getElementById("highscorelist");

var correctAnswers = 0;
var questionNumber = 0;
var results;
var questionIndex = 0;


// functions

// when start button is clicked, timer starts
startBtnEl.addEventListener("click", newQuiz);

var timeTotal = 90;
function newQuiz() {
    questionIndex = 0;
    timeTotal = 90;
    timeLeftEl.textContent = timeTotal;
    initialInputEl.textContent = "";

    infoEl.style.display = "none";
    quizDivEl.classList.replace("hide", "show");

    var startTimer = setInterval(function() {
        timeTotal--;
        timeLeftEl.textContent = timeTotal;
        if(timeTotal <= 0) {
            clearInterval(startTimer);
            if (questionIndex < questions.length - 1) {
                gameOver();
            }
        }
    },1000);
}