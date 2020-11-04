const { youtubeValidation } = require('../utils/urlvalidator');
const { timeValidation } = require('../utils/timevalidator')
const AudioOnJoin = require('../models/audioonjoin');
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'setsong',
    description: 'add your song related to your current voice channel to the db',
    async execute(message, args) {

        const channelid = message.member.voice.channelID;

        if (channelid) {
            const guildid = message.guild.id;
            if (args.length > 0) {
                var startTime = '0';
                if (youtubeValidation(args[0])) {


                    if (args[1]) {
                        if (timeValidation(args[1])) {
                            startTime = args[1];
                        } else {
                            const embed = new MessageEmbed()
                                .setDescription('Your starting time was invalid!\nPlease insert it in a correct format [hh:mm:ss] or leave it blank for the default starting point');

                            message.reply(embed);
                            return;
                        }
                    }


                    const userid = message.author.id;

                    const isthereone = await AudioOnJoin.findOne(
                        {
                            "channelid": channelid,
                            "userid": userid,
                            guildid: guildid
                        });


                    const newAudio = {
                        userid: userid,
                        channelid: channelid,
                        guildid: guildid,
                        url: args[0],
                        startTime: startTime
                    };

                    if (!isthereone) {
                        const audioOnJoin = new AudioOnJoin(newAudio);
                        audioOnJoin.save()
                        const embed = new MessageEmbed()
                            .setDescription('Your song was added correctly!🎶');

                        message.reply(embed);

                    }
                    else {
                        await isthereone.updateOne(newAudio);
                        const embed = new MessageEmbed()
                            .setDescription('Your song was updated!🎵');
                        message.reply(embed);

                    }
                } else {
                    const embed = new MessageEmbed()
                        .setDescription('The URL is not valid!😡\nRemember to use a URL from youtube!');
                    message.reply(embed);

                }
            }
            else {
                const embed = new MessageEmbed()
                    .setDescription('There are some missing arguments in order to use this command!🤦‍♂️');
                message.reply(embed);

            }

        } else {
            const embed = new MessageEmbed()
                .setDescription("You have to join a voice channel in order to use this command!🤦‍♂️🤦‍♂️");
            message.reply(embed);
        }

    }
}