const startBtn = document.querySelector('#start')
const screens = document.querySelectorAll('.screen')
const timeList = document.querySelector('#time-list')
const timeEl = document.querySelector('#time')
const board = document.querySelector('#board')
const colors = ['#FFA07A', '#DC143C', '#8B0000', '#FF69B4', '#FF1493', '#C71585', '#FF4500', '#FFA500', '#FFD700', '#FFFF00', '#4B0082', '#6A5ACD', '#FF00FF', '#EE82EE', '#800000', '#FF00FF', '#800080', '#00FF00', '#0000FF']
let score = 0
let time = 0
startBtn.addEventListener('click', (event) => {
    event.preventDefault()
    screens[0].classList.add('up')
})
timeList.addEventListener('click', (event) => {
    if (event.target.classList.contains('time-btn')) {
        time = parseInt(event.target.getAttribute('data-time'))
        screens[1].classList.add('up')
        startGame()
    }
})
board.addEventListener('click', event => {
    if (event.target.classList.contains('circle')) {
        score++
        event.target.remove()
        createRandomCircle()
    }
})

function startGame() {
    setInterval(decreaseTime, 1000)
    createRandomCircle()
    setTime(time)
}

function decreaseTime() {
    if (time === 0) {
        finishGame()
    } else {
        let current = --time
        if (current < 10) {
            current = `0${current}`
        }
        setTime(current)
    }
}

function setTime(value) {
    timeEl.innerHTML = `00:${value}`
}

function finishGame() {
    timeEl.parentNode.classList.add('hide')
    board.innerHTML = `<h1>Cчет: <span class="primary"> ${score} </span></h1>`
}

function createRandomCircle() {
    const circle = document.createElement('div')
    const size = getRandomNumber(10, 60)
    const {
        width,
        height
    } = board.getBoundingClientRect()
    const x = getRandomNumber(0, width - size)
    const y = getRandomNumber(0, height - size)
    const randomColors = getRandomColor(circle)
    circle.style.background = randomColors
    circle.classList.add('circle')
    circle.style.width = `${size}px`
    circle.style.height = `${size}px`
    circle.style.top = `${y}px`
    circle.style.left = `${x}px`
    board.append(circle)
}

function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min)
}

function getRandomColor() {
    const index = Math.floor(Math.random() * colors.length)
    return colors[index]
}

function winTheGame() {
    function kill() {
        const circle = document.querySelector('.circle')

        if (circle) {
            circle.click()
        }
    }
    setInterval(kill, 10)   
}