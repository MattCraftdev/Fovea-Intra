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

// settings
// Save Slider
const saveSlider = document.getElementById("slidersaveInterval")

saveSlider.addEventListener("input", () => {
    const saveIntervalValue = saveSlider.value
    document.getElementById("saveIntervalDisplay").innerText = `Save Interval: ${saveIntervalValue} Seconds`
    player.saveInterval = saveIntervalValue*1000

    startSaveTimer();
});

let saveTimer = null;
function startSaveTimer() {
    if (saveTimer) {clearInterval(saveTimer)};
    saveTimer = setInterval(saveGame, player.saveInterval);
};

const achievementSlider = document.getElementById("achievementSliderBtns");

achievementSlider.addEventListener("input", () => {
    player.settings.achievementDisplay = achievementSlider.value;
    document.getElementById("achivementStepBtns").innerText = `Achievement buttons in a row: ${player.settings.achievementDisplay}`;

    createAchievementButtons();
});


// SETTING BUTTONS
// Changelog embed iframe
document.getElementById("getChangelog").addEventListener("click", () => {
    if (document.getElementById("changelog").classList.contains("hidden")) {
        document.getElementById("changelog").classList.remove("hidden")
        document.getElementById("getChangelog").innerText = "Back"
    } else {
        document.getElementById("changelog").classList.add("hidden")
        document.getElementById("getChangelog").innerText = "Changelog"
    }
});

document.getElementById("getHelp").addEventListener("click", () => {
    if (document.getElementById("gameInfo").classList.contains("hidden")) {
        document.getElementById("gameInfo").classList.remove("hidden")
    }
});

document.getElementById("backHelp").addEventListener("click", () => {
    document.getElementById("gameInfo").classList.add("hidden")
});

document.getElementById("closeStory").addEventListener("click", () => {
    document.getElementById("Story").classList.add("hidden")
});

document.getElementById("showStory").addEventListener("click", () => {
    if (document.getElementById("Story").classList.contains("hidden")) {
        document.getElementById("Story").classList.remove("hidden")
    }
});

document.getElementById("extraStats").addEventListener("click", () => {
    if (player.settings.extraStats === true) {
        player.settings.extraStats = false;
        document.getElementById("extraStats").innerText = "Extra Stats Disabled"
    } else {
        player.settings.extraStats = true;
        document.getElementById("extraStats").innerText = "Extra Stats Enabled"
    }
})

// Hard reset
function hardReset() {
    if (confirm("Are you sure you want to erase your lifetime progress and start over?")) {
        if (confirm("Are you doubley sure? This might make you sad :(")) {
            if (saveTimer) {clearInterval(saveTimer)}
            console.log("starting removal")
            localStorage.removeItem("gameSave");
            console.log("removed gamesave")
            location.reload();
            console.log("reloading")
        }
    }
}

const savenotif = document.getElementById("savingnotif")
const barsOnly = Object.values(barInfo).map(item => item[0]);

// Save and load
function saveGame() {

    console.log("Saving game...")

    let state = {
        player: player,
        potionStock: potionStock.stocks,
        upgrades: upgrades.map(u => ({ id: u.id, unlocked: u.unlocked, purchased: u.purchased })),
        achievementStack: achievementStack.map(ul => ({ id: ul.id, unlocked: ul.unlocked })),
        bars: barsOnly.map(b => ({ id: b.elementId, level: b.level, maxprogress: b.maxprogress, progress: b.progress})),
        creation: { id: "creation", level: creationBar.level, maxprogress: creationBar.maxprogress, progress: creationBar.progress},
        resources: resources,
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
        renderBars();
        
        if (state.player) {Object.assign(player, state.player);}
        if (state.potionStock) {Object.assign(potionStock.stocks, state.potionStock)}
        if (state.resources) {Object.assign(resources, state.resources);}

        if (state.achievementStack) {
            state.achievementStack.forEach(savedA => {
                let realA = achievementStack.find(ul => ul.id === savedA.id);
                if (realA) {
                    realA.unlocked = savedA.unlocked;
                }
                console.log("Completed Achievements")
            })
        }

        if (state.upgrades) {
            state.upgrades.forEach(savedU => {
                let realU = upgrades.find(u => u.id === savedU.id);
                if (realU) {
                    realU.unlocked = savedU.unlocked;
                    realU.purchased = savedU.purchased;

                    if (realU.purchased >= 1 || realU.purchased === true) {
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
            console.error("No upgrades loaded ERROR")
        }


        if (state.bars) {
            state.bars.forEach(savedB => {
                let realB = barsOnly.find(b => b.elementId === savedB.id);
                if (realB) {
                    realB.loadSaveData(savedB);
                }
            });
        } else {
            console.error("Bars not loaded")
        }

        if (state.creation) {
            let saveState = state.creation
            creationBar.loadSaveData(saveState);
        }

        document.getElementById("saveIntervalDisplay").innerText = `Save Interval: ${player.saveInterval/1000} Seconds`
        saveSlider.value = player.saveInterval/1000
        OnLoadFunctions();

    } else {
        console.log("no save found")
        renderBars();
        OnLoadFunctions();
    }
};

window.addEventListener('DOMContentLoaded', () => {
    loadGame();
    startSaveTimer();
});

function OnLoadFunctions() {
    resetPotionStock(); // Ret
    resetDealerStock(); // Resets 
    createPotionShowing(); // Sets potion showing to be updated
    createAchievementButtons();
    resetThePitTimer(); // Resets pit timer
    changeDealerTimer(); // Resets Dealer timer
    renderMineshafts();
    displayLoop();
    resetMarketStock();
    createInventory();
    updateInventory();

}