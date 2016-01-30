var game = new Phaser.Game(1280, 720, Phaser.AUTO, '', {preload: preload, create: create, update: update});
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
var view = "BATTLE";  // MAP, BATTLE

function preload() {
    //game.load.image('map', 'assets/map.png');
    //player = game.load.image('player', 'assets/bat.png');

    //  Load Battle Assets 
    game.load.image('battleBackground', './assets/background/fightback-water.jpg');
    game.load.spritesheet('playerSpritesheet', './assets/characters/player.png', 300, 400);
    game.load.spritesheet('enemySpritesheet', './assets/characters/player.png', 300, 400);
    
    
}

function create() {
    createGame();
}

function update(){
    if(view === "MAP"){
        mapLogic();
    } else if (view === "BATTLE"){
        battleLogic();
    }
    
}