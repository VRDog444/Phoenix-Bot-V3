const { SlashCommandBuilder, SlashCommandStringOption } = require("discord.js");
const { Util } = require("../../Util");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("rps").setDescription("Play a game of rock paper scissors")
        .addStringOption(new SlashCommandStringOption()
            .setName("play").setDescription("The option to play").setChoices({ name: "Rock", value: "rock" }, { name: "Paper", value: "paper" }, { name: "Scissors", value: "scissors" })
            .setRequired(true)),

    win(player, interaction) {
        if (player) return interaction.reply(`${interaction.member} Wins!`);
        return interaction.reply(`<@${interaction.client.user.id}> Wins!`);
    },

    async execute(interaction) {
        const choices = ["rock", "paper", "scissors"];
        const playerChoice = interaction.options.getString("play");

        const compChoice = choices[Util.random(0, 2)];

        if (compChoice === playerChoice) return interaction.reply("Draw!");
        if (compChoice === "rock") {
            if (playerChoice === "paper") this.win(true, interaction);
            if (playerChoice === "scissors") this.win(false, interaction);
        }
        if (compChoice === "paper") {
            if (playerChoice === "rock") this.win(false, interaction);
            if (playerChoice === "scissors") this.win(true, interaction);
        }
        if (compChoice === "scissors") {
            if (playerChoice === "rock") this.win(true, interaction);
            if (playerChoice === "paper") this.win(false, interaction);
        }
    }
};