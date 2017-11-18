# Listen

Listen sind ein extrem mächtiges Werkzeug - letztlich, wenn Sie so wollen, die Urform jeder Datenbank.

In einer Liste (einem **Array**, wie der Terminus heißt) arrangiert man lauter gleichartige Blöcke in ener Reihe.
Eine Liste ist einfach definiert. In Javascrpt hat - wie Sie gesehen haben - die Struktur einer Kiste folgende, auch visuell höchst einprägasame Form. 

```javascript
var a = [];
```

Es gibt, neben dieser Notation, verschiedene Weisen, eine Liste (ein **Array**) zu erzeugen. Wir können z.B. das Schlüsselwort **new** benutzen, mit denen man in Javascript alle erdenklichen Objekte erzeugt, etwa so:

```javascript
var a = new Array();
```
In der Regel ist es sinnvoll, ein Objekt vorab mit Werten zu bestücken.
Denken Sie an die verschiedenen Optionen, die ein Kunde bei einem Callcenter hat:

```javascript
var a = ['Konto kündigen', 'Rechnung einsehen', 'Rechnung reklamieren', 'Sonstiges']
```
 Das **Komma** dient dabei als Operator, der die verschiedenen Einträge voneinander unterscheidt.

Die Javascript **Arrays** besitzen insofern eine große Abstraktionshöhe, als sie alle erdenklichen Objekte aufnehmen können: Zahlen, String, Objekte. Zudem kann man  (auch wenn das keine empfehlenswerte Parxis ist) verschiedene Typen miteinander vermengen, also:

```javascript
var a = ['Konto kündigen', 1, 3.124, {} ]
```

Wie können wir nun auf die Kreiszahl PI zugrefen, die in diesem Array an dritter Stelle steht? Wir schreiben einfach:

```javascript
console.log( a[2] );
```
Warum steht hier eine 2 - und keine 3? Die Erklärung ist, dass man be Arrays grundsätzlich bei der Nullstelle zu zählen beginnt:

```javascript
var a = ['Konto kündigen', 1, 3.124, {} ];
//        0                1   2     3
```

Wie flexibel Arrays sind, wird ersichtlich daran, dass es möglich ist, Arrays zu bilden, die aus Arrays bestehen:

```javascript
var primzahlen = [1, 2, 3, 5, 7, 11, 13, 17 ];
var fibonacci = [1, 2, 3, 6, 12, 24]

var mathlist = [primzahlen, fibonacci];
```
Wie können wir dann auf das dritte Elemente der Primzahlen zugreifen?

```javascript
    mathlist[0, 2];
```
Wir wissen, dass die Primzahlen das erste Elemente in der Liste ist, die Zahl 3 wiederum ist das dritte Element der Primzahlenliste. Und weil wir beim Zugrff auf ein Listenelement bei der Null beginnen, müssen wir in Gedanken also jeweils eine Eins abziehen, also **mathlist[0,2]**


# Das Array-Objekt

Was ist die Antwor, wenn wir das Array daraufhin abfragen, zu welchem Datentyp es gehört:

```javascript
    var x = typeof (mathlist );
    console.log( x );
```
Man könnte erwarten, dass der Compiler mathlist als **Array** identifiziert, aber es sagt uns, dass wir es mit einem Objekt zu tun haben. 

Die Erklärung ist simpel. Dem Array-Ojekt sind neben seiner Aufbewahrungsaufgabe eine Reihe von Funktionen mitgegeben, die für den Listen weentlich sind: Man will sie sortieren können, man will eine Elemente löschen, andere hinzufügen können etc.

Hier einige Befehle:

```javascript
    var a = [1,2,3];
    a.push( 777 ); // push hängt dem Objekt ein Element an
    // a sieht nun so aus: [1,2,3,777];
    
    a.shift(); // shift zieht das erste Element ab 
    // a sieht nun so aus: [2,3,777];
    
    a.pop(); // zieht das letzte Element ab
    // a sieht nun so aus: [2,3];
```

Mit dem Befel **slice** wir können aus dem Array auch eine Unternmenge herausschneiden:

```javascript
    var x = [0,1,2,3,4,5,6,7,8,9]
    var y = x.slice(2,4); // wir wollen die Einträge vom 2. bis zum 4. Element 
    // y beträgt nun [2,3]

    var z = x.slice(1,9);
    // z beträgt [1,2,3,4,5,6,7,8]
```

Bei diesem Vorgang wird - anders als im Falle der voherigen Befehle - das ursprüngliche Array nicht verändert, sondern es wird die Kopie einer Teilmenge zurückgeben.

Will ich also ein Kopie eines Arrays erzeugen, schreibe ich einfach

```javascript
    var x = [0,1,2,3,4,5,6,7,8,9]
    var y = x.slice(0);
```

y enthält nun die gleichen Werte wie x, lässt sich aber nach Belieben modifizieren. Strenggemommen gibt es also nicht mehr eine Kette aus Bausteinen in unserem Speicher, sondern derer zwei.

Aufgabe: Erzeugen Sie eine Reihe von 100 Zufallszahlen 


# Buchstabenhäufigkeit

Wir wollen nun - was eine gute Möglichkeit ist, zu erkennen, ob ein Text auf Deutsch, Spanisch oder Französisch verfasst ist - ein Programm schreiben, das die Buchstabenhäufigkeit in einer Sprache erfasst. Aus Servicegründen habe ich Ihnen schon einmal einige Texte vorbearbeitet - ich habe die Interpunktion und die Leerzeichen entfernt und alle großgeschriebenen Lettern zu kleingeschriebenen umfortatiert. Herausgekommen ist ein endelos langer String, der etwa so aussieht:

Was also ist zu tun? Wir müssen jeden einzelnen Buchstaben des Textes durchgehen, ihn, falls er noch nicht in der Liste existiert, ablegen und dann entsprechend hochzählen. Also: Haben wir das **ß** noch nicht erfasst, fügen wir es mit einem **push** Befehl dem Array hinzu und zählen dann den Index hinzu. Schlussendlich müssen, wenn wir ale Buchstabe erfasst, haben, die Anzahl der Vorkommnisse zur Gesamtzeichenzahl in Proportion setzen - das ist dann die durchschnittliche Worthäufigkeit. Unser Minimalobjekt sähe so aus: 

```javascript
    var letter = {
        char: 'ß',
        count: 1
        frequency: null
    }
    
```

Die  Frequenz kennen wir noch nicht, deshalb setzen wir sie erst einmal auf Null.

Das Buchstabenzählen selbst ist kein großer Akt. Dazu brauchen wir lediglich eine simple Schleife, die folgendermaßen aussieht:

```javascript
for ( var i = 0; i < text.lengt; i++) {
    char = text[i];
} 
```
Diese Schleife wird soviele Male ausgeführt, als der Text Lettern hat. Das funktioniert mittels der Hilsvariable **i**, die beidem Durchlauf hochgezählt, oder im Fachjargon, inkrementiert wird.
Was auffällt: Der Text (obwohl ein String-Objekt) funktioniert ganz ähnlich wie eine Liste. Man kann nämlich mithile der eckigen Klammer und einer Zahl auf ein Textelement zugreifen. **text[27]** gibt ihn genau den 28. Buchstaben des Textes zurück (Sie erinnern sich: wir starten immer mit der Null).


Jetzt bauchen wir einen Befehl, ob der Buchstabe bereits in unserer Endliste zu finden ist. Zuallererst aber müssen wir eine solche Liste überhaupt erst erzeugen.

Nichts einfach als das:

```javascript
    var list = [];
```

Es gäbe eigentlich einen sehr simplex Befehl, der uns helfen könnte ( **Array.includes** ) - aber wir haben ja nicht mit einem simplen Buchstaben, sondern mit einem Objekt zu tun. Deshalb schlage ich vor, wir definieren eine Hilfsfunktion **count_chars**. 


```javascript
    function count_chars ( char ) {        
    }
``` 

Unsere Funktion will einen Buchstaben überprüfen, also müssen wir dem "Schlitz" einen Buchstaben übergeben. Wir nennen - um das kenntlich zu machen - den Parameter **char**. Was passiert nun im Innern der Funktion? Wir gehen, abermals mit einer **for**-Schleife, die bereits bestehenden Elemente durch und schauen, ob das **ß** schon enthalten ist. 

```javascript
    function count_chars ( char ) {
        var found = false; // 
        for (var n = 0; n < list.length; n++)
           var obj = list[i];
           if ( obj.char === char) {
                obj.index ++;
                found = true;
                }
           }       

        if ( found === false ) {
            var o = { 
                char: char,
                count = 1,
                frequency = null
            }
            list. push( o );
        }

    }
``` 

Da unsere list - Funktion am Anfang noch leer ist, kann der erste Teil der Gleichung nicht ausgeführt werden, sie springt also glech zu der Stelle, wo es heißt:

```javascript
    if ( found === false)
``` 

Da wird dann ein Objekt erzeugt und unserer leeren Liste angehängt. Die sieht dann so aus:

```javascript
list[ { char: 'ß', 
        count: 0, 
        frequency: null}  
    ]
``` 

Was passiert beim zweiten Vorkommnis eines **ß**?

In diesem Fall wird das Objekt gefunden und der **count** - Parameter wird um eins hochgezählt.

Damit sind wir fast fertig. Unser Code sieht nun folgendermaßen aus:

```javascript
    // Zuerst wird die Liste definiert
    var list = [];

    function count_chars ( char ) {
        var found = false; // 
        for (var n = 0; n < list.length; n++)
           var obj = list[i];
           if ( obj.char === char) {
                obj.index ++;
                found = true;
                }
           }       

        if ( found === false ) {
            var o = { 
                char: char,
                count = 1,
                frequency = null
            }
            list. push( o );
        }

    }

    // und jetzt vollziehen wir den Textdurchlauf

    for ( var i = 0; i < text.lengt; i++) {
        var char = text[i];
        count_chars( char );
    } 

``` 

Jetzt fehlt nur noch ein einziger Durchlauf, bei dem die Frequenz der einzelnen Letter ermittel wird - und zwar dadurch, dass wir ihre *counts* durch die Gesamtanzahl der Buchstaben teilen. Wieder kommt eine Schleife ins Spiel.

```javascript
    for ( var i = 0; i < list.lengt; i++) {
        var obj = list[i];
        obj.frequency = obj.count < text.length;
    } 
``` 

Damit der Wert einigermaßen schön formatiert wird, könnten wir dem Computer sagen, dass die Frequenz nur zwei Nachkommastellen hat:

```javascript
    obj.frequency = (obj.count < text.length).toFixed( 2 );
``` 

Das war's. Wir haben den "Fingerabdruck" der jeweiligen Landessprache ermittelt und können nun schauen, ob ein anderer Text in etwa diesen Werten entspricht (plus einer gewissen Fehlertoleranz, sagen wir 2% pro Buchstaben). Der gesamte Code sieht nun folgendermaßen aus: 


```javascript
    // Zuerst wird die Liste definiert
    var list = [];

    function count_chars ( char ) {
        var found = false; // 
        for (var n = 0; n < list.length; n++)
           var obj = list[i];
           if ( obj.char === char) {
                obj.index ++;
                found = true;
                }
           }       

        if ( found === false ) {
            var o = { 
                char: char,
                count = 1,
                frequency = null
            }
            list. push( o );
        }

    }

    // und jetzt vollziehen wir den Textdurchlauf

    for ( var i = 0; i < text.lengt; i++) {
        var char = text[i];
        count_chars( char );
    } 

    // jetzt gehen wir unsere Liste durch und ermitteln die Frequenz
    // eines jeden einzenen Buchstabens

    for ( var i = 0; i < list.lengt; i++) {
        var obj = list[i];
        obj.frequency = (obj.count < text.length).toFixed(2);
    } 

``` 

Es ist nun höchst sinnvoll, diese Code in einer Funktion zu verkapseln.
Auf diese Weise können wir beliebie Texte mit ein oder zwei Zeilen überprfen und schauen, ob sie der Sprache entsprchen. Unser Ziel sähe etwa so aus:


```javascript
    var model = letter_frquency( text1 );

    var test = letter_frequency( text2 );
    var result = compare ( test, model);
``` 

Was uns dazu noch fehlt, ist die compare-Funktion
