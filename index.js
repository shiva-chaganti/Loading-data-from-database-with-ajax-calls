var mongoose = require('mongoose');
var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
//app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


console.log('Connected to MongoDb...');
mongoose.connect('mongodb://tej:chaganti@ds055564.mongolab.com:55564/heroku_8r4q6gwf');
var conn = mongoose.connection;

conn.on('error', function(err){

  console.log('Connection error', err);
});
conn.once('open', function(){

  //console.log('Connected...');
});
var Schema = mongoose.Schema;
var Players_100_schema = new Schema({Player_id : Number, Player_name : String, Firstname : String, Lastname : String, DOB : Number,
  Country : String, Height : Number, Club : String, Position : String, Caps : Number, Is_captain : String});

var Player = mongoose.model('Player', Players_100_schema,'Players');


app.get('/', function(req, res) {


    res.render('pages/index');
  });


app.get('/data', function(req, res) {

  Player.find().exec(function(err, player){

    if(err) throw err;
    res.end(JSON.stringify(player));
   // conn.close();

  });
});





