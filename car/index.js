var CarLesson = function() {

    var self = this;



    this.ace = function( div ) {

        var el = document.getElementById( div );
        el.innerHTML = "";

        var s = '<div id = "editor">'
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



    this.init = function() {
        
        volts = new Speedometer ('volts', {theme: 'default'});
        volts.draw ();
        var c = new Car(100, volts);

    }


    self.init();
}


var volts;

function startLesson() {
    var lesson = new CarLesson();

}

