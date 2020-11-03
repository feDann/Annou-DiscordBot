const {MessageEmbed} = require('discord.js'); 

module.exports = {
    name : 'stop',
    description : 'this command stop the playing song if it is one',
    async execute(message, args){
        
        if(message.member.voice.channel){
            const connection = await message.member.voice.channel.join();
            const dispatcher = connection.dispatcher;
            if(dispatcher){
                dispatcher.destroy();                              
            }
            message.react('🛑'); 

        }else{
            const embed = new MessageEmbed()
                .setDescription("You have to join a voice channel in order to use this command!🤦‍♂️🤦‍♂️");
            message.reply(embed);
        }
    }

}