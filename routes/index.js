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

// router.post('/restaurants', function(req, res, next){
//   allRows = rows;
//   restaurants().insert(restaurant).then(function(result){
//     res.redirect('/restaurants');
//   });
// });

module.exports = router;
