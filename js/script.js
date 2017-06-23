/*jslint devel:true */
/*global $, jQuery*/

function showForecast(position) {
    "use strict";
    console.log("Showing Forcast begins...");
    var myLatitude = position.coords.latitude,
        myLongitude = position.coords.longitude,
        myAccuracy = position.coords.accuracy,
        apiKey = "key=9251eadaf0d54c5aae630949172704",
        myQuery = "q=" + myLatitude + "," + myLongitude,
        baseURL = "https://api.apixu.com/v1/current.json?" + apiKey + "&" + myQuery;
    $('#myLatitude').html(myLatitude);
    $('#myLongitude').html(myLongitude);
    $('#myAccuracy').html(myAccuracy);

    console.log("Showing Forecast AJAX begins...");
    $.ajax({type: 'GET',
           dataType: 'json',
           url: baseURL,
           success: function (json) {
            console.log(json);
            var html = "",
                loc_html = json.location.name;
            html += json.current.temp_c;
            $('#temp').html(html);
            $('#myCity').html(loc_html);
        },
            cache: false
           });
}
function err(errors) {
    "use strict";
    console.log("Error Report:");
    // Following line causes error in Opera
    // console.warn(`ERROR(${err.code}): ${err.message}`);
    console.log(errors);
}


$(document).ready(function () {
    "use strict";
    console.log("Document Ready...");
    var nav = window.navigator,
        browserChrome = null,
        options;
    if (nav.geolocation) {

        // Following section fixes FF53.0.3 Linux not returning position object
        if (typeof InstallTrigger !== 'undefined') {
            console.log("FF found!");
            options = {
                enableHighAccuracy: false,
                timeout: 0,
                maximumAge: Infinity
            };
        } else {
            console.log("Other browser found!");
            options = {
                enableHighAccuracy: true,
                timeout: 30000,
                maximumAge: 0
            };
            // FF fix finishes here
        }
        console.log("Geolocate Exists");
        nav.geolocation.getCurrentPosition(showForecast, err, options);
    } else {
        alert("No geolocation in navigator.");
    }
});
