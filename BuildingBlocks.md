# Das Web und seine Bausteine 

Zunächst einmal wollen wir uns, bevor wie in die Programmierungswelten einsteigen, einen Editor herunterladen, der uns bei unserer ersten Lektion, aber auch künftig, gute Dienste leisten kann.

**Micrrosoft** hat mit seinem **Visual Studio** einen sehr schönen Editor ist, der zudem kostenlos ist:


[Microsoft Visual Studio](https://code.visualstudio.com)

## HTML

Was ist der Grundbaustein des heutigen Internets? 

**HTML**, also jene **H**ypter**t**ext **M**arkup **L**anguage, wie sie Tim Berners-Lee in den frühen 90ern am CERN entwickelte.

Schauen wir uns ein **minimales HTML-Dokument** einmal an:  


```html
<!-- Das ist eine Kommentarzeile -->

<!doctype html>
<html lang=en>
    <head>
        <meta charset=utf-8>
        <title>Minimal Art - Titel</title>
    </head>
    <body>
    <p>Minimal Art - Content</p>
    </body>
</html>

```

Wenn Sie diesen Code nehmen und in eine neue Datei hineinkopieren, die Sie **index.html** nennen, haben Sie eine funktionsfähige Webseite erstellt.

Die Elememte sind einfach beschrieben. In der ersten Zeile finden Sie eine Kommentarzeile, die vom Browser ignoriert wird und nur für denjenigen von Belang ist, der mit dem obigen Code umgeht.


Gehen wir die Zeilen einzeln durch:

```html
<!-- Das ist eine Kommentarzeile -->
```

Zunächst fällt auf, dass alle Elemente als SChlüsselzeichen ein öffnendes **<** 
und schließendes **>** aufweisen. Die erste gü+ltige Zeile ist eine Selbstbeschreibung. Damit wird das Dokument als **html**-Dokument qualifiziert.

```html
<!doctype html>
```

Dass und warum dies überaus nützlich ist, kann man sich vergegenwärtigen, wenn man die Selbstbeschreubung des verwandten **xml** Dokument-Tys nimmt:

```html
<?xml version="1.0"?>
```

Direkt an die Selbstbeschreibungszeile schließt sich das erste **Tag** an, das aus gültigen HTML-Elementen besteht und sinnigerweise **html** betitelt ist:

```html
<html lang=en>
    ...
</html>
```

Hier wird, dies nebenbei, die dominaten Sprache der Webseite definiert - eine Information, die für Suchmaschinen-Bots hilfreich ist (und uns nötigen sollte, die Sprache zu **de** zu ändern).


Wie man sehen kann, hat jedes Tag (wie bei einer Klammer) ein **öffnendes** und ein **schließendes** Element. Im schließenden Element gibt es nach dem **<** - Zeichen einen Slash, also **</** - dann den Namen und die schließende spitze Klammer.

Wissen wir also, dass ein Paragraph in HTML als **P** beteichnet wird, ist seine Erzeugung nachgerade ein Kinderspiel:

```html
<p></p>
```

Zwischen den Tags steht dann der eigentliche Content, das, was auf der Webseite angezeigt werden soll.

Wie das Beispiel zeigt, enthält der **html** - Block neben dem **body**, der die Anzeigelemente enthält, zudem einen **head**, der wiederum einen **meta** und einen **title** Tag enthält.

Im **head** lassen sich Informationen verstecken, die für Suchmaschinen wichtig sind, der **meta** tag verweist auf den verwendeten Zeichensatz. Auf diese Weise können chinesische, japanische oder arabische Seiten einen anderen Zeichensatz markieren. 

Der oben verwendete **utf-8** Code unkludiert bereits alle Zeichensysteme, ist also global verwendbar.

Schauen wir uns nun den Teil an, von dem wir wissen, dass er auf der Webseite erscheint:


```html
    ...

    <body>
        <p>Minimal Art - Content</p>
    </body>
```

Hier sehen wir einen Paragraphen, der den folgenden Text anzeigt: **Minimal Art - Content**

HTML - Tags sind, hat man sie einmal begriffen, ziemlich trivial. 

+ &lt;h1> ist eine Überschrift der ersten Kategorie
+ &lt;h2> ist eine Überschrift der zweiten Kategorie
+ &lt;h3> ... dritte Kategorie
+ &lt;h4> ... vierte Kategorie
+ &lt;div> ist ein Divider, dem Paragraphen verwandt - nur dass er auch für Bilder oder andere Steuerelemente reserviert ist
+ &lt;span> ist ein umspannendes Element, das zur Spezififierung von Minimal-Elementen gedacht ist




```html
    <body>
        <h1>Überschrift</h1>
        <p>Minimal Art - Content</p>
    </body>
```

Schauen wir uns diese Seite an, sehen wir, dass der Paragraph und die Überschrift unterschiedlich formatiert worden sind. Warum? Weil den Standard-Tags grundlegende Formatierungsregeln eingebaut sind. Weswegen ein Paragraph anders aussieht als eine Überschrift.

## CSS

UM jedoch die volle Kontrolle über das Aussehen von Websites zu erlangen, wurde eine weitere Sprachspezifikation erstellt, die sogenannten **Cascaded Style Sheets**, kurz: **CSS**.

CSS wird relativ bald nach Einführung von HTML, im Jahr 1994, spezifiert.

Die dahinteliegende Idee war einfach und nachvollziehbar: Man wollte das Aussehen von HTML Tags unabhängig von ihrem Inhalt beeinflussen können.

Wie aber greift nun eine solche CSS-Definition (mit der wir uns gleich beschäftigen werden) auf ein HTML-Element zu? Hier gib es zwei Schlüsselwörter, die man im HTML-Tag definieren kann, 

+ id 
+ class

### id

Eine **id** stellt (auch wenn Nutzer das Prinzip, ohne Folgen zu fürchten, ignoprieren kann) eine einmalige Referenz auf ein HTML-Element dar.

Die **class** wiederum kann mehrere Elemente betreffen. 

Eine **id** wird in css über das Schlüsselzeichen **#** angesprochen, eine Klasse über das Schlüsselzeichen **.**

Nehmen wir an, dass unsere HTML-Tags jetzt mit einer id und einer Klasse versehen sind, etwa so:



```html
    <body>
        <h1 id = "FirstTitle">Überschrift</h1>
        <p class = "FirstClass">Minimal Art - Content</p>
    </body>
```

Dann könnten unsere beide Stil-Spezifationen folgendermaßen aussehen:

```css
#FirstTitle{
    font-family: monospace;
}

.FirstClass{
    font-variant: italic;
    color: red;
}
```

Sinnigerweise schreiben wir diese beiden Definitionen ine eine **css** Datei, die wir beispielsweise **style.css** nennen können.

Damit unsere html-Datei darauf zugreifen kann, muss diese Datei am Anfang deklariert werden. Zu diesem Zweck fügen wir in der **head** - Sektion folgende Zeile hinzu:

```html
    <link rel="stylesheet" type="text/css" href="style.css"/>
```

Wenn wir die index.html Datei erneut laden, sehen wir, dass sie unseren Style-Kommandos gehorcht.

Nehmen wir an, dass uns die Text-Type nicht gefällt. Wir könnten uns im Netz umschauen, beispielsweise auf [Google Fonts](https://fonts.google.com/), und eine neue Type hinzufügen. Dabei ist Google so nett, gleich den Code zu generieren, den wir benötigen:


```html
<link href="https://fonts.googleapis.com/css?family=Oswald" rel="stylesheet">
```

Wie man sieht, ähnelt diese Zeile der vorigen. Über das Schlüsselwort **rel** jedenfalls wird angezeigt, dass man es mit einem **stylesheet** - Befehl zu tun hat. 

### Distributed Computing

Wir haben hier eine Besonderheit, die unsere kleine Webseite von klassischen, monolithischen Programmen unterscheidet. Denn mit dem Link auf die Google-Seite holt sich unser Programm Informationen von einer phsysikalisch getrennten Website - der Seite, auf der die Google-Fonts aufgebahrt liegen.

Strenggenommen ist die Zahl der unterschiedlichen Netzknoten, aus denen sich unsere Webseite zusammensetzt, unbegrenzt. Allein die Tatsache jedoch, dass es sich um unterschiedliche Netzknoten handelt, sollte uns daran erinnern, dass wir es hier mit einem Paradigma des **Distrubuted Computing** zu tun haben, also einer Entität, die sich zur Laufzeit aus Informationen zusammensetzt, die im Netz verstreut sind.


## Javascript und das Document Object Model (DOM)

Zwar besitzt **CSS** durchaus einige Animations-Möglichkeiten, dennoch bleibt unsere Webseite, wenn sie sich allein auf **HTML** und **CSS** verlässt, weitgehend statisch.

An dieser Stelle kommt Javascript und das sogenannte **Document Object Model** (DOM) ins Spiel.  

Denn hier wird einer Programmierungssprache (Javascript) ein Zugriff auf die Elemente der Website erlaubt, und zwar auf alle Elemente, die als Tags hier verzeichnet sind: von denn **meta** - Tags zum **head** bis zu den Display-Elementen.

Erzeugen wir aber erst einmal eine Javasript-Datei und schauen, wie wir sie in unserem Code einbetten. 

Wir erzeugen eine Date mit dem Befehl **Datei->Neue Datei** und speichern sie unter dem Namen
**program.js** ab.

Um sie in unsere Webseite einzubetten, fügen wir im Header der **index.html** Datei folgende Zeile hinzu:

```html
<script type="text/javascript" src="script.js"></script>
```

Der Gesamt-Code sieht jetzt folgendermaßen aus:


```html
<!-- Das ist eine Kommentarzeile -->

<!doctype html>
<html lang=en>
    <head>
        <meta charset=utf-8>
        <link href="https://fonts.googleapis.com/css?family=Oswald" rel="stylesheet">
        <link rel="stylesheet" type="text/css" href="style.css"/>
        <script type="text/javascript" src="program.js"></script>


        <title>Minimal Art - Titel</title>
    </head>
    <body>
        <h1 id = "FirstTitle">Überschrift</h1>
        <p class = "FirstClass">Minimal Art - Content</p>
    </body>
</html>
```


Unsere Javascript-Datei macht noch gar nicht. Also füllen wir sie mit einem Befehl, den wir immer wieder brauchen, einem sog. **alert**:

```javascript
    alert("Hello World");
```

Nun - das ist schön, aber wir wollen imstande sein, z.B. den Inhalt unseres Titels und des Paragraphen dynamisch zu ändern.

Hier ist kein kleines **caveat** angebracht, das wir uns genau anaschauen sollten. 

Denn lesen wir uns ein bisschen zum **Document Object Model** ein, entdecken wir schnell, dass wir auf eine Element der Webseite einfach zugreifen können, etwa so:

```javascript
    var el = document.getElementById("FirstTitle");
```

Schauen wir uns diese Zeile genau an. Hier wird zunächst eine Variable mit dem Namen **el** definiert, die uns den Zugriff auf ein HTML-Element mit der ID **"FirstTitle"** erlauben soll.

Dieses, wie wir wissen, exsitiert - denn wir haben es selber geschrieben.
Das Interface, das wir hier benutzen, trägt den Namen **document** - und in ihm sind alle Befehle enthalten, die wir für die dynamische Manipulation der Webseite brauchen.

Um auf den Befehl **getElementById** zuzugreifen, müssen wir dem **document** - Interface nur einen Punkt anfügen. Damit wird gewissermaßen das Innenleben dieses Baukastens aufgeschlossen.

Da unsere Variable **el** nun auf ein HTML-Element verweist, wollen wir seinen Wert verändern.

Dabei ist wichtig zu wissen, dass **el** nun selbst eine Art HTML-Objekt geworden ist, das über eine Reihe von eingebaute Befehlen verfügt. Z.B. verfügt es über den Befehl **innerHTML**, mit dem wir das, was zwischen den Tags steht, ändern können. Also schreiben wir:


```javascript
    var el = document.getElementById("FirstTitle");
    el.innerHTML = "Mein neuer Titel";
```
  
Dieser Code sollte also den Titel verändern.

Wenn wir die Datei abspeichern und die **index.html** - Seite erneut arufrufen, passiert - nichts.

Warum? Weil wir einen Fehler gemacht haben?

Nein. Der Grund ist ein anderer. Wir sehen, dass der Browser, bevor er die html-Elemente generiert, die Ressourcen einlädt: den Oswald-Font, das CSS-Programm, schließlich unsere Javascript-Datei **program.js**.

Und natürlich wird er sie sogleich ausführen. Da dies im Millisekundenbereich passiert, ist zu diesem Zeitpunkt die Seite noch nicht generiert - das HTML-Element mit der ID "FirstTitle" also nicht existent. Das führt zu einer Fehlermeldung, die wir uns in der Konsole anschauen - und zwar dann, wenn sie die Taste F12 drücken.

Damit unser Befehl erst dann ausgeführt wird, wenn alle HTML-Elemente generiert sind, müssen wir auf einen sog. **Callback** zurückgreifen, ein Programm, das ausgeführt wird, wenn der Körper der Seite auf den Bildschirm gezaubert, oder wie der terminus technicus heißt:  **gerendert**  worden ist. 


Dieser Befehl, den wir unserem HTML-Code hinzufügen, lautet **body.onload**. Dazu müssen wir unseren **body** - Tag folgendermaßen umbauen:

```html
 <body onload = "ChangeTitle()">
```

Das bedeutet: Ist die Seite gezeichnet, soll die Funktion **ChangeTitle** aufgreufen werden. 
Diese allerdings müssen wir erst noch generieren, etwa so:

```javascript
    function ChangeTitle() {
        var el = document.getElementById("FirstTitle");
        el.innerHTML = "Mein neuer Titel";
    }

```

Wir verkapseln unsere beiden Code-Zeilen sinnvollerweise darin, denn sie werden, wie es auch in der HTML-Seite der Fall war, zeilenweise nacheinander abgearbeitet.

Also: wir holen das Element aus dem DOM, dann verändern wir seinen Titel, voilà.

# Zusammenfassung

Wir sehen das Zusammenspiel unterschiedlicher Elemente, die zugleich eine historische Seite haben. HTML gewährt die grundlegende Architektur, CSS ist für das statische Styling zuständig und Javasceript erlaubt das dynamische Erzeugen von Seiten.

Nimmt man diese Logik, so versteht man, dass die Dynamisierung von Webseiten die Bedeutung von **Javascript** immer weiter anwachsen lässt - ja, dass zunehmend Bemühungen sichtbar werden, die Webseite kopmplett aus einer Javascript-Umgebung heraus (also dynamisch) zu generieren. Dabei werden **html** und **css** Elemente sozusagen wagabstrahiert, genauer: in eine Javascript-Logik überführt.

Facebooks **React** - Framework, das eine große Popularität gewonnen hat, folgt dieser Logik. Und wenn wir uns im weiteren auf Javascript fokussieren wollen, gehen wir mit diesem Trend konform.


#Appendix

Wir können unser Programm nun auf etwas mühsame im Browser öffnen, aber dazu gibt es eine bessere Technik.
Wenn wir node.js installiert haben, erzeugen wir in dem Verzeichnis, in dem wir die index.html Datei angelegt haben, eine **Package.json** Datei mit folgendem Inhalt:


```javascript
{
   "name": "Demo",
   "version": "1.0.0",
   "description": "demo project.",
   "scripts": {
     "lite": "lite-server --port 10001",
     "start": "npm run lite"
   },
   "author": "",
   "license": "ISC",
   "devDependencies": {
     "lite-server": "^1.3.1"
   }
}
```

Dann führen wir einen **npm install** im Terminal unseres Visual Studios aus, anschließend **npm start**.
Automatisch öffnet sich unser Standard-Browser und unsere index.html Datei ist zu sehen.
