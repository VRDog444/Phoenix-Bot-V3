const { ContextMenuCommandBuilder, ApplicationCommandType, MessageFlags } = require("discord.js");
const { GetDB } = require("../../Database");
const { CommandPermissionLevel } = require("../../Util");

module.exports = {
    permLevel: CommandPermissionLevel.ServerOwner,
    data: new ContextMenuCommandBuilder()
        .setName("Reset XP")
        .setType(ApplicationCommandType.User),

    async execute(interaction) {
        const db = GetDB();
        const member = interaction.targetMember;
        db.serialize(() => {
            db.all("SELECT * FROM xp_data WHERE user_id = ?", member.user.id, (err, rows) => {
                if (err) console.error(err);
                if (rows.length < 1) return;

                db.run("DELETE FROM xp_data WHERE user_id = ?", member.user.id);
                interaction.reply(`XP data for ${member} has been reset.`, MessageFlags.Ephemeral);
            });
        });
    }
};