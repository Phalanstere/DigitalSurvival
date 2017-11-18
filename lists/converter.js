var fs = require('fs');


var RE = /[!"=“„'(),»«–.:;<>?`{}|~’\*\\\/]/g; // eslint-disable-line no-useless-escape



fs.readFile('de.txt', 'utf8', function(err, data) {
    if (err) throw err;

    console.log( data );
    
    data = data.replace(RE, '');
    console.log( data );
    
    data = data.toLowerCase();
    
    

    data = data.replace(/\d*/g,'');
    data = data.replace(/-/g,'');
    data = data.replace(/ /g,'');
    var de = JSON.stringify(data);
    console.log( de );

    fs.writeFile("de.json", de);

  });
