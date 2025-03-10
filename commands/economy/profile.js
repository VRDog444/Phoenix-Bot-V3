const { SlashCommandBuilder } = require('discord.js');
const { Exp } = require('../../Database');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('lvl')
        .setDescription('View your level card'),
    async execute(interaction) {
        const user = await Exp.Fetch(interaction.user.id);

        if (user === null) return interaction.reply('No Data found');

        interaction.reply(`=== ${interaction.user.globalName}'s Level Data ===\nLevel: ${user.level}\nXP: ${user.xp}\nNext Level: ${user.requiredXp}`);
    }
};