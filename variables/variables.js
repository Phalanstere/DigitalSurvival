
function hilite(ev) {
    var x = parseInt(ev.id.substring(3, ev.id.length) );
    v.bitCode( x );
   } 

function Variables (div) {
    var self = this;

    this.counter = 0;


    //

    this.ct = 0;
    this.bit = 1;
    this.actual_range = 2;

    this.bitCode = function( no ) {
        var el = document.getElementById("bitCode");
        if ( !el) {
            var div = document.createElement("div");
            div.innerHTML = "";
            div.id = "bitCode";
            document.getElementsByTagName('body')[0].appendChild(div);
            el = document.getElementById("bitCode");
        }

        var s = '<div class = "Bits">ASCII-Code:' + no + '</div>';
        var bits = self.dec2bin(no);
        var bin = self.binary_string(bits, 8);

            s += '<div class = "bitwise">';

            for (var i = 0; i < 8; i++) {
                if (bin[i] === '0') {
                    s += '<div class = "tinyb"></div>';
                }
                else  s += '<div class = "tiny"></div>';
            }

            s += '</div>';
            s += '<div class = "token">';
            s += String.fromCharCode( no ); 
            s += '</div>';

            s += '<div class = "ascii">American Standard Code for<br/>Information Interchange</div>';
        s += '</div>';

        el.innerHTML = s;

    }



    this.paint_bit_cells = function() {

        var s = "";

        for (var i = 0; i < self.bit; i++) {
            var id = "bc_" + i;
            s += '<div id = "' + id + '" class = "bit"></div>';
        }

    var el = document.getElementById("store_first");
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

    this.binary_string =function(bin, bits) {
        if (bin.length < bits) {
            var diff = bits - bin.length;
            var c = '';
            for (var i = 0; i < diff; i++) {
                c += '0';
            }
            bin = c + bin;    
        }
        
        return bin;
    }


    this.increment = function() {
        var bin = self.dec2bin( self._number_ct );
        bin = self.binary_string(bin, 12);

        self._number_ct ++; 
        var s = '<div class = "unicode_small">';
        s += self._number_ct;
        s += '</div>';

        s += '<div class = "bin_small">';
        s += bin;
        s += '</div>';

        s += '<div class ="binlist">';

        var c = '';
        for (var i = 0; i < bin.length; i++) {

            if ( bin[i] === '0') {
                c += '<div class = "tiny_bin_empty"></div>';
            } else {
                c += '<div class = "tiny_bin_full"></div>';
            }
        }

        s += c;
        s += '</div>';

       self._number.innerHTML = s;
    }

    this.increment_float = function() {
        self._float_ct -= 0.13;
        var str = parseFloat(self._float_ct).toFixed(3);

        var bin = self.dec2bin( self._float_ct );
        var s = '<div class = "unicode_small">';
        s += str;
        s += '</div>';

        s += '<div class = "bin_small">';
        s += bin;
        s += '</div>';

       self._float.innerHTML = s;
    }

    this.change_color = function() {
        var c = self.mycolor;
        if ( c.red < 255) {
            c.red += 1;
        }
        else if (c.green < 255) {
            c.green += 1;
        } else {
            if (c.blue < 255) c.blue += 1;
        }
        
        return 'rgb(' + c.red + ',' + c.green + ',' + c.blue + ')';
    }

    this.colorHex = function() {
        var r = ConvertBase.dec2hex( self.mycolor.red);
        var g = ConvertBase.dec2hex( self.mycolor.green);
        var b = ConvertBase.dec2hex( self.mycolor.blue);

        if (self.mycolor.red < 10) r = '0' + r;
        if (self.mycolor.green < 10) g = '0' + g;
        if (self.mycolor.blue < 10) b = '0' + b;



        return '' + r + g + b;
    }

    this.color_bits = function(className, col) {
        var bin = self.dec2bin( col );
        bin = self.binary_string(bin, 8);


        var c = '<div class ="' + className + '">';

        for (var i = 0; i < bin.length; i++) {
            if ( bin[i] === '0') {
                c += '<div class = "tiny_bin_empty"></div>';
            } else {
                c += '<div class = "tiny_bin_full"></div>';
            }
        }
        
        c += '</div>';
        return c;
    }


    this.increment_color = function() {
        var col = self.change_color();
        var hex = self.colorHex();
        // var hex = "logo";



        var s = '<div class = "unicode_small">';
        s += hex;
        s += '</div>';

        s += '<div class = "bin_small">';

        s += self.color_bits("red_bits", self.mycolor.red);
        s += self.color_bits("green_bits", self.mycolor.green);
        s += self.color_bits("blue_bits", self.mycolor.blue);

        // s += bin;
        s += '</div>';


        self._color.innerHTML = s;
        self._color.style.background = col;
    }


    this.loc_bits = function(className, col) {
        var bin = self.dec2bin( col );
        bin = self.binary_string(bin, 8);


        var c = '<div class ="' + className + '">';

        for (var i = 0; i < bin.length; i++) {
            if ( bin[i] === '0') {
                c += '<div class = "ttiny_bin_empty"></div>';
            } else {
                c += '<div class = "ttiny_bin_full"></div>';
            }
        }
        
        c += '</div>';
        return c;
    }

    this.setLocation = function() {
        self.lang   += 0.0000001;
        self.lat    -= 0.00001;

        var langbits = parseInt( self.lang * 100000000) ;
        var latbits = parseInt( self.lat * 100000000) ;
        // var bin = self.dec2bin( langbits );
        var langbits_bin = self.loc_bits("langbits", langbits);
        var latbits_bin = self.loc_bits("latbits", latbits);

        var lang = parseFloat( self.lang).toFixed(8);
        var lat = parseFloat( self.lat).toFixed(8);

        var location = '<div id = "lang" class = "lang">' + lang + '</div>';
        location += langbits_bin;

        location += '<div id = "lat" class = "lat">' + lat + '</div>';
        location += latbits_bin;

        document.getElementById("map_info").innerHTML = location;

        var pos = {
            lat: self.lang,
            lng: self.lat
          };
        
        window.pos = pos;

        self.map.panTo(pos);
        // map.setCenter({lat: self.lat, lng: self.lang}); 

    }


    this.show_map = function() {
        self.lang = 52.5192;
        self.lat = 13.4061;

        var mapProp= {
            center:new google.maps.LatLng(self.lang, self.lat),
            zoom: 22,
            mapTypeId: google.maps.MapTypeId.SATELLITE,
            display: true
        };
        var map=new google.maps.Map(document.getElementById("gmaps"),mapProp);
        self.map = map;
        window.map = map;
        
        document.getElementById("map").style.display = "block";

        var location = '<div id = "lang" class = "lang">' + self.lang + '</div>';
        location += '<div id = "lat" class = "lat">' + self.lat + '</div>';
        document.getElementById("map_info").innerHTML = location;
    }


    this.trigger_color = function() {
        self.colorInterval = window.setInterval(this.increment_color, 50);
    }

    this.trigger_map = function() {
        self.show_map();
        self.mapInterval = window.setInterval(this.setLocation, 50);
    }


    this.roles = function() {
        if ( ! this.converter) this.converter = new ConvertBase();
        window.converter = this.converter;
        
        document.getElementsByClassName("CharSet")[0].remove();
        var s = '<div id = "Numbers"></div>';
        s += '<div id = "COLOR"></div>';

        var bc = document.getElementById("bitCode");
        if (bc) bc.remove();

        console.log(s);
        var d = document.getElementById(div);
        d.innerHTML = s;

        self._number = document.getElementById("Numbers");
        self._number_ct = 0;

        // self._float = document.getElementById("Float");
        // self._float_ct = 0;

        self._color = document.getElementById("COLOR");
        self.mycolor = {
            red: 0,
            green: 0,
            blue: 0
        };

        self.numberCounter = window.setInterval(this.increment, 60);
        // window.setInterval(this.increment_float, 400);
       
    }

    this.cleanupRoles = function() {
        clearInterval( self.mapInterval );
        clearInterval( self.colorInterval );
        clearInterval( self.numberCounter );

        self.removeRolePanels();
    }

    
    this.removeRolePanels = function() {
          var el = document.getElementById("COLOR");
          TweenMax.to(el, 3.2, {delay: 1, scale: 0.8, left: '120%', transformOrigin:"50% 50%"});

          var num = document.getElementById("Numbers");
          TweenMax.to(num, 4.2, {delay: 1.2, left: '-60%' });

          var map = document.getElementById("map");
          TweenMax.to(map, 2, {delay: 1.4, top: '120%',  
                               ease: 'Elastic.easeIn.config(0.2, 0.7)', 
                               onComplete: function(){
                                   el.remove();
                                   num.remove();
                                   map.remove();
                               } });

            setTimeout( self.theater, 3500);
    }




    this.theater = function() {
        var div = document.createElement("div");
        div.innerHTML = "Im Computer ist nichts, was es ist";
        div.id = "theater";
        document.getElementsByTagName('body')[0].appendChild(div);
        
        var theater = document.getElementById("theater");

        var tl = new TimelineMax({repeat:3, repeatDelay:1, onComplete: self.finale});
        //add a tween
        tl.add( TweenLite.to(theater, 1, {left: 0, ease: Elastic.easeOut.config(0.4, 0.3) }) );
        tl.add( TweenLite.to(theater, 1, { delay: 0.5, scale: 10.25,  top: '-10%', ease: Elastic.easeIn.config(0.7, 0.9) }) );
        tl.add( TweenLite.to(theater, 1, {delay: .6, left: '100%', onComplete: self.theaterSequence }) );
        

        tl.play();


    }

    this.theater_ct = 0;

    this.theaterSequence = function() {
        var theater = document.getElementById("theater");

        self.theater_ct ++;

        switch( self.theater_ct ) {
            case 1:
                theater.innerHTML = "Alles ist Rolle, Verkleidung, Spiel"
            break;

            case 2:
                theater.innerHTML = "Bits, die sich als Zahlen, Farben,<br/>was auch immer verkleiden";
            break;

            case 3:
                theater.innerHTML = "Zeichen, die die Welt bedeuten"   
            break;
        }
    }

    this.finale = function() {
        var Finale = new Cover();
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


        s += '<div id = "store_first" class ="store_first">';
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
            var cl = "tiny";
            if (c[i] === '0') cl = "tinyb";

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
        if (no === 666) {;

            var id = "heaven";
            var el = document.getElementById(id);

            var hell = document.getElementById("hell");



            var tl = new TimelineMax({  });
            tl.add("start", 0)

            tl.pause();

            tl.to(hell, 1.5, { fontSize: '300px',
                            color: "red", 
                            ease: Elastic.easeIn.config(0.2, 0.7),
                             scale: 2 }, "start" );

            tl.to(el, 1, { opacity:1, scale: 1.3 }, "start" );
            tl.to(el, 4.5, { 
                           rotation: 7200, transformOrigin:"left 50%",
                           left: '-260%',
                           ease: Elastic.easeIn.config(0.2, 0.7) 
            }, .3 );

            tl.add("end", 1)

            tl.to(hell, 4.5, { left: '400%', opacity: 0, rotation: -3900,
                             ease: Elastic.easeIn.config(0.2, 0.7) 
                           }, "end" );


            tl.play();

        }

    }


    

    this.multiple_cells = function(no) {
        var s = "";
        var cl;

        
        s += '<div class ="bracket">{</div>';

        s += '<div class = "cellcomplex">';

            s += '<div onClick = "v.identify_cell(666)" class = "cell black" id="BigCell">';    
            s += '</div>';
            s += '<div id = "hell" class = "address">666</div>'
        
        s += '</div>';

        s += '<div class ="bracket">}</div>';

        s += '<div id = "heaven" class = "heaven"><img src = "variables/heaven.png"/><div';




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

    //// 
    this.triggerVar = function(line) {
        switch( line ) {
            case 0:

            break;

            case 1:
               self.highlite_store(1);
            break;

            case 2:
                self.highlite_store(2);
            break;

            case 3:
                self.highlite_store(3);
            break;

            default:
                self.highlite_store(line);
            break;
        }
    }


    this.cstore = [];

    this.get_unicode = function(char) {
        var UTF_BITS = 16;

        function padLeftTo(string, padChar, numChars) {
            return (new Array(numChars-string.length+1)).join(padChar) + string;
        }

        function unicodeToBinary(char) {
            return char.split('').map(function(codepoint) {
                return padLeftTo(codepoint.charCodeAt(0).toString(2), 0, UTF_BITS);
            }).join('').split('').map(function(char){return parseInt(char)});
        }

        var x = unicodeToBinary(char);
        return x;

    }

    this.storage_string = '';
    
    this.set_storage_string = function() {
        self.storage_string = '';

        for(var i = 0; i < self.cstore.length; i++) {
            var c = self.cstore[i];
            self.storage_string += c.bits;
        }

        console.log( self.storage_string );
    }

    this.get_store_position = function(id) {
        var x = 0;
        for (var n = 0; n < id; n++) {
            x += self.cstore[n].length;
        }
        return x;
    }

    this.fill_store = function() {
        function text2Binary(string) {
            return string.split('').map(function (char) {
                return char.charCodeAt(0).toString(2);
            }).join('');
        }

        var a = self.dec2bin(77);
        a = self.binary_string(a, 32);
        var obj = {
            name: 'a',
            value: 77,
            bits: a,
            length: a.length,
            id: 1,
            position: 0
        }

        self.cstore.push( obj );

        var b = self.dec2bin(19);
        b = self.binary_string(b, 32);

        var objb = {
            name: 'b',
            value: 19,
            bits: b,
            length: b.length,
            id: 2,
            position: self.get_store_position(1)
        }
        self.cstore.push( objb );


        var uni = self.get_unicode('Logo');
        uni = uni.join("");

        var objc = {
            name: 'c',
            value: 'Logo',
            bits: uni,
            length: uni.length,
            id: 3,
            position: self.get_store_position(2)
        }
        self.cstore.push( objc );


        self.set_storage_string();

    }

    this.highligted = {
        position: 0,
        length: 0
    }

    this.reset_store = function() {
        self.highligted = {
            position: 0,
            length: 0
        }   
        var s = self.paint_store();
        var el = document.getElementById("store");
        el.innerHTML = s;     
    }


    this.highlite_store = function(no) {
        var obj = self.cstore[no-1];
        self.highligted = {
            position: obj.position,
            length: obj.length
        }

        console.log( self.highligted );
        var s = self.paint_store();
        var el = document.getElementById("store");
        el.innerHTML = s;
    }

    this.paint_store = function() {
        var s = '';

        var beg = self.highligted.position;
        var end = self.highligted.position + self.highligted.length;

        console.log("Ende steht bei " + end);

        for (var i = 0; i < 1024; i++) {
            var id = "mc_" + i;

            if (i < self.storage_string.length) {
                var c = self.storage_string[i];

                if (i >= beg && i < end) {
                    if (c === '0') s += '<div id = "' + id + '" class = "MiniCell empty hilite"></div>';
                    else  s += '<div id = "' + id + '" class = "MiniCell full hilite"></div>';
                }
                else 
                {
                if (c === '0') s += '<div id = "' + id + '" class = "MiniCell empty"></div>';
                else  s += '<div id = "' + id + '" class = "MiniCell full"></div>';
                }


            }
            else s += '<div id = "' + id + '" class = "MiniCell"></div>';
        }
        
        return s;
    }



    /*
    this.change_var = function(id) {
        function getValue(v) {
            if (typeof v === 'number') return v;
            if (typeof v === 'string') return ('"' + v + '"');
        }

       var x = 'line_' + id;
       var el = document.getElementById(x);
       var variable = '<span class = "variable">var </span>';

       var obj = self.cstore[id];
       var c = '';
       
       c += variable;
       c += obj.name;
       c += ' = ';

      c += '<input id = "actual" type="text" placeholder="' + getValue(obj.value) + '" />';
       el.innerHTML = c;


    }
    */

    this.recalculate_store = function() {
        var pos = 0;

        for (var i = 0; i < self.cstore.length; i++) {
            var obj = self.cstore[i];
            obj.position = pos;
            pos += obj.length;

        }
    }

    this.change_var = function(id ) {
        var obj = self.cstore[id];
        var value = prompt("Please enter the new value", obj.value);

        if (value != null) {
            var t = typeof obj.value;



            if (t === 'string') {
                obj.value = value;
                var uni = self.get_unicode(value);
                uni = uni.join("");
                obj.bits = uni;
                obj.length = uni.length;
            }

            if ( t === 'number') {
                value = parseInt( value );
                var a = self.dec2bin(value);
                a = self.binary_string(a, 32);
                obj.value = value;
                obj.bits = a;
            }

            self.recalculate_store();
            self.set_storage_string();
            var s =  self.paint_store();

            var el = document.getElementById('store');
            el.innerHTML = s;

            s = self.paint_variables();
            el = document.getElementById("listing");
            el.innerHTML = s;
        }
    }
 
    this.paint_variables = function() {
        /*
        s = '<div onclick="v.reset_var(1)" onmouseout = "v.reset_store()" onmouseover = "v.triggerVar(1)" class = "line" id="line_a">var a = 77;</div>';
        s += '<div onclick="v.reset_var(2)" onmouseout = "v.reset_store()" onmouseover = "v.triggerVar(2)" class = "line" id="line_b">var b = 19;</div>';
        s += '<div onclick="v.reset_var(3)" onmouseout = "v.reset_store()" onmouseover = "v.triggerVar(3)" class = "line" id="line_c">var c = "LOGO";</div>';
        */
        
        function getValue(v) {
            if (typeof v === 'number') return v;
            if (typeof v === 'string') return ('"' + v + '"');
        }
        
        var divin = '<div class = "line"';
        var divout = '</div>';
        
        var mouseoverIn = ' onmouseover = "v.triggerVar(';
        var mouseoverOut = ')" ';

        var onclickIn  = 'onclick="v.change_var(';
        var onclickOut = ')" ';


        var mouseout = 'onmouseout = "v.reset_store()"';

        var variable = '<span class = "variable">var </span>';


        var c = '';

        for (var n = 0; n < self.cstore.length; n++) {
            var obj = self.cstore[n];
            var id = n+ 1;

            c += divin;
            c += ' id = "line_' + n + '" ';
            c += mouseoverIn;
            c += id;
            c += mouseoverOut;
            c += mouseout;

            c += onclickIn;
            c += n;
            c += onclickOut;

            c += '>';
            c += variable;
            c += obj.name;
            c += ' = ';
            c += getValue(obj.value);
            c +=';'
            c += divout;

        }
        return c;
    }


    this.addStoreEntry = function(event) {
        console.log(event );
        if (event.key === 'Enter') {
            var d = event.target.value; 


            var marker = d.search(" ");
            d = d.substring(4, d.length);
            d = d.replace( new RegExp(" ", 'g'), "");
            d = d.replace(";", "");
            d = d.replace( new RegExp('"', 'g'), '');

            var v = d.split("=");
            var id = self.cstore.length + 1;
            var value = v[1];



            var reg = /^\d+$/;
            if (value.search(reg) !== -1) {
                value = parseInt(value);
            }

            var bits = null;

            if ( typeof value === 'number') {
                bits = self.dec2bin(value);
                bits = self.binary_string(bits, 32);
            }
            else {
                var uni = self.get_unicode(value);
                bits = uni.join("");
            }

            var obj = {
                name: v[0],
                value: value,
                id: id,
                bits: bits,
                length: bits.length,
                position: 0
            }

            self.cstore.push(obj);
            self.update_store();

        }
        
    }


    this.update_store = function() {
        self.recalculate_store();
        console.log( self.cstore );

        self.set_storage_string();
        var s =  self.paint_store();

        var el = document.getElementById('store');
        el.innerHTML = s;

        s = self.paint_variables();
        el = document.getElementById("listing");
        el.innerHTML = s;
    }


    this.computer_store = function() {
        /*
            var a = 77;
            var b = 19;
            var c = 'LOGO';

        */
        self.fill_store();
        console.log( self.cstore);

        var s =  self.paint_store();

        var div = document.createElement("div");
        div.innerHTML = s;
        div.id = "store";
        div.className = "store";
        document.getElementsByTagName('body')[0].appendChild(div);

        var br = '<br />';

        s = self.paint_variables();


        div = document.createElement("div");
        div.innerHTML = s;
        div.id = "listing";
        div.className = "listing";
        document.getElementsByTagName('body')[0].appendChild(div);

        div = document.createElement("div");
        div.innerHTML = '<input onkeypress = "v.addStoreEntry(event)" id = "AddEntry" type= "text" />';
        div.id = "store_entry";
        div.className = "store_entry";
        document.getElementsByTagName('body')[0].appendChild(div);
            
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
            s += '<div class = "address">01</div>'
        
            
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

            case 'ArrowUp':
                self.forward();
            break;

            case 'ArrowDown':
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
            case 0:
            break;

            case 1:
                self.single_cell();
                self.clear();
            break;

            case 2:
                self.multiple_cells();
            break;

            case 3:
                self.identify_cell(666); 
            break;
                    
            case 4:
                self.bit_system();
            break;

            case 5:
                self.interval = window.setInterval( self.unicode, 100);
            break;

            case 6:
                window.clearInterval( self.interval);
                self.different_types();
            break;

            case 7:
                self.assignation();
                self.store_cleaner();
            break;

            case 8:
                self.cstore = [];
                self.cleanup_stage("Vars");
                self.computer_store();
            break;

            case 9:
                self.cleanup_stage("store", true);
                self.cleanup_stage("store_entry", true);
                self.cleanup_events("line");
                self.key_value();
            break;

            case 10:
                self.cleanup_stage("listing");
                self.store_cleaner();
                self.cstore = [];
                self.charset = new CharSet(256, div);
            break;


            case 11:
                self.roles();
                self.map_cleaner();
            break;

            case 12:
                self.trigger_color();
            break;

            case 13:
                self.trigger_map();
            break;

            case 14:
                self.cleanupRoles();
            break;

            case 15:
                self.next_lesson();
            break;

            case 16:
                self.open_next_lesson();   
            break;

        }
    }


    this.open_next_lesson = function() {
        window.open("http://ludicmedia.de/Courses/DigitalSurvival/functions.html");
    }


    this.next_lesson = function() {
        var s = '<div onclick = "v.open_next_lesson()" class ="NEXT">';
        s += "▶";
        s += '</div>';
        var stage = document.getElementById("Vars");
        stage.innerHTML = s;

        document.getElementById("theater").remove();

    }


    this.map_cleaner = function() {
        document.getElementById("map").style.display = "none";
    }

    this.store_cleaner = function() {
        self.cstore = [];
        self.cleanup_stage("store", true);
        self.cleanup_stage("store_entry", true);
        self.cleanup_stage("listing", true);
    }

    this.cleanup_events = function(className) {
        var c = document.getElementsByClassName(className);
        for (var i = 0; i < c.length; i++) {
            var el = c[i];
            el.removeAttribute('onclick');
            el.removeAttribute('onmouseover');
            el.removeAttribute('onmouseout');
        }
    }

    this.cleanup_stage = function(id, remove) {
        var stage = document.getElementById(id);
        if (stage) {
            stage.innerHTML = '';
            if (remove) stage.remove(); 
        }

    }


    this.clear = function() {
        var el = document.getElementById("big");
        if (el) el.innerHTML = "";
    }

    this.intro = function() {
        var s = '<div class = "big"></div>';
        var el = document.getElementById(div);
        if (el) el.innerHTML = s;
    }



    this.init = function() {
        self.navigation();
        self.intro();
        
    }


    self.init();

}





var v; 

function startVar() {
    var DynamicCover = new Cover();
    v = new Variables("Vars");
    // v.computer_store();
}




