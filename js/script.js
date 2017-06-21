/*jslint devel:true */
/*global $, jQuery*/

function showPosition(position) {
    "use strict";
    console.log(position);
    var myLatitude = position.coords.latitude,
        myLongitude = position.coords.longitude,
        myAccuracy = position.coords.accuracy;
    $('#geo-report').html("Latitude: " + myLatitude + "  -=-  Longitude: " + myLongitude + "<br/>Accuracy: " + myAccuracy);
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
