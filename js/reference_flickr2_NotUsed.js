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

    $('#photos').click(function(event){
      event.preventDefault();
      var ph = $(this).attr('photoHTML');
      console.log(ph);
    });
  });

});
