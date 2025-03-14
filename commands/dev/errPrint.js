const { SlashCommandBuilder } = require("discord.js");
const config = require("../../config.json");
const fs = require("fs");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("err_print")
        .setDescription("Overwrite Dev setting"),
    async execute(interaction) {
        config.dev.errPrint = !config.dev.errPrint;
        fs.writeFileSync("./config.json", JSON.stringify(config, null, "    "));
        interaction.reply(`overwritten dev setting \`errPrint\``);
    }
};