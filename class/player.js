const { Food } = require('./food');
const { Room } = require('./room');

class Player {

    constructor(name, startingRoom) {
        this.name = name;
        this.currentRoom = startingRoom;
        this.items = [];
    }

    move(direction) {

        const nextRoom = this.currentRoom.getRoomInDirection(direction);

        // If the next room is valid, set the player to be in that room
        if (nextRoom) {
            this.currentRoom = nextRoom;

            nextRoom.printRoom(this);
        } else {
            console.log("You cannot move in that direction");
        }
    }

    printInventory() {
        if (this.items.length === 0) {
            console.log(`${this.name} is not carrying anything.`);
        } else {
            console.log(`${this.name} is carrying:`);
            for (let i = 0 ; i < this.items.length ; i++) {
                console.log(`  ${this.items[i].name}`);
            }
        }
    }

    takeItem(itemName) {
        // Picks up an item from the current room into the player's inventory

        for (let item of this.currentRoom.items) {
            if (item.name == itemName) {
                this.items.push(item);
                this.currentRoom.items.splice(this.currentRoom.items.indexOf(item), 1);
            }
        }
    }

    dropItem(itemName) {
        // Drops an item the player is holding into their current room

        for (let item of this.items) {
            if (item.name === itemName) {
                console.log(`${this.name} dropped the ${item.name}`);
                this.currentRoom.items.push(item);
                this.items.splice(this.items.indexOf(item), 1);
            }
            else console.log(`huh?`);
        }
    }

    eatItem(itemName) {
        // Allow the player to eat food items, but not non-food items
        for (let item of this.items) {
            if (item.name === itemName) {
                if(item instanceof Food) {
                    console.log(`${this.name} ate the ${item.name}`);
                    this.items.splice(this.items.indexOf(item), 1);
                }
                else {
                    console.log(`You can't eat the ${item.name}!`);
                }
            }
        }
        
    }

    getItemByName(name) {
        // Retrieves an item from a player's inventory by item name
        for (let item of this.items) {
            if (item.name === name) {
                return item;
            }
        }
    }
}

module.exports = {
  Player,
};