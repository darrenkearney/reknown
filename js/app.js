var game = new Phaser.Game(4096, 3128, Phaser.AUTO, '', {preload: preload, create: create, update: update});
var leftKey;
var rightKey;
var spaceKey;
var timer;
var mySpells = [];
var view = "MAP";

function preload() {
    preloadAssets();
}

function create() {
    createGame();
}

function update(){
    if(view === "MAP"){
        mapLogic();
    }else if(view === "LOADBATTLE"){
        loadBattle();
    }else{
        battleLogic();
    }
}