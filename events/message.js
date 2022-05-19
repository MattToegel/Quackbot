module.exports = {
    name: 'messageCreate',
    async execute (message) {
        if (message.author.bot) return;
        //console.log("Message: ", message, message.channel.name, message.mentions);
        //console.log("roles", message.member.roles.cache.map(r => r.name));
        let debug = message.client.quackbot ? message.client.quackbot.debug : true;
        console.log("debug mode", debug);
        if (!message.channel.id) {
            message.reply("Most interactions won't work via DMs");
            return;
        }
        if ((debug && message.channel.id != "758428198735708229")) {
            console.log("Not test channel, ignoring");
            return;
        }
        let mention = message.mentions.users.filter(m => m.bot && m.username.toLowerCase() === "quackbot").map(d => {
            return {
                bot: d.bot,
                username: d.username
            }
        });
        //TODO assign roles
        //call mentions
        if (message.client.quackbot) {
            await message.client.quackbot.AssignRoles(mention, message);
        }
        console.log("done procesisng message");
        // console.log("Message: ", message, message.channel.name, message.mentions);
    },
};