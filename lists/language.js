// var de = require("./de.json");
var de = "fkjkjhgkerjhgkjhgkwdüpiizg32hgl";

    





function letter_frequency( text ) {
    
        // Zuerst wird die Liste definiert
        var list = [];

        function count_chars ( char ) {
            var found = false; 
           
            for (var n = 0; n < list.length; n++) {
               var obj = list[n];
               if ( obj.char === char) {
                    obj.index ++;
                    found = true;
                    }
               }       
            
        
            if ( ! found  ) {
                var o = { 
                    char: c,
                    count: 1,
                    frequency: null
                }
                list. push( o );
        }

        // und jetzt vollziehen wir den Textdurchlauf
    
        for ( var i = 0; i < text.length; i++) {
            var char = text[i];
            count_chars( char );
        } 
    
        // jetzt gehen wir unsere Liste durch und ermitteln die Frequenz
        // eines jeden einzenen Buchstabens
    
        for ( var i = 0; i < list.lengt; i++) {
            var obj = list[i];
            obj.frequency = (obj.count < text.length).toFixed(2);
        } 
    
    return list;
    }
    
    
    function scan_model ( char, model ) {
        for (var i = 0; i < model.legth; i++ ) {
            if ( model[ i ].char === char ) return model[ i ];
        }
    }


    function compare ( actual, model, tolerance) {
        var valid = true; 
    
        for (var i = 0; i < actual.legth; i++) {
            var item 
            
            
            = actual[ i ];
            var model_item = scan_model( item.char );
            // Jetzt der Vergleich
            if ( item.frequency < lower_range || item.frequency > upper.range) valid = false;
    
        }
    
    return valid;
    }



var list = letter_frequency(de);
console.log( list );