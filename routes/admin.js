var express = require('express');
var router = express.Router();

var knex = require('knex')({
  client: 'pg',
  connection: 'postgres://localhost/restaurants'
});

function restaurantinfo(){
  return knex('restaurantinfo');
};
/* hooks up my restaurantinfo table*/

function employees(){
  return knex('employees')
};
/* hooks up my employees table*/
