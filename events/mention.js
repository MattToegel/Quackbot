module.exports = {
    name: 'mention',
    execute (mention) {
        if (!mention) return;
        /*if (mention.startsWith('<@') && mention.endsWith('>')) {
            mention = mention.slice(2, -1);

            if (mention.startsWith('!')) {
                mention = mention.slice(1);
            }

            return client.users.cache.get(mention);
        }*/
        console.log("skeleton");
    },
};