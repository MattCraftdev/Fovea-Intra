// Inventory displays
const playerInventorySlots = [
    {
        slotname: "empty",
    },

    {
        slotname: "Dark Helmet"
    },

    {
        slotname: "Bar Dealer"
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
        scrap: [["blackCrystal", 2]],
        multiplier: [[player.mine.minerInterval, 0.75]]
    },

    {
        name: "Bar Dealer",
        slot: "hand",
        crafting: [["barcoins", 250], ["blueGem", 1]],
        scrap: [["barcoins", 300]],
        multiplier: [[boosts.speed, 1.5]]
    },
]

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