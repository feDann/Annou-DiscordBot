const dotenv = require('dotenv');

dotenv.config();

const Discord = require('discord.js');
const bot = new Discord.Client();
const mongoose = require('mongoose');
const AudioOnJoin = require('./models/audioonjoin');
const {youtubeValidation} = require('./utils/urlvalidator')

const TOKEN = process.env.TOKEN;
const DBURL = process.env.DB_URL;

mongoose.connect(DBURL);
bot.login(TOKEN);

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

bot.on('message', message =>{
    if(!message.guild) return;

    if(message.content.startsWith('!setjoinsong')){
        
        try{
        const splittedString = message.content.split(" ");
        
        if(youtubeValidation(splittedString[1])){
            console.log(splittedString[1])
        }else{
            message.reply('The URL is wrong or missing!')
        }

        }catch(err){
            message.reply('problem')
        }

        

    }
})

