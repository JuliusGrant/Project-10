// Search functions
$(document).ready(function () {
  $('form').submit(function (evt) {
    evt.preventDefault();
    var $searchField = $('#search');
    var $submitButton = $('#submit');

    $searchField.prop("disabled", true);
    $submitButton.attr("disabled", true).val("Searching...");

    //AJAX Call - Flickr
    var flickrAPI = "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";
    var term = $searchField.val();
    var flickrOptions = {
        tags: term,
        format: "json"
    };

    //Add ul for photo gallery
    function displayPhotos(data) {
        var photoHTML = '<ul>';
        $.each(data.items, function (i, photo){
           photoHTML += '<li class="grid-25 tablet-grid-50 image">';
           photoHTML += '<img src="' + photo.media.m + '" >';
           photoHTML += '<p class="hidden">' + photo.title + '</p>';
          //  photoHTML += '<p class="hidden">' + '<a href="' + photo.link + '">Link to Original</a>' + '</p>';
           photoHTML += '<p class="hidden">' + photo.author + '</p></li>';
        });
        photoHTML += '</ul>';
        $('#photos').html(photoHTML);

        $searchField.prop("disabled", false);
        $submitButton.attr("disabled", false).val("Search");
    }

    $.getJSON(flickrAPI, flickrOptions, displayPhotos);


    //Show flickr info on overlay
      function showPhoto(item) {
        var item = $(item);

        var displayPhoto = item.children("img").attr("src");
        $('#overlay img').attr("src", displayPhoto);

        var displayTitle = item.children("p").eq(0).text();

        var displayAuthor = item.children("p").eq(1).text();

        var displayLink = item.children("p").eq(1).text();

        $('#overlay span').html("<p>" + "Description: " + displayTitle + "</p>" + "<p>" + "Author: " + displayAuthor + "</p>");


	        //Fade in the overlay
	        $overlay.fadeIn(500);
      }

      // Add photo data to overlay when clicked
		$("#photos").on("click", "li", function(item) {
	       var item_to_show = $(this);
	       showPhoto(item_to_show);
		});

            //Get caption
            var captionText = $(this).children("img").attr("alt");
            $caption.text(captionText);


        });
      });
