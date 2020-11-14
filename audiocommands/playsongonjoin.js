const AudioOnJoin = require('../models/audioonjoin');
const ytdl = require('ytdl-core');
const { VoiceState } = require('discord.js');

module.exports = {
	name: 'playsongonjoin',
	description: 'this command is autocalled when someone join a voice channel',
	/**
	 * @param {VoiceState} oldMember The old Member
	 * @param {VoiceState} newMember The new Member
	 */
	async execute(oldMember, newMember) {
		const channelid = newMember.channelID;
		const userid = newMember.id;
		const username = newMember.member.displayName;
		const song = await AudioOnJoin.findOne({
			channelid: channelid,
			userid: userid,
		});

		if (!song) return;

		console.log(`Found song for ${username} -> ${song.url}`)
		const connection = await newMember.channel.join();
		connection.voice.setDeaf(true);

		console.log(`Connection established`)
		const stream = ytdl(song.url, { type: 'opus', filter: 'audioonly' });
		const dispatcher = connection.play(stream, {
			seek: song.startTime ? song.startTime : '0',
		});

		console.log(`Song playing!`)

		// ! Works but still in testing!
		setTimeout(() => {
			dispatcher.end();
			stream.destroy();
			console.log(`Song stopped!`)
		}, 10 * 1000);

	},
};
