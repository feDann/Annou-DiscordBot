const discordTTS = require('discord-tts');


module.exports = {
    name : 'deafalert',
    description : 'this command is autocalled when someone deaf himself',
    async execute(oldMember, newMember){
        
        const username = newMember.member.displayName;
        const connection = await newMember.channel.join();
        const stream = discordTTS.getVoiceStream(`${username} make himself deaf`);
        const dispatcher = connection.play(stream);       
            
                  

    }
}