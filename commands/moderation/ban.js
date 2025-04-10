const { SlashCommandBuilder, SlashCommandMentionableOption, SlashCommandStringOption } = require("discord.js");
const { CommandPermissionLevel } = require("../../Util");

module.exports = {
    permLevel: CommandPermissionLevel.ServerMods,
    data: new SlashCommandBuilder()
        .setName("ban")
        .setDescription("Ban a user")
        .addMentionableOption(new SlashCommandMentionableOption()
            .setName("user").setDescription("The user to ban").setRequired(true)
        )
        .addStringOption(new SlashCommandStringOption()
            .setName("reason").setDescription("The reason for the ban(The user will be notified)").setRequired(false)
        ),
    async execute(interaction) {
        const user = interaction.options.getMentionable("user");
        const reason = interaction.options.getString("reason") || "Unspecified";
        user.send(`You have been banned from \`${interaction.guild.name}\` with reason: \`${reason}\``).catch(err => {
            interaction.reply(`I was unable to send the user a DM.`);
        });
        user.ban(reason);
        interaction.channel.send(`${user} was banned with reason: \`${reason}\``);
    }
};