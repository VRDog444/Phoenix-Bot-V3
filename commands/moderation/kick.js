const { SlashCommandBuilder, SlashCommandMentionableOption, SlashCommandStringOption } = require("discord.js");
const { CommandPermissionLevel } = require("../../Util");

module.exports = {
    permLevel: CommandPermissionLevel.ServerMods,
    data: new SlashCommandBuilder()
        .setName("kick")
        .setDescription("Kick a user")
        .addMentionableOption(new SlashCommandMentionableOption()
            .setName("user").setDescription("The user to kick").setRequired(true)
        )
        .addStringOption(new SlashCommandStringOption()
            .setName("reason").setDescription("The reason for kicking(The user will be notified)").setRequired(false)
        ),
    async execute(interaction) {
        const user = interaction.options.getMentionable("user");
        const reason = interaction.options.getString("reason") || "Unspecified";
        user.kick(reason);
        user.send(`You have been kicked from \`${interaction.guild.name}\` with reason: \`${reason}\``);
        interaction.channel.send(`${user} was kicked with reason: \`${reason}\``);
    }
};