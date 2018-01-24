console.log("yo");
var handler = StripeCheckout.configure({
  key: 'pk_test_9xJpaUYQTlQcWriehGnKahzt',
  image: 'https://wilderness.org/sites/default/files/styles/slide/public/slide_images/northcascadesnationalpark-parish-rei.jpg?itok=_I-BLlim',
  locale: 'auto',
  token: function (token) {
    // You can access the token ID with `token.id`.
    // Get the token ID to your server-side code for use.
    // sends token to backend so payment can be made securely
    //if the response come back without errors then user is routed to
    //success page if err then
    console.log(token)
    $.post('/charge', token).then(function(res){
      console.log(res)
      
        if (res === "okay") {
          //route to succseful page
          console.log("yaya you got an order bro!!!!!!!!!");
        }
        else if (res.err) {
          alert('Ohh no! Somethings wrong with your info or payment please try again.')
        }
    })
  }
});
//fired off on an ng-click an initiate my stripe api payment form
$('#makePayment').on('click', function(){
  handler.open({
    name: 'Peer To Gear',
    email: 'jamesteerlink8@gmail.com',
    description: 'peertogear.com',
    amount: parseInt('52.13') * 100
  })
})


// Close Checkout on page navigation: and by clicking form x
window.addEventListener('popstate', function () {
  handler.close();
});
