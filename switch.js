var a = Math.random();


switch( a) {
 case a > 0.2 && a < 0.3:
    console.log( a );
 break;

 default:
    console.log("Nicht erfasst "  + a );
 break;


}

var color = {
    r: 255,
    g: 255,
    b: 255,
    a: 0.75
}

var x = parseInt ( Math.random() * 255 );



solution: |
var col = {  
    r: 255,
    g: 255,
    b: 255,
    a: 0.5
};   

col.r = parseInt( Math.random() * 255 );
col.g = parseInt( Math.random() * 255 );
col.b = parseInt( Math.random() * 255 );


function (text) {  var ssu = new SpeechSynthesisUtterance( text ); window.speechSynthesis.speak( ssu ); }

var anrufe = ['WLAN-Problem', 'Nix geht mehr', 'Alles SCheiße', 'ist Susi da?'];

switch(anruf) {
    case 'WLAN-Problem':
    break;

    case 'Nix geht mehr':
    break;

    case 'Alles Scheiße':
    break;

    default:
    break;
}



function loop() {
    var el = document.getElementById("clock");
    var date = new Date();
    var sec = date.getSeconds();
    var min = date.getSeconds();
    var hours = date.getHours() + 1;
    el.innerHTML = hours + ":" + minutes + ":" + sec;
}

setInterval(loop, 1000); 



check = "( function() { if ( interval) clearInterval( interval ) })();"


var list = [];
var min = 0;
var max = 1000000;

for (var i = 0; i < 100000; i++ ){
    var x = parseInt( Math.random() * 1000000);
    if (x > max) max = x;
    if (x < min) min = x;
}


console.log("MIN: " + min + ", MAX: " + max);


hints = { ['Wenn Sie min und max in der for-Schleife definieren, werden sie jeweils überschrieben', 'mit einer if-Abfrage können Sie ermitteln, wie sie sich die Zufallszahl zu min und max verhält',
'Wenn Sie auf den Chat-Button drücken, können Sie mit einem  ihrer Kollegen flüstern', 'Und falls es gar zu arg ist, können Sie sich die Lösung anzeigen lassen'] }