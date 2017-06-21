/*jslint devel:true */
/*global $, jQuery*/

function showForecast(position) {
    "use strict";
    var myLatitude = position.coords.latitude,
        myLongitude = position.coords.longitude,
        myAccuracy = position.coords.accuracy,
        apiKey = "key=9251eadaf0d54c5aae630949172704",
        myQuery = "q=" + myLatitude + "," + myLongitude,
        baseURL = "https://api.apixu.com/v1/current.json?" + apiKey + "&" + myQuery;
    $('#myLatitude').html(myLatitude);
    $('#myLongitude').html(myLongitude);
    $('#myAccuracy').html(myAccuracy);

    console.log("Showing Forecast");
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



$(document).ready(function () {
    "use strict";
    var nav = window.navigator;
    if (nav.geolocation) {
        console.log(nav);
        nav.geolocation.getCurrentPosition(showForecast);
    } else {
        alert("No geolocation in navigator.");
    }
});
