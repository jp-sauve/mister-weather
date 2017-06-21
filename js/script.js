/*jslint devel:true */
/*global $, jQuery*/

function showForecast(lat, long) {
    "use strict";
    var apiKey = "key=9251eadaf0d54c5aae630949172704",
        myQuery = "q=" + lat + "," + long,
        baseURL = "https://api.apixu.com/v1/current.json?" + apiKey + "&" + myQuery;
    console.log("Showing Forecast");
    $.ajax({type: 'GET',
           dataType: 'json',
           url: baseURL,
           success: function (json) {
            console.log(json);
            var html = "";
            html += json.current.temp_c;
            $('#temp').html(html);
        },
            cache: false
           });
}

function showPosition(position) {
    "use strict";
    var myLatitude = position.coords.latitude,
        myLongitude = position.coords.longitude,
        myAccuracy = position.coords.accuracy;
    showForecast(myLatitude, myLongitude);
    $('#myLatitude').html(myLatitude);
    $('#myLongitude').html(myLongitude);
    $('#myAccuracy').html(myAccuracy);
}



$(document).ready(function () {
    "use strict";
    var nav = window.navigator;
    if (nav.geolocation) {
        console.log(nav);
        nav.geolocation.getCurrentPosition(showPosition);
    } else {
        alert("No geolocation in navigator.");
    }
});
