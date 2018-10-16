var fs = require('fs');
console.log("Morph");

var filename = "./philosophie.txt";
var bag = require('./bag.js');

function clean(text) {
    fs.writeFile('phil2.txt', text, "utf8", function(err){
        console.log("ist gelaufen");
    });


    t = text.toLowerCase();
    t = t.replace(new RegExp('\r?\n','g'), ' ');
    t = t.replace(/[.,\/#"!$%\^&\*;»«:{}=\-_?'`~()]/g,"");

    var b = new bag(t);


    fs.writeFile('phil.txt', t, "utf8", function(err){
        console.log("ist gelaufen");
    });

}


fs.readFile(filename, 'utf8', function(err, data) {
  if (err) throw err;
  console.log('OK: ' + filename);
  var text = JSON.stringify( data );


  clean( data );
});