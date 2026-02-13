// ===== FLOATING HEARTS BACKGROUND =====
function createFloatingHeart() {
    const heartBg = document.getElementById('heartBg');
    const heart = document.createElement('div');
    heart.className = 'floating-heart';
    
    // Random heart emojis
    const heartTypes = ['💕', '💖', '💗', '💝', '💓', '🌸', '🎀'];
    heart.innerHTML = heartTypes[Math.floor(Math.random() * heartTypes.length)];
    
    // Random position and animation duration
    heart.style.left = Math.random() * 100 + '%';
    heart.style.animationDuration = (Math.random() * 5 + 5) + 's';
    heart.style.fontSize = (Math.random() * 20 + 20) + 'px';
    
    heartBg.appendChild(heart);

    // Remove heart after animation
    setTimeout(() => {
        heart.remove();
    }, 10000);
}

// Create floating hearts periodically
setInterval(createFloatingHeart, 300);

// Create initial floating hearts
for (let i = 0; i < 15; i++) {
    setTimeout(createFloatingHeart, i * 200);
}

// ===== GAME VARIABLES =====
let score = 0;
let timeLeft = 30;
let gameActive = false;
let gameInterval;
let timerInterval;

// ===== GAME FUNCTIONS =====
function startGame() {
    // Reset game state
    score = 0;
    timeLeft = 30;
    gameActive = true;
    
    // Update UI
    document.getElementById('score').textContent = score;
    document.getElementById('timer').textContent = timeLeft;
    document.getElementById('gameOver').style.display = 'none';
    document.getElementById('gameContainer').innerHTML = '';
    
    // Disable start button
    const startBtn = document.getElementById('startBtn');
    startBtn.disabled = true;
    startBtn.textContent = 'Game Sedang Berjalan...';

    // Start spawning hearts
    gameInterval = setInterval(spawnHeart, 800);

    // Start countdown timer
    timerInterval = setInterval(() => {
        timeLeft--;
        document.getElementById('timer').textContent = timeLeft;

        if (timeLeft <= 0) {
            endGame();
        }
    }, 1000);
}

function spawnHeart() {
    if (!gameActive) return;

    const gameContainer = document.getElementById('gameContainer');
    const heart = document.createElement('div');
    heart.className = 'game-heart';
    
    // Random heart type
    const heartTypes = ['💕', '💖', '💗', '💝', '💓', '💞'];
    heart.innerHTML = heartTypes[Math.floor(Math.random() * heartTypes.length)];
    
    // Random horizontal position
    const maxLeft = gameContainer.offsetWidth - 50;
    heart.style.left = Math.random() * maxLeft + 'px';
    heart.style.top = '0px';

    // Click event to catch heart
    heart.addEventListener('click', function() {
        score++;
        document.getElementById('score').textContent = score;
        
        // Animation when caught
        this.style.animation = 'none';
        this.style.transform = 'scale(1.5)';
        this.style.opacity = '0';
        
        setTimeout(() => this.remove(), 200);
        
        // Create sparkle effect
        createSparkle(this.offsetLeft, this.offsetTop);
    });

    gameContainer.appendChild(heart);

    // Remove heart if not caught
    setTimeout(() => {
        if (heart.parentNode) {
            heart.remove();
        }
    }, 3000);
}

function createSparkle(x, y) {
    const gameContainer = document.getElementById('gameContainer');
    
    // Create multiple sparkles
    for (let i = 0; i < 5; i++) {
        const sparkle = document.createElement('div');
        sparkle.innerHTML = '✨';
        sparkle.style.position = 'absolute';
        sparkle.style.left = x + 'px';
        sparkle.style.top = y + 'px';
        sparkle.style.fontSize = '20px';
        sparkle.style.pointerEvents = 'none';
        sparkle.style.animation = `confettiFall ${Math.random() + 0.5}s linear`;
        
        gameContainer.appendChild(sparkle);
        
        setTimeout(() => sparkle.remove(), 1000);
    }
}

function endGame() {
    gameActive = false;
    clearInterval(gameInterval);
    clearInterval(timerInterval);
    
    // Clear game container
    document.getElementById('gameContainer').innerHTML = '';
    
    // Update final score
    document.getElementById('finalScore').textContent = score;
    
    // Enable start button
    const startBtn = document.getElementById('startBtn');
    startBtn.disabled = false;
    startBtn.textContent = 'Main Lagi! 🎮';
    
    // Generate love message based on score
    let message = '';
    if (score >= 50) {
        message = '💖 WOW! Kamu luar biasa sayang! Cintamu sangat besar! 💖';
    } else if (score >= 30) {
        message = '💕 Hebat! Kamu menangkap banyak cinta! 💕';
    } else if (score >= 15) {
        message = '💗 Bagus sayang! Cintaku terasa! 💗';
    } else {
        message = '💝 Tidak masalah, yang penting kita bersama! 💝';
    }
    
    document.getElementById('loveMessage').textContent = message;
    document.getElementById('gameOver').style.display = 'block';
    
    // Celebration animation
    celebrate();
}

function celebrate() {
    // Create confetti rain
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            createConfetti();
        }, i * 50);
    }
}

function createConfetti() {
    const confetti = document.createElement('div');
    confetti.className = 'confetti';
    confetti.style.left = Math.random() * window.innerWidth + 'px';
    confetti.style.top = '0px';
    
    // Random pink colors
    const colors = ['#FF69B4', '#FFB6D9', '#FF1493', '#FFC0CB'];
    confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.position = 'fixed';
    
    document.body.appendChild(confetti);
    
    setTimeout(() => confetti.remove(), 3000);
}

// ===== EVENT LISTENERS =====
document.getElementById('startBtn').addEventListener('click', startGame);

// Prevent text selection during game
document.getElementById('gameContainer').addEventListener('selectstart', function(e) {
    e.preventDefault();
});
