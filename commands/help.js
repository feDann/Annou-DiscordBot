const { Message, MessageEmbed } = require('discord.js');

module.exports = {
	name: 'help',
	description: 'Show the list of all commands',
	/**
	 *
	 * @param {Message} message message from the user
	 * @param {String[]} args command arguments
	 */
	async execute(message, args) {
		const avatar = message.client.user.avatarURL();
		const embed = new MessageEmbed({
			title: 'an:help',
			author: 'Annou',
			thumbnail: {
				url: avatar,
			}, timestamp: new Date(),
			footer: {
				iconURL: avatar,
				text: 'Annou'
			},
			description:
				'use the following command while you are in a voice channel',
			fields: [
				{
					name: 'an:say [LANGUAGE CODE] [YOUR TEXT]',
					value:
						'Annou join your voice channel and say your text in the selected language',
				},
				{
					name: 'an:alerton',
					value: 'activate alert for mute action *ecc*',
				},
				{
					name: 'an:alertoff',
					value: 'deactivate alert for mute action *ecc*',
				},
				{
					name: 'an:setsong [YOUTUBE_URL] [START_TIME]',
					value:
						'when you join the current voice channel Annou will play the chosen song for 10 seconds. ([START_TIME] argument is optional)',
				},
				{
					name:
						'an:setcsong [VOICE_CHANNEL_NAME] [YOUTUBE_URL] [START_TIME]',
					value:
						"same as **an:setsong**, you can use this command even if you are not in a voice channel.Please while using this command replace all the spaces of the channel name with '_'",
				},
				{
					name: 'an:deletesong',
					value:
						'delete your song on join for the current voice channel',
				},
				{
					name: 'an:stop',
					value: 'stop the playing song',
				},
				{
					name: 'an:leave',
					value: 'Annou leaves your voice channel',
				},
			],
		});
		message.reply(embed);
	},
};
