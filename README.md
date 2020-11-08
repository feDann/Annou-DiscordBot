# Annou

Annou is a discord bot that plays an audio from youtube when you enter a voice channel

![](https://gph.is/g/Evp1rqw)

## How it works
>
Annou listen on VoiceStateUpdate event and whenever an user join a voice channel check in the database if there is a song for that user and if so, then Annou will play 10 seconds of it

## Set Up

Clone the repository from your window terminal with:

    git clone https://github.com/feDann/Annou-DiscordBot.git

Install all the dependencies with:

    npm install

Create a .env file with enviroment variables :

    TOKEN = Your Bot Token

    DBURL = Your mongodb url

Now type ```npm start``` and your bot should be up and running!



## Commands

#### use the following command while you are in a voice channel
- **!say [LANGUAGE CODE] [YOUR TEXT]** - Annou join your voice channel and say your text in the selected language
- **!alerton** - activate alert for mute action _ecc_ 
- **!alertoff** - deactivate alert for mute action _ecc_ 
- **!setsong [YOUTUBE_URL] [START_TIME: HH:MM:SS]** - when you join the current voice channel Annou will play the chosen song for 10 seconds. ([START_TIME] argument is optional)
- **!deletesong** - delete your song on join for the current voice channel
- **!stop** - stop the playing song
- **!leave** - Annou leaves your voice channel
#### alternative commands:
-  **!setcsong [VOICE_CHANNEL_NAME] [YOUTUBE_URL] [START_TIME]** - same as **!setsong**, you can use this command even if you are not in a voice channel.Please while using this command replace all the spaces in the channel name with '_'
