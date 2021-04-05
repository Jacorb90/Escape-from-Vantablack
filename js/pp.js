// haha pp

function getNextPP() { // haha p- okay this joke's getting old :P
	return Decimal.pow(4/3, tmp.tpp.pow(1.5)).times(1e8).div(tmp.stre).round();
}

function gainPP() {
	if (player.totalPhotons.lt(tmp.npp)) return;
	let targ = player.totalPhotons.times(tmp.stre).div(1e8).max(1).log(4/3).root(1.5).plus(1).floor().sub(player.charge.abs());
	let oldE = new Decimal(player.electrons);
	player.electrons = player.electrons.max(targ.sub(player.positrons));
	player.positrons = player.positrons.max(targ.sub(oldE));
}

function annihilatePP(x, max=false) {
	switch(x) {
		case 1: 
			if (player.electrons.lt(1)) return;
			player.electrons = player.electrons.sub(1);
			player.charge = player.charge.plus(1);
			break;
		case -1: 
			if (player.positrons.lt(1)) return;
			player.positrons = player.positrons.sub(1);
			player.charge = player.charge.sub(1);
			break;
		case 0: 
			if (player.electrons.max(player.positrons).lt(1)) return;
			let oldP = new Decimal(player.positrons);
			player.positrons = player.electrons;
			player.electrons = oldP;
			player.charge = player.charge.times(-1);
			updateTemp();
			break;
	}
}

function getChargeEff(n, c) {
	if (c.round().eq(1)) return Decimal.sqrt(n).times(1.125);
	else return Decimal.sqrt(n).times(0.75);
}