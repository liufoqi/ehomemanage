const mongoose = require('mongoose')
const category = new mongoose.Schema({
    title:String,
    icon:String
},{versionKey:false,timestamps:{createAt:'create_time',updateAt:'update_time'}}
)
module.exports = mongoose.model('category',category)