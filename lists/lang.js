var de_model = require("./de_freq.json");
var fr = require("./fr.json");
var en = require("./en.json");




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
        obj.frequency =   (obj.count / text.length).toFixed(4)/1;

    } 

   
    return list;
    }
    

    // this function scans the model for a letter
    function scan_model ( char, model ) {
        for (var n = 0; n < model.length; n++ ) {
           var item = model[n];

            if ( model[ n ].char === char ) {
                return model[ n ];
            }
            
        }
    }


    var differing_chars = [];

    function compare ( actual, model, tolerance) {
       var valid = true; 

        for (var i = 0; i < actual.length; i++) {


            var item = actual[ i ];
            var model_item = scan_model( item.char, model );

            // Jetzt der Vergleich
            if ( model_item) {


                var upper_range = model_item.frequency + tolerance;
                var lower_range = model_item.frequency - tolerance;

                if ( item.frequency < lower_range || item.frequency > upper_range) {
                    valid = false;
                    differing_chars.push( item.char );

                    }
            }


        }

    return valid;
    }




   if ( en.search(" ") !== -1 ) console.log("PROBLEM");


    var list = letter_frequency( en );
    list = sortObj(list, 'char');


    
    
    // var t = compare( list, de_model, 0.02 );
    // console.log(  differing_chars );
 
    /*
    var txt = JSON.stringify(list, null, 4);
    fs.writeFile("en_freq.json", txt);
    */
    