var Remote = require('remote')
  , Run = Remote.require("./run")
  , Api = Remote.require("./api")
  ;

$(window).load(function() {
  var buttonCircles = $(".nav-circle");

  $(".btn-nav").on("tap click", function() {
    $(this).toggleClass("closed-nav")
    if ($(this).hasClass("closed-nav")) {
      slideDown();
    } else {
      slideUp()
    }
  });

  $(".round-circle").click(function() {

    var $this = $(this)
      , app = $this.attr('data-app')
      , url = $this.attr('data-url')
      ;

    Run({ app: app, url: url });

    $(".btn-nav").toggleClass("closed-nav");
    slideUp();
  })

  function slideDown() {

    var topMargin = 20
    for (i = 0; i < buttonCircles.length; i++) {
      topMargin += 85
      $(buttonCircles[i]).animate({
        top: topMargin
      }, 200, function() {
        $(".circle-container, .round-circle").css("visibility", "visible");
        if ($(".fa-plus").hasClass("unRotateIcon")) {
          $(".fa-plus").removeClass("unRotateIcon").addClass("rotateIcon");
        } else {
          $(".fa-plus").addClass("rotateIcon");
        }

      })
    }
  }

  function slideUp() {

    var resetTop = 20
    for (i = 0; i < buttonCircles.length; i++) {
      $(buttonCircles[i]).animate({
        top: resetTop
      }, 200, function() {
        $(".circle-container, .round-circle").css("visibility", "hidden");
        if ($(".fa-plus").hasClass("rotateIcon")) {
          $(".fa-plus").removeClass("rotateIcon").addClass("unRotateIcon");
        } else {
          $(".fa-plus").addClass("unRotateIcon");
        }
      })
    }
  }
});

window.fnShow = function (fn) {
    $("html").hide().fadeIn(fn);
};

$(document).on("mouseleave", function () {
//    $("html").fadeOut(function () {
        Api.hide();
 //   });
});
