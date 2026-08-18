
const pitrolls = [
    {
        rollmin:0,
        rollmax:35,
        flavortext: "random",
    },

    {
        rollmin:35,
        rollmax:50,
        flavortext: "A small box floats out of the pit, hovering into your hands. It says 'KNOWLEDGE' on it.",
        kMax:10,
    },

    {
        rollmin:50,
        rollmax:60,
        flavortext: "A bunch of thoughts fill your head, and suddenly you know. The pit laughs.",
        kMax:40,
    },

    {
        rollmin:60,
        rollmax:70,
        flavortext: "A bigger box is chucked at you from deep inside the pit.",
        kMax:50,
        wMax:5,
    },

    {
        rollmin:70,
        rollmax:80,
        flavortext: "The pit has a mild conversation with you, and gives you a hug.",
        kMax:50,
        wMax:10,
    },

    {
        rollmin:80,
        rollmax:85,
        flavortext: "The pit thanks you for playing this game",
        kMax:75,
        wMax:20,
    },

    {
        rollmin:85,
        rollmax:90,
        flavortext: "The pit screams how the dev forgot to patch something",
        moodcapadd:100,
    },

    {
        rollmin:90,
        rollmax:95,
        flavortext: "A beautiful song plays, leaving a tear on your cheek.",
        kMax:150,
        wMax:20,
    },

    {
        rollmin:95,
        rollmax:96,
        flavortext: "A massive amount of knowledge floods your brain",
        kMax:600,
    },

    {
        rollmin:96,
        rollmax:97,
        flavortext: "Wisdom fills you, and calm resides.",
        wMax:100,
    },

    {
        rollmin:97,
        rollmax:98,
        flavortext: "The pit takes away the strain of life.",
        moodcapadd:500,
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
        kMax:300,
        wMax:50,
    },

    
    {
        rollmin:100,
        rollmax:101,
        flavortext: "A thin package filled with green boxes dumps out near you.",
        eMax: 25,
    },

    {
        rollmin:101,
        rollmax:102,
        flavortext: "A can flies out of the pit, landing at your feet with the label 'MATTER'.",
        mMax: 10,
        mBoost: 5,
    },

    {
        rollmin:102,
        rollmax:105,
        flavortext: "The pit tells you a knowledgeable secret, injecting 50 into your brain.",
        kBoost: 50,
    },


    {
        rollmin:105,
        rollmax:110,
        flavortext: "The pit gives you wise advice",
        wBoost: 10,
        wMax: 20,
    },

    {
        rollmin:110,
        rollmax:120,
        flavortext: "The pit likes your gifts!",
        kMax: 100,
        kBoost: 50,
        wMax: 20,
        wBoost: 5,
    },


    {
        rollmin:120,
        rollmax:130,
        flavortext: "The pit says great job, increasing your mood!",
        kMax: 150,
        kBoost: 50,
        addCap: 100,
    },

    {
        rollmin:130,
        rollmax:140,
        flavortext: "Energizzzing!",
        eMax: 50,
        eBoost: 10,
    },

    {
        rollmin:140,
        rollmax:150,
        flavortext: "For all.",
        kMax: 200,
        kBoost: 75,
        wMax: 30,
        wBoost: 10,
    },

    {
        rollmin:150,
        rollmax:1000,
        flavortext: "A whole lotta luck you're feeling",
        kMax:10000,
        wMax:1000,
    },
]

const randomBad = [
    { text: "The pit shakes slightly, but is not impressed you stingy bum!" },
    { text: "The pit still is not satisfied. Try throwing more." },
    { text: "A sour smell fills the air, but alas nothing comes from thy pit." },
    { text: "A deep laugh echoes from the pit, followed by a dull emptiness from deep inside you. Nothing." },
    { text: "You wonder what really lurks inside the pit. And why." },
    { text: "You hear a distinct ringing. It gets louder, and your ears start to hurt. Nothing." },
    { text: "Something whispers into your ear, but upon turning around, nothing's there." },
    { text: "You're getting bored. The pit seems to be a waste of your time." },
    { text: "Something falls from the sky, narrowly missing you. An anvil, how strange." },
]
// THE PIT
let flavor = "";
document.getElementById("the-pit").addEventListener("click", () => {
    if ((knowledge > 0 || wisdom > 0) && knowledge<=player.knowledge && wisdom<=player.wisdom && (knowledge>=0 && wisdom >= 0)) {
        if (player.pitUsable === true) {
            const addbuff = knowledge + (wisdom*10)

            player.knowledge -= knowledge;
            player.wisdom -= wisdom;

            const roll = Math.random()*100 + (Math.sqrt(addbuff*player.pitMulti))-1; //addbuff directly adds to the roll improving roll ceiling, be careful

            const fitroll = pitrolls.find(tier => tier.rollmin<=roll && tier.rollmax>roll );

            if (!fitroll) {
                console.log("Roll number fitting in bracket not found!");
                say("The pit warps reality just to say no. LOL");
                return;
            }

            if (fitroll.flavortext === "random") {
                flavor = randomBad[Math.floor(Math.random()*randomBad.length)]
                fitroll.flavortext = flavor.text
            }
            
            say(fitroll.flavortext);

            const kMax = fitroll.kMax || 0; // Knowledge
            const kBoost = fitroll.kBoost || 0;

            // Wisdom
            const wMax = fitroll.wMax || 0;
            const wBoost = fitroll.wBoost || 0;

            const mMax = fitroll.mMax || 0; // Matter
            const mBoost = fitroll.mBoost || 0;

            // Lifespan
            const lMax = fitroll.lMax || 0;
            const lBoost = fitroll.lBoost|| 0;

            // Goop
            const rgMax = fitroll.rgMax || 0;
            const rgBoost = fitroll.rgBoost || 0;

            // Gloop
            const pgMax = fitroll.pgMax || 0;
            const pgBoost = fitroll.pgBoost || 0;

            // Energy
            const eMax = fitroll.eMax || 0;
            const eBoost = fitroll.eBoost || 0;

            const addCap = fitroll.moodcapadd || 0;

            const currentBonusKnowledge = Math.floor(Math.max(Math.random()*kMax,0) + kBoost);
            const currentBonusWisdom = Math.floor(Math.max(Math.random()*wMax, 0) + wBoost)
            const currentBonusMatter = Math.floor(Math.max(Math.random()*mMax, 0) + mBoost)
            const currentCap = Math.floor(Math.max(Math.random()*addCap,0));

            player.energy += Math.floor(Math.max(Math.random()*eMax, 0));

            player.capBonus += currentCap;
            player.knowledgeBonus += currentBonusKnowledge;
            player.wisdomBonus += currentBonusWisdom;
            player.matterBonus += currentBonusMatter;

            if (addCap>0) {
                say(`Mood is calmed. Precisely by ${currentCap} points.`)
            }

            if (currentBonusKnowledge > 0) {
                say(`It has gifted you ${currentBonusKnowledge} bonus knowledge. Be grateful.`);
            }

            if (!document.getElementById("displayWisdom").classList.contains("hidden")) {
                
                if (currentBonusWisdom > 0) {
                    say(`It has gifted you ${currentBonusWisdom} bonus wisdom. Be grateful.`);
                }
            }

            if (eMax>0) {
                say("You got energy! But it's useless currently")
            }

            if (!document.getElementById("displayMatter").classList.contains("hidden")) {
                if (currentBonusMatter > 0) {
                    say(`It gifted ya ${currentBonusMatter} bonus matter!! Kool beans!`)
                }
            }
            


            player.totalpitrolls += 1;
            resetThePitTimer();
            
        } else {
            say("Wait until the timer finishes!")
        }

    } else {
        say("Pick valid resources to throw")
    }
});

// Resets pit interval
let pitInterval = null;
function resetThePitTimer() {
    player.pitUsable = false;
    player.pitTimer = (player.pitResetTime/1000)

    if (pitInterval) {clearInterval(pitInterval)}

    pitInterval = setInterval(() => {
        player.pitTimer-=1
        if (player.pitTimer <= 0) {
            player.pitUsable = true;
            clearTimeout(pitInterval)
        }
    }, 1000);
}

// Inputs into the pit
const elementpitK = document.getElementById("thepitKnowledge")
elementpitK.addEventListener("input", () => {
   knowledge = elementpitK.value
});

const elementpitW = document.getElementById("thepitWisdom")
elementpitW.addEventListener("input", () => {
    wisdom = elementpitW.value
});

let knowledge = 0;
let wisdom = 0;
// Sets values to what's on player hand
document.getElementById("setToMax").addEventListener("click", () => {
    knowledge = player.knowledge
    wisdom = player.wisdom

    elementpitK.value = player.knowledge
    elementpitW.value = player.wisdom
});