const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: 'What is program management?',
        choice1: 'a process for identifying and prioritizing products, services, or infrastructure programs that best support attainment of the strategic objectives',
        choice2: 'the coordinated management of interdependent projects over a finite period of time to achieve a set of business goals',
        choice3: 'the discipline of planning, organizing, securing, and managing resources to achieve specific goals',
        choice4: 'the oversight of various activities that start from conceiving a product idea, all the way to launching a potentially successful product',
        answer: 2,
    },
    {
        question:
            "Which is a core skill of program management?",
        choice1: "Effective Team Management",
        choice2: "Building Relationships",
        choice3: "Conflict Management",
        choice4: "All of the above",
        answer: 4,
    },
    {
        question: "Which is NOT a constraint of the Iron Triangle?",
        choice1: "Scope",
        choice2: "Schedule",
        choice3: "Quality",
        choice4: "Cost",
        answer: 3,
    },
    {
        question: "Portfolio management is the responsibility of the...",
        choice1: "Program Manager Office",
        choice2: "Portfolio Manager",
        choice3: "Product Mangaer",
        choice4: "Project Manager",
        answer: 1,
    }
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 4

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`
    
    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()