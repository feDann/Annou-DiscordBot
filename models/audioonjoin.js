const mongoose = require('mongoose')

const audioOnJoinSchema = mongoose.Schema({
    _id : {
        type: mongoose.Schema.Types.ObjectId,
        index: true,
        required: true,
        auto: true,
      },
    userid : String,
    channelid : String,
    url : String, 

});

module.exports = mongoose.model('AudioOnJoinSchema', audioOnJoinSchema);