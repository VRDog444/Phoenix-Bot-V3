const { Events, MessageFlags, ChannelType, PermissionFlagsBits } = require('discord.js');
const { generate } = require("randomstring");
const { CommandPermissionLevel } = require("../Util");
const config = require("../config.json");

module.exports = {
	name: Events.InteractionCreate,
	async execute(interaction) {
		// #region Buttons
		if (interaction.isButton()) {
			if (interaction.customId === "create_ticket") {
				interaction.guild.channels.create({
					name: `ticket-${generate(5)}`,
					type: ChannelType.GuildText,
					permissionOverwrites: [
						{
							id: interaction.guild.roles.cache.find(r => r.name.includes("Admin")).id,
							allow: [PermissionFlagsBits.SendMessages, PermissionFlagsBits.ReadMessageHistory, PermissionFlagsBits.ViewChannel, PermissionFlagsBits.UseApplicationCommands]
						},
						{
							id: interaction.guild.roles.cache.find(r => r.name.includes("Mod")).id,
							allow: [PermissionFlagsBits.SendMessages, PermissionFlagsBits.ReadMessageHistory, PermissionFlagsBits.ViewChannel]
						},
						{
							id: interaction.user.id,
							allow: [PermissionFlagsBits.SendMessages, PermissionFlagsBits.ReadMessageHistory, PermissionFlagsBits.ViewChannel]
						},
						{
							id: interaction.guild.roles.everyone.id,
							deny: [PermissionFlagsBits.ReadMessageHistory, PermissionFlagsBits.ViewChannel]
						}
					]
				});
			}
		}
		// #endregion

		const command = interaction.client.commands.get(interaction.commandName);

		if (!command) {
			console.error(`No command matching ${interaction.commandName} was found.`);
			return;
		}

		// #region CTX Menu Commands
		if (interaction.isUserContextMenuCommand()) {
			if (command.permLevel) {
				switch (command.permLevel) {
					case CommandPermissionLevel.Devs:
						if (!config.dev.devIds.includes(interaction.user.id)) {
							interaction.reply(`You lack the required permission level to use this command.`);
							interaction.client.users.send(config.dev.devIds[0], `[ALERT] Attempt to use Dev command ${command.name} by ${interaction.user.username}(ID: ${interaction.user.id})`);
						}
						break;
					case CommandPermissionLevel.ServerOwner:
						if (interaction.guild.ownerId !== interaction.user.id) return interaction.reply(`You must be the server owner to use this command`);
						break;
					case CommandPermissionLevel.ServerAdmins:
						if (!interaction.member.roles.cache.find(r => r.name.includes("Admin")) || interaction.guild.ownerId === interaction.user.id) return interaction.reply(`You must be a server admin to use this command`);
						break;
					case CommandPermissionLevel.ServerMods:
						if (!interaction.member.roles.cache.find(r => r.name.includes("Mod")) || !interaction.member.roles.cache.find(r => r.name.includes("Admin")) || interaction.guild.ownerId === interaction.user.id) return interaction.reply(`You must be atleast a server mod to use this command.`);
						break;
				}
			}

			try {
				await command.execute(interaction);
			}
			catch (error) {
				console.error(error);
				if (interaction.replied || interaction.deferred) {
					await interaction.followUp({ content: 'There was an error while executing this command!', flags: MessageFlags.Ephemeral });
				}
				else {
					await interaction.reply({ content: 'There was an error while executing this command!', flags: MessageFlags.Ephemeral });
				}
			}
		}
		// #endregion

		// #region Slash Commands
		if (!interaction.isChatInputCommand()) return;

		if (command.permLevel) {
			switch (command.permLevel) {
				case CommandPermissionLevel.Devs:
					if (!config.dev.devIds.includes(interaction.user.id)) {
						interaction.reply(`You lack the required permission level to use this command.`);
						interaction.client.users.send(config.dev.devIds[0], `[ALERT] Attempt to use Dev command ${command.name} by ${interaction.user.username}(ID: ${interaction.user.id})`);
					}
					break;
				case CommandPermissionLevel.ServerOwner:
					if (interaction.guild.ownerId !== interaction.user.id) return interaction.reply(`You must be the server owner to use this command`);
					break;
				case CommandPermissionLevel.ServerAdmins:
					if (!interaction.member.roles.cache.find(r => r.name.includes("Admin")) || interaction.guild.ownerId === interaction.user.id) return interaction.reply(`You must be a server admin to use this command`);
					break;
				case CommandPermissionLevel.ServerMods:
					if (!interaction.member.roles.cache.find(r => r.name.includes("Mod")) || !interaction.member.roles.cache.find(r => r.name.includes("Admin")) || interaction.guild.ownerId === interaction.user.id) return interaction.reply(`You must be atleast a server mod to use this command.`);
					break;
			}
		}

		try {
			await command.execute(interaction);
		}
		catch (error) {
			console.error(error);
			if (interaction.replied || interaction.deferred) {
				await interaction.followUp({ content: 'There was an error while executing this command!', flags: MessageFlags.Ephemeral });
			}
			else {
				await interaction.reply({ content: 'There was an error while executing this command!', flags: MessageFlags.Ephemeral });
			}
		}
		// #endregion
	},
};