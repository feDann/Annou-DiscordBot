const { VoiceState, Client } = require('discord.js');

module.exports = {
	name: 'inactivity',
	description: 'this command is autocalled when someone leaves a voice channel, if the voice channel is empty the bot will leave',
	/**
     * @param {Client}  bot the client
	 * @param {VoiceState} oldMember The old Member
	 * @param {VoiceState} newMember The new Member
	 */
	async execute(bot,oldMember, newMember) {
        if(oldMember.channel.members.size === 1){
            if(oldMember.channel.members.get(bot.user.id)){
                console.log(`Exiting the channel`);
                await oldMember.channel.leave();
            }
        }
        
    }
};
