const { Message, MessageEmbed } = require('discord.js');
const { youtubeValidation } = require('../utils/urlvalidator');
const { timeValidation } = require('../utils/timevalidator');
const AudioOnJoin = require('../models/audioonjoin');

module.exports = {
	name: 'setcsong',
	description: ' ',
	/**
	 *
	 * @param {Message} message the message from the user
	 * @param {String[]} args arguments of command
	 */
	async execute(message, args) {
		var startTime = '0';
		const voiceChannel = message.guild.channels.cache
			.filter((c) => c.type === 'voice')
			.map((c) => c.name);
		// Check if there is arguments
		if (!(args.length > 1)) {
			message.reply(
				new MessageEmbed().setDescription(
					'There are some missing arguments in order to use this command!🤦‍♂️'
				)
			);
			return;
		}

		const voiceChannelName = args[0].replace('_', ' ');
		// Check if the voice channel exists
		if (!voiceChannel.includes(voiceChannelName)) {
			message.reply(
				new MessageEmbed().setDescription(
					"I can't find your voice channel🙅‍♂️\nIf you have some trouble using this command please type **!help** to get some information😊"
				)
			);
			return;
		}

		if (!youtubeValidation(args[1])) {
			message.reply(
				new MessageEmbed().setDescription(
					'Please insert a valid Youtube URL!😡'
				)
			);
			return;
		}

		if (args[2]) {
			if (!timeValidation(args[2])) {
				message.reply(
					new MessageEmbed().setDescription(
						'Your starting time was invalid!😡\nPlease insert it in a correct format [hh:mm:ss] or leave it blank for the default starting point'
					)
				);
				return;
			}
			// time is valid
			startTime = args[2];
		}

		// Retrieve the information for querying the db
		const channelID = message.guild.channels.cache
			.filter((c) => c.name === voiceChannelName)
			.map((c) => c.id)[0];
		const userID = message.author.id;
		const guildID = message.guild.id;
		const url = args[1];

		// find if there is already an entry for that user and channel
		const isthereone = await AudioOnJoin.findOne({
			channelid: channelID,
			userid: userID,
		});

		//new audio
		const newAudio = {
			userid: userID,
			channelid: channelID,
			guildid: guildID,
			url: url,
			startTime: startTime,
		};

		// update or create a new document
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
