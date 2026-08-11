// Save system (IMPORTANT!)
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


function hardReset() {
    if (confirm("Are you sure you want to erase your lifetime progress and start over?")) {
        localStorage.removeItem("gameSave");
        location.reload();
    }
}

const savenotif = document.getElementById("savingnotif")

function saveGame() {

    console.log("Saving game...")

    const allBars = [vitBar, flexBar, fitnessBar, magicBar, martialBar, magicstudyBar, hitBar, taichiBar];
    let state = {
            player: {
                knowledge: player.knowledge,
                day: player.day,
                year: player.year,
                cap: player.cap,
                baseKnowledgeIncrease: player.baseKnowledgeIncrease,
                wisdom: player.wisdom,
                wisdomRate: player.wisdomRate,
                lifespan: player.lifespan,
                totalpitrolls: player.totalpitrolls,
            },
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
        const allBars = [vitBar, flexBar, fitnessBar, magicBar, martialBar, magicstudyBar, hitBar, taichiBar];

        if (state.player) {
            player.knowledge = state.player.knowledge ?? player.knowledge;
            player.day = state.player.day ?? player.day;
            player.year = state.player.year ?? player.year;
            player.cap = state.player.cap ?? player.cap;
            player.baseKnowledgeIncrease = state.player.baseKnowledgeIncrease ?? player.baseKnowledgeIncrease;
            player.wisdom = state.player.wisdom ?? player.wisdom;
            player.wisdomRate = state.player.wisdomRate ?? player.wisdomRate;
            player.lifespan = state.player.lifespan ?? player.lifespan;
            player.totalpitrolls = state.player.totalpitrolls ?? player.totalpitrolls;
        }
    

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

    } else {
        console.log("no save found")
    }
};





window.addEventListener('DOMContentLoaded', () => {
    loadGame();
    setInterval(saveGame, 10000);
});