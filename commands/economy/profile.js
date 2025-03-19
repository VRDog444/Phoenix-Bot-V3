const { SlashCommandBuilder, EmbedBuilder, SlashCommandMentionableOption } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('lvl')
        .setDescription('View your level card')
        .addMentionableOption(new SlashCommandMentionableOption()
            .setName("user").setDescription("The user to check level profile for")),
    async execute(interaction) {
        const { GetDB } = require("../../Database");
        const db = GetDB();
        const member = interaction.options.getMentionable("user") || interaction.member;
        db.serialize(() => {
            db.all("SELECT * FROM xp_data WHERE user_id = ?", member.user.id, (err, rows) => {
                const user = rows.length >= 1 ? rows[0] : { level: 0, xp: 0, required_xp: 0 };
                const embed = new EmbedBuilder().setThumbnail(member.displayAvatarURL()).setTimestamp();
                embed.addFields([{ name: "Level", value: `${user.level}` }, { name: "Experience", value: `${user.xp}` }, { name: "Required Exp", value: `${user.required_xp}` }]);
                embed.setDescription(`${member.displayName}'s Level Card`).setColor(0xFF4500);
                interaction.reply({ embeds: [embed] });
            });
        });
    }
};