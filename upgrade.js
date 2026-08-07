// Upgrade array for each
const upgrades = [
    {
        id: "unlock1",
        description: "Unlocks the ability to increase your vitality.",
        cost: 100,
        costtype: "knowledge",
        unlocked: false,
        reqamount: 50,
        reqtype: "knowledge",
        flavortext: "There's a plan I want to do. (Go to Inventions)",
        purchased: 0,
        maxpurchases: 1,
        onpurchase: () => {
            document.getElementById("vitContainer").classList.remove("hidden");
            say("You design a strict routine. Your physical form feels... resilient.");
        }
    },

    {
        id: "unlocklifespanTimer",
        description: "Unlocks the ability to see your lifespan.",
        cost: 1000,
        costtype: "knowledge",
        unlocked: false,
        reqamount: 200,
        reqtype: "knowledge", 
        flavortext: "Something is being touched upon. You need to learn more to reveal it...",
        purchased: 0,
        maxpurchases: 1,
        onpurchase: () => {
            document.getElementById("displayLifespan").classList.remove("hidden");
            say("You peer into the unknown. Your lifespan is revealed.");
        }
    },

    {
        id: "unlockwisdombtn",
        description: "The act of transfering knowledge into wisdom.",
        cost: 35,
        costtype: "knowledge",
        unlocked: false,
        reqamount: 25,
        reqtype: "knowledge",
        flavortext: "You feel a calling to something more.",
        purchased: 0,
        maxpurchases: 1,
        onpurchase: () => {
            document.getElementById("switchtoWisdom").classList.remove("hidden");
            document.getElementById("displayWisdom").classList.remove("hidden");
            say("A white beard sprouts on your chin, and your back teeth emerge.");
        }
    },

    {
        id: "unlockknowledgebtn",
        description: "Know thyself.",
        cost: 10,
        costtype: "wisdom",
        unlocked: false,
        reqamount: 4,
        reqtype: "wisdom",
        flavortext: "You feel a calling to something more.",
        purchased: 0,
        maxpurchases: 1,
        onpurchase: () => {
            document.getElementById("knowledgeContainer").classList.remove("hidden");
            say("Learning with life");
        }
    },

        {
        id: "unlockfitnessbtn",
        description: "Know thyself.",
        cost: 500,
        costtype: "knowledge",
        unlocked: false,
        reqamount: 25,
        reqtype: "vitLevel",
        flavortext: "You feel a calling to something more.",
        purchased: 0,
        maxpurchases: 1,
        onpurchase: () => {
            document.getElementById("fitnessContainer").classList.remove("hidden");
            say("Learning with life");
        }
    },

        {
        id: "unlockmagicbtn",
        description: "magic bro",
        cost: 50,
        costtype: "wisdom",
        unlocked: false,
        reqamount: 10,
        reqtype: "wisdom",
        flavortext: "You feel a calling to something more.",
        purchased: 0,
        maxpurchases: 1,
        onpurchase: () => {
            document.getElementById("magicContainer").classList.remove("hidden");
            say("Learning with life");
        }
    },

]

// Checks if any upgrade can be unlocked

const inventionsBtn = document.querySelector('[data-tab = "Inventions"]');

setInterval(() => {
    for (const loop of upgrades) {
        if (player[loop.reqtype]>=loop.reqamount && loop.unlocked == false) {
            
            if (inventionsBtn.classList.contains("glow")) {

            } else {
            inventionsBtn.classList.add("glow");
            console.log(`Added glow on ${loop.id} using ${inventionsBtn.classList.contains("glow")}`)

            }

            loop.unlocked = true;
            if (document.getElementById(loop.id).classList.contains("hidden")) {
                console.log(loop.id)
                document.getElementById(loop.id).classList.remove("hidden")
            }
                    
            say(loop.flavortext)
        };
    };
}, 500);

// Buying the upgrade
function buyUpgrade(upgradeId) {
    const upgrade = upgrades.find(item => item.id === upgradeId);

    if (upgrade && upgrade.cost<=player[upgrade.costtype] && upgrade.purchased < upgrade.maxpurchases) {

        player[upgrade.costtype] -= upgrade.cost
        upgrade.purchased += 1
        document.getElementById(upgrade.id).classList.add("hidden")
        upgrade.onpurchase();
        console.log(upgrade)

    };
};

// For each button, when clicked buy the upgrade
for (const btns of upgrades) {
    document.getElementById(btns.id).addEventListener("click", () => { buyUpgrade(btns.id); });
};