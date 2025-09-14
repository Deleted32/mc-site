let currentUser = localStorage.getItem("currentUser") || null;

function register() {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    let users = JSON.parse(localStorage.getItem("users")) || {};
    if(users[username]) {
        alert("Bu kullanıcı adı zaten alınmış!");
    } else {
        users[username] = { password: password, gold: 0, workers: 0, mines: 0 };
        localStorage.setItem("users", JSON.stringify(users));
        alert("Kayıt başarılı!");
    }
}

function login() {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    let users = JSON.parse(localStorage.getItem("users")) || {};
    if(users[username] && users[username].password === password) {
        currentUser = username;
        localStorage.setItem("currentUser", username);
        window.location.href = "game.html";
    } else {
        alert("Kullanıcı adı veya şifre yanlış!");
    }
}

function logout() {
    localStorage.removeItem("currentUser");
    window.location.href = "index.html";
}
let gameData = { gold:0, workers:0, mines:0 };

if(currentUser) {
    let users = JSON.parse(localStorage.getItem("users"));
    if(users[currentUser]) {
        gameData = users[currentUser];
    }
}

function saveGame() {
    let users = JSON.parse(localStorage.getItem("users"));
    users[currentUser] = gameData;
    localStorage.setItem("users", JSON.stringify(users));
}

function earnGold() {
    gameData.gold += 1;
    updateDisplay();
    saveGame();
}

function buyWorker() {
    if(gameData.gold >= 10) {
        gameData.gold -= 10;
        gameData.workers += 1;
        updateDisplay();
        saveGame();
    } else {
        alert("Yeterli altın yok!");
    }
}

function buyMine() {
    if(gameData.gold >= 100) {
        gameData.gold -= 100;
        gameData.mines += 1;
        updateDisplay();
        saveGame();
    } else {
        alert("Yeterli altın yok!");
    }
}

function updateDisplay() {
    document.getElementById("goldDisplay").innerText = "💰 Altın: " + gameData.gold;
    document.getElementById("workersDisplay").innerText = "👷 İşçi: " + gameData.workers;
    document.getElementById("minesDisplay").innerText = "🏠 Maden: " + gameData.mines;
}

// Otomatik işçi üretimi
setInterval(() => {
    gameData.gold += gameData.workers;
    gameData.gold += gameData.mines * 10; // maden daha çok altın üretir
    updateDisplay();
    saveGame();
}, 1000);

updateDisplay();
