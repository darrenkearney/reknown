/*
*   Description: This file sets up the character class used in the game.
*   Usage: CHARACTER takes arguments as an object of {key: word} pairs.
*   Author: Darren Kearney
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
}

var PLAYER = {
    'name': "Basic Player",
    'baseHitPoints': 20,
    'hitPoints': 20,
    'strength': 8,
    'agility': 5,
    'luck': 30
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