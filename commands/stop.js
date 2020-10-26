module.exports = {
    name : 'stop',
    description : 'this command stop the playing song if it is one',
    async execute(message, args){
        
        if(message.member.voice.channel){
            const connection = await message.member.voice.channel.join();
            const dispatcher = connection.dispatcher;
            if(dispatcher){
                dispatcher.destroy();
                message.react('🛑');
            }else{
                message.reply('Can\'t do to much for you🤷‍♂️');
            }
            
        }
        else{
            message.reply('Can\'t do to much for you🤷‍♂️');
        }
    }
}