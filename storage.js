// Buttons
document.getElementById("saveGame").addEventListener("click", () => {
    saveGame();
    say("Game saved! (Hopefully)")
});

document.getElementById("loadGame").addEventListener("click", () => {
    loadGame();
    say("Game loaded! (Hopefully)")
});

document.getElementById("resetGame").addEventListener("click", () => {
    hardReset();
});

// Save Slider setting
const saveSlider = document.getElementById("slidersaveInterval")

saveSlider.addEventListener("input", () => {
    const saveIntervalValue = saveSlider.value
    document.getElementById("saveIntervalDisplay").innerText = `Save Interval: ${saveIntervalValue} Seconds`
    player.saveInterval = saveIntervalValue*1000

    startSaveTimer();
});

let saveTimer = null
function startSaveTimer() {
    if (saveTimer) {clearInterval(saveTimer)}
    saveTimer = setInterval(saveGame, player.saveInterval)
};


// Hard reset
function hardReset() {
    if (confirm("Are you sure you want to erase your lifetime progress and start over?")) {
        localStorage.removeItem("gameSave");
        location.reload();
    }
}

const savenotif = document.getElementById("savingnotif")

// Save and load
function saveGame() {

    console.log("Saving game...")

    const allBars = [vitBar, flexBar, fitnessBar, magicBar, martialBar, magicstudyBar, hitBar, taichiBar, knowledgeBar];
    let state = {
        player: player,
        upgrades: upgrades.map(u => ({ id: u.id, unlocked: u.unlocked, purchased: u.purchased })),
        bars: allBars.map(b => ({ id: b.elementId, level: b.level, maxprogress: b.maxprogress, progress: b.progress}))
    };  
    localStorage.setItem("gameSave", JSON.stringify(state));

    savenotif.classList.remove("hidden");
    setTimeout(() => {
        savenotif.classList.add("hidden");
    }, 1000); 
}

function loadGame() {
    let savedGame = localStorage.getItem("gameSave");
    if (savedGame) {
        let state = JSON.parse(savedGame);
        const allBars = [vitBar, flexBar, fitnessBar, magicBar, martialBar, magicstudyBar, hitBar, taichiBar, knowledgeBar];

        if (state.player) {Object.assign(player, state.player);}
    

        if (state.upgrades) {
            state.upgrades.forEach(savedU => {
                let realU = upgrades.find(u => u.id === savedU.id);
                if (realU) {
                    realU.unlocked = savedU.unlocked;
                    realU.purchased = savedU.purchased;

                    if (realU.purchased >= 1 || realU.purchased === true) {
                        console.log("pu")
                        const upgradeFx = upgrades.find(item => item.id === realU.id);
                        if (upgradeFx && typeof upgradeFx.onpurchase === "function") {
                            upgradeFx.onpurchase(); 
                            document.getElementById(realU.id).classList.add("hidden")
                            console.log("Purchased Back")
                        }
                    }
                }
            });

        } else {
            console.log("No upgrades loaded ERROR")
        }


        if (state.bars) {
            state.bars.forEach(savedB => {
                let realB = allBars.find(b => b.elementId === savedB.id);
                if (realB) {
                    realB.loadSaveData(savedB);
                }
            });
        } else {
            console.log("Bars not loaded")
        }

        document.getElementById("saveIntervalDisplay").innerText = `Save Interval: ${player.saveInterval/1000} Seconds`
        saveSlider.value = player.saveInterval/1000
        resetPotionStock();
        createPotionShowing();
        resetThePitTimer();

    } else {
        console.log("no save found")
    }
};

window.addEventListener('DOMContentLoaded', () => {
    loadGame();
    startSaveTimer();
});