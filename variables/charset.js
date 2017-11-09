function CharSet( no, div ) {

var self = this;

this.trigger = function(seq) {
    //alert(seq.length);
    for (var i = 0; i < seq.length; i++) {
        var c = seq[i];
        var x = c.charCodeAt( 0 );
        var id = "cs_" + x;
        var el = document.getElementById( id );
        TweenMax.to(el, 2, { background:"yellow"});
    }
}

this.reset = function() {
    for (var i = 0; i < no; i++) {
        var id = "cs_" + i;
        var el = document.getElementById(id);      
        TweenMax.to(el, 2, { background:"transparent"});  
    }
}



this.list = [];

this.input = function(ev) {
    self.reset();
    self.trigger( ev.value );
}


this.init = function() {
    var s = "";

    s += '<div class = "CharSet">';
    s += '<input onChange = "v.charset.input(this)" typ= "text" />';
    s += '<br>'
    s += '<br>'

    for (var i = 0; i < no; i++) {
        var id = "cs_" + i;
        var c = String.fromCharCode( i );
        self.list.push(c);

        s += '<div id = "' + id + '" class = "charsetItem">' + c + '</div>';
    }

    s += '</div>';

    var el = document.getElementById(div);
    el.innerHTML = s;
}

self.init();
}