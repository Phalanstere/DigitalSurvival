/**
 * Shuffles array in place.
 * @param {Array} a items An array containing the items.
 */
function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}


function Alberti( list ) {
    var self = this;
    console.log("Alberti-Liste");

    this.init = function () {
        var original = list.slice();
        list = shuffle( list );
        var sequence = [];
        for (var i = 0; i < list.length; i++) {
            var letter = {
                char: original[i],
                replace: list[i]
            }
            sequence.push(letter);
        }

        self.sequence = sequence;
    }

    self.init();
}



var list = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "ä", "ö", "ü", "ß", "à", "á", "é", "è", "ò", "ó" ];

var a = new Alberti(list);