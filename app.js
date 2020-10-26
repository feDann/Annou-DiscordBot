const dotenv = require('dotenv');

dotenv.config();

const Discord = require('discord.js');
const bot = new Discord.Client();
const mongoose = require('mongoose');
const AudioOnJoin = require('./models/audioonjoin');
const discordTTS = require('discord-tts');


const fs = require('fs');

const TOKEN = process.env.TOKEN;
const DBURL = process.env.DB_URL;

const prefix = "!";


bot.commands = new Discord.Collection();
bot.audiocommands = new Discord.Collection();

const commandFiles  = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
const playcommandFiles = fs.readdirSync('./audiocommands/').filter(file => file.endsWith('.js'));

for(const file of commandFiles){
    const command = require(`./commands/${file}`);

    bot.commands.set(command.name , command);

}

for(const audiofile of playcommandFiles){
    const audiocommand = require(`./audiocommands/${audiofile}`);

    bot.audiocommands.set(audiocommand.name , audiocommand);

}

mongoose.connect(DBURL);
bot.login(TOKEN);

bot.on('ready', () => {
    console.info(`Logged in as ${bot.user.tag}!`);
  });

bot.on('voiceStateUpdate',async (oldMember , newMember ) =>{
    
    let newUserChannel = newMember.channel
    let oldUserChannel = oldMember.channel


    if(newUserChannel !== null && oldUserChannel !== newUserChannel ) {

        bot.audiocommands.get('playsongonjoin').execute(oldMember, newMember)

    } else if(newUserChannel === null){

        const username = newMember.member.displayName;

        console.log(username + ' leaves channel')
    }
    else{
        console.log('other stuff')
        const connection = await newMember.channel.join();
        const stream = discordTTS.getVoiceStream("fedann muted himself");
        const dispatcher = connection.play(stream);
    }
    
})

bot.on('message', message =>{
    if(!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    try{
    bot.commands.get(command).execute(message, args);
    }catch(err){
        console.log('missing command');
    }   


})


