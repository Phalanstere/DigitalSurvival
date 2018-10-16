
var bear = {
    title: "Bear",
    image: "bag_of_words/recommendations/bear.jpg"     
}

var car = {
    title: "Bear",
    image: "bag_of_words/recommendations/car.jpg"     
}


var dog = {
    title: "Dog",
    image: "bag_of_words/recommendations/dog.jpg"     
}

var doll = {
    title: "Dog",
    image: "bag_of_words/recommendations/doll.jpg"     
}


var duck = {
    title: "Dog",
    image: "bag_of_words/recommendations/duck.jpg"     
}

var handgrenade = {
    title: "Handgrenade",
    image: "bag_of_words/recommendations/handgrenade.jpg"     
}


var hare = {
    title: "Hare",
    image: "bag_of_words/recommendations/hare.jpg"     
}

var indigene = {
    title: "Indian",
    image: "bag_of_words/recommendations/indigene.jpg"     
}

var mickey = {
    title: "Mickey Mouse",
    image: "bag_of_words/recommendations/mickey.jpg"     
}

var penguin = {
    title: "Penguin",
    image: "bag_of_words/recommendations/penguin.jpg"     
}

var spider = {
    title: "Dog",
    image: "bag_of_words/recommendations/spider.jpg"     
}

var thor = {
    title: "Thor",
    image: "bag_of_words/recommendations/thor.jpg"     
}

var uboard = {
    title: "Uboard",
    image: "bag_of_words/recommendations/uboard.jpg"     
}

var products = [bear, car, dog, doll, duck, handgrenade, hare, indigene, mickey, penguin, spider, thor, uboard];

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

    this.round = 0;

    this.is_running = function() {
        self.round ++;

        if ( ! self.roundcounter ) {
                self.roundcounter = document.getElementById("roundcounter");
            }

        self.roundcounter.innerHTML = self.round;
    }



    this.process = function() {
        console.log("Pointer steht bei " + self.pct);

        switch( self.pct ) {

            case 0:
                self.intro();
               
            break;

            case 1:
            self.levenshtein();
            break;

            case 2:
             self.demo();   
            break;


            case 3:
            self.recommendation();
            break;

            case 4:
            self.paint_markow();
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


    this.returnWord = function(word) {
        var str = "";
        

        for (var i = 0; i < word.length; i++ ) {
            str += '<span class = "lev_word">';
                str += word[i];
            str += '</span>';
        }

        return str;
    }

    this.calculate = function() {
        var x = getEditDistance(self.word1, self.word2);
        var el = document.getElementById("LevDist");
        el.innerHTML = x;
    }


    this.replace = function( no ) {
        var value = prompt("Please enter the new value", value);

        if (value != null) {
           if (no == 1) {
               var el = document.getElementById("word1");
               el.innerHTML = self.returnWord(value);
               self.word1 = value;
           }
           else {
            var el = document.getElementById("word2");
            el.innerHTML = self.returnWord(value);
            self.word2 = value;
           }

        self.calculate();
        }
    }

    this.showLevenshtein = function() {
        var el = document.getElementById( 'background' );
        el.parentNode.removeChild(el);

        var div = document.getElementById("full");

        var w1 = self.returnWord('Hans');
        var w2 = self.returnWord('Hund');

        self.word1 = w1;
        self.word2 = w2;

        var s = '<div id = "lev_title">_Levenshtein Distanz</div>';
        s += '<div id= "LevDist" onclick = "ctrl.calculate()" class = "LevDist">22</div>';
        s += '<div class = "Levenshtein">';

            s += '<div id = "word1" onclick = "ctrl.replace(1)" class = "lev_item">' + w1 + '</div>';
            s += '<div id = "word2" onclick = "ctrl.replace(2)" class = "lev_item">' + w2 + '</div>';
        
        s += '</div>';

        div.innerHTML = s;

        self.calculate();

    }


    this.paint_list = function( list ) {
        var div = document.getElementById("wordlist");
        var s = '';
        for ( var i = 0; i < list.length; i++ ) {
            var item = list[i];
            s += '<div class = "word">' + item + '</div>';
        }

        div.innerHTML = s;
    }


    this.execute = function() {
      var div = document.getElementById("Demo");
      console.log( div.value );
      var val = div.value;
      if (val.length > 2) {
        var ar = Sense.get_relatives( val, 2 );
        if (ar && ar.length > 0) {
            console.log("Bedingung gegeben");
            self.paint_list(ar);
            console.log( ar );
        }

      }

      
    }



    this.linkProduct = function(el) {
        alert("LINK");
    }


    this.showRecommendations = function( el ) {
        var list = el.split('t'); 
        var no = parseInt( list[1] );
        if (self.markow_links === false) {   
            var item = self.recommendations.elements[no];
            self.paint_recommendations(item);
        }

    }

    this.paint_recommendations = function( item ) {
        console.log("sollte die Recommendations malen");
        console.log( item );

        var list = item.links;
        var str = "";
        for (var i = 0; i < list.length; i++) {
            console.log(i);
            var img = './bag_of_words/recommendations/hare.jpg';

            var it = self.recommendations.elements[list[i].id];
            str += '<div class = "recom">';
            str += '<img src = "' + it.obj.image + '" />';
            str += '</div>';
        }


        var el = document.getElementById("recommendations");
        el.innerHTML = str;

    }

    this.triggerMarkow = function(no) {
        var it = self.selected_product;
        self.recommendations.link_to( it, no);
        var item = self.recommendations.elements[it];
        self.paint_recommendations( item );
    }

    this.selectProduct = function(el) {

       if (self.markow_links === false) {       
        var els = document.getElementsByClassName("product");
            
        for (var i = 0; i< els.length; i++) { 
            els[i].classList.remove('activeDiv'); 
            }


        var list = el.split('t'); 
        var no = parseInt( list[1] );
        self.selected_product = no;

        var el = document.getElementById(el);
        if (el.classList) el.classList.add("activeDiv");
       } 
       else {
           var list = el.split('t'); 
           var no = parseInt( list[1] );
           self.triggerMarkow( no );
       }
    }


    this.paint_markow = function() {
        var el = document.getElementById("markow");
        el.innerHTML = '<img src = "./bag_of_words/markow.jpg"/>';
    }

    this.paint_products = function() {
        self.recommendations = new MarkovRecommendation(products);

        var str = "";
        for (var i = 0; i < products.length; i++) {
            var p = products[i];
            str += '<div id = "product' + i + '" onmouseover = "ctrl.showRecommendations( this.id )" onclick= "ctrl.selectProduct(this.id)" ondblclick= "ctr.linkProduct(this.id)" class = "product">';
            str += '<img src = "' + p.image + '" />';
            str += '</div>';
        }


        return str;
    }

    this.markow_links = false;
    
    this.trigger_linker = function() {
        var el = document.getElementById("linker");

        if (self.markow_links === true) {
            self.markow_links = false;
            el.classList.remove("activeLinker");
        }
        else {
            self.markow_links = true;
            el.classList.add("activeLinker");
        }
    }


    this.recommendation = function() {

        var s = '<div id = "lev_title">_Markow-Ketten</div>';
        s+= '<div class = "product-line">'
            s += self.paint_products();
            s += '<div id = "linker" class = "linker" onclick="ctrl.trigger_linker()">MARKOW LINKS</div>';
        s += '</div>';

        s += '<div id = "recommendations" class = "recommendations"></div>';
        s += '<div id = "markow" class = "markow"></div>';
        var div = document.getElementById("full");
        div.innerHTML = s;  
    }


    this.demo = function() {
       var s = '<input onkeyup = "ctrl.execute()" type="text" id="Demo" name="name">';
       s += '<div id = "wordlist" class = "wordlist"></div>';
       
       var div = document.getElementById("full");
       var inner = div.innerHTML;
       inner += s;

       div.innerHTML = inner;

    }


    this.levenshtein = function() {
        var el = document.getElementById( 'background' ); 
        var tl = new TimelineMax({ onComplete: self.showLevenshtein });
        tl.to( el, 1, { opacity: 0.01, color: "blue" } );
        tl.play();
    }


    this.fadeOut = function() {
        var el = document.getElementById( 'big' );
        var tl = new TimelineMax({ });
        tl.pause();
        tl.to( el, 3, { opacity: 0.01, color: "blue" } );
        tl.play();

        var main = document.getElementById("background");
        var tl = new TimelineMax({ });
        tl.pause();
        tl.to( main, 0, { left: '0%', opacity: 1 } );
        tl.play();
    }

    this.bag_of_words = function() {
        window.setTimeout(function(){
            var s = '<div id = "textfield"><img src = "bag_of_words/cover.jpg"/></div>';      
            s += '<textarea id = "question" rows="1" cols="50">search</textarea>';
            s += '<div id = "wordcloud"></div>';
      
            var div = document.getElementById( "background" );
            div.innerHTML = s;

            readTextFile('philosophie', self.bagFront);
        }, 3000);




        // 
    }


    this.bagFront = function() {
        self.fadeOut();

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
        s += '<div id = "big" class = "big">Natural Language Processing</div>';
        var el = document.getElementById(div);
        el.innerHTML = s;
        
    }


    this.init = function() {
        var DynamicCover = new Cover();
        self.navigation();
        self.intro();

        window.setTimeout(function() {
            self.bag_of_words();
            // self.fadeOut();
        }, 16000
        );
    }


    self.init();

}



var ctr;

function startControl() {
    ctr = new Control("Vars");
}