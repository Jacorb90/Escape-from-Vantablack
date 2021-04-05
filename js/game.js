var player;
var tmp = {};
var intervals = {};
var gameData = {
	started: false,
	newsMsg: "",
	newsMarj: -1000000,
	newsLength: 0,
	newsRS: false,
	newsCooldown: 0,
};
var version = 1.0;
var gameID = "EfV";
var tab = "Main";
var allTabs = ["Options", "Main", "Pair Production", "Lumens", "Growth", "True Photonics"];
var tabUnlocks = {
	Options() { return player.totalPhotons.gte(1e6) },
	Main() { return true },
	"Pair Production"() { return player.totalPhotons.gte(1e6) },
	Lumens() { return player.totalPhotons.gte(1e16) },
	Growth() { return tmp.bw.gte(.5) },
	"True Photonics"() { return player.reverseSceneActive },
}

function loadGame() {
	let get = localStorage.getItem(gameID)
	if (get) player = JSON.parse(atob(get));
	else player = getStartPlayer();
	
	fixPlayer();
	updateTemp();
	updateTemp();
	updateTemp();
	updateTemp();
	updateTemp();
	loadVue();
	
	intervals.game = setInterval(function() { gameLoop(NaNCheck(Math.max((new Date().getTime() - player.currTime)/1000, 0))) }, 50)
	intervals.save = setInterval(function() { if (player.autosave) save(); }, 2500)
}

function save() {
	localStorage.setItem(gameID, btoa(JSON.stringify(player)));
}

function importSave() {
	let data = prompt("Paste save data: ")
	if (data===undefined||data===null||data=="") return;
	try {
		player = JSON.parse(atob(data));
		save()
		window.location.reload();
	} catch(e) {
		console.log("Import failed!");
		console.error(e);
		return;
	}
}

function exportSave() {
	let data = btoa(JSON.stringify(player))
	const a = document.createElement('a');
	a.setAttribute('href', 'data:text/plain;charset=utf-8,' + data);
	a.setAttribute('download', "efv.txt");
	a.setAttribute('id', 'downloadSave');

	document.body.appendChild(a);
	a.click();
	document.body.removeChild(a);
}

function toggleAutosave() {
	player.autosave = !player.autosave;
}

function hardReset() {
	if (!confirm("Are you sure you want to reset everything???")) return;
	player = getStartPlayer();
	save();
	window.location.reload();
}

function gameLoop(diff, warped=false) {
	player.currTime = new Date().getTime();
	
	updateTemp();
	
	if (!gameData.started) newsTick(diff);
	
	if (player.forceAppUpdTimer>0) player.forceAppUpdTimer = Math.max(player.forceAppUpdTimer-diff, 0);
	if (player.reverseSceneActive && player.totalPhotons.lt(1) && !player.badEndingStarted) {
		player.badEndingTimer += diff;
		if (player.badEndingTimer>=10) player.badEndingStarted = true;
	} else if (player.badEndPushes==27) {
		player.gameOverTimer += diff;
		if (player.gameOverTimer>=5) player.gameOver = true;
	}
	if (player.reverseSceneActive && tmp.bw.eq(1) && !player.goodEndingStarted) {
		player.goodEndingTimer += diff;
		if (player.goodEndingTimer>=10) player.goodEndingStarted = true;
	} else if (player.goodEndPushes==40) {
		player.gameOverTimer += diff;
		if (player.gameOverTimer>=5) player.gameOver = true;
	}
	if (player.reversalTimer>=0 && !player.reverseSceneActive) {
		player.reversalTimer += diff;
		if (player.reversalTimer>=5) {
			player.photons = Decimal.pow(tmp.tph, 0.75);
			player.totalPhotons = Decimal.pow(tmp.tph, 0.75);
			updateTemp();
			player.reverseSceneActive = true;
		}
	} else if (!player.reverseSceneActive) {
		if (tmp.bw.eq(1) && !player.chapter1complete) player.chapter1completiontime += diff;
		if (player.chapter1completiontime>=5 && player.reversalTimer==-1 && !player.reverseSceneActive) {
			player.chapter1complete = true;
			player.cutscene1time += diff;
		}
	}
	
	if (!gameLooping()) return;
	diff = NaNCheck(Math.max((player.currTime - player.currGameTime)/1000, 0));
	player.timePlayed += diff;
	player.lightCooldown = Math.max(player.lightCooldown-diff, 0);
	player.autoCooldown = Math.max(player.autoCooldown-diff, 0);
	player.prevPhotons = new Decimal(player.photons);
	player.prevDiff = diff;
	if (tmp.u[3].gt(0) && player.autoCooldown==0) {
		let mult = tmp.u[2].times(tmp.lumEff).times(tmp.lu[2]).times(tmp.u[9]).times(tmp.tphe).div(player.revRateDiv);
		let u3 = tmp.u[3].min(tmp.u[1].div(2));
		gainPhotons(Decimal.div(1, u3).lt(diff)?mult.times(u3.times(diff)):mult);
		player.autoCooldown = Decimal.div(1, u3).toNumber();
	}
	if (player.totalPhotons.gte(1e8)) gainPP();
	player.mindStrengthCooldown = Math.max(player.mindStrengthCooldown-diff, 0);
	if (player.mindStrengthCooldown==0) {
		player.mindStrengthCooldown = Decimal.div(1, tmp.mnde2).toNumber()
		if (player.mindStrengthAuto=="Mind") player.mindXP = player.mindXP.plus(tmp.msGM.times(Decimal.div(1, tmp.mnde2).lt(diff)?tmp.mnde2.times(diff):1));
		else if (player.mindStrengthAuto=="Strength") player.strengthXP = player.strengthXP.plus(tmp.msGM.times(Decimal.div(1, tmp.mnde2).lt(diff)?tmp.mnde2.times(diff):1));
	}		
	if (player.reverseSceneActive) {
		player.truePhotons = player.truePhotons.plus(tmp.tphs.times(diff));
		player.reversalDiv = player.reversalDiv.plus(diff);
		if (player.photons.eq(tmp.tph) || player.totalPhotons.eq(tmp.tph)) return;
		player.photons = player.photons.div(player.reversalDiv.pow(diff));
		player.totalPhotons = player.totalPhotons.div(player.reversalDiv.pow(diff));
		player.revRateDiv = player.revRateDiv.times(player.reversalDiv.pow(diff));
	}
	player.currGameTime = new Date().getTime();
}

function gameLooping() {
	return gameData.started && !player.badEndingStarted && !player.goodEndingStarted
}

function forceAppUpd() { 
	player.forceAppUpdTimer = 50/1000;
}