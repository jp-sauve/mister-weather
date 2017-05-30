/*jslint devel:true */
/*global $, jQuery*/
$(document).ready(function () {
    "use strict";
    var nav = window.navigator;
    if (nav.hasOwnProperty('geolocation')) {
        console.log(nav);
    } else {
        console.log("No geolocation in navigator.");
        console.log("This is " + nav[0]);
    }
});
