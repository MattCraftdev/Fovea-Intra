// Odds and dealers
const potionOdds = [
    {
        Num: 0,
        Name: "Knowledge Potion I",
        rollmin: 0,
        rollmax: 60,
    },

    {
        Num: 1,
        Name: "Knowledge Potion II",
        rollmin: 60,
        rollmax: 90,
    },

    {
        Num: 2,
        Name: "Knowledge Potion III",
        rollmin: 90,
        rollmax: 100,
    },

    {
        Num: 3,
        Name: "Knowledge Potion IV",
        rollmin: 100,
        rollmax: 100,
    },

    {
        Num: 4,
        Name: "Speed Potion I",
        rollmin: 100,
        rollmax: 160,
    },

    {
        Num: 5,
        Name: "Speed Potion II",
        rollmin: 160,
        rollmax: 190,
    },

    {
        Num: 6,
        Name: "Speed Potion III",
        rollmin: 190,
        rollmax: 200,
    },

    {
        Num: 7,
        Name: "Speed Potion IV",
        rollmin: 200,
        rollmax: 200,
    },

];

const potionDealers = [
    {
        Name: "Bobby",
        Luck: 3,
        Scam: 4,
    },

    {
        Name: "Amy",
        Luck: 2,
        Scam: 3,
    },

    {
        Name: "Joel",
        Luck: 6,
        Scam: 9,
    },
]

// Potion creation system
let resources = 0;
let typeCost = "";
// Resets stock, important!
function resetPotionStock() {
    resources = Math.random()*100+100;
    resources = parseFloat(resources.toFixed(0))
    const resourceTypes = ["knowledge", "wisdom", "energy"]
    typeCost = resourceTypes[Math.floor(Math.random()*resourceTypes.length)]

    document.getElementById("createPotion").innerText = `Create Potion for ${typeCost} ${resources}`
}

// When you try to buy a potion
document.getElementById("createPotion").addEventListener("click", () => {

    if (player.currentDealer === null) { // Need a dealer before buying (Obviously)

        player.currentDealer = potionDealers[Math.floor(Math.random()*potionDealers.length)]
        say(`You got a new dealer! Say hello to ${player.currentDealer.Name}`)

    } else {
        console.log(player.currentDealer)

        if (calcCost(typeCost, resources)) { // If you have enough shtuff

            const randomPotion = Math.random()*100*potionOdds.length/4 // Rolls Potion
            const rollPotion = potionOdds.find(tier => tier.rollmin<randomPotion && tier.rollmax>=randomPotion ); // Finds option from roll       
            console.log(player.potionStock)

            player.potionStock[rollPotion.Num] += 1;
            say(`You got ${rollPotion.Name} from ${player.currentDealer.Name}!`);

            resetPotionStock();
        } else {
            say("Need more")
        }
    }

    createPotionShowing();
});

// Creates a lil
function createPotionShowing() {
    const potionInventory = document.getElementById("potionShowing");
    potionInventory.innerHTML = ""
    
    potionOdds.forEach (potion => {
        let potionNum = player.potionStock[potion.Num]
        const text = potionElement = document.createElement("p")
        
        if (potionNum === null || potionNum === undefined || potionNum === NaN) {potionNum = 0}
        text.innerText = `${potion.Name}: ${potionNum}`
        potionInventory.appendChild(text)
    });
}