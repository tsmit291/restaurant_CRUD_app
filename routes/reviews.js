var express = require('express');
var router = express.Router();
var knex = require('../db/knex');

function reviews(){
  return knex('reviews')
};

/* get the reviews per restaurant to show up*/
router.get('/restaurants/:id', function (req, res, next){
  var allRows;
  var reviewTable = knex.select().table('reviews').then(function(rows){
    allRows = rows;
    res.render('restaurants/show', {obj: allRows});
});
  var getReviews = {
    date: req.body.date,
    reviewer: req.body.reviewer,
    description: req.body.description,
    review_rating: req.body.review_rating,
  };
  restaurantinfo().insert(restaurantNew).then(function(result){
    res.redirect('/restaurants');
  });
});

module.exports = router;
