function getStartPlayer() {
	let p = {
		currTime: new Date().getTime(),
		currGameTime: new Date().getTime(),
		timePlayed: 0,
		prevPhotons: new Decimal(0),
		prevDiff: 1/20,
		photons: new Decimal(0),
		totalPhotons: new Decimal(0),
		lightCooldown: 0,
		autoCooldown: 0,
		upgs: {},
		autosave: true,
		electrons: new Decimal(0),
		positrons: new Decimal(0),
		charge: new Decimal(0),
		lumUpgs: {},
		mindXP: new Decimal(0),
		strengthXP: new Decimal(0),
		mindStrengthAuto: "None",
		mindStrengthCooldown: 0,
		chapter1completiontime: 0,
		chapter1complete: false,
		cutscene1time: 0,
		cutscene1pushes: 0,
		reverseSceneActive: false,
		reversalTimer: -1,
		reversalDiv: new Decimal(1),
		badEndingTimer: 0,
		badEndingStarted: false,
		badEndPushes: 0,
		revRateDiv: new Decimal(1),
		gameOverTimer: 0,
		gameOver: false,
		truePhotons: new Decimal(0),
		truePhotBought: 0,
		badTruePhotBought: 0,
		goodEndingTimer: 0,
		goodEndingStarted: false,
		goodEndPushes: 0,
		forceAppUpdTimer: 0,
	};
	return p;
}

function fixPlayer() {
	let start = getStartPlayer();
	fixPlayerObj(player, start);
	
	transformPlayerToDecimal();
}

function fixPlayerObj(obj, start) {
	for (let x in start) {
		if (obj[x] === undefined) obj[x] = start[x]
		else if (typeof start[x] == "object" && !(start[x] instanceof Decimal)) fixPlayerObj(obj[x], start[x])
		else if (start[x] instanceof Decimal) obj[x] = new Decimal(obj[x])
	}
}

function transformPlayerToDecimal() {
	player.photons = new Decimal(player.photons||0);
	player.prevPhotons = new Decimal(player.prevPhotons||player.photons);
	player.totalPhotons = new Decimal(player.totalPhotons||0);
	for (let i=1;i<=TOTAL_UPGS;i++) player.upgs[i] = new Decimal(player.upgs[i]||0);
	player.electrons = new Decimal(player.electrons||0);
	player.positrons = new Decimal(player.positrons||0);
	player.charge = new Decimal(player.charge||0);
	for (let i=1;i<=TOTAL_LUM_UPGS;i++) player.lumUpgs[i] = new Decimal(player.lumUpgs[i]||0);
	player.mindXP = new Decimal(player.mindXP||0);
	player.strengthXP = new Decimal(player.strengthXP||0);
	player.reversalDiv = new Decimal(player.reversalDiv||1);
	player.revRateDiv = new Decimal(player.revRateDiv||1);
	player.truePhotons = new Decimal(player.truePhotons||0);
}