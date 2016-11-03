//Variables for lightbox effect
    var $overlay = $('<div id="overlay"></div>');
    var $card = $('<div id="card"></div>');
    var $image = $("<img>");
    var $caption = $("<span></span>");

    //A card to overlay
    $overlay.append($card);

    //An image to overlay
    $card.append($image);

    //A caption to overlay
    $card.append($caption);

    // Append overlay to body
    $("body").prepend($overlay);


//    	 When overlay is clicked
    	$overlay.click(function() {
    		//Hide/fade out overlay
    		$(this).fadeOut(500);
    	});
