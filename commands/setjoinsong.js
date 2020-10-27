const {youtubeValidation} = require('../utils/urlvalidator');
const AudioOnJoin = require('../models/audioonjoin');

module.exports = {
    name : 'setsong',
    description : 'add your song related to your current voice channel to the db',
    async execute(message, args){

        if(youtubeValidation(args[0])){
            
            const channelid = message.member.voice.channelID;
            
            if(channelid){
                
                const userid = message.author.id;                
                
                const isthereone = await AudioOnJoin.findOne(
                    {"channelid" : channelid,
                    "userid" : userid});
                
                  
                const newAudio = {
                    userid : userid,
                    channelid : channelid,
                    url : args[0], 
                };
                    
                if(!isthereone){
                    const audioOnJoin = new AudioOnJoin(newAudio);
                    audioOnJoin.save()
                    message.reply('Your song was added correctly!')
                }
                else{
                    await isthereone.updateOne(newAudio);
                    message.reply("Your song was updated!");
                }        
                                
            }else{
                message.reply('You have to join a voice channel in order to use this command!🤦‍♂️🤦‍♂️')
            }

        }else{
            message.reply('The URL is wrong or missing!');
        }     

           

}
}