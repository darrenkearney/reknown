/*
*   Description: This controls the logic and animations for the RITUAL view
*/

// There's something magic about this function name
function ritualLogic() {

    
    // Item select: left & right keys to cycle items, down to select, up to cast
    if (this.leftKey.justDown) {
        // when left key is pressed cycle left in inventory
        if (picker > 0) {
            picker = picker - 1;
        }
        else if (picker == 0) {
            // cycle to rightmost end of inventory
            picker = inventory.length-1;
        }
        console.log('Selected: ' + inventory[picker].toUpperCase() + ' from inventory: ' + inventory);
    }
    else if (this.rightKey.justDown) {
        // when left key is pressed cycle left in inventory
        if (picker < inventory.length-1) {
            picker = picker + 1;
        }
        else if (picker == (inventory.length-1)) {
            // when at rightmost end of inventory, cycle to leftmost end of inventory
            picker = 0;
        }
        console.log('Selected: ' + inventory[picker].toUpperCase() + ' from inventory: ' + inventory);
    } else if (this.downKey.justDown){
        // Select item from inventory
        // if less than 3 add it into selection
        // or swap with last item
        if (ritualChosenItems.length < 3 ) {
            ritualChosenItems.push(inventory[picker]);
            inventory.pop(picker);
        } else {
            ritualChosenItems[2] = inventory[picker];
        }
        console.log("Chosen items: " + ritualChosenItems);
    } else if (this.upKey.justDown){
        // cast ritual with ritualChosenItems
        if (ritualChosenItems.length == 3 ) {
            ritualCast(ritualChosenItems, player);
        } else {
            console.log("You must prepare more items before ritual casting")
        }
    }

    
}

// Generic Functions
function roll (min, max) {
    return Math.round(Math.random() * (max-min) + min);
}