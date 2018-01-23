var primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97];




function Lists( div ) {
    var self = this;



    this.process = function() {
        switch( self.pct ) {
            case 0:
                self.intro();
            break;

            case 1:
                self.show_string();
            break;

            case 2:
              self.show_numbers();
            break;

            case 3:
              self.show_objects();
            break;

            case 4:
                self.long_array(126);
            break;

            case 5:
                self.find_double();
            break;

            case 5:
                
            break;

            case 6:
            break;
        }

    }


    this.checkKeys = function( ev ) {
        console.log( ev.code );
        switch( ev.code) {
            case 'PageDown':
                self.forward();
            break;

            case 'PageUp':
                self.backward();
            break;

            case 'ArrowRight':
                self.forward();
            break;

            case 'ArrowLeft':
                self.backward();
            break;
        }

    }


    this.navigation = function() {
        window.addEventListener("keydown", self.checkKeys );
    }

    this.pct = 0;

    this.forward = function() {
        self.pct ++;
        self.process();
    }


    this.backward = function() {
        if (self.pct > 0) self.pct --;
        self.process();
    }


    this.show_numbers = function() {
        var a = [10, 7, 99, -2, 33, 34, 13];
        s = "";
        for (var i = 0; i < a.length; i++) {
            s += '<div class = "lcell">';
            s += a[i];
            s += '</div>';
        }
        var el = document.getElementById(div);
        el.innerHTML = s;
    }

    this.show_objects = function() {
        s = "";
        for (var i = 0; i < 7; i++) {
            s += '<div class = "lcell">';
            s += '{·}';
            s += '</div>';
        }
        var el = document.getElementById(div);
        el.innerHTML = s;    
    }


    this.show_string = function() {
        var a = "strings";
        s = "";
        for (var i = 0; i < a.length; i++) {
            s += '<div class = "lcell">';
            s += a[i];
            s += '</div>';
        }
        var el = document.getElementById(div);
        el.innerHTML = s;
    }



    this.larray = [];

    this.long_array = function(no) {
        var s = "";
        for ( var i = 0; i < no; i++) {
            var id = "c" + i;
            s += '<div id = "' + id + '" class = "scell">';
            var c = parseInt( Math.random() * 100 );
            s += c;
            self.larray.push(c);
            s += '</div>';
        }

        var el = document.getElementById(div);
        el.innerHTML = s;

    }




    this.find_double = function() {
       var check = [];
       var doublette = [];

       for (var i = 0; i < self.larray.length; i++) {
           var it = self.larray[i];
           if (check.includes(it) === true) {
               if (doublette.includes(it) === false) doublette.push( it );
           }
           else check.push( it );
       }

       self.double = doublette;
       self.doubleC = self.double;
       var t = self.doubleC[0];
       var c = "Entfernung der Doublette " + t + ", verbleibende Anzahl " + self.doubleC.length;
       self.status(c);
       this.highlight_double();

    }


    this.status = function( str ) {
        var el = document.getElementById("status");
        el.innerHTML = str; 
    }

    

this.mark_primenumber = function() {
    var nprimes = [];

    var c = "Markierung von Primzahlen";
    self.status(c);

    for (var i = 0; i < self.larray.length; i++) 
         {
         var it = self.larray[i];
         if (primes.includes(it ))  {
             nprimes.push( i );
             console.log( "PRIM " + it  + " ndx " + i);
            }
         }

    for (var i = 0; i < self.larray.length; i++) 
         {
         var it = self.larray[i];
         if (nprimes.includes(i )) {
                var id = "c" + i;                
                var el = document.getElementById(id);    
                TweenMax.to(el, 2, {background:"darkcyan", color: "black"}); 

            }
         }

    self.primes = primes;

    window.setTimeout( self.sort_array, 5000);
    }


   this.sort_array = function() {

    var c = "Sortieren der Liste";
    self.status(c);

    var x = self.larray.sort(function(a, b) {
        return a - b;
        });


    var s = "";

    for (var i = 0; i < self.larray.length; i++) {
        var id = "c" + i;
        s += '<div id = "' + id + '" class = "scell">';
        s += self.larray[i];
        s += '</div>';            
    }
    var el = document.getElementById(div);
    el.innerHTML = s;



    self.unjust = [];
    self.primes = [];
    self.just = [];

    for (var i = 0; i < self.larray.length; i++) {
        var color = null;
        var it = self.larray[i];

        var x = it % 2;
        if ( x !== 0 &&  primes.includes(it) === false ) {
            self.unjust.push( it );
            color = "darkorange";
        };
    
        if ( primes.includes(it) === true) {
            self.primes.push( it );
            color = "darkcyan"
        }



        if(color) {
            var id = "c" + i;                
            var el = document.getElementById(id);    
            TweenMax.to(el, 2, {background: color, color: "black"});        
        }
        else
        {
        self.just.push( it );    
        }

    }


    window.setTimeout( self.splitarray, 5000);

   }


   this.splitarray = function() {
        var c = "Aufspalten in unterschiedliche Arrays " + self.just.length;
        self.status(c);

        var s = "";
        
        s += '<div id = "sub" class = sub">';
        for (var i = 0; i < self.just.length; i++) {
           var it = self.just[i];

            s += '<div class = "scell">';
            s += self.just[i];
            s += '</div>'; 
        }
        s += '</div>'; 



      s += '<div id = "sub2" class = sub">';
        for (var i = 0; i < self.unjust.length; i++) {
           var it = self.unjust[i];

            s += '<div class = "unjust">';
            s += self.unjust[i];
            s += '</div>'; 
        }
        s += '</div>'; 


        s += '<div class = sub">';
        for (var i = 0; i < self.primes.length; i++) {
           var it = self.primes[i];

            s += '<div class = "prime">';
            s += self.primes[i];
            s += '</div>'; 
        }
        s += '</div>'; 

        var el = document.getElementById(div);
        el.innerHTML = s;
   }


    this.mark_unjust = function() {
        self.unjust = [];


        for (var i = 0; i < self.larray.length; i++) {
            var it = self.larray[i];
            var x = it % 2;
            if (x !== 0) {
                self.unjust.push(i);
                var id = "c" + i;                
                var el = document.getElementById(id);    
                TweenMax.to(el, 2, {background:"darkorange", color: "black"});                   
            }
        }

    var c = "Markierung ungerade Zahlen";
    self.status(c);

    window.setTimeout( this.mark_primenumber, 5000);
    }

    this.highlight_double = function() {
        var a = self.doubleC[0];
        var found = -1;
        var to_remove = [];
        var newlist = [];

        for (var i = 0; i < self.larray.length; i++) {
            var it = self.larray[i];
            if (it === a) {
                found ++;
                if (found > 0) to_remove.push(i);
                var id = "c" + i;
                var el = document.getElementById(id);    
                TweenMax.to(el, 2, {background:"red", color: "white"});        
            }
        }



    for (var i = 0; i < self.larray.length; i++) {  
        var it = self.larray[i];    
        if ( to_remove.includes(i) === false) newlist.push(it);
    }




    self.larray = newlist;
  
    var t = self.doubleC[0];
    self.doubleC.shift();


    //var c = t + " -- Entfernung der Doubletten, verbleibende Anzahl " + self.doubleC.length;
    // self.status(c);

    var c = "Entfernung der Doublette " + t + ", verbleibende Anzahl " + self.doubleC.length;
    self.status(c);

    self.remove_speed -= 50;
    if (self.remove_speed < 20 ) self.remove_speed = 20;

    window.setTimeout( self.repaint, self.remove_speed); 

    //window.setInterval( self.highlight_double, 1000);

    }


    this.remove_speed = 1000;

    this.repaint = function( callback ) {
        //alert("REPAINT " + self.larray.length);
        var s = "";
        for (var i = 0; i < self.larray.length; i++) {
            var id = "c" + i;
            s += '<div id = "' + id + '" class = "scell">';
            s += self.larray[i];
            s += '</div>';            
        }

        var el = document.getElementById(div);
        el.innerHTML = s;
        
        if (self.doubleC.length > 0) self.highlight_double();
        else self.mark_unjust();
        
    }



    this.intro = function() {
        var s = "";

        s += '<div class = "big">Listen/Arrays </div>';
        var el = document.getElementById(div);
        el.innerHTML = s;
    }



    this.init = function() {
        var DynamicCover = new Cover();
        self.navigation();
        self.intro();
    }


    self.init();

}



function startList() {
    var l = new Lists("Vars");
}

