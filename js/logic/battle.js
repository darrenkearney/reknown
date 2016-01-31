/*
*   Description: This controls the logic and animations for the fight in the BATTLE view.
*/

var isPlayerAttacking = false;
var isFightStarted = false;
var isFightFinished = false;
var startHealthUI = true;

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
    animationChecks();
    
    // Human Player Input for battle
    if (isFightFinished === false) {
        // key events
        if (this.leftKey.justDown || this.WKey.justDown ) {
            player1.spells.push("W");
            isPlayerAttacking = true;
            textForSpellsUsed[player1.spells.length - 1].setText("W");
        } else if (this.rightKey.justDown || this.FKey.justDown) {
            player1.spells.push("F");
            isPlayerAttacking = true;
            textForSpellsUsed[player1.spells.length - 1].setText("F");
        } else if (this.downKey.justDown || this.EKey.justDown) {
            player1.spells.push("E");
            isPlayerAttacking = true;
            textForSpellsUsed[player1.spells.length - 1].setText("E");
        } else if (this.upKey.justDown || this.AKey.justDown) {
            player1.spells.push("A");
            isPlayerAttacking = true;
            textForSpellsUsed[player1.spells.length - 1].setText("A");
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
        textForSpellsUsed[0].setText("");
        textForSpellsUsed[1].setText("");
        textForSpellsUsed[2].setText("");
    }
    
    // When Player reduces Enemy HP to 0 stop fight
    if(player2.hitPoints < 1 && isFightStarted){
        isFightStarted = false;
        isPlayerAttacking = false;
        isFightFinished = true;
        timer.stop;
    }
    // While Enemy is alive, it's kickin'!
    else if(player2.spells.length > 2 ){
        var enemySpellCode = '';
        for(var j = 0; j < player2.spells.length; j++){
            enemySpellCode += player2.spells[j];
        }
        // Process attack
        processAttack(enemySpellCode, player2, player2Sprite, player1, player1Sprite);
        
        textForSpellsUsed[3].setText("");
        textForSpellsUsed[4].setText("");
        textForSpellsUsed[5].setText("");
    }
    
    // fill hp bars at start!
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
    }
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
}

// Gets triggered from init.js timer
function addEnemySpell(){
    randomSpell = spellTypes[game.rnd.integerInRange(0,2)];
    player2.spells.push(randomSpell);
    var characterEntered = "⇦";
    if(randomSpell == "W"){
        characterEntered = "⇨";
    }else if(randomSpell == "E"){
         characterEntered = "⇧";
    }else if(randomSpell == "F"){
        characterEntered = "⇩";
    }
    textForSpellsUsed[player2.spells.length + 2].setText(characterEntered);
    timer.repeat();
}

// Checks conditions for running animations on every update
function animationChecks() {
    this.attackAnimation = function attackAnimation(playerSprite){
        if (playerSprite.animations.name == 'attackHeavy' && playerSprite.animations.frame == 19){
            playerSprite.animations.stop();
            playerSprite.animations.play('idle'); 
        }
        
        if (playerSprite.animations.name == 'attackLight' && playerSprite.animations.frame == 19){
            playerSprite.animations.stop();
            playerSprite.animations.play('idle'); 
        }
    }
    this.hurtAnimation = function hurtAnimation(playerSprite){
        if (playerSprite.animations.name == 'hurt' && playerSprite.animations.frame == 25 ){
            playerSprite.animations.stop(); 
            playerSprite.animations.play('idle'); 
        }
    }
    this.deathAnimation = function deathAnimation(player, playerSprite){
        if (playerSprite.animations.name == 'death' && playerSprite.animations.frame == 25 && player.hitPoints <= 0){
           playerSprite.animations.stop(); 
        }
    }
    
    // Only animate attack once
    this.attackAnimation(player1Sprite);
    this.attackAnimation(player2Sprite);
    
    // Only animate hurt once
    this.hurtAnimation(player1Sprite);
    this.hurtAnimation(player2Sprite);
    
    // Only animate death once (needs to be updated with death animation frames when asset is refactored)
    this.deathAnimation(player1, player1Sprite);
    this.deathAnimation(player2, player2Sprite);
    
    // Battle finish animations
    if (isFightFinished && player1.hitPoints >= 1){
        player1Sprite.animations.play('idle');
        
        player2Sprite.animations.play('death');
        player2Sprite.frame = 25;
    }
}