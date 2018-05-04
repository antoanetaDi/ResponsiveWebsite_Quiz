var htmlfragen = [];
var htmlAntwort1 = [];
var htmlAntwort2 = [];
var htmlAntwort3 = [];
var htmlAntwort4 = [];

var jqueryfragen = [];
var jqueryAntwort1 = [];
var jqueryAntwort2 = [];
var jqueryAntwort3 = [];
var jqueryAntwort4 = [];

var cssfragen = [];
var cssAntwort1 = [];
var cssAntwort2 = [];
var cssAntwort3 = [];
var cssAntwort4 = [];

$.getJSON('data/fragen.json', function (data) {
    convertData(data);

});

function convertData(data) {

    for (var i in data.html) {
        htmlfragen.push(data.html[i][0]);
        htmlAntwort1.push(data.html[i][1]);
        htmlAntwort2.push(data.html[i][2]);
        htmlAntwort3.push(data.html[i][3]);
        htmlAntwort4.push(data.html[i][4]);

    };
    for (var i in data.jquery) {
        jqueryfragen.push(data.jquery[i][0]);
        jqueryAntwort1.push(data.jquery[i][1]);
        jqueryAntwort2.push(data.jquery[i][2]);
        jqueryAntwort3.push(data.jquery[i][3]);
        jqueryAntwort4.push(data.jquery[i][4]);

    };
    for (var i in data.css) {
        cssfragen.push(data.css[i][0]);
        cssAntwort1.push(data.css[i][1]);
        cssAntwort2.push(data.css[i][2]);
        cssAntwort3.push(data.css[i][3]);
        cssAntwort4.push(data.css[i][4]);

    };


}; // ENDE convertData(data)