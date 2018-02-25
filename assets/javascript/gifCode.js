topics = ["Samba", "Mambo", "Disco", "Pogo", "New Wave", "Tango", "Cha Cha Cha", "Polka", "Breakdance", "Merengue", "Moonwalk","Ballroom Dancing","Charleston", "Ballet", "Tap Dancing"];

// Rainbow colors :  red, orange, yellow, green, blue, purple
colors = ["#E70000", "#FF8C00", "#FFEF00", "#00811F", "#0044FF", "#760089"];
for (var i = 0; i < topics.length; i++) {
    // var but = $("<button>").text(topics[i]);
    var colorIdx = i > 5 ? i % 6 : i;
    displayButton(topics[i], colorIdx);
}

function displayButton(subject, cIndex) {
    var but = $("<button>").text(subject);
    but.attr("class", "btnStyle btnSelect");
    but.attr("data-topic", subject);
    but.css("background-color", colors[cIndex]);
    $("#button-list").append(but);
}

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
