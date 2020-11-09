const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'stop',
	description: 'this command stop the playing song if it is one',
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
			const connection = await message.member.voice.channel.join();
			const dispatcher = connection.dispatcher;
			if (dispatcher) {
				dispatcher.destroy();
			}
			message.react('🛑');
		} else {
			const embed = new MessageEmbed().setDescription(
				'You have to join a voice channel in order to use this command!🤦‍♂️🤦‍♂️'
			);
			message.reply(embed);
		}
	},
};
