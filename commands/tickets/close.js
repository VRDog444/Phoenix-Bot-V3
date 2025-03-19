const { SlashCommandBuilder } = require("discord.js");
const { CommandPermissionLevel } = require("../../Util");

module.exports = {
    permLevel: CommandPermissionLevel.ServerMods,
    data: new SlashCommandBuilder()
        .setName("close-ticket").setDescription("Close an active ticket"),
    async execute(interaction) {
        const channel = interaction.channel;

        try {
            channel.delete();
        }
        catch (err) {
            console.error(err);
        }
    }
};