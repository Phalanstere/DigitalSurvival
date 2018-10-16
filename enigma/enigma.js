var german = null;
var dutch = null;
var polish = null;
var french = null;
var english = null;
var italian = null;


function Programming( text, raw, lang ) {
    var self = this;

    this.text = text;

    this.letter_list = [];
    this.chars = null;

    this.preprocess = function() {

        t = text;


        if (raw !== null ) {
            t = text.replace(/\s/g, "").toLowerCase();
            t = t.replace(/[.,\/#"!$%\^&\*;:{}=\-_?'`~()]/g,"");
            t = t.replace(/\d/g,'');

        }


        self.chars = t;
        var s = "";

        for (var i = 0; i < t.length; i++) {
            var id = "txt_" + i;
            s += '<span id = "' + id + '" class = "txt">';
            s += t[i];
            s += '</span>';
        }
        self.text = s;
    }

    this.sort = function() {
        var list = self.letter_list;
        var list2 = list.sort(function(a, b){
            return b.count-a.count
        })

        if (raw !== null) {

            switch(lang) {
                case "german":
                    german = list2; 
                break;

                case "english":
                    english = list2;
                break;

                case "french":
                    french = list2;
                break;

                case "dutch":
                    dutch = list2;
                break;

                case "polish":
                    polish = list2;
                break;

                case "italian":
                    italian = list2;
                break;
            }
        }

        self.new_object();
    }


    this.repaint = function(list, lang) {

        var s = "[ " + lang + " ]";
        document.getElementById("sprache").innerHTML = s;


        var obj = document.getElementById("objects");
        if (obj) obj.remove();

        var p = document.createElement("div");
        p.className = "objects";
        p.id = "objects";
        document.body.appendChild(p);

        self.letter_list = list;
        self.new_object();
        
    }


    this.newtext = function() {
        $("#nova").fadeIn();
    }


    this.trigger = function() {
        alert("CleanUp");
    }

    this.ct = 0;

    this.init = function() {

        self.preprocess();
        var e = document.createElement("div");
        e.className = "sequence";
        e.id = "sequence";
        e.innerHTML = self.text;
        document.body.appendChild(e);

        var p = document.createElement("div");
        p.className = "objects";
        p.id = "objects";
        document.body.appendChild(p);

        var q = document.createElement("div");
        q.className = "character";
        q.id = "character";
        document.body.appendChild(q);

        var r = document.createElement("div");
        r.className = "newtext";
        r.id = "newtext";
        r.innerHTML = '<div onclick = "e.newtext()">T</div>';
    
        document.body.appendChild(r);

        $("#nova").on("keydown", function(e){
            console.log(e.keyCode);

            if(e.which == 13){
              var el = document.getElementById("nova");
              text = el.value;  
              self.restart();
              return false;
            }
          });

        // self.loop = window.setInterval(self.cycle_array, 1000);
        self.cycle_array();
    }

    this.restart = function() {
        clearInterval( self.loop );
        self.letter_list = [];
        self.preprocess();
        self.ct = 0;
        $("#nova").fadeOut();
        self.new_object();
        self.preprocess();
        var el = document.getElementById("sequence");
        el.innerHTML = self.text;
        self.loop = window.setInterval(self.cycle_array, 100);
    }

    this.calc_frequencies = function() {
        var list = self.letter_list;

        for (var i = 0; i < list.length; i++) {
            var obj = list[i];

            obj.frequency = obj.count / (self.ct + 1);
            console.log( obj.frequency );
        }        
    }



    this.count_chars = function ( char ) {
        var list = self.letter_list;

        var found = false;
        var no = null;

        for (var n = 0; n < list.length; n++) {
           var obj = list[n];
           if ( obj.char === char) {
                no = n;
                obj.count ++;
                found = true;
                }
           }     

       

        if (found === false ) {
            self.create_obj (char);
        }

        self.calc_frequencies();

        self.paint_objects( no );
    }


    this.create_obj = function( char) {
        var o = { 
            char: char,
            count:  1,
            frequency: null
        }
        self.letter_list. push( o );
    }


    this.paint_char = function(char) {
        var el = document.getElementById("character");
        el.innerHTML = char;
    }

    this.new_object = function() {
        var list = self.letter_list;
        var s = "";

        for (var i = 0; i < list.length; i++) {
            var lc = "lc_" + i;
            var cc = "ct_" + i;

            s += '<div id = "' + lc + '" class = "letter_container">';
                s += '<div id = "' + cc + '" class = "counter">';
                s += list[i].count;   
                s += '</div>'; 


            // s += list[i].char;       
                
                var freq = list[i].frequency.toFixed(2);
                // console.log( freq );
               
                s += '<div class = "letter">';
                s += list[i].char; 
                s += '</div>';                

                s += '<div class = "frequency">';
                s += freq;
                s += '</div>';
                    
            s += '</div>';
        }

        document.getElementById("objects").innerHTML = s;
    }



    this.update_object = function( no) {
        var lc = "lc_" + no;
        var el = document.getElementById(lc);

        $(".letter_container").removeClass("high");
        $("#" + lc).addClass("high");

        // TweenMax.to(el, 0.4, { backgroundColor: 'red', boxShadow: "5px 5px 10px black" }); 
        // TweenMax.to(el, 1, { background: 'green' }); 
        
        var cc = "ct_" + no;
        var counter = document.getElementById(cc);
        counter.innerHTML = self.letter_list[no].count;

        $(".counter").removeClass("ac");
        $("#" + cc).addClass("ac");
        // TweenMax.to(counter, 0.4, { backgroundColor: 'black' }); 

    }


    this.paint_objects = function( no ) {

       if (no === null ) {
        self.new_object();
       }
       else {
        self.update_object(no);
       }

    }


    this.timed_interval = 3000;


    this.cycle_array = function() {
        if (self.ct < self.chars.length) {
            var id = "txt_" + self.ct;

            $(".txt").removeClass("hilite");        
            $("#" + id).addClass("hilite");
    

            var char = self.chars[self.ct];
            self.paint_char( char );
            self.count_chars( char );
            self.ct ++;
            if (self.timed_interval > 100) self.timed_interval -= 100;
            else  self.timed_interval = 10;

            window.setTimeout( self.cycle_array, self.timed_interval);
        }
        else {
            // clearInterval( self.loop );
            self.sort();
        }
        // else alert("FERTIG");
    }


    self.init();
}






function empty() {
    var sequence = document.getElementById("sequence");
    if (sequence) sequence.remove();
    var objects = document.getElementById("objects");
    if (objects) objects.remove();
}








var e = null;


function startEnigma() {
   e = new Programming("Dieser Text sollte analysiert bis jedes Element noch das letzte klitzekleineste Fitzelchen identifiziert worden ist", 1); 
}



var clean = null;


function startFrench() {
    hilite("french");
    if (! french) {
        empty();
        e = new Programming("Ce texte doit être analysé jusqu'à ce que chaque élément, encore un tout petit peu, ait été identifié. Attention ! Attention ! Et le point d'exclamation?", clean, "french");   
    
    }
    else e.repaint( french, "french" );

}


function startEnglish() {
    hilite("english");

    if (! english) {
        empty();
        e = new Programming("This text should be analyzed until every element, even the last teeny-tiny bit, has been identified. Be careful! What about the exclamation mark?", clean, "english");   
        }
    else e.repaint( english, "english" );
}

function startDutch() {
    hilite("dutch");

    if ( !dutch) {
        empty();
        e = new Programming("Deze tekst moet worden geanalyseerd totdat elk element, nog steeds het laatste tiener-tiny bit is geïdentificeerd. Was voorzichtig! Hoe zit het met het uitroepteken?", clean, "dutch");     
    }
    else e.repaint( dutch, "dutch" );
   
}


function startPolish() {
    hilite("polish");

    if ( !polish) {
        empty();
        e = new Programming("Tekst ten powinien być analizowany aż do momentu, gdy każdy element, wciąż ostatni teeny-tiny bit został zidentyfikowany. Ostrożnie! Co z wykrzyknikiem?", clean, "polish");     
    }
    else e.repaint( polish, "polish" );
   
}

function startGerman() {
    if ( !german) {
        empty();
        hilite("german");
        e = new Programming("Dieser Text sollte analysiert werden, bis jedes Element, noch das letzte klitzekleineste Fitzelchen identifiziert worden ist. Obacht! Was ist mit dem Ausrufezeichen?", clean, "german"); 
    }
    else e.repaint( german, "german" );
}


function startItalian() {
    if ( !italian) {
        empty();
        hilite("italian");
        e = new Programming("Questo testo dovrebbe essere analizzato fino a quando ogni elemento, ancora l'ultimo pezzo-piccolo pezzo è stato identificato. Attenzione! E il punto esclamativo?", clean, "italian"); 
    }
    else e.repaint( italian, "italian" );
}



function hilite( lang ) {
 
    var s = "[ " + lang + " ]";
    document.getElementById("sprache").innerHTML = s;


    var list = document.getElementsByClassName("lang");

    if (list) {

        for (var i = 0; i < list.length; i++) {
            var item = list[i];
            item.classList.remove("selected");
        }

    }

    document.getElementById(lang).classList.add("selected");
} 


function set_clean() {
    document.getElementById("clean").classList.add("cleaner");
    clean = 1;
}