# Konstruktion des Wagens

### 1. Konstruktion
Der erste Akt: Wir erzeugen ein Funktionsobjekt, das zunächst einmal nur die maximale Geschwindigkeit des Wagens erhält.


```javascript
var x = function Car ( ) {

}
```

Damit der Wagen kein leeres Chassis bleibt, sondern auf Touren kommen kann, ist es sinnvoll, ihm ein entsprechendes Attribut zu verpasen, also:

```javascript
var x = function Car ( max ) {
    this.max_velocity = max;
}
```
<hr>
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

Strenggenommen brauchen wir zwei Listener: einmal für den Augenblick, da der Fahrer das Gas (oder die Bremse) drückt, einen zweiten, um festzuhalten, ob er sie loslässt. Das entspricht der Tastenlogik: **keydown** oder **keyup**


```javascript
var x = function Car ( max ) {
    this.max_velocity = max;

    window.addEventListener("keydown", this.press );        // Taste wird gedrückt
    window.addEventListener("keyup", this.release );      // wird wieder losgelassen
}
```

Wenn wir den Code jetzt ausführen, gibt es einen Fehler. Denn der Listener erwartet eine Funktion, nämlich **this.press**, resp. **this.release**

Erinnern Sie sich? Das ist ein **callback**, wie bei **setTimeout** oder **setInterval** 

Wir sehen hier das Schlüselwort **this**. Das heißt: die Funktion befindet sich im Inneren unseres Objekts, also im Auto.
Dort müssen wir sie platzieren.

<hr>
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
Der entspricht dem Inertialzustand des Anfangs, wenn das Auto still da. Nennen wir ihn also **resting**. Und weil sich dieser Zustand auf das Objekt bezieht: **this.state == resting**


```javascript
    this.state = "resting";
}
```

Wir tun dies sinnvollerweise außerhalb der Funktionsblöcke, die ja erst dann virulent werden, wenn die Funktion aufgreufen wird. Dann wird diese Zuweisung gleich zu Anfang ausgeführt.
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
            break
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

Ja - das Dilemma ist nur, dass unser Auto mit der Außenwelt kommuniziert (z.B. in Gestalt der vorgefertigten **windows** -Funktionen - oder wenn wir beispielsweise auf den Gwedanken verfielen, unsere Wipipedia Funktionalität in unser Aute pflanzen wo wollen).
Damit geht die Selbstbezüglichkeit verloren.

Die Lösung besteht darin, dass wir am Anfang der Funktion über eine Hilfsvariable **self** den Bezug festhalten.

Da diese nie geändert wird, deutet **self** stets auf das Objekt, erhält also die Selbstbezüglichkeit.

In den Funktionsblöcken werden wir statt **this** nun **self** schreiben.


Wie man sieht, ist neben dem Ausgangzustand **resting**  auch noch eine **velocity** hinzugeügt worden.
Das hat bilsang gefehlt. Zwar hatten eine **this.max_velocity**, aber das bezog sich auf die Maximalgeschwindigkeit, nicht auf die tatsächliche Geschwindigkeit des Autos.


<hr>

### 4.  Die Loop - beim laufenden Motor

Ist der Wagen eingeschaltet, läuft der Motor. Etwas ähnliches passiert auch in unserem Funktionsobjekt, das in eine Art autombiler Dauerschleife eintritt.

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
            case "accelerate":
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

# 5. Funktionalität

Keine Angst - der Code wird sich nur noch unwesentlich aufblähen. Im Grunde geht es jetzt um simple Recheroperationen, nämlich

+   dass wir die Geschwindigkeit des Autos erhöhen, wenn wir aufs Gas drücken 
+   sie vermindern, wenn wir bremsen, 
+   dann, wenn weder Gas noch Bremse gedrückt sind, das Trägheitsmoment berechnen. 


## Beschleunigen

```javascript
    if (self.velocity < self.max_velocity) self.velocity += 0.3;               
```
Das heißt: sofern die Geschwindigkeit unterhalb der Maximalgeschwindigkeit liegt, wird der Wert um 0.3 erhöht.
Das ist eine lineare Beschleunigung - und entspricht nicht gerade der Realität, bei der der Beschleunigungsfaktor eine dynamische Größe ist.
Aber es ist nur eine einzige Zeile - und das ist ausschlaggebend.


## Bremsen

Beim Bremsen haben wir es mit dem inversen Zustand zu tun. 

```javascript
    if (self.velocity > 0.5) self.velocity -= 0.5;               
```

## Trägheit

Wird weder gebremst noch Gas gegeben, verlangsamt sich die Fahrt (aufgrund der Reibung und des Trägheismomentes).

```javascript
    if (self.velocity > 0) self.velocity -= 0.05;
```


Das ergibt:



```javascript
var Car = function ( max ) {
    var self = this;

    this.max_velocity = max;
    this.state = "resting";
    this.velocity = 0;

    this.engine = function() {
        switch( this.state) {
            case "accelerate":
                if (self.velocity < self.max_velocity) self.velocity += 0.3; 
            break;

            case "decelerate":
                if (self.velocity > 0.5) self.velocity -= 0.5;   
            break;

            case "resting":
                if (self.velocity > 0) self.velocity -= 0.05;
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


