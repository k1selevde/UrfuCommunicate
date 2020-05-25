const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    name:{type:String, required:true, unique: true},
    subject:{type:String},
    teacher:{type:String, required:true},
    students:[{type: Types.ObjectId, ref: 'Team'}],
    messages:[{type:Types.ObjectId, ref: 'Message'}],
    description:{type:String}
})

module.exports = model('Team', schema)