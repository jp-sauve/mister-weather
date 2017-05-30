/*jslint devel:true */
/*global $, jQuery*/
$(document).ready(function () {
    "use strict";
    if (navigator.hasOwnProperty('geolocation')) {
        console.log(navigator);
    } else {
        console.log("No geolocation in navigator.");
    }
});
