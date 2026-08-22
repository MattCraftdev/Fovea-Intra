# Newest versions

2026/08/22 2:47 PM - [0.54.0] UI
- Added another umami tracker (unlockerUsed) & edited some original trackers
- Added anon feedback with a google form
- Embeded the changelog into the game, adding a "changelog button" to directly embed
- Buffed pit reset time to 30 (from 60) seconds && added helptext
- Moved help screen to a new screen that's viewable from the start/toggleable off
- Added more help info and made it more readable (and used data lists of dd,dl,dt)
- Updated colors for UI/various things

2026/08/21 10:08 AM - [0.53.1]
- Fixed the UI a bit better (to dark mode)

2026/08/21 12:21 AM - [0.53.0] 
- Fixed error with being allowed to go above moodcap and 'swap' resources (as the other resource declines) and added text
- Renamed upgrade and bar knowledge to study to prevent confusion and make sense.
Did the same thing with wisdom bar (to peace)
And the same thing to matter
- Added stylesheet which adds a lot better smooth visuals
- Added upgrade that costs flat 100 knowledge that gives you the hints of another upgrade. Hints are random and say only the reqs

2026/08/20 2:23 PM - [0.52.0]
- Removed knowledge and wisdom tracking for Umami
- Revised upgrade costs again (this will be a reoccuring issue forever FYI) to be smoother at the start
- Also moved around some bars too, espically thought reqs too
- Now when moodcap is above 100 player resources go down by which one is higher for MOODCAP specifically
- Updated energy system mildly to sync with calcCost
- Added magic learner bar, it's upgrade and effects.

2026/08/19 11:36 PM - [0.51.0]
- Added Umami tracking to knowledge/wisdom clicked, bar levels and upgrades bought, the pit rolled, etc.
- Adding multicost/multireqs to some upgrades
- Balenced bars and speeds
- Specifically changed fitness to mediate and redid it (it was useless basically before)
- Fixed a few small bugs and mildly optimized code
- Did a playtest: Fixed more bugs, reworked a few things and edited a few more things.
- Redid more upgrades, and the pacing is smoother

2026/08/18 11:40 PM - [0.50.0] DYNAMIC UPGRADES II && (TWEAKS && FIXES IV + QOL)
- Added UMAMI tracker, which added a script so it only goes when not my localHost
- Updated calcCost structure, enabling multiple costs
- Merged cost and costtype in upgrades
- Merged reqamount and req in upgrades
- Updated all upgrades to support multicost structure
- Fixed all upgrades to support the same multicost structure
- Updated all requirements to support new req structure
- Updated the requirement system to support multireqs
- Optimized code and cleaned up after coding the systems
- Shifted upgrades around, and added new multicosts+required unlocks
- Balencing a few things with a playtest, specifically fixed a few bugs and made bars a bit better progression wise.
- Nerfed wisdom mood (from *2 to *4) and nerfed wisdom pit (from *10 to *5)
- Fixed major issue with the pit giving super high rolls from nothing (inputs into pit were strings, so it added incorrect)

2026/08/17 11:56 PM - [0.48.0] WISDOM II && TWEAKS
- Optimized code by merging redundant allbars with BarInfo (well deleted allbars)
- Style tweaks
- Bar tweaking/balencing
- Mood text now fits in bar, and if bar unlocks the text hides
- Wisdom is now generated seperatly than knowledge, no more 5:1 wisdom conversion
- Wisdom takes up less moodcap, and also gives a greater bonus in the pit
- Wisdom overflows if your click power for wisdom is over the wisdomRate
- Added another upgrade (wisdom bar) && wisdom bar that increases wisdom click power

2026/08/17 8:52 PM - [0.46.0] MATTER
- Fixed small error with all bars in storage, added "abyssalBar"
- Added a pit bracket for matter & bonus matter system, along with text
- Minor tweaks to small things
- Made the set max button for the pit an upgrade
- Added matter as a system
- Added matter upgrade and soft integration
- Added matter tab && matter bar, which upon leveling increases matter by 1 (changes with upgrades)
- When matter bar is enabled, runs in the background but makes moodcap*0.5 (halving, but could change)
- Updated all upgrades to maybe include matter, and for better pacing
- Fixed minor errors on the way && altered a few minor things

2026/08/17 12:19 AM - [0.44.0] THE PIT IV
- Cleaned up the pits code
- Fixed error with flavortext not randomizing in the pit
- Added more pit brackets
- Fixed big error with bars not unlocking as they couldn't get their level && slightly optimized upgrade code
- Optimized bar code, and removed getLevel()
- Added abyssal bar and upgrade, which multiplies whatever thrown into the pit
- Added set to max button, which sets the values to player amounts (effectively max)

2026/08/16 8:10 PM - [0.43.0] THE PIT III
- Fixed a minor error in wisdom cost convert && altered the pit message
- Added more helptext
- Mildly optimized code by changing 'parseFloat' to Math.floor
- Added the pit timer of a minute, which during you must wait for it to reset
- Edited the pit's scaling system to SQRT(addbost) opposed to x/100, for better early scaling and discouraging throwing minute amounts 
- Added more pit flavortext and brackets
- Added the pit selection where you select what to put into the pit
- Fixed some errors with the pit and all the stuff I added

2026/08/15 8:59 PM - [0.41.0] FIXES && PIT BOOSTS/FLAVORTEXT
- Fixed VERY BAD issue where players could click and hold down enter to get a resource quick
- Optimized save code by removing the getLevel() return in player object
- Further optimized save code by deleting all the safe strict code
- Added bonus knowledge/wisdom that doesn't contribute to mood or be thrown in the pit
- Improved the pit code by making it give bonuses that don't contribute to knowledge/wisdom
- Added upgrade function where it buys upgrade/costs of something. Importantly, it factors in the boosts from the pit for EVERYTHING!
- The pit now has set random bad flavor text that it says when you get nothing
- Added green colors on unlocked things (Player inventory) and also changed player inventory displaying
- Added specific styling for the pit button
- Fixed a few bugs on the way of all this

2026/08/15 4:26 PM - [0.39.2]
- Fixed the bar selection (it was allowing more than 1)
- Made upgrades flex, so they wouldn't hide behind story & added margin 
- Fixed error with save interval setting, and made it correctly work
- Fixed minor pit error with it saying the incorrect value (with addcap)

2026/08/14 2:42 PM - [0.39.0]
- Changed "other" tab to settings
- Slightly boosted the pit's moodcap adding
- Now the tab that's selected has a yellow border
- The bar that's selected also gets a border
- Added color on the mood bar, which is green when mood is good and red when bad

2026/08/14 12:30 AM - [0.38.1]
- Redid the "You died screen"
- Fixed a major bug with it locking you out of the game, by adding a reset button

2026/08/14 12:23 AM - [0.38.0] POTIONS II
- Updated potion system to be more dynamic, adding different resource costs and automatic scaling when adding more
- Potion system now says cost
- Added different dealers to the potion system and save system (Joel, Bobby and Amy)
- Slightly tweaked some upgrades
- Mildly changed the pit's add moodcap
- Added potions.js file!
- Added a little inventory for each potion and their I, II, III and IV (you can't use them yet lol)

2026/08/13 5:52 PM - [0.37.0] POTIONS
- Added potion upgrade, which unlocks the potion tab
- Added a placeholder potion upgrade that works, and potion stocks which save
- Added random potion odds, 3 potions (knowledge I, II and III) and the whole potion getting system

2026/08/13 4:22 PM - [0.36.0] TWEAKS && FIXES III + QOL/UI
- Fixed minor error with create knowledge not updating after page load
- Optimized bar code for selecting and leveling bars
- Redid the code to work so it had correct names
- Fixed issue with bars saying their level was 0 when reloading until you used them
- Added taichi again because somehow it wasn't there before (?)
- Changed story box to be smaller, border on saving notif and a few other minor things
- Aligned the magic bars to be next to health bars
- Added a save interval bar (and settings) which has a 5 to 60 sec range, also saves and loads itself
- Fixed issues with bars not showing progress after reloading until you use them

2026/08/12 6:36 PM - [0.34.0] TWEAKS && FIXES II + QOL
- Fixed scaling with moodcap by changing the pit and vit cost
- Fixed moodcap scaling with vit/martialarts/taichi buffed
- Changed the pit to hide tab until unlocked like energytab
- Updated table reveals (health/magic)
- Fixed minor error with knowledgeBar
- Fixed error with moodcap bar
- Added more help text
- Tweaked flexbar progress to be in half (twice as fast as before)
- Completely revolutized layout of HTML using tables/boxes
- Added text on the side of each bar that tells you what the bar does
Such a pain to add.

2026/08/12 2:00 PM - [0.32.0]
- Added mood bar that shows how much mood capacity you have left.
- Fixed minor bugs with mood bar and cleaned up code with it
- Added mood upgrade for bar

2026/08/12 12:20 AM - [0.31.0] TWEAKS && FIXES
- Switched the energy upgrade to reveal the data-tab, instead of stuff in the tab itself
- Added more variables to the pit and updated the rolls
- Tweaked energy conversion costs
- Tweaked vitality to increase mood cap (not lifespan)
- Fixed minor error with knowledgebar not saving (forgot to put in lol)
- Fixed another error with bars not saving bonuses after save/load (the pit bonuses)
- Fixed a few small bugs
- Completely changed bar system to recalc after load

2026/08/11 7:56 PM - [0.30.0]
- Switched up an upgrade (unlocking the pit)
- Fixed error with saving/loading upgrades (with hiding while being unlocked)
- Updated the pit shell with more additions
- Optimized the pit variable working (each roll bracket doesn't have to have a variable) and cleaned some code up
- Also ported to galaxy.click

2026/08/11 6:44 PM - [0.29.0] ENERGY
- Modified docs by changing functions.js to systems and moving some code there from main.js
- Added energy upgrades
- Added energy well tab and short system (save/loadable aswell)
- Added displaying each energystage (goop, gloop and energy) & buttons and conversion system

2026/08/10 11:05 PM - [0.27.1]
- Fixed the annoying error with upgrade purchasing
- Slightly tweaked the pit by adding a bit more
- Slightly optimized some code, by shrinking line size

2026/08/10 8:08 PM - [0.27.0]
- Completely completed the pit
- Mildly modified a bit of code
- Updated code structure by adding 2 new files (thepit.js && storage.js)
(this version has an error not fixed)

2026/08/10 4:23 PM - [0.26.0] THE PIT II
- Updated the pit's code to be more dynamic
- Added a total pit roll amount
- And finally updated and increased pit ranges (more different pit actions)
- Now says how much know you earn per click for knowledge
- Also added player.cap into the pit for more boosts
- Added jackpots aswell in pit

2026/08/10 1:21 PM - [0.24.1]
- Offically changed name to fovea-intra in repo

2026/08/09 11:56 PM - [0.24.0] HELP BUTTONS
- Added buttons in help to save the game/load the game
- Added a button that hard resets all progress
- Stylized buttons
- Health/magic/etc. groups now hidden until your first upgrade on them
- Added a little saving notif in the bottom corner that appears for 1 second

2026/08/09 10:42 PM - [0.23.0] SAVE/LOAD
- Changed a few varaibles/cleaned up code
- Added game saving and loading

2026/08/09 6:55 PM - [0.22.0] THE PIT 
- Added the pit and it's own tab
- Added the pit's own upgrade, and also a little blurb that initially shown but hides after bought
- Fixed a small error with chatbox
- Added the pit system when you throw in stuff

2026/08/09 5:38 PM - [0.20.1]
- Fixed some minor errors with wisdom code
- Fixed another error with forgotton tai chi button

2026/08/09 5:29 PM - [0.20.0]
- Fixed small error with ratio * a fixed amount
- Modified player cap
- Completely overhauled how mood is calculated, making wisdom also take how much convert rate into consideration
- Also fixed wisdom to a specific convert rate for future easy change

2026/08/09 5:03 PM - [0.19.0]
- Added taichi upgrade that decreases speed of all health bars/upgrades but greatly increases mood cap
- Also modified HIT to swap as taichi (so tai chi decreases speed and HIT increases speed, swapped taichi)
- And slightly tweaked speed calc in updateallspeeds while added taichi buff

2026/08/09 4:31 PM - [0.18.0]
- Added Tai Chi upgrade, that increases the speed of all health upgrades/bars

2026/08/09 3:16 PM - [0.17.1]
- Updated chatbox even MORE by making it add new messages at the top
- Fixed lil bites of code, and it says when upgrades are unlocked and when available to check inventions*

2026/08/09 3:00 PM - [0.17.0]
- Updated chatbox from holding 1 line to 10/any amount max
- Updated all flavor text + unlock messages

2026/08/09 1:22 PM - [0.16.3]
- Fixed errors with buffs (declaring)

2026/08/09 11:35 AM - [0.16.2]
- Grouped together sections of bars (eg. Health bars, magic bars, etc.) with borders
- Added colors and the pizzaz

2026/08/08 10:53 PM - [0.16.1]
- Minor adjustments to magicstudy upgrade (changed req to magiclevel)
- Another small adjustment to making magic increase speed of other magic types

2026/08/08 10:15 PM - [0.16.0]
- Added study magic upgrade, which increases knowledge upgrade speed

2026/08/07 8:59 PM - [0.15.0]
- Added martial arts upgrade which unlocks martial arts

2026/08/06 10:40 PM - [0.14.0] MAGIC
- Added magic upgrade
- Cleaned up minor issues in code
- Checked magic code and it works too

2026/07/25 11:43 AM - [0.13.2]
- Added goatcounter for site analytics

2026/07/21 6:00 PM - [0.13.1]
- Added button highlights for styling on some buttons
- Added href link to changelog (hi there :o meta)

2026/07/11 9:32 PM - [0.13.0] DYNAMIC UPGRADES
- Updated upgrades to be more dynamic with unlocking, adding more
- Added bar levels in player.xxx (array)
- Added fitness upgrade as a whole and it's shop unlock upgrade

2026/07/10 1:44 PM - [0.12.0]
- Slight modifications of bars
- Fixed a few minor errors
- Added mood affecting base bar speed

2026/07/07 5:42 PM - [0.11.2]
- Added different scaling for each bar increase
- Fixed some errors with the scaling as well
- Optimized bar code (automated buttons assigning activeBar)

2026/07/06 12:40 PM - [0.11.1]
- Fixed knowledgebar scaling along with vit scaling
- Updated lifespan/day updating
- Added a complete death screen when dying

2026/07/05 2:58 PM - [0.11.0]
- Added glow on inventions tab when a new upgrade shows up
- Mild tweak with the colors
- Added knowledge increaser, an upgrade that unlocks a knowledge bar and with each level the knowledge bar adds 1 to clicking knowledge

2026/07/04 11:36 PM - [0.10.1]
- Wisdom fully added, along with a hidden button and counter
- Deleted flexability upgrade, opted for flexability to show after vitality got to level 10

2026/07/04 10:58 PM - [0.10.0] WISDOM
- Actually, FINALLY fixed depression and overworked it.
- Added a button to exchange knowledge to wisdom
- More flavour text in upgrades
- Added wisdom unlock

2026/07/04 5:18 PM - [0.9.1] MOCK DEATH
- Optimized button system with upgrades
- Cleaned up lifespan counter with decimal limit of 2
- Changed core code on how player variables are
- You can buy upgrades with different vars DEP once said upgrades implemented in the future
- Mock death added when reached lifespan's end

2026/07/03 10:55 PM - [0.8.0]
- Added another unlock/bar: flexability which increases vit's refill speed
- Cleaned up array code for unlocks
- Fixed some bugs/errors

2026/07/03 1:35 PM - [0.7.1]
- Indirect knowledge cap with mood
- Added other tab for guidence on the game and stats
- Completely changed the mood system
- Overclocked the upgrade system
- Clean ups on loops

2026/07/03 9:03 AM - [0.6.0]
- Optimized and cleaned up some residule code
- Modified depression system, fully renamed to mood and made edits
- Further optimization from seperating into more files (added functions.js)
- Added knowledge gameloop

2026/07/03 12:31 AM - [0.5.0] UNLOCK REQS (precursor to DYNAMIC UPGRADES)
- Added unlock when you get over 10 knowledge to appear in the "Inventions" tab, along with a story message
- Optimized some code
- The unlock now appears and disappears correctly
- Vitality Bar is now "unlocked" from the first unlock
- Added minor story bits :D
- Added another upgrade, the lifespan timer which acts as VIT but costs more
- Made the lifespan timer work and all this fillings with it
- Added upgrades.js

2026/07/02 10:39 PM - [0.3.0] VIT
- Added Bars and vitality marker
- Vitality now extends "lifespan"
- Updated Time System
- ACTUALLY fixed depression Error, and added a bit more
- Added bars.js

2026/07/02 9:15PM - [0.2.1]
- Fixed error with depression

2026/07/01 - [0.2.0] TABS
- Added Tabs for each part
- Added knowledge and made it so you can "birth knowledge"
- Added story message box on the side
- Added depression as a mechanic, mainly mood thoughsss

2026/07/01 3:33PM - Initial Build [0] (EQ to 0.1.0)
- Time system implemented

(Dates interfering with this:)
VACA: July 8-28th
CAMP: AUGUST 4-7th
GALAXY: AUGUST 11th-15th
FF: August 14th, 21st, 28th