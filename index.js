/**
* Created by Krybskytten on ++/++/++
* Current version 1.0.1 - Last updated ++/++/++
*/

const Discord = require ("discord.js");
const client = new Discord.Client();

const config = require ("./config.json");
const prefix = config.prefix;

const fs = require ("fs");
const file = require ("file-system");


client.on("ready", () => {
    console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`);
  //  client.user.setActivity(`Serving ${client.guilds.size} servers | h!help`);
  });
  
  client.on("guildCreate", guild => {
  //  guild.channels.find(`name`,`welcome`).send(`o/. Thank you so much for adding me. Use **h!help** to see my commands.`);
    console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
   // client.user.setActivity(`Serving ${client.guilds.size} servers | h!help`);
  });
  
  client.on("guildDelete", guild => {
    console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
   // client.user.setActivity(`Serving ${client.guilds.size} servers | h!help`);
  
  });


const glob = require("glob");

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
glob('commands/**/*.js', (err, files) => {
    if (err) console.log(err);
        files.forEach(file => {
        if (!file.endsWith(".js")) return;
        let props = require(`./` + file);
        let commandName = file.split(".")[0];
 
    });
});

client.on('message', async message => {

  let msg = message.content.toLowerCase();
  let sender = message.author;
  let args = message.content.slice(prefix.length).trim().split(/ +/g);
  let cmd = args.shift().toLowerCase();
      
  if (!msg.startsWith(prefix) || message.author.bot) return;
      
    try {
    let command = require(`./commands/${cmd}.js`);
    command.run(client, message, args);
    } catch (e) {
      console.log(e.message);
    } finally {
      console.log(`${sender.tag} - ${sender.id} - ${cmd}`);
    }
});

fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    const event = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    client.on(eventName, event.bind(null, client));
  });
});

client.login(config.token);