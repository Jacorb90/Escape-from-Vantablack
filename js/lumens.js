const TOTAL_LUM_UPGS = 5;
const LUM_UPG_DATA = {
	rows: 1,
	rowData: {
		1: [1,2,3,4,5],
	},
	1: {
		title: "Raise the Lumen effect",
		unl() { return true },
		pref: "^",
		cost(n) { return Decimal.pow(2, Decimal.pow(5, n).sub(1)).div(100) },
		targ(r) { return r.times(100).max(1).log2().plus(1).log(5).plus(1).floor() },
		eff(n) { return n.plus(1).sqrt() },
	},
	2: {
		title: "Photons boost their own gain",
		unl() { return true },
		pref: "&times;",
		cost(n) { return Decimal.pow(5, Decimal.pow(2, n.root(n.lte(2)?2.56:1.07006).times(2.2)).sub(1)).times(1e15) },
		targ(r) { return r.div(1e15).max(1).log(5).plus(1).log2().div(2.2).pow(r.lte(1e20)?2.56:1.07006).plus(1).floor() },
		eff(n) { return Decimal.pow(player.photons.plus(1).log10().plus(1), n.plus(n.sub(3).max(0).div(11.6))) },
	},
	3: {
		title: "Lumens boost Mind/Strength XP gain",
		unl() { return tmp.bw.gte(.5) },
		pref: "&times;",
		cost(n) { return Decimal.pow(5, Decimal.pow(Math.PI, n).sub(1)).times(4/3*1e29) },
		targ(r) { return r.div(4/3*1e29).max(1).log(5).plus(1).log(Math.PI).plus(1).floor() },
		eff(n) { return Decimal.pow(tmp.lum.plus(1).log10().plus(1), n.plus(n.sub(2).max(0).div(3))) },
	},
	4: {
		title: "Mind & Strength add levels to Lumen Upgrade 3 & Photon Upgrade 9",
		unl() { return tmp.bw.gte(.5) },
		pref: "+",
		cost(n) { return Decimal.pow(5, Decimal.pow(4, n).sub(1)).times(3e38) },
		targ(r) { return r.div(3e38).max(1).log(5).plus(1).log(4).plus(1).floor() },
		eff(n) { return tmp.mind.plus(tmp.strength).plus(1).log10().sqrt().times(n) },
	},
	5: {
		title: "Mind/Strength's secondary boost bases are increased by 1",
		unl() { return tmp.bw.gte(.5) },
		pref: "+",
		cost(n) { return Decimal.pow(5, Decimal.pow(5, n.root(2.32).div(n.gte(3)?1.0206:1)).sub(1)).times(5e54) },
		targ(r) { return r.div(5e54).max(1).log(5).plus(1).log(5).times(r.gte(1e80)?1.0206:1).pow(2.32).plus(1).floor() },
		eff(n) { return n },
	},
}

function getExtraLumUpgs(x) {
	let extra = new Decimal(0);
	if (x==1||x==2) extra = extra.plus(tmp.mnde);
	if (x==3 && tmp.lu[4]) extra = extra.plus(tmp.lu[4]);
	return extra;
}

function getLumUpgCost(x) { return LUM_UPG_DATA[x].cost(player.lumUpgs[x]) }

function getLumUpgEff(x) { return LUM_UPG_DATA[x].eff(player.lumUpgs[x].plus(tmp.lx[x])) }

function buyLumUpg(x) {
	let c = getLumUpgCost(x);
	if (tmp.lum.lt(c)) return;
	player.lumUpgs[x] = Decimal.add(player.lumUpgs[x]||0, 1);
}

function getLumensEff() {
	if (player.totalPhotons.lt(1e16)) return new Decimal(1);
	let exp = Decimal.mul(tmp.lu?tmp.lu[1]:1, 2);
	if (tmp.lum.lt(0.02)) return tmp.lum.times(3).plus(1).pow(exp);
	else {
		let l = tmp.lum;
		if (l.gte(0.1)) l = l.div(100).plus(0.099);
		return l.plus(1).log10().plus(1).log10().times(16.14).plus(1).pow(exp);
	}
}