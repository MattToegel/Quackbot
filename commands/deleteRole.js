const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('deleterole')
        .setDescription('Deletes a non-admin role')
        .addStringOption(option =>
            option.setName('name')
                .setDescription('The name of the role to delete')
                .setRequired(true)),
    async execute (interaction) {
        if (!interaction.member.hasPermission("ADMINISTRATOR")) {
            interaction.reply("Only admins can use this command");
            return;
        };
        console.log(interaction.options.getString("name"));
        const newRole = interaction.options.getString("name").toUpperCase();
        if (newRole === "ADMIN") {
            interaction.reply("Can't delete admin role");
            return;
        }
        const roles = interaction.member.guild.roles.cache;
        const gRole = roles.find(r => r.name === newRole);
        if (gRole) {
            gRole.delete().then(() => {
                interaction.reply(`Deleted Roles ${gRole.name}`);
            })
                .catch(e => {
                    interaction.reply(`Error deleting role ${JSON.stringify(e)}`);
                })
            /*interaction.member.guild.delete(gRole.id).then(() => {
                interaction.reply(`Deleted Roles ${gRole.name}`);
            })
                .catch(e => {
                    interaction.reply(`Error deleting role ${JSON.stringify(e)}`);
                })*/
        }
        else {
            interaction.reply("Role doesn't exist");
        }
    },
};