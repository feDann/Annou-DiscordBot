const {MessageEmbed} = require('discord.js'); 

module.exports = {
    name : 'leave',
    description : 'this command make the bot leave the voice channel',
    async execute(message, args){
        
        if(message.member.voice.channel){
            await message.member.voice.channel.leave();
            message.react('👋');            
        }else{
            const embed = new MessageEmbed()
                .setDescription("You have to join a voice channel in order to use this command!🤦‍♂️🤦‍♂️");
            message.reply(embed);
        }

    }
}