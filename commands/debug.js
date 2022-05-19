const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('debug')
        .setDescription('Turn debug on or off')
        .addStringOption(option =>
            option.setName('switch')
                .setDescription('Turn debug on or off')
                .setRequired(true)
                .addChoices({
                    name: 'On',
                    value: 'ON'
                }, { name: "Off", value: "OFF" })),
    async execute (interaction) {
        if (!interaction.member.roles.cache.some(role => role.name === 'admin')) {
            interaction.reply("Only admins can use this command");
            return;
        };
        console.log(interaction.options.getString("switch"));
        const sw = interaction.options.getString("switch").toUpperCase();

        interaction.client.quackbot.debug = (sw === "ON");
        interaction.reply(`Debug mode turned ${interaction.client.quackbot.debug ? "On" : "Off"}`);

    },
};