const AudioOnJoin = require('../models/audioonjoin');

module.exports = {
    name : 'deletesong',
    description : 'delete song related to your current voice channel from the db',
    async execute(message, args){
        
            const channelid = message.member.voice.channelID;
            
            if(!channelid){
                message.reply('You have to join a voice channel in order to use this command!🤦‍♂️🤦‍♂️')
                return;
            }

            const userid = message.author.id;
            
            
            const deleted = await AudioOnJoin.findOneAndDelete(
                {"channelid" : channelid,
                "userid" : userid});
            
            message.reply('Your song was deleted!🎶😎')           
            

           

           

}
}