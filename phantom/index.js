phantom = require('phantom')

phantom.create(function(ph){
  ph.createPage(function(page) {
    page.set('viewportSize', {width:2480,height:3508 });
    page.open("file:///home/ionicabizau/Documents/nodeice/my-invoice.html", function(status) {
      page.render('google.pdf', function(){

        console.log('Page Rendered');
        ph.exit();

      });
    });
  });
});
