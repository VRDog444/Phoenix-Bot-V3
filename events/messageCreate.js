const { Events } = require('discord.js');
const { Util } = require('../Util');
const { Exp } = require('../Database');

module.exports = {
	name: Events.MessageCreate,
	execute(message) {
		const baseXp = Util.random(1, 5);
		const realXp = Util.random(1, 5);

		if (baseXp === realXp) Exp.Update(message.author.id, { xp: realXp });
	},
};