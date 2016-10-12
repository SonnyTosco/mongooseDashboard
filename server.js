var   express     = require('express'),
      bodyParser  = require('body-parser'),
      path        = require('path'),
      io          = require('socket.io'),
      mongoose    = require('mongoose')
      app         = express();

app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));

//Routes

app.get('/', function(req, res) {
  //query to display all species
  res.render('index');
})

app.get('/species/:id', function(req, res) {
  //query to show that particular mongoose
  res.render('show');
})

app.get('/species/new', function(req, res) {
  //want to make sure that the create view is hit
  res.render('create');
})

app.post('/species', function(req, res) {
  //query to insert a new instance of mongoose into the db
  res.redirect('/');
})

app.get('/species/:id/edit', function(req, res){
  //query that specific mongoose that exists in the db
  res.render('edit');
})

app.post('/species/:id', function(req, res){
  //query that stores the updated information for that instance
  res.redirect('/');
})

app.post('/species/:id/destroy', function(req, res){
  //query that removes that specific document
  res.redirect('/')
})

//Mongoose
mongoose.connect('mongodb://localhost/dashboard');

var AnimalSchema = new mongoose.Schema({
  Animal: {type: String}
}, {timestamps: true})

mongoose.model('Animal', AnimalSchema);

var Animal = mongoose.model('Animal');

app.listen(8000, function() {
  console.log("listening on port 8000");
})
