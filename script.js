'use strict';

var startGameButton = document.querySelector('.start-game-button');
var canvas = document.querySelector('.canvas');
canvas.width = 400;
canvas.height = 650;
var ctx = canvas.getContext('2d');
var startTime;
var time;
var then;
var game = {
    state: ''
};
var player = {
    column: 1,
    radius: 50
};
var keys = {
    37: 0,
    40: 1,
    39: 2
};
var obstacles = [];

var handleKeydown = function (e) {
    var key = e.which || e.keyCode;
    if (key in keys) {
        player.column = keys[key];
    }
};

var addObstacle = function () {
    var column = Math.floor(Math.random() * 3);
    var height = 60 + (Math.random() * 200);
    var speed = 256;
    var top = -height;
    obstacles.push({
        column: column,
        height: height,
        speed: speed,
        top: top
    });
};

var update = function (modifier) {
    if ((Math.random() * 100) < 1) {
        addObstacle();
    }

    for (var i in obstacles) {
        var obs = obstacles[i];
        obs.top += obs.speed * modifier;

        if (obs.top > canvas.height) {
            obstacles.splice(i, 1);
        }

        if (obs.column === player.column &&
            obs.top + obs.height >= canvas.height -  (player.radius * 2)) {
            document.removeEventListener('keydown', handleKeydown, false);
            time = parseFloat(((Date.now() - startTime) / 1000).toFixed(2));
            game.state = 'highScore';
        }
    }
};

var renderObsctacles = function () {
    for (var i in obstacles) {
        var obs = obstacles[i];
        var x = canvas.width * obs.column / 3;
        var y = obs.top;
        var width = canvas.width / 3;
        var height = obs.height;
        ctx.fillStyle = 'black';
        ctx.fillRect(x, y, width, height);
    }
};

var renderPlayer = function () {
    var centerX = ((canvas.width / 3) / 2) + ((canvas.width / 3) * player.column);
    var centerY = canvas.height - player.radius;
    var radius = player.radius;
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = 'green';
    ctx.fill();
};

var renderGame = function () {
    renderObsctacles();
    renderPlayer();
};

var renderHighScore = function () {
    if (obstacles.length) {
        obstacles = [];
    }
    ctx.font = '40px Helvetica';
    ctx.fillStyle = 'black';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(time + ' seconds', canvas.width / 2, canvas.height / 2);
};

var main = function () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    switch (game.state) {
        case 'game':
            var now = Date.now();
            var delta = now - then;
            update(delta / 1000);
            renderGame();
            then = now;
            break;

        case 'highScore':
            renderHighScore();
            break;
    }
    requestAnimationFrame(main);
};

var startGame = function () {
    game.state = 'game';
    startTime = then = Date.now();
    main();
};

var handleStartGameClick = function () {
    startGameButton.blur();
    document.addEventListener('keydown', handleKeydown, false);
    startGame();
};

startGameButton.addEventListener('click', handleStartGameClick, false);
