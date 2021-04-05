var divs = [null, null, "half", "thirds", "fourths", "fifths", "sixths", "sevenths", "eighths", "ninths", "tenths"];
var uples = [null, null, "Double", "Triple", "Quadruple", "Quintuple", "Sextuple", "Septuple", "Octuple", "Nonuple", "Decuple"];
var TOTAL_UPGS = 9;
var UPG_DATA = {
	rows: 3,
	rowData: {
		1: [1,2,3],
		2: [4,5,6],
		3: [7,8,9],
	},
	1: {
		req: 10,
		title() { return tmp.u[6]?((tmp.u[6].gt(8)||!tmp.u[6].eq(tmp.u[6].round()))?("Divide the Photon interval by "+formatWhether(tmp.u[6].plus(2))):("Split the Photon interval in "+divs[tmp.u[6].plus(2).toNumber()])):"Split the Photon interval in half" },
		pref: "&divide;",
		cost(n) { return Decimal.pow(1.5, n.pow(1.5)).times(10).floor() },
		targ(r) { return r.div(10).max(1).log(1.5).root(1.5).plus(1).floor() },
		eff(n) { return Decimal.pow((tmp.u[6]?tmp.u[6]:new Decimal(0)).plus(2), n) },
	},
	2: {
		req: 100,
		title() { return tmp.u[4]?((tmp.u[4].gt(7)||!tmp.u[4].eq(tmp.u[4].round()))?("Multiply Photon gain by "+formatWhether(tmp.u[4].plus(3))):(uples[tmp.u[4].plus(3).toNumber()]+" Photon gain")):("Triple Photon gain") },
		pref: "&times;",
		cost(n) { return Decimal.pow(2, n.pow(2)).times(25).floor() },
		targ(r) { return r.div(25).max(1).log2().sqrt().plus(1).floor() },
		eff(n) { return Decimal.pow((tmp.u[4]?tmp.u[4]:new Decimal(0)).plus(3), n) },
	},
	3: {
		req: 250,
		title() { return tmp.u[8]?((tmp.u[8].gt(6)||!tmp.u[8].eq(tmp.u[8].round()))?("Multiply Photon Automaton speed by "+formatWhether(tmp.u[8].plus(4))):(uples[tmp.u[8].plus(4).toNumber()]+" Photon Automaton speed")):("Quadruple Photon Automaton speed") },
		suf: "/s",
		cost(n) { return Decimal.pow(3, n.pow(3)).times(100).floor() },
		targ(r) { return r.div(100).max(1).log(3).cbrt().plus(1).floor() },
		eff(n) { return Decimal.pow(Decimal.add(4, tmp.u[8]||0), n).sub(1).times(tmp.u[5]||1) },
	},
	4: {
		req: 1e4,
		title() { return "Add "+(tmp.u[7]?formatWhether(tmp.u[7].plus(1)):"1")+" to Photon Upgrade 2's base" },
		pref: "+",
		cost(n) { return Decimal.pow(2.5, n.pow(2.5)).times(5e3).floor() },
		targ(r) { return r.div(5e3).max(1).log(2.5).root(2.5).plus(1).floor() },
		eff(n) { return n.times(Decimal.add(tmp.u[7]||0, 1)) },
	},
	5: {
		req: 4e5,
		title() { return tmp.u[8]?((tmp.u[8].gt(8)||!tmp.u[8].eq(tmp.u[8].round()))?("Multiply Photon Upgrade 3's effect by "+formatWhether(tmp.u[8].plus(2))):(uples[tmp.u[8].plus(2).toNumber()]+" Photon Upgrade 3's effect")):("Double Photon Upgrade 3's effect") },
		pref: "&times;",
		cost(n) { return Decimal.pow(3.5, n.pow(3.5)).times(3e5).floor() },
		targ(r) { return r.div(3e5).max(1).log(3.5).root(3.5).plus(1).floor() },
		eff(n) { return Decimal.pow(Decimal.add(2, tmp.u[8]||0), n) },
	},
	6: {
		req: 1e11,
		title: "Add 1 to Photon Upgrade 1's base",
		pref: "+",
		cost(n) { return Decimal.pow(5, n.pow(4).times(6)).times(1e11).floor() },
		targ(r) { return r.div(1e11).max(1).log(5).div(6).root(4).plus(1).floor() },
		eff(n) { return n },
	},
	7: {
		req: 1e12,
		title: "Add 0.3 to Photon Upgrade 4's base effect",
		pref: "+",
		cost(n) { return Decimal.pow(3, Decimal.pow(2.5, n).sub(1)).times(5e11).floor() },
		targ(r) { return r.div(5e11).max(1).log(3).plus(1).log(2.5).plus(1).floor() },
		eff(n) { return n.times(.3) },
	},
	8: {
		req: 1e25,
		title: "Add 1 to the bases of Photon Upgrades 3 & 5",
		pref: "+",
		cost(n) { return Decimal.pow(4, n.pow(5).times(2)).times(1e25).floor() },
		targ(r) { return r.div(1e25).max(1).log(4).div(2).root(5).plus(1).floor() },
		eff(n) { return n },
	},
	9: {
		req: 1e40,
		title: "Multiply Photon gain by 10",
		pref: "&times;",
		cost(n) { return Decimal.pow(1e8, n.pow(2)).times(1e42).floor() },
		targ(r) { return r.div(1e42).max(1).log(1e8).sqrt().plus(1).floor() },
		eff(n) { return Decimal.pow(10, n) },
	},
}

function createLight() {
	if (player.lightCooldown>0) return;
	player.prevPhotons = new Decimal(player.photons);
	gainPhotons(tmp.u[2].times(tmp.lumEff).times(tmp.lu[2]).times(tmp.u[9]).times(tmp.tphe).div(player.revRateDiv));
	player.lightCooldown = tmp.itv.toNumber();
}

function gainPhotons(x) {
	player.photons = player.photons.plus(x).min(tmp.tph);
	player.totalPhotons = player.totalPhotons.plus(x).min(tmp.tph);
}

function getExtraUpgs(x) {
	let extra = new Decimal(0);
	if ((x==2||x==4) && player.charge.lt(0)) extra = extra.plus(tmp.crge);
	if ((x==3||x==5) && player.charge.gt(0)) extra = extra.plus(tmp.crge);
	if (x==9 && tmp.lu) extra = extra.plus(tmp.lu[4]);
	return extra;
}

function getUpgCost(x) { return UPG_DATA[x].cost(player.upgs[x]) }

function getUpgEff(x) { return UPG_DATA[x].eff(player.upgs[x].plus(tmp['x'][x])) }

function buyUpg(x) {
	let c = getUpgCost(x);
	if (player.photons.lt(c)) return;
	player.photons = player.photons.sub(c);
	player.upgs[x] = Decimal.add(player.upgs[x]||0, 1);
}