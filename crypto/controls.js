var uncrypted = 'Alle reden von „Digitalisierung“. Doch was sich dahinter verbirgt, ist eine große Unbekannte geblieben – der innigen Beziehung zum Trotz, die wir zu unserem Smartphone unterhalten. Fragt man danach, woher der Computer kommt, lautet die Antwort meist: „von der Rechenmaschine“, oder es folgt verlegenes Schweigen. Erstaunlicherweise betrifft diese Ahnungslosigkeit nicht nur diejenigen, die als User keinen Grund sehen, dem Innenleben ihres Lieblingsspielzeugs hinterher zu forschen, sondern vielfach auch Programmierer, deren Beruf darin besteht, der Maschine Dienstbarkeit, wenn nicht gar „Intelligenz“ einzuhauchen. Dies führt zu jener sonderbaren Spaltung der Welt, in der ein Teil des Publikums die Maschine als himmlisches Jerusalem bejubelt, ein anderer sie als Abgrund verteufelt. Derlei Glaubensstreitigkeiten haben jedoch wenig mit der Realität zu tun. Hin- und hergerissen zwischen Himmel und Hölle, bewegt man sich in der Cloud, einem geistigen Schwebezustand, in dem nichts mehr gewiss ist. Hat schon Marx prophezeit, dass alles „Stehende und Ständische verdampft“, kann jede Gegenwartsdiagnose nur nüchtern konstatieren, dass die sogenannte „Realität“ in Auflösung begriffen ist: ein Potemkinsches Dorf, das nicht zufällig immer mehr „Fake News“ hervorbringt. Konnte man vor einigen Jahren noch glauben, dass der Welt mit der Digitalisierung eine Art Second Life angeflanscht ist, begreifen wir heute: Wir hängen im Netz, so oder so, hier und jetzt. Und das ist unser Leben. Jedoch ist dieser Prozess kein Verhängnis, das von einer höheren Instanz ins Werk gesetzt worden wäre. Ganz im Gegenteil: Die Digitalisierung ist ein Menschheitsprojekt. Anders als in der Auseinandersetzung mit der Natur hat man es hier nicht mehr mit behämmerter Materie, der Tücke des Objekts oder anderen Widrigkeiten zu tun. Wenn der Gedanke an eine Grenze stößt, so liegt sie im eigenen Fassungsvermögen begründet, dem Mangel an Imagination oder der schieren Unkenntnis der Regeln und Sprachen, denen die digitale Welt gehorcht. Wenn ich die „kurze Geschichte der Digitalisierung“ erzähle, so ist der Impuls, der mich treibt, der Versuch, die Geschichte eines welt- und gesellschaftsverändernden kulturellen Wandels zu fassen, der in Begriffslosigkeit, Märchenglauben und Halbwissen zu ersticken droht. Dabei besteht der größte Irrglaube in der Annahme, man habe es mit einem Werkzeug zu tun, das man, wie einen Hammer, „im Griff“ haben könne. Nein, der Computer ist nichts, was man „im Griff“ hat, er ist vielmehr eine gesellschaftsüberwölbende Architektur, eine geistige Kathedrale, die sich über mehrere Jahrhunderte herausgearbeitet hat. Lässt man sich auf diese Geschichte ein, die gelegentlich heitere, immer aber höchst menschliche Züge trägt, entsteht ein neues Bild der Moderne: ein Bild, in dem die Digitalisierung nicht mehr als kalter Dämon erscheint. Denn nicht der Himmel ist unsere Grenze, sondern die menschliche Einbildungskraft.';

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



var ctrl = null;

function Control( div ) {
    var self = this;
    ctrl = this;

    this.open_next_lesson = function() {
        alert("nächste Stunde");
    }

    this.next_lesson = function() {

        document.getElementById("editor").remove();
        document.getElementById("Explanation").remove();

        var s = '<div onclick = "ctr.open_next_lesson()" class ="NEXT">';
        s += "▶";
        s += '</div>';
        var stage = document.getElementById("Vars");
        stage.innerHTML = s;

    }


    this.enigma = function() {
        var el = document.getElementById("Vars");
        if (el) el.remove();

        var c = this.show_crypted_text();

        var s = '<div id = "enigma" class ="enigma"><img src = "crypto/enigma.jpg"/></div>';
        s += '<div id = "crypted">' + c + '</div>';
        
        var el = document.getElementById("full");
        el.innerHTML = s;    
        

        var en = document.getElementById("enigma");
        TweenLite.to(en, 0, {opacity:0.01});




        var tl = new TimelineMax({  });
        tl.to( en, 4, { opacity: 1 } );
        tl.play();

    }


    this.show_uncrypted = function() {

        var s = '<div id = "enigma" class ="enigma"><img src = "crypto/enigma.jpg"/></div>';
        s += '<div id = "crypted">' + uncrypted + '</div>';
        
        var el = document.getElementById("full");
        el.innerHTML = s;  

        var el = document.getElementById("crypted");
        el.innerHTML = uncrypted;

        var cr = document.getElementById("crypted");
        var tl = new TimelineMax({  });
        tl.to( cr, 3, { opacity: 1 } );
        tl.play();
    }


    this.show_crypted = function() {

        var cr = document.getElementById("crypted");
        var tl = new TimelineMax({  });
        tl.to( cr, 3, { opacity: 1 } );
        tl.play();
    }


    this.show_crypted_text = function() {
        
        var list = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "ä", "ö", "ü", "ß", "à", "á", "é", "è", "ò", "ó" ];
        var alberti = new Alberti(list);
        var seq = alberti.sequence;

        uncrypted = uncrypted.toLowerCase();
        

        function findChar(char) {
            for (var n = 0; n < seq.length; n++) {
                var it = seq[n];
                if (it.char === char) return it.replace;
            }

            return null;
        }

        var crypted = "";

        for (var i = 0; i < uncrypted.length; i++) {
            var char = uncrypted[i];
            var replace = findChar(char);
            if (replace) {
                crypted += replace;
            } else crypted += char;
        }

        return crypted;
    } 

    this.alberti = function() {

        var s = '<div id = "alberti" class ="alberti"><img src = "crypto/alberti.jpg"/></div>';
        s += '<div class ="enigma"><img src = "crypto/enigma.jpg"/></div>';
        var el = document.getElementById("full");
        el.innerHTML = s;

        var div = document.getElementById("alberti");

        var tl = new TimelineMax({  });
        tl.to( div, 3, { opacity: 1 } );
        tl.play();

    }




    this.process = function() {
        console.log("Pointer steht bei " + self.pct);

        switch( self.pct ) {

            case 0:
                self.intro();
            break;

            case 1:
                self.enigma();
            break;

            case 2:
                self.show_crypted();
            break;

            case 3:
                self.alberti();
            break;

            case 4:
                self.show_uncrypted();
            break;


            case 5:
            break;

            case 6:
            break;

            case 7:
            break;

            case 8:
            break;

            case 9:
            break;

            case 10:
            break;

            case 9:
            break;

            case 10:
            break;

            case 11:
            break;

            case 12:
            break;

            case 13:
            break;

            case 14:
            break;

            case 15:
                self.next_lesson();
            break;


            default:
               self.open_next_lesson();
            break;
        }

    }




    this.open_next_lesson = function() {
        window.open("http://localhost:8000/capsulation.html");
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

            case 'ArrowUp':
            self.forward();
            break;

            case 'ArrowDown':
                self.backward();
            break;

            case 'Tab':
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


    

    this.intro = function() {
        var s = "";
        s += '<div id = "big" class = "big">Crypto</div>';
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