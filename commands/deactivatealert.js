const AlertSchema = require('../models/alertschema');
const {MessageEmbed} = require('discord.js'); 

module.exports = {
    name : 'alertoff',
    description : 'this command deactivate alert when someone mute himself ecc',
    async execute(message, args){
        if(message.member.voice.channel){
            const channelid = message.member.voice.channel.id;
            const guildid = message.guild.id;
            const newalert = {
                channelid : channelid,
                guildid:guildid,
                alert : "false"
            }
            const isthereone = await AlertSchema.findOne({channelid:channelid});
            if(!isthereone){
                const alert = new AlertSchema(newalert);
                alert.save()
            }else{
                await isthereone.updateOne(newalert);
            }
            const embed = new MessageEmbed()
                            .setDescription('Alert deactivated for this voice channel📴');
            message.reply(embed)
        }else{
            const embed = new MessageEmbed()
                .setDescription('Can\'t do to much for you if you don\'t join a voice channel🤷‍♂️');
            message.reply(embed);
        }
    }
}