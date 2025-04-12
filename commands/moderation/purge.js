const { SlashCommandBuilder, SlashCommandSubcommandBuilder, SlashCommandMentionableOption, SlashCommandStringOption } = require("discord.js");
const { CommandPermissionLevel } = require("../../Util");
const fs = require("fs");
const servers = require("../../servers.json");

module.exports = {
    permLevel: CommandPermissionLevel.ServerAdmins,
    data: new SlashCommandBuilder()
        .setName("purge")
        .setDescription("Purge users")
        .addSubcommand(new SlashCommandSubcommandBuilder()
            .setName("prepare")
            .setDescription("Add a user to be purged")
            .addMentionableOption(new SlashCommandMentionableOption()
                .setName("member")
                .setDescription("The member to prepare for purging"))
            .addStringOption(new SlashCommandStringOption()
                .setName("action")
                .setDescription("The action to perform upon purge execution")
                .setChoices([{ name: "Kick", value: "kick" }, { name: "Ban", value: "ban" }]))
            .addStringOption(new SlashCommandStringOption()
                .setName("reason")
                .setDescription("The reason the user is being purged")))
        .addSubcommand(new SlashCommandSubcommandBuilder()
            .setName("remove")
            .setDescription("Remove a user from the purge list")
            .addMentionableOption(new SlashCommandMentionableOption()
                .setName("member")
                .setDescription("The member to remove")))
        .addSubcommand(new SlashCommandSubcommandBuilder()
            .setName("execute")
            .setDescription("Execute a server purge on prepared users")
        ),
    async execute(interaction) {
        const subCmd = interaction.options.getSubcommand();
        if (subCmd === "prepare") {
            let member = interaction.options.getMember("member");
            const action = interaction.options.getString("action");
            const reason = interaction.options.getString("reason");

            const purgeUser = {
                id: member.user.id,
                action: action,
                reason: reason
            };
            if (!servers[interaction.guild.id]) {
                servers[interaction.guild.id] = {
                    purge: []
                };
            }
            servers[interaction.guild.id]["purge"].push(purgeUser);

            fs.writeFileSync("./servers.json", JSON.stringify(servers, null, "    "));
        }
    }
};