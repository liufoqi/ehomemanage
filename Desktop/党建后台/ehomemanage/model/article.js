const mongoose =require('mongoose')
const article = new mongoose.Schema({
  title:String,
  content:String,
  contentText:String,
  img:String,
  contentText:String,
  author:{
      type:mongoose.SchemaTypes.ObjectId,
      ref:'admin_user'
  },
  type:{
     type:mongoose.SchemaTypes.ObjectId,
     ref:'category'
},
  look_num:{
    type:Number,
    default:0
},
},{versionKey:false,timestamps:{createdAt:'create_time',updatedAt:'update_time'}})

module.exports =mongoose.model('article',article)