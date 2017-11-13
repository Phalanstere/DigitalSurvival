# Konstruktion des Wagens


### 1. Konstruktion
Der erste Akt: Wir erzeugen ein Funktionsobjekt, das zunächst einmal nur die maximale Geschwindigkeit des Wagens erhält.


```javascript
var x = function Car ( max ) {

}
```

Damit der Wagen die Eigenschaft annimmt, ist es sinnvoll, ihm ein entsprechendes Attribut zu verpasen, also:

```javascript
var x = function Car ( max ) {
    this.max_velocity = max;
}
```

### 2. Der Event-Listener

Zweiter Akt: Wir wollen auf das Auto einwirken, also Gas geben und bremsen können. Dazu brauchen wir zwei Interfaces: Gas und Bremse. 

Da wir am Computer nur die Tatsatur zur Verfügung, sollen zwei Tasten diese Aufgabe übernehmen.

*ArrowUp* bedeutet **Gas geben**
*ArrowDown* bedeutet **bremsen**


Um diese Funktionalität bereitzustellen, erzeugen wir einen Listener:


```javascript
var x = function Car ( max ) {
    this.max_velocity = max;

    window.addEventListener("keydown", self.interface );

}
```

Strenggenommen brauchen wir zwei Listener: einmal für den Augenblick, da der Fahrer das Gas (oder die Bremse) drückt, ein anderen, um festzuhalten, ob er sie loslässt. Das entspricht der Tastenlogik: **keydown** oder **keyup**


```javascript
var x = function Car ( max ) {
    this.max_velocity = max;

    window.addEventListener("keydown", this.press );        // Taste wird gedrückt
    window.addEventListener("keyup", this.release );      // wird wieder losgelassen
}
```

Wenn wir den Code jetzt ausführen, gibt es einen Fehler. Denn der Listener erwartet eine Funktion, nämlich **this.press**, resp. **this.release**

Wir sehen hier das Schlüselwort **this**. Das heißt: die Funktion befindet sich im Inneren unseres Objekts, also im Auto.
Dort müssen wir sie platzieren.


### 3. Verarbeitung des Events / der Zustand des Autos

Wir fügen also die beiden Funktion hinzu:

```javascript
var Car = function ( max ) {
    this.max_velocity = max;

    this.press = function(event) {
    }

    this.release = function(event) {
    }


    window.addEventListener("keydown", this.press );    // Taste wird gedrückt
    window.addEventListener("keyup", this.release );    // wird wieder losgelassen
}
```

Wir sehen, dass beide Funktionen ein **Event** erhalten - nämlich unsere Tastaturaktion.

Diese wird im Innern der Funktion bearbeitet. Vor allem gilt es herauszufinden, welche Taste gedrückt worden ist, keydown oder keyup oder irgendeine Taste.

Dazu brauchen wir den **event.code**. Da es mehrere Möglichkeiten gibt, nutzen wir die **switch** Funktion

```javascript
var Car = function ( max ) {
    this.max_velocity = max;

    this.press = function(event) {
        switch(event.code) {
            
            case 'ArrowUp':
                console.log("Gas geben");
            break;

            case 'ArrowDown':
                console.log("bremsen");
            break;
        }
    }

    this.release = function(event) {
        switch(event.code) {
            
            case 'ArrowUp':
                console.log("Vom Gas gehen");
            break;

            case 'ArrowDown':
                console.log("von der Bremse gehen");
            break;
        }
    }

    window.addEventListener("keydown", this.press );  // Taste wird gedrückt
    window.addEventListener("keyup", this.release );    // wird wieder losgelassen
}
```

Wir könnten natürlich, wenn der Nutzer Gas gibt, sogleich die Geschwindigkeit erhöhen, aber wir halten erst einmal den Zustand fest.

Also: **accerlate**
Und:  **declerate**


Das könnte so aussehen:


```javascript

    this.press = function(event) {
        switch(event.code) {
            
            case 'ArrowUp':
                this.state = "accelerate";
            break;

            case 'ArrowDown':
                this.state = "decelerate";
            break;

        }

    }

```

Im Falle der Releasefunktion müssten wir diese Zusände aufheben und den Trägheitszustand setzen.
Der entspricht dem Inertialzustand des Anfangs, also wenn das Auto still da. Nennen wir ihn also **resting**


```javascript
    this.state = "resting";
}
```

Wir tun dies sinnvollerweise außerhalb der **interface**-Fuktion. Dann wird diese Zuweisung nämlich gleich zu Anfang ausgeführt.
Der Code sieht nun folgendermaßen aus.


```javascript
var Car = function ( max ) {

    this.max_velocity = max;
    this.state = "resting";
    this.velocity = 0;              // Anfanggeschwindigkeit ist Null


    this.press = function(event) {
        switch(event.code) {
            
            case 'ArrowUp':
                self.state = "accelerate";
            break;

            case 'ArrowDown':
                self.state = "decelerate";
            break;
        }

    this.release = function(event) {
        switch(event.code) {
            
            case 'ArrowUp':
                self.state = "resting";
            break;

            case 'ArrowDown':
                self.state = "resting";
            break;
        }
    }


    window.addEventListener("keydown", this.press );    // Taste wird gedrückt
    window.addEventListener("keyup", this.release );    // wird wieder losgelassen
}
```

#### self = this

Warum steht in den Funktionen **self.state**? Müsste es nicht **this.state** heißen?

Ja - das Dilemma ist nur, dass unser Auto mit der Außenwelt kommuniziert (z.B. in Gestalt der vorgefertigten **windows** -Funktionen).
Damit geht die Selbstbezüglichkeit verloren.

Die Lösung besteht darin, dass wir am Anfang der Funktion über eine Hilfsvariable **self** den Bezug festhalten.
Da diese nie geändert wird, deutet **self** nun immer auf das Objekt.

In den Funktionsblöcken werden wir also statt **this** nun **self** schreiben.


Wie man sieht, ist neben dem Ausgangzustand **resting**  auch noch eine **velocity** hinzugeügt worden.
Das hat bilsang gefehlt. Zwar hatten wir eine **this.max_velocity**, aber das bezog sich auf die Maximalgeschwindigkeit,nicht auf die tatsächliche Geschwindigkeit des Autos.


<hr>

### 4.  Die Loop - beim laufenden Motor

Ist der Wagen, eingeschaltet, läuft der Motor. Etwas ähnliches passiert auch in unserem Funktionsobjekt, das in eine Art autombiler Dauerschleife eintritt.

Dazu nutzen wir die **setInterval** Funktion


```javascript
    window.setInterval( this.engine, 50);
}
```

Das bedeutet: im Intervall von 50 Millisekunden wird der Befehl **this.engine** aufgerufen. Diesen müssen wir allerdings noch hinzufügen:


```javascript
    this.engine = function() {
        // tut noch nichts
    }
}
```

Jetzt läuft der Motor - aber es passiert nichts. Eine Zustandsänderung tritt erst ein, wenn wir Gas geben oder die Bremse drücken. Wir wir uns erinnern, haben wir verschiedene Zustände definiert.  


```javascript
    this.engine = function() {
        switch( self.state) {
            case "accelearte":     
            break;

            case "decelerate":
            break;

            case "resting":
            break;
        }
    }
```


Insgesamt sieht unserer Code jetzt so aus:


```javascript
var Car = function ( max ) {
    var self = this;

    this.max_velocity = max;
    this.state = "resting";
    this.velocity = 0;

    this.engine = function() {
        switch( this.state) {
            case "accelearte":
            break;

            case "decelerate":
            break;

            case "resting":
            break;
        }
    }

    this.press = function(event) {
        switch(event.code) {
            
            case 'ArrowUp':
                self.state = "accelerate";
            break;

            case 'ArrowDown':
                self.state = "decelerate";
            break;
        }

    this.release = function(event) {
        switch(event.code) {
            
            case 'ArrowUp':
                self.state = "resting";
            break;

            case 'ArrowDown':
                self.state = "resting";
            break;
        }
    }

    window.addEventListener("keydown", this.interface );  // Taste wird gedrückz
    window.addEventListener("keyup", this.interface );    // wird wieder losgelassen
}
```