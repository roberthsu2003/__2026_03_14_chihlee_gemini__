const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreElement = document.getElementById('score');
const highScoreElement = document.getElementById('highScore');
const gameOverScreen = document.getElementById('gameOver');
const finalScoreElement = document.getElementById('finalScore');

// 遊戲設定
const gridSize = 20;
const tileCount = canvas.width / gridSize;

let snake = [];
let food = {};
let dx = 0;
let dy = 0;
let score = 0;
let highScore = localStorage.getItem('snakeHighScore') || 0;
let gameLoop = null;
let isGameOver = false;
let isPaused = false;

highScoreElement.textContent = highScore;

// 初始化遊戲
function init() {
    snake = [
        {x: 10, y: 10},
        {x: 9, y: 10},
        {x: 8, y: 10}
    ];
    score = 0;
    scoreElement.textContent = score;
    dx = 1;
    dy = 0;
    isGameOver = false;
    isPaused = false;
    gameOverScreen.style.display = 'none';
    generateFood();
}

// 生成食物
function generateFood() {
    food = {
        x: Math.floor(Math.random() * tileCount),
        y: Math.floor(Math.random() * tileCount)
    };
    // 確保食物不會生成在蛇身上
    for (let segment of snake) {
        if (segment.x === food.x && segment.y === food.y) {
            generateFood();
            return;
        }
    }
}

// 更新遊戲狀態
function update() {
    if (isGameOver || isPaused) return;

    const head = {x: snake[0].x + dx, y: snake[0].y + dy};

    // 檢查撞牆
    if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount) {
        gameOver();
        return;
    }

    // 檢查撞到自己
    for (let segment of snake) {
        if (head.x === segment.x && head.y === segment.y) {
            gameOver();
            return;
        }
    }

    snake.unshift(head);

    // 檢查是否吃到食物
    if (head.x === food.x && head.y === food.y) {
        score += 10;
        scoreElement.textContent = score;
        generateFood();
    } else {
        snake.pop();
    }
}

// 繪製遊戲畫面
function draw() {
    // 清空畫布
    ctx.fillStyle = '#0a0a0a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 繪製網格（可選）
    ctx.strokeStyle = '#1a1a1a';
    ctx.lineWidth = 0.5;
    for (let i = 0; i < tileCount; i++) {
        ctx.beginPath();
        ctx.moveTo(i * gridSize, 0);
        ctx.lineTo(i * gridSize, canvas.height);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(0, i * gridSize);
        ctx.lineTo(canvas.width, i * gridSize);
        ctx.stroke();
    }

    // 繪製食物
    ctx.fillStyle = '#e74c3c';
    ctx.beginPath();
    ctx.arc(
        food.x * gridSize + gridSize / 2,
        food.y * gridSize + gridSize / 2,
        gridSize / 2 - 2,
        0,
        Math.PI * 2
    );
    ctx.fill();
    // 食物光暈效果
    ctx.shadowColor = '#e74c3c';
    ctx.shadowBlur = 10;
    ctx.fill();
    ctx.shadowBlur = 0;

    // 繪製蛇
    snake.forEach((segment, index) => {
        if (index === 0) {
            // 蛇頭
            ctx.fillStyle = '#4ecca3';
            ctx.shadowColor = '#4ecca3';
            ctx.shadowBlur = 10;
        } else {
            // 蛇身
            ctx.fillStyle = '#3db892';
            ctx.shadowBlur = 0;
        }

        ctx.fillRect(
            segment.x * gridSize + 1,
            segment.y * gridSize + 1,
            gridSize - 2,
            gridSize - 2
        );

        ctx.shadowBlur = 0;
    });

    // 暫停提示
    if (isPaused) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#fff';
        ctx.font = '30px Microsoft JhengHei';
        ctx.textAlign = 'center';
        ctx.fillText('暫停中', canvas.width / 2, canvas.height / 2);
    }
}

// 遊戲結束
function gameOver() {
    isGameOver = true;
    clearInterval(gameLoop);
    gameLoop = null;

    if (score > highScore) {
        highScore = score;
        localStorage.setItem('snakeHighScore', highScore);
        highScoreElement.textContent = highScore;
    }

    finalScoreElement.textContent = score;
    gameOverScreen.style.display = 'block';
}

// 開始遊戲
function startGame() {
    if (gameLoop) {
        clearInterval(gameLoop);
    }
    init();
    gameLoop = setInterval(() => {
        update();
        draw();
    }, 100);
}

// 鍵盤控制
document.addEventListener('keydown', (e) => {
    if (isGameOver) return;

    // 空白鍵暫停
    if (e.code === 'Space') {
        e.preventDefault();
        isPaused = !isPaused;
        return;
    }

    if (isPaused) return;

    switch(e.key) {
        case 'ArrowUp':
            if (dy !== 1) { dx = 0; dy = -1; }
            break;
        case 'ArrowDown':
            if (dy !== -1) { dx = 0; dy = 1; }
            break;
        case 'ArrowLeft':
            if (dx !== 1) { dx = -1; dy = 0; }
            break;
        case 'ArrowRight':
            if (dx !== -1) { dx = 1; dy = 0; }
            break;
    }
});

// 初始繪製
draw();
