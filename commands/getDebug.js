const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('getdebug')
        .setDescription('Gets debug status'),
    async execute (interaction) {
        if (!interaction.member.hasPermission("ADMINISTRATOR")) {
            interaction.reply("Only admins can use this command");
            return;
        };

        interaction.reply(`Debug mode turned ${interaction.client.quackbot.debug ? "On" : "Off"}`);

    },
};