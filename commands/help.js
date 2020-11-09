const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'help',
	description: 'Show the list of all commands',
	async execute(message, args) {
		const helpmessage =
			'use the following command while you are in a voice  channel\n\n**an:say [LANGUAGE CODE] [YOUR TEXT]** - Annou join your voice channel and say your text in the selected language\n\n**an:alerton** - activate alert for mute action *ecc* \n\n**an:alertoff** - deactivate alert for mute action *ecc* \n\n**an:setsong [YOUTUBE_URL] [START_TIME: HH:MM:SS]** - when you join the current voice channel Annou  will play the chosen song for 10 seconds. ([START_TIME] argument is optional)\n\n**an:deletesong** - delete your song on join for the current voice channel\n\n**an:stop** - stop the playing song\n\n**an:leave** - Annou leaves your voice channel\n\n alternative commands:\n\n **an:setcsong [VOICE_CHANNEL_NAME] [YOUTUBE_URL] [START_TIME]** - same as !setsong, you can use this command even if you are not in a voice channel.Please while using this command replace all the spaces of the channel name with \'_\'';
		const embed = new MessageEmbed()
			.setTitle('an:help')
			.setAuthor('Annou')
			.setDescription(helpmessage);
		message.reply(embed);
	},
};
