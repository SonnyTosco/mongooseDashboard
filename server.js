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
  Animal.find({}, function(err, animals) {
    if(err) {
      console.log('something went wrong');
    } else {
        console.log(animals);
        res.render('index', {animals: animals});
    }
  })
})

app.get('/species/new', function(req, res) {
  res.render('create');
})

app.post('/species', function(req, res) {
  var animal = new Animal({
    Animal: req.body.Animal
  });
  animal.save(function(err) {
    if(err) {
      console.log('something went wrong');
    } else {
      console.log('successfully added animal');
      res.redirect('/');
    }
  })
})

app.get('/species/:id', function(req, res) {
  Animal.find({}, function(err, animals) {
    res.render('show');
  })
})

app.get('/species/:id/edit', function(req, res){
  Animal.update({}, function(err, animals) {
    if(err) {
      console.log('something went wrong');
    } else {
      console.log(animals);
      res.render('edit', {animals: animals});
    }
  })
  //query that specific mongoose that exists in the db
  //ask Phil if it's because you haven't updated it here yet
  //also ask how the id has to be passed here
})

app.post('/species/:id', function(req, res){
  //query that stores the updated information for that instance
  res.redirect('/');
})

app.post('/species/:id/destroy', function(req, res){
  Animal.remove({}, function(err, animals) {
    if(err) {
      console.log('something went wrong');
    } else {
      res.redirect('/')
    }
  })
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
