const googleTTS = require('google-tts-api');

async function tts(text, lang, speed) {
	var numberOfTryes = 10;
	while (numberOfTryes != 0) {
		try {
			const url = googleTTS.getAudioUrl(text, { "lang": lang });
			return url;
		} catch (err) {
			numberOfTryes -= 1;
		}
	}
	throw new Error('key get fail from google');
}

module.exports = tts;
