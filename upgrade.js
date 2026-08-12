// Upgrade array for each
const upgrades = [
    {
        id: "unlock1",
        cost: 100,
        costtype: "knowledge",
        unlocked: false,
        reqamount: 50,
        reqtype: "knowledge",
        flavortext: "I may not have a brain gentlemen. But I have an idea..",
        purchased: 0,
        maxpurchases: 1,
        onpurchase: () => {
            document.getElementById("vitContainer").classList.remove("hidden");
        },
        purchasetext: "A strict routine only for the best"
    },

    {
        id: "unlocklifespanTimer",
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
        },
        purchasetext: "You peer into the unknown. Your lifespan is revealed."
    },

    {
        id: "unlockwisdombtn",
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
        },
        purchasetext: "A white beard sprouts on your chin, and your back teeth emerge. You feel...wiser somehow?"
    },

    {
        id: "unlockknowledgebtn",
        cost: 10,
        costtype: "wisdom",
        unlocked: false,
        reqamount: 4,
        reqtype: "wisdom",
        flavortext: "What if I just studied how to think?!",
        purchased: 0,
        maxpurchases: 1,
        onpurchase: () => {
            document.getElementById("knowledgeContainer").classList.remove("hidden");
        },
        purchasetext: "The deeper the knowledge the better"
    },

        {
        id: "unlockfitnessbtn",
        cost: 500,
        costtype: "knowledge",
        unlocked: false,
        reqamount: 25,
        reqtype: "vitLevel",
        flavortext: "You feel fat. Maybe it's time to fix this issue.",
        purchased: 0,
        maxpurchases: 1,
        onpurchase: () => {
            document.getElementById("fitnessContainer").classList.remove("hidden");
        },
        purchasetext: "Time to get fit!"
    },

        {
        id: "unlockmartialbtn",
        cost: 75,
        costtype: "wisdom",
        unlocked: false,
        reqamount: 25,
        reqtype: "flexLevel",
        flavortext: "You just watched your first kung fu movie and now think you're Bruce Lee.",
        purchased: 0,
        maxpurchases: 1,
        onpurchase: () => {
            document.getElementById("martialContainer").classList.remove("hidden");
        },
        purchasetext: "Everybody wa' kung foo fighti-ing hooo haaaa!!"
    },

        {
        id: "unlockmagicbtn",
        cost: 50,
        costtype: "wisdom",
        unlocked: false,
        reqamount: 10,
        reqtype: "wisdom",
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
        cost: 100,
        costtype: "wisdom",
        unlocked: false,
        reqamount: 10,
        reqtype: "magicLevel",
        flavortext: "You don't really wanna study but..magic kool!!",
        purchased: 0,
        maxpurchases: 1,
        onpurchase: () => {
            document.getElementById("magicstudyContainer").classList.remove("hidden");
        },
        purchasetext: "Books are boring but magic is not."
    },

        {
        id: "unlockhitbtn",
        cost: 1000,
        costtype: "knowledge",
        unlocked: false,
        reqamount: 10,
        reqtype: "martialLevel",
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
        cost: 150,
        costtype: "wisdom",
        unlocked: false,
        reqamount: 15,
        reqtype: "martialLevel",
        flavortext: "Become flowing water with the wind (No more Kung Foo movies)",
        purchased: 0,
        maxpurchases: 1,
        onpurchase: () => {
            document.getElementById("taichiContainer").classList.remove("hidden");
        },
        purchasetext: "Say a proverb because you don't care about life! PEEEEAAAACE!!!"
    },
        {
        id: "unlockpit",
        cost: 10,
        costtype: "knowledge",
        unlocked: false,
        reqamount: 2,
        reqtype: "knowledge",
        flavortext: "",
        purchased: 0,
        maxpurchases: 1,
        onpurchase: () => {
            document.getElementById("the-pit").classList.remove("hidden");
            document.getElementById("no-pit").classList.add("hidden");
        },
        purchasetext: "A big dark hole emerged from the nearby ground. It's deep."
    },

        {
        id: "unlockenergy",
        cost: 1000,
        costtype: "knowledge",
        unlocked: false,
        reqamount: 250,
        reqtype: "knowledge",
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
                    
            say(`${loop.flavortext}. Check Inventions!`)
        };

        if (loop.id == "unlock1" && loop.unlocked == true) {
            document.getElementById("healthSection").style.display = "block";
            document.getElementById("healthheader").style.display = "flex";
        } else if (loop.id == "unlockmagicbtn" && loop.unlocked == true) {
            document.getElementById("magicSection").style.display = "block";
            document.getElementById("magicheader").style.display = "flex";
        }

        if (loop.unlocked === true && document.getElementById(loop.id).classList.contains("hidden") && loop.purchased === 0) {
            console.log(loop.id)
            document.getElementById(loop.id).classList.remove("hidden")
        }
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
        console.log(upgrade);
        say("Upgrade unlocked!!!")
        say(upgrade.purchasetext)
    };
};


// For each button, when clicked buy the upgrade
for (const btns of upgrades) {
    document.getElementById(btns.id).addEventListener("click", () => { buyUpgrade(btns.id); });
};