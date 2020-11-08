const { youtubeValidation } = require('../utils/urlvalidator');
const { timeValidation } = require('../utils/timevalidator');
const AudioOnJoin = require('../models/audioonjoin');
const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'setsong',
	description:
		'add your song related to your current voice channel to the db',
	async execute(message, args) {
		const channelid = message.member.voice.channelID;
		const guildid = message.guild.id;
		const userid = message.author.id;
		var startTime = '0';

		// Check if the user is in a voice channel
		if (!channelid) {
			message.reply(
				new MessageEmbed().setDescription(
					'You have to join a voice channel in order to use this command!🤦‍♂️🤦‍♂️'
				)
			);
			return;
		}
		// check if there are arguments for the command
		if (!(args.length > 0)) {
			message.reply(
				new MessageEmbed().setDescription(
					'There are some missing arguments in order to use this command!🤦‍♂️'
				)
			);
			return;
		}

		// check if the youtube url is valid
		if (!youtubeValidation(args[0])) {
			message.reply(
				new MessageEmbed().setDescription(
					'Please insert a valid Youtube URL!😡'
				)
			);
			return;
		}

		//check if time format is valid
		if (args[1]) {
			if (!timeValidation(args[1])) {
				message.reply(
					new MessageEmbed().setDescription(
						'Your starting time was invalid!😡\nPlease insert it in a correct format [hh:mm:ss] or leave it blank for the default starting point'
					)
				);
				return;
			}
			// time is valid
			startTime = args[1];
		}

		const isthereone = await AudioOnJoin.findOne({
			channelid: channelid,
			userid: userid,
		});

		const newAudio = {
			userid: userid,
			channelid: channelid,
			guildid: guildid,
			url: args[0],
			startTime: startTime,
		};

		if (isthereone) {
			await isthereone.updateOne(newAudio);
			message.reply(
				new MessageEmbed().setDescription('Your song was updated!🎵')
			);
		} else {
			const audioOnJoin = new AudioOnJoin(newAudio);
			audioOnJoin.save();

			message.reply(
				new MessageEmbed().setDescription(
					'Your song was added correctly!🎶'
				)
			);
		}
	},
};
