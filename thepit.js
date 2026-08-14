
const pitrolls = [
    {
        rollmin:0,
        rollmax:10,
        flavortext: "The pit shakes slightly, but is not impressed you stingy bum!",
    },

    {
        rollmin:10,
        rollmax:20,
        flavortext: "The pit still is not satisfied. Try throwing more.",
    },

    {
        rollmin:20,
        rollmax:30,
        flavortext: "A sour smell fills the air, but alas nothing comes from thee pit.",
    },

    {
        rollmin:30,
        rollmax:40,
        flavortext: "A little chime plays from the pit, and a neat package hits you in the head.",
        kMax:20,
        wMax:2,
    },

    {
        rollmin:40,
        rollmax:50,
        flavortext: "A small box floats out of the pit somehow, lightly hovering into your hands.",
        kMax:50,
        wMax:5,
    },

    {
        rollmin:50,
        rollmax:60,
        flavortext: "A bunch of thoughts fill your head, and suddenly you know. The pit laughs.",
        kMax:75,
        wMax:10,
    },

    {
        rollmin:60,
        rollmax:70,
        flavortext: "A bigger box is chucked at you from deep inside the pit.",
        kMax:100,
        wMax:10,
    },

    {
        rollmin:70,
        rollmax:80,
        flavortext: "The pit has a mild conversation with you, and gives you a hug.",
        kMax:125,
        wMax:15,
    },

    {
        rollmin:80,
        rollmax:85,
        flavortext: "The pit thanks you for playing this game",
        kMax:150,
        wMax:15,
    },

    {
        rollmin:85,
        rollmax:90,
        flavortext: "The pit screams how the dev forgot to patch something",
        moodcapadd:50,
    },

    {
        rollmin:90,
        rollmax:95,
        flavortext: "A beautiful song plays, leaving a tear on your cheek.",
        kMax:175,
        wMax:20,
    },

    {
        rollmin:95,
        rollmax:96,
        flavortext: "A massive amount of knowledge floods your brain",
        kMax:1000,
    },

    {
        rollmin:96,
        rollmax:97,
        flavortext: "Wisdom fills you, and calm resides.",
        wMax:250,
    },

    {
        rollmin:97,
        rollmax:98,
        flavortext: "The pit takes away the strain of life.",
        moodcapadd:300,
    },

    {
        rollmin:98,
        rollmax:99,
        flavortext: "You get nothing. Wait what, this is supposed to be a rare roll!?? DEVELOPER YOU-",
    },
    
    {
        rollmin:99,
        rollmax:100,
        flavortext: "You feel lucky. A shower of items fall onto you",
        kMax:500,
        wMax:100,
    },

    
    {
        rollmin:100,
        rollmax:101,
        flavortext: "A thin package filled with green boxes dumps out near you",
        eMax: 25,
    },

    {
        rollmin:101,
        rollmax:110,
        flavortext: "A deep laugh echoes from the pit, followed by a dull emptiness from deep inside you. Nothing.",
    },

    {
        rollmin:110,
        rollmax:1000,
        flavortext: "A whole lotta luck you're feeling",
        kMax:10000,
        wMax:1000,
    },
]

// THE PIT
document.getElementById("the-pit").addEventListener("click", () => {
    if (player.knowledge > 0 || player.wisdom > 0) {
        console.log("throwing")

        const addbuff = player.knowledge + player.wisdom*6

        player.knowledge = 0;
        player.wisdom = 0;

        const roll = Math.random()*100 + (addbuff/100); //addbuff directly adds to the roll improving roll ceiling, be careful

        const fitroll = pitrolls.find(tier => tier.rollmin<=roll && tier.rollmax>roll );

        if (!fitroll) {
            console.log("Roll number fitting in bracket not found!");
            say("The pit warps reality just to say no. LOL");
            return;
        }

        say(fitroll.flavortext);

        const kMax = fitroll.kMax || 0; // Knowledge
        const kMin = fitroll.kMin || 0;
        const kBoost = fitroll.kBoost || 0;

        const wMin = fitroll.wMin || 0; // Wisdom
        const wMax = fitroll.wMax || 0;
        const wBoost = fitroll.wBoost || 0;

        const lMin = fitroll.lMin || 0; // Lifespan
        const lMax = fitroll.lMax || 0;
        const lBoost = fitroll.lBoost|| 0;

        const rgMin = fitroll.rgMin || 0; // Goop
        const rgMax = fitroll.rgMax || 0;
        const rgBoost = fitroll.rgBoost || 0;

        const pgMin = fitroll.pgMin || 0; // Gloop
        const pgMax = fitroll.pgMax || 0;
        const pgBoost = fitroll.pgBoost || 0;

        const eMin = fitroll.eMin || 0; // Energy
        const eMax = fitroll.eMax || 0;
        const eBoost = fitroll.eBoost || 0;

        const addCap = fitroll.moodcapadd || 0;

        player.knowledge = roundto1(Math.max(Math.random()*kMax,0) + kBoost)
        player.capBonus += roundto1(Math.max(Math.random()*addCap,0))
        player.energy += roundto1(Math.max(Math.random()*eMax, 0))

        if (addCap>0) {
            say(`Mood is calmed. Precisely by ${addCap} points.`)
        }

        if (player.knowledge > 0) {
            say(`It has gifted you ${player.knowledge} knowledge. Be grateful.`);
        }

        if (!document.getElementById("displayWisdom").classList.contains("hidden")) {
            player.wisdom = roundto1(Math.max(Math.random()*wMax, 0) + wBoost)
            
            if (player.wisdom > 0) {
                say(`It has gifted you ${player.wisdom} wisdom. Be grateful.`);
            }
        }

        if (eMax>0) {
            say("Gave y'all energy!")
        }

        player.totalpitrolls += 1;
    } else {
        say("You can't throw nothing into a pit idiot...")
    }
});

function roundto1(varib) {
    return parseFloat(varib.toFixed(0));
};