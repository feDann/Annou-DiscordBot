const AudioOnJoin = require('../models/audioonjoin');
const ytdl = require('ytdl-core');


module.exports = {
    name: 'playsongonjoin',
    description: 'this command is autocalled when someone join a voice channel',
    async execute(oldMember, newMember) {

        const channelid = newMember.channelID;
        const userid = newMember.id;

        const song = await AudioOnJoin.findOne({
            "channelid": channelid,
            "userid": userid
        })

        if (song) {
            const connection = await newMember.channel.join();
            const dispatcher = connection.play(ytdl(song.url, { filter: 'audioonly' }), {seek:song.startTime ?song.startTime : '0'})            
            

            dispatcher.on('speaking',() => {
                if(dispatcher.streamTime > (10 * 1000)){
                    dispatcher.end();
                    return;
                }            
            })


    }
}
}