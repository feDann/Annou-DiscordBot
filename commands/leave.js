module.exports = {
    name : 'leave',
    description : 'this command make the bot leave the voice channel',
    async execute(message, args){
        
        if(message.member.voice.channel){
            await message.member.voice.channel.leave();
            message.react('👋');
            
        }
        else{
            message.reply('Can\'t do to much for you🤷‍♂️');
        }
    }
}