var express = require('express');
var router = express.Router();

function restaurantinfo(){
  return knex('restaurantinfo');
};

function reviews(){
  return knex('reviews')
};
/* hooks up my reviews table */


/* GET home page. */
router.get('/restaurants', function(req, res, next) {
  var allRows;
  var tabley = knex.select().table('restaurantinfo').then(function (rows){
    allRows = rows;
    res.render('restaurants/index', { obj: allRows });
  });
});

/* Gets the restaurants on the admin homepage, remember everything after this will be admin/new or admin/edit or admin/delete */
router.get('restaurants/admin', function(req, res, next) {
  var allRows;
  var tableyEmployees =
  knex.select().table('restaurantinfo').then(function (rows){
    allRows = rows;
    res.render('restaurants/admin', {obj: allRows });
  });
});

 /*Gets the employee first name and last name under each restaurant */
 router.get('restaurants/:id/edit', function(req, res, next){
   my_id = req.params.id;
  Restaurants().where({id: my_id}).then(function(payload){
   Employees().where({restaurant_id: my_id}).then(function(payload2){
    res.render('restaurants/edit', {payload: payload[0], payload})
  });
});
});

/* Gets a new restaurant add */
router.get('restaurants/new', function(req, res, next){
  var allRows;
  var tabley = knex.select().table('restaurantinfo').then(function (rows){
    allRows = rows;
    res.render('restaurants/new', { obj: allRows , employees: employee});
  });
});

/* new restaurant post- redirects to home page */
router.post('restaurants/', function(req, res, next){
  var restaurantNew = {
    name: req.body.restaurantName,
    city: req.body.city,
    state: req.body.state,
    cuisine: req.body.cuisine,
    rating: req.body.rating,
    bio: req.body.textdescription,
    image: req.body.imageUrl
  };
  restaurantinfo().insert(restaurantNew).then(function(result){
    res.redirect('/restaurants');
  });
});

/* click on one specific restaurant */
router.get('restaurants/:id', function (req, res, next){
  restaurantinfo().where('id', req.params.id).first().then(function(result){
    res.render('restaurants/show', {restaurantNew: result});
  });
});

/* edit on one specific restaurant */
router.get('restaurants/:id/edit', function (req, res, next){
  restaurantinfo().where('id', req.params.id).first()
  .then(function(result){
    res.render('restaurants/edit', {restaurantNew: result});
  });
});

/* delete one specific restaurant */
router.post('restaurants/:id/delete', function (req, res, next){
  restaurantinfo().where('id', req.params.id).del()
  .then(function (result){
    res.redirect('/');
  });
});

module.exports = router;
