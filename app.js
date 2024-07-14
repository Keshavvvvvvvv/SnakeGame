
// game const and variables
let inputDir = {x: 0, y:0};
const foodSound = new Audio("PreReq/music/food.mp3");
const gameOverSound = new Audio("PreReq/music/gameover.mp3");
const moveSound = new Audio("PreReq/music/move.mp3");
const musicSound = new Audio("PreReq/music/music.mp3");
let speed = 6;
let score = 0;
let hiscoreval;
let lastPaintTime = 0;
let snakeArr = [{x: 13, y: 15}];
//let board = document.querySelector(".board");
let food = {x: 6, y: 7};

let highScoreBox = document.getElementById("highScoreBox");
let scoreBox = document.getElementById("scoreBox");



//game functions
function main(cTime) {
    window.requestAnimationFrame(main);
    if((cTime - lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime = cTime;
    gameEngine();
    //console.log(cTime);
}

function isCollide(snake) {
    //bump into yourself
    for (let i = 1; i < snakeArr.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }
        
    }
    //bump into wall
    if (snake[0].x >=18 || snake[0].x <=0 || snake[0].y >=18 || snake[0].y <=0) {
        return true;
    }
}



function gameEngine() {
    // part1: update the snake arr and food
    if (isCollide(snakeArr)) {
        gameOverSound.play();
        musicSound.pause();
        inputDir = {x: 0, y: 0};
        alert("Game Over. Press any key to Play Again!");
        snakeArr = [{x: 13, y: 15}];
        musicSound.play();
        score = 0;
    }

    //eaten food -> food increment & regenerate food
    if(snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
        foodSound.play();
        score += 1;
        if (score > hiscoreval) {
            hiscoreval = score;
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
            highScoreBox.innerHTML = "HighScore: "+ hiscoreval;
        }
        scoreBox.innerHTML = "Score: "+ score;
        snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y});
        food = {x: Math.floor(Math.random() * 16) + 2, y: Math.floor(Math.random() * 16) + 2};
    }

    //moving snake
    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i+1] = {...snakeArr[i]};
        
    }
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    //part2: display the snake and food

    //Display snake
    board.innerHTML = "";
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if (index === 0) {
            snakeElement.classList.add('head');

        }
        else {
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });
    //Display food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}






// main logic starts here
window.requestAnimationFrame(main);
window.addEventListener('keydown', (e) => {
    inputDir = {x: 0, y: 1}; //start game
    moveSound.play();
    switch (e.key) {
        case "ArrowUp":
            //console.log("ArrowUp");
            inputDir.x = 0;
            inputDir.y = -1;
            break;
        case "ArrowDown":
            //console.log("ArrowDown");
            inputDir.x = 0;
            inputDir.y = 1;
            break;
        case "ArrowRight":
            //console.log("ArrowRight");
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        case "ArrowLeft":
            //console.log("ArrowLeft");
            inputDir.x = -1;
            inputDir.y = 0;
            break;

        default:
            break;
    }
})

// let hiscore = localStorage.getItem("hiscore");
// if (hiscore === null) {
//     hiscoreval = 0;
//     localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
// }
// else {
//     hiscoreval = JSON.parse(hiscore);
//     highScoreBox.innerHTML = "HighScore: "+ hiscoreval;
// }
let hiscore = localStorage.getItem("hiscore");
try {
    hiscoreval = JSON.parse(hiscore);
    if (isNaN(hiscoreval)) {
        throw new Error("Invalid high score value");
    }
} catch (e) {
    console.error("Error parsing hiscore from localStorage:", e);
    hiscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
}
highScoreBox.innerHTML = "HighScore: " + hiscoreval;


