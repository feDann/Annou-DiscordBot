const { Message, MessageEmbed } = require('discord.js');


module.exports = {
	name: 'stats',
	description: '',
	/**
	 *
	 * @param {Message} message the message received
	 * @param {String[]} args the command arguments
	 */
	execute(message, args) {

		const guildsNumber = message.client.guilds.cache.size;
		const channelsNumber = message.client.channels.cache.size;
		const members = message.client.users.cache.size;
		const pid = process.pid;
        const ping = Math.round(message.client.ws.ping);
        const avatar = message.client.user.avatarURL();
		const ram =
			Math.floor((process.memoryUsage().heapUsed / 1024 / 1024) * 100) /
			100;
		const adminid = process.env.ADMIN_ID;



		if (!message.author.id === adminid) {
			message.reply(
				new MessageEmbed().setDescription(
					'You are not allowed to use this command!😎'
				)
			);
			return;
		}

		const stats = new MessageEmbed({
			title: 'Annou stats',
			thumbnail: {
                url : avatar
            },
			fields: [
				{
					name: 'PID',
					value: pid,
					inline: true,
				},
				{
					name: 'RAM',
					value: `${ram}MB`,
					inline: true,
				},
				{
					name: 'Ping',
					value: `${ping}ms`,
					inline: true,
				},
				{
					name: 'Servers',
					value: guildsNumber,
					inline: true,
				},
				{
					name: 'Channels',
					value: channelsNumber,
					inline: true,
				},
				{
					name: 'Members',
					value: members,
					inline: true,
				},
			],
		});

		message.reply(stats);
	},
};
