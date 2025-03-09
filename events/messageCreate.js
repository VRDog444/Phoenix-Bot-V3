const { Events } = require('discord.js');
const { Util } = require('../Util');
const { Exp } = require('../Database');

module.exports = {
	name: Events.MessageCreate,
	execute(message) {
		if (message.author.bot) return;

		const baseXp = Util.random(1, 5);
		const realXp = Util.random(1, 5);

		console.log(`Base: ${baseXp} | Real: ${realXp}`);

		if (baseXp >= realXp) Exp.Update(message.author.id, { xp: realXp });
	},
};