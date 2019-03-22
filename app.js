$(document).ready(function () {
    var topics = ["pizza", "burger", "fries", "taco", "noodles", "sushi", "steak", "soup"];

    function starterTopics() {
        $("#topic-buttons").empty();

        for (var i = 0; i < topics.length; i++) {
            var b = $("<button>");
            b.addClass("btn btn-primary");
            b.addClass("startingItem");
            b.attr("data-item", topics[i]);
            b.text(topics[i]);
            $("#topic-buttons").append(b);
        };
    };
    starterTopics();

    $(document).on("click", ".startingItem", function () {
        
        $("#gifs-container").empty();

        var item = $(this).attr("data-item");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + item + "&api_key=dc6zaTOxFJmzC&limit=10";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
           
            var gifs = response.data;
            
            for (var i = 0; i < gifs.length; i++) {
                var itemDiv = $("<div>");
                var rating = gifs[i].rating;

                var p = $("<p>").text("Rating: " + rating);

                var animate = gifs[i].images.fixed_height.url;
                var still = gifs[i].images.fixed_height_still.url;

                var itemImage = $("<img>");
                itemImage.attr("src", still);
                itemImage.attr("data-still", still);
                itemImage.attr("data-animate", animate);
                itemImage.attr("data-state", "still");
                itemImage.addClass("item-image");

                itemDiv.append(p);
                itemDiv.append(itemImage);
                $("#gifs-container").append(itemDiv);
            };
        });
    });

    $(document).on("click", ".item-image", function() {

        var state = $(this).attr("data-state");

        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    });

    $("#searchbutton").on("click", function(event) {
        event.preventDefault();
        var newFood = $("input").val();
        
        topics.push(newFood);

        starterTopics();
    })
});