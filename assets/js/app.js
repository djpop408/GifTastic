/* GifTastic Homework Assignment */

var movieArray = ['Anchorman', 'Frozen', 'Scarface', 'Kill Bill', 'Ace Ventura', 'The Matrix', 'Zoolander'];

//generate buttons from array
function renderButtons() {
    $('#movie-buttons').empty();
    for (let i = 0; i < movieArray.length; i++) {    
        var buttons = $('<button>');
            buttons.addClass('movie');
            buttons.attr('data-name', movieArray[i]);
            buttons.text(movieArray[i]);
            $('#movie-buttons').append(buttons);
    }
};

//generate images from giphy api call
function renderImages() {
    $('#movies').empty();
    var currentMovie = $(this).attr("data-name");
    var xhr = $.get("https://api.giphy.com/v1/gifs/search?q=" + currentMovie + "&api_key=uZR0wAh2EOGMGLWYIv1LW87ZumFFgiYI&limit=10");
    xhr.done(function(data) { 
        console.log("success got data", data);
        for (let i = 0; i < data.data.length; i++) {
            var searchDiv = $('<div class= "card" id= "search-item">');
            var rating = data.data[i].rating;
            var p = $('<p>').text('Rating: ' + rating);

            //variable for still
            var imageUrl = data.data[i].images.fixed_height_still.url;
            //variable for animated
            var imageUrlAnim = data.data[i].images.fixed_height.url;
            console.log(imageUrl);

            var images = $('<img>');
                images.addClass('images')
                images.attr('src', imageUrl);
                images.attr('data-still', imageUrl);
                images.attr('data-animated', imageUrlAnim);
                images.attr('data-state', 'still');

            //appends
            searchDiv.append(p);
            searchDiv.prepend(images);
            $('#movies').append(searchDiv);
        }
    });
};

//click action to add another button to array
$('#add-movie').on('click', function(){
    event.preventDefault();
    var movieValue = $('#movie-input').val().trim();
    movieArray.push(movieValue);
    renderButtons();
});

//click action for image animation
$(document).on('click', '.images', function () {
    var state = $(this).attr('data-state');
    if (state == 'still') {
        $(this).attr('src', $(this).data('animated'));
        $(this).attr('data-state', 'animated');
    } else {
        $(this).attr('src', $(this).data('still'));
        $(this).attr('data-state', 'still');
    }
})

//click action to render images
$(document).on("click", ".movie", renderImages);

//render buttons on page load
renderButtons();



    