var express = require('express');
var router = express.Router();
var rest = "this is really cool";

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
  var tabley = knex.select().table('restaurantinfo').then(function (rows) {
    allRows = rows;
    res.render('restaurants/index', { obj: allRows });
  });
  console.log(allRows);
  console.log("****************");
});

module.exports = router;
