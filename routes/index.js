var express = require('express');
var router = express.Router();

var knex = require('knex')({
  client: 'pg',
  connection: 'postgres://localhost/restaurants'
});

function restaurantinfo(){
  return knex('restaurantinfo');
};

/* GET home page. */
router.get('/', function(req, res, next) {
  var allRows;
  var tabley = knex.select().table('restaurantinfo').then(function (rows){
    allRows = rows;
    res.render('restaurants/index', { obj: allRows });
  });
});

router.get('/new', function(req, res, next){
  var allRows;
  var tabley = knex.select().table('restaurantinfo').then(function (rows){
    allRows = rows;
    res.render('restaurants/new', { obj: allRows });
  });
});

router.post('/restaurants', function(req, res, next){
  console.log(req.body)
  var restaurantNew = {
    name: req.body.restaurantName,
    city: req.body.city,
    state: req.body.state,
    cuisine: req.body.cuisine,
    rating: req.body.rating,
    bio: req.body.textdescription,
    image: req.body.imageUrl
  };
  console.log("*************")
  console.log(restaurantNew)
  restaurantinfo().insert(restaurantNew).then(function(result){
    res.redirect('/');
  });
  });


module.exports = router;
