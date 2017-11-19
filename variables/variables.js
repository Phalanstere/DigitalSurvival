


function Variables (div) {
    var self = this;

    this.counter = 0;


    //

    this.ct = 0;
    this.bit = 1;
    this.actual_range = 2;

    this.paint_bit_cells = function() {

        var s = "";

        for (var i = 0; i < self.bit; i++) {
            var id = "bc_" + i;
            s += '<div id = "' + id + '" class = "bit"></div>';
        }

    var el = document.getElementById("store");
    el.innerHTML = s;
    }


    this.dec2bin = function(dec){
    return (dec >>> 0).toString(2);
    }



    this.repaint = function( bin ) {       
        var s = bin.split('').reverse().join('');

        var list = [];

        for (var i = 0; i < s.length; i++) {
            if (s[i] === '1') list.push( true );
            else              list.push( false );
        }



        for (var i = 0; i < list.length; i++) {
            var id = "bc_" + i;
            var el = document.getElementById( id );

            if (!el) {
                var s = '<div id = "bc_0" class = "bit"></div>';
                var binary = document.getElementById("binary");
                binary.innerHTML = s;
                var el = document.getElementById( id );
            }

            if (list[i] === true) TweenMax.to(el, 2, { background:"yellow"});
            else                  TweenMax.to(el, 2, { background:"black"});


        }


    }


    this.bit_counter = function() {
        self.ct ++;
            
        var ct = document.getElementById("counter");
        ct.innerHTML = self.ct;
      
        var bin = self.dec2bin( self.ct );

        var binary = document.getElementById("binary");
        binary.innerHTML = bin;

        if (self.ct > 32) {
            var asci = String.fromCharCode( self.ct );
            var alpha = document.getElementById("alphatoken");
            alpha.innerHTML = asci;
        }


        if (self.ct === self.actual_range ) {
            self.actual_range = self.ct * 2;
            
            self.bit ++;

            var str = self.bit + " bit";

            var l = document.getElementById("legend");
            l.innerHTML = str;

            self.paint_bit_cells();            
        }

        self.repaint( bin );

    }



    this.bit_system = function() {
        this.interval = window.setInterval( self.bit_counter, 1000);

        var s = "";
        s += '<div id = "counter" class ="counter">0';
        s += '</div>';

        s += '<div id = "binary" class ="binary">';
        s += '</div>';


        s += '<div id = "store" class ="store">';
            s += '<div id = "bc_0" class = "bit"></div>';
        s += '</div>';


        s += '<div id = "legend" class ="legend">1 bit';
        s += '</div>';

        s += '<div id = "alphatoken" class ="alphatoken">';
        s += '</div>';


        var d = document.getElementById(div);
        d.innerHTML = s;

    }


    this.unicode_ct = 256;

    this.unicode_bar = function( bit ) {
        var c  = self.dec2bin( self.unicode_ct );
        var ln = c.length;
        var prepend = "";

        var diff = 16 - ln;
        if (diff > 0) {
            for (var n = 0; n < diff; n++) {
                prepend += "0";
            }
        }
        
       c = prepend + c; 

        var str = "";


        str += '<div class = "unicode_bar">';



        // str += c;
        for (var i = 0; i < 16; i++) {
            var cl = "tinyb";
            if (c[i] === '0') cl = "tiny";

            str += '<div class = "' + cl + '"></div>';            
        }

        str += '<div class = "unicode_no">' + self.unicode_ct + '</div>';

        str += '</div>';
        return str;

    }

    this.unicode = function() {
        self.unicode_ct ++;
        var s = "";

        s += '<div class = "unicode">';
        var c = String.fromCharCode( self.unicode_ct );
        s += c;
        s += '</div>';

        s += self.unicode_bar();

       var element = document.getElementById(div);
        element.innerHTML = s;

    }


    //// showing the storage logic ///

    this.updatePointer = function(no) {
        var id = "sc_" + no;
        var el = document.getElementById(id);
        var cname = el.className;
        var color = "black";
        if (cname === "dsmall_cell") color = "yellow";
        
        var style = { background: color  };

        var d = document.getElementById("BigCell");
        TweenMax.to(d, 2, style );

        var element = document.getElementById("storage");
        element.innerHTML = no;
    }


    this.identify_cell = function(no) {
        var id = "sc_" + no;
        var el = document.getElementById(id);
        TweenMax.to(el, 2, { background:"red"});
    }


    this.multiple_cells = function(no) {
        var s = "";
        var cl;

        
        s += '<div class ="bracket">{</div>';

        s += '<div class = "cellcomplex">';

            s += '<div onClick = "v.identify_cell(81)" class = "cell" id="BigCell">';    
            s += '</div>';
            s += '<div id = "storage" class = "address">81</div>'
        
        s += '</div>';

        s += '<div class ="bracket">}</div>';




        for (var i = 0; i < no; i++) {

            var x = Math.random();
            if (x > 0.5) cl = "ssmall_cell";
            else         cl = "dsmall_cell";

            var nr = "";
            if (i < 10) nr = "0"
            nr += i;
            
            var id = "sc_" + i;
 

            s += '<div class = "small_cell">';
                s += '<div id = "' + id + '" class = "' + cl + '" onClick="v.updatePointer(' + i + ')"></div>';
                s += '<div class = "adr">' + nr + '</div>';

            s += '</div>';

        }


        var d = document.getElementById(div);
        d.innerHTML = s;

    }



    ////////////////////////// SHOWS A VARIABLE ///////////////////////////////////
    this.flicker = function() {

        TweenMax.to(".cell", 2, {boxShadow:"0px 0px 20px red", background:"black"});
        var offset = 0;

        var tl = new TimelineMax({  });
        tl.pause();
        for (var i = 0; i < 50; i++) {
            var col;
            var scale;
            var shadow;

            var n = i % 2;
            if (n === 0) { col = "black"; scale = 0.98; shadow = "0px 0px 20px red"; }
            else         { col = "yellow"; scale = 1; shadow = "0px 0px 20px green"; }
            
            offset += 0.2;
            tl.to(".cell", 0.1, { background: col, scale: scale, boxShadow: shadow }, offset );
        }


        tl.play();
    }

    this.single_cell = function() {
        var s = "";

        s += '<div class ="bracket">{</div>';

        s += '<div class = "cellcomplex">';

            s += '<div onClick = "v.flicker()" class = "cell">';    
            s += '</div>';
            s += '<div class = "address">001</div>'
        
        s += '</div>';

        s += '<div class ="bracket">}</div>';


        var d = document.getElementById(div);
        d.innerHTML = s;

    }

    // assignation

    this.act = 0;

    this.changeVar = function() {
        var s = "";
        var t = "";
        self.act ++;

        switch(self.act) {
            case 1:
             s = " x =";
             t = "[ x ]";
            break;

            case 2:
             s = " logo =";
             t = "[ logo ]";
            break;

            case 3:
             s = " egal =";
             t = "[ egal ]";
            break;

            case 4:
                s = '<span id = "var"> nova = egal</span></div>'; 
                t = "[ egal, nova ]";             
            break;
        }

        if (self.act < 4)
        {
        var el = document.getElementById("var");
        el.innerHTML = s;

        el = document.getElementById("varpointer");
        el.innerHTML = t;
        } else {
        var el = document.getElementById("var");
        el.innerHTML = s;

        el = document.getElementById("value");
        el.innerHTML = "";
        el = document.getElementById("varpointer");
        el.innerHTML = t;
        }
    

    }

    this.assignation = function() {
        var s = "";
        var s = "";
        s += '<div onClick = "v.changeVar()" class ="assign">';
            s += '<span class = "keyword">var</span>';
            s += '<span id = "var"> a =</span></div>';        
        
        s += '<span id = "value">';
            s += '<div class ="sbracket">{</div>';
            s += '<div id = "joker" class ="joker">17</div>';    
            s += '<div class ="sbracket">}</div>';
        s += '</span>';

        s += '<div class = "cell_section">';

        for (var i = 0; i < 20; i++) {
            s += '<div class = "small_cell">';
                if (i === 3) {
                    s += '<div class = "dsmall_cell"></div>';
                    }
                else          s += '<div class = "ssmall_cell"></div>';
                // s += '<div class = "adr">' + nr + '</div>';
            s += '</div>';
        }

        s += '<div id = "varpointer" class = "varpointer">[ a ]</div>';
        s += '</div>';



        var d = document.getElementById(div);
        d.innerHTML = s;

    }




    ///////////////// different types ///////////
    this.cct = 0;
    
    this.change = function() {
        self.cct ++;
        var s; 

        switch(self.cct) {
            case 1:
                console.log( Math.PI);
                s = "3.14";
            break;

            case 2:
              s = "'GO'";
            break;

            case 3:
              s = "a";
            break;

            case 4:
              s = "{ ... }";
            break;

            case 5:
                self.foward();
            break;

        }
    var el = document.getElementById("njoker");
    el.innerHTML = s;

    }


    this.different_types = function() {
        var s = "";
        s += '<div class ="bracket">{</div>';
        s += '<div id = "njoker" class ="njoker" onClick = "v.change()">17</div>';    
        s += '<div class ="bracket">}</div>';

        var d = document.getElementById(div);
        d.innerHTML = s;

    }

    // keyvalue
    this.key_value = function() {
        var s = "";

        s += '<div class = "key">key</div>';
        s += '<div class = "pointer">➞</div>';
        s += '<div class = "value">';
            s += '<div class = "valuetext">{value}</div>';
        s += '</div>';

        var d = document.getElementById(div);
        d.innerHTML = s;
    }





    //////////////////////////////////////////////
    this.checkKeys = function( ev ) {
        console.log( ev.code );
        switch( ev.code) {
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

    this.process = function() {
        console.log( self.pct );
        window.clearInterval( self.interval );
        switch( self.pct ) {
            case 1:
                self.single_cell();
                self.clear();
            break;

            case 2:
                self.multiple_cells();
            break;

            case 3:
                self.bit_system();
            break;

            case 4:
                self.interval = window.setInterval( self.unicode, 100);
            break;

            case 5:
                window.clearInterval( self.interval);
                self.different_types();
            break;

            case 6:
                self.assignation();
            break;
            case 7:
                self.key_value();
            break;

            case 8:
                self.charset = new CharSet(256, div);
            break;

        }
    }


    this.clear = function() {
        var el = document.getElementById("big");
        el.innerHTML = "";
    }

    this.intro = function() {
        var s = "Wunschmaschine";
        var el = document.getElementById("big");
        el.innerHTML = s;
    }



    this.init = function() {
        self.navigation();
        self.intro();
        
    }


    self.init();

}





var v; 

function startVar() {
    v = new Variables("Vars");
}




