function preloadAssets(view){
    
    //  Load Battle Assets 
    if (view === "BATTLE"){
        game.load.image('battleBackground',         './assets/background/fightback-water.jpg');
        game.load.spritesheet('player1Spritesheet', './assets/characters/player.png', 300, 400);
        game.load.spritesheet('player2Spritesheet', './assets/characters/player.png', 300, 400);
        game.load.image('player1EnergyUIAsset',     './assets/ui/energy.png');
        game.load.image('player1HiltUIAsset',       './assets/ui/hilt.png');
        game.load.image('player1OutlineUIAsset',    './assets/ui/outline.png');
        game.load.image('player2EnergyUIAsset',     './assets/ui/energy.png');
        game.load.image('player2HiltUIAsset',       './assets/ui/hilt.png');
        game.load.image('player2OutlineUIAsset',    './assets/ui/outline.png');
        game.load.image('spellAirAsset',            './assets/ui/air.png');
        game.load.image('spellEarthAsset',          './assets/ui/earth.png');
        game.load.image('spellFireAsset',           './assets/ui/fire.png');
        game.load.image('spellWaterAsset',          './assets/ui/water.png');
        game.load.image('softWhiteParticle',        './assets/particles/softwhite.png');
        var energyUICropRect; // used to visually lower health
        
    }
    // Load Map Assets
    else if (view === "MAP"){
        game.load.image('map', 'assets/map.png');
        game.load.image('player', 'assets/bat.png');
        game.load.image('enemy', 'assets/items/heart.png');
        var map;
        var enemy;
        var walls;
        var players;
        var player;
    }

}

function createGame(){
    
    
    /**************************************************************************
    *   Global CREATE
    **************************************************************************/
    
    game.stage.backgroundColor = '#124184';
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.add.text(5, 5, 'Use Left, Right, Up, Down and Space keys to play.', { fill: '#ffffff', font: '14pt Arial' });
    
    // Keys to record
    this.leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    this.rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
    this.upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
    this.downKey = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
    this.spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    this.AKey = game.input.keyboard.addKey(Phaser.Keyboard.A);
    this.WKey = game.input.keyboard.addKey(Phaser.Keyboard.W);
    this.EKey = game.input.keyboard.addKey(Phaser.Keyboard.E);
    this.FKey = game.input.keyboard.addKey(Phaser.Keyboard.F);
    
    
    
    // Stop the following keys from propagating up to the browser
    game.input.keyboard.addKeyCapture(
        [Phaser.Keyboard.LEFT,
         Phaser.Keyboard.RIGHT,
         Phaser.Keyboard.SPACEBAR,
         Phaser.Keyboard.UP,
         Phaser.Keyboard.DOWN,
         Phaser.Keyboard.A,
         Phaser.Keyboard.W,
         Phaser.Keyboard.E,
         Phaser.Keyboard.F
        ]);
    
    timer = game.time.create(false);

    
    /**************************************************************************
    *   Battle State CREATE
    **************************************************************************/
    // (Comment out when working on other states)
    
    // Stage bounds
    game.world.setBounds(0, 0, 1280, 720);
    
    // background image
    game.add.sprite(0, 0, 'battleBackground');
    
    // player 1 spritesheet
    player1Sprite = game.add.sprite(150, 170, 'player1Spritesheet');
    // player 1 animations
    player1Sprite.animations.add('idle', [0,1,2,3,4,5,6,7,8,9], 10, true);
    player1Sprite.animations.add('attackLight', [10,11,12,13,14,15,16,17,18,19], 10, true);
    player1Sprite.animations.add('attackHeavy', [26,27,28,29,30,31,32,33,34,35,36,37,38,37,36,13,14,15,16,17,18,19], 10, true);
    player1Sprite.animations.add('hurt', [20,21,22,23,24,25], 5, true);
    player1Sprite.animations.add('death', [20,21,22,23,24,25], 5, true); // using same frames as hurt in leue of death animation
    
    // Add enemy sprite (Temporarily using player1 spritesheet until new assets are imported)
    player2Sprite = game.add.sprite(760, 140, 'player2Spritesheet');
    // player 2 animations
    player2Sprite.animations.add('idle', [0,1,2,3,4,5,6,7,8,9], 10, true);
    player2Sprite.animations.add('attackLight', [10,11,12,13,14,15,16,17,18,19], 10, true);
    player2Sprite.animations.add('attackHeavy', [26,27,28,29,30,31,32,33,34,35,36,37,38,37,36,13,14,15,16,17,18,19], 10, true);
    player2Sprite.animations.add('hurt', [20,21,22,23,24,25], 5, true);
    player2Sprite.animations.add('death', [20,21,22,23,24,25], 5, true); // using same frames as hurt in leue of death animation
    // Flip sprite on x-axis
    player2Sprite.anchor.setTo(1,0); // set sprite anchor so we can flip
    player2Sprite.scale.setTo(-1,1); // flip enemy sprite
    player2Sprite.tint=0xEE5511; // Set tint. uses HEX value, default is 0xFFFFFF (0xRRGGBB when RR = Red, GG = Green, BB = Blue)
    
    
    /*******************
    *   UI Elements
    */
    
    // Player1 Energy UI
    var player1EnergyUI         = game.add.sprite(110, 20,'player1EnergyUIAsset');
    var player1HiltUI           = game.add.sprite(110, 20,'player1HiltUIAsset');
    var player1OutlineUI        = game.add.sprite(110, 20,'player1OutlineUIAsset');
    player1EnergyUI.scale.setTo(0.4,0.4);
    player1HiltUI.scale.setTo(0.4,0.4);
    player1OutlineUI.scale.setTo(0.4,0.4);

    // Player2 Energy UI
    var player2EnergyUI         = game.add.sprite(game.world.width - 540, 20,'player1EnergyUIAsset');
    var player2HiltUI           = game.add.sprite(game.world.width - 540, 20,'player1HiltUIAsset');
    var player2OutlineUI        = game.add.sprite(game.world.width - 540, 20,'player1OutlineUIAsset');
    player2EnergyUI.anchor.setTo(1,0); // set sprite anchor so we can flip
    player2EnergyUI.scale.setTo(-0.4,0.4); // flip sprite
    player2HiltUI.anchor.setTo(1,0); 
    player2HiltUI.scale.setTo(-0.4,0.4);
    player2OutlineUI.anchor.setTo(1,0);
    player2OutlineUI.scale.setTo(-0.4,0.4);
    
    // Add cropRect to crop the HP/energy bar for visually lowering hp
    energyUICropRect1 = new Phaser.Rectangle(0, 0, 200, 200);
    energyUICropRect2 = new Phaser.Rectangle(550, 0, 400, 200);
//    console.log("crop x : " + (player2EnergyUI.x+player2EnergyUI.width));
    // Apply crop to image
    //player1EnergyUI.crop(energyUICropRect1);
    //player2EnergyUI.crop(energyUICropRect2);
    
    // Player 1 Spell UI
    var player1SpellAir         = game.add.sprite(100, 550,'spellAirAsset');
    var player1SpellEarth       = game.add.sprite(200, 550,'spellEarthAsset');
    var player1SpellFire        = game.add.sprite(300, 550,'spellFireAsset');
    var player1SpellWater       = game.add.sprite(400, 550,'spellWaterAsset');
    player1SpellAir.scale.setTo(0.2,0.2);
    player1SpellEarth.scale.setTo(0.2,0.2);
    player1SpellFire.scale.setTo(0.2,0.2);
    player1SpellWater.scale.setTo(0.2,0.2);
    
    
    // Player 2 Spell UI
    var player2SpellAir         = game.add.sprite(780, 550,'spellAirAsset');
    var player2SpellEarth       = game.add.sprite(880, 550,'spellEarthAsset');
    var player2SpellFire        = game.add.sprite(980, 550,'spellFireAsset');
    var player2SpellWater       = game.add.sprite(1080, 550,'spellWaterAsset');
    player2SpellAir.scale.setTo(0.2,0.2);
    player2SpellEarth.scale.setTo(0.2,0.2);
    player2SpellFire.scale.setTo(0.2,0.2);
    player2SpellWater.scale.setTo(0.2,0.2);
    
    // UI Particles
    var x, y, max;
    function emitterInitter( emitter, tint ) {
        lifespan     = game.rnd.integerInRange(2000,3000);
        
        emitter.makeParticles('softWhiteParticle');
        emitter.setRotation(0, 0);
        emitter.setAlpha(0.6, 0, (lifespan -100));
        emitter.setScale(0.5, 0.5);
        emitter.gravity = -80;
        
        frequency    = game.rnd.integerInRange(100,150);
        emitter.start(false, lifespan, frequency);
        
        if (tint !== undefined ) {
            emitter.forEach(function(particle) {
                // tint every particle to HEX value
                particle.tint = tint;
            });
        }
    }
    
    // Player 1 Spell UI Particles Init
    var emitter1Air     = game.add.emitter(160, 600, 500 ); emitterInitter( emitter1Air, 0xFFFFFF );
    var emitter1Earth   = game.add.emitter(260, 600, 500);  emitterInitter( emitter1Earth, 0x00DDDD );
    var emitter1Fire    = game.add.emitter(360, 600, 500);  emitterInitter( emitter1Fire, 0xFF4400 );
    var emitter1Water   = game.add.emitter(460, 600, 500);  emitterInitter( emitter1Water, 0x0011FF );
    // Player 2 Spell UI Particles Init
    var emitter2Air     = game.add.emitter(830, 600, 500);  emitterInitter( emitter2Air, 0xFFFFFF );
    var emitter2Earth   = game.add.emitter(940, 600, 500);  emitterInitter( emitter2Earth, 0x00DDDD );
    var emitter2Fire    = game.add.emitter(1030, 600, 500);  emitterInitter( emitter2Fire, 0xFF0000 );
    var emitter2Water   = game.add.emitter(1130, 600, 500); emitterInitter( emitter2Water, 0x0011FF );


    // Instantiate player2 object
    player2 = getRandomFighter(fighters);
    console.log(player2);
    
    // Add shortcut to player UI
    player1.hitPointsUI = player1EnergyUI;
    player2.hitPointsUI = player2EnergyUI;

    //  Set a TimerEvent to occur after 2 seconds
    // Used for the battle timer
    timer.loop(2000, addEnemySpell, this, player2);
    
    
    /**************************************************************************
    *   Map State CREATE
    **************************************************************************/
    // (Comment out when working on other states)
    /*
    // Stage bounds
    game.world.setBounds(0, 0, 4096, 3128);
    
    //  Our tiled scrolling background
    map = game.add.tileSprite(0, 0, 4096, 3128, 'map');
    player = game.add.sprite(155, game.world.height - 200, 'player');

    enemy = game.add.sprite(game.world.width - 200, game.world.height - 350, 'enemy');
    enemy.collideWorldBounds = true;
    enemy.enableBody = true;
    
    game.physics.arcade.enable(player);
    */

}

function getRandomFighter(fighters) {
    return fighters[Math.floor(Math.random() * fighters.length)];
}

// Todo
// * Fix hurt animations
// * Add death animations
// * add health ui
// * add spell ui
// * add particle effects to spell UI icons, these particle effects will update to show which spells are active