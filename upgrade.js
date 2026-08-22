// Upgrade array for each
const upgrades = [
    {
        id: "unlocklifespanTimer",
        cost: [["knowledge", 1000], ["matter", 100], ["energy", 25]],
        unlocked: false,
        reqs: [["energy", 100], ["magic", 5]],
        flavortext: "Something is being touched upon. You need to learn more to reveal it...",
        purchased: 0,
        maxpurchases: 1,
        onpurchase: () => {
            document.getElementById("displayLifespan").classList.remove("hidden");
        },
        purchasetext: "You peer into the unknown. Your lifespan is revealed."
    },

    {
        id: "unlockpit",
        cost: [["wisdom", 5]],
        unlocked: false,
        reqs: [["knowledge", 25]],
        flavortext: "",
        purchased: 0,
        maxpurchases: 1,
        onpurchase: () => {
            document.querySelector('[data-tab = "Pit"]').classList.remove("hidden");
            resetThePitTimer();
        },
        purchasetext: "A big dark hole emerged from the nearby ground. It's deep."
    },

    {
        id: "unlockmoodbtn",
        cost: [["knowledge", 125]],
        unlocked: false,
        reqs: [["knowledge", 100]],
        flavortext: "An idea strikes from all this knowledge building up inside you. Why not map mood on a bar?",
        purchased: 0,
        maxpurchases: 1,
        onpurchase: () => {
            document.getElementById("moodContainer").classList.remove("hidden");
        },
        purchasetext: "A bar floats above your head, dictating your mood"
    },

    {
        id: "unlockcreationbtn",
        cost: [["knowledge", 250]],
        unlocked: false,
        reqs: [["wisdom", 20]],
        flavortext: "What is...matter?",
        purchased: 0,
        maxpurchases: 1,
        onpurchase: () => {
            document.getElementById("displayMatter").classList.remove("hidden");
            document.getElementById("displayMatterBonus").classList.remove("hidden");
            document.querySelector('[data-tab = "Matter"]').classList.remove("hidden");
        },
        purchasetext: "Matter is shown to ye!"
    },

    {
        id: "unlocksetmaxbtn",
        cost: [["matter", 5]],
        unlocked: false,
        reqs: [["matter", 2]],
        flavortext: "If you use the pit, get the set max button",
        purchased: 0,
        maxpurchases: 1,
        onpurchase: () => {
            document.getElementById("setToMax").classList.remove("hidden");
        },
        purchasetext: "Click the button to set inputs to player eqivalent (max)"
    },

    {
        id: "unlockvitbtn",
        cost: [["knowledge", 75], ["wisdom", 2]],
        unlocked: false,
        reqs: [["knowledge", 60]],
        flavortext: "I may not have a brain gentlemen. But I have an idea..",
        purchased: 0,
        maxpurchases: 1,
        onpurchase: () => {
            document.getElementById("vitContainer").classList.remove("hidden");
        },
        purchasetext: "A strict routine only for the best"
    },

    {
        id: "unlockmediatebtn",
        cost: [["knowledge", 200], ["wisdom", 10]],
        unlocked: false,
        reqs: [["flex", 20]],
        flavortext: "You feel fat. Maybe it's time to fix this issue.",
        purchased: 0,
        maxpurchases: 1,
        onpurchase: () => {
            document.getElementById("mediateContainer").classList.remove("hidden");
        },
        purchasetext: "Time to get fit!"
    },

    {
        id: "unlockmartialbtn",
        cost: [["wisdom", 50]],
        unlocked: false,
        reqs: [["vit", 20]],
        flavortext: "You just watched your first kung fu movie and now think you're Bruce Lee.",
        purchased: 0,
        maxpurchases: 1,
        onpurchase: () => {
            document.getElementById("martialContainer").classList.remove("hidden");
        },
        purchasetext: "Everybody wa' kung foo fighti-ing hooo haaaa!!"
    },


    {
        id: "unlockhitbtn",
        cost: [["matter", 25]],
        unlocked: false,
        reqs: [["martial", 10]],
        flavortext: "Become flowing water with the wind (No more Kung Foo movies)",
        purchased: 0,
        maxpurchases: 1,
        onpurchase: () => {
            document.getElementById("hitContainer").classList.remove("hidden");
        },
        purchasetext:"You got out of your kung foo phase for the real stuff"
    },

    {
        id: "unlocktaichibtn",
        cost: [["wisdom", 150]],
        unlocked: false,
        reqs: [["vit", 50]],
        flavortext: "Become flowing water with the wind (No more Kung Foo movies)",
        purchased: 0,
        maxpurchases: 1,
        onpurchase: () => {
            document.getElementById("taichiContainer").classList.remove("hidden");
        },
        purchasetext: "Say a proverb because you don't care about life! PEEEEAAAACE!!!"
    },

    {
        id: "unlockwisdomConvertbtn",
        cost: [["knowledge", 10]],
        unlocked: false,
        reqs: [["knowledge", 3]],
        flavortext: "You feel a calling to something more.",
        purchased: 0,
        maxpurchases: 1,
        onpurchase: () => {
            document.getElementById("switchtoWisdom").classList.remove("hidden");
            document.getElementById("displayWisdom").classList.remove("hidden");
            document.getElementById("displayWisdomBonus").classList.remove("hidden");
        },
        purchasetext: "A white beard sprouts on your chin, and your back teeth emerge. You feel...wiser somehow?"
    },

    {
        id: "unlockpeacebtn",
        cost: [["wisdom", 2]],
        unlocked: false,
        reqs: [["wisdom", 1]],
        flavortext: "Wisdom.",
        purchased: 0,
        maxpurchases: 1,
        onpurchase: () => {
            document.getElementById("peaceContainer").classList.remove("hidden");
        },
        purchasetext: "MORE BARS!!!!"
    },

    {
        id: "unlockstudybtn",
        cost: [["wisdom", 10], ["knowledge", 75]],
        unlocked: false,
        reqs: [["wisdom", 10], ["knowledge", 10]],
        flavortext: "What if I just studied how to think?!",
        purchased: 0,
        maxpurchases: 1,
        onpurchase: () => {
            document.getElementById("studyContainer").classList.remove("hidden");
        },
        purchasetext: "The deeper the knowledge the better"
    },

    {
        id: "unlockmagicbtn",
        cost: [["wisdom", 75], ["matter", 5]],
        unlocked: false,
        reqs: [["wisdom", 50]],
        flavortext: "A tree said to you that magic is real",
        purchased: 0,
        maxpurchases: 1,
        onpurchase: () => {
            document.getElementById("magicContainer").classList.remove("hidden");
        },
        purchasetext: "FIREBALL!!!!!"
    },
    {
        id: "unlockmagicstudybtn",
        cost: [["wisdom", 100]],
        unlocked: false,
        reqs: [["magic", 10]],
        flavortext: "You don't really wanna study but..magic kool!!",
        purchased: 0,
        maxpurchases: 1,
        onpurchase: () => {
            document.getElementById("magicstudyContainer").classList.remove("hidden");
        },
        purchasetext: "Books are boring but magic is not."
    },
    {
        id: "unlockmagiclearnerbtn",
        cost: [["matter", 100]],
        unlocked: false,
        reqs: [["magicstudy", 11]],
        flavortext: "Yeah this is just learning but you're cheating",
        purchased: 0,
        maxpurchases: 1,
        onpurchase: () => {
            document.getElementById("magiclearnerContainer").classList.remove("hidden");
        },
        purchasetext: "Time to increase learning with magic!."
    },

    {
        id: "unlockpotionbtn",
        cost: [["wisdom", 50], ["matter" , 20], ["knowledge", 100]],
        unlocked: false,
        reqs: [["wisdom", 40], ["magic", 5]],
        flavortext: "Hmm. Maybe you should call the local drug de- I mean potion maker.",
        purchased: 0,
        maxpurchases: 1,
        onpurchase: () => {
            document.querySelector('[data-tab = "Potion"]').classList.remove("hidden");
        },
        purchasetext: "Potion man giving you a call. Better head down."
    },

    {
        id: "unlockabyssalbtn",
        cost: [["matter", 25], ["knowledge", 50]],
        unlocked: false,
        reqs: [["magic", 15]],
        flavortext: "I should try telling stories to the pit. Communicate with it. Have fun with it.",
        purchased: 0,
        maxpurchases: 1,
        onpurchase: () => {
            document.getElementById("abyssalContainer").classList.remove("hidden");
        },
        purchasetext: "The abyss resides inside the pit."
    },

    {
        id: "unlockenergy",
        cost: [["matter", 50]],
        unlocked: false,
        reqs: [["knowledge", 300]],
        flavortext: "A whisper echoes from around you. 'If you build it, he will come.'",
        purchased: 0,
        maxpurchases: 1,
        onpurchase: () => {
            document.querySelector('[data-tab = "Energy"]').classList.remove("hidden");
        },
        purchasetext: "A well materializes in front of you, filled with green goo."
    },
]

// Checks if any upgrade can be unlocked
const inventionsBtn = document.querySelector('[data-tab = "Inventions"]');

setInterval(() => {
    for (const loop of upgrades) { // Goes through each consecutive Upgrade
        let allReqsMet = true;

        for (const req of loop.reqs) { // Goes into each upgrade on reqs

            const [reqType, reqAmount] = req;

            if (loop.unlocked === false) {

                if (reqType === "knowledge" || reqType === "wisdom" || reqType === "matter" || reqType === "energy") {
                    if (!(player[reqType] >= reqAmount)) {
                        allReqsMet = false;
                    }
                } else {
                    if (!(barInfo[reqType][0].level >= reqAmount)) {
                        allReqsMet = false;
                    }
                }
            } else {
                allReqsMet = false;
            }
        
        }
            


        if (loop.id == "unlockvitbtn" && loop.purchased === 1) {
            document.getElementById("healthheader").style.display = "flex";
        } else if (loop.id == "unlockmagicbtn" && loop.purchased === 1) {
            document.getElementById("magicheader").style.display = "flex";
        }

        if (loop.unlocked === true && document.getElementById(loop.id).classList.contains("hidden") && loop.purchased === 0) {
            console.log(loop.id)
            document.getElementById(loop.id).classList.remove("hidden")
        }

        if (allReqsMet === true) { // If the reqs are met does this
            if (!inventionsBtn.classList.contains("glow")) {
                inventionsBtn.classList.add("glow");
                console.log(`Added glow on ${loop.id} using ${inventionsBtn.classList.contains("glow")}`)
            }

            loop.unlocked = true;
            if (document.getElementById(loop.id).classList.contains("hidden")) {
                console.log(loop.id)
                document.getElementById(loop.id).classList.remove("hidden")
            }
            say(`${loop.flavortext} Check Inventions!`)

        };
    };

}, 500); // Checks every 0.5 seconds

// Buying the upgrade
function buyUpgrade(upgradeId) {
    const upgrade = upgrades.find(item => item.id === upgradeId);

    if (upgrade && upgrade.purchased < upgrade.maxpurchases && calcCost(upgrade.cost)) {
        track(upgrade.id)
        upgrade.purchased += 1
        if (upgrade.purchased>=upgrade.maxpurchases) {
            document.getElementById(upgrade.id).classList.add("hidden")            
        }

        upgrade.onpurchase();
        console.log(upgrade);
        say(upgrade.purchasetext)            
    }
};


// For each button, when clicked buy the upgrade
for (const btns of upgrades) {
    document.getElementById(btns.id).addEventListener("click", () => { buyUpgrade(btns.id); });
};

// UNLOCKER
document.getElementById("unlocker").addEventListener("click", () => {
    if (calcCost([["knowledge", 100]])) {
        const totalnotpurchased = upgrades.filter(UP => UP.purchased === 0)

        if (!totalnotpurchased) {
            console.error("There are no upgrades to buy")
        }

        const Randomreq = totalnotpurchased[Math.floor(Math.random()*totalnotpurchased.length)]

        let allreqs = ``

        for (const eachReq of Randomreq.reqs) {
            console.log(eachReq)
            if (Randomreq.reqs.length === 1) {

            } else {
                allreqs += ` and `
            }
            console.log(eachReq[0])
            if (eachReq[0] === "knowledge" || eachReq[0] === "wisdom" || eachReq[0] === "matter" || eachReq[0] === "energy") {
                allreqs += `${eachReq[1]} ${eachReq[0]}`
            } else {
                allreqs += ` ${barInfo[eachReq[0]][1]} at ${eachReq[1]} Levels`
            }
        }   

        track("unlocker_Used")
        say(`A random upgrade requires ${allreqs}.`)
    }
});
