const { SlashCommandBuilder, SlashCommandStringOption, MessageFlags } = require("discord.js");
const { generate } = require("randomstring");
const { GetDB } = require("../../Database");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("report").setDescription("Create a bug report")
        .addStringOption(new SlashCommandStringOption()
            .setName("type").setDescription("The type of report").setRequired(true)
            .setChoices([{ name: "Server", value: "server-report" }, { name: "Developers", value: "dev-report" }])),

    async execute(interaction) {
        const type = interaction.options.getString("type");
        if (type === "server-report") return interaction.reply("For server related issues please create a support ticket");
        const db = GetDB();
        const id = generate(5);

        db.serialize(() => {
            db.all("SELECT * FROM reports WHERE author_id = ?", interaction.user.id, (err, rows) => {
                if (rows.length > 1) {
                    return interaction.reply(`You already have a ticket active`, { ephemeral: true });
                }
            });

            db.run("INSERT INTO reports VALUES (?, ?)", interaction.user.id, id);
        });

        interaction.client.users.send("703681796105306183", `Developer ticket created with id: ${id}`);
        interaction.reply(`Ticket with ID \`${id}\` Created. Use DM's to communicate with bot devs regarding this report.`, MessageFlags.Ephemeral);
    }
};