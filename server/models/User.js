const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    name:{type:String, required:true},
    surname:{type:String, required:true},
    middleName:{type:String},
    email:{type: String, required: true, unique:true},
    password:{type:String, required:true},
    isTeacher:{type:Boolean, required:true},
    group:{type:String},
    teams:[{type:Types.ObjectId, ref:'Team'}]
})

module.exports = model('User', schema)