const tts = require('../utils/tts');

module.exports = {
    name: 'mutedalert',
    description: 'this command is autocalled when someone mute himself',
    async execute(oldMember, newMember) {
        try {
            const username = newMember.member.displayName;
            const connection = await newMember.channel.join();
            const url = await tts(`${username} muted`, 'en', 1);
            const dispatcher = connection.play(url);
        } catch (err) {
            console.log(`ERROR: ${err.message}`)
        }




    }
}