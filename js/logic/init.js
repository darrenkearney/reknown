function createGame(){
    game.stage.backgroundColor = '#124184';

    game.add.text(5, 5, 'Use arrow keys to move.', { fill: '#ffffff', font: '14pt Arial' });

    // Keys to record
    this.leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    this.rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
    this.upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
    this.downKey = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
    this.spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    // Stop the following keys from propagating up to the browser
    game.input.keyboard.addKeyCapture([Phaser.Keyboard.LEFT, Phaser.Keyboard.RIGHT, Phaser.Keyboard.SPACEBAR, Phaser.Keyboard.UP, Phaser.Keyboard.DOWN]);
    
    timer = game.time.create(false);
    game.add.sprite(0, 0, 'map');
    
    player = game.add.sprite(32, game.world.height - 150, 'player');
    
    currentFighter = getRandomFighter(fighters);
    
    console.log(currentFighter);

    //  Set a TimerEvent to occur after 2 seconds
    timer.loop(2000, addEnemySpell, this, currentFighter);
}

function getRandomFighter(fighters) {
    return fighters[Math.floor(Math.random() * fighters.length)];
}