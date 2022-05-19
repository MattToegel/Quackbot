const fetch = require('cross-fetch');
module.exports.QuackBot = () => {

    return {
        jokes: [],
        debug: false,
        RandomJoke: function () {
            let jc = this.jokes.length;
            if (jc > 0) {
                let index = Math.floor(Math.random() * jc)
                return this.jokes[index];
            }
            return false;
        },
        AssignRoles: async function (mentions, message) {
            if (mentions.length > 0) {
                console.log("I was mentioned, let's do this");
                const result = await fetch.fetch(`https://us-central1-learn-e1de9.cloudfunctions.net/mapDiscord?discord=${message.author.id}`, {
                    method: "GET"

                }).then(resp => resp.json()).then(data => {
                    console.log("data", data);
                    return data;
                }).catch(e => {
                    console.log("fetch error", e);
                    return false;
                });
                if (result) {
                    //message.author.send()
                    await message.reply("Checking roles...");
                    let reply = "";
                    if (result.displayName) {
                        await message.member.setNickname(result.displayName).then(() => {
                            reply += `Updated nickname to ${result.displayName} \n`;
                        }).catch(e => {
                            reply += `There was a problem updating your nickname: ${e.message}\n`
                        });

                    }
                    if (!result.discordId) {
                        await message.reply("Please refresh your Discord mapping on https://learn.ethereallab.app/profile");
                        return;
                    }
                    if (result.discordId != message.author.id) {
                        await message.reply("Somehow the fetched results are not for you, this shouldn't happen");
                        return;
                    }
                    if (result.groups) {
                        reply += `Found ${result.groups.length} roles\n`;
                        let userRoles = message.member.roles.cache.map(r => r.name);

                        let rolesToAdd = result.groups.filter(g => !userRoles.includes(g));
                        console.log("Roles to add", rolesToAdd);
                        if (rolesToAdd.length === 0) {
                            reply += "You already have all your roles assigned";
                        }
                        else {
                            reply += `Adding you to ${rolesToAdd.length} ${rolesToAdd.length > 1 ? "roles" : "role"} \n`;
                            for (let role of rolesToAdd) {
                                if (!userRoles.includes(role)) {
                                    console.log("Adding role", role);
                                    let gRole = message.guild.roles.cache.find(r => r.name == role);
                                    console.log("Checking gRole", gRole);
                                    if (gRole) {
                                        await message.member.roles.add(gRole).then(() => {
                                            reply += `Added to role ${role} \n`
                                        }).catch(e => {
                                            console.log("Error adding role to ", message.author.username, gRole, e);
                                        })
                                    }
                                }
                            }
                        }
                    }
                    await message.reply(reply);
                }
            }
        },
        LoadJokes: async function () {
            const result = await fetch.fetch(`https://us-central1-learn-e1de9.cloudfunctions.net/getJokes`, {
                method: "GET"

            }).then(resp => resp.json()).then(data => {
                console.log("data", data);
                return data;
            }).catch(e => {
                console.log("fetch error", e);
                return false;
            });
            if (result) {
                if (result.jokes) {
                    this.jokes = result.jokes;
                    console.log("Loaded jokes", this.jokes);
                }
                else if (result.message) {
                    console.log("Error response: ", result.message);
                }
            }
            else {
                console.error("There was a problem loading jokes");
            }
        }
    }
}