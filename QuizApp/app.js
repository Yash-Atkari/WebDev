let timerButtons = document.querySelectorAll(".timer");

let answers = ["Paris", "Mars", "William Shakespeare", "100°C", "Blue Whale"];
let score = 0;

function startCountDown(button, duration) {
    let count = duration;
    button.innerText = count;
    let intervalId = setInterval(() => {
        count--;
        button.innerText = count;
        if(count <= 0) {
            clearInterval(intervalId);
        }
    }, 1000);  

    setTimeout(() => {
        clearInterval(intervalId);
        toggleOptions(button, "disable");
    }, duration * 1000);
}

function toggleOptions(button, action) {
    let options = document.querySelectorAll(`.${button.classList[1]}`);
    options.forEach((option) => {
        if (action === "show") {
            option.style.display = "block";
        } else if (action === "disable") {
            option.disabled = true;
        }
    });
}

function updateColor(className, ans) {
    let options = document.querySelectorAll(`.${className}`);
    options.forEach((option) => {
        if(option.innerText !== ans) {
            option.style.backgroundColor = "red";
        } else {
            option.style.backgroundColor = "green";
            option.style.color = "white";
        }
    });
}

function updateScore() {
    score++;
    let scoreBoard = document.querySelector(".score");
    scoreBoard.innerText = score;
}

function attemptQuiz(button) {
    let idx = button.classList[1].charAt(1);
    let ans = answers[idx-1];
    let options = document.querySelectorAll(`.${button.classList[1]}`);
    options.forEach((option) => {
        option.addEventListener("click", () => {
            if(option.innerText == ans) {
                updateScore();
                updateColor(option.classList[0], ans);
            }
            updateColor(option.classList[0], ans);
        });
    });
}

timerButtons.forEach((button) => {
    button.addEventListener("click", () => {
        toggleOptions(button, "show");
        startCountDown(button, 10);
        attemptQuiz(button);
    });
});
