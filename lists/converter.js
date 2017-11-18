var fs = require('fs');


var RE = /[!"=”“„'(),»«–.:;<>?`{}|~’‘&_@$\*\\\/]/g; // eslint-disable-line no-useless-escape





fs.readFile('samples/en.txt', 'utf8', function(err, data) {
    if (err) throw err;
    
    data = data.replace(RE, '');
    
    data = data.toLowerCase();
    
    
    var tab = RegExp("\\t", "g");
    data = data.replace(tab, '');

    data = data.replace(/\d*/g,'');
    data = data.replace(/-/g,'');
    data = data.replace(/ /g,'');


    data = data.replace(/(\r\n|\n|\r)/gm,"");
    data = data.replace(/ /g,'');

    if ( data.search(' ') !== -1 ) console.log("PROBLEM");

    

    var de = JSON.stringify(data);
    // console.log( de );

    fs.writeFile("en.json", de);

  });
