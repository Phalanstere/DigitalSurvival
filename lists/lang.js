var de = require("./de.json");
var fs = require('fs');


function sortObj(list, key) {
    function compare(a, b) {
        a = a[key];
        b = b[key];
        var type = (typeof(a) === 'string' ||
                    typeof(b) === 'string') ? 'string' : 'number';
        var result;
        if (type === 'string') result = a.localeCompare(b);
        else result = a - b;
        return result;
    }
    return list.sort(compare);
}



function letter_frequency( text ) {
        // Zuerst wird die Liste definiert
        console.log( text.length);

        var list = [];

        function count_chars ( char ) {
            var found = false; 
           
            for (var n = 0; n < list.length; n++) {
               var obj = list[n];
               
               if ( obj.char === char) {
                    obj.count ++;
                    found = true;
                    }
               }       
            
        
            if ( found === false  ) {
                console.log( char );

                var o = { 
                    char: char,
                    count: 1,
                    frequency: null
                }
                list. push( o );
            }

        }  
        
    for ( var i = 0; i < text.length; i++) {
        var char = text[i];
        count_chars( char );
    } 

    for ( var i = 0; i < list.length; i++) {
        var obj = list[i];
        obj.frequency = (obj.count / text.length);
        console.log( obj.frequency);
    } 


    return list;
    }
    

    var list = letter_frequency(de);

    sortObj( list, 'char');

    
    var txt = JSON.stringify(list, null, 4);
    fs.writeFile("de_freq.json", txt);