const { ContextMenuCommandBuilder, ApplicationCommandType, EmbedBuilder, MessageFlags } = require("discord.js");
const { CommandPermissionLevel } = require("../../Util");
const { GetDB } = require("../../Database");

module.exports = {
    permLevel: CommandPermissionLevel.ServerOwner,
    data: new ContextMenuCommandBuilder()
        .setName("Add 25 XP")
        .setType(ApplicationCommandType.User),
    async execute(interaction) {
        const db = GetDB();
        const member = interaction.targetMember;
        console.log(`${interaction.user.id} | ${member.user.id}`);

        db.all("SELECT * FROM xp_data WHERE user_id = ?", member.user.id, (err, rows) => {
            if (rows.length < 1) return;
            const user = rows[0];
            if ((user.xp += 25) >= user.required_xp) {
                const xp = (user.xp + 25) - user.required_xp;
                const required_xp = user.level + 1 >= 5 ? Math.round(user.required_xp *= 2.5) : Math.round(user.required_xp *= 1.75);
                db.run("UPDATE xp_data SET xp = ?, level = level + 1, required_xp = ? WHERE user_id = ?", { 1: xp, 2: required_xp, 3: member.user.id });
                const embed = new EmbedBuilder().setColor(0xFF4500);
                embed.setTitle("Level Up!").setDescription(`${member} has advanced to level ${user.level + 1}!`);
                embed.setTimestamp().setThumbnail(member.displayAvatarURL());
                interaction.channel.send({ embeds: [embed] });
            }
            else {
                db.run("UPDATE xp_data SET xp = xp + 25 WHERE user_id = ?", member.user.id);
            }
            interaction.reply(`Added 25 XP for ${member}`, MessageFlags.Ephemeral);
        });
    }
};