// Inventory displays
const playerInventorySlots = [
    {
        slotname: "empty",
    },

    {
        slotname: "empty"
    },

    {
        slotname: "empty"
    },
]

function createInventory() {
    const invHolder = document.getElementById("inventoryHolder")
    
    invHolder.innerHTML = ""

    for (const slotCalled in player.inventory  ) {
        const inventoryElement = document.createElement("p")

        inventoryElement.id = slotCalled
        inventoryElement.innerText = `${slotCalled}: ${player.inventory[slotCalled]}`

        invHolder.appendChild(inventoryElement)
    }

    console.log("Finished creating inventory")

}


let selectedItem = null;

function updateInventory() {
    console.log(player.inventory)
    for (const slotCalled in player.inventory) {
        document.getElementById(slotCalled).innerText = `${slotCalled}: ${player.inventory[slotCalled]}`
    }

    // Boosts from items

    // Inventory Rendering
    const invSlots = document.getElementById("inventorySlots")
    invSlots.innerHTML = ""
    for (const allSlots of playerInventorySlots) {
        const slotbtns = document.createElement("button")
        slotbtns.innerText = allSlots.slotname
        invSlots.appendChild(slotbtns)

        slotbtns.addEventListener(("click"), () => {
            equipItem(allSlots.slotname)
        })
    }
}

// Actual Equippables
const items = [
    {
        name: "Dark Helmet",
        slot: "head",
        crafting: [["blackCrystal", 10]],
        oneTimeRecipe: [["blackCrystal", 5]],
        descript: "A dark helmet forged from the semi-common black crystal. Great for mining!",
        researched: false,
        scrap: [["blackCrystal", 2]],
        multiplier: [[player.mine.minerInterval, 0.75]]
    },

    {
        name: "Stone Head",
        slot: "head",
        crafting: [["stone", 100]],
        oneTimeRecipe: [["blackCrystal", 1]],
        descript: "A painful stone covering your head, at least it provides minor protection in the mines",
        researched: false,
        scrap: [["stone", 50]],
        multiplier: [[player.mine.minerInterval, 0.9]]
    },

    {
        name: "Bar Dealer",
        slot: "hand",
        crafting: [["barcoins", 250], ["blueGem", 1]],
        oneTimeRecipe: [["barcoins", 25]],
        descript: "A nice lesson on how to be a bartender in the tavern up north called 'Barder's Blokes'",
        researched: false,
        scrap: [["barcoins", 300]],
        multiplier: [[boosts.speed, 1.5]]
    },

    {
        name: "Old books from a library",
        slot: "hand",
        crafting: [["knowledge", 100], ["stone", 5]],
        oneTimeRecipe: [["energy", 2]],
        descript: "You learned how to duplicate books, by just going to the library and taking a book, and writing all of it down!",
        researched: false,
        scrap: [["energy", 5]],
        multiplier: [[player.resourceIncreases.processedgloop, 2]]
    },


    {
        name: "Chain Vest",
        slot: "main",
        crafting: [["blackCrystal", 10], ["darkPyrite", 1]],
        oneTimeRecipe: [["blackCrystal", 2]],
        descript: "A chain vest, forged using the sturdy black crystal in the depths below. VEST UP!!!",
        researched: false,
        scrap: [["blackCrystal", 5]],
        multiplier: [[player.mine.minerInterval, 0.6]]
    },

    {
        name: "Sludge-Walkers",
        slot: "pants",
        crafting: [["processedgloop", 10], ["stone", 2]],
        oneTimeRecipe: [["energy", 2]],
        descript: "Pants that aren't really good pants, they instead just make you feel uncomfortable. Please take them off.",
        researched: false,
        scrap: [["energy", 5]],
        multiplier: [[player.resourceIncreases.processedgloop, 2]]
    },
]

// Equip Items
function equipItem(item) {
    const foundItem = items.find(name => item === name.name)

    if (foundItem === undefined) {
        return;
    }

    console.log(player.inventory)

    let slotState = null;

    for (const selectedSlot in player.inventory) {
        if (selectedSlot === foundItem.slot) {
            slotState = selectedSlot
        }
    }

    player.inventory[slotState] = foundItem.name
    
    updateInventory();
}

// Scrapping an item
let itemSelected = null;
document.getElementById("scrapItem").addEventListener("click", () => {
    scrapItem(itemSelected);
});

function scrapItem(item) {
    const specificItem = items.find(i => i.name === item);
    const checkSlots = playerInventorySlots.some(slot => slot.slotname === specificItem.name);

    if (checkSlots) {
        const finder = playerInventorySlots.findIndex(slot => slot.slotname === specificItem.name);
        playerInventorySlots[finder].slotname = "empty";

        for (const stuff of specificItem.scrap) {
            const [type, amount] = stuff; 
            resources[type] += amount;
        }
        updateInventory();
    }
}

// Crafting/Researched an item
function craftItem(item) {
    const specificItem = items.find(i => i.name === item);

    if (specificItem.researched == false && calcCost(specificItem.oneTimeRecipe)) {
        specificItem.researched = true;
        console.log(`${specificItem.name} Researched!`)
        openItem(specificItem.name);
    } else {
        const checkSlots = playerInventorySlots.some(slot => slot.slotname === "empty");

        if (checkSlots && calcCost(specificItem.crafting)) {
            const finder = playerInventorySlots.findIndex(slot => slot.slotname === "empty");
            playerInventorySlots[finder].slotname = item;

            openItem(specificItem.name);
            updateInventory();
        } else {
            say("Can't craft this bucko! Perhaps your slots are full or you don't have the necessary resources!")
        }        
    }

}

// Finding the info ON an item
function openItem(item) {
    const specificItem = items.find(i => i.name === item);

    document.getElementById("itemName").innerText = `Item Name: ${specificItem.name}`
    document.getElementById("itemReqs").innerText = `Item Requires to craft: ${specificItem.crafting}`
    document.getElementById("itemDescript").innerText = `Item Description: ${specificItem.descript}`
    document.getElementById("itemResearched").innerText = `Item researched: ${specificItem.researched}. To research, costs: ${specificItem.oneTimeRecipe}`
    document.getElementById("itemOther").innerText = `Slot: ${specificItem.slot}`

    if (specificItem.researched) {
        document.getElementById("craftIt").innerText = `Craft ${specificItem.name}`;
    } else {
        document.getElementById("craftIt").innerText = `Research ${specificItem.name}`;
    }

    document.getElementById("craftIt").addEventListener("click", () => { craftItem(specificItem.name)});
};

// create the buttons for viewing
function createCraftButtons() {
    for (const anItem of items) {
        const btn = document.createElement("button");
        
        btn.innerText = anItem.name
        btn.classList.add("upgrade");

        if (anItem.researched) {
            btn.style.color = `#1b851b`;
        } else {
            btn.style.color = `#717171`;
        };

        document.getElementById("craftingRecipes").appendChild(btn);
        btn.addEventListener("click", () => { openItem(anItem.name); });
    };

};