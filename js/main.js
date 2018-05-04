var fragenIndex1 = 0;
var fragenIndex2 = 0;
var fragenIndex3 = 0;

// Richtige Antworten
var auswertungen = {
    '1': [
        1,
        2,
        0,
        2,
        3
    ],
    '2': [
        1,
        2,
        1,
        1,
        3
    ],
    '3': [
        3,
        3,
        3,
        3,
        3
    ]
};


var antworten = [];

var name; // Name des Teilnehmer (Probanden)
var teilnehmer = {}; // Alle Information des Teilnehmer
var alleTeilnehmer = []; // Alle Teilnehmer

var startZeit; // speichert Zeitstempel
var flag = true; // Schalter

//Timer Variablen
var time;
var total_sekunden = 60 * 3;
var c_minuten = parseInt(total_sekunden / 60);
var c_sekunden = parseInt(total_sekunden % 60);

function datum() {
    var wochentag = [
        'Sonntag',
        'Montag',
        'Dienstag',
        'Mittwoch',
        'Donnerstag',
        'Freitag',
        'Samstag'
    ];

    var monate = [
        'Januar',
        'Februar',
        'März',
        'April',
        'Mai',
        'Juni',
        'Juli',
        'August',
        'September',
        'Oktober',
        'November',
        'Dezember'
    ];

    var heute = new Date();
    var tag = wochentag[heute.getDay()];
    var monatstag = heute.getDate();
    var monat = monate[heute.getMonth()];
    var jahr = heute.getFullYear();
    var stunde = heute.getHours();
    var minute = heute.getMinutes();

    // führende 0	
    if (stunde < 10) {
        stunde = '0' + stunde;
    }
    if (minute < 10) {
        minute = '0' + minute;
    }

    var uhrzeit = stunde + " : " + minute;
    var aktuelles_datum = tag + ", " + monatstag + "." + monat + " " + jahr + " " + uhrzeit;
    return aktuelles_datum;
}; //ENDE datum()


function myFunction() {
    var x = document.getElementById('myTopnav');
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}; //ENDE myFunction

function CheckTime() {
    $('#timer').html(c_minuten + ':' + c_sekunden + ' min.');
    if (total_sekunden <= 0) {
        $(function () {
            var dialogtext = $('<p>');
            $("#dialog-message").append(dialogtext);
            $(dialogtext).text('Versuchen Sie es noch einmal!');
            $("#dialog-message").dialog({
                autoOpen: true,
                modal: true,
                buttons: {
                    Ok: function () {
                        window.location.replace("index.html");
                        $(this).dialog("close");
                    }
                }
            });
        });
    } else {
        total_sekunden = total_sekunden - 1;
        c_minuten = parseInt(total_sekunden / 60);
        c_sekunden = parseInt(total_sekunden % 60);
        setTimeout('CheckTime()', 1000);
    }
}; // ENDE CheckTime


$(document).ready(function () {

    $('#homeID').click(function () {
        window.location.replace("index.html");

    }); // ENDE click button Home

    $('#detailsID').click(function () {

        // Kursdetails-Seite laden

        $.ajax({
            url: 'kursdetails.html'
        }).done(function (data) {

            $('#content').html(data);
        });
    }); // ENDE click button Kursdetails


    $('#quiz-html').click(function () {

        // Quiz-HTML laden
        $.ajax({
            url: 'quizhtml.html'
        }).done(function (data) {

            $('#content').html(data);
            if (flag) {
                time = setTimeout('CheckTime()', 1000);
                flag = !flag;
            };
            $('#start').click(function () {


                // Prüfung .... steht etwas im name Feld
                if (fragenIndex1 == 0) {
                    if (feldTest() === false && fragenIndex1 == 0) {
                        return;
                    };
                    startZeit = new Date(); // Zeitstempel start Quiz

                    // ENDE Prüfung ...steht etwas in name Feld
                } else {

                    sammelAntworten();

                    // Zeit messen
                    if (fragenIndex1 == htmlfragen.length) {

                        var stopZeit = new Date();
                        var dauer = Math.floor((stopZeit - startZeit) / 1000); // Zeit messen in SEKUNDEN

                        // update Teilnehmer Objekt
                        teilnehmer.datum = datum();
                        teilnehmer.dauer = dauer;
                        teilnehmer.richtig = richtig(1);
                        teilnehmer.falsch = falsch(1);
                        teilnehmer.quizThema = 'HTML5'
                        teilnehmerUpdate();

                    }; // ENDE Zeit messen

                }; //ENDE else

                $(this).text('Nächste Frage');


                // HTML-Fragen laden
                $.ajax({
                    url: 'frage.html'
                }).done(function (data) {

                    $('#fragen').html(data);
                    $('#timer').show();
                    gruss();
                    if (fragenIndex1 == htmlfragen.length) {
                        //clearTimeout(time);
                        //total_sekunden = 60 * 3;
                        $.ajax({
                            url: 'auswertung.html'
                        }).done(function (data) {
                            $('#content').html(data);

                            textAusgabe();
                            drawPie();
                            einzelTabelle(richtigFalschNichtHtml(), 0);
                            speichern();
                            $('#teilnehmer').click(function () {
                                ausgeben();
                                $('#teilnehmer').hide();
                            });
                            antworten = [];
                            total_sekunden = 60 * 3;
                            clearTimeout(time);
                        });

                    };
                    $('#frageNummer').text('Frage ' + (fragenIndex1 + 1) + ' von 5');
                    var frage = $('<h4>');
                    $('#frage').append(frage);
                    frage.text(htmlfragen[fragenIndex1]);

                    $('#antw0').text(htmlAntwort1[fragenIndex1]);
                    $('#antw1').text(htmlAntwort2[fragenIndex1]);
                    $('#antw2').text(htmlAntwort3[fragenIndex1]);
                    $('#antw3').text(htmlAntwort4[fragenIndex1]);
                    fragenIndex1++;

                }); // ENDE HTML-Fragen laden

            }); //ENDE click button Start

            fragenIndex1 = 0;

        }); //ENDE quizhtml laden

    }); // ENDE click button Quiz-HTML

    $('#quiz-jquery').click(function () {

        // Quiz-jQuery laden
        $.ajax({
            url: 'quizjquery.html'
        }).done(function (data) {

            $('#content').html(data);
            if (flag) {
                time = setTimeout('CheckTime()', 1000);
                flag = !flag;
            };
            $('#start').click(function () {
                // Prüfung .... steht etwas im name Feld
                if (fragenIndex2 == 0) {
                    if (feldTest() === false && fragenIndex2 == 0) {
                        return;
                    };
                    startZeit = new Date(); // Zeitstempel start Quiz


                    // ENDE Prüfung ...steht etwas in name Feld
                } else {

                    sammelAntworten();

                    // Zeit messen
                    if (fragenIndex2 == jqueryfragen.length) {
                        var stopZeit = new Date();
                        var dauer = Math.floor((stopZeit - startZeit) / 1000); // Zeit messen in SEKUNDEN

                        // update Teilnehmer Objekt
                        teilnehmer.datum = datum();
                        teilnehmer.dauer = dauer;
                        teilnehmer.richtig = richtig(2);
                        teilnehmer.falsch = falsch(2);
                        teilnehmer.quizThema = 'jQuery'
                        teilnehmerUpdate();

                    }; // ENDE Zeit messen
                };

                $(this).text('Nächste Frage');


                // jQuery-Fragen laden
                $.ajax({
                    url: 'frage.html'
                }).done(function (data) {

                    $('#fragen').html(data);
                    $('#timer').show();
                    gruss();
                    if (fragenIndex2 == jqueryfragen.length) {


                        $.ajax({
                            url: 'auswertung.html'
                        }).done(function (data) {
                            $('#content').html(data);

                            textAusgabe();
                            drawPie();
                            einzelTabelle(richtigFalschNichtJquery(), 1);
                            speichern();
                            $('#teilnehmer').click(function () {
                                ausgeben();
                                $('#teilnehmer').hide();
                            });
                            antworten = [];
                            total_sekunden = 60 * 3;
                            clearTimeout(time);
                        });

                    };
                    $('#frageNummer').text('Frage ' + (fragenIndex2 + 1) + ' von 5');
                    var frage = $('<h4>');
                    $('#frage').append(frage);
                    frage.text(jqueryfragen[fragenIndex2]);

                    $('#antw0').text(jqueryAntwort1[fragenIndex2]);
                    $('#antw1').text(jqueryAntwort2[fragenIndex2]);
                    $('#antw2').text(jqueryAntwort3[fragenIndex2]);
                    $('#antw3').text(jqueryAntwort4[fragenIndex2]);
                    fragenIndex2++;
                }); // ENDE jQery-Fragen laden
            }); //ENDE click button Start
        }); //ENDE quiz-jquery laden
    }); // ENDE click button Quiz-jQuery

    $('#quiz-css').click(function () {

        // CSS-Quiz laden
        $.ajax({
            url: 'quizcss.html'
        }).done(function (data) {

            $('#content').html(data);
            if (flag) {
                time = setTimeout('CheckTime()', 1000);
                flag = !flag;
            };
            $('#start').click(function () {
                // Prüfung .... steht etwas im name Feld
                if (fragenIndex3 == 0) {
                    if (feldTest() === false && fragenIndex3 == 0) {
                        return;
                    };
                    startZeit = new Date(); // Zeitstempel start Quiz


                    // ENDE Prüfung ...steht etwas in name Feld
                } else {

                    sammelAntworten();

                    // Zeit messen
                    if (fragenIndex3 == cssfragen.length) {
                        var stopZeit = new Date();
                        var dauer = Math.floor((stopZeit - startZeit) / 1000); // Zeit messen in SEKUNDEN

                        // update Teilnehmer Objekt
                        teilnehmer.datum = datum();
                        teilnehmer.dauer = dauer;
                        teilnehmer.richtig = richtig(3);
                        teilnehmer.falsch = falsch(3);
                        teilnehmer.quizThema = 'CSS3'
                        teilnehmerUpdate();

                    }; // ENDE Zeit messen
                };

                $(this).text('Nächste Frage');


                // CSS-Fragen laden
                $.ajax({
                    url: 'frage.html'
                }).done(function (data) {

                    $('#fragen').html(data);
                    $('#timer').show();
                    gruss();
                    if (fragenIndex3 == cssfragen.length) {

                        $.ajax({
                            url: 'auswertung.html'
                        }).done(function (data) {
                            $('#content').html(data);

                            textAusgabe();
                            drawPie();
                            einzelTabelle(richtigFalschNichtCss(), 2);
                            speichern();
                            $('#teilnehmer').click(function () {
                                ausgeben();
                                $('#teilnehmer').hide();
                            });
                            antworten = [];
                            total_sekunden = 60 * 3;
                            clearTimeout(time);
                        });

                    };
                    $('#frageNummer').text('Frage ' + (fragenIndex3 + 1) + ' von 5');
                    var frage = $('<h4>');
                    $('#frage').append(frage);
                    frage.text(cssfragen[fragenIndex3]);

                    $('#antw0').text(cssAntwort1[fragenIndex3]);
                    $('#antw1').text(cssAntwort2[fragenIndex3]);
                    $('#antw2').text(cssAntwort3[fragenIndex3]);
                    $('#antw3').text(cssAntwort4[fragenIndex3]);
                    fragenIndex3++;
                }); // ENDE CSS-Fragen laden
            }); //ENDE click button Start
        }); //ENDE quizcss laden
    }); // ENDE click button Quiz-CSS

    function feldTest() {
        name = $('#name').val();

        $('#info').text('');

        if (name == '' || name == ' ') {
            $('#info').text('Bitte Deinen Namen in das Feld schreiben!');
            return false; // Funktion abbrechen
        };

        return true;
    }; //ENDE feldTest();


    function gruss() {

        $('#personalisierung').text('Hallo ' + name + '!');
    }; // ENDE gruss()

    function sammelAntworten() {


        // $('#antworten input') - HTML Collection --> Alle <input> Elemente im HTML-Tag <antworten> 
        var checkValue = parseInt($('#antworten input').filter(':checked').val());

        if (checkValue >= 0) {

            // Antwort gegeben
            antworten.push(checkValue);
        } else {
            // Keine Antwort gegeben
            antworten.push(-1);
        };
        console.log(antworten);
    }; // ENDE sammelAntworten()


    function teilnehmerUpdate() {
        //teilnehmer.datum =  ---schon erledigt
        //teilnehmer.dauer =  ---schon erledigt
        teilnehmer.antworten = antworten;
        teilnehmer.nicht = nicht();
        teilnehmer.name = name;

        console.log(teilnehmer);

    }; //ENDE teilnehmerUpdate()


    function richtig(par) {

        var n = 0;
        for (var i = 0; i < antworten.length; i++) {
            if (antworten[i] === auswertungen[par][i]) {
                n++;
            }; // ENDE Vergleich
        }; // ENDE for
        return n;
    }; // ENDE richtig()


    function nicht() {

        var n = 0;
        for (var i = 0; i < antworten.length; i++) {
            if (antworten[i] === -1) {
                n++;
            }; // ENDE Vergleich
        }; // ENDE for
        return n;
    }; // ENDE nicht()

    function falsch(falsch) {

        return antworten.length - (richtig(falsch) + nicht());

    }; // ENDE falsch()

    $('#dokumentID').click(function () {

        // Dokumentation-Seite laden

        $.ajax({
            url: 'documents.html'
        }).done(function (data) {

            $('#content').html(data);

        });
    }); // ENDE click button Kursdetails

    $('#contactID').click(function () {

        // Kontakt-Seite laden
        $.ajax({
            url: 'contact.html'
        }).done(function (data) {

            $('#content').html(data);


            var map = L.map('map', {
                center: [52.520007, 13.404954],
                zoom: 10,
                fullscreenControl: true,
                fullscreenControlOptions: {
                    title: 'Karte im Fullscreen Modus',
                    titleCancel: 'Fullscreen Modus verlassen'

                }
            });

            L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                zoom: {
                    maxZoom: 19
                },
                attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            }).addTo(map);



            //                                   Pfad zur geojson Datei
            var importJSON = new L.GeoJSON.AJAX(['data/contact.geojson'], { //Das können wir nutzen, wegen des Plugins <script src="leaflet/leaflet.ajax.min.js"></script> in index.html
                onEachFeature: verteileMarker
                // onEachFeature ist eine Schleife durch das geojson. Pro Feature wird die Funktion verteileMarker() ausgeführt
            });

            function verteileMarker(feature) {

                var marker = L.marker(feature.geometry.coordinates).addTo(map);
                marker.bindPopup(
                    '<h3>' + feature.properties.title + '</h3>' +
                    '<p>' + feature.properties.data.adresse + '</p>' +
                    '<h3>' + feature.properties.data.info + '</h3>' +
                    '<p>Tel. ' + feature.properties.data.tel + '</p>' +
                    '<p>Fax ' + feature.properties.data.fax + '</p>' +
                    '<p>E-Mail: <a href="mailto:' + feature.properties.data.email + '">' + feature.properties.data.email + '</a></p>'
                );
            }; // ENDE verteileMarker(feature);

            $(function () {
                $("#accordion").accordion({
                    collapsible: true
                });
            });

        }); // ENDE Kontakt-Seite laden
    }); // ENDE click button Contact


}); // ENDE ready