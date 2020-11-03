const dotenv = require('dotenv');

dotenv.config();

const Discord = require('discord.js');
const bot = new Discord.Client();
const mongoose = require('mongoose');
const AlertSchema = require('./models/alertschema');


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

mongoose.connect(DBURL, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true });
bot.login(TOKEN);


bot.on('ready', () => {
    const numberOfGuilds = bot.guilds.cache.size
    console.info(`Logged in as ${bot.user.tag}!\nCurrently in ${numberOfGuilds} guilds!`);
    bot.user.setActivity(`!help` , {type : "LISTENING"});
  });

bot.on('guildDelete' || 'guildUnavailable', guild =>{
    console.log(`Removed from guild: ${guild.name}`)
});


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


bot.on('voiceStateUpdate',async (oldMember , newMember ) =>{
    
    let newUserChannel = newMember.channel
    let oldUserChannel = oldMember.channel
    
    const username = newMember.member.displayName;

    if(newUserChannel !== null && oldUserChannel !== newUserChannel ) {
        console.log(username + ' joined channel')
        bot.audiocommands.get('playsongonjoin').execute(oldMember, newMember)

    } else if(newUserChannel === null){

        console.log(username + ' leaves channel')
    }
    else{
        
        const channelid = newMember.channelID;
        const result = await AlertSchema.findOne({channelid:channelid});
        if(result && result.alert){
            // deaf
            if(oldMember.deaf === false  && newMember.deaf === true){
                bot.audiocommands.get('deafalert').execute(oldMember,newMember);
                console.log(`${username} deaf action`)
            }
            // no-deaf
            else if(oldMember.deaf === true  && newMember.deaf === false){
                bot.audiocommands.get('undeafalert').execute(oldMember,newMember);
                console.log(`${username} undeaf action`)
            }
            // muted action
            else if(oldMember.mute === false  && newMember.mute === true){
                bot.audiocommands.get('mutedalert').execute(oldMember,newMember);
                console.log(`${username} mute action`)
            }
            // unmuted action
            else if(oldMember.mute === true  && newMember.mute === false){
                bot.audiocommands.get('unmutedalert').execute(oldMember,newMember);
                console.log(`${username} unmute action`)
            }
            
        }
        
    }
    
})



