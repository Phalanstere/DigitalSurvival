# Konstruktion des Wagens


### 1.
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

### 2.

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

Strenggenommen brauchen wir zwei Listener: einmal für den Augenblick, da der Fahrer das Gas (oder die Bremse) drückt, ein anderen, um fetzuhalten, ob er sie loslässt. Das entspricht der Tastenlogik: **keydown** oder **keyup**


```javascript
var x = function Car ( max ) {
    this.max_velocity = max;

    window.addEventListener("keydown", this.interface );  // Taste wird gedrückz
    window.addEventListener("keyup", this.interface );    // wird wieder losgelassen
}
```

Wenn wir den Code jetzt ausführen, gibt es einen Fehler. Denn der Listener erwartet eine Funktion, nämlich **this.interface**

Wir sehen hier das Schlüselwort **this**. Das heißt: die Funktion befindet sich im Inneren unseres Objekts, also im Auto

### 3 

Wir fügen also die Funktion hinzu:

```javascript
var Car = function ( max ) {
    this.max_velocity = max;

    this.interface = function(event) {

    }

    window.addEventListener("keydown", this.interface );  // Taste wird gedrückz
    window.addEventListener("keyup", this.interface );    // wird wieder losgelassen
}
```

Wir sehen, dass die Funktionen ein **Event** erhält - nämlich unsere Tastaturaktion.

Das wird nun im Innern der Funktion bearbeitet. Vor allem gilt es herauszufinden, welche Taste gedrückt worden ist.

Dazu brauchen wir den **event.code**. Da es mehrere Möglichkeiten gibt, nutzen wir die **switch** Funktion

```javascript
var Car = function ( max ) {
    this.max_velocity = max;

    this.interface = function(event) {
        switch(event.code) {
            
            case 'ArrowUp':
                console.log("Gas");
            break;

            case 'ArrowDown':
                console.log("Gas");
            break;

        }

    }

    window.addEventListener("keydown", this.interface );  // Taste wird gedrückz
    window.addEventListener("keyup", this.interface );    // wird wieder losgelassen
}
```

Wir könnten natürlich, wenn der Nutzer Gas gibt, sogleich die Geschwindigkeit erhöhen (aber haben wir schon ein solches Attribut, aber wir halten erst einmal den Zustand fest.

Also: **accerlate**
Und:  **declerate**


Das könnte so aussehen


```javascript
var Car = function ( max ) {
    this.max_velocity = max;

    this.interface = function(event) {
        switch(event.code) {
            
            case 'ArrowUp':
                this.state = "accelerate";
            break;

            case 'ArrowDown':
                this.state = "decelerate";
            break;

        }

    }

    window.addEventListener("keydown", this.interface );  // Taste wird gedrückz
    window.addEventListener("keyup", this.interface );    // wird wieder losgelassen
}
```

Am Anfang steht das Auto still, also sollten wir einen Ausgangzustand hinzufügen:


```javascript
    this.state = "resting";
}
```

Wir tun dies sinnvollerweise außerhalb der Interface. Dann wird diese Zuweisung nämlich gleich zu Anfang ausgeführt.
Der Code sieht nun folgendermaßen aus.


```javascript
var Car = function ( max ) {
    this.max_velocity = max;
    this.state = "resting";
    this.velocity = 0;


    this.interface = function(event) {
        switch(event.code) {
            
            case 'ArrowUp':
                this.state = "accelerate";
            break;

            case 'ArrowDown':
                this.state = "decelerate";
            break;

        }

    }

    window.addEventListener("keydown", this.interface );  // Taste wird gedrückz
    window.addEventListener("keyup", this.interface );    // wird wieder losgelassen
}
```

Wie man sieht, ist neben dem Ausgangzustand **resting**  auch noch eine **velocity** hinzugeügt worden.
Das hat bilsang gefehlt. Zwar hatten wir eine **this.max_velocity**, aber das bezieht sich auf die Maximalgeschwindigkeit,nicht auf die tatsächliche Geschwindigkeit des Autos.


