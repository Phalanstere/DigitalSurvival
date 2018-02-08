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


    this.additional = function() {
        var div = document.createElement("div");
        div.id = "JSON";
        div.className = "JSON";
        var s = '<img src = "js/JSON.png"/>';
        s += '<div>JSON</div>';
        div.innerHTML = s;    
        document.body.appendChild(div);

        var json = document.getElementById("JSON");
        TweenLite.to(json, .3, { opacity: 1, scale: 1 });

        div = document.createElement("div");
        div.id = "AJAX";
        div.className = "AJAX";
        var s = '<img src = "js/ajax.png"/>';
        div.innerHTML = s;    
        document.body.appendChild(div);

        var ajax = document.getElementById("AJAX");
        TweenLite.to(ajax, .7, { scale: 1 });


        div = document.createElement("div");
        div.id = "mongo";
        div.className = "mongo";
        var s = '<img src = "js/mongo.png"/>';
        div.innerHTML = s;    
        document.body.appendChild(div);

        var mongo = document.getElementById("mongo");
        TweenLite.to(mongo, .7, { opacity: 1, scale: 1 });


        div = document.createElement("div");
        div.id = "couch";
        div.className = "couch";
        var s = '<img src = "js/couchdb.png"/>';
        div.innerHTML = s;    
        document.body.appendChild(div);

        var couch = document.getElementById("couch");
        TweenLite.to(couch, .7, { opacity: 1, scale: 1 });

    }


    this.fadeOut = function() {
        var couch = document.getElementById("couch");
        TweenLite.to(couch, .7, {  left: -800 });

        var mongo = document.getElementById("mongo");
        TweenLite.to(mongo, .7, {  left: 2000 });

        var ruby = document.getElementById("Ruby");
        TweenLite.to(ruby, .7, {  left: -700 });

        var csharp = document.getElementById("csharp");
        TweenLite.to(csharp, .7, {  left: -700 });

        var json = document.getElementById("JSON");
        TweenLite.to(json, .7, {  left: 2700 });

        var ajax = document.getElementById("AJAX");
        TweenLite.to(ajax, .7, {  left: 2700 });

        var php = document.getElementById("PHP");
        TweenLite.to(php, .7, {  left: 2700 });

        var java = document.getElementById("Java");
        TweenLite.to(java, .7, {  left: 2700 });

        var js = document.getElementById("JS");
        TweenLite.to(js, 1.7, {  delay: 2, opacity: 0 });

        TweenLite.to(js, .7, {  left: -2000, delay: 4, onComplete: self.reasons });
    }

    this.removeElements = function() {
        var js = document.getElementById("JS");
        TweenLite.to(js, .7, { scale: 12, y: +1600, onComplete: self.fadeOut } );
    }


    this.imbroglio = function() {
        var big = document.getElementById("big");
        TweenMax.to(big, 1, { 
            x: 2000,
            opacity: 0,
            ease: 'Elastic.easeIn.config(0.5, 0.3)'
            });

        var div = document.createElement("div");
        div.id = "JS";
        div.className = "JS";
        var s = '<img src = "https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/480px-Unofficial_JavaScript_logo_2.svg.png"/>';
        div.innerHTML = s;    
        document.body.appendChild(div);

        div = document.createElement("div");
        div.id = "Perl";
        div.className = "Perl";
        s = '<img src = "js/Perl.png"/>';
        div.innerHTML = s;    
        document.body.appendChild(div);

        div = document.createElement("div");
        div.id = "Basic";
        div.className = "Basic";
        s = '<img src = "js/vs_logo.jpg"/>';
        div.innerHTML = s;    
        document.body.appendChild(div);

        div = document.createElement("div");
        div.id = "Java";
        div.className = "Java";
        s = '<img src = "js/Java.png"/>';
        div.innerHTML = s;    
        document.body.appendChild(div);

        div = document.createElement("div");
        div.id = "ActiveX";
        div.className = "ActiveX";
        s = '<img src = "js/activex.gif"/>';
        div.innerHTML = s;    
        document.body.appendChild(div);

        div = document.createElement("div");
        div.id = "csharp";
        div.className = "csharp";
        s = '<img src = "js/csharp.png"/>';
        div.innerHTML = s;    
        document.body.appendChild(div);

        div = document.createElement("div");
        div.id = "Ruby";
        div.className = "Ruby";
        s = '<img src = "js/Ruby.png"/>';
        div.innerHTML = s;    
        document.body.appendChild(div);

        div = document.createElement("div");
        div.id = "PHP";
        div.className = "PHP";
        s = '<img src = "js/php.png"/>';
        div.innerHTML = s;    
        document.body.appendChild(div);

        div = document.createElement("div");
        div.id = "flash";
        div.className = "flash";
        s = '<img src = "js/flash.png"/>';
        div.innerHTML = s;    
        document.body.appendChild(div);

        self.logos_fly_in();
    }


   this.logos_fly_in = function() {
    var js = document.getElementById("JS");
        TweenMax.to(js, .4, { 
            left: 700,
            ease: Bounce.easeOut
            });


       var basic = document.getElementById("Basic");

       TweenMax.to(basic, 1.2, { 
        left: '50px',
        top: 20,
        width: '360px',
        ease: Bounce.easeOut
        });

        var php = document.getElementById("PHP");

        TweenMax.to(php, 1.2, { 
            left: 1600,
            width: '300px',
            height: '300px',
            delay: 4,
            ease: Elastic.easeOut.config(1, 0.3)
            });

        var Ruby = document.getElementById("Ruby");

        TweenMax.to(Ruby, 1.2, { 
            delay: 7,
            y: -620
            });

        var csharp = document.getElementById("csharp");
        TweenMax.to(csharp, 1.2, { 
            left: 100,
            delay: 5,
            ease: Elastic.easeOut.config(1, 0.3)
            });

        var activex = document.getElementById("ActiveX");
        TweenMax.to(activex, 1.2, { 
                left: 100,
                delay: .2,
                ease: Elastic.easeOut.config(1, 0.3)
                });

        var Java = document.getElementById("Java");
        TweenMax.to(Java, 1.2, { 
                right: 160,
                delay: .2,
                ease: Elastic.easeOut.config(0.2, 0.9)
                });
        
        var Perl = document.getElementById("Perl");
        TweenLite.to(Perl, 1.1, { ease: Back.easeOut.config(1.7), top: 100 });

        var flash = document.getElementById("flash");
        TweenLite.to(flash, .3, { delay: 8, scale: 1.7 });

   } 


   this.cleanMarket = function() {
    var activex = document.getElementById("ActiveX");
    TweenMax.to(activex, .7, { left: -760, delay: .2, ease: Elastic.easeIn.config(0.2, 0.9) });

    var Perl = document.getElementById("Perl");
    TweenLite.to(Perl, 2.5, { ease: Back.easeIn.config(1.7), top: -900 });

    var basic = document.getElementById("Basic");
    TweenMax.to(basic, .7, { left: -760, delay: 1.2, ease: Elastic.easeIn.config(0.2, 0.9) });

    var Java = document.getElementById("Java");
    TweenMax.to(Java, .7, { delay: 2, right: 20, top: 20, width: '80px', ease: Elastic.easeIn.config(0.2, 0.9) });

    var csharp = document.getElementById("csharp");
    TweenMax.to(csharp, .7, { width: '80px', ease: Back.easeIn.config(1.7) });

    var php = document.getElementById("PHP");
    TweenMax.to(php, .7, { width: '100px', ease: Back.easeIn.config(1.7) });

    var JS = document.getElementById("JS");
    TweenMax.to(JS, .9, { delay: .2, width: 600, height: 600, x: -100, y: -150 });
   
    var Ruby = document.getElementById("Ruby");
    TweenMax.to(Ruby, .7, { left: 50, bottom: 50, ease: Back.easeIn.config(1.7) });

    var flash = document.getElementById("flash");
    TweenLite.to(flash, .5, { top: -600 });
}


    this.reasons = function() {
        var div = document.createElement("div");
        div.id = "bull";
        div.className = "bull";
        var s = '<img src = "js/bull.png"/>';
        div.innerHTML = s;    
        document.body.appendChild(div);

        TweenLite.to(flash, .5, { top: -600, scale: 0.1 });

    }


    this.bulls = function() {
        var n = 300;

        for (var i = 0; i < n; i++) {
            var id = "bull_" + i;
            var x = parseInt( Math.random() * 1920 );
            var y = parseInt( Math.random() * 1080 );

            var div = document.createElement("div");
            div.className = "small_bull";
            div.id = id; 
            document.body.appendChild(div);

            var el = document.getElementById(id);
            TweenLite.to(el, 0, { top: y, left: x });
        }

        var cl = document.getElementsByClassName( 'small_bull' );
        TweenMax.staggerTo( cl, 0.5, { opacity:1 , background: 'yellow' }, 0.02 ); 

        var bull = document.getElementById( 'bull' );
        TweenLite.to(bull, 1.3, { delay: 5.2, opacity: 0 });
    }


    this.fade_in_map = function() {
        var map = document.getElementById( 'map' );
        TweenLite.to(map, .3, { opacity: 1 });
    }

    this.fade_map_out = function() {
        var map = document.getElementById( 'map' );
        TweenLite.to(map, 1.3, { opacity: 0, onComplete: self.building_blocks });


    }


    this.building_blocks = function() {
        var div = document.createElement("div");
        div.id = "JS2";
        div.className = "JS2";
        var s = '<img src = "js/JS.png"/>';
        div.innerHTML = s;    
        document.body.appendChild(div);

        div = document.createElement("div");
        div.id = "html5";
        div.className = "html5";
        var s = '<img src = "js/html5.png"/>';
        div.innerHTML = s;    
        document.body.appendChild(div);

        div = document.createElement("div");
        div.id = "CSS";
        div.className = "CSS";
        var s = '<img src = "js/css.png"/>';
        div.innerHTML = s;    
        document.body.appendChild(div);

    }


    this.studio_code = function() {
        var div = document.createElement("div");
        div.id = "studio";
        div.className = "studio";
        var s = '<img src = "js/StudioCode.svg"/>';
        div.innerHTML = s;    
        document.body.appendChild(div);
    }

    this.hide_map = function() {
        var cl = document.getElementsByClassName( 'small_bull' );
        TweenMax.staggerTo( cl, 0.5, { x: +2000}, 0.005 ); 
        setTimeout( self.fade_map_out, 3000);
    }


    this.show_map = function() {
        self.lang = 52.5192;
        self.lat = 13.4061;

        var style = [
            {
                "featureType": "all",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "all",
                "elementType": "labels",
                "stylers": [
                    {
                        "visibility": "off"
                    },
                    {
                        "saturation": "-100"
                    }
                ]
            },
            {
                "featureType": "all",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "saturation": 36
                    },
                    {
                        "color": "#000000"
                    },
                    {
                        "lightness": 40
                    },
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "all",
                "elementType": "labels.text.stroke",
                "stylers": [
                    {
                        "visibility": "off"
                    },
                    {
                        "color": "#000000"
                    },
                    {
                        "lightness": 16
                    }
                ]
            },
            {
                "featureType": "all",
                "elementType": "labels.icon",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "administrative",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#000000"
                    },
                    {
                        "lightness": 20
                    }
                ]
            },
            {
                "featureType": "administrative",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "color": "#000000"
                    },
                    {
                        "lightness": 17
                    },
                    {
                        "weight": 1.2
                    }
                ]
            },
            {
                "featureType": "landscape",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#000000"
                    },
                    {
                        "lightness": 20
                    }
                ]
            },
            {
                "featureType": "landscape",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#43474f"
                    }
                ]
            },
            {
                "featureType": "landscape",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "color": "#4d6059"
                    }
                ]
            },
            {
                "featureType": "landscape.natural",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#4d6059"
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "geometry",
                "stylers": [
                    {
                        "lightness": 21
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#4d6059"
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "color": "#4d6059"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "geometry",
                "stylers": [
                    {
                        "visibility": "on"
                    },
                    {
                        "color": "#7f8d89"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#7f8d89"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#7f8d89"
                    },
                    {
                        "lightness": 17
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "color": "#7f8d89"
                    },
                    {
                        "lightness": 29
                    },
                    {
                        "weight": 0.2
                    }
                ]
            },
            {
                "featureType": "road.arterial",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#000000"
                    },
                    {
                        "lightness": 18
                    }
                ]
            },
            {
                "featureType": "road.arterial",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#7f8d89"
                    }
                ]
            },
            {
                "featureType": "road.arterial",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "color": "#7f8d89"
                    }
                ]
            },
            {
                "featureType": "road.local",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#000000"
                    },
                    {
                        "lightness": 16
                    }
                ]
            },
            {
                "featureType": "road.local",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#7f8d89"
                    }
                ]
            },
            {
                "featureType": "road.local",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "color": "#7f8d89"
                    }
                ]
            },
            {
                "featureType": "transit",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#000000"
                    },
                    {
                        "lightness": 19
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "all",
                "stylers": [
                    {
                        "color": "#2b3638"
                    },
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#2b3638"
                    },
                    {
                        "lightness": 17
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#24282b"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "color": "#24282b"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "labels",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "labels.text",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "labels.text.stroke",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "labels.icon",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            }
        ]


        var mapProp= {
            center:new google.maps.LatLng(self.lang, self.lat),
            zoom: 6,    
            display: true,
            styles: style
        };
        var map=new google.maps.Map(document.getElementById("gmaps"),mapProp);
        self.map = map;
        window.map = map;
        
        document.getElementById("map").style.display = "block";

        self.fade_in_map();
    }



    this.process = function() {
        console.log("Pointer steht bei " + self.pct);

        switch( self.pct ) {

            case 0:
                self.intro();
               
            break;

            case 1:
                // var b = new Boolean();
                self.imbroglio();
            break;

            case 2:
                self.cleanMarket();
            break;


            case 3:
                self.additional();
            break;

            case 4:
                self.removeElements();
            break;


            case 5:
                self.bulls();
            break;

            case 6:
                self.show_map();
            break;

            case 7:
                self.hide_map();
            break;

            case 8:
                self.studio_code();
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
                self.start_loop();
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
    


    this.intro = function() {
        var s = "";
        s += '<div id = "big" class = "big">Javascript</div>';
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