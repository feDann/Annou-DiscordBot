const tts = require('../utils/tts');
const { MessageEmbed } = require('discord.js');
const ISO6391 = require('iso-639-1');

module.exports = {
	name: 'say',
	description: 'Annou join the voice channel and say the text',
	/**
	 *
	 * @param {Message} message message from the user
	 * @param {String[]} args command arguments
	 */
	async execute(message, args) {
		if (message.channel.type === 'dm') {
			message.reply(
				new MessageEmbed().setDescription(
					'You cannot use this command in dm channel!'
				)
			);
			return;
		}
		if (message.member.voice.channelID) {
			try {
				if (args.length >= 2) {
					const lang = args.shift().toLowerCase();
					const text = args.join(' ');
					if (!(lang.length !== 2 || text.length > 200)) {
						if (!ISO6391.validate(lang)) {
							const embed = new MessageEmbed().setDescription(
								'Please remember to use a correct language format!😡\nFor more info see the [list](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) of ISO6391 code'
							);
							message.reply(embed);
							return;
						}

						const connection = await message.member.voice.channel.join();
						await connection.voice.setDeaf(true);
						const url = await tts(text, lang, 1);
						const dispatcher = connection.play(url);
						message.react('▶');
					} else {
						const embed = new MessageEmbed().setDescription(
							'Please remember to use a correct language format and a text less than 200 characters😡'
						);
						message.reply(embed);
					}
				} else {
					const embed = new MessageEmbed().setDescription(
						'There are some missing arguments in order to use this command!🤦‍♂️'
					);
					message.reply(embed);
				}
			} catch (err) {
				await message.member.voice.channel.leave();
				const embed = new MessageEmbed().setDescription(
					'A problem occurred😢😢. Please check if your language code was correct! (two letter code)'
				);
				message.reply(embed);
			}
		} else {
			const embed = new MessageEmbed().setDescription(
				"Can't do to much for you if you don't join a voice channel🤷‍♂️"
			);
			message.reply(embed);
		}
	},
};
