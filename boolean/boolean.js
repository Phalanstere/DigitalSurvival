function randomizedPoint(obj) {
	if (typeof(obj) === 'object')
		{
        let res;    
		var {min, max, type} = obj;
		if (min) {
			res = Math.random() * (max-min); 
			res += min;
			}
		else {
			res = Math.random() * max;
		}

        switch (type)   {
            case '%':
                res = res.toFixed(2) + type;
            break;

            case "px":
                res = Math.floor(res) + type;
            break;

            default:
                res = Math.floor(res);
            break;
        }

		return res;
    }
    


	return 'input is no object'; 
}

function minmaxRandom(obj) {
	if (typeof(obj) === 'object')
		{
        let res;    
		var {min, max} = obj;

		if (min) {
			res = Math.random() * (max-min); 
			res += min;
			}
		else res = Math.random() * max;
		return res;
		}
	return 'input is no object'; 
}

function randomColor( ) {

    var col = { min: 0, max: 255}
    var r = parseInt( minmaxRandom( col ) );
    var g = parseInt( minmaxRandom( col ) );
    var b = parseInt( minmaxRandom( col ) );

    return 'rgb(' + r + ',' + g + ',' + b + ')';
}


var Boolean = function() {
    var self = this;


    this.token_style = function(div) {
        div.style.position = 'absolute';
        div.style.fontFamily = 'Times New Roman';
        div.style.opacity = 0;
        div.style.color = randomColor();


        div.style.fontSize = '4px';

        return div;
    }

    
    this.random_token = function( no, token, className, duration, params, stagger ) {
        for (var i = 0; i < no; i++) {
            var div = document.createElement("div");
            id = token + i;

            div = self.token_style( div );
            div.id = id;
            div.className = className;
            div.innerHTML = token;  
            
            div.style.left  = randomizedPoint( { min: -60, max: 10, type: '%'} );
            div.style.top   = randomizedPoint( { min: 3, max: 97, type: '%'} );

            console.log( div.style.left );
            self.div.appendChild(div);

        }

        var str = Object.keys(params).map(function(key) {
            return key + '=' + params[key];
          }).join(',');

        console.log(str);

        var stars = document.getElementsByClassName(className);
        if (! stagger) stagger = 0.009;

        TweenMax.staggerTo(stars, duration, params, stagger );

    }


    this.clear = function() {
        var el = document.getElementById("typo");
        var tween = TweenMax.to(el, 2, {left:"2000px", ease: Elastic.easeIn.config(0.2, 0.3)});

        el = document.getElementById("typo2");
        tween = TweenMax.to(el, 2, {left:"2000px", delay: 0.3, ease: Elastic.easeIn.config(0.2, 0.3)}, 0.12);

        el = document.getElementById("typo3");
        tween = TweenMax.to(el, 2, { delay: 1.3, y: -300,
                                     onComplete: self.flow, 
                                     fontSize: '600px', 
                                     ease: Elastic.easeIn.config(0.5, 0.99)  } );
    }




    this.flow = function() {

        var params1 = { opacity: 1, fontSize: '80px', rotation: 720, x: 3200 };
        var params2 = { delay: 1, opacity: 1, fontSize: '80px', color: 'red', rotation: -720, x: 3200  };
        var params3 = { delay: 4, color: 'blue', opacity: 0.7, fontSize: '80px', rotation: 977, x: 3200, y: -500 };
        var params4 = { delay: 5, color: 'orange', opacity: 1, fontSize: '180px', rotation: -172, x: 3200, y: -300 };
        var params5 = { delay: 5, color: 'silver', opacity: 1, fontSize: '180px', rotation: 272, x: 3200, y: 300 };
        var params6 = { delay: 12, color: 'black', opacity: 1, fontSize: '90px', rotation: -18, x: 3200, y: 300 };



        self.random_token(100, '0', 'zero', 1, params1 );
        self.random_token(88, '1', 'one', 2, params2, 0.04 );
        self.random_token(80, '🦋', 'star', 4.2, params3, 0.17 );
        self.random_token(77, 'copy', 'copy', 5, params4, 0.15 );
        self.random_token(37, 'clone', 'clone', 7, params5, 0.33 );
        self.random_token(20, 'x = x<sup>n</sup>', 'formula', 5, params6, 0.17 );

        var el = document.getElementById("typo3");
        TweenMax.to(el, 7, { opacity: 0 } );
    }

    this.types = [];

    this.type = function(no) {
        var type = self.types[no];
        type.cb = setInterval(function() {
            if (type.ct <= type.str.length) {
                var s = type.str;
                var sub = s.substring( 0, type.ct)
                
                type.div.innerHTML = sub;
                
                console.log( type.ct );
                type.ct ++;
            }
           else {
               if (type.onComplete) type.onComplete();
               clearInterval( type.cb);
            }

        }, type.interval);
    }

    this.typewriter = function( id, str, params, interval, delay, onComplete ) {
        var div = document.createElement("div");
        div.id = id;
        for (key in params) {
            console.log( key );
            console.log( params[key]);
            div.style[key] = params[key];
        }

        // div.innerHTML = str;
        self.div.append( div );

        self.types.push({ 
            id: id,
            str: str,
            ct: 0,
            div: document.getElementById(id),
            interval: interval,
            onComplete: onComplete
        });

        var no = self.types.length -1;
        return setTimeout( this.type, delay, no);

    }


    this.explosion = function() {

    }


    this.extension = function() {
        var style = {
            color: 'blue',
            position: 'absolute',
            left: '200px',
            top: '500px'
        }

        self.explosion(5, "x", style);
    }


    this.init = function() {
        var div = document.createElement("div");
        div.id = "boolean";
        div.className = "boolean";

        div.style.background = 'white';
        div.style.width = '100%';
        div.style.height = '100%';
        div.style.position = 'absolute';
        div.style.zIndex = 10;
        div.style.left = 0;
        div.style.top = 0;

        document.getElementsByTagName('body')[0].appendChild(div);
        self.div = document.getElementById("boolean");

        var style = {
            position: 'absolute',
            left: '300px',
            width: '80%',
            top: '220px',
            fontSize: '80px', 
            color: 'gainsboro',
            textShadow: '2px 2px 6px darkslategrey',
            x: 100, 
            y: 50,             
        }


        var str = "0 = 0 × 0 × 0 × 0 × 0 × 0 × 0 × 0";
        self.typewriter("typo", str, style, 166 );

        var str2 = "1 = 1 × 1 × 1 × 1 × 1 × 1 × 1 × 1";
        style.top = '360px';



        self.typewriter("typo2", str2, style, 60, 5000 );


        var str3 = "x = x<sup>n</sup>";
        style.top = '480px';
        style.fontSize = '200px';

        self.typewriter("typo3", str3, style, 60, 8000, self.clear );


        // self.random_token(600, '✸', 'star');


    }

    self.init();
}