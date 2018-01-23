var rough = 'RoughEase.ease.config({ template:  Power0.easeNone, strength: 1, points: 20, taper: "none", randomize: true, clamp: false});';

var coverEvents = [
    {
    type: "typewriter",
    time: 2000,
    text: 'Digital Survival Training',
    div: "digital",
    duration: 3000,
    color: "rgb(92,92,92)",
    },
    {
    type: "greensock",	
    div: "digital",
    time: 6000,
    duration: 1800,
    left: '105%',
    opacity: 0.1,
    ease: 'Elastic.easeIn.config(0.7, 0.9)'
    }, 
    {
    type: "greensock",	
    div: "vertical1",
    time: 100,
    duration: 800,
    left: '67%',
    ease: 'Elastic.easeOut.config(1, 0.3)'
    }, 
    {
    type: "greensock",	
    div: "vertical2",
    time: 400,
    duration: 1200,
    left: '67.9%',
    ease: 'Back.easeOut.config(1.7)'
    }, 
    {
    type: "greensock",	
    div: "vertical3",
    time: 70,
    duration: 1600,
    left: '85.9%',
    ease: 'Elastic.easeOut.config(0.1, 0.7)'
    }, 
    {
    type: "greensock",	
    div: "vertical4",
    time: 70,
    duration: 2000,
    left: '2.9%',
    ease: 'Elastic.easeOut.config(0.6, 0.7)'
    }, 
    {
    type: "greensock",	
    div: "vertical5",
    time: 70,
    duration: 2000,
    left: '7.9%',
    ease: 'Elastic.easeOut.config(0.6, 0.7)'
    }, 

    {
    type: "greensock",	
    div: "vertical1",
    time: 4300,
    duration: 700,
    left: '-50',
    background: 'green',
    width: '1px',
    ease: 'Elastic.easeOut.config(0.6, 0.7)',
    boxShadow: '10px 1px 100px black'
    }, 
    {
    type: "greensock",	
    div: "vertical3",
    time: 4000,
    duration: 2700,
    left: '130%',
    width: '7px',
    ease: 'Bounce.easeIn',
    boxShadow: '-150% 1px 1px black'
    }, 
    {
    type: "greensock",	
    div: "vertical5",
    time: 4500,
    duration: 2000,
    left: '107.9%',
    ease: 'Elastic.easeIn.config(0.6, 0.7)'
    }, 
    {
    type: "greensock",	
    div: "vertical4",
    time: 4000,
    duration: 2700,
    left: '-10%',
    width: '7px',
    ease: 'Bounce.easeIn'
    }, 
    {
    type: "greensock",	
    div: "vertical2",
    time: 4600,
    duration: 900,
    left: '-50px',
    background: 'green',
    width: '1px',
    ease: 'Elastic.easeOut.config(0.6, 0.7)',
    boxShadow: '10px 1px 100px black'
    }, 

    {
    type: "greensock",	
    div: "cover",
    time: 11000,
    duration: 500,
    opacity: 0.01,
    scale: 4
    }, 
]

function ShakingTitle( div, start, duration, shocks ) {
    var interval = duration / shocks;
    var dur = interval*0.9;

    var fl = 0.03;
    var tfl = 12;
    var ofl = 0.6;

    for (var i = 0; i < shocks; i++) {
        var x = 1 - ( ( Math.random() * fl) - fl/2 );
        console.log( x );
        var scale = 'scale(' + x + ')';

        var ts = parseInt( (Math.random() * tfl) - (tfl/2) );
        var textShadow = ts + 'px + 2px + 10px darkslategrey';

        var op = ( Math.random() * ofl ) + 0.4;

        var rot = parseInt(Math.random() * 0.5) - 0.25 ;
   

        var o = {
            type: "greensock",	
            div: "titling",
            time: ( i* interval) + start,
            duration: dur,
            opacity: Math.random(),
            scale: scale,
            textShadow: textShadow,
            ease: 'sine.easeIn'
            };
        coverEvents.push( o );

    }
}




ShakingTitle('titling', 100, 12000, 8);




var coverDivs = [
                  { id: 'titling', className: 'cover-title',  innerHTML: 'Objekte'},
                  { id: 'vertical1', className: 'vertical',  innerHTML: ''},
                  { id: 'vertical2', className: 'vertical',  innerHTML: ''},
                  { id: 'vertical3', className: 'vertical',  innerHTML: ''},
                  { id: 'vertical4', className: 'verticalR',  innerHTML: ''},
                  { id: 'vertical5', className: 'verticalR',  innerHTML: ''},
                  { id: 'digital', className: 'digital',  innerHTML: ''}
                ];



    function randomizedValue() {

    }


    function FloatingVerticals(start, duration, moves) {
        var interval = duration / 2;
        var ftime = 2000;
        var out = parseInt( duration* 0.56);

        var dur = interval*0.9;
        for (var i = 0; i < moves; i++) {
            var mv = "move" + i;
            var className = "vertical";
            if ( Math.random() > 0.5 ) className = "verticalR";

            var m = { id: mv, className: className, innerHTML: '' };
            coverDivs.push( m );
            
            var pos = (Math.random() * 100) + "%";

            var intime =  500 + parseInt( Math.random() * 1000) - (1000/2);
            var shadow = parseInt( Math.random() * 4);
            var ts = shadow + 'px 2px 10px darkslategrey';

            var inDiv = {
            type: "greensock",	
            div: mv,
            time: intime,
            duration: 1200,
            opacity: Math.random(),
            left: pos,
            textShadow: ts,
            ease: 'Elastic.easeOut.config(0.1, 0.7)'
            };
            
            coverEvents.push( inDiv );
            var npos = '120%';
            if (Math.random() > 0.5) npos = '-20%';

            var otime =  out + parseInt( Math.random() * ftime) - (ftime/2);
            

            var outDiv = {
                type: "greensock",	
                div: mv,
                time: otime,
                duration: 1200,
                opacity: Math.random(),
                left: npos,
                ease: 'Elastic.easeIn.config(0.1, 0.7)'
                };
                
            coverEvents.push( outDiv );


        }
    }
                
    FloatingVerticals(100, 15000, 10);


