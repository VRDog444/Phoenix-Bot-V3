const { SlashCommandBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("create-ticket").setDescription("Create a support ticket"),
    async execute(interaction) {
        const create = new ButtonBuilder()
            .setCustomId("create_ticket")
            .setLabel("Create Ticket")
            .setEmoji("📫")
            .setStyle(ButtonStyle.Primary);

        const row = new ActionRowBuilder().addComponents(create);
        interaction.channel.send({ components: [row] });
    }
};