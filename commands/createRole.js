const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('createrole')
        .setDescription('Creates a new role with default permissions')
        .addStringOption(option =>
            option.setName('name')
                .setDescription('The name of the role to create')
                .setRequired(true))
        .addStringOption(option => option.setName('copyfrom').setDescription('Role to copy permissions from').setRequired(false)),
    async execute (interaction) {
        console.log(interaction.options.getString("name"));
        const newRole = interaction.options.getString("name").toUpperCase();
        const target = interaction.options.getString("copyfrom");
        const roles = interaction.member.guild.roles.cache;
        const names = roles.map(r => r.name);
        const DEFAULT_ROLE = roles.find(r => r.name === (target ? target.toUpperCase() : "DEFAULT"));
        if (!DEFAULT_ROLE) {
            await interaction.reply(`Error looking up copyfrom role ${target ? target.toUpperCase() : "DEFAULT"}`);
            return;
        }
        if (names.includes(newRole)) {
            await interaction.reply(`Role ${newRole} already exists`);
            return;
        }
        else {
            await interaction.reply(`Creating new role ${newRole}`);
            await interaction.member.guild.roles.create({
                name: newRole,
                permissions: DEFAULT_ROLE.permissions
            }).then(() => {
                interaction.followUp("Role created!");
            }).catch(console.error);

        }
    },
};