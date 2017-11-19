
function spokenMessage(msg) {
    var el = document.getElementById("Dictation");
    el.innerHTML = msg;

    cp.final_text = msg;    
}

function spokenSegment( msg) {
    var el = document.getElementById("Segment");
    el.innerHTML = msg;
}

function cleanXML(str)
{
s = str.stripTags();
return s;
}



function Capsulation( div) {

    var self = this;

 this.process = function() {
        switch( self.pct ) {
            case 0:
                self.intro();
            break;
               
            case 1:
                self.init_ace();
            break;

            case 2:
                self.speech_recognition();
            break;

            case 3:
                // self.wikipedia_article();
                self.audio_assistant();
            break;

            case 4:
                self.wikipedia_code();
            break;

            case 5:
                self.wheather_info();
            break;

            case 6:
                self.task();
            break;

            case 7:
                self.http_communication();
            break;

            case 8:
                self.images();
            break;

            case 9:
                self.news_aggregator();
            break;

            case 10:
                // self.news_aggregator();
            break;


        }

    }


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


    this.intro = function() {
        var s = "";
        s += '<div class = "big">Verkapselung</div>';
        var el = document.getElementById(div);
        el.innerHTML = s;
    }


    this.test = function() {
        var myCode = self.editor.getSession().getValue();
        eval( myCode );
    }


    this.clear_title = function() {
       var el = document.getElementById(div);
       el.innerHTML = "";
    }




this.wikipedia_article = function(text, begin, callback) {


    $.ajax({
        type: "GET",
        url: "http://de.wikipedia.org/w/api.php?action=parse&format=json&prop=text&section=0&page=" + text + "&callback=?",
        contentType: "application/json; charset=utf-8",
        async: false,
        dataType: "json",
        success: function (data, textStatus, jqXHR) {
 
            var markup = data.parse.text["*"];
            console.log( markup );
            var str = markup.replace(/<\/?[^>]+(>|$)/g, "");
	        str = str.replace(/(\r\n|\n|\r)/gm,"");

            var reg = "/" + begin + "\(\*/";


            var x = str.search( /\(\*/ );

            var text = begin + " " + str.substring( x, str.length);



            var el = document.getElementById("Dictation");
            el.innerHTML = text;

            if (callback) callback( text );

 
        },
        error: function (errorMessage) {
        }
    });


}


this.search_wikipedia = function() {
 var wikiURL = "https://de.wikipedia.org/w/api.php";
    wikiURL += '?' + $.param({
    'action' : 'opensearch',
    'search' : 'Martin Burckhardt',
    'prop'  : 'revisions',
    'rvprop' : 'content',
    'format' : 'json',
    'limit' : 10
});

 $.ajax( {
    url: wikiURL,
    dataType: 'jsonp',
    success: function(data) {
       console.log(data);
       var max = 0;
       var selected = -1;

        for (var i = 0; i < data.length; i++) {
            var ln = data[i].length;
            if ( ln > max) {
                max = ln;
                selected = i;
            }
        }

        alert ( data[selected] );

    }
} );


}
    



    this.weather = function ( location ) {
        var base    = "http://api.apixu.com/v1";
        var json    = "/current.json"
        var key     = "3b94f972948543b8a1780701171211";
        var q       = location;

        var url = base + json + "?key=" + key + "&q=" + q;
       

        $.ajax( {
            url: url,
            dataType: 'json',
            success: function(data) {
                self.show_weather_data( data );
            }
        } );
        

    }


    this.http_communication = function() {
        var editor = self.editor;
        editor.setValue("");        

        /*

        $.ajax( {
            url: url,
            dataType: 'json',
            success: function(data) {
                self.show_weather_data( data );
            }
        } );
        */
        var nl = "\n";
        var nlt = "\n\t";
        var nltt = "\n\t\t";
        var nlttt = "\n\t\t\t";

        var s = nl + nl + nl;
        
        editor.session.insert(editor.getCursorPosition(), "/*************** Apixu - Wheather API ************/" );
        editor.session.insert(editor.getCursorPosition(), nl  );

        var s1 = 'var base    = "http://api.apixu.com/v1";';
        var s2 = 'var json    = "/current.json";';
        var s3 = 'var key     = "3b94f972948543b8a1780701171211";';
        var s4 = 'var q       = location;';
        var s5 = 'var url     = base + json + "?key=" + key + "&q=" + q;';
        
        var s6 = '$.ajax( {';

        var s7 = 'url: url,';
        var s8 = "dataType: 'json',";
        var s9 = 'success: function(data) {';
        var s10 = 'show_wheather_data( data );';

        var s11 = '}';
        var s12 = '});'


        editor.session.insert(editor.getCursorPosition(), nlt + s1 );
        editor.session.insert(editor.getCursorPosition(), nlt + s2 );
        editor.session.insert(editor.getCursorPosition(), nlt + s3 );
        editor.session.insert(editor.getCursorPosition(), nlt + s4 );
        editor.session.insert(editor.getCursorPosition(), nl + nlt + s5 );

        editor.session.insert(editor.getCursorPosition(), nl + nlt + s6 );  
        
        editor.session.insert(editor.getCursorPosition(), nltt + s7 );  
        editor.session.insert(editor.getCursorPosition(), nltt + s8 );  
        editor.session.insert(editor.getCursorPosition(), nltt + s9 );  

        editor.session.insert(editor.getCursorPosition(), nlttt + s10 );
        editor.session.insert(editor.getCursorPosition(), nltt + s11 );
        editor.session.insert(editor.getCursorPosition(), nlt + s12 );
    }



    this.task = function() {
        var editor = self.editor;

        editor.setValue("");

        var nl = "\n";
        var nlt = "\n\t";

        var s = nl + nl + nl;

        editor.session.insert(editor.getCursorPosition(), "/*" );
        editor.session.insert(editor.getCursorPosition(), nlt + "Aufgabe: Schreiben Sie eine Funktion, " );
        editor.session.insert(editor.getCursorPosition(), nlt + "bei der unsere Assistentin die Wetterdaten verbalisiert" );
        editor.session.insert(editor.getCursorPosition(), nl  );

        editor.session.insert(editor.getCursorPosition(), nl + "*/" );

        editor.session.insert(editor.getCursorPosition(), nl + nl );

        editor.session.insert(editor.getCursorPosition(), 'var s = "Das Wetter in  usw. usf"');
        editor.session.insert(editor.getCursorPosition(), nl + nl);


        editor.session.insert(editor.getCursorPosition(), "var msg = new SpeechSynthesisUtterance(s);");
        editor.session.insert(editor.getCursorPosition(), nl + nl + "window.speechSynthesis.speak(msg)");


        var tip = '// Tip: Man kann Strings einfach mit einem + miteinander verketten';
        editor.session.insert(editor.getCursorPosition(), nl + nl + tip);


    }


    this.show_weather_data = function( data ) {
        var location = data.location;
        var d = '<div class = "entry">';
        var de = '</div></br>';

        var l = '<div class = "legend">';
        var le = '</div>' + d;

        var b = l;

        var s = b + "Ort: " + le + location.name + de;
        s += b + "Region: " + le + location.region + de;

        s += b + "Lokalzeit: " + le + location.localtime + de;

        s += b + "Wetter: " + le + data.current.condition.text + de;

        var current = data.current;
        s += b + "Temperatur: " + le + current.temp_c + "° Celsius" + de;

        s += b + "Gefühlte Temperatur: " + le + current.feelslike_c + "° Celsius" + de;

        s += b + "Luchtfeuchtigkeit: " + le + current.humidity + " %" + de;

        s += b + "Windgeschwindigkeit: " + le + current.vis_km + " km " + de;

        s += b + "Windrichtung: " + le + current.wind_dir + de;

        s += b + "Luftdruck: " + le + current.pressure_mb + " mb " + de;

        var el = document.getElementById("Dictation");
        el.innerHTML = s;

        self.weather_data = {
            Ort:        location.name,
            Region:     location.region,
            Lokalzeit:  location.localtime
        }


    }   


    this.wheather_info = function() {
        self.show_cloud();
    }


    this.wikipedia_code = function() {

        var editor = self.editor;        
        editor.setValue("");
        var nl = "\n";
        var nlt = "\n\t";
        var nltt = "\n\t";

        editor.session.insert(editor.getCursorPosition(), '/* ============= WIKIPEDIA AUFRUF =============*/' );
        var s = nl + nl + nl;

        editor.session.insert(editor.getCursorPosition(), s );


        var  url = 'var url = "http:\/\/de.wikipedia.org/w/api.php?;"';
        editor.session.insert(editor.getCursorPosition(), nl + url );

        var action = 'var action= "parse&format=json&prop=text&section=0&page=";'
        editor.session.insert(editor.getCursorPosition(), nl + action );

        editor.session.insert(editor.getCursorPosition(), nltt );

        s = "$.ajax({";
        editor.session.insert(editor.getCursorPosition(), nl + s );

        s = 'type: "GET",'; 
        editor.session.insert(editor.getCursorPosition(), nltt + s );

        s = 'url: url + action + text + "&callback=?",';
        editor.session.insert(editor.getCursorPosition(), nltt + s );

        s = 'contentType: "application/json; charset=utf-8",';
        editor.session.insert(editor.getCursorPosition(), nltt + s );

        s = 'async: false,';
        editor.session.insert(editor.getCursorPosition(), nltt + s );
        
        s = 'dataType: "json",';
        editor.session.insert(editor.getCursorPosition(), nltt + s );

        s = 'success: function (data, textStatus, jqXHR) {';
        editor.session.insert(editor.getCursorPosition(), nltt + s );


        editor.session.insert(editor.getCursorPosition(), nl + nl );
        s = '// ... Cleanup - Nachbearbeiten und Reinigen des Textes';
        editor.session.insert(editor.getCursorPosition(), nltt + s );

        editor.session.insert(editor.getCursorPosition(), nl + nl );


        s = 'if (callback) callback( text );';
        editor.session.insert(editor.getCursorPosition(), nltt + s );

        s = '},';

        editor.session.insert(editor.getCursorPosition(), nltt + s );

        s = '});';

        editor.session.insert(editor.getCursorPosition(), nl + s );



    }



    this.corinna_speaking = function( text ) {
        var clear = text.replace(/\(((?!\)).)*\)/, "");
        var list = clear.split(". ");
        var first = list[0];
        var second = list[1];

        self.speak( first );
 

    }


    this.speak = function( text, onend ) {
        window.speechSynthesis.cancel();
        var ssu = new SpeechSynthesisUtterance( text );
        window.speechSynthesis.speak( ssu );
        function _wait() {
            if ( ! window.speechSynthesis.speaking ) {
            onend();
            return;
            }
            window.setTimeout( _wait, 200 );
        }
        _wait();
    }



    this.show_news_icon = function() {

        var el = document.getElementById("news");

        if ( ! el ){
            e = document.createElement("div");
            e.className = "news";
            e.id = "news";         
            e.onclick = self.news_servant;
            e.innerHTML = '<img src = "capsulation/news.png"/>';
            document.getElementById("full").appendChild(e);
        }   

    }



    this.show_cloud = function() {

        var el = document.getElementById("cloud");

        if ( ! el ){
            e = document.createElement("div");
            e.className = "cloud";
            e.id = "cloud";         
            e.onclick = self.weather_servant;
            e.innerHTML = '<img src = "capsulation/sun.png"/>';
            document.getElementById("full").appendChild(e);
        }        
    }


    this.show_question = function ()  {

        var el = document.getElementById("question");

        if ( ! el ){
            e = document.createElement("div");
            e.className = "question";
            e.id = "question";         
            e.onclick = self.servant;
            e.innerHTML = "?";
            document.getElementById("full").appendChild(e);
        }

    }








    this.servant = function() {
        self.show_question();
        var list = [];
        
        list.push( "Was möchtest du wissen?");
        list.push( "Also, was gibt's?");
        list.push( "Und was kann ich jetzt für dich tun?");
        list.push( "Frag mich, was Du willst, ich bin immer für dich da");

        var a = parseInt ( Math.random() * list.length );
        var s = list[ a ];

        self.speak(s, self.assistant_didalogue);
    }

    this.audio_assistant = function() {
        self.show_question();

        var s = "Mein Name ist Corinna. Womit kann ich dir dienen?";
        self.speak(s, self.assistant_didalogue);
    }


    this.spokenMessage = function( msg ) {
        var el = document.getElementById("Dictation");
        el.innerHTML = msg;

        self.trigger_mic();

        var x = msg.split(" ");
        var ln = x.length;

        var name = x[ln-2] + "_" + x[ln-1];
        var begin = x[ln-2] + " " + x[ln-1];

        self.wikipedia_article( name, begin, self.corinna_speaking );

    }


    this.spokenNews = function ( msg ) {
        if ( ! msg ) alert("Hier gibt es ein Problem");

        var el = document.getElementById("Dictation");
        el.innerHTML = msg;

        self.trigger_mic();

        var x = msg.split(" ");
        var ln = x.length;

        var marker = -1;

        for (var i = 0; i < x.length; i++) {
            if (x[i] === "im") {
                marker = i;
            }

            if (x[i] === "bei") {
                marker = i;
            }

            if (x[i] === "beim") {
                marker = i;
            }


            if (x[i] === "in") {
                if ( x[i+1] ) {
                    if ( x[i+1] === "der") marker = i+1;
                }
            }    
        }

        var name = "";

        for (var i = 0; i < x.length; i++) {
            if (i > marker) name += x[i] + " ";
        }


        name = name.substring(0, name.length-1);
        var result;
        
        for (var i = 0; i < self.news_list.length; i++) {
            var item = self.news_list[i].title;
            if ( item.search(name) !== -1) {
                result = self.news_list[i].trig;
            }
        }

        if (result) self.get_articles( result );
   
    }


    this.spokenCloud = function( msg ) {
        var el = document.getElementById("Dictation");
        el.innerHTML = msg;

        self.trigger_mic();

        var x = msg.split(" ");
        var ln = x.length;

        var name = x[ln-1];
        self.weather( name );


        // self.wikipedia_article( name, begin, self.corinna_speaking );

    }


    this.news_servant = function() {
        self.show_microphone();
        self.recognizer = null;
        
        var recognizer = new webkitSpeechRecognition();
        recognizer.continuous = true;
        recognizer.interimResults = true;


        recognizer.onresult = function(event) { //the event holds the results
            if (typeof(event.results) === 'undefined') { //Something is wrong…
                recognition.stop();
                return;
            }

            for (var i = event.resultIndex; i < event.results.length; ++i) {      
                if (event.results[i].isFinal) self.spokenNews ( event.results[i][0].transcript);   
                else spokenSegment ( event.results[i][0].transcript);  
                } 
        }; 



    self.recognizer = recognizer;
    self.trigger_mic();
    }



    this.weather_servant = function() {

        self.show_microphone();
        self.recognizer = null;
        
        var recognizer = new webkitSpeechRecognition();
        recognizer.continuous = true;
        recognizer.interimResults = true;


        recognizer.onresult = function(event) { //the event holds the results
            if (typeof(event.results) === 'undefined') { //Something is wrong…
                recognition.stop();
                return;
            }

            for (var i = event.resultIndex; i < event.results.length; ++i) {      
                if (event.results[i].isFinal) self.spokenCloud( event.results[i][0].transcript);   
                else spokenSegment ( event.results[i][0].transcript);  
                } 
        }; 



    self.recognizer = recognizer;
    self.trigger_mic();

    }


    this.assistant_didalogue = function() {

        self.show_microphone();
        self.recognizer = null;
        
        var recognizer = new webkitSpeechRecognition();
        recognizer.continuous = true;
        recognizer.interimResults = true;


        recognizer.onresult = function(event) { //the event holds the results
            if (typeof(event.results) === 'undefined') { //Something is wrong…
                recognition.stop();
                return;
            }

            for (var i = event.resultIndex; i < event.results.length; ++i) {      
                if (event.results[i].isFinal) self.spokenMessage( event.results[i][0].transcript);   
                else spokenSegment ( event.results[i][0].transcript);  
                } 
        }; 



    self.recognizer = recognizer;
    self.trigger_mic();
    
    }




    this.speech_recognition = function() {
        self.show_microphone();

        var recognizer = new webkitSpeechRecognition();
        recognizer.continuous = true;
        recognizer.interimResults = true;


        recognizer.onresult = function(event) { //the event holds the results
            if (typeof(event.results) === 'undefined') { //Something is wrong…
                recognition.stop();
                return;
            }

            for (var i = event.resultIndex; i < event.results.length; ++i) {      
                if (event.results[i].isFinal) spokenMessage( event.results[i][0].transcript);   
                else spokenSegment ( event.results[i][0].transcript);  
                } 
        }; 

     // recognizer.start();

    self.recognizer = recognizer;
    }


    this.init_ace = function() {

        this.clear_title();

        var s = '<div id = "editor">'

        s += '</div>';

        s += '<div class = "console">';

            s += '<div onClick = "cp.test()" class = "button" id = "submit">';
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
        editor.session.insert(editor.getCursorPosition(), nlt + "Verkapselung ist deswegen so mächtig, " );
        editor.session.insert(editor.getCursorPosition(), nlt + "weil sie das Vergessen organisiert" );
        editor.session.insert(editor.getCursorPosition(), nl + nl  );

        editor.session.insert(editor.getCursorPosition(), nlt + "Man hat die Schrift erfunden, " );
        editor.session.insert(editor.getCursorPosition(), nlt + "nicht um sich zu erinnern, sondern um vergessen zu können" );

        editor.session.insert(editor.getCursorPosition(), nl + "*/" );

        editor.session.insert(editor.getCursorPosition(), nl + nl + nl );

        editor.session.insert(editor.getCursorPosition(), 'var s = "Haben Sie das noch im Kopf?"');
        editor.session.insert(editor.getCursorPosition(), nl + nl);


        editor.session.insert(editor.getCursorPosition(), "var msg = new SpeechSynthesisUtterance(s);");
        editor.session.insert(editor.getCursorPosition(), nl + nl + "window.speechSynthesis.speak(msg)");

        self.editor = editor;

    }


    this.recognition_code = function() {
        var nl = "\n";
        var nlt = "\n\t";
        var nltt = "\n\t\t";        
        
        var editor = self.editor;
        editor.setValue("");    

        var s1 = 'var recognizer = new webkitSpeechRecognition();';
        var s2 = 'recognizer.continuous = true;';
        var s3 = 'recognizer.interimResults = true;';

        var s4 = 'recognizer.onresult = function(ev) {';

        var s5 = 'for (var i = ev.resultIndex; i < ev.results.length; ++i) {';
        var s6= 'if (ev.results[i].isFinal) msg( ev.results[i][0].transcript);';
        var s7 = 'else seg ( ev.results[i][0].transcript);';  


        editor.session.insert(editor.getCursorPosition(), nl + s1 );
        editor.session.insert(editor.getCursorPosition(), nl + s2 );
        editor.session.insert(editor.getCursorPosition(), nl + s3 );

        editor.session.insert(editor.getCursorPosition(), nlt  + nlt );

        editor.session.insert(editor.getCursorPosition(), nl + s4 );
        editor.session.insert(editor.getCursorPosition(), nlt + s5 );
        
        editor.session.insert(editor.getCursorPosition(), nlt  );

        editor.session.insert(editor.getCursorPosition(), nltt + s6 );
        editor.session.insert(editor.getCursorPosition(), nltt + s7 );

        editor.session.insert(editor.getCursorPosition(), nltt + '}' );
        editor.session.insert(editor.getCursorPosition(), nlt + '};' );
    }


    this.is_recording = false;

    this.trigger_mic = function() {
        var el = document.getElementById("Microphone")

        if (self.is_recording) {
            
            self.tl.stop();

            self.recognizer.stop();
            TweenMax.to(el, 0.3, { background: "pink", scale: 1 });
            self.is_recording = false;

            }
        else {
            self.recognizer.start();
            self.is_recording = true;
    
             TweenMax.to(el, 0, { background: "pink" }  );
             var tl = new TimelineMax({repeat: 3});  

            tl.to(el, 0.3, {background: "red", scale: 1.08, repeat:-1, yoyo:true})
            tl.play();

            self.tl = tl;
            }
    }


    this.show_microphone = function( bot ) {

        var el = document.getElementById("Microphone");

        if ( ! el ){
            e = document.createElement("div");
            e.className = "Microphone";
            e.id = "Microphone";         
            e.onclick = cp.trigger_mic;
            e.innerHTML = '<img src = "capsulation/mike.png"/>';
            document.getElementById("full").appendChild(e);

            var el = document.getElementById("editor");
            if (el) this.recognition_code();
        }

    }


    this.images = function() {
        var apiKey = 'b5t2bhj3edzf5h7qy6sggxfh';

        $.ajax(
            {
                type:'GET',
                url:"https://api.gettyimages.com/v3/search/images/creative?phrase=clouds",
                beforeSend: function (request)
                    {
                        request.setRequestHeader("Api-Key", apiKey);
                    }})
            .done(function(data){
                console.log( data.images )
                
                
                for(var i = 0;i<data.images.length;i++)
                    {
                    $("#Dictation").append("<img src='" + data.images[i].display_sizes[0].uri + "'/>");

                    console.log( data.images[i].display_sizes[0].uri );
                    }
                
            })
            .fail(function(data){
                alert(JSON.stringify(data,2))
            });
    }




    this.display_articles = function(data) {
        var articles = data.articles;

        var s = "";
        var art = '<div class = "article">';
        var auth = '<div class = "article_author">';
        var title = '<div class = "article_title">';
        var desc  = '<div class = "article_description">';
        var img = '<div class = "image"><img src = "';
        var source = '<div class = "article_source">';
        var eimg = ' /></div>';
        var ediv = '</div>';


        for (var i = 0; i < articles.length; i++) {
            var item = articles[i];

            s += art;
                s += auth + item.author + ediv;
                s += title + item.title + ediv;
                
                var link = '<a href = "' + item.url + '">link</a>';

                s += img + item.urlToImage + '"/></div>';

                s += desc + item.description + ediv;

                s += source + link + " " + data.source + " - " + item.publishedAt + ediv;
            s += ediv;
            // s += img + item.urlToImage + eimg;
        }

        el = document.getElementById("articles");
        el.innerHTML = s;

    }


    this.get_articles = function(source) {
        var base = "https://newsapi.org/v1/articles?source=";
        var source = source;
        var type = "&sortBy=latest&apiKey=";
        var key = "2987fd19bd374249979c4e38e40ef8b8";

        var url = base + source + type + key;

       $.ajax({
            type: "GET",
            url: url,
            async: false,
            dataType: "json",
                success: function (data, textStatus, jqXHR) {
                    console.log( data );

                    art = data;
                    if (data) self.display_articles( data );
                }
            });


    }



    this.news_choice = function(el) {
        console.log( el );
        var key = parseInt( el.getAttribute("key") );
        var source = self.news_list[key].trig;

        self.get_articles( source );

    }



    this.news_aggregator = function( input ) {
        // var el = document.getElementById(div);
        // el.innerHTML = "";

        var list = [];
        list.push( { 
            title: "ABC News",
            trig: "abc-news-aus"
        });

        list.push( { 
            title: "Ars Technica",
            trig: "ars technica"
        });

        list.push( { 
            title: "BBC News",
            trig: "bbc-news"
        });

        list.push( { 
            title: "Bild",
            trig: "bild"
        });

        list.push( { 
            title: "Business Insider (UK)",
            trig: "business-insider-uk"
        });

        list.push( { 
            title: "BBC News",
            trig: "bbc-news"
        });

        list.push( { 
            title: "CNBC",
            trig: "cnbc"
        });

        list.push( { 
            title: "Daily Mail",
            trig: "daily-mail"
        });

        list.push( { 
            title: "Die Zeit",
            trig: "die-zeit"
        });

        list.push( { 
            title: "Entertainment Weekly",
            trig: "entertainment-weekly"
        });
        
        list.push( { 
            title: "ESPN Cric Info",
            trig: "espn-cric-info"
        });

        list.push( { 
            title: "Focus",
            trig: "focus"
        });
        list.push( { 
            title: "Fortune",
            trig: "fortune"
        });

        list.push( { 
            title: "BBC News",
            trig: "bbc-news"
        });

        list.push( { 
            title: "Fox Sports",
            trig: "fox-sports"
        });

        list.push( { 
            title: "Gruenderszene",
            trig: "gruenderszene"
        });

        list.push( { 
            title: "Handelsblatt",
            trig: "handelsblatt"
        });

        list.push( { 
            title: "Independent",
            trig: "independent"
        });
        
        list.push( { 
            title: "Metro",
            trig: "metro"
        });

        list.push( { 
            title: "National Geographic",
            trig: "national-geographic"
        });


        list.push( { 
            title: "MTVNews",
            trig: "mtv-news"
        });

        list.push( { 
            title: "Newsweek",
            trig: "newsweek"
        });

        list.push( { 
            title: "BBC News",
            trig: "bbc-news"
        });

        list.push( { 
            title: "NFL News",
            trig: "nfl-news"
        });

        list.push( { 
            title: "Recode",
            trig: "recode"
        });

        list.push( { 
            title: "Reuters",
            trig: "reuters"
        });
        
        list.push( { 
            title: "T3n",
            trig: "t3n"
        });

        list.push( { 
            title: "TechCrunch",
            trig: "techcrunch"
        });


        list.push( { 
            title: "The Economist",
            trig: "the-economist"
        });

        list.push( { 
            title: "The Guardian (UK)",
            trig: "the-guardian-uk"
        });

        list.push( { 
            title: "The Huffington Post",
            trig: "the-huffington-post"
        });

        list.push( { 
            title: "The New York Times",
            trig: "the-new-york-times"
        });

        list.push( { 
            title: "The Sport Bible",
            trig: "the-sport-bible"
        });

        list.push( { 
            title: "The Times of India",
            trig: "the-times-of-india"
        });
        
        list.push( { 
            title: "The Wall Street Journal",
            trig: "the-wall-street-journal"
        });

        list.push( { 
            title: "Time",
            trig: "time"
        });

        list.push( { 
            title: "Wired.de",
            trig: "wired-de"
        });

        list.push( { 
            title: "Al Jazeera English",
            trig: "al-jazeera-english"
        });

        list.push( { 
            title: "Associated Press",
            trig: "associated-press"
        });

        list.push( { 
            title: "BBC Sport",
            trig: "bbc-sport"
        });

        list.push( { 
            title: "Bloomberg",
            trig: "bloomberg"
        });

        list.push( { 
            title: "Business Insider",
            trig: "business-insider"
        });
        
        list.push( { 
            title: "Buzzfeed",
            trig: "buzzfeed"
        });

        list.push( { 
            title: "CNN",
            trig: "cnn"
        });

        list.push( { 
            title: "Der Tagesspiegel",
            trig: "der-tagesspiegel"
        });

        list.push( { 
            title: "Engadget",
            trig: "engadget"
        });

        list.push( { 
            title: "ESPN",
            trig: "espn"
        });

        list.push( { 
            title: "Financial Times",
            trig: "financial-times"
        });

        list.push( { 
            title: "Football Italia",
            trig: "football-italia"
        });

        list.push( { 
            title: "FourFourTwo",
            trig: "four-four-two"
        });
        
        list.push( { 
            title: "GoogleNews",
            trig: "google-news"
        });

        list.push( { 
            title: "Hacker News",
            trig: "hacker-news"
        });

        list.push( { 
            title: "IGN",
            trig: "ign"
        });

        list.push( { 
            title: "Mashable",
            trig: "mashable"
        });

        list.push( { 
            title: "Mirror",
            trig: "mirror"
        });

        list.push( { 
            title: "MTV News",
            trig: "mtv-news-uk"
        });

        list.push( { 
            title: "New Scientist",
            trig: "new-scientist"
        });

        list.push( { 
            title: "New York Magazine",
            trig: "new-york-magazine"
        });
        
        list.push( { 
            title: "Polygon",
            trig: "polygon"
        });

        list.push( { 
            title: "Reddit/r/all",
            trig: "reddit-r-all"
        });
        

        list.push( { 
            title: "Spiegel Online",
            trig: "spiegel-online"
        });

        list.push( { 
            title: "TalkSport",
            trig: "talksport"
        });

        list.push( { 
            title: "TechRadar",
            trig: "techradar"
        });

        list.push( { 
            title: "The Guardian (AU)",
            trig: "the-guardian-au"
        });

        list.push( { 
            title: "The Hindu",
            trig: "the-hindu"
        });

        list.push( { 
            title: "The Lad Bible",
            trig: "the-lad-bible"
        });
        
        list.push( { 
            title: "The Next Web",
            trig: "the-next-web"
        });

        list.push( { 
            title: "The Telegraph",
            trig: "the-telegraph"
        });

        list.push( { 
            title: "The Verge",
            trig: "the-verge"
        });

        list.push( { 
            title: "The Washington Post",
            trig: "the-washington-post"
        });


        list.push( { 
            title: "USA Today",
            trig: "usa-today"
        });


        self.news_list = list;


        if ( input ) {
            var s = "";

            for (var i = 0; i < list.length; i++) {
                s += '<div onClick = "cp.news_choice(this)" key = "' + i + '" class = "provider">' + list[i].title + '</div>';
            }

            var el = document.getElementById("article_list");
            el.innerHTML = s;
        }
        else self.show_news_icon();


    }







    this.init = function() {
        self.intro();
        self.navigation();

        // self.get_articles("reuters");
        self.news_aggregator();
    }


    self.init();
}



var art;


var cp; 



function startCapsulation() {
    cp = new Capsulation("Vars");
}