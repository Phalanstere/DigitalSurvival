# Buchstabenhäufigkeit

Wir wollen nun - was eine gute Möglichkeit ist, zu erkennen, ob ein Text auf Deutsch, Spanisch oder Französisch verfasst ist - ein Programm schreiben, das die Buchstabenhäufigkeit in einer Sprache erfasst. Aus Servicegründen habe ich Ihnen schon einmal einige Texte vorbearbeitet - ich habe die Interpunktion und die Leerzeichen entfernt und alle großgeschriebenen Lettern zu kleingeschriebenen umfortatiert. Herausgekommen ist ein endelos langer String, der etwa so aussieht:

Was also ist zu tun? Wir müssen jeden einzelnen Buchstaben des Textes durchgehen, ihn, falls er noch nicht in der Liste existiert, ablegen und dann entsprechend hochzählen. Also: Haben wir das **ß** noch nicht erfasst, fügen wir es mit einem **push** Befehl dem Array hinzu und zählen dann den Index hinzu. Schlussendlich müssen, wenn wir ale Buchstabe erfasst, haben, die Anzahl der Vorkommnisse zur Gesamtzeichenzahl in Proportion setzen - das ist dann die durchschnittliche Worthäufigkeit. Unser Minimalobjekt, das wir in einer Buchstabenliste speichern wollen, sähe so aus: 

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

Was uns dazu noch fehlt, ist die compare-Funktion. 
Wie man sich vorstellen kann, wird der neu zu untersuchende Text nicht bis auf die letzte Nachkommastelle mit dem Modell zusammengehen. Deshalb fügen wir eine Toleranparameter hinzu.

```javascript
function compare ( actual, model, tolerance) 

}
``` 

Zuerst werden wir unsere zu prüfende Liste durchgehen und jeden einzelnen Buchstaben abrufen, etwa so:

```javascript
function compare ( actual, model, tolerance) 
    for (var i = 0; i < actual.legth; i++) {
        var item = actual[ i ];
        // und jetzt sollte der Vergleich folgen
    }

}
``` 

Um vergleichen zu können, müssen wir allerdings eine Suchfunktion haben, die die Frequenzwerte des entsprechenden Buchstabens aus unserem Modell herausholt. Dazu schreiben wir eine kleine Hilfsfunktions namens **scan_model**. Sie durchsucht unser Modell und gibt den entsprechenden Wert aus der Liste zurück:

```javascript
    function scan_model ( char, model ) {
        for (var n = 0; n < model.length; n++ ) {
           var item = model[n];
            if ( model[ n ].char === char ) return model[ n ];      
        }
    }
``` 

Mit dieser Funktion können wir in unserer **compare** Funktion weiterarbeiten:

```javascript
function compare ( actual, model, tolerance) 
    for (var i = 0; i < actual.legth; i++) {
        var item = actual[ i ];
        var model_item = scan_model( item.char );
        // Jetzt der Vergleich

    }

}
``` 


Beim Vergleich wollen wir, dass die Frequenz unseres Items nicht größer ist als die Frequenz des Modell-Items zuzüglich der Tolerenz und nicht kleiner als die Frequenz des Modell-Items abzüglich der Toleranz. Wir können die beiden Grenzwerte folgendermaßen definieren:

```javascript
var upper_range = model_item.frequency + tolerance;
var lower_range = model_item.frequency - tolerance;
}
``` 

Jetzt muss nur noch eine **if** Abfrage folgen. Ist der Wert kleiner als die **lower_range**  
oder ist er größer als die **upper_rtange**, muss das Modell als solches falsch seon. Um diese Falsifizierungs-Bedingung festzuhalten, ist eine Boolesche Variable am Anfang der Funktion vonnöten. Wir nennen sie **valid** und setzen sie probehalber auf **true**


```javascript
    function compare ( actual, model, tolerance) {
       var valid = true; 
        for (var i = 0; i < actual.length; i++) {
            var item = actual[ i ];
            var model_item = scan_model( item.char, model );
   
            if ( model_item) {                   // wir wollen sicherstellen, dass das Item existiert
                var upper_range = model_item.frequency + tolerance;
                var lower_range = model_item.frequency - tolerance;
                if ( item.frequency < lower_range || item.frequency > upper_range) valid = false;
            }

        }
    return valid;
    }

``` 


Insgesamt ergibt sich folgender Code:

```javascript
function sortObj(list, key) {
    function compare(a, b) {
        a = a[key];
        b = b[key];
        var type = (typeof(a) === 'string' ||
                    typeof(b) === 'string') ? 'string' : 'number';
        var result;
        if (type === 'string') result = a.localeCompare(b);
        else result = a - b;
        return result;
    }
    return list.sort(compare);
}



function letter_frequency( text ) {
        // Zuerst wird die Liste definiert
        console.log( text.length);

        var list = [];

        function count_chars ( char ) {
            var found = false; 
           
            for (var n = 0; n < list.length; n++) {
               var obj = list[n];
               
               if ( obj.char === char) {
                    obj.count ++;
                    found = true;
                    }
               }       
            
        
            if ( found === false  ) {
                console.log( char );

                var o = { 
                    char: char,
                    count: 1,
                    frequency: null
                }
                list. push( o );
            }

        }  
        
    for ( var i = 0; i < text.length; i++) {
        var char = text[i];
        count_chars( char );
    } 

    for ( var i = 0; i < list.length; i++) {
        var obj = list[i];
        obj.frequency = (obj.count / text.length);
        console.log( obj.frequency);
    } 


    return list;
    }
    

    var list = letter_frequency(de);


    ``` 
