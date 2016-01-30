/*
*   Description: This file sets up the character class used in the game.
*   Usage: CHARACTER takes arguments as an object of {key: word} pairs.
*   Author: Darren Kearney
*/

CHARACTER = function (kwargs) {
        this.name =         kwargs.name || '';
        this.desc =         kwargs.desc || '';
        this.hitPoints =    kwargs.hitPoints || 5;
        this.experience =   kwargs.experience || 1;
        this.level =        kwargs.level || 1;
        this.agility =      kwargs.agility || 1;
        this.constitution = kwargs.constitution || 1;
        this.luck =         kwargs.luck || 1;
        this.ritualPower =  kwargs.ritualPower || 1;
        this.reknown =      kwargs.reknown || 1;
        this.testMethod =   function () {
            console.log("testMethod called");
        };
}