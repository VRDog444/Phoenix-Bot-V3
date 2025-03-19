const { SlashCommandBuilder, SlashCommandStringOption } = require("discord.js");
const { CommandPermissionLevel } = require("../../Util");
const { GetDB } = require("../../Database");

module.exports = {
    global: 1,
    permLevel: CommandPermissionLevel.Devs,
    data: new SlashCommandBuilder()
        .setName("close-dev-ticket").setDescription("Close an Active Dev ticket")
        .addStringOption(new SlashCommandStringOption()
            .setName("id").setDescription("The ticket ID").setRequired(true)),

    async execute(interaction) {
        const db = GetDB();
        const ticketId = interaction.options.getString("id");
        db.serialize(() => {
            db.all("SELECT * FROM reports WHERE ticket_id = ?", ticketId, (err, rows) => {
                if (err) console.error(err);
                if (rows.length < 1) return;

                db.run("DELETE * FROM reports WHERE ticketId = ?", ticketId);
            });
        });
    }
};