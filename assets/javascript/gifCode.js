/* 
  Gif API (giphy)  -  a page that interacts with it, displaying a set of buttons to extract gifs on click, and 
  add new buttons if user requests it. The light-hearted initial theme is dancing, but user can enter any
  word for more gifs.

Homework Assignment  6 - html, css, javascript, jquery api 
              
Al Curry  February 26, 2018

GWU full stack development program  

this module  called by index.html

 */

 // list of initial buttons to be displayed across the top of the screen
topics = ["Samba", "Mambo", "Disco", "Pogo", "New Wave", "Tango", "Cha Cha Cha", "Polka", "Breakdance", "Merengue", "Moonwalk", "Ballroom Dancing", "Charleston", "Ballet", "Tap Dancing"];

// Rainbow colors :  red, orange, yellow, green, blue, purple - buttons will have these background colors
colors = ["#E70000", "#FF8C00", "#FFEF00", "#00811F", "#0044FF", "#760089"];

// display each button in the topics array
for (var i = 0; i < topics.length; i++) {
    // var but = $("<button>").text(topics[i]);
    var colorIdx = i > 5 ? i % 6 : i;
    displayButton(topics[i], colorIdx);
}

// function to display a button
function displayButton(subject, cIndex) {
    var but = $("<button>").text(subject);
    but.attr("class", "btnStyle btnSelect");
    but.attr("data-topic", subject);
    but.css("background-color", colors[cIndex]);
    $("#button-list").append(but);
}

// if user enters and submits a new button, add it to the display
$("#submit").on("click", function () {
    event.preventDefault();
    
    var nextButton = $("#nextButton").val();
    if (nextButton != "") {
        colorIdx++;
         colorIdx = colorIdx > 5 ? colorIdx % 6 : colorIdx;
        displayButton(nextButton, colorIdx);
         $("#nextButton").val("");
    }    
});

// when a button is clicked, call ajax with the url using that button's data-topic as the query word
// the promise displays the gifs, with sitll and animated versions, and an initial data-state of "still"
$(document).on("click", ".btnSelect", function () {
    event.preventDefault();
    var subject = $(this).attr("data-topic");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        subject + "&api_key=dc6zaTOxFJmzC&limit=10";
    console.log("btn click " + subject);
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        console.log(response);

        var results = response.data;

        for (var i = 0; i < results.length; i++) {

            var gifDiv = $("<div class='item'>");
            var p = $("<p>").text("Rating: " + results[i].rating);

            var stillImage = $("<img>");

            stillImage.attr("src", results[i].images.fixed_height_still.url);
            stillImage.attr("data-still", results[i].images.fixed_height_still.url);
            stillImage.attr("data-animate", results[i].images.fixed_height.url);
            stillImage.attr("data-state", "still");
            stillImage.attr("class", "gif");
            var rating = results[i].rating;

            gifDiv.append(p);
            gifDiv.append(stillImage);

            $("#gif-display").prepend(gifDiv);
        }
    });
});

// when a gif is clicked, toggle the displayed state from still to animated, or reverse
//$(".gif").on("click", function () {
$(document).on("click", ".gif", function () {
    event.preventDefault();
    var state = $(this).attr("data-state");
    if (state === "still") {
        var da = $(this).attr("data-animate");
        $(this).attr("src", da);
        $(this).attr("data-state", "animate");
    }
    if (state === "animate") {
        var ds = $(this).attr("data-still");
        $(this).attr("src", ds);
        $(this).attr("data-state", "still");
    }
});

// some fun animations for the page headers (h1 & h2), executes on page load and when the "Clear Gifs.." button is clicked
var animationend = 'animationend oAnimationEnd mozAnimationEnd webkitAnimationEnd MSanimationEnd';

$(document).on("click", ".btnClear", function () {
    $("#gif-display").empty();
   headerSwing();
});

 $(window).on("load", function () {
    headerSwing();
}); 

function headerSwing() {
    $("#hdr1,#hdr2").addClass("animated swing").one(animationend, function () {
        $(this).removeClass("animated swing");
    });
}
