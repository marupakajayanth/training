const questions = [
    {
        question: "Which of the following is a core TechNova value?",
        options: ["Speed", "Sustainability", "Security", "Style"],
        correctAnswer: 2,
        explanation: "Security is a core value at TechNova due to our enterprise clients."
    },
    {
        question: "What is the standard time-off policy for new hires?",
        options: ["15 days", "20 days", "25 days", "Unlimited"],
        correctAnswer: 1,
        explanation: "All new employees start with 20 days of paid time off."
    },
    {
        question: "Where can you find the official company documentation?",
        options: ["In an email", "On the intranet portal", "In a shared drive", "Ask your manager"],
        correctAnswer: 1,
        explanation: "The intranet portal is the single source of truth for all company docs."
    },
    {
        question: "What's the company's policy on remote work?",
        options: ["Fully remote", "Hybrid model (3 days in-office)", "Fully in-office", "Varies by team"],
        correctAnswer: 3,
        explanation: "Remote work policies are determined at the team level."
    },
    {
        question: "Which department handles IT support requests?",
        options: ["Human Resources", "Operations", "InfoSec", "Tech Support"],
        correctAnswer: 3,
        explanation: "Please file a ticket with the Tech Support team for any IT issues."
    }
];
// Fisher-Yates shuffle algorithm
function shuffleArray(array) {
    
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; 
    }
}

const welcomeScreen = document.getElementById('welcome-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultScreen = document.getElementById('result-screen');

const startBtn = document.getElementById('start-btn');
const retakeBtn = document.getElementById('retake-btn');

const scoreTracker = document.getElementById('score-tracker');
const progressBar = document.getElementById('progress-bar');
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const feedbackText = document.getElementById('feedback-text');

const finalScore = document.getElementById('final-score');
const timeTakenDisplay = document.getElementById('time-taken');
const resultMessage = document.getElementById('result-message');

let currentQuestionIndex = 0;
let score = 0;
let startTime;

function startQuiz() {
    startTime = Date.now();
    shuffleArray(questions);
    currentQuestionIndex = 0;
    score = 0;
    progressBar.style.width = '0%';
    welcomeScreen.classList.add('hidden');
    resultScreen.classList.add('hidden');
    quizScreen.classList.remove('hidden');
    showQuestion();
}

function showQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    

    scoreTracker.textContent = `Score: ${score}`;
    questionText.textContent = currentQuestion.question;
    optionsContainer.innerHTML = '';
    feedbackText.textContent = '';

    currentQuestion.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.textContent = option;
        button.dataset.index = index;
        button.addEventListener('click', selectAnswer);
        optionsContainer.appendChild(button);
    });
}
// added sound functionality
function playBeepSound(frequency = 800, duration = 200, isCorrect = true) {
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(isCorrect ? 800 : 400, audioContext.currentTime);
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration / 1000);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + duration / 1000);
    } catch (error) {
        console.log("Web Audio API not supported");
    }
}

function selectAnswer(event) {
    const selectedButton = event.target;
    const selectedIndex = parseInt(selectedButton.dataset.index);
    const correctIndex = questions[currentQuestionIndex].correctAnswer;
    
    Array.from(optionsContainer.children).forEach(button => {
        button.disabled = true;
        if (parseInt(button.dataset.index) === correctIndex) {
            button.classList.add('correct');
        }
    });

    if (selectedIndex === correctIndex) {
        score++;
        feedbackText.textContent = "Correct! " + questions[currentQuestionIndex].explanation;
        
            playBeepSound(800, 200, true);
        
        
       
    } else {
        selectedButton.classList.add('incorrect');
        feedbackText.textContent = "Incorrect. " + questions[currentQuestionIndex].explanation;
        
            playBeepSound(400, 300, false);
        
    }
    const progressPercent = ((currentQuestionIndex+1) / questions.length) * 100;
    progressBar.style.width = `${progressPercent}%`;

    setTimeout(nextQuestion, 2000);
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    quizScreen.classList.add('hidden');
    resultScreen.classList.remove('hidden');
    const endTime = Date.now();
    const timeTaken = Math.round((endTime - startTime) / 1000);
    finalScore.textContent = `You scored ${score} out of ${questions.length}.`;
    timeTakenDisplay.textContent = `Time taken: ${timeTaken} seconds`;
    let message = '';
    if (score === 5) {
        message = "Excellent! You’re off to a great start.";
    } else if (score >= 3) {
        message = "Nice job! Review our documentation to improve.";
    } else {
        message = "Don’t worry — visit our onboarding resources again.";
    }
    resultMessage.textContent = message;
}

function showWelcomeScreen() {
    resultScreen.classList.add('hidden');
    welcomeScreen.classList.remove('hidden');
}

startBtn.addEventListener('click', startQuiz);
retakeBtn.addEventListener('click', showWelcomeScreen);