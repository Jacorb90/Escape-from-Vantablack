const NEWS = [
	"The universe has been cast in darkness for ages...",
	"We will climb out of this well, one photon at a time!",
	"In order to survive your journey with style, you need 20 degrees in Quantum Physics & Photonics.",
	"Unlike that one place where you try to travel great distances, here you just wanna make everything super bright.",
	"Let's hope your eyes don't fall off today!",
	"There might be a hidden message within the fabric of this universe. Maybe you should check it just in case?",
	"You might be wondering who's writing this news. Well, it's the same being that created all the other news in the multiverse!",
	'"amogus? sus" - Some epic guy',
	'"uwu what is this? <i>gets disemboweled</i>" - Some other epic guy',
	'If you can see this, why are you chilling on this menu? Cmon, press that button that says "BEGIN"!',
	'"Heya other game jam devs, this news ticker was very annoying to set up." - The man-child who shall not be named',
	'"Void&quot;s server is good" - Some third epic guy',
	'"I keep getting accused of stealing news tickers. Please, these are all original content." - Definitely not the incredibly talented writer of these news ticker messages',
	"If you get bored enough, try to hunt down all the news ticker messages! There are at least 2 of them, so you know that you're on your way to finding them all, right?",
	"Where's the good lore? I'm looking for it, but I can't seem to find any good lore around here...",
	'I had an exclusive interview with the High Gods of the multiverse themselves! They said, "Huh? Wait is this that weird news ticker girl? What is she doing here? Look miss, you seem to be in the wrong place at the wrong time, so please leave. Please leave! Out!" Then their mean bodyguards pushed me away. How mean!',
	"There's no ehehe minigame here, so don't bother checking.",
	"Is this meta yet? No? Now is it meta? Still no? Who's responding? Wait where am I? Oh no what's happening? AAAAAAAAAAAHHHHHHHHHH!!!!!!!                   So... is it meta yet?",
	"The previous news ticker was a lie.",
	"The next news ticker will be a lie. Trust me, I'm definitely a time traveller.",
	"Am I a character in this story? Is this canon? I dunno, you'll just have to take it up with the Council of Meta Commentary. What are they? Well first of all, they definitely exist, so don't try to search them up online or anything. Definitely existent. Definitely not made up or anything...",
	"Life is so relaxing for me nowadays, so I basically just use this news ticker as a journal!",
	"NYOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOM!",
	"Is there any light in the universe yet? I'm not sure, since this is a pre-written message after all.",
	"Well, whatever happens, I just really hope nobody decides to bring any light to the universe. I like all the constant massages...",
	"Go check out the options menu (if you've unlocked it), you can go join a discord or something there. I dunno what that means though, some guy in a purple sweater told me to say it. Maybe you'll know what that means?",
	"My news ticker funds have increased tenfold from the previous gig, so we can make really long news ticker messages now.                                                                                             See what I mean?",
	'"According to all known laws of aviation, there is no way a bee should be able to fly. Its wings are too small to get its fat little body off the ground. The bee, of course, flies anyway because bees do not care what humans think is impossible." - an artistic masterpiece of a movie',
	"I'm such a lazy news ticker message writer, I might just copy+paste the entire script of the movie CATS here. Should I? Let me know in the comments bel... oh wait this isn't a youtube video.",
	"If you're a true fan of experiences like this, name every number from 0 to 4e84. Yes that includes decimals & fractions. Also, name them in every notation. Yes, that includes cancer notation. Good luck!",
	"Are these tickers slow? I'm not sure, I suppose I spent all our funding on ticker length. Maybe someday there will be an incremental game that covers this intense dilemma?",
	"Whenever anyone says an ellipsis by itself, don't you just wanna consider it as them having no idea what to say and throwing up? Was this an original joke? I dunno, but maybe it's a Game Theory reference or something i dunno...",
	"Is anything original anymore?",
	"Is anything fun anymore?",
	"Is anything real anymore? Am I real? Is this real? Oh no, is it all fake? But it's been so much fun! ",
	"Impossibilities are possible if you exist in the matrix, right?.",
	"Have you seen this ticker before? Is this deja vu? Did I forget the accents on that since it's French? Maybe...",
	"These news ticker messages do have a canonical order, but it's not the order you think. Good luck you fanatics :)",
	"By the time you read this, you probably could have beaten the entire thing. Cmon, just go play already.",
	"The dimensions here are not made of antimatter. If they were, your face would have melted off years ago.",
	"This is the last news ticker message I've ever made.                                                     This is the first news ticker message I've ever made.",
	"Is this a reference to anything? I'm not sure...",
	"I'd recommend exporting your current state of existence to the network before filling the universe with photons entirely, with 100% fill completion. Just in case you regret your decision and want to let it sink into darkness. Nobody likes a bright light in their eyes all the time, right?",
	"Welp, time to write some more news ticker messages by stealing them from the nearby multiverse's outlet...",
	"News ticker go brrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr...",
	"If you can read this, go rick roll yourself. I couldn't be bothered to include my own rick roll link, so go find your own...",
	"We don't have notations here, sorry.",
	"Does the autosave work? I don't know, you'll just have to let your savefile corrupt and find out.",
	"Is pillowtalk just yelling into a pillow at a screeching volume and pitch?",
	"Ow the photons are hurting my eyes.",
	"Is the measurement of lumens accurate? I mean within a one meter radius, yes. Outside of that, ehh... kinda?",
	"Have you reached the ending yet? If not, please stop while you're ahead. I'm begging you. With every photon that appears in this universe my life becomes more and more scary. It starts as paradise, but won't last for long. So please, just exit and play a game about running or trees that reset things or something. Please!",
	"The study of photonics is a revered profession. Especially around here.",
	"Woah, the number of news ticker messages that have been written are about double what I remember them being... I wonder if someone snuck in here and wrote messages without my knowledge or consent? I sure hope not, I put a lot of effort into these posts. At least, that's what you think :)",
	"Are these news ticker messages just out-of-context texts that my friends have sent me? I don't know, but you can safely say that this one isn't. Right?",
	"Okay fiiiiine boss, I'll stop making news ticker messages and start with today's podcast. It's just so... addicting to write these.",
	"Just one more news ticker!",
	"I feel like I'm going crazy. Are you crazy too? Is the news ticker making you crazy too?",
	"Oh. I'm fired from the news ticker gig? But... but... but... please just let me write one more...",
	"NO don't pull me away pleasdfczx lk;,'/",
]

function getNewsSpeed() {
	if (gameData.newsMsg=="NYOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOM!") return 1400;
	
	let nm = gameData.newsMarj+gameData.newsLength/2
	if (nm>300&&nm<400) return 90;
	else if (nm>=400) return Math.min(nm/40+80, 97.5);
	else if (nm<=300) return Math.min(97.5-nm/40, 97.5);
	else return 10000000000;
};

function newsTick(diff) {
	if (gameData.newsMarj<gameData.newsLength*(-1) || gameData.newsRS) {
		gameData.newsRS = true;
		gameData.newsCooldown += diff;
		
		if (gameData.newsCooldown>=0.3) {
			gameData.newsMsg = NEWS[Math.floor(Math.random()*NEWS.length)];
			gameData.newsMarj = 700;
			gameData.newsLength = gameData.newsMsg.length*20;
		}
		if (gameData.newsCooldown>=0.6) {
			gameData.newsRS = false;
			gameData.newsCooldown = 0;
		}
	} else {
		gameData.newsMarj -= getNewsSpeed()*diff;
	}
}

function ehehe() {
	console.warn("I thought I told you there was no ehehe minigame here! You didn't listen!");
}