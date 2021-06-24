const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'join',
	description: 'this command make the bot join the voice channel',
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

		if (message.member.voice.channel) {
			await message.member.voice.channel.join();
			message.react('👋');
		} else {
			const embed = new MessageEmbed().setDescription(
				'You have to join a voice channel in order to use this command!🤦‍♂️🤦‍♂️'
			);
			message.reply(embed);
		}
	},
};
