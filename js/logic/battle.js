function battleLogic(){
    // Only play attack animation once
    if (playerSprite.animations.name == 'attack' && playerSprite.animations.frame == 19){
        playerSprite.animations.stop();
        playerSprite.animations.play('idle'); 
    }
    // Only play attack animation once
    if (enemySprite.animations.name == 'attack' && enemySprite.animations.frame == 19){
        enemySprite.animations.stop();
        enemySprite.animations.play('idle'); 
    }
    
    // key events
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
        playerAnimate('idle');
    }

    // Perform attack when final spell added to mySpells array
    if(mySpells.length > 2){
        // Play animation
        playerSprite.animations.play('attack');
        // do logic
        var playerSpellCode = '';
        console.log("Using: ");
        for(var i = 0; i < mySpells.length; i++){
            console.log(mySpells[i]);
            playerSpellCode += mySpells[i];
        }
        currentFighter.hitPoints -= (Math.floor(Math.random() * spells[playerSpellCode]) + 1);
        console.log("currentFighter.hitPoints: " + currentFighter.hitPoints);
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

// Gets triggered from init.js timer
function addEnemySpell(){
    
    randomSpell = ["W","E","F"].pop(game.rnd.integerInRange(0,2));
    currentFighter.spells.push(randomSpell);
    console.log("added enemy spell: " + randomSpell);
    timer.repeat();
}

function playerAnimate(anim) {
    if(mySpells.length > 2 || anim == 'attack'){
        playerSprite.animations.play('attack');
    } else {
        playerSprite.animations.stop();
        playerSprite.animations.play('idle');
    }
}

