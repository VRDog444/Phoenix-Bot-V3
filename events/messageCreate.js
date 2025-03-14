const { Events, EmbedBuilder } = require('discord.js');
const { Util } = require('../Util');

module.exports = {
	name: Events.MessageCreate,
	async execute(message) {
		const { GetDB } = require("../Database");
		if (message.author.bot) return;
		const db = GetDB();

		db.serialize(() => {
			db.all("SELECT * FROM xp_data WHERE user_id = ?", message.author.id, (err, rows) => {
				if (rows.length < 1) {
					db.run("INSERT INTO xp_data VALUES (?, 0, 0, 10)", message.author.id);
				}

				db.all("SELECT * FROM xp_data WHERE user_id = ?", message.author.id, (err, rows) => {
					if (err) console.error(err);
					const baseXp = Util.random(1, 5);
					const realXp = Util.random(1, 5);
					const user = rows[0];
					console.log(`Base: ${baseXp} | Real: ${realXp}`);
					if (baseXp >= realXp) {
						if ((user.xp += realXp) >= user.required_xp) {
							const xp = (user.xp + realXp) - user.required_xp;
							const required_xp = Math.round(user.required_xp *= 1.5);
							db.run("UPDATE xp_data SET xp = ?, level = level + 1, required_xp = ?", { 1: xp, 2: required_xp });
							const embed = new EmbedBuilder().setColor(0xFF4500);
						embed.setTitle("Level Up!").setDescription(`${message.member} has advanced to level ${user.level + 1}!`);
						embed.setTimestamp().setThumbnail(message.member.displayAvatarURL());
						message.channel.send({ embeds: [embed] });
						}
						else {
							db.run("UPDATE xp_data SET xp = xp + ?", realXp);
						}
					}
				});
			});
		});
	},
};