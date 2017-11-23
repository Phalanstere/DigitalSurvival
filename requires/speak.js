var speak = function( text ) {
        var ssu = new SpeechSynthesisUtterance( text );
        window.speechSynthesis.speak( ssu );
}


exports.speak = speak;
