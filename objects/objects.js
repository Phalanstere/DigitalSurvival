if (typeof console  != "undefined") 
    if (typeof console.log != 'undefined')
        console.olog = console.log;
    else
        console.olog = function() {};

console.log = function(message) {
    console.olog(message);
    var el = document.getElementById("consoleStatus");
    if (el) el.innerHTML = message;
};
console.error = console.debug = console.info =  console.log



function Objekt( div ) {
    var self = this;



    this.process = function() {
        switch( self.pct ) {
            case 0:
                self.intro();
            break;
               
            case 1:
                self.populate_circles();
            break;

            case 2:
                self.chaos();

            break;

            case 3:
                self.order();
            break;

            case 4:
                self.changing_attributes();
            break;

            case 5:
                self.particles();
            break;

            case 6:
                self.ace();
            break;

            case 7:
                self.array_remembrance(1);
            break;

            case 8:
                self.array_remembrance(2);
            break;
            
            case 9:
                self.array_remembrance(3);
            break;

            case 10:
                self.array_remembrance(4);
            break;

            case 11:
                self.array_remembrance(5);
            break;

            case 12:
                self.show_car();
            break;

            case 13:
                self.interaction();
            break; 

            case 14:
                self.switcher();
            break;


            case 15:
                self.gas_und_bremse();
            break;


        }

    }


    this.checkKeys = function( ev ) {
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




    this.hello = function() {
        alert("Hallo Welt");
    }


    this.call = function(ev) {
        alert( ev.value);
    }

    this.input = function() {
        var s = '<input onChange = "op.call(this)" class = "Typer" type = "text"/>';
        var el = document.getElementById("Input");
        el.innerHTML = s;
    }



    this.most_simple_command = function() {
        var s = "";
        var cl = '</div>';
        s += '<div class = "function">alert' + cl;
        
        s += '<div class = "BigBracket">(' + cl;
        s += '<div id = "Input" class = "Input">"Hallo Welt"' + cl;
        s += '<div class = "BigBracket">);' + cl;
        
        
        
        var el = document.getElementById(div);
        el.innerHTML = s;      

        setTimeout( self.hello, 1000);
    }




    this.random_positions = function( list) {
        var no = 50;
        var radius = 700;

        for (var i = 0; i < list.length; i++) {
            var item = list[i];
            for (var j = 0; j < 200; j++) {

                var x = parseInt( Math.random() * radius ) + 100;
                var y = parseInt( Math.random() * radius ) + 100;

                var rotation = parseInt( Math.random() * 90 ) - 45;
                var opacity = Math.random().toFixed(2);


                var name = item + "key" + j;
                var el = document.getElementById( name );
                if (el) {
                  self.elements.push( el );

                   delay = j * 0.01;
                   TweenMax.to(el, 0.17, { x: x, y: y, rotation: rotation, delay: delay, opacity: opacity });  
                }

                // TweenMax.to(el, 0.3, { background: "pink", scale: 1 });               
            }


        }
    }


    this.elements = [];

    this.circle = function( name ) {
        var el = document.getElementById(name);

        var it = 0;
 
        for ( key in el)  {
            if (it < 200) {

            var e = document.createElement("div");
            e.className = "char";
            e.id = name + "key" + it;
            e.innerHTML = key;
            document.getElementById(name).appendChild(e);
            }
 
            it ++;
        }
    }


    this.particles = function() {

    }


    this.demo = function() {
        var br = '<div class = "bracket">';
        var ediv = '</div>';
        var b = '</br>';

        var obj = '<div class = "objekt">';
        var s = "";

        s += '<div id = "exempel" class = "exempel">';
            s += br + '{' + ediv;
            s += obj;
                s += "var a: 17" + b;
                s += "var b: 32" + b;
                s += "etc."
            s += ediv;

            s += br + '}' + ediv;
        s += ediv;

        return s;
    }




    this.test = function() {
        var myCode = self.editor.getSession().getValue();
        eval( myCode );
    }



    this.array_remembrance = function(input) {
        
        editor = self.editor;
        ed = editor;

        var s = "";
        var nl = "\n\t";

        switch(input) {
            case 1:
                s = nl + "var list = [];";
            break;

            case 2:
                s =  nl + nl + "list.push(1); // Das ist eine Funktion";
                s += nl + "list.push(7);"
                s += nl + "list.shift();";
            break;

            case 3:
                s = nl + nl + "console.log( list );";
            break;


            case 4:
                s = nl + "console.log(  typeof( list ) );";
            break;


            case 5:
               
            break;

        }


        editor.session.insert(editor.getCursorPosition(), s );

    }


    this.show_car = function() {
        var s = '<img id = "auto" src = "objects/auto.gif"/>';
        var el = document.getElementById("exempel");
        el.innerHTML = s;
    }


    this.interaction = function() {

        var editor = self.editor;
        editor.setValue("");
        
        var s = '<div class ="subtitle">Interaktion<br>Listener</div>';
        var el = document.getElementById("exempel");
        el.innerHTML = s;


        var nl = "\n";
        var nlt = "\n\t";

        editor.session.insert(editor.getCursorPosition(), "/*" );
        editor.session.insert(editor.getCursorPosition(), nl + nl + nl );
        editor.session.insert(editor.getCursorPosition(), "*/" );


        s = 'window.addEventListener("keydown", checkKeys )';
        editor.session.insert(editor.getCursorPosition(), nl + nlt + s );

    }



    /*
    this.checkKeys = function( ev ) {
        switch( ev.code) {
            case 'ArrowRight':
                self.forward();
            break;

            case 'ArrowLeft':
                self.backward();
            break;
        }

    }
    */


    this.switcher = function() {
 
        var editor = self.editor;

        editor.setValue("");

        var nl      = "\n";
        var nlt     = "\n\t";
        var nltt    = "\n\t\t";
        var nlttt   = "\n\t\t\t";

        editor.session.insert(editor.getCursorPosition(), "/*" );
        editor.session.insert(editor.getCursorPosition(), nl + nl + nl );
        editor.session.insert(editor.getCursorPosition(), "*/" );

        s = 'function checkKeys(ev) {';
        editor.session.insert(editor.getCursorPosition(), nl + nl + s );

        var s1 = 'switch( ev.code) {';
        var s2 = 'case \'ArrowUp\':';
        var s3 = 'break;';

        var s4 = 'case \'ArrowDown\':';
        var s5 = 'break;';

        editor.session.insert(editor.getCursorPosition(), nl + nl + nlt + s1 );
        editor.session.insert(editor.getCursorPosition(), nl + nltt + s2 );
        editor.session.insert(editor.getCursorPosition(), nlttt + "//tu was" );
        editor.session.insert(editor.getCursorPosition(), nltt + s3 );



        editor.session.insert(editor.getCursorPosition(), nl + nltt + s4 );
        editor.session.insert(editor.getCursorPosition(), nlttt + "//tu was" );
        editor.session.insert(editor.getCursorPosition(), nltt + s5 );


        editor.session.insert(editor.getCursorPosition(), nl + nlt + '}' );
        editor.session.insert(editor.getCursorPosition(), nl + '}' );

        s = 'window.addEventListener("keydown", checkKeys )';
        editor.session.insert(editor.getCursorPosition(), nl + nl + s );

    }


    this.gas_und_bremse = function() {
        var editor = self.editor;

        editor.setValue("");

        var nl      = "\n";
        var nlt     = "\n\t";
        var nltt    = "\n\t\t";
        var nlttt   = "\n\t\t\t";

        editor.setValue = "";

        editor.session.insert(editor.getCursorPosition(), "/*" );
        editor.session.insert(editor.getCursorPosition(), nl + nl + nl );
        editor.session.insert(editor.getCursorPosition(), "*/" );

        s = 'function checkKeys(ev) {';
        editor.session.insert(editor.getCursorPosition(), nl + nl + s );

        var s1 = 'switch( ev.code) {';
        var s2 = 'case \'ArrowUp\':';
        var s3 = 'break;';

        var s4 = 'case \'ArrowDown\':';
        var s5 = 'break;';

        editor.session.insert(editor.getCursorPosition(), nl + nl + nlt + s1 );
        editor.session.insert(editor.getCursorPosition(), nl + nltt + s2 );
        editor.session.insert(editor.getCursorPosition(), nlttt + 'alert("Gib Gas!");');
        editor.session.insert(editor.getCursorPosition(), nltt + s3 );



        editor.session.insert(editor.getCursorPosition(), nl + nltt + s4 );
        editor.session.insert(editor.getCursorPosition(), nlttt + 'alert("Bremsen!");');
        editor.session.insert(editor.getCursorPosition(), nltt + s5 );


        editor.session.insert(editor.getCursorPosition(), nl + nlt + '}' );
        editor.session.insert(editor.getCursorPosition(), nl + '}' );

        s = 'window.addEventListener("keydown", checkKeys )';
        editor.session.insert(editor.getCursorPosition(), nl + nl + s );
    }





    this.ace = function() {

        var el = document.getElementById( div );
        el.innerHTML = "";

        var s = '<div id = "editor">'
        s += '</div>';

        s += '<div id = "half">';
            s += self.demo();
        s += '</div>';

        s += '<div class = "console">';

            s += '<div id = "consoleStatus" class = "consoleStatus"></div>'

            s += '<div onClick = "op.test()" class = "button" id = "submit">';
                s += '<div class ="Imprint">TEST</div>';
            s += '</div>';

         s += '</div>';

         

        var el = document.getElementById( "full" );
        el.innerHTML = s;

        
        var editor = ace.edit("editor");
        editor.setTheme("ace/theme/monokai");
        editor.getSession().setMode("ace/mode/javascript");

        editor.setOptions({
            fontFamily: "monospace",
            fontSize: "15pt"
        });
        
        var nl = "\n";
        var nlt = "\n\t";

        var s = nl + nl + nl;

        editor.session.insert(editor.getCursorPosition(), "/*" );
        editor.session.insert(editor.getCursorPosition(), nl + nl + nl );
        editor.session.insert(editor.getCursorPosition(), "*/" );

        self.editor = editor;

    }


    this.changing_attributes = function () {
        
        console.log("CHANGE");
        var a = document.getElementById("circleA");
        TweenMax.to(a, 15, { width: 300, height: 300, boxShadow: "2px 2px 200px black" }); 
        
        TweenMax.to(a, 6, { delay: 15, boxShadow: "2000px 1080px 200px black" }); 


        var b = document.getElementById("circleB");
        var tl = new TimelineMax({repeat: 3});  

        tl.to(b, 0.3, {background: "rgba(0, 255,255, 0.7", scale: 1.08, repeat: 9, yoyo:true})
        tl.to(b, 0.09, { scale: 0.9, repeat: 22, yoyo:true });
        tl.to(b, 1, { scale: 1.5, background: "gold"});

        tl.to(b, 3, { scale: 1, borderRadius: "10%" });
        tl.to(b, 0.7, {background: "rgba(0, 255,255, 0.7" });
        tl.to(b, 3, { borderRadius: "50%"});

        tl.play();

    }



    this.order = function() {
 
        function done() {
            alert("ist erledigt");
        }

        var elements = document.getElementsByClassName("char");
            while(elements.length > 0){
            elements[0].parentNode.removeChild(elements[0]);
        }
        
        var el = document.getElementById("circleA");
        TweenMax.to(el, 0.3, { border: "solid 20px black" });  

        el = document.getElementById("circleB");
        TweenMax.to(el, 0.3, { border: "solid 20px black" });  
    }


    this.chaos = function() {
        self.circle("full");
        self.random_positions(["full"]);
    }


    this.populate_circles = function() {
        self.circle("circleA");
        self.circle("circleB");

        self.random_positions(["circleA", "circleB"] );
    }



    this.intro = function() {

        var s = "";

        s += '<div class = "big">Objekte</div>';
        var el = document.getElementById(div);
        el.innerHTML = s;
    }


    this.car = function() {
        var C = new Car(200);
        volts = new Speedometer ('volts', {theme: 'default'});
        volts.draw ();
        volts.controls = new Controls ('volts-controls', {speedometer: volts});
    }


    this.init = function() {
        self.navigation();
        self.intro();
        self.car();

    }


    self.init();

}


var ed;

var op;

function startObjects() {
    op = new Objekt("Vars");
}