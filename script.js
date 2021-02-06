const $container = document.getElementById('container');
const $timer = document.getElementById('timer');
const $counterNumber = document.getElementById('counter-number');
const $clicker = document.getElementById('clicker');
const $message = document.getElementById('message');
const $timerScore = document.getElementById('timer-score');
const $reloadButton = document.getElementById('reload');
const $startButton = document.getElementById('start');

const maxTime = 5;
const winScore = 10;

let clicks;
let timerNumber;
let timeInterval;

const init = (e) => {
    const fromButtonId = e.target.id;
    clicks = 0;
    timerNumber = maxTime;
    $timer.innerHTML = timerNumber;
    $counterNumber.innerHTML = clicks;
    $message.classList.remove('message--failed');
    $message.classList.remove('message--success');
    $startButton.remove();

    if (fromButtonId === 'start') {
        timeInterval = setInterval(countDownTime, 1000);
        $container.classList.add('started');
    }
}

const reload = (e) => {
    const fromButtonId = e.target.id;
    clicks = 0;
    timerNumber = maxTime;
    $timer.innerHTML = timerNumber;
    $counterNumber.innerHTML = clicks;
    $timerScore.innerHTML = ``;
    $message.classList.remove('message--failed');
    $message.classList.remove('message--success');
    timeInterval = setInterval(countDownTime, 1000);
    $container.classList.add('started');
}

const countDownTime = () => {
    timerNumber--;
    $timer.innerHTML = timerNumber;
    checkGameState();
}

const countUpClicks = () => {
    if ($container.classList.contains('started')) {
        clicks++;
        $counterNumber.innerHTML = clicks;
        checkGameState();
    } else {
        alert('You must click on the button first to start game!')
    }
}

const checkGameState = () => {
    if (timerNumber === 0) {
        stopGame();
        if (clicks < winScore) {
            $message.classList.add('message--failed');
        }
    }

    if (clicks >= winScore) {
        stopGame();
        $message.classList.add('message--success');
        $timerScore.innerHTML = `Your time: ${(maxTime - timerNumber)} seconds.`;
    }
}

const stopGame = () => {
    clearInterval(timeInterval);
    $container.classList.remove('started');
}

$clicker.addEventListener("click", countUpClicks);
$reloadButton.addEventListener("click", reload);
$startButton.addEventListener("click", init);