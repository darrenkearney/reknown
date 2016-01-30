var map;
var players;
var player;
var enemy;
var walls;

function preloadAssets(){
    game.load.image('map', 'assets/map.png');
    game.load.image('player', 'assets/bat.png');
    game.load.image('enemy', 'assets/items/heart.png');
}

function createGame(){
    game.stage.backgroundColor = '#124184';
    game.physics.startSystem(Phaser.Physics.ARCADE);
    
    game.world.setBounds(0, 0, 4096, 3128);
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
    
    //  Our tiled scrolling background
    map = game.add.tileSprite(0, 0, 4096, 3128, 'map');

    player = game.add.sprite(155, game.world.height - 200, 'player');
    
    enemy = game.add.sprite(game.world.width - 200, game.world.height - 350, 'enemy');
    enemy.collideWorldBounds = true;
    enemy.enableBody = true;
    
    game.physics.arcade.enable(player);
    
    currentFighter = getRandomFighter(fighters);
    
    console.log(currentFighter);

    //  Set a TimerEvent to occur after 2 seconds
    timer.loop(2000, addEnemySpell, this, currentFighter);
}

function getRandomFighter(fighters) {
    return fighters[Math.floor(Math.random() * fighters.length)];
}