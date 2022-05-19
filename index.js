//require('dotenv').config()
require('dotenv').config({ path: require('find-config')('.env') })
console.log("process", process.env);
const fs = require('node:fs');
const path = require('node:path');
// Require the necessary discord.js classes
const { Client, Intents, Collection } = require('discord.js');
const { QuackBot } = require("./quackbot");
//const { token } = require('./config.json');
const token = (process.env.DISCORD_TOKEN ? process.env.DISCORD_TOKEN : "");
console.log("token", token);
// Create a new client instance
const client = new Client({
    intents:
        [Intents.FLAGS.GUILDS, Intents.FLAGS.DIRECT_MESSAGES, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_INTEGRATIONS], partials: ["MESSAGE", "CHANNEL"]
});

// When the client is ready, run this code (only once)
/*client.once('ready', () => {
    console.log('Ready!');
    const Guilds = client.guilds.cache;//.map(guild => guild.id);
    console.log(Guilds);

});*/
//Register commands
// @ts-ignore
client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    // @ts-ignore
    client.commands.set(command.data.name, command);
    console.log("Register command ", command.data.name);
}

/*const rest = new REST({ version: '9' }).setToken(token);
(async () => {
    try {
        console.log('Started refreshing application (/) commands.');

        await rest.put(
            Routes.applicationCommands(clientId),
            { body: commands },
        );

        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
})();*/
//Register events
const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));
for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file);
    const event = require(filePath);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
        console.log("Register once ", event.name);
    } else {
        client.on(event.name, (...args) => event.execute(...args));
        console.log("Register on ", event.name);
    }
}

const getUserFromMention = (mention) => {
    if (!mention) return;
    if (mention.startsWith('<@') && mention.endsWith('>')) {
        mention = mention.slice(2, -1);

        if (mention.startsWith('!')) {
            mention = mention.slice(1);
        }

        return client.users.cache.get(mention);
    }
}
// @ts-ignore
client.quackbot = QuackBot();
// @ts-ignore
console.log(client.quackbot)
// Login to Discord with your client's token
client.login(token);
// @ts-ignore
client.quackbot.LoadJokes();

module.exports = client;