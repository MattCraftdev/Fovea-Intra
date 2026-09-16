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
        diff: 10,
        progress: 0,
        minersOn: 0,
    },

    {
        id: "unlockshaft2",
        name: "Dark Celler",
        diff: 100,
        progress: 0,
        minersOn: 0,
    },

    {
        id: "unlockshaft3",
        name: "Scary Cave",
        diff: 1000,
        progress: 0,
        minersOn: 0,
    },

    {
        id: "unlockshaft4",
        name: "Deep Pit",
        diff: 5000,
        progress: 0,
        minersOn: 0,
    },

]

const miningBarsRenders = {}

function renderMineshafts() {
    const container = document.getElementById("mineshaftContainer")
    container.innerHTML = ""

    for (const chosenmine of mineshafts) {
 
        const element = document.createElement("div")
        element.classList.add("progress-container")
        element.classList.add("hidden")
        element.innerText = `${chosenmine.name}: ${chosenmine.minersOn}/${player.miners}`
        element.style.width = "400px"
        element.style.height = "100px"
        element.id = `${chosenmine.id}div`

        const buttonAdd = document.createElement("button")
        const buttonSubtract = document.createElement("button")

        buttonAdd.innerText = `Assign a miner to ${chosenmine.name}`
        buttonAdd.classList.add("minerbtn")
        buttonAdd.classList.add("hidden")
        buttonAdd.id = `${chosenmine.id}add`

        buttonSubtract.innerText = `Take off a miner from ${chosenmine.name}`
        buttonSubtract.classList.add("minerbtn")
        buttonSubtract.classList.add("hidden")
        buttonSubtract.id = `${chosenmine.id}subtract`

        // Progress bars in the mining
        const containerDiv = document.createElement("div")
        const progressContainer = document.createElement("div")
        const progressBar = document.createElement("div")
        const progressText = document.createElement("span")
        miningBarsRenders[chosenmine.id] = new ProgressBar(chosenmine.id, 0, 0, 0)

        progressContainer.classList.add("progress-container")
        progressContainer.classList.add("hidden")
        progressContainer.id = `${chosenmine.id}btn`
        
        progressBar.classList.add("progress-bar")
        progressBar.id = `${chosenmine.id}`

        progressText.classList.add("progress-text")
        progressText.id = `${chosenmine.id}Display`

        container.appendChild(element)
        container.appendChild(buttonAdd)
        container.appendChild(buttonSubtract)
        container.appendChild(containerDiv)

        containerDiv.appendChild(progressContainer)
        progressContainer.appendChild(progressBar)
        progressContainer.appendChild(progressText)

        buttonAdd.addEventListener("click", () => {
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
        const divC = `${ids}div`
        const addBtn = `${ids}add`
        const subtractBtn = `${ids}subtract`
        const progressContainer = `${ids}btn`
        const progressText = `${ids}Display`
        const progressBar = miningBarsRenders[ids]

        if (unlockMineshaft && unlockMineshaft.purchased === 1) {
            if (document.getElementById("mineshaftContainer").classList.contains("hidden")) {
                document.getElementById("mineshaftContainer").classList.remove("hidden")
            }

            if (document.getElementById(divC) && document.getElementById(divC).classList.contains("hidden")) {
                document.getElementById(divC).classList.remove("hidden")
                document.getElementById(addBtn).classList.remove("hidden")
                document.getElementById(subtractBtn).classList.remove("hidden")
                document.getElementById(progressContainer).classList.remove("hidden")
            }

        }
        
        if (document.getElementById(divC)) {
            document.getElementById(divC).innerText = `${mineshaft.name}: ${mineshaft.minersOn}/${player.miners}`            
        }

        if (document.getElementById(progressText)) {
            document.getElementById(progressText).innerText = `${mineshaft.progress}/${mineshaft.diff}`
        }

        if (document.getElementById(progressContainer)) {
            const percent = (mineshaft.progress/mineshaft.diff)*100
            progressBar.view(percent)
        }
    }
}