const { SlashCommandBuilder } = require("discord.js");
const { Util } = require("../../Util");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("leaderboard")
        .setDescription("View top 10 on level leaderboard"),

    async execute(interaction) {
        const { GetDB } = require("../../Database");
        const db = GetDB();

        db.all("SELECT * FROM xp_data", (err, rows) => {
            rows = Util.bubbleSort(rows, true);
            let data = ``;
            for (let i = 0; i < 10; i++) {
                if (!rows[i]) break;
                let row = rows[i];
                let user = interaction.client.users.cache.get(row["user_id"]);
                data += `${i + 1}. ${user.displayName} | Level: ${row["level"]}(${row["xp"]} / ${row["required_xp"]})\n`;
            }

            interaction.reply(data);
        });
    }
};