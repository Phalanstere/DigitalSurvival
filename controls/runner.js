var runner = function() {
    var self = this;

    this.init = function() {
        var s = '';

        s += '<div id = "track">';
        s += '</div>';

        s += '<div class ="flag">';
            s += '<img src ="/controls/flag.gif"/>';
        s += '</div>';

        s += '<div id = "roundcounter" class ="roundcounter">7';
        s += '</div>';

        s += '<div id = "runner" class ="runner">';
            s += '<img src ="/controls/runner4.gif"/>';
        s += '</div>';



        var div = document.createElement("div");
        div.innerHTML = s;
        div.id = "stadium";
        div.className = "stadium";
        document.getElementsByTagName('body')[0].appendChild(div);
    }

    self.init();
}


