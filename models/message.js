
const mongoose = require('mongoose');


const messageSchema = mongoose.Schema({
  
    Name : {type:String, required: false, },
    Email : {type:String, required: true},
    Description : {type:String, required: false, },
    Interest : {type:String, required: false, },
    Inquiry : {type:String, required: false, },

});

module.exports = mongoose.model('Message', messageSchema);