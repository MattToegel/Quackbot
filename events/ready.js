module.exports = {
    name: 'ready',
    once: true,
    execute (client) {
        console.log(`Ready! Logged in as ${client.user.tag}`);
        const Guilds = client.guilds.cache;//.map(guild => guild.id);
        //console.log(Guilds);
        client.user.setActivity('Getting an update :)', { type: "WATCHING" });
        //NOTE: client.quackbot is not initialized in this callback

    },
};