$(function(){
    renderButtons(searchArray);
})

var searchArray = ["Final Fantasy XV",
    "Xenoblade",
    "Zelda BOTW",
    "Tales of Vesperia",
    "Smash Bros Ultimate",
    "Hollow Knight"];

function renderButtons(searchArray){
    $("#buttonsArea").empty();
    for (var i = 0; i < searchArray.length; i++) {
        var bt = $("<button>");
        bt.addClass('searchButton');
        bt.attr("data-type", searchArray[i]);
        bt.text(searchArray[i]);
        $("#buttonsArea").append(bt);
    }
}

$(document).on('click','.searchButton',function(){
    $("#searches").empty();
    var type = $(this).data('type');
    var queryURL = "https://api.giphy.com/v1/gifs/search?q="+
    type+"&api_key=GPYSw9BVSg8RcJHJjX3JhjnBLQAN2iy4&limit=10";
    $.ajax({url: queryURL,
        method: "GET"})
    .done(function(response) {
        for (var j=0; j<response.data.length; j++) {
            var searchDiv = $('<div class="search-item">');
            var rating = response.data[j].rating;
            var p = $("<p>").text("Rating: " + rating);
            var animated = response.data[j].images.fixed_height.url;
            var still = response.data[j].images.fixed_height_still.url;
            var image = $('<img>');
            image.attr('src',still);
            image.attr('data-still',still);
            image.attr('data-animated',animated);
            image.attr('data-state','still');
            image.addClass('searchImage');
            searchDiv.append(p);
            searchDiv.append(image);
            $("#searches").prepend(searchDiv);
        }
    })
})

$(document).on('click','.searchImage',function(){
    var state = $(this).attr('data-state');
    if(state == 'still'){
        $(this).attr('src',$(this).data('animated'));
        $(this).attr('data-state','animated');
    } else {
        $(this).attr('src',$(this).data('still'));
        $(this).attr('data-state','still');
    }
})

$('#addTheme').on('click',function(){
    var newSearch = $('input').eq(0).val();
    searchArray.push(newSearch);
    renderButtons(searchArray,'searchButton','#buttonsArea');
    return false;
})