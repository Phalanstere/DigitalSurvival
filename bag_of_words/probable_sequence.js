var t = require("./probetext.js");

var ProbableSequence = function( list ) {
    var self = this;
    this.uniques = [];


    this.check_unique = function(word) {
        for (var n = 0; n < self.uniques.length; n++) {
            var w = self.uniques[n].word;
            if ( w === word) return self.uniques[n];
        }

        return false;
    }

    

    this.create_uniques = function( ) {
        for (var i = 0; i < list.length; i++) {
            var item = list[i];
            var localized = self.check_unique( item );

            if (localized === false) {
                self.uniques.push( { word: item, seq: [], loc: [i] } );
            }
            else {
                localized.loc.push(i);
            }
            
        }

        console.log("einzelne Wörter " + self.uniques.length );
    }


    /*
    this.check_next = function( item, word ) {
        for (var q = 0; q < item.seq; q++) {
            if (item.seq[q] === word ) {
                console.log("gefunden");
                return item;
            }
        }

        return false;
    }

    this.add_subsequent = function( item, word) {
        var pres = self.check_next( item, word );
        if (pres === false) {
            item.seq.push( { word: word, freq: 1 } )
        }
        else {
            console.log("doppelt");
            pres.freq ++;
        }
    }
   */


   this.check_sequence = function( wordlist, word) {
       for (var q = 0; q < wordlist.length; q++) {
            if (wordlist[q].word === word) return wordlist[q];
       }
    return false;
   } 

   this.get_sequence = function( item, sequence) {
        var sq = [];

       for (var p = 0; p < sequence.length; p++) {
           var word = sequence[p];
           var found = self.check_sequence( sq, word);
           if (found === false) {
                sq.push({ word: word, count: 1, frequency: null  } )
                }
           else {
               found.count ++;
           }
       }

       for (var p = 0; p < sq.length; p++ ) {
           sq[p].frequency = (sq[p].count / sq.length).toFixed(2);
       }


       function compare(a,b) {
        if (a.frequency < b.frequency)
          return -1;
        if (a.frequency > b.frequency)
          return 1;
        return 0;
      }

    sq.sort( compare).reverse();
    return sq;
   }

    // gets the next item in the sequence 
    this.get_relations = function() {
        for (var i = 0; i < self.uniques.length; i++) {
            var item = self.uniques[i];
            var sequence = [];
            
            for (var n = 0; n < item.loc.length; n++) {
                var ct = item.loc[n];
                var next = list[ct+1];
                
                if (next) {
                    sequence.push( next );
                }
            }



            item.seq = self.get_sequence( item, sequence );
            if (item.word === "Gott") console.log( item );

        }
    }

    this.init = function() {  
        self.create_uniques();
        self.get_relations();
    }

    this.init();
}



var list = t.split(" ");      
var p = new ProbableSequence( list ); 