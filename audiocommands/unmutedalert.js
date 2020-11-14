const tts = require('../utils/tts');

module.exports = {
    name: 'unmutedalert',
    description: 'this command is autocalled when someone unmute himself',
    async execute(oldMember, newMember) {
        try {
            const username = newMember.member.displayName;
            const connection = await newMember.channel.join();
            connection.voice.setDeaf(true);
            const url = await tts(`${username} unmuted`, 'en', 1);
            const dispatcher = connection.play(url);
        } catch (err) {
            console.log(`ERROR: ${err.message}`)
        }


    }
}