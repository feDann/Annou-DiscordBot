const discordTTS = require('discord-tts');


module.exports = {
    name : 'undeafalert',
    description : 'this command is autocalled when someone mute himself',
    async execute(oldMember, newMember){
        try{
            const username = newMember.member.displayName;
            const connection = await newMember.channel.join();
            const stream = discordTTS.getVoiceStream(`${username} now can ear`);
            const dispatcher = connection.play(stream);       
        }catch(err){
            console.log('Error occured')
        }  
                  

    }
}