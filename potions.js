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

    {
        Num: 8,
        Name: "Wisdom I",
        rollmin: 200,
        rollmax: 260,
    },

    {
        Num: 9,
        Name: "Wisdom II",
        rollmin: 260,
        rollmax: 280,
    },

    {
        Num: 10,
        Name: "Wisdom III",
        rollmin: 280,
        rollmax: 300,
    },

    {
        Num: 11,
        Name: "Wisdom IV",
        rollmin: 300,
        rollmax: 300,
    },

    {
        Num: 12,
        Name: "Slow I",
        rollmin: 300,
        rollmax: 360,
    },

    {
        Num: 13,
        Name: "Slow II",
        rollmin: 360,
        rollmax: 380,
    },

    {
        Num: 14,
        Name: "Slow III",
        rollmin: 380,
        rollmax: 400,
    },

    {
        Num: 15,
        Name: "Slow IV",
        rollmin: 400,
        rollmax: 400,
    },
    
];

const potionDealers = [
    {
        Name: "Bobby",
        Luck: 3,
        Scam: 4,
        Time: 30,
    },

    {
        Name: "Amy",
        Luck: 2,
        Scam: 3,
        Time: 25,
    },

    {
        Name: "Joel",
        Luck: 7,
        Scam: 9,
        Time: 32,
    },

    {
        Name: "John",
        Luck: 1,
        Scam: 2,
        Time: 27,
    },

    {
        Name: "Prudence",
        Luck: 6,
        Scam: 9,
        Time: 31,
    },

    {
        Name: "Remy",
        Luck: 4,
        Scam: 10,
        Time: 16,
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

// Buying potions
document.getElementById("createPotion").addEventListener("click", () => {
    if (player.currentDealer === null) { // Need a dealer before buying (Obviously)
        say("Need a dealer. Get a new one by pressing switch dealers.")

    } else {
        
        if (player.currentPotionBuyable) {
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
                resetDealerStock();
            } else {
                say("Need more")
            }
        } else {
            say(`Wait until ${player.currentDealer.Name} is done legally mixing drugs`)
        }
    }

    createPotionShowing();
});

// Switch dealer
document.getElementById("switchDealer").addEventListener("click", () => {
    switchDealers();
});

let dealerInterval = null

function switchDealers() {
    if (player.currentDealerSwitchable) {
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
        
    changeDealerTimer();

    } else {
        say("Wait until you can locate a new dealer.")
    }
}

// System to switch dealers
function changeDealerTimer() {
    player.currentDealerSwitchable = false;
    let timeLeft = 300

    if (dealerInterval) {clearInterval(dealerInterval)}

    dealerInterval = setInterval(() => {
        timeLeft -=1
        document.getElementById("displayDealerWait").innerText = `Time until switching dealers permitted: ${timeLeft}`
        if (timeLeft <= 0) {
            player.currentDealerSwitchable = true;
            clearTimeout(dealerInterval)
        }
        
    }, 1000)
} 

// System to reset dealer dealing potion (interval)
let potionInterval = null;
function resetDealerStock() {
    if (player.currentDealer === null) {
        console.log("No current dealer, cannot reset selling for a dealer")
    } else {
        document.getElementById("currentDealer").innerText = `Current Dealer: ${player.currentDealer.Name}`
        player.currentPotionBuyable = false;
        let timeLeft = player.currentDealer.Time
        if (potionInterval) {clearInterval(potionInterval)}
        potionInterval = setInterval(() => {
            timeLeft -=1
            document.getElementById("displayPotionBuyTimer").innerText = `Time until next potion purchaseable: ${timeLeft}`
            if (timeLeft <= 0) {
                player.currentPotionBuyable = true;
                clearTimeout(potionInterval)
            }
            
        }, 1000);
    }
}

// Creates a lil potion showing of each potion
function createPotionShowing() {
    const potionInventory = document.getElementById("potionShowing");
    potionInventory.innerHTML = ""

    let container = null;
    potionOdds.forEach (potion => {
        if (potion.Num % 4 === 0) {
            container = document.createElement("div")
            container.classList.add("potionsContainer")

            potionInventory.appendChild(container)
        }
        
        const btn = document.createElement("button")
        let potionNum = potionStock.stocks[potion.Num]

        if (potionNum === null || potionNum === undefined) {potionNum = 0}
        btn.innerText = `Use ${potion.Name} (You have ${potionNum})`
        btn.classList.add("potionbtn")
        btn.addEventListener("click", () => { usePotion(potion.Num) });

        if (container) {
            container.appendChild(btn)            
        }
    });
}


// Use the potion
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
        
        console.log
        
        const timer = document.createElement("p")
        const potionTimers = document.getElementById("potionTimers");

        if (potionStock[type]>0) {// If it's stacked (duration of the timer is over 1)
            console.log("stacked potions")
            potionStock[type] += potionDuration;

        } else {
            potionTimers.appendChild(timer); // Else creates a new timer

            potionStock[type] = potionDuration;
            const potionTimer = setInterval(() => {
                potionStock[type] -= 1;
                timer.innerText = `Time left: ${potionStock[type]} on the ${type}`

                if (potionStock[type]<=0) {
                    potionStock[type] = 0;
                    clearInterval(potionTimer)
                }
            }, 1000)
        }

    } else {
        say("You can't use something you don't have. Don't just click buttons without thought.")
    }
    createPotionShowing();
}