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



