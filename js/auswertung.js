// richtige, falsche, nicht beantworteten 
function textAusgabe() {
    $('#gruss').text('Hallo ' + teilnehmer.name + '!');
    $('#botschaft').text('Deine Ergebnisse sind folgende: ');
    $('#auswertungen').text(teilnehmer.richtig + ' richtige Antworten | ' + teilnehmer.falsch + ' falsche Antworten | ' + teilnehmer.nicht + ' Fragen ohne Antwort');
    $('#zeit').text('Du hast ' + teilnehmer.dauer + ' Sekunden gebraucht!');
};


// DIAGRAM - doughnut 
function drawPie() {
    var labels = [
        'Richtige Antworten',
        'Falsche Antworten',
        'Keine Antwort'
    ];
    var ctx = document.getElementById('pie').getContext('2d');
    var pie = new Chart(ctx, { //     =  window.myChart2 = new Chart(ctx2, { 
        type: 'doughnut',
        data: {
            datasets: [{
                data: [
                    teilnehmer.richtig,
                    teilnehmer.falsch,
                    teilnehmer.nicht,
                ],
                backgroundColor: [
                    'rgba(0,255,0,0.5)',
                    'rgba(255,0,0,0.5)',
                    'rgba(0,0,0,0.3)'
                ],
                borderColor: [
                    'gray',
                    'gray',
                    'gray'
                ],
                label: ''
            }],
            labels: labels
        },
        options: {
            responsive: true,
            legend: {
                labels: {
                    fontColor: 'black'
                }
            }
        }
    });
};

function richtigFalschNichtHtml() {
    // auswertung [0, 1, 2, 1, 0]
    // antworten  [1,1,2,-1,0]
    var data = [];
    for (var i = 0; i < antworten.length; i++) {
        // die gleichen
        if (auswertungen[1][i] == antworten[i]) {
            data.push('Richtig');
            // die falschen
        } else if (auswertungen[1][i] != antworten[i] && antworten[i] != -1) {
            data.push('Falsch');
        } else if (antworten[i] == -1) {
            data.push('Keine Antwort');
        };

    };
    return data;
    console.log(data);
    // ['Richtig', 'Falsch', 'Keine Antwort']

};

function richtigFalschNichtJquery() {
    // auswertung [0, 1, 2, 1, 0]
    // antworten  [1,1,2,-1,0]
    var data = [];
    for (var i = 0; i < antworten.length; i++) {
        // die gleichen
        if (auswertungen[2][i] == antworten[i]) {
            data.push('Richtig');
            // die falschen
        } else if (auswertungen[2][i] != antworten[i] && antworten[i] != -1) {
            data.push('Falsch');
        } else if (antworten[i] == -1) {
            data.push('Keine Antwort');
        };

    };
    return data;
    console.log(data);
    // ['Richtig', 'Falsch', 'Keine Antwort']

};

function richtigFalschNichtCss() {
    // auswertung [0, 1, 2, 1, 0]
    // antworten  [1,1,2,-1,0]
    var data = [];
    for (var i = 0; i < antworten.length; i++) {
        // die gleichen
        if (auswertungen[3][i] == antworten[i]) {
            data.push('Richtig');
            // die falschen
        } else if (auswertungen[3][i] != antworten[i] && antworten[i] != -1) {
            data.push('Falsch');
        } else if (antworten[i] == -1) {
            data.push('Keine Antwort');
        };

    };
    return data;
    console.log(data);
    // ['Richtig', 'Falsch', 'Keine Antwort']

};

//console.log(richtigFalschNicht());

function einzelTabelle(richtigFalsch, index) {
    // 2 dimensionales Array
    var head = [];
    for (var i = 0; i < antworten.length; i++) {
        head.push('Frage ' + (i + 1));
    };


    var dataTabelle = [head, richtigFalsch];
    //console.log(dataTabelle);


    // Tabellengenerator
    var table, tHead, tBody, tr, zelle;

    table = $('<table>'); // Elemente erzeugen
    tHead = $('<thead>');
    tBody = $('<tbody>');

    $('#tabelle').append(table); // table Element in div einfügen
    $(table).append(tHead); // thead in table einfügen
    $(table).append(tBody); // tbody in table einfügen

    for (var i = 0; i < dataTabelle.length; i++) {
        tr = $('<tr>'); // tr Element erzeugen
        for (var j = 0; j < dataTabelle[i].length; j++) {
            if (i == 0) {
                zelle = $('<th>'); // zelle (th) erzeuge
                $(zelle).attr('id', 'th' + j + index);
            } else {
                zelle = $('<td>'); // zelle (td) erzeuge
            };

            zelle.text(dataTabelle[i][j]); // text ausgeben
            $(tr).append(zelle); // zelle in tr einfügen
        }; // ENDE for innen

        if (i == 0) {
            $(tHead).append(tr); // tr in thead einfügen
        } else {
            $(tBody).append(tr); // tr in tbody einfügen
        };


    }; // ENDE for aussen

    // Die Fragen und richtigen Antworten zeigen
    $('#th00')
        .click(function () {
            $('#dialog1').dialog('open');
        });

    $('#dialog1').dialog({
        title: 'Frage 1 | HTML 5',
        autoOpen: false,
        draggable: true,
        width: 500,
        modal: true,
        resizable: true,
        hide: {
            effect: 'explode',
            duration: 1000,
            pieces: 25
        }
    });
    $('#th10')
        .click(function () {
            $('#dialog2').dialog('open');
        });
    $('#dialog2').dialog({
        title: 'Frage 2 | HTML 5',
        autoOpen: false,
        draggable: true,
        width: 500,
        modal: true,
        resizable: true,
        hide: {
            effect: 'explode',
            duration: 1000,
            pieces: 25
        }
    });

    $('#th20')
        .click(function () {
            $('#dialog3').dialog('open');
        });
    $('#dialog3').dialog({
        title: 'Frage 3 | HTML 5',
        autoOpen: false,
        draggable: true,
        width: 500,
        modal: true,
        resizable: true,
        hide: {
            effect: 'explode',
            duration: 1000,
            pieces: 25
        }
    });
    $('#th30')
        .click(function () {
            $('#dialog4').dialog('open');
        });
    $('#dialog4').dialog({
        title: 'Frage 4 | HTML 5',
        autoOpen: false,
        draggable: true,
        width: 500,
        modal: true,
        resizable: true,
        hide: {
            effect: 'explode',
            duration: 1000,
            pieces: 25
        }
    });
    $('#th40')
        .click(function () {
            $('#dialog5').dialog('open');
        });
    $('#dialog5').dialog({
        title: 'Frage 5 | HTML 5',
        autoOpen: false,
        draggable: true,
        width: 500,
        modal: true,
        resizable: true,
        hide: {
            effect: 'explode',
            duration: 1000,
            pieces: 25
        }
    });

    $('#th01')
        .click(function () {
            $('#dialog6').dialog('open');
        });
    $('#dialog6').dialog({
        title: 'Frage 1 | jQuery',
        autoOpen: false,
        draggable: true,
        minWidth: 500,
        hide: {
            effect: 'explode',
            duration: 1000,
            pieces: 25
        }

    });
    $('#th11')
        .click(function () {
            $('#dialog7').dialog('open');
        });
    $('#dialog7').dialog({
        title: 'Frage 2 | jQuery',
        autoOpen: false,
        draggable: true,
        minWidth: 500,
        hide: {
            effect: 'explode',
            duration: 1000,
            pieces: 25
        }

    });
    $('#th21')
        .click(function () {
            $('#dialog8').dialog('open');
        });
    $('#dialog8').dialog({
        title: 'Frage 3 | jQuery',
        autoOpen: false,
        draggable: true,
        minWidth: 500,
        hide: {
            effect: 'explode',
            duration: 1000,
            pieces: 25
        }

    });
    $('#th31')
        .click(function () {
            $('#dialog9').dialog('open');
        });
    $('#dialog9').dialog({
        title: 'Frage 4 | jQuery',
        autoOpen: false,
        draggable: true,
        minWidth: 500,
        hide: {
            effect: 'explode',
            duration: 1000,
            pieces: 25
        }

    });
    $('#th41')
        .click(function () {
            $('#dialog10').dialog('open');
        });
    $('#dialog10').dialog({
        title: 'Frage 5 | jQuery',
        autoOpen: false,
        draggable: true,
        minWidth: 500,
        hide: {
            effect: 'explode',
            duration: 1000,
            pieces: 25
        }

    });
    $('#th02')
        .click(function () {
            $('#dialog11').dialog('open');
        });
    $('#dialog11').dialog({
        title: 'Frage 1 | CSS 3',
        autoOpen: false,
        draggable: true,
        minWidth: 500,
        hide: {
            effect: 'explode',
            duration: 1000,
            pieces: 25
        }

    });
    $('#th12')
        .click(function () {
            $('#dialog12').dialog('open');
        });
    $('#dialog12').dialog({
        title: 'Frage 2 | CSS 3',
        autoOpen: false,
        draggable: true,
        minWidth: 500,
        hide: {
            effect: 'explode',
            duration: 1000,
            pieces: 25
        }

    });
    $('#th22')
        .click(function () {
            $('#dialog13').dialog('open');
        });
    $('#dialog13').dialog({
        title: 'Frage 3 | CSS 3',
        autoOpen: false,
        draggable: true,
        minWidth: 500,
        hide: {
            effect: 'explode',
            duration: 1000,
            pieces: 25
        }

    });
    $('#th32')
        .click(function () {
            $('#dialog14').dialog('open');
        });
    $('#dialog14').dialog({
        title: 'Frage 4 | CSS 3',
        autoOpen: false,
        draggable: true,
        minWidth: 500,
        hide: {
            effect: 'explode',
            duration: 1000,
            pieces: 25
        }

    });
    $('#th42')
        .click(function () {
            $('#dialog15').dialog('open');
        });
    $('#dialog15').dialog({
        title: 'Frage 5 | CSS 3',
        autoOpen: false,
        draggable: true,
        minWidth: 500,
        hide: {
            effect: 'explode',
            duration: 1000,
            pieces: 25
        }

    });


}; // ENDE einzelTabelle(),


// 1. Teilnehmer Sammel in den LS schreiben

// LsLesen, LsSpeichern, LsAusgabe

// 2. DatenKonverter --- 2 dimensionales Array

// 3.  Tabelle schreiben
var head;

function datenKonverter(data) {
    if (data.length == 0) {
        return false;
    };
    head = ['Name', 'Thema', 'Richtig', 'Falsch', 'Keine Antwort', 'Dauer', 'Datum'];
    var row;
    var result = []; // 2. dim. Array
    result.push(head);

    for (var i = 0; i < data.length; i++) { // data ist ein Array
        row = [data[i].name, data[i].quizThema, data[i].richtig, data[i].falsch, data[i].nicht, data[i].dauer + ' Sek.', data[i].datum];
        result.push(row);
    }; // ENDE for Schleife

    return result;

};


function ganzeTabelle(data) {

    var dataTabelle = [head, alleTeilnehmer];
    //console.log(dataTabelle);

    // Tabellengenerator
    var table, tHead, tBody, tr, zelle;

    $('#tabelle').html('');
    table = $('<table>');
    tHead = $('<thead>');
    tBody = $('<tbody>');

    $('#tabelle').append(table);
    $(table).append(tHead);
    $(table).append(tBody);

    for (var i = 0; i < data.length; i++) {
        tr = $('<tr>');
        for (var ii = 0; ii < data[i].length; ii++) {

            if (i == 0) {
                zelle = $('<th>');
            } else {
                zelle = $('<td>');
            };
            zelle.text(data[i][ii]);
            $(tr).append(zelle);



        }; // ENDE innere Schleife

        if (i == 0) {
            $(tHead).append(tr);
        } else {
            $(tBody).append(tr);
        }

    }; // ENDE äussere Schleife

}; // ENDe tabellenGenerator

function lesen() {

    var data = localStorage.getItem('highlist'); // highlist ist das Key in localStorage / data ist das Wert-Objekt

    if (!data) {
        return false; // Abbruch der Funktion....wenn Speicher leer
    } else {
        alleTeilnehmer = JSON.parse(data); //JSON.stringify() ist Gegenteil 
    };
    return true;
};

function speichern() {

    lesen();
    alleTeilnehmer.push(teilnehmer);

    var data = JSON.stringify(alleTeilnehmer);
    localStorage.setItem('highlist', data);

};


function ausgeben() {
    $('#info').text('');
    if (lesen()) {
        // im Speicher ist etwas drin
        // Wir brauchen 2. dimensionales Array für die Tabelle und einen Tabellengenerator
        var dataTabelle = datenKonverter(alleTeilnehmer);
        ganzeTabelle(dataTabelle);

    } else {
        // Speicher ist leer
        $('#info').text('Speicher ist leer');
    };
};