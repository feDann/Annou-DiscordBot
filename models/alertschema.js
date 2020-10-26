const mongoose = require('mongoose')

const alertSchema = mongoose.Schema({
    _id : {
        type: mongoose.Schema.Types.ObjectId,
        index: true,
        required: true,
        auto: true,
      },
    channelid : String,
    alert : Boolean, 

});

module.exports = mongoose.model('AlertSchema', alertSchema);