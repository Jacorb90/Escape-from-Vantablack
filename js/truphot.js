function truePhotonBtn(n) {
	if (tmp.lsel==n) player.truePhotBought++;
	else player.badTruePhotBought++;
	player.truePhotons = player.truePhotons.plus(1);
}

function getLSel(x) {
	if (x.lt(getTruPhotReq())) return 0;
	x = x.toNumber();
	return Math.max(Math.ceil(Math.abs(Math.sin(x)*tmp.tphr*tmp.tphc)), 1);
}

function getTruPhotReq() {
	let b = player.truePhotBought+player.badTruePhotBought;
	return Math.pow(b, 1.1)*3;
}

function getTPHRows() {
	let b = player.truePhotBought+player.badTruePhotBought;
	if (b>=25) return 3;
	else if (b>=10) return 2;
	else return 1;
}

function getTPHCols() {
	let b = player.truePhotBought+player.badTruePhotBought;
	if (b>=15) return 5;
	else if (b>=5) return 4;
	else if (b>=2) return 3;
	else return 2;
}