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

bot.on('voiceStateUpdate',async (oldMember , newMember ) =>{
    
    let newUserChannel = newMember.channel
    let oldUserChannel = oldMember.channel


    if(newUserChannel !== null && oldUserChannel !== newUserChannel ) {

        const channelid = newMember.channelID;
        const userid = newMember.id;
        
        const song = await AudioOnJoin.findOne({
            "channelid" : channelid,
            "userid" : userid
        })

        if(song){
            
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

bot.on('message', async  message =>{
    if(!message.guild) return;

    if(message.content.startsWith('!setjoinsong')){
        
        try{
        const splittedString = message.content.split(" ");
        
        if(youtubeValidation(splittedString[1])){
            // the url is valid so i can add this in the database
            // now i have to check if is in a voice channel, otherwise i'll tell him to join a voice channel and use the comand again
            const channelid = message.member.voice.channelID;
            
            if(!channelid){
                message.reply('You have to join a voice channel in order to use this command!🤦‍♂️🤦‍♂️')
                return;
            }

            const userid = message.author.id;
            
            //find if there is already a song for this channel in the database
            const isthereone = await AudioOnJoin.findOne(
                {"channelid" : channelid,
                "userid" : userid});
            
            //json for mongoose document    
            const newAudio = {
                userid : userid,
                channelid : channelid,
                url : splittedString[1], 
            };
                
            if(!isthereone){
                // no audio setted yet for this channel, i will add the url
                const audioOnJoin = new AudioOnJoin(newAudio);

                audioOnJoin.save()
                message.reply('Your song was added correctly!')
            }
            else{
                // there is already an audio for this channel , i'll have to update the song
                await isthereone.updateOne(newAudio);
                message.reply("Your song was updated!")
            }            
            

        }else{
            message.reply('The URL is wrong or missing!')
        }

        }catch(err){
            message.reply('A problem occurred during the execution of your command')
        }

        

    }
})

