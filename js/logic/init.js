function createGame(){
    game.stage.backgroundColor = '#124184';

    game.add.text(5, 5, 'Use arrow keys to move.', { fill: '#ffffff', font: '14pt Arial' });
    
    // Add Battle Assets
    // background
    game.add.sprite(0, 0, 'battleBackground');
    // player
    playerSprite = game.add.sprite(150, 170, 'playerSpritesheet');
    // player animations
    playerSprite.animations.add('idle', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 10, true);
    playerSprite.animations.add('attack', [10, 11, 12, 13, 14, 15, 16, 17, 18, 19], 10, true);
    
    // Add enemy sprite
    enemySprite = game.add.sprite(720, 170, 'enemySpritesheet');
    enemySprite.animations.add('idle', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 10, true);
    enemySprite.animations.add('attack', [10, 11, 12, 13, 14, 15, 16, 17, 18, 19], 10, true);
    enemySprite.anchor.setTo(1,0); // set sprite anchor so we can flip
    enemySprite.scale.setTo(-1,1); // flip enemy sprite
    enemySprite.tint=0xEE5511; // Set tint. uses HEX value, default is 0xFFFFFF (0xRRGGBB when RR = Red, GG = Green, BB = Blue)
    
    
    // Keys to record
    this.leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    this.rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
    this.upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
    this.downKey = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
    this.spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    // Stop the following keys from propagating up to the browser
    game.input.keyboard.addKeyCapture([Phaser.Keyboard.LEFT, Phaser.Keyboard.RIGHT, Phaser.Keyboard.SPACEBAR, Phaser.Keyboard.UP, Phaser.Keyboard.DOWN]);
    
    timer = game.time.create(false);
    
    //game.add.sprite(0, 0, 'map');
    
    //player = game.add.sprite(32, game.world.height - 150, 'player');
    
    currentFighter = getRandomFighter(fighters);
    
    console.log(currentFighter);

    //  Set a TimerEvent to occur after 2 seconds
    // Used for the battle timer
    timer.loop(2000, addEnemySpell, this, currentFighter);
}

function getRandomFighter(fighters) {
    return fighters[Math.floor(Math.random() * fighters.length)];
}