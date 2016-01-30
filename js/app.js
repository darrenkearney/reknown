var game = new Phaser.Game(800, 600, Phaser.CANVAS, '', {preload: preload, create: create, update: update});
var leftKey;
var rightKey;
var spaceKey;
var isPlayerAttacking = false;
var isFightStarted = false;
var currentFighter;
var fighters = [new CHARACTER(ENEMIES.BASIC), new CHARACTER(ENEMIES.SLOW), new CHARACTER(ENEMIES.LUCKY)];
var timer;
var mySpells = [];

function preload() {
}

function create() {
    game.stage.backgroundColor = '#124184';

    game.add.text(5, 5, 'Use arrow keys to move.', { fill: '#ffffff', font: '14pt Arial' });

    // Keys to record
    this.leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    this.rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
    this.spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    // Stop the following keys from propagating up to the browser
    game.input.keyboard.addKeyCapture([ Phaser.Keyboard.LEFT, Phaser.Keyboard.RIGHT, Phaser.Keyboard.SPACEBAR ]);
        
    timer = game.time.create(false);
    
    currentFighter = getRandomFighter(fighters);
    
    console.log(currentFighter);

    //  Set a TimerEvent to occur after 2 seconds
    timer.loop(2000, addEnemySpell, this, currentFighter);
}

function getRandomFighter(fighters) {
    return fighters[Math.floor(Math.random() * fighters.length)];
}

function update(){
    if (this.leftKey.justDown){
        console.log("Fire");
        mySpells.push("F");
        isPlayerAttacking = true;
    }else if(this.rightKey.justDown){
        console.log("Water");
        mySpells.push("W");
        isPlayerAttacking = true;
    }else if(this.spaceKey.justDown){
        console.log("Earth");
        mySpells.push("E");
        isPlayerAttacking = true;
    }

    if(isPlayerAttacking && !isFightStarted){
        console.log(currentFighter);
        isFightStarted = true;
        timer.start();
    }

    if(mySpells.length > 2){
        var playerSpellCode = '';
        console.log("Using: ");
        for(var i = 0; i < mySpells.length; i++){
            console.log(mySpells[i]);
            playerSpellCode += mySpells[i];
        }
        currentFighter.hitPoints -= (Math.floor(Math.random() * spells[playerSpellCode]) + 1);
        console.log("currentFighter.hitPoints" + currentFighter.hitPoints);
        mySpells = [];
    }
    
    if(currentFighter.hitPoints < 1 && isFightStarted){
        console.log("Enemy Dead");
        isFightStarted = false;
        isPlayerAttacking = false;
    }else if(currentFighter.spells.length > 2){
        console.log("The enemy used: ");
        for(var j = 0; j < currentFighter.spells.length; j++){
            console.log(currentFighter.spells[j]);
        }
        console.log("End enemy spells");
        currentFighter.spells = [];
    }
}

function addEnemySpell(){
    currentFighter.spells.push("W");
    console.log("added enemy spell: Water");
    timer.repeat();
}