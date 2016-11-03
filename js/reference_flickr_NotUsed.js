$(document).ready(function () {
  $('form').submit(function (evt) {
    evt.preventDefault();
    var $searchField = $('#search');
    var $submitButton = $('#submit');

    $searchField.prop("disabled", true);
    $submitButton.attr("disabled", true).val("Searching...");

    var flickrAPI = "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";
    var term = $searchField.val();
    var flickrOptions = {
      tags: term,
      format: "json"
    };
    function displayPhotos(data) {
      var photoHTML = '<ul>';
      $.each( data.items, function (i, photo) {
        photoHTML += '<li class="grid-25 tablet-grid-50">';
        photoHTML += '<a href="' + photo.link + '" class="image">';
        photoHTML += '<img src="' + photo.media.m + '"></a></li>';
      });
      photoHTML += '</ul>';
      $('#photos').html(photoHTML);

      $searchField.prop("disabled", false);
      $submitButton.attr("disabled", false).val("Search");
    }
    $.getJSON(flickrAPI, flickrOptions, displayPhotos);

    //Variables for lightbox effect
    var $overlay = $('<div id="overlay"></div>');
    var $image = $("<img>");
    var $caption = $("<p></p>");

    //An image to overlay
    $overlay.append($image);

    //A caption to overlay
    $overlay.append($caption);

    //Add overlay
    $("body").append($overlay);

    //Capture the click event on a link to an image
    $("#photos").click(function(event){
      event.preventDefault();
      var imageLocation = $(this).attr("href");
      //Update overlay with the image linked in the link
      $image.attr("src", imageLocation);

      //Show the overlay.
      $overlay.show();

      //Get child's title attribute and set caption
      var captionText = $(this).children("img").attr("alt");
      $caption.text(captionText);
    });

    //When overlay is clicked
    $overlay.click(function(){
      //Hide the overlay
      $overlay.hide();
    });
  });

});
