var game = new Phaser.Game(1280, 720, Phaser.AUTO, '', {preload: preload, create: create, update: update});
var leftKey;
var rightKey;
var spaceKey;
var timer;
var mySpells = [];
var view = "BATTLE";  // BATTLE, MAP, RITUAL

function preload() {
    preloadAssets(view);
}

function create() {
    createGame(view);
}

function update(){
    if(view === "MAP"){
        mapLogic();
    } else if (view === "BATTLE") {
        battleLogic();
    } else if (view === "RITUAL") {
        ritualLogic();    
    }
}