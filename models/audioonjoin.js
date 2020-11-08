const mongoose = require('mongoose')

const audioOnJoinSchema = mongoose.Schema({
    _id : {
        type: mongoose.Schema.Types.ObjectId,
        auto: true,
      },
    userid : String,
    channelid : String,
    guildid : String,
    startTime : String,
    url : String, 

});

module.exports = mongoose.model('AudioOnJoinSchema', audioOnJoinSchema);