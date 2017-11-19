function coffee(money) {
    alert("Kaffee ist da");
}


if (typeof console  != "undefined") 
    if (typeof console.log != 'undefined')
        console.olog = console.log;
    else
        console.olog = function() {};

console.log = function(message) {
    console.olog(message);
    var el = document.getElementById("status");
    el.innerHTML = message;
};
console.error = console.debug = console.info =  console.log




function Functions( div ) {
    var self = this;



    this.process = function() {
        switch( self.pct ) {
            case 0:
                self.intro();
            break;

            case 1:
                self.show_schema();
            break;

            case 2:
                self.machine_elements();
            break;

            case 3:
                self.return_something();
            break;

            case 4:
                self.something();
            break;
               
            case 5:
                self.semicolon(); 
            break;

            case 6:
                self.return_null();
            break;

            case 7:
                self.big_slot();
            break;

            case 8:
                self.parameters();
            break;

            case 9:
                self.written_parameters();  
            break;

            case 10:
                self.money();  
            break;

            case 11:
                self.execute();
            break;

            case 12:
                self.call();
            break;


            case 13:
                self.success();
            break;

            case 14:
                self.alert_function();
            break;

            case 15:
                self.problem();
            break;

            case 16:
                self.init_ace();
            break;

            case 17:
                self.introduce_console();
            break; 

            case 18:
                self.what_if();
            break;

            case 19:
                self.equation();
            break;

            case 20:
                self.equation2();
            break;

            case 21:
                self.equation3();
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


    this.machine_elements = function() {
       var el = document.getElementById("function");
       TweenMax.to(el, 2, { left: "-400px",
                            top: "100px",
                            fontSize: "30px",
                            transform: "rotate(0deg)"

                           });

       el = document.getElementById("slot");
       TweenMax.to(el, 2, { left: "-260px",
                            top: "110px",
                            fontSize: "30px",
                            color: "black",
                            transform: "rotate(0deg)"

                           });


       el = document.getElementById("type");
       TweenMax.to(el, 2, { left: "-500px",
                            top: "118px",
                            fontSize: "22px",
                            color: "blue",
                           });


       el = document.getElementById("Opening");
       TweenMax.to(el, 2, { left: "-430px",
                            top: "160px",
                            fontSize: "32px",
                            fontWeight: "800",
                            color: "black",
                            textShadow: "2px 2px 2px darkslategray;"
                           });



       el = document.getElementById("Closing");
       TweenMax.to(el, 2, { left: "-430px",
                            top: "280px",
                            fontSize: "32px",
                            fontWeight: "800",
                            color: "black",
                            textShadow: "2px 2px 2px darkslategray;"
                           });

    }


    this.return_something = function() {
       var el = document.getElementById("return");
       TweenMax.to(el, 1.2, { left: "-514px",
                            top: "-200px",
                            fontSize: "30px",
                            fontSize: "18px",
                            color: "blue",
                            textAlign: "left"
                           });  




    }


    this.something = function() {
       var el = document.getElementById("something");
       TweenMax.to(el, 0.5, { left: "-440px",
                            top: "-200px",
                            fontSize: "18px",
                            opacity: 1
                           } );  
    }



    this.semicolon = function() {
       var el = document.getElementById("semicolon");
       TweenMax.to(el, 0.2, { 
                            color: "rgba(0,0,0,1)",
                            fontSize: "18px",
                            scale: 1,
                            top: 0,
                            ease:Bounce.easeOut
                            } );  
    }



    this.return_null = function() {
        var el = document.getElementById("something");
        el.innerHTML = '<span class = "protected"/>null;';
    }


    this.big_slot = function() {

       var el = document.getElementById("big_slot");

       TweenMax.to(el, 0.2, { 
                            opacity: 1,
                            } );


    }



    this.parameters = function() {

        var el = document.getElementById("big_slot");
        var s = '<div class = "bracket">(</div>';
        
        // s += '<div class = "params">param1' + comma + ' param2</div>';

        s += '<span class = "cell"></span>';          
        s += '<span class = "cell"></span>';


        s += '<div class = "bracket">)</div>';


        el.innerHTML = s;

    }


    this.written_parameters = function() {

        var comma = '<span class = "comma">,</span>';
        
        var s = '<div class = "bracket">(</div>';
        s += '<div class = "params">param1' + comma + ' param2</div>';

        s += '<div class = "bracket">)</div>';

        var el = document.getElementById("big_slot");
        el.innerHTML = s;

    }


    this.money = function() {

        var comma = '<span class = "comma">,</span>';
        
        var s = '<div class = "bracket">(</div>';
        s += '<div class = "paramsBig">money</div>';

        s += '<div class = "bracket">)</div>';

        var el = document.getElementById("big_slot");
        el.innerHTML = s;


        el = document.getElementById("slot");

        s = '<div class = "bracketS">(</div>';
        s += '<div class = "paramsSmall">money</div>';
        s += '<div class = "bracketS">)</div>';

        el.innerHTML = s;


    }


    this.get_split = function( txt, name) {
        var s = "";
        var open = '<span class = "' + name + '">';
        var close = '</span>';

        for (var i = 0; i < txt.length; i++) {
            var t = open + txt[i] + close;
            s += t;
        }

        return s;
    }



    this.execute = function() {
        var s = "Wenn Sie eine Funktion geschrieben haben, haben Sie einen Kaffeeautomaten aufgestellt, aber der Kaffee ist noch immer nicht da.";
        var tl =  new TimelineMax();

        var x = self.get_split(s, "logo");
        var el = document.getElementById("status");
        el.innerHTML = x;

        var chars = document.getElementsByClassName("logo");
        // TweenMax.staggerTo(chars, 1, {rotation:360, color:"red"}, 0.5);

        tl.staggerFrom(chars,0.01, {opacity:0, ease:Power1.easeIn}, 0.02, "+=0.1");
    }


    this.call = function() {
        var s = "Die Funktion muss aufgerufen werden - und zwar so: ";
        var tl =  new TimelineMax();
        var x = self.get_split(s, "logo");
        var el = document.getElementById("status");
        el.innerHTML = x;

        var chars = document.getElementsByClassName("logo");



        tl.staggerFrom(chars,0.01, {opacity:0, ease:Power1.easeIn}, 0.02, "+=0.1");

        window.setTimeout( self.formula, 3000);

    }



    this.formula = function() {
        var cd = '</div>';

        var s = '<div class = "FormulaC">';
            s += '<div class ="Coffee">Coffee' + cd;

            s += '<div class = "BigBracket">(' + cd;
            s += '<div class = "CoffeeInput">1' + cd;


            s += '<div class = "BigBracket">);' + cd;

        s += cd;

        var el = document.getElementById("formula");
        el.innerHTML = s;

    }


    this.show_schema = function() {

        var comma = '<span class = "comma">,</span>';

        var s = "";
        s += '<div class = "machine">';
            
            s += '<div class = "slotarea"></div>';
            s += '<div class = "slot">()</div>';
            s += '<div id = "slot" class = "slot">()</div>';
            
    
                s += '<div class = "interior">';

                s += '</div>';
            s += '<div class = "return">';

                s += '<span id = "return" class = "returnOverlay">return</span>';
                s += '<span id = "something" class = "returnOverlay">something';

                    s += '<span id = "semicolon">;</span>';

                s += '</span>'
            
            s += 'return</div>';



            s += '<div class = "nullreturn">$</div>';
            
            s += '<div class = "type">function</div>';
            s += '<div id = "type" class = "type">function</div>';


            s += '<div class = "name">Coffee</div>';
            s += '<div id = "function" class = "name">Coffee</div>';

            s += '<div class = "openingBracket">{</div>';
            s += '<div id = "Opening" class = "openingBracket">{</div>';

            s += '<div class = "closingBracket">}</div>';
            s += '<div id = "Closing" class = "closingBracket">}</div>';


        s += '</div>';

        s += '<div id = "big_slot">';
            s += '<div class = "bracket">(</div>';
            
            // s += '<div class = "params">param1' + comma + ' param2</div>';


            s += '<div class = "bracket">)</div>';
        s += '</div>';




        var el = document.getElementById(div);
        el.innerHTML = s;
    }


    this.intro = function() {
        var s = "";
        s += '<div class = "big">Funktionen</div>';
        var el = document.getElementById(div);
        el.innerHTML = s;
    }



    this.success = function() {
        alert("Kaffee ist da");
    }


    this.call = function(ev) {
        if (ev.value === "coffee") alert( coffee );
        else alert( ev.value );
    }


    this.problem = function() {
        var s = "Wie kann man sicher sein, dass der Kunde genug Geld eingeworfen hat?";
        var tl =  new TimelineMax();
        var x = self.get_split(s, "logo");
        var el = document.getElementById("status");
        el.innerHTML = x;

        var chars = document.getElementsByClassName("logo");
        tl.staggerFrom(chars,0.01, {opacity:0, ease:Power1.easeIn}, 0.02, "+=0.1");
    }


    this.test = function() {
        var myCode = self.editor.getSession().getValue();
        eval( myCode );
    }



    this.init_ace = function() {

        var s = '<div id = "editor">'

        s += '</div>';

        s += '<div class = "console">';

            s += '<div onClick = "fn.test()" class = "button" id = "submit">';
                s += '<div class ="Imprint">TEST</div>';
            s += '</div>';

         s += '</div>';

        var el = document.getElementById( div );
        el.innerHTML = s;

        
        var editor = ace.edit("editor");
        editor.setTheme("ace/theme/monokai");
        editor.getSession().setMode("ace/mode/javascript");

        editor.setOptions({
            fontFamily: "monospace",
            fontSize: "18pt"
        });
        
        editor.session.insert(editor.getCursorPosition(), "function coffee( money)");
        editor.session.insert(editor.getCursorPosition(), "\n{");

        editor.session.insert(editor.getCursorPosition(), '\n\talert("Hier ist der Kaffee");');

        editor.session.insert(editor.getCursorPosition(), "\n}");

        editor.session.insert(editor.getCursorPosition(), "\n\n//Das ist ein Kommentar");
        editor.session.insert(editor.getCursorPosition(), "\n\ncoffee(1)");


        this.editor = editor;

    }



    this.show_console = function() {
        var s = "";
        var cl = '</div>';
        s += '<div onClick = "fn.input()" class = "FormulaC">console.log' + cl;
        
        s += '<div class = "BigBracket">(' + cl;
        s += '<div id = "Input" class = "Input">input' + cl;
        s += '<div class = "BigBracket">);' + cl;

        var el = document.getElementById("formula");
        el.innerHTML = s;

        TweenMax.to(el, 0, { 
                            opacity: 1
                           });

        TweenMax.to(el, 5, { 
                            opacity: 0
                           });


    }



    this.what_if = function() {
        var s = 'console.log("da hat jemand Geld eingeworfen");';
        var t = 'else console.log("falsche Eingabe");';


        // editor.session.insert(editor., "\n\n//Das ist ein Kommentar");
         var editor = self.editor;
         editor.gotoLine(2, 5, true);
         editor.session.insert(editor.getCursorPosition(), "\n\tif( money ) {");
         editor.session.insert(editor.getCursorPosition(), "\n\t\t" + s );         
         editor.session.insert(editor.getCursorPosition(), "\n\t\t}");
         editor.session.insert(editor.getCursorPosition(), "\n\t" + t );        

    }


    this.equation = function() {

        var s = '<div class = "Explanation">';
        s += 'Ein Gleichheitszeichen (<span class = "comma2">=</span>) ist eine Zuweisung, also eigentlich <span class = "comma2">⇨</span>';
        s += '</div>';

        var el = document.getElementById("formula");

        el.innerHTML = s;


        TweenMax.to(el, 0, { 
                            opacity: 1
                           });

                           

    }


    this.equation2 = function() {
        var s = '<div class = "Explanation">';
        s += 'Bei zwei Gleichheitszeichen (<span class = "comma2">==</span>) wird die Identität eines Wertes verglichen</span>';
        s += '</div>';

        var el = document.getElementById("formula");

        el.innerHTML = s;
    }


    this.equation3 = function() {
        var s = '<div class = "Explanation">';
        s += 'Bei drei Gleichheitszeichen (<span class = "comma2">===</span>) werden Wert und Typ verglichen</span>';
        s += '</div>';

        var el = document.getElementById("formula");

        el.innerHTML = s;
    }




    this.introduce_console = function() {
        var s = "Vielleicht angenehmer als der alert ist der Log durch die Konsole";
        var tl =  new TimelineMax();
        var x = self.get_split(s, "logo");
        var el = document.getElementById("status");
        el.innerHTML = x;


        self.show_console();

        var editor = self.editor;
        editor.setValue("");
        editor.session.insert(editor.getCursorPosition(), "function coffee( money)");
        editor.session.insert(editor.getCursorPosition(), "\n{");

        editor.session.insert(editor.getCursorPosition(), '\n\tconsole.log("Hier ist der Kaffee");');

        editor.session.insert(editor.getCursorPosition(), "\n}");

        editor.session.insert(editor.getCursorPosition(), "\n\n//Das ist ein Kommentar");
        editor.session.insert(editor.getCursorPosition(), "\n\ncoffee(1)");


        var chars = document.getElementsByClassName("logo");
        tl.staggerFrom(chars,0.01, {opacity:0, ease:Power1.easeIn}, 0.02, "+=0.1");
    }



    this.input = function() {
        var s = '<input onChange = "fn.call(this)" class = "Typer" type = "text"/>';
        var el = document.getElementById("Input");
        el.innerHTML = s;
    }

    this.alert_function = function() {
        var s = "";
        var cl = '</div>';
        s += '<div onClick = "fn.input()" class = "FormulaC">alert' + cl;
        
        s += '<div class = "BigBracket">(' + cl;
        s += '<div id = "Input" class = "Input">"Hier der Kaffee"' + cl;
        s += '<div class = "BigBracket">);' + cl;

        var el = document.getElementById(div);
        el.innerHTML = s;

    }


    this.init = function() {
        self.navigation();
        self.intro();
    }


    self.init();

}


var fn; 

function startFunctions() {
    fn = new Functions("Vars");
}