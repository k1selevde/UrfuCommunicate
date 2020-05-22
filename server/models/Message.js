const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    text:{type:String, required:true},
    time:{type:Date, required:true}
})

module.exports = model('Message', schema)