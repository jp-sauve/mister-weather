/*jslint devel:true */
/*global $, jQuery*/


var dataObj; // unsure how else to make this object available to other functions other than forcing it global like this!

function showForecast(position) {
    "use strict";
    console.log("Showing Forcast begins...");
    dataObj = new (function () {
        this.myLatitude = position.coords.latitude;
        this.myLongitude = position.coords.longitude;
        this.myAccuracy = position.coords.accuracy;
        this.iconCode = "";
        this.conditionText = "unknown";
        this.is_day = 0;
        this.tempUnit = "c";
        this.apiKey = "key=9251eadaf0d54c5aae630949172704";
        this.myQuery = "q=" + this.myLatitude + "," + this.myLongitude;
        this.imgURLbase = "mister-weather/data/weather/64x64/";
        this.baseURL = "https://api.apixu.com/v1/current.json?" + this.apiKey + "&" + this.myQuery;
    })();
    $.getJSON("/mister-weather/data/conditions.json", function (data) {
        dataObj.conditions = data;
    });
// Get weather using Apixu API
    console.log("Weather AJAX begins...");
    $.ajax({type: 'GET',
           dataType: 'json',
           url: dataObj.baseURL,
           success: updateForecast,
            cache: false
           });
}

function updateForecast(json) {
    "use strict";
    dataObj.json = json;
    //console.log(JSON.stringify(json));
/*
    console.log(json.location.name,json.current.condition.icon);
    let keys = Object.keys(json.current);
    console.log(keys);
    keys.forEach(function(key) {
        console.log('key: '+key+' value: '+json.current[key]);
    });
 */
    var conditionObjects = Object.keys(dataObj.conditions);
 //   console.log("ConditionObjects: "+JSON.stringify(conditionObjects));
    conditionObjects.forEach(function (key) {
        if ((dataObj.conditions[key].code) === (dataObj.json.current.condition.code)) {
 //           console.log("FOUND MATCH: " + dataObj.json.current.condition.code);
            dataObj.iconCode = dataObj.conditions[key].icon;
            if (dataObj.json.current.condition.is_day) {
                dataObj.conditionText = dataObj.conditions[key].day;
            } else {
                dataObj.conditionText = dataObj.conditions[key].night;
            }

        }
    });
    var html = "",
        loc_html = dataObj.json.location.name,
        curr_temp = (parseFloat((dataObj.tempUnit === "c") ? dataObj.json.current.temp_c : dataObj.json.current.temp_f)),
        curr_icon = dataObj.imgURLbase + ((dataObj.json.current.condition.is_day) ? "day/" : "night/") + dataObj.iconCode + ".png";
        //TESTING OVERRIDE
        //curr_temp = 99.99;
    var curr_temp_left = (function () {
        return Math.trunc(curr_temp);
    }());


    // Make curr_temp_right a whole number based on the fractional part of curr_temp. e.g. curr_temp = 1.7 then curr_temp_right = 7
    var curr_temp_right = ((curr_temp - curr_temp_left) * 10).toFixed(0);

    $('span#condition-text').html(dataObj.conditionText);

    $('span#time-phrase').html((dataObj.json.current.condition.is_day ? "today" : "tonight"));
    $('button#toggleUnit #other-unit').html((dataObj.tempUnit === "c") ? "F" : "C");
    $('#curr_temp_left').html(curr_temp_left);
    $('#curr_temp_right').html("." + ('0' + curr_temp_right).slice(-1));
    $('img#weatherIcon').attr("src", curr_icon);
    $('#myCity').html(loc_html);
    $('#myLatitude').html(dataObj.myLatitude);
    $('#myLongitude').html(dataObj.myLongitude);
    $('#myAccuracy').html(dataObj.myAccuracy);
}
function toggleUnit() {
    "use strict";
    if (dataObj.tempUnit === "c") {
        dataObj.tempUnit = "f";
        $('span#unit').html(dataObj.tempUnit.toUpperCase());
    } else {
        dataObj.tempUnit = "c";
        $('span#unit').html(dataObj.tempUnit.toUpperCase());
    }
    updateForecast(dataObj.json);
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
      //  console.log("Geolocate Exists");
        nav.geolocation.getCurrentPosition(showForecast, err, options);
        $('Button#toggleUnit').click(toggleUnit);
    } else {
        alert("No geolocation in navigator.");
    }
});
