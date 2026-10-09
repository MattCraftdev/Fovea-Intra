// Buy miners
document.getElementById("buyMiner").addEventListener("click", () => {
    if (calcCost([["barcoins", player.mine.minerCost]])) {
        player.miners += 1;
        player.mine.minerCost = 500+(player.miners ** 2)
    }
})

// Mineshafts
const mineshafts = [
    {
        id: "unlockshaft1",
        name: "Basic Tunnel",
        diff: 50,
        xp: 2,
        progress: 0,
        minersOn: 0,
        resourceChances: [["stone", 10], ["blackCrystal", 95]]
    },

    {
        id: "unlockshaft2",
        name: "Dark Celler",
        diff: 750,
        xp: 3,
        progress: 0,
        minersOn: 0,
        resourceChances: [["stone", 0], ["blackCrystal", 50], ["darkPyrite", 95]]
    },

    {
        id: "unlockshaft3",
        name: "Scary Cave",
        diff: 9999,
        xp: 4,
        progress: 0,
        minersOn: 0,
        resourceChances: [["stone", 0], ["blackCrystal", 40], ["blueGem", 90]]
    },

    {
        id: "unlockshaft4",
        name: "Deep Pit",
        diff: 10000,
        xp: 5,
        progress: 0,
        minersOn: 0,
        resourceChances: [["blackCrystal", 0], ["blueGem", 70], ["darkPyrite", 85]]
    },

]

const miningBarsRenders = {}

function renderMineshafts() {
    const container = document.getElementById("mineshaftContainer")
    container.innerHTML = ""

    for (const chosenmine of mineshafts) {
 
        const text = document.createElement("div")
        text.id = `${chosenmine.id}text`
        text.classList.add("progress-text")

        const buttonAdd = document.createElement("button")
        const buttonSubtract = document.createElement("button")

        buttonAdd.innerText = `Assign a miner to ${chosenmine.name}`
        buttonAdd.classList.add("minerbtn")
        buttonAdd.id = `${chosenmine.id}add`

        buttonSubtract.innerText = `Take off a miner from ${chosenmine.name}`
        buttonSubtract.classList.add("minerbtn")
        buttonSubtract.id = `${chosenmine.id}subtract`

        // Progress bars in the mining
        miningBarsRenders[chosenmine.id] = new ProgressBar(`${chosenmine.id}bar`, 0, 0, 0)

        const pContainer = document.createElement("div")
        pContainer.id = `${chosenmine.id}mainContainer`
        pContainer.classList.add("hidden")
        pContainer.classList.add("progress-container")
        pContainer.style.width = "400px"
        pContainer.style.height = "100px"

        const bar = document.createElement("div")
        bar.id = `${chosenmine.id}bar`
        bar.classList.add("progress-bar")
        bar.style.backgroundColor = `rgb(79, 79, 79)`

        const shaftDiv = document.createElement("div")
        shaftDiv.id = `${chosenmine.id}btns`
        shaftDiv.classList.add("hidden")
        shaftDiv.classList.add("minerContainer")

        container.appendChild(shaftDiv)
        container.appendChild(pContainer)
        shaftDiv.appendChild(buttonAdd)
        shaftDiv.appendChild(buttonSubtract)
        pContainer.appendChild(text)
        pContainer.appendChild(bar)

        buttonAdd.addEventListener("click", () => {

            let totalMinersUse = 0;
            for (const mines of mineshafts) {
                totalMinersUse += mines.minersOn
            }

            if (totalMinersUse<player.miners) {
                chosenmine.minersOn += 1
            }
        })

        buttonSubtract.addEventListener("click", () => {
            if (chosenmine.minersOn>0) {
                chosenmine.minersOn -= 1;
            }
        })

    }

    console.log("Completed mineshaft render")
}


function updateMineshaft() { // Updates units
    for (const mineshaft of mineshafts) {
        const unlockMineshaft = upgrades.find(check => check.id === mineshaft.id); // Unlocks visual mineshafts

        const ids = mineshaft.id
        const mainContainer = `${ids}mainContainer`
        const btns = `${ids}btns`
        const text = `${ids}text`
        const progressBar = miningBarsRenders[ids]

        if (unlockMineshaft && unlockMineshaft.purchased === 1) {
            if (document.getElementById("mineshaftContainer").classList.contains("hidden")) {
                document.getElementById("mineshaftContainer").classList.remove("hidden")
            }

            if (document.getElementById(mainContainer) && document.getElementById(mainContainer).classList.contains("hidden")) {
                document.getElementById(mainContainer).classList.remove("hidden")
                document.getElementById(btns).classList.remove("hidden")
            }

        }

        if (document.getElementById(text)) {
            document.getElementById(text).innerText = `${mineshaft.name}: ${mineshaft.minersOn}/${player.miners} (${mineshaft.progress}/${mineshaft.diff})`
        }

        if (document.getElementById(mainContainer)) {
            const percent = (mineshaft.progress/mineshaft.diff)*100
            progressBar.view(percent)
        }
    }
}

function minerUpdate() {
    for (const mines of mineshafts) {
        if (resources.barcoins>mines.minersOn) {

            resources.barcoins -= mines.minersOn;
            mines.progress += mines.minersOn
            
            if (mines.progress>mines.diff) { // If it progresses enough to get xp
                mines.progress = 0

                const roll = Math.random()*100

                let topChecker = 0;
                let top = null;
                for (const resources of mines.resourceChances) {
                    if (resources[1]<roll) {
                        topChecker = resources[1]
                        top = resources[0]
                    }
                }

                if (top === null) {
                    say("Your miner came back with...nothing")
                } else {
                    resources[top] += 1;
                }


                player.mine.minerlevelProgress += mines.xp // XP giving for leveling miners

                if (player.mine.minerlevelProgress>=player.mine.minerlevelMax) { // Miner level up
                    player.mine.minerlevel += 1;
                    player.mine.minerlevelProgress = 0;
                    player.mine.levelMax = (player.mine.levelMax ** 2)
                }
            }

        }
    }

    // Level Buffs
    player.mine.minerInterval = 5001-(player.mine.minerlevel)
    
}

// Market Code
let marketInterval = null;
function resetMarketStock() {
    const container = document.getElementById("marketHoldings")
    container.innerHTML = ``

    console.log("resetting market stock")

    for (let a = 0; a < player.market.stocks; a++) {

        const resourceKeys = (Object.keys(resources)).filter(stn => !stn.includes("Bonus"))
                
        let resourcesCost = Math.floor(Math.random()*10+5);
        const typeCost = resourceKeys[Math.floor(Math.random()*resourceKeys.length)]
    
        const resourcesGive = Math.floor(Math.random()*10+1);
        let typeGiven = resourceKeys[Math.floor(Math.random()*resourceKeys.length)]

        if (typeGiven === "cap") {
            typeGiven = "capBonus"
        }

        const elementBtn = document.createElement("button")
        elementBtn.id = `marketButton${a}`
        elementBtn.classList.add("upgrade")

        const container = document.getElementById("marketHoldings")

        container.appendChild(elementBtn)

        elementBtn.innerText = `Trade in ${resourcesCost} ${typeCost} to recieve in return ${resourcesGive} ${typeGiven}`
        elementBtn.addEventListener("click", () => {
            if (calcCost([[typeCost, resourcesCost]])) {
                resources[typeGiven] += resourcesGive
                resourcesCost += 1;
                player.market.totalTrades += 1;
                elementBtn.innerText = `Trade in ${resourcesCost} ${typeCost} to recieve in return ${resourcesGive} ${typeGiven}`
            }
        });
    }

    let timeLeft = player.market.resetInterval

    if (marketInterval) {clearInterval(marketInterval)}
    
    marketInterval = setInterval(() => {
        timeLeft -= 1
        document.getElementById("displayMarketInterval").innerText = `Time until market trades expire and change: ${timeLeft}`
        if (timeLeft <= 0) {
            resetMarketStock();
        }
    }, 1000)
}