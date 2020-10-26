const {youtubeValidation} = require('../utils/urlvalidator');
const AudioOnJoin = require('../models/audioonjoin');

module.exports = {
    name : 'setjoinsong',
    description : 'add your song related to your current voice channel to the db',
    async execute(message, args){

        if(youtubeValidation(args[0])){
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
                url : args[0], 
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
                message.reply("Your song was updated!");
            }            
            

        }else{
            message.reply('The URL is wrong or missing!');
        }     

           

}
}