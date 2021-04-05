function boostMind() {
	player.mindStrengthAuto = "Mind";
}

function boostStrength() {
	player.mindStrengthAuto = "Strength";
	player.strengthXP = player.strengthXP.plus(tmp.msGM);
}