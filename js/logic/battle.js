var isPlayerAttacking = false;
var isFightStarted = false;
var currentFighter;
var fighters = [new CHARACTER(ENEMIES.BASIC), new CHARACTER(ENEMIES.SLOW), new CHARACTER(ENEMIES.LUCKY)];

function loadBattle(){
    console.log("LoadingBattle");
}

function battleLogic(){
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