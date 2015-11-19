setTimeout(function () {
    document.querySelector("#container").innerHTML = "Hello Jasmine";
}, 1000);

document.title = "Testing Jasmine";

window.onload = function () {

    var btnEl = document.querySelector(".click-me")
      , resEl = document.querySelector(".result")
      ;

    btnEl.addEventListener("click", function () {
        resEl.innerHTML = "You clicked!";
    });
};
