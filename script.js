// --------------------
// 1️⃣ Pages & Elements
// --------------------
const loginPage = document.getElementById("login-page");
const quizSelect = document.getElementById("quiz-select");
const quizPage = document.getElementById("quiz-page");

const loginBtn = document.getElementById("login-btn");
const startQuizBtn = document.getElementById("start-quiz-btn");
const usernameInput = document.getElementById("username");
const displayName = document.getElementById("display-name");

// Quiz elements
const questionEl = document.getElementById("question");
const options = document.getElementsByName("option");
const spans = document.querySelectorAll("#quiz-box span");
const resultEl = document.getElementById("result");
const progressBar = document.getElementById("progress-bar");
const timeEl = document.getElementById("time");
const qnoEl = document.getElementById("qno");
const quizBox = document.getElementById("quiz-box");
const restartBtn = document.getElementById("restart-btn");

// --------------------
// 2️⃣ Variables
// --------------------
let i = 0;
let score = 0;
let time = 10;
let timer;

// --------------------
// 3️⃣ Quiz Data (10 questions)
// --------------------
let quiz = [
  { q: "Which is renewable energy?", a: "Coal", b: "Solar", c: "Petrol", ans: "b" },
  { q: "Which gas causes global warming?", a: "Oxygen", b: "Carbon Dioxide", c: "Nitrogen", ans: "b" },
  { q: "Best way to save water?", a: "Leave tap open", b: "Reuse water", c: "Waste water", ans: "b" },
  { q: "Plastic waste mainly causes?", a: "Air pollution", b: "Water & land pollution", c: "Noise pollution", ans: "b" },
  { q: "Which one is biodegradable?", a: "Plastic bag", b: "Glass bottle", c: "Vegetable waste", ans: "c" },
  { q: "Main source of air pollution in cities?", a: "Trees", b: "Vehicles", c: "Rain", ans: "b" },
  { q: "Which energy source is eco-friendly?", a: "Wind", b: "Diesel", c: "Coal", ans: "a" },
  { q: "Best practice for waste management?", a: "Mix all waste", b: "Burn waste", c: "Segregate waste", ans: "c" },
  { q: "Which helps reduce carbon footprint?", a: "Using public transport", b: "Using plastic", c: "Cutting trees", ans: "a" },
  { q: "Planting trees helps in?", a: "Increasing pollution", b: "Reducing oxygen", c: "Improving air quality", ans: "c" }
];

// --------------------
// 4️⃣ Login Logic
// --------------------
loginBtn.onclick = function () {
    let name = usernameInput.value.trim();
    if (name === "") {
        alert("Please enter your name");
        return;
    }
    displayName.innerText = name;
    loginPage.style.display = "none";
    quizSelect.style.display = "block";
};

// --------------------
// 5️⃣ Start Quiz Logic
// --------------------
startQuizBtn.onclick = function () {
    quizSelect.style.display = "none";
    quizPage.style.display = "block";
    loadQuestion();
};

// --------------------
// 6️⃣ Load Question
// --------------------
function loadQuestion() {
    questionEl.innerText = quiz[i].q;
    spans[0].innerText = quiz[i].a;
    spans[1].innerText = quiz[i].b;
    spans[2].innerText = quiz[i].c;

    qnoEl.innerText = "Question " + (i + 1) + " of " + quiz.length;

    // Progress bar
    progressBar.style.width = (i / quiz.length) * 100 + "%";

    // Reset options
    for (let op of options) op.checked = false;

    // Timer
    clearInterval(timer);
    time = 10;
    timeEl.innerText = time;

    timer = setInterval(() => {
        time--;
        timeEl.innerText = time;
        if (time === 0) {
            clearInterval(timer);
            nextQuestion();
        }
    }, 1000);
}

// --------------------
// 7️⃣ Next Question Logic
// --------------------
function nextQuestion() {
    let selected;
    for (let op of options) {
        if (op.checked) selected = op.value;
    }

    // Score calculation
    if (selected === quiz[i].ans) score++;

    i++;

    if (i < quiz.length) {
        loadQuestion();
    } else {
        finishQuiz();
    }
}

// --------------------
// 8️⃣ Finish Quiz
// --------------------
function finishQuiz() {
    clearInterval(timer);
    quizBox.style.display = "none";
    progressBar.style.width = "100%";

    resultEl.innerText = "Your Score: " + score + " / " + quiz.length;

    if (score >= quiz.length / 2) resultEl.style.color = "green";
    else resultEl.style.color = "red";

    restartBtn.style.display = "inline";
}

// --------------------
// 9️⃣ Restart Quiz
// --------------------
restartBtn.onclick = function () {
    i = 0;
    score = 0;
    quizPage.style.display = "block";
    quizBox.style.display = "block";
    resultEl.innerText = "";
    restartBtn.style.display = "none";
    loadQuestion();
};

// --------------------
// 10️⃣ Next button click inside quiz
// --------------------
document.querySelector("#quiz-box button").onclick = nextQuestion;
