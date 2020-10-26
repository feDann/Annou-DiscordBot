const discordTTS = require('discord-tts');


module.exports = {
    name : 'mutedalert',
    description : 'this command is autocalled when someone mute himself',
    async execute(oldMember, newMember){
        try{
            const username = newMember.member.displayName;
            const connection = await newMember.channel.join();
            const stream = discordTTS.getVoiceStream(`${username} muted himself`);
            const dispatcher = connection.play(stream);       
        }catch(err){
            console.log('Error occured')
        }
            
                  

    }
}