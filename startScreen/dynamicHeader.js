var greensock = 'http://cdnjs.cloudflare.com/ajax/libs/gsap/latest/TweenMax.min.js';
var coverData = "/startScreen/coverData.js";
var animation = "/startScreen/animation.js";
var cover = "/startScreen/cover.js";

var list = [greensock, coverData, animation];

var css = './startScreen/cover.css';

var DynamicCover = null;

var DynamicJavascript = function( css, src) {
    var head = document.getElementsByTagName('head')[0];

    if ( css && !Array.isArray( css ))  {
        var link = document.createElement('link');
        link.setAttribute('rel', 'stylesheet');
        link.setAttribute('type', 'text/css');
        link.setAttribute('href',  css);
        head.appendChild(link);
    }


    if ( !Array.isArray( src ))  {
        // var head = document.getElementsByTagName('head')[0];
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = src;
        head.appendChild(script);
    }

    if ( Array.isArray( src ))  {
        // var head = document.getElementsByTagName('head')[0];
        for (var i = 0; i < src.length; i++) {
            var script = document.createElement('script'); 
            script.type = 'text/javascript';
            script.src = src[i];

           if (i === src.length -1) {
                script.onload = function() {
                    DynamicCover = new Cover();
                }
           }

            head.appendChild(script);

        }
    }
}


function copyHeader() {
    var x = new DynamicJavascript( css, list );
}