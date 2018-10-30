const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/myehome', { useNewUrlParser: true },
function(err) {
    if(err){

    console.log('Connection Error:' + err)

}else{

    console.log('Connection success!') }

});
const db = mongoose.connection;
db.on('error',console.error.bind(console, 'connection error:'));
db.once('open',function () {
  console.log('connect is once!')
});
module.exports= db;

