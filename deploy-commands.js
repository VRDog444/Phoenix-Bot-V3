const { REST, Routes } = require('discord.js');
const { clientId, testServerId, token } = require('./config.json');
const fs = require('node:fs');
const path = require('node:path');

const commands = [];
const globalCommands = [];
// Grab all the command folders from the commands directory you created earlier
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
	// Grab all the command files from the commands directory you created earlier
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	// Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		if (command.global && command.global === 1 && 'data' in command && 'execute' in command) {
			globalCommands.push(command.data.toJSON());
		}
		else if (command.global && command.global === 0 && 'data' in command && 'execute' in command) {
			globalCommands.push(command.data.toJSON());
			commands.push(command.data.toJSON());
		}
		if (!command.global && 'data' in command && 'execute' in command) {
			commands.push(command.data.toJSON());
		}
		else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}

// Construct and prepare an instance of the REST module
const rest = new REST().setToken(token);

// and deploy your commands!
(async () => {
	try {
		console.log(`Started refreshing ${commands.length} application (/) commands.`);

		// The put method is used to fully refresh all commands in the guild with the current set
		for (const command of commands) {
			if (command.global && command.global === 1) {
				globalCommands.push(command);
				commands.splice(commands.indexOf(command), 1);
			}
			else if (command.global && command.global === 0) {
				globalCommands.push(command);
			}
		}
		const data = await rest.put(
			Routes.applicationGuildCommands(clientId, testServerId),
			{ body: commands },
		);

		const globals = await rest.put(
			Routes.applicationCommands(clientId),
			{ body: globalCommands }
		);

		console.log(`Successfully reloaded ${data.length} application (/) commands and ${globals.length} Global commands.`);
	}
	catch (error) {
		// And of course, make sure you catch and log any errors!
		console.error(error);
	}
})();