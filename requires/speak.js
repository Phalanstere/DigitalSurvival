var speak = function( text ) {
    var ssu = new SpeechSynthesisUtterance( text );
    window.speechSynthesis.speak( ssu );
}


module.exports = speak;