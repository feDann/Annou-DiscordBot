const googleTTS = require('google-tts-api');

module.exports = {
    name : 'say',
    description : 'Annou join the voice channel and say the text',
    async execute(message, args){
        if(message.member.voice.channelID){
            try{
                if(args.length >= 2){
                    const lang = args.shift().toLowerCase();
                    const text = args.join(" ");
                    if(!(lang.length!== 2 || text.length>200)){
                        
                        const connection = await message.member.voice.channel.join();
                        const url = await googleTTS(text, lang, 1);  
                        const dispatcher = connection.play(url);
                        message.react('▶')
                    }
                    else{
                        message.reply('Please remember to use a correct language format and a text less than 200 characters😡');
                    }
                }
                else{
                    message.reply('Please remember to use a correct language format and a text less than 200 characters😡');
                }
                
            }catch(err){
                await message.member.voice.channel.leave();
                message.reply('A problem occurred😢😢. Please check if your language code was correct! (two letter code)')
            }
        }
        else{
            message.reply('You have to join a voice channel in order to use this command!🤦‍♂️🤦‍♂️')
        }          

    }
}