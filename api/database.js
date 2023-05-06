var mongoose = require('mongoose');
mongoose.connect('mongodb+srv://zen:RRqQveYMsiMRzgIR@eeppc.xm9nfsr.mongodb.net/test', {
  useNewUrlParser: true
});

var dbase = mongoose.connection;
dbase.on('connected', function() {
    console.log('database is connected successfully');
});

dbase.on('disconnected',function(){
    console.log('database is disconnected successfully');
})

dbase.on('error', console.error.bind(console, 'connection error:'));
module.exports = dbase;