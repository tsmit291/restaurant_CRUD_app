var express = require('express');
var router = express.Router();

var knex = require('knex')({
  client: 'pg',
  connection: 'postgres://localhost/restaurants'
});

var join_stuff = function(arg1, arg2){

}

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
/* Gets the restaurants on the admin page */
router.get('/admin', function(req, res, next) {
  var allRows;
  var tableyEmployees =
  knex.select().table('restaurantinfo').then(function (rows){
    allRows = rows;
    res.render('restaurants/admin', {obj: allRows });
  });

/* Gets the employee first name and last name under each restaurant */
knex('restaurantinfo')
.join('employees', 'restaurantinfo.id', '=', 'employees.restaurantinfo_id')
.select('employees.firstname', 'employees.lastname')
.then(function(employee){
  console.log(employee)

});
});

router.get('/new', function(req, res, next){
  var allRows;
  var tabley = knex.select().table('restaurantinfo').then(function (rows){
    allRows = rows;
    res.render('restaurants/new', { obj: allRows , employees: employee});
  });
});
//* new restaurant * //
router.post('/', function(req, res, next){
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
    res.redirect('/');
  });
  });

router.get('/:id', function (req, res, next){
  restaurantinfo().where('id', req.params.id).first().then(function(result){
    res.render('restaurants/show', {restaurantNew: result});
  });
});

router.get('/:id/edit', function (req, res, next){
  restaurantinfo().where('id', req.params.id).first()
  .then(function(result){
    res.render('restaurants/edit', {restaurantNew: result});
  });
});

router.post('/:id/delete', function (req, res, next){
  restaurantinfo().where('id', req.params.id).del()
  .then(function (result){
    res.redirect('/');
  })
})

module.exports = router;
