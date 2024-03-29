module.exports = {
    name: 'interactionCreate',
    async execute (interaction) {
        console.log(`${interaction.user.tag} in #${interaction.channel.name} triggered an interaction.`);
        if (!interaction.isCommand()) return;

        // @ts-ignore
        const command = interaction.client.commands.get(interaction.commandName);
        console.log(interaction.client.quackbot);
        if (!command) return;

        try {
            await command.execute(interaction);
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
        }
    },
};