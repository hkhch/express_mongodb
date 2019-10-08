// [ LOAD PACKAGES ]
let express     = require('express');
let app         = express();
let bodyParser  = require('body-parser');
let mongoose    = require('mongoose');

// [ CONFIGURE APP TO USE bodyParser ]
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// [ CONFIGURE SERVER PORT ]
let port = process.env.PORT || 8080;

// [ CONFIGURE mongoose ]
let db = mongoose.connection;
db.on('error', console.error);
db.once('open', function(){
    // CONNECTED TO MONGODB SERVER
    console.log('Connected to mongod server');
});
// 'mongodb://username:password@host:port/database?options...'
mongoose.connect('mongodb://localhost/mongodb_tutorial')

// DEFINE MODEL
let Book = require('./models/book');

// [ CONFIGURE ROUTER ]
let router = require('./routes')(app, Book);

// [RUN SERVER]
let server = app.listen(port, function(){
    console.log("Express server has started on port " + port)
});