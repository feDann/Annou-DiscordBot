const AudioOnJoin = require('../models/audioonjoin');
const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'deletesong',
	description:
		'delete song related to your current voice channel from the db',
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
		const channelid = message.member.voice.channelID;

		if (!channelid) {
			const embed = new MessageEmbed().setDescription(
				"Can't do to much for you if you don't join a voice channel🤷‍♂️"
			);
			message.reply(embed);
			return;
		}

		const userid = message.author.id;

		const deleted = await AudioOnJoin.findOneAndDelete({
			channelid: channelid,
			userid: userid,
		});

		const embed = new MessageEmbed().setDescription(
			'Your song was deleted!📴☹'
		);
		message.reply(embed);
	},
};
