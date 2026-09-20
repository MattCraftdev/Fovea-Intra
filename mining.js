// Buy miners
document.getElementById("buyMiner").addEventListener("click", () => {
    if (calcCost([["barcoins", mine.minerCost]])) {
        player.miners += 1;
        mine.minerCost = 100+(player.miners ** 2)
    }
})

// Mineshafts
const mineshafts = [
    {
        id: "unlockshaft1",
        name: "Basic Tunnel",
        diff: 100,
        xp: 2,
        progress: 0,
        minersOn: 0,
        resourceChances: [["stone", 10], ["blackCrystal", 95]]
    },

    {
        id: "unlockshaft2",
        name: "Dark Celler",
        diff: 1000,
        xp: 3,
        progress: 0,
        minersOn: 0,
        resourceChances: [["stone", 0], ["blackCrystal", 50], ["darkPyrite", 95]]
    },

    {
        id: "unlockshaft3",
        name: "Scary Cave",
        diff: 10000,
        xp: 4,
        progress: 0,
        minersOn: 0,
        resourceChances: [["stone", 0], ["blackCrystal", 40], ["blueGem", 90]]
    },

    {
        id: "unlockshaft4",
        name: "Deep Pit",
        diff: 50000,
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
        text.id = `${chosenmine.id}btn`
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
        pContainer.classList.add("progress-container")
        pContainer.style.width = "400px"
        pContainer.style.height = "100px"


        const bar = document.createElement("div")
        bar.id = `${chosenmine.id}bar`
        bar.classList.add("progress-bar")
        bar.style.backgroundColor = `rgb(79, 79, 79)`

        const shaftDiv = document.createElement("div")
        shaftDiv.id = `${chosenmine.id}mainContainer`
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
        const text = `${ids}btn`
        const progressBar = miningBarsRenders[ids]

        if (unlockMineshaft && unlockMineshaft.purchased === 1) {
            if (document.getElementById("mineshaftContainer").classList.contains("hidden")) {
                document.getElementById("mineshaftContainer").classList.remove("hidden")
            }

            if (document.getElementById(mainContainer) && document.getElementById(mainContainer).classList.contains("hidden")) {
                document.getElementById(mainContainer).classList.remove("hidden")
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
        if (player.barcoins>mines.minersOn) {

            player.barcoin -= mines.minersOn;
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

                if (top===null) {
                    say("Your miner came back with...nothing")
                } else {
                    mine[top] += 1;
                }


                mine.minerlevelProgress += mines.xp // XP giving for leveling miners

                if (mine.minerlevelProgress>=mine.minerlevelMax) {
                    mine.minerlevel += 1;
                    mine.minerlevelProgress = 0;
                    mine.levelMax = (mine.levelMax ** 2)
                }
            }

        } else {

            say("Need more barcoins for miners to operate! Don't be a cheapskate, they ain't working free.")
        }
    }

    // Level Buffs
    mine.minerInterval = 5001-(mine.minerlevel)
    
}