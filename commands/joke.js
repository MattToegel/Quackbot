const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('joke')
        .setDescription('Replies with a random joke'),
    async execute (interaction) {
        const qb = interaction.client.quackbot;
        if (qb) {
            const joke = qb.RandomJoke();
            if (joke) {
                await interaction.reply(joke);
            }
            else {
                await interaction.reply("Sorry, no jokes available at this time");
            }
            return;
        }
        await interaction.reply("Quackbot not initialized");
    },
};