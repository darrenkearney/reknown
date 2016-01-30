/*
*   Description: This file sets up the item class used in the game.
*   Usage: ITEM takes arguments as an object of key: word pairs.
*   Author: Darren Kearney
*/

ITEM = function (kwargs) {
        this.name =         kwargs.name || '';
        this.desc =         kwargs.desc || '';
        this.powerLevel =   kwargs.powerLevel || 0;
        this.attr1 =        kwargs.attr1 || ['', 0];
        this.attr2 =        kwargs.attr1 || ['', 0];
        this.attr3 =        kwargs.attr1 || ['', 0];
        this.selected =     kwargs.selected || false;
}