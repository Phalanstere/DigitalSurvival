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

### 3 Wenn 






