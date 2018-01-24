var db = require("../models");
// const config = require('../config');
// console.log(process.env)
var stripe = require('stripe')('sk_test_NLLE4K0HCpmEEDuav3E4PrLa');

module.exports = function(app) {
  app.post('/charge', function(req, res, next) {
    // console.log('this is req.body stripe stuf n things', req.body.token.email);
    // console.log('this is req.body session cart n things', req.session);
    console.log(req.body)
    var token = req.body.id
    var email = req.body.email
    var cart = [{
      quantity: 1,
      price: 52.13
    }]

    var total = 0;

    for (var i = 0; i < cart.length; i++) {
      cart[i].total = cart[i].quantity * cart[i].price;
      total += cart[i].total;
    }

    console.log(total);
    var charge = stripe.charges.create({ //this creats a charge
      amount: total * 100, //amount key uses amount in cents, total has no decimals so we *100 to get proper amount
      currency: "usd", //currency excepted
      description: "Example charge",
      source: token, //token generated by stripe is assined to payment
      receipt_email: email //this sends email with order info
    }, function (err, charge) {
      if (err) {
        res.json(err)
        // console.log(err);
      } else {
        //this gives us a fresh slate
        // req.session.order = [] //if charge then we clear session.order
        // req.session.cart = []; //if charge then we clear session.cart
        // console.log("cool beans");
        var cool = "okay"
        res.json(cool) //testing in front end for this string to change view
      }
      // asynchronously called
    });
  })
  
}
