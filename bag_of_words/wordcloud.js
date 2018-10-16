function WordcloudDisplay( list, div, no )  {

    var self = this;


    this.randomPos = function() {
        var left = 90;
        var top  = 90;
        var lpos = (Math.random() * left) + "%";
        var tpos = (Math.random() * top) + "%";

        return {
            left: lpos,
            top: tpos
        }
    }


    this.paint = function() {
        var wc = document.getElementById("wordcloud");
        var html = "";

        for (var i = 0; i < no; i++) {
            var rand = self.randomPos();
            var id = "wc" + i;
            var s = '<div id = "' + id + '" class = "wordcloudItem">';
            s += list[i].word;
            s += '</div>';
            html += s;
        }

        wc.innerHTML = html;
        var max = list[0].frequency;
        var min = list[no].frequency -1;
        var range = max - min;

  

        console.log("Min ist " + min + " -- Max ist: " + max );

        var maxFont = 400;
        var minFont = 17;

        var minOpacity = 0.1;

        for (var i = 0; i < no; i++) {
            var randomPos = self.randomPos();

            var id = "wc" + i;
            var el = document.getElementById(id);

            var item = list[i];
            var freq = item.frequency - min;

            var rg = freq / range;

            // Erittlung Fontgröße
            var fs = Math.ceil( maxFont*rg );
            if (fs > 200) fs = 200;
            if (fs < minFont) fs = minFont;
            fs += "px";

            // Ermittlung Opacity;
            var opac = 1 - rg;
            if (opac < 0.1) opac = 0.1;

            console.log("RANGE " + rg);

            var config = {
                left: randomPos.left, 
                top: randomPos.top,
                fontSize: fs,
                opacity: opac
            }

            TweenLite.set(el, { css: config });



        }

    }


    this.init = function() {
        console.log("WORDCLOUD INITIALISIERT");
        var el = document.getElementById(div);
        if (el) {
            self.div = el;
            self.paint();
        }
    }

    self.init();
}