const dotenv = require('dotenv');

dotenv.config();

const Discord = require('discord.js');
const bot = new Discord.Client();

const TOKEN = process.env.TOKEN;


bot.on('ready', () => {
    console.info(`Logged in as ${bot.user.tag}!`);
  });

bot.on('voiceStateUpdate',(oldMember , newMember ) =>{
    
    let newUserChannel = newMember.channel
    let oldUserChannel = oldMember.channel


    if(newUserChannel !== null && oldUserChannel !== newUserChannel ) {

        const channelid = newMember.channelID;
        const userid = newMember.id;
        const username = newMember.member.displayName;

        console.log(username + ' joined channel')

    } else if(newUserChannel === null){

        const username = newMember.member.displayName;

        console.log(username + ' leaves channel')
    }
    else{
        console.log('other stuff')
    }
    
})

bot.login(TOKEN);