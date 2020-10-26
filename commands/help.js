module.exports = {
    name : 'help',
    description : 'Show the list of all commands',
    async execute(message, args){
        
        const helpmessage = "use the following command while you are in a voice  channel\n\n**!alerton** - activate alert for mute action *ecc* \n\n**!alertoff** - deactivate alert for mute action *ecc* \n\n**!setjoinsong [YOUTUBE_URL]** - when you join the current voice channel Annou  will play the chosen song for 10 seconds\n\n**!stop** - stop the playing song\n\n**!leave** - Annou leaves your voice channel";

        message.reply(helpmessage);
    }
}