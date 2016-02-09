/**
*   Contains code related to the battle UI
*   Moved anything that wasn't  linked in with logic to here.
*   Most functions are called from js/logic/battle.js
*/


function clearPlayer1SpellUI(){
    // weirdly, having a timer.add call a function with a parameter throws an error
    // hence this is seperated into a function per player

    // set all spells ui sprites to empty
    for (i = 0; i < player1SpellUIArray.length; i++){
        player1SpellUIArray[i].frame = 0; 
    }
    // clear particles
    for (j = 0; j < player1SpellUIEmitterArray.length; j++) {
        player1SpellUIEmitterArray[j].forEach(function(particle) {
            particle.tint = 0x010101;
        });
    }    

    isPlayerCasting = false;
}

function clearPlayer2SpellUI() {
    
    // set all spells ui sprites to empty
    for (i = 0; i < player2SpellUIArray.length; i++){
        player2SpellUIArray[i].frame = 0; 
    }
    // clear particles
    for (j = 0; j < player2SpellUIEmitterArray.length; j++) {
        player2SpellUIEmitterArray[j].forEach(function(particle) {
            particle.tint = 0xCCCCCC;
        });
    }    
}

// Update UI particles for spell
function updateEmitterTint (spellUI, emitter) {
    // get the index of current ui frame of the spritesheet
    i = spellUI.frame; 
    // use the index to select a HEX color from particleTint array
    emitter.forEach(function(particle) {
            particle.tint = particleTint[i]; 
    });
}


// Checks conditions for running animations on every update
function animationChecks() {
    
    // Keeps last used spell in last slot until next spell
    
    
    
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
