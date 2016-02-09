/*
*   Description: This controls the logic and animations for the fight in the BATTLE view.
*/

var isPlayerAttacking = false;
var isFightStarted = false;
var isFightFinished = false;
var isPlayerCasting = false;
var startHealthUI = true;
var castTimer;

// Instantiate Human player object
var player1 = new CHARACTER(PLAYER);
var player2;
var fighters = [new CHARACTER(ENEMIES.BASIC), new CHARACTER(ENEMIES.SLOW), new CHARACTER(ENEMIES.LUCKY)];

// UI elements
var spellEmitter;

// Main
function battleLogic() {
    this.yCoOrdinatesForSpells = game.world.height - 200;
    // Process animations
    animationChecks(); // see battleUI.js
    
    // Human Player Keyboard Input/controls for battle
    if (isFightFinished === false) {
        if (!isPlayerCasting){
            // key events
            if (this.upKey.justDown || this.AKey.justDown) {
                player1.spells.push("A");
                isPlayerAttacking = true;
                // set to Air spell
                player1SpellUIArray[player1.spells.length-1].frame = 1; 
                // update emitter particle tint
                updateEmitterTint(player1SpellUIArray[player1.spells.length-1],player1SpellUIEmitterArray[player1.spells.length-1]); 

            } else if (this.downKey.justDown || this.EKey.justDown) {
                player1.spells.push("E");
                isPlayerAttacking = true;
                // set to Earth spell
                player1SpellUIArray[player1.spells.length-1].frame = 2; 
                // update emitter particle tint
                updateEmitterTint(player1SpellUIArray[player1.spells.length-1],player1SpellUIEmitterArray[player1.spells.length-1]); 

            } else if (this.rightKey.justDown || this.FKey.justDown) {
                player1.spells.push("F");
                isPlayerAttacking = true;
                // set to Fire spell
                player1SpellUIArray[player1.spells.length-1].frame = 3;
                // update emitter particle tint
                updateEmitterTint(player1SpellUIArray[player1.spells.length-1],player1SpellUIEmitterArray[player1.spells.length-1]); 

            } else if (this.leftKey.justDown || this.WKey.justDown ) {
                player1.spells.push("W");
                isPlayerAttacking = true;
                // set to Water spell
                player1SpellUIArray[player1.spells.length-1].frame = 4;
                // update emitter particle tint
                updateEmitterTint(player1SpellUIArray[player1.spells.length-1],player1SpellUIEmitterArray[player1.spells.length-1]); 
            }
        }
    }

    
    // Ready? Fight!
    // Player setting first spell starts the timer
    if (isPlayerAttacking && !isFightStarted) {
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
        
        for(var i = 0; i < player1.spells.length; i++){
            playerSpellCode += player1.spells[i];
        }
        // Process attack
        processAttack(playerSpellCode, player1, player1Sprite, player2, player2Sprite);
    }
    
    // When Player reduces Enemy HP to 0 stop fight
    if(player2.hitPoints < 1 && isFightStarted){
        isFightStarted = false;
        isPlayerAttacking = false;
        isFightFinished = true;
        timer.stop();
    }
    // While Enemy is alive, it's kickin'!
    else if(player2.spells.length > 2 ){
        var enemySpellCode = '';
        for(var j = 0; j < player2.spells.length; j++){
            enemySpellCode += player2.spells[j];
        }
        // Process attack
        processAttack(enemySpellCode, player2, player2Sprite, player1, player1Sprite);
    }
    
    // fill hp bars at start!
    /*
    if (!isFightStarted) {
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
    }*/
}

// Gets triggered from init.js timer
function addEnemySpell(){
    // Logic
    index = game.rnd.integerInRange(0,3);
    randomSpell = spellTypes[index];
    player2.spells.push(randomSpell);
    
    // UI
    player2SpellUIArray[player2.spells.length-1].frame = (index+1);
    updateEmitterTint(player2SpellUIArray[player2.spells.length-1],player2SpellUIEmitterArray[player2.spells.length-1]); 
}

// Generic attack function
// Processes damage done, sets animations and clears spells afterwards
function processAttack(spellCode, attacker, attackerSprite, defender, defenderSprite){
    // Calculate hit
    var hit = (Math.floor(Math.random() * spells[spellCode]) + 1);
    defender.hitPoints -= hit;
    
    // Update healthbar UI
    if (hit > 0){
        if(defender.hitPoints < 1){
            defender.hitPointsUI.width = 0;
        }else if(defender.hitPointsUI.width > 0){
            defender.hitPointsUI.width =  409.6 * (defender.hitPoints / defender.baseHitPoints);
        }else{
            defender.hitPointsUI.width =  -409.6 * (defender.hitPoints / defender.baseHitPoints);
        }
    }
    
    // Play Player attack animation based on hit
    if(hit > 5 && defender.hitPoints > 0){
        attackerSprite.animations.play('attackHeavy');   
        defenderSprite.animations.play('hurt');
    } else if(hit > 5 && defender.hitPoints < 1){
        // Heavy Killing blow
        attackerSprite.animations.play('attackHeavy');   
        defenderSprite.animations.play('death');
    } else if(hit <= 5 && defender.hitPoints < 1){
        // Light Killing blow
        attackerSprite.animations.play('attackLight');   
        defenderSprite.animations.play('death');
    } else {
        attackerSprite.animations.play('attackLight');
        defenderSprite.animations.play('hurt');
    }
    // Clear spells
    attacker.spells = [];
    
    // Clear UI of spells
    if (attacker == player1) {
        isPlayerCasting = true;
        // make it so player1 is delayed in next attack
        game.time.events.add(Phaser.Timer.SECOND * 0.5 , clearPlayer1SpellUI, this);
    } else if (attacker == player2) {
        game.time.events.add(Phaser.Timer.SECOND * 0.8 , clearPlayer2SpellUI, this);
        //clearPlayer2SpellUI();
    }
}

