var t = "";
var stopwords = ["-", "", "–", "1", "14",
    "a","ab","aber","ach","acht","achte","achten","achter","achtes","ag","alle","allein","allem","allen","aller","allerdings","alles","allgemeinen","als","also","am","an","ander","andere","anderem","anderen","anderer","anderes","anderm","andern","anderr","anders","au","auch","auf","aus","ausser","ausserdem","außer","außerdem",
    "b","bald","bedeutet", "beginnt", "begreift", "begreifen", "bei","beide","beiden","beim","beispiel","bekannt","bereits","besitzt", "besonders","besser","besten","bin","bis","bisher","bist", "bleibt", "bloß",
    "c", "chr",
    "d","d.h","da","dabei","dadurch","dafür","dagegen","daher","dahin","dahinter","damals","damit","danach","daneben","dank","dann","dar", "daran","darauf","daraus","darf","darfst","darin","darum","darunter","darüber","das","dasein","daselbst","dass","dasselbe","davon","davor","dazu","dazwischen","daß","dein","deine","deinem","deinen","deiner","deines","dem","dementsprechend","demgegenüber","demgemäss","demgemäß","demselben","demzufolge","den","denen","denn","dennoch", "denselben","der","deren","derer","derjenige","derjenigen","dermassen","dermaßen","derselbe","derselben","des","deshalb","desselben","dessen","deswegen","dich","die","diejenige","diejenigen","dies","diese","dieselbe","dieselben","diesem","diesen","dieser","dieses","dir","doch","dort","drei","drin","dritte","dritten","dritter","drittes","du","durch","durchaus","durfte","durften","dürfen","dürft",
    "e","eben","ebenso","ehrlich","ehedem", "ei","ei,","eigen","eigene","eigenen","eigener","eigenes","ein","einander","eine","einem","einen","einer","eines","einig","einige","einigem","einigen","einiger","einiges","einmal","eins","einzelne", "elf","en","ende","endlich","entweder","er","ernst","erst","erste","ersten","erster","erstes","es","etwa","etwas","euch","euer","eure","eurem","euren","eurer","eures", "ex",
    "f","findet", "folgende","folglich", "folgend", "fortan", "freilich", "früher","führt", "fünf","fünfte","fünften","fünfter","fünftes","für",
    "g","gab","ganz","ganze","ganzen","ganzer","ganzes","gar","gedurft","gegen","gegenüber","gehabt","gehen","geht","gekannt","gekonnt","gemacht","gemocht","gemusst","genau", "genauer", "genug","gerade","geradezu", "gern","gesagt","geschweige","gewesen","gewiss", "gewollt","geworden","gibt","gilt", "ging","gleich","gleichsam", "gleichwohl", "gott","gross","grosse","grossen","grosser","grosses","groß","große","großen","großer","großes","gut","gute","guter","gutes",
    "h","hab","habe","haben","habt","handelt", "hast","hat","hatte","hatten","hattest","hattet","heißt","her","heute","hier","hin","hinaus", "hinter","hoch","höchst", "hätte","hätten",
    "i","ich","ihm","ihn","ihnen","ihr","ihre","ihrem","ihren","ihrer","ihres","im","immer","in","indem","indes", "indessen", "infolgedessen","ins","insofern", "irgend","ist",
    "j","ja","jahr","jahre","jahren","je","jede","jedem","jeden","jeder","jedermann","jedermanns","jedes","jedoch","jemand","jemandem","jemanden","jene","jenem","jenen","jener","jenes","jetzt",
    "k","kam","kann","kannst","kaum","kein","keine","keinem","keinen","keiner","keines","keineswegs", "kleine","kleinen","kleiner","kleines","kommen","kommt","konnte","konnten","kurz","können","könnt","könnte",
    "l","lang","lange","längst", "läuft", "lässt", "leicht","leider","letztlich", "lieber","liegt", "los",
    "m","machen","macht","machte","mag","magst","mahn","mal","man","manche","manchem","manchen","mancher","manches","mann","mehr","mein","meine","meinem","meinen","meiner","meines","mensch","menschen","mich","mir","mit","mithin", "mittel","mochte","mochten","morgen","muss","musst","musste","mussten","muß","mußt","möchte","mögen","möglich","mögt","müssen","müsst","müßt",
    "n","na","nach","nachdem","nahm","nämlich", "natürlich","neben","nein","neue","neuen","neun","neunte","neunten","neunter","neuntes","nicht","nichts","nie","niemand","niemandem","niemanden","nimmt", "noch","nun","nur",
    "o","ob","oben","oder","offen","oft","ohne","ordnung","p","q",
    "r","recht","rechte","rechten","rechter","rechtes","richtig","rund",
    "s","sa","sache","sagt","sagte","sah","satt","schlecht","schließlich", "schluss","schon","sechs","sechste","sechsten","sechster","sechstes","sehr","sei","seid","seien","sein","seine","seinem","seinen","seiner","seines","seit","seitdem","selbst","sich","sie","sieben","siebente","siebenten","siebenter","siebentes","sind","so","solang","solche","solchem","solchen","solcher","solches","soll","sollen","sollst","sollt","sollte","sollten","sondern","sonst","soweit","sowie","später","startseite","statt","steht","stellt", "stets", "suche",
    "t","tag","tage","tagen","tat","tatsächlich", "teil","tel","tritt","trotzdem","tun",
    "u","uhr","um","umgekehrt", "und","und?","uns","unse","unsem","unsen","unser","unsere","unserer","unses","unter",
    "v","vergangenen","viel","viele","vielem","vielen","vielleicht","vielmehr", "vier","vierte","vierten","vierter","viertes","vom","von","vor", "voraus",
    "w","wahr?","wann","war","waren","warst","wart","warum","was","weg","wegen","weil","weit","weiter","weitere","weiteren","weiteres","welche","welchem","welchen","welcher","welches","wem","wen","wenig","wenige","weniger","weniges","wenigstens","wenn","wer","werde","werden","werdet","weshalb","wessen","wie","wieder","wiederum", "wieso","will","willst","wir","wird","wirklich","wirst","wissen","wo","woher","wohin","wohl","wollen","wollt","wollte","wollten","worden","wurde","wurden","während","währenddem","währenddessen","wäre","würde","würden","x","y",
    "z","z.b","zehn","zehnte","zehnten","zehnter","zehntes","zeigt", "zeit","zu","zudem", "zuerst","zugleich","zum","zumindest", "zunächst","zur","zurück","zusammen","zuvor", "zwanzig","zwar","zwei","zweite","zweiten","zweiter","zweites","zwischen","zwölf","über","überhaupt","übrigens"];



    getEditDistance = function(a, b){
        if(a.length == 0) return b.length; 
        if(b.length == 0) return a.length; 
      
        var matrix = [];
      
        // increment along the first column of each row
        var i;
        for(i = 0; i <= b.length; i++){
          matrix[i] = [i];
        }
      
        // increment each column in the first row
        var j;
        for(j = 0; j <= a.length; j++){
          matrix[0][j] = j;
        }
      
        // Fill in the rest of the matrix
        for(i = 1; i <= b.length; i++){
          for(j = 1; j <= a.length; j++){
            if(b.charAt(i-1) == a.charAt(j-1)){
              matrix[i][j] = matrix[i-1][j-1];
            } else {
              matrix[i][j] = Math.min(matrix[i-1][j-1] + 1, // substitution
                                      Math.min(matrix[i][j-1] + 1, // insertion
                                               matrix[i-1][j] + 1)); // deletion
            }
          }
        }
      
        return matrix[b.length][a.length];
      };




function Alternatives( text ) {
    var self = this;
    this.unique = [];

    this.get_relatives = function(word, limit) {
        if (limit < 1) {
            limit = Math.ceil( word.length * limit) ;
        }
        var list = [];

        for (var i = 0; i < self.unique.length; i++) {
            var item = self.unique[i];
            var dist = getEditDistance(item, word);
            if (dist <= limit) {
                list.push( item );
            }   
        }

        console.log(list);
        return list;
    }


    this.check_word = function(word) {
        var found = false;
        
        if (found === false) {
            for (var n = 0; n < self.unique.length; n++) {
                var item = self.unique[n];
                if (word === item ) {
                    found = true;
                    item.frequency ++;
                }
            }              
        }


        if ( found === false) {
            self.unique.push( word );
        }
    }

    this.init  = function() {
        console.log("Initalisierung Alternative");
        var t = text; 
        t = t.replace(new RegExp('\r?\n','g'), ' ');
        t = t.replace(/[.,\/#"!$%\^&\*;»«‘:{}=\-_?'`~()]/g,"");
        var list = t.split(" ");
        list = list.sort();
        console.log( "Länge der Liste: " + list.length );

        for (var i = 0; i < list.length; i++) {
            self.check_word( list[i] );
        }

        console.log( "Länge der Liste: " + self.unique.length );
    }

    self.init();
}


function Bag( text, callback ) {

    var self = this;
    this.unique = [];


    this.check_unique_word = function( word ) {
        var found = false;
    }

    this.check_word = function(word) {
        var found = false;
        
        for (var n = 0; n < stopwords.length; n++) {
            if ( stopwords[n] === word) found = true;
        }

        if (found === false) {
            for (var n = 0; n < self.unique.length; n++) {
                var item = self.unique[n];
                if (word === item.word ) {
                    found = true;
                    item.frequency ++;
                }
            }              
        }


        if ( found === false) {
            var o = {};
            o.word = word;
            o.frequency = 1;
            self.unique.push( o );
        }
    }



    this.init = function() {
        console.log("Hier kommt der Bag of Words " + text.length);
        var list = text.split(" ");
        for (var i = 0; i < list.length; i++) {
            var w = list[i];
            self.check_word( w );
        }

        console.log("einzelne Wörter " + self.unique.length);

        function compare(a,b) {
            if (a.frequency < b.frequency)
              return -1;
            if (a.frequency > b.frequency)
              return 1;
            return 0;
          }
          
        self.unique = self.unique.sort( compare );
        self.unique.reverse();

        
        var res = JSON.stringify( self.unique );
        self.print( 300 );


    }
    
    this.print = function( no ) {
        for (var i = 0; i < no; i++) {
            var w = self.unique[i];
            console.log(w);
            
        }

        this.wordcloud = new WordcloudDisplay( self.unique, "wordcloud", 100 );
        if (callback) callback();
    }

    self.init();
}




var Sense;


function readTextFile( txt, callback ) {
   if (txt === "philosophie") {
        console.log("Hallo, Philosophie");
        var el = document.getElementById("textfield");
        el.innerHTML = philosophie;

       var t = philosophie;
       t = t.toLowerCase();
       t = t.replace(new RegExp('\r?\n','g'), ' ');
       t = t.replace(/[.,\/#"!$%\^&\*;»«:{}=\-_?'`~()]/g,"");
   
       var b = new Bag(t, callback);
       Sense = new Alternatives( philosophie );


   }
}




if (typeof module !== 'undefined') {
    module.exports = Bag;
}