/*
*   Description: This file contains functions used in the Ritual Stage.
*   
*/


// Cast a ritual from prepared items.
// 2 params: item array and player.ritualPower 
function ritualCast(items, player) {
    console.log("Casting ritual with " + items);
    castRoll = roll(1,6) + player.ritualPower;
    console.log(castRoll);
    if (roll > 3) {
        console.log("Success! " + castRoll + " RitualPower: " + player.attr.RITUALPOWER);
    }
}