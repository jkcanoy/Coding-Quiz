// array of questions/options
var questionsArr = [
    {
        question: "What does DOM stand for?",
        options: ["a. Document Object Model", "b. Data Ordered Modem", "c. Dumb Ole Me", "d. Data Object Model"],
        answer: "a. Document Object Model"
    },
    {
        question: "What does HTML stand for?",
        options: ["a. Holy Text Markup Language", "b. Hyper Text Makeup Language", "c. Hyper Text Markup Language", "d. How To Make Lyrics"],
        answer: "c. Hyper Text Markup Language"
    },
    {
        question: "____ is very useful tool to use when you are stuck or do not understand something.",
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
        options: ["a. first", "b. 1", "c. 8", "d. 0"],
        answer: "d. 0"
    }
];

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
var lineBreak = document.getElementById("linebreak");
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
var timeTotal = 75;
function newQuiz() {
    questionIndex = 0;
    timeTotal = 75;
    timeLeftEl.textContent = timeTotal;
    initialInputEl.textContent = "";

    infoEl.classList.replace("info", "hide");
    quizDivEl.classList.replace("hide", "show");

    var startTimer = setInterval(function() {
        timeTotal--;
        timeLeftEl.textContent = timeTotal;
        if(timeTotal === 0 || questionIndex === questionsArr.length) {
            clearInterval(startTimer);
            gameOver ();
        }
    },1000);

    showQuiz();
};

// questions and options appear
function showQuiz() {
    nextQuestion();
}

function nextQuestion() {
    questionEl.textContent = questionsArr[questionIndex].question;
    optionAEl.textContent = questionsArr[questionIndex].options[0];
    optionBEl.textContent = questionsArr[questionIndex].options[1];
    optionCEl.textContent = questionsArr[questionIndex].options[2];
    optionDEl.textContent = questionsArr[questionIndex].options[3];
}

function answerCheck(answer) {

    lineBreak.style.display = "block";
    checkAnswerEl.style.display = "block";

    if(questionsArr[questionIndex].answer === questionsArr[questionIndex].options[answer]) {
        // answer correct add 1 point to final score
        correctAnswers++;
        checkAnswerEl.textContent = "Correct!";
    }   else {
        // wrong answer deduct 10 sec from timer
        timeTotal -= 10;
        timeLeftEl.textContent = timeTotal;
        checkAnswerEl.textContent= "*in Trump voice* Wrong!"
    }

    questionIndex++;
    if (questionIndex < questionsArr.length) {
        nextQuestion();
    } else {
        gameOver();
    }
}

function chooseA() {answerCheck(0);}
function chooseB() {answerCheck(1);}
function chooseC() {answerCheck(2);}
function chooseD() {answerCheck(3);}

optionAEl.addEventListener("click", chooseA);
optionBEl.addEventListener("click", chooseB);
optionCEl.addEventListener("click", chooseC);
optionDEl.addEventListener("click", chooseD);

// end screen with final score and initial submition
function gameOver() {

    endScreenEl.classList.replace("hide", "info");
    quizDivEl.classList.replace("show", "hide");
    timerEl.style.display = "none";

    finalScoreEl.textContent = correctAnswers;
}

// enter initials and store highscore in local storage
function storeHighScore(event) {
    event.preventDefault();

    if (initialInputEl.value === "") {
        alert("Enter your initials please!");
        return;
    }

    endScreenEl.classList.replace("show", "hide");
    highScorePageEl.classList.replace("hide", "info");

    // store in local storage
    var savedScores = localStorage.getItem("high scores")
    var scoresArr ;

    if (savedScores === null) {
        scoresArr = [];
    }  else {
        scoresArr = JSON.parse(savedScores)
    }

    var userScore = {
        initials: initialInputEl.value,
        score: finalScoreEl.textContent
    };

    console.log(userScore);
    scoresArr.push(userScore);

    var scoresArrString = JSON.stringify(scoresArr);
    window.localStorage.setItem("high scores", scoresArrString);

    showHighScores();
}

// show high scores
var i = 0;
function showHighScores() {

    timerEl.style.display = "none";
    infoEl.classList.replace("info", "hide");
    quizDivEl.classList.replace("show", "hide");
    endScreenEl.classList.replace("info", "hide");
    highScorePageEl.classList.replace("hide", "info");

    var savedScores = localStorage.getItem("high scores");

    if (savedScores === null) {
        return;
    }
    console.log(savedScores);
    
    var storedScores = JSON.parse(savedScores);

    for(; i < storedScores.length; i++) {
        var newScores = document.createElement("p");
        newScores.innerHTML = storedScores[i].initials + ": " + storedScores[i].score;
        highScoreListEl.appendChild(newScores);
    }
}

// event listeners
startBtnEl.addEventListener("click", newQuiz);

initialSubmitBtnEl.addEventListener("click", function(event) {
    storeHighScore(event)
});

viewHighScoresEl.addEventListener("click", function(event) {
    showHighScores(event);
});

goBackEl.addEventListener("click", function() {
    timerEl.style.display = "unset";
    infoEl.classList.replace("hide", "info");
    highScorePageEl.classList.replace("info", "hide");
});

clearHighScoresEl.addEventListener("click", function() {
    window.localStorage.removeItem("high scores");
    highScoreListEl.innerHTML = "Scores cleared";
});

