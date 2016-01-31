var isPlayerAttacking = false;
var isFightStarted = false;
var isFightFinished = false;
var startHealthUI = true;
var spellTypes = ['E','F','W','A']; // Used for enemy random spell selection
var spellNames = {'E': 'Earth', 'F': 'Fire', 'W': 'Water', 'A': 'Air'};

// Instantiate player objects
var player1 = new CHARACTER(PLAYER);
var player2;
var fighters = [new CHARACTER(ENEMIES.BASIC), new CHARACTER(ENEMIES.SLOW), new CHARACTER(ENEMIES.LUCKY)];

// UI elements
var spellEmitter;


// Main
function battleLogic(){
    // Process animations
    animationChecks();
    
    // Human Player Input for battle
    if(isFightFinished === false){
        // key events
        if (this.leftKey.justDown){
            console.log("Water");
            player1.spells.push("W");
            console.log(player1.spells);
            isPlayerAttacking = true;
        }else if(this.rightKey.justDown){
            console.log("Fire");
            player1.spells.push("F");
            console.log(player1.spells);
            isPlayerAttacking = true;
        }else if(this.downKey.justDown){
            console.log("Earth");
            player1.spells.push("E");
            console.log(player1.spells);
            isPlayerAttacking = true;
        }else if(this.upKey.justDown){
            console.log("Air");
            player1.spells.push("A");
            console.log(player1.spells);
            isPlayerAttacking = true;
        }
    }

    // Ready? Fight!
    // Player setting first spell starts the timer
    if(isPlayerAttacking && !isFightStarted){
        console.log(player2);
        isFightStarted = true;
        timer.start();
        player1Sprite.animations.play('idle');
        player2Sprite.animations.play('idle');
    }

    // Player 1 attack
    // When final spell added to mySpells array
    if(player1.spells.length > 2){
        // do logic
        var playerSpellCode = '';
        
        console.log("Using: ");
        for(var i = 0; i < player1.spells.length; i++){
            console.log(player1.spells[i]);
            playerSpellCode += player1.spells[i];
        }
        // Process attack
        processAttack(playerSpellCode, player1, player1Sprite, player2, player2Sprite);
    }
    
    // When Player reduces Enemy HP to 0 stop fight
    if(player2.hitPoints < 1 && isFightStarted){
        console.log("Enemy Dead");
        isFightStarted = false;
        isPlayerAttacking = false;
        isFightFinished = true;
        timer.stop;
    }
    // While Enemy is alive, it's kickin'!
    else if(player2.spells.length > 2 ){
        console.log("The enemy used: ");
        var enemySpellCode = '';
        for(var j = 0; j < player2.spells.length; j++){
            console.log(player2.spells[j]);
            enemySpellCode += player2.spells[j];
        }
        // Process attack
        processAttack(enemySpellCode, player2, player2Sprite, player1, player1Sprite);
    }
    
    // fill hp bars at start!
    if (!isFightStarted ) {
        if (energyUICropRect1.width <= game.width){
            energyUICropRect1.width += 16;
            player1.hitPointsUI.updateCrop();
        }
        if (energyUICropRect2.width <= game.width){
            energyUICropRect2.width += 1;
            player2.hitPointsUI.updateCrop();
        }
        
    } else if (isFightStarted && startHealthUI) {
        energyUICropRect1.width = 100;
        player1.hitPointsUI.updateCrop();
        energyUICropRect2.width = player2.hitPointsUI.width;
        player2.hitPointsUI.updateCrop();
    }    
}

function processAttack(spellCode, attacker, attackerSprite, defender, defenderSprite){
    // Generic attack function
    // Processes damage done, sets animations and clears spells afterwards
    
    // Calculate hit
    console.log(spells[spellCode]);
    var hit = (Math.floor(Math.random() * spells[spellCode]) + 1);
    defender.hitPoints -= hit;
    console.log("hit = " + hit);
    
    // Update healthbar UI
    //defender.hitPointsUI.updateCrop();    
    if (hit > 0){
        if(defender.hitPoints < 1){
            defender.hitPointsUI.width = 0;
        }else if(defender.hitPointsUI.width > 0){
            defender.hitPointsUI.width =  409.6 * (defender.hitPoints / defender.baseHitPoints);
        }else{
            defender.hitPointsUI.width =  -409.6 * (defender.hitPoints / defender.baseHitPoints);
        }
        defender.hitPointsUI.updateCrop();
    }
    
    // Play Player attack animation based on hit
    if(hit > 5 && defender.hitPoints > 0){
        attackerSprite.animations.play('attackHeavy');   
        defenderSprite.animations.play('hurt');
    } else if(hit > 5 && defender.hitPoints > 0){
        // Heavy Killing blow
        attackerSprite.animations.play('attackHeavy');   
        defenderSprite.animations.play('death');
    } else if(hit <= 5 && defender.hitPoints > 0){
        // Light Killing blow
        attackerSprite.animations.play('attackLight');   
        defenderSprite.animations.play('death');
    } else {
        attackerSprite.animations.play('attackLight');
        defenderSprite.animations.play('hurt');
    }
    // Clear spells
    attacker.spells = [];
    // Debug Log
    console.log("End "+attacker.name+" spells (spells left: "+attacker.spells+")");
    console.log(defender.name + " HP: " + defender.hitPoints);
}

// Gets triggered from init.js timer
function addEnemySpell(){
    randomSpell = spellTypes[game.rnd.integerInRange(0,2)];
    player2.spells.push(randomSpell);
    console.log("added enemy spell: " + spellNames[randomSpell]);
    timer.repeat();
}

function animationChecks() {
    // Checks conditions for running animations on every update
    
    // Only play attackLight animation once
    if (player1Sprite.animations.name == 'attackLight' && player1Sprite.animations.frame == 19){
        player1Sprite.animations.stop();
        player1Sprite.animations.play('idle'); 
    }
    if (player2Sprite.animations.name == 'attackLight' && player2Sprite.animations.frame == 19){
        player2Sprite.animations.stop();
        player2Sprite.animations.play('idle'); 
    }
    
    // Only play attackHeavy animation once
    if (player1Sprite.animations.name == 'attackHeavy' && player1Sprite.animations.frame == 19){
        player1Sprite.animations.stop();
        player1Sprite.animations.play('idle'); 
    }
    if (player2Sprite.animations.name == 'attackHeavy' && player2Sprite.animations.frame == 19){
        player2Sprite.animations.stop();
        player2Sprite.animations.play('idle'); 
    }
    
    // Only animate hurt once
    if (player1Sprite.animations.name == 'hurt' && player1Sprite.animations.frame == 25 ){
        player1Sprite.animations.stop(); 
        player1Sprite.animations.play('idle'); 
    }
    if (player2Sprite.animations.name == 'hurt' && player2Sprite.animations.frame == 25 ){
        player2Sprite.animations.stop();
        player2Sprite.animations.play('idle'); 
    }
    
    // Only animate death once (needs to be updated with death animation frames when asset is refactored)
    if (player1Sprite.animations.name == 'death' && player1Sprite.animations.frame == 25 && player1.hitPoints <= 0){
       player1Sprite.animations.stop(); 
    }
    if (player2Sprite.animations.name == 'death' && player2Sprite.animations.frame == 25 && player2.hitPoints <= 0){
       player2Sprite.animations.stop(); 
    }
    
    // Battle finish animations
    if (isFightFinished && player1.hitPoints >= 1){
        player1Sprite.animations.play('idle');
        
        player2Sprite.animations.play('death');
        player2Sprite.frame = 25;
    }
}
