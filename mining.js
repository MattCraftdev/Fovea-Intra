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
        minersOn: 0,
    },

    {
        id: "unlockshaft2",
        name: "Dark Celler",
        diff: 100,
        minersOn: 0,
    },

    {
        id: "unlockshaft3",
        name: "Scary Cave",
        diff: 1000,
        minersOn: 0,
    },

    {
        id: "unlockshaft4",
        name: "Deep Pit",
        diff: 5000,
        minersOn: 0,
    },

]

function renderMineshafts() {
    const container = document.getElementById("mineshaftContainer")
    container.innerHTML = ""

    for (const chosenmine of mineshafts) {
        const mineshaft = upgrades.find(check => check.id === chosenmine.id);

        const element = document.createElement("div")
        element.classList.add("progress-container")
        element.innerText = `${chosenmine.name}: ${chosenmine.minersOn}/${player.miners}`
        element.style.width = "400px"
        element.style.height = "100px"

        const buttonAdd = document.createElement("button")
        const buttonSubtract = document.createElement("button")

        buttonAdd.innerText = `Assign a miner to ${chosenmine.name}`
        buttonAdd.classList.add("minerbtn")

        buttonSubtract.innerText = `Take off a miner from ${chosenmine.name}`
        buttonSubtract.classList.add("minerbtn")

        
        if (mineshaft && mineshaft.purchased === 1) {
            container.appendChild(element)
            container.appendChild(buttonAdd)
            container.appendChild(buttonSubtract)

            let totalMinersUsed = 0;
            for (const mines of mineshafts) {
                totalMinersUsed += mines.minersOn
            }
            console.log(totalMinersUsed)

            buttonAdd.addEventListener("click", () => {
                if (totalMinersUsed<player.miners) {
                    chosenmine.minersOn += 1
                }
            })

            buttonSubtract.addEventListener("click", () => {
                if (chosenmine.minersOn>0) {
                    chosenmine.minersOn -= 1;
                }
            })
        }

    }
}
