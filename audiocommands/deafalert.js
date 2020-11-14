const tts = require('../utils/tts');

module.exports = {
    name: 'deafalert',
    description: 'this command is autocalled when someone deaf himself',
    async execute(oldMember, newMember) {
        try {
            const username = newMember.member.displayName;
            const connection = await newMember.channel.join();
            await connection.voice.setDeaf(true);
            const url = await tts(`${username} now is deaf`, 'en', 1);
            const dispatcher = connection.play(url);
        } catch (err) {
            console.log(`ERROR: ${err.message}`)
        }


    }
}