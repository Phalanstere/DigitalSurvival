# Listen

Listen sind ein extrem mächtiges Werkzeug - letztlich, wenn Sie so wollen, die Urform jeder Datenbank.

In einer Liste (einem **Array**, wie der Terminus heißt) arrangiert man lauter gleichartige Blöcke in ener Reihe.
Eine Liste ist einfach definiert. In Javascrpt hat - wie Sie gesehen haben - eine Liste folgende, auch visuell höchst einprägasame Kisten-Form. 

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

Die Javascript **Arrays** besitzen insofern eine große Abstraktionshöhe, als sie alle erdenklichen Objekte aufnehmen können: Zahlen, Strings, Objekte etc. Zudem kann man  (auch wenn das keine empfehlenswerte Prxis ist) verschiedene Typen miteinander vermengen, also:

```javascript
var a = ['Konto kündigen', 1, 3.124, {} ]
```

Wie können wir nun auf die Kreiszahl PI zugrefen, die in diesem Array an dritter Stelle steht? Wir schreiben einfach:

```javascript
a[2] 
```
Und um es anzeigen zu lassen:

```javascript
console.log( a[2] );
```

Warum steht hier eine 2 - und keine 3? Die Erklärung ist, dass man bei Arrays grundsätzlich bei der Nullstelle zu zählen beginnt:

```javascript
var a = ['Konto kündigen', 1, 3.124, {} ];
//        0                1   2     3
```

Wie flexibel Arrays sind, wird ersichtlich daran, dass es möglich ist, Arrays zu bilden, die aus Arrays bestehen:

```javascript
var primzahlen = [1, 2, 3, 5, 7, 11, 13, 17 ];
var fibonacci = [1, 1, 2, 3, 5, 8, 13, 21, 32]

var mathlist = [primzahlen, fibonacci];
```
Wie können wir dann auf das dritte Elemente der Primzahlen zugreifen?

```javascript
    mathlist[0, 2];
```
Wir wissen, dass die Primzahlen das erste Elemente in der Liste ist, die Zahl 3 wiederum ist das dritte Element der Primzahlenliste. Und weil wir beim Zugrff auf ein Listenelement bei der Null beginnen, müssen wir in Gedanken also jeweils eine Eins abziehen, also **mathlist[0][2]**


# Das Array-Objekt

Was ist die Antwor, wenn wir das Array daraufhin abfragen, zu welchem Datentyp es gehört:

```javascript
    var x = typeof (mathlist );
    console.log( x );
```
Man könnte erwarten, dass der Compiler **mathlist** als **Array** identifiziert, aber es sagt uns, dass wir es mit einem Objekt zu tun haben. 

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
    var y = x.slice(2,4); // wir wollen die Einträge vom 2. bis zum 4. Element herausholen
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