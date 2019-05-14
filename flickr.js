$(document).ready(function() {
  $("form").submit(function(evt) {
    evt.preventDefault();
    var $searchField = $("#search");
    var $submitButton = $("#submit");

    $searchField.prop("disabled", true);
    $submitButton.attr("disabled", true).val("searching...");

    //ajax
    var flickerAPI =
      "https://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";
    var animal = $searchField.val();
    var flickrOptions = {
      tags: animal,
      format: "json"
    };
    function displayPhotos(data) {
      //check to see if the search returns any results
      if ($.isEmptyObject(data.items) === false) {
        var photoHTML = "<ul>";
        //loop
        //array, index, item
        $.each(data.items, function(i, photo) {
          photoHTML += '<li class="grid-25 table-grid-50">';
          photoHTML += '<a href="' + photo.link + ' " class="image">';
          photoHTML += '<img src="' + photo.media.m + '"></a></li>';
        }); //end each
        photoHTML += "</ul>";
        $("#photos").html(photoHTML);
        // $searchField.prop("disabled", false)
        // $submitButton.attr("disabled", false).val("Search");
      } else {
        $("#photos").html(
          '<h1 style="padding: 15px"> Your Search ' +
            searchItem.val() +
            " returned no results! </h1>"
        );
      }
    }
    $.getJSON(flickerAPI, flickrOptions, displayPhotos);
  });
}); //end ready
