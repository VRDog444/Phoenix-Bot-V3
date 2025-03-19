const { SlashCommandBuilder, SlashCommandStringOption } = require("discord.js");
const { CommandPermissionLevel } = require("../../Util");
const { GetDB } = require("../../Database");

module.exports = {
    global: 1,
    permLevel: CommandPermissionLevel.Devs,
    data: new SlashCommandBuilder()
        .setName("reply").setDescription("Reply to an active developer ticket")
        .addStringOption(new SlashCommandStringOption()
            .setName("id").setDescription("The ticket ID").setRequired(true))
        .addStringOption(new SlashCommandStringOption()
            .setName("message").setDescription("The content of the reply").setRequired(true)),

    async execute(interaction) {
        const db = GetDB();
        const id = interaction.options.getString("id");
        const content = interaction.options.getString("message");
        db.serialize(() => {
            db.all("SELECT * FROM reports WHERE ticket_id = ?", id, (err, rows) => {
                if (rows.length < 1) return interaction.reply(`Ticket with ID ${id} does not exist`);
                const ticket = rows[0];

                interaction.client.users.send(ticket.author_id, `Reply from Dev Team: ${content}`);
            });
        });
    }
};