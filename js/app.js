var game = new Phaser.Game(4096, 3128, Phaser.AUTO, '', {preload: preload, create: create, update: update});
var leftKey;
var rightKey;
var spaceKey;
var isPlayerAttacking = false;
var isFightStarted = false;
var currentFighter;
var fighters = [new CHARACTER(ENEMIES.BASIC), new CHARACTER(ENEMIES.SLOW), new CHARACTER(ENEMIES.LUCKY)];
var timer;
var player;
var mySpells = [];
var view = "MAP";

function preload() {
    game.load.image('map', 'assets/map.png');
    player = game.load.image('player', 'assets/bat.png');
}

function create() {
    createGame();
}

function update(){
    if(view === "MAP"){
        mapLogic();
    }else{
        battleLogic();
    }
    
}