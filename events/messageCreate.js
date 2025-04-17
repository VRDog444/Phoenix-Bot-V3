const { Events, EmbedBuilder, ChannelType } = require('discord.js');
const { Util } = require('../Util');
const config = require("../config.json");

module.exports = {
	name: Events.MessageCreate,
	async execute(message) {
		if (message.author.bot) return;
		const { GetDB } = require("../Database");
		const db = GetDB();
		if (message.channel.type !== ChannelType.GuildText) {
			db.serialize(() => {
				db.all("SELECT * FROM reports WHERE author_id = ?", message.author.id, (err, rows) => {
					if (err) console.error(err);
					if (rows.length < 1) return;
					const report = rows[0];

					message.client.users.cache.get(config.dev.devIds[0]).send(`Message from ticket ${report.ticket_id}: ${message.content}`);
				});
			});
		}

		if (message.channel.type === ChannelType.DM) return;

		db.serialize(() => {
			db.all("SELECT * FROM xp_data WHERE user_id = ?", message.author.id, (err, rows) => {
				if (rows.length < 1) {
					db.run("INSERT INTO xp_data VALUES (?, 0, 0, 10)", message.author.id);
				}

				db.all("SELECT * FROM xp_data WHERE user_id = ?", message.author.id, (err, rows) => {
					if (err) console.error(err);
					const baseXp = Util.random(1, 7);
					const realXp = Util.random(1, 5);
					const user = rows[0];
					console.log(`Base: ${baseXp} | Real: ${realXp}`);
					if (baseXp >= realXp) {
						if ((user.xp += realXp) >= user.required_xp) {
							const xp = (user.xp + realXp) - user.required_xp;
							const required_xp = user.level + 1 >= 5 ? Math.round(user.required_xp *= 2.5) : Math.round(user.required_xp *= 1.75);
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