const AudioOnJoin = require('../models/audioonjoin');
const ytdl = require('ytdl-core');

module.exports = {
	name: 'playsongonjoin',
	description: 'this command is autocalled when someone join a voice channel',
	async execute(oldMember, newMember) {
		const channelid = newMember.channelID;
		const userid = newMember.id;

		const song = await AudioOnJoin.findOne({
			channelid: channelid,
			userid: userid,
		});

		if (song) {
			const connection = await newMember.channel.join();
			const dispatcher = connection.play(
				ytdl(song.url, { filter: 'audioonly' }),
				{ seek: song.startTime ? song.startTime : '0' }
			);
			// ! Works but still in testing!
			setTimeout(() => {
				dispatcher.destroy();
			}, 10 * 1000);
		}
	},
};
