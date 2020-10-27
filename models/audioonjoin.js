const mongoose = require('mongoose')

const audioOnJoinSchema = mongoose.Schema({
    _id : {
        type: mongoose.Schema.Types.ObjectId,
        auto: true,
      },
    userid : String,
    channelid : String,
    url : String, 

});

module.exports = mongoose.model('AudioOnJoinSchema', audioOnJoinSchema);