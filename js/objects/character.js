/*
*   Description: This file sets up the character class used in the game.
*   Usage: CHARACTER takes arguments as an object of {key: word} pairs.
*/
function CHARACTER(kwargs) {
    this.name =         kwargs.name || '';
    this.desc =         kwargs.desc || '';
    this.baseHitPoints= kwargs.baseHitPoints || 5;
    this.hitPoints =    kwargs.hitPoints || this.baseHitPoints;
    this.hitPointsUI =  kwargs.hitPointsUI || '';
    this.experience =   kwargs.experience || 1;
    this.level =        kwargs.level || 1;
    this.agility =      kwargs.agility || 1;
    this.constitution = kwargs.constitution || 1;
    this.strength =     kwargs.strength || 5;
    this.luck =         kwargs.luck || 1;
    this.ritualPower =  kwargs.ritualPower || 1;
    this.reknown =      kwargs.reknown || 1;
    this.spells =       [];
    this.testMethod =   function () {
        console.log("testMethod called");
    };
    this.air    =       kwargs.air || 1;
    this.earth  =       kwargs.earth || 1;
    this.water  =       kwargs.water || 1;
    this.fire   =       kwargs.fire ||  1;
    this.baseAttack =   kwargs.baseAttack || 2;
    this.heavyAttack  = kwargs.heavyAttack || (this.baseAttack * 1.5);
    this.airResist =    kwargs.airResist || 0;
    this.fireResist =   kwargs.fireResist || 0;
    this.earthResist =  kwargs.earthResist || 0;
    this.waterResist =  kwargs.waterResist || 0;
    this.souls =        kwargs.souls || 0;

}

var PLAYER = {
    'name': "Basic Player",
    'baseHitPoints': 20,
    'hitPoints': 20,
    'strength': 8,
    'agility': 5,
    'luck': 30
}

var GERRY = {
    'name': "Gerbeard",
    'baseHitPoints': 20,
    'hitPoints': 20,
    'strength': 8,
    'agility': 5,
    'luck': 30,
    'air': 1,
    'earth': 1,
    'water': 1,
    'fire': 1,
    'baseAttack': 3,
    'heavyAttack': (this.baseAttack * 1.5)
}


var ENEMIES = {
    'BASIC': {
        'name': "Basic Fighter",
        'baseHitPoints': 20,
        'hitPoints': 20,
        'strength': 8,
        'agility': 5,
        'luck': 30
    },
    'SLOW': {
        'name': "Slow Fighter",
        'baseHitPoints': 20,
        'hitPoints': 20,
        'strength': 8,
        'agility': 8,
        'luck': 30
    },
    'LUCKY': {
        'name': "Lucky Fighter",
        'baseHitPoints': 10,
        'hitPoints': 10,
        'strength': 2,
        'agility': 5,
        'luck': 90
    }
}


/*

Game ideas

Mobile game, 1v1
Turn based, time limited turns - eg 10 second turns/15second turns
charging an attack takes up another turn
Character stats direct to spells

Verbs
    Normal attack
    Elemental attack
    Charge spell
    Charged attack
    Charged Elemental attack
    counter attack
    interrupt
    elemental effects
    elemental sheild, negates an elemental attack of opposing element type
    

Spell Construction ideas
    First spell determines element type of attack
    Second what type of attack it is
    Third augments/enchances attack
    
    
    Eg.
        Water - sheild
        Fire - Damage
        Air - dodge/counter - enhances fire
        Earth - 
        
Or

    1; Element type (air, earth, fire, water etc)
    2; Type (attack, status, buff, dodge)
    3; Speed (instant, charge(1 turn to charge, the deal damage ), channel(immediate start, lasts a few turns, increasing damage per turn) )


Rituals (crafting system and augment)
    Different empowered items have variables that , whe crafted together in particular order, and with high enough WitchCrafting,l you can buff your base spells with.
    
    E.g. 10% change to cause burning to opponent when using a charged fire attack
    
    Limit to equippable items - eg 3 max
    
    Crafted items can be betterified by using the Augment screen.
        Pick your item, then select 3 items to augment it with.
        

    
    
    
Wizard Gear Bling
    Some cosmetic upgrades for your wizard
    


*/