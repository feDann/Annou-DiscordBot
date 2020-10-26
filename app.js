const dotenv = require('dotenv');

dotenv.config();

const Discord = require('discord.js');
const bot = new Discord.Client();
const mongoose = require('mongoose');
const AudioOnJoin = require('./models/audioonjoin');


const ytdl = require('ytdl-core');
const fs = require('fs');

const TOKEN = process.env.TOKEN;
const DBURL = process.env.DB_URL;

const prefix = "!";


bot.commands = new Discord.Collection();

const commandFiles  = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));

for(const file of commandFiles){
    const command = require(`./commands/${file}`);

    bot.commands.set(command.name , command);

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

        const channelid = newMember.channelID;
        const userid = newMember.id;
        const username = newMember.member.displayName;

        const song = await AudioOnJoin.findOne({
            "channelid" : channelid,
            "userid" : userid
        })

        if(song){       
            const connection = await newMember.channel.join();
            const dispatcher = connection.play(ytdl(song.url, { filter: 'audioonly' }));
      
            
        }

        console.log(username + ' joined channel')

    } else if(newUserChannel === null){

        const username = newMember.member.displayName;

        console.log(username + ' leaves channel')
    }
    else{
        console.log('other stuff')
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


