const mongoose = require('mongoose')

const audioOnJoinSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    userid : String,
    channelid : String,
    url : String, 

});

module.exports = mongoose.model('AudioOnJoinSchema', audioOnJoinSchema);