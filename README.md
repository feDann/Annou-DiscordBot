# Annou

Annou is a discord bot that allows you to select a YouTube video as your entrance announcement for a voice channel

<p align="center">
  <img src="https://media.giphy.com/media/EC5faZdqV4Vw4byEMz/giphy.gif"/>
</p>

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
- **an:say [LANGUAGE CODE] [YOUR TEXT]** - Annou join your voice channel and say your text in the selected language
- **an:alerton** - activate alert for mute action _ecc_ 
- **an:alertoff** - deactivate alert for mute action _ecc_ 
- **an:setsong [YOUTUBE_URL] [START_TIME: HH:MM:SS]** - when you join the current voice channel Annou will play the chosen song for 10 seconds. ([START_TIME] argument is optional)
- **an:deletesong** - delete your song on join for the current voice channel
- **an:stop** - stop the playing song
- **an:leave** - Annou leaves your voice channel
#### alternative commands:
-  **an:setcsong [VOICE_CHANNEL_NAME] [YOUTUBE_URL] [START_TIME]** - same as **an:setsong**, you can use this command even if you are not in a voice channel.Please while using this command replace all the spaces of the channel name with '_'
