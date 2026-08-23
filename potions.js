// Odds and dealers
const potionOdds = [
    {
        Num: 0,
        Name: "Knowledge I",
        rollmin: 0,
        rollmax: 60,
    },

    {
        Num: 1,
        Name: "Knowledge II",
        rollmin: 60,
        rollmax: 80,
    },

    {
        Num: 2,
        Name: "Knowledge III",
        rollmin: 80,
        rollmax: 100,
    },

    {
        Num: 3,
        Name: "Knowledge IV",
        rollmin: 100,
        rollmax: 100,
    },

    {
        Num: 4,
        Name: "Speed I",
        rollmin: 100,
        rollmax: 160,
    },

    {
        Num: 5,
        Name: "Speed II",
        rollmin: 160,
        rollmax: 180,
    },

    {
        Num: 6,
        Name: "Speed III",
        rollmin: 180,
        rollmax: 200,
    },

    {
        Num: 7,
        Name: "Speed IV",
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
        Luck: 7,
        Scam: 9,
    },
]

// Potion creation system
let resources = 0;
let typeCost = "";
// Resets stock, important!
function resetPotionStock() {
    resources = Math.floor(Math.random()*100+100);
    const resourceTypes = ["knowledge", "wisdom", "energy", "matter"]
    typeCost = resourceTypes[Math.floor(Math.random()*resourceTypes.length)]

    document.getElementById("createPotion").innerText = `Buy Potion for ${typeCost} ${resources}`
}

// When you try to buy a potion
document.getElementById("createPotion").addEventListener("click", () => {

    if (player.currentDealer === null) { // Need a dealer before buying (Obviously)
        say("Need a dealer. Get a new one by pressing switch dealers.")

    } else {
        document.getElementById("currentDealer").innerText = `Current Dealer: ${player.currentDealer.Name}`
        console.log(`${typeCost}, ${resources}`)

        if (calcCost([[typeCost, resources]])) { // If you have enough shtuff

            const randomPotion = Math.random()*100*potionOdds.length/4 // Rolls Potion
            const rollPotion = potionOdds.find(tier => tier.rollmin<randomPotion && tier.rollmax>=randomPotion ); // Finds option from roll       
            console.log(potionStock.stocks)

            let luckyPotion = 0; // Luck check
            const luckyRoll = Math.random()*100
            if (player.currentDealer.Luck>luckyRoll) {
                luckyPotion += 1; // Basically increases the potion number by one (from 1=>2 or 2=>3, etc.)
            }


            let scam = false; // Scam check
            const scamRoll = Math.random()*100
            if (player.currentDealer.Scam>scamRoll) {
                scam = true;
            }

            if (scam) {
                say(`You just got scammed by ${player.currentDealer.Name}! What a loser.`)
            } else {
                potionStock.stocks[rollPotion.Num+luckyPotion] += 1;
                say(`You got ${rollPotion.Name} from ${player.currentDealer.Name}!`);                
            }

            resetPotionStock();
        } else {
            say("Need more")
        }
    }

    createPotionShowing();
});

// Switch dealer
document.getElementById("switchDealer").addEventListener("click", () => {
    switchDealers();
});

function switchDealers() {
    const newDealer = potionDealers[Math.floor(Math.random()*potionDealers.length)] // Makes sure it's a different dealer
    if (player.currentDealer === null) {
        player.currentDealer = newDealer
        say(`You got a new dealer! Say hello to ${player.currentDealer.Name}`)
        document.getElementById("currentDealer").innerText = `Current Dealer: ${player.currentDealer.Name}`

    } else {
        if (player.currentDealer.Name == newDealer.Name) {
            switchDealers();
        } else {
            player.currentDealer = newDealer
            say(`You got a new dealer! Say hello to ${player.currentDealer.Name}`)
            document.getElementById("currentDealer").innerText = `Current Dealer: ${player.currentDealer.Name}`
        }
    }
}


// Creates a lil potion showing of each potion
function createPotionShowing() {
    const potionInventory = document.getElementById("potionShowing");
    potionInventory.innerHTML = ""

    potionOdds.forEach (potion => {
        let potionNum = potionStock.stocks[potion.Num]
        const text = document.createElement("p")
        const btn = document.createElement("button")
        
        if (potionNum === null || potionNum === undefined) {potionNum = 0}
        btn.innerText = `Use ${potion.Name}`
        text.innerText = `${potion.Name}: ${potionNum}`
        potionInventory.appendChild(text)
        potionInventory.appendChild(btn)

        btn.addEventListener("click", () => { usePotion(potion.Num) });
    });
}

function usePotion(idNum) {
    if (potionStock.stocks[idNum]>0) {
        potionStock.stocks[idNum] -= 1;

        const selectedPotion = potionOdds.find(id => id.Num === idNum)

        const potionStrength = (idNum % 4)+1 // Gets the potion type of I, II, III, IV.
        let potionDuration = 0;

        if (potionStrength === 1) { // Gets the duration by each type. Yes it's slow but it's accurate
            potionDuration = 60;
        } else if (potionStrength === 2) {
            potionDuration = 120;
        } else if (potionStrength === 3) {
            potionDuration = 300;
        } else {
            potionDuration = 900;
        }

        const type = selectedPotion.Name

        
        const timer = document.createElement("p")
        const potionTimers = document.getElementById("potionTimers");
        
        potionTimers.appendChild(timer);

        potionStock[type] = true;       
        
        let potionDurationLeft = potionDuration;
        const potionTimer = setInterval(() => {
            potionDurationLeft -= 1;
            timer.innerText = `Time left: ${potionDurationLeft} on the ${type}`

            if (potionDurationLeft<=0) {
                potionStock[type] = false;
                clearInterval(potionTimer)
            }
        }, 1000)


    } else {
        say("You can't use something you don't have. Don't just click buttons without thought.")
    }
    createPotionShowing();
}