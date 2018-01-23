function backgroundColor ( col ) {
    if ( typeof( col) === "object") {
        if (col.r && col.g && col.b) {
            
        

        var c = "rgb(" + col.r + "," + col.g + "," + col.b + ")";

        
        var el = document.getElementById("full");
        TweenMax.to(el, 1, { 
                           background: c
                           });


        }
    }
}



function Control( div ) {
    var self = this;





    this.process = function() {
        console.log("Pointer steht bei " + self.pct);

        switch( self.pct ) {
            case 0:
                self.intro();
            break;

            case 1:
                self.circle();
            break;

            case 2:
                console.log("NUMMER 2");
                self.add_list();
            break;

            case 3:
                self.complex();
                console.log("KOMPLEX");
            break;

            case 4:
                self.array_explanation();
            break;

            case 5:
                self.various_arrays();
            break;

            case 6:
                self.filled_arrays();
            break;

            case 7:
                self.array_object();
            break;


            case 8:
                self.introduce_objects();
            break;

            case 9:
                self.eternal_loop();
            break;

            case 10:
                self.show_operators();
            break;


            default:
                alert("Problem");
            break;
        }

    }


    this.checkKeys = function( ev ) {
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



    this.ct = 0;
    this.ctt = 0;
    this.line = 0;
    this.done = false;
    this.list = null;
    
    this.first  = false;
    this.second = false;
    

    this.complex_loop = function() {
        var editor = self.editor;
        
        
        if (self.line === 10 && self.done === false) {
            self.ct ++;
            self.line = 3;
            }
        else                  self.line ++;

        if (self.line === 3) {
            var el = document.getElementById("ndx");
            el.innerHTML = self.ct;
        }


        if (self.list) {
            if (self.line === 5) self.list.push( self.ct );
            if (self.line === 6) {
                var el = document.getElementById("console2");
                el.innerHTML = self.list;
            }


        }


        if (self.ct < 9) editor.gotoLine(self.line, 5, true);
        else {
            self.done = true;
            editor.gotoLine(self.line, 5, true);
        }

        if (self.line === 9) {
            var el = document.getElementById("console");
            var s = "Aktueller Wert " + self.ct;
            el.innerHTML = s;
        }


        if (! self.done) window.setTimeout(self.complex_loop, 200);
        else {
            if (self.line === 10) {
                var el = document.getElementById("ndx");
                el.innerHTML = "";
                self.line ++;
            }

        
        if (self.line !== 20)  window.setTimeout(self.complex_loop, 200);

        if (self.line === 14) {
            self.list.shift();
            }

        if (self.line === 15) {
            var el = document.getElementById("console3");
            var s = self.list.length;
            el.innerHTML = s;
        }

        if (self.line === 19 && self.list.length > 0) self.line = 11;

        }
    }



    this.while_part = function() {
        
        self.line ++;

        self.editor.gotoLine(self.line, 5, true);
     
        if (self.line !== 20) window.setTimeout(self.while_part, 200);
    }


    this.loop = function() {
        var editor = self.editor;



        if (self.line === 10 && self.done === false) {
            self.ct ++;
            self.line = 3;
            }
        else                  self.line ++;

        if (self.line === 3) {
            var el = document.getElementById("ndx");
            el.innerHTML = self.ct;
        }


        if (self.list) {
            if (self.line === 5) self.list.push( self.ct );
            if (self.line === 6) {
                var el = document.getElementById("console2");
                el.innerHTML = self.list;
            }


        }


        if (self.ct < 9) editor.gotoLine(self.line, 5, true);
        else {
            self.done = true;
            editor.gotoLine(self.line, 5, true);
        }

        if (self.line === 9) {
            var el = document.getElementById("console");
            var s = "Aktueller Wert " + self.ct;
            el.innerHTML = s;
        }


        if (! self.done) window.setTimeout(self.loop, 200);
        else {
            if (self.line === 10) {
                var el = document.getElementById("ndx");
                el.innerHTML = "";
            }

            if (self.line !== 11)  window.setTimeout(self.loop, 200);
        }

    }


    this.start_loop = function() {
        self.ct = 0;
        self.ctt = 10;
        self.line = 0;
        self.done = false;

        if (self.list) self.list = [];

        self.loop();
    }








    this.start_complex = function() {
        self.ct = 0;
        self.ctt = 10;
        self.line = 0;
        self.done = false;
        self.list = [];
        self.complex_loop();
    }



    this.add_list = function() {
        self.list = [];
        
        var e = document.createElement("div");
        e.className = "test-div";
        e.id = "console2";
        document.getElementById("full").appendChild(e);

        
    }


    this.complex = function() {
        var editor = self.editor;
        editor.setValue("");
        

        var nlt = "\n\t";
        var nltt = "\n\t\t";
        var s; 

        editor.session.insert(editor.getCursorPosition(), "function loop( ) {");

        s = nlt + "var list = []";
        editor.session.insert(editor.getCursorPosition(), s);
        
        s = nlt + "for (var i = 0; i < 10; i++) {";
        editor.session.insert(editor.getCursorPosition(), s);


        s = nlt;
        editor.session.insert(editor.getCursorPosition(), s);

        s = nlt + "list.push(i)";
        editor.session.insert(editor.getCursorPosition(), s);

        s = nlt + 'console.log( list );';
        editor.session.insert(editor.getCursorPosition(), s);

        s = nlt + nlt;
        editor.session.insert(editor.getCursorPosition(), s);


        s = nlt + 'console.log("Aktueller Wert: " + i)';
        editor.session.insert(editor.getCursorPosition(), s);

        s = nlt + "}";
        editor.session.insert(editor.getCursorPosition(), s);

        s = nlt;
        editor.session.insert(editor.getCursorPosition(), s);

        s = nlt + "while( list ) {";
        editor.session.insert(editor.getCursorPosition(), s);

        s = nlt;
        editor.session.insert(editor.getCursorPosition(), s);

        s = nlt + "list.shift();";
        editor.session.insert(editor.getCursorPosition(), s);
       
        s = nlt + 'console.log( list.length );';
        editor.session.insert(editor.getCursorPosition(), s);

        s = nlt + nlt;
        editor.session.insert(editor.getCursorPosition(), s);

        s = nlt + "if ( list.length === 0) list = null";
        editor.session.insert(editor.getCursorPosition(), s);

        s = nlt + "}";
        editor.session.insert(editor.getCursorPosition(), s);

        editor.session.insert(editor.getCursorPosition(), "\n}");

        var mylist = document.getElementById("full");   // Get the <ul> element with id="myList"
        mylist.removeChild(mylist.childNodes[1]);
        
        var e = document.createElement("div");
        e.className = "console3";
        e.id = "console3";
        document.getElementById("full").appendChild(e);

        e = document.createElement("div");
        e.className = "ndx";
        e.id = "ndx";
        e.onclick = ctr.start_complex;
        document.getElementById("full").appendChild(e);

    }



    this.array_explanation = function () {
        console.log("EXPLANATION");
        var el = document.getElementById("Explanation");

        if (! el) {
            var e = document.createElement("div");
            e.className = "Explanation";
            e.id = "Explanation";
            document.getElementById("full").appendChild(e);
            el = document.getElementById("Explanation");
        }

        var s = "";
        s += self.get_styled ("var ", "var");
        s += "list ";      
        s += self.get_styled("=", "op");
        s += " []";
        s += '<br/>';



        el.innerHTML = s;
    }


    this.various_arrays = function() {
        
        var el = document.getElementById("Explanation");

        var s = "";
        s += self.get_styled ("var ", "var");
        s += "list ";      
        s += self.get_styled("=", "op");
        s += " []";
        s += '<br/>';



        s += self.get_styled ("var ", "var");
        s += "list ";      
        s += self.get_styled("=", "op");

        s += self.get_styled(" new", "op");

        s += self.get_styled(" Array", "obj");

        s += "()";

        el.innerHTML = s;

    }



    this.filled_arrays = function() {
        var el = document.getElementById("Explanation");
        var text = self.filled_arrays_text();
        el.innerHTML = text;
    }


    this.array_object = function() {

        self.check_big_object();

        var el = document.getElementById("Explanation");
        var text = self.filled_arrays_text();
        text += self.array_object_text(); 
        
        el.innerHTML = text;

        
    }


    this.array_object_text = function() {
        var s = "";
    
        s += '<div class = "break"/>';

        s += '<div>';
            s += "list"; 
            s += self.get_styled(".", "op");
            s += self.get_styled ("push", "var");
            s += "(1)";

            s += '<br/>';

            s += "list"; 
            s += self.get_styled(".", "op");
            s += self.get_styled ("shift", "var");
            s += "()";


        s += '</div>';

        return s;
    }


    this.check_big_object = function() {

        var el = document.getElementById("BigObject");
        if (el) document.getElementById("BigObject").remove();
    }


    this.filled_arrays_text = function() {

        var s = "";
        s += self.get_styled ("var ", "var");
        s += "list ";      
        s += self.get_styled("=", "op");
        s += " []";
        s += '<br/>';


        s += self.get_styled ("var ", "var");
        s += "list ";      
        s += self.get_styled("=", "op");

        s += self.get_styled(" new", "op");

        s += self.get_styled(" Array", "obj");

        s += "()";
        s += '<br/>';

        s += self.get_styled ("var ", "var");
        s += "list ";      
        s += self.get_styled("=", "op");
        s += " [0,1,2,3,4,5]";
        s += '<br/>';

        s += self.get_styled ("var ", "var");
        s += "list ";      
        s += self.get_styled("=", "op");
        s += self.get_styled(" new", "op");
        s += self.get_styled(" Array", "obj");

        s += "(0,1,2,3,4,5)";
        s += '<br/>';
        s += '<br/>';

        s += '<div>';

        for (var i = 0; i< 6; i++) {
            s += '<div class = "block">' + i + '</div>';
        }

        s += '</div>';

       return s;

    }





    this.eternal_loop = function() {
        var editor = self.editor;
        editor.setValue("");     


        editor.session.insert(editor.getCursorPosition(), 'function do_something() {');
        
        var nl = "\n";
        var nlt = "\n\t";


        editor.session.insert(editor.getCursorPosition(), nl + nl) ;
        editor.session.insert(editor.getCursorPosition(), nl + '}');


        editor.session.insert(editor.getCursorPosition(), nl + nl + nl) ;

        
        editor.session.insert(editor.getCursorPosition(), 'window.setInterval( do_something, 1000);');

    }






    this.introduce_objects = function() {
        this.editor.setValue("");
        
        var el = document.getElementById("Explanation");
        el.innerHTML = "";

        
        document.getElementById("ndx").remove();
        document.getElementById("console").remove();
        document.getElementById("console2").remove();
        document.getElementById("console3").remove();

       s = '<div id = "BigObject" class = "BigObject">{}</div>';
       el = document.getElementById(div);
       el.innerHTML = s;


        var e = document.createElement("div");
        e.className = "test";
        e.id = "test";
        e.onclick = ctr.test;
        e.innerHTML = "TEST";
        document.getElementById("editor").appendChild(e);
        

        var nlt = "\n\t";
        var nltt = "\n\t\t";
        var s; 


        var editor = self.editor;
        editor.session.insert(editor.getCursorPosition(), "var o = {};");

        editor.session.insert(editor.getCursorPosition(), nlt + nlt);

        editor.session.insert(editor.getCursorPosition(), "\nalert( o );");

    }


    this.test = function() {
        var myCode = self.editor.getSession().getValue();
        eval( myCode );
    }


    
    this.get_styled = function( text, type ) {
         var span = '<span class = "' + type + '">';
         var spano   = '</span>';

         return span + text + spano;
    }



    this.show_operators = function() {
        self.check_big_object();

        var el = document.getElementById("Explanation");

        var s = "";
        s += self.get_styled ("var ", "var");
        s += "a ";      
        s += self.get_styled("= ", "op");
        s += self.get_styled("17", "value");
        s += ';<br/>';

        s += "a ";
        s += self.get_styled("++", "op"); 
        s += ";"

        s += self.get_styled ("  // Wert von a ist 18", "comment");
        
        s += '<br/>';
        s += "a ";
        s += self.get_styled("--", "op"); 
        s += ";"
        s += self.get_styled ("  // Wert von a ist 17", "comment");

        s += '<br/>';
        s += "a ";
        s += self.get_styled("=", "op"); 
        s += " a";
        s += self.get_styled(" * " , "op"); 
        s += self.get_styled("2", "value");
        s += ";"
        s += self.get_styled ("  // Wert von a ist 34", "comment");

        s += '<br/>';
        s += "a ";
        s += self.get_styled("*= ", "op"); 
        s += self.get_styled("2", "value");
        s += ";"
        s += self.get_styled ("  // kürzere Notation der Multiplikation", "comment");
    
        s += '<br/>';
        s += "a ";
        s += self.get_styled("/= ", "op"); 
        s += self.get_styled("2", "value");
        s += ";"
        s += self.get_styled ("  // kürzere Notation der Division", "comment");




        el.innerHTML = s;




    }




    this.init_ace = function() {
        var s = '<div id = "editor">'
        s += '</div>';

        s += '<div onClick = "ctr.start_loop()" id = "ndx" class = "ndx"></div>';
       s += '<div id = "console" class = "console"></div>';

        var el = document.getElementById( "full" );
        el.innerHTML = s;

        
        var editor = ace.edit("editor");
        editor.setTheme("ace/theme/monokai");
        editor.getSession().setMode("ace/mode/javascript");

        editor.setOptions({
            fontFamily: "monospace",
            fontSize: "15pt"
        });
        
        
        this.editor = editor;

        var nlt = "\n\t";
        var nltt = "\n\t\t";
        var s; 

        editor.session.insert(editor.getCursorPosition(), "function loop( ) {");

        editor.session.insert(editor.getCursorPosition(), nlt);
        
        s = nlt + "for (var i = 0; i < 10; i++) {";
        editor.session.insert(editor.getCursorPosition(), s);


        s = nlt + nlt + nlt + nlt + nlt;
        editor.session.insert(editor.getCursorPosition(), s);


        s = nlt + 'console.log("Aktueller Wert: " + i)';
        editor.session.insert(editor.getCursorPosition(), s);

        s = nlt + "} // Inkrement der Variable";
        editor.session.insert(editor.getCursorPosition(), s);


        editor.session.insert(editor.getCursorPosition(), "\n}");

        s = "";
        s += '<div class = "big"></div>';
        var el = document.getElementById(div);
        el.innerHTML = s;


    }


    this.circle = function() {
        var s = "";
        s += '<div class = "circle"></div>';

        var el = document.getElementById("full");
        el.innerHTML = s; 

        self.list = null;
        self.init_ace();


    }






    this.intro = function() {
        var s = "";
        s += '<div class = "big">Schleifen</div>';
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



var ctr;

function startControl() {
    ctr = new Control("Vars");
}