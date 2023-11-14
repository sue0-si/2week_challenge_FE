let timer;
let remaining;
let hours, minutes, seconds = 0;

function startTimer() {
    hours = parseInt(document.getElementById('hours').value) || 0;
    minutes = parseInt(document.getElementById('minutes').value) || 0;
    seconds = parseInt(document.getElementById('seconds').value) || 0;

    if (hours > 60 || minutes > 60 || seconds > 60) {
        alert("Time input should be less than 60")
        return;
    } else if (hours < 0 || minutes < 0 || seconds < 0) {
        alert("Time should be over 1 second")
        return;
    }
    
    document.getElementById('input').style.display = 'none';
    document.getElementById('displayed').style.display = 'block';
    
    timer = setInterval(() => {
        if (seconds != 0) {
            seconds--;
            displayTime();
        } else {
            if (minutes != 0) {
                minutes--;
                seconds = 59;
            } else {
                if (hours != 0) {
                    hours--;
                    minutes = 59;
                }
            }  
        }
        displayTime();
    }, 1000);
}

function stopTimer() {
    clearInterval(timer);
    displayTime();
}

function resetTimer() {
    clearInterval(timer);
    document.getElementById('input').style.display = 'flex';
    document.getElementById('input').style.flexDirection = 'row';
    document.getElementById('displayed').style.display = 'none';

}

function displayTime() {
    document.getElementById('timer').innerHTML = `${hours} : ${minutes} : ${seconds}`;
}

document.getElementById('startButton').addEventListener('click', startTimer);
document.getElementById('stopButton').addEventListener('click', stopTimer)
document.getElementById('resetButton').addEventListener('click', resetTimer);
