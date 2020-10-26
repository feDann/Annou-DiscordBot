const AlertSchema = require('../models/alertschema');

module.exports = {
    name : 'alertoff',
    description : 'this command deactivate alert when someone mute himself ecc',
    async execute(message, args){
        if(message.member.voice.channel){
            const channelid = message.member.voice.channel.id;
            const newalert = {
                channelid : channelid,
                alert : "false"
            }
            const isthereone = await AlertSchema.findOne({channelid:channelid});
            if(!isthereone){
                const alert = new AlertSchema(newalert);
                alert.save()
            }else{
                await isthereone.updateOne(newalert);
            }
            message.reply('Alert deactivated for this voice channel')
        }else{
            message.reply('Can\'t do to much for you if you don\'t join a voice channel🤷‍♂️');
        }
    }
}