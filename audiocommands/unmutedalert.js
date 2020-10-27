const googleTTS = require('google-tts-api');

module.exports = {
    name : 'unmutedalert',
    description : 'this command is autocalled when someone unmute himself',
    async execute(oldMember, newMember){
        try{
            const username = newMember.member.displayName;
            const connection = await newMember.channel.join();
            const url = await googleTTS(`${username} unmuted`, 'en', 1);  
            const dispatcher = connection.play(url);
        }catch(err){
            console.log('Error occured')
        }      
                  

    }
}