'use strict';

var startGameButton = document.querySelector('.start-game-button');
var canvas = document.querySelector('.canvas');
canvas.width = 1000;
canvas.height = 500;
var ctx = canvas.getContext('2d');
var game = {
    state: ''
};

var renderGame = function () {

};

var main = function () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    switch (game.state) {
        case 'game':
            renderGame();
            break;
    }
    requestAnimationFrame(main);
};

var startGame = function () {
    game.state = 'game';
    main();
};

var handleKeydown = function (e) {
    var key = e.which || e.keyCode;
    console.debug(key);
};

var handleStartGameClick = function () {
    startGameButton.blur();
    document.addEventListener('keydown', handleKeydown, false);
    startGame();
};

startGameButton.addEventListener('click', handleStartGameClick, false);
