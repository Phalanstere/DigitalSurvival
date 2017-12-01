# Das Web und seine Bausteine 

Zunächst einmal wollen wir uns, bevor wie in die P>rogrammierungswelten einsteigen, einen Editor herunterladen, der uns in unserer ersten Lektion, aber auch künftig gute Dienste tun kann.
**Micrrosoft** hat mit seinem **Visual Studio** einen sehr schönen Editor ist, der zudem kostenlos erhältlich ist:


[Microsoft Visual Studio](https://code.visualstudio.com)

## HTML

Was ist der Grundbaustein des heutigen Internets? 
Ganz einfach: **HTML**, also jene **H**ypter**t**ext **M**arkup **L**anguage, wie sie Tim Berners Lee in den frühen 90ern entwickelt hat.

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

Die Elememte sind einfach beschrieben. In ersten Zeile finden Sie eine Kommentarzeile, die vom Browser ignoriert wird und nur für denjenihgen von Belang ist, der mit dem obigen Code umgeht.


Gehen wir die Zeilen durch:

```html
<!-- Das ist eine Kommentarzeile -->
```

Zunächst fällt auf, dass alle Elemente als SChlüsselzeichen ein öffnendes **<** 
und schließendes **>** aufweisen. Die erste gü+ltige Zeile ist eine Selbstbeschreibung. Damit wird das Dokument als **html**-Dokument qualifiziert.

```html
<!doctype html>
```

Dass und warum dies überaus nützlich ist, kann man sich vergegenwärtigen, wenn man die Selbstbeschreubung des vwerwandten **xml** Dokument-Tys nimmt:

```html
<?xml version="1.0"?>
```

Direkt an die Selbstbeschreibungszeile schließt sich das erste **Tag** an, das aus gültigen HTML-Elementen besteht und sinnigerweise **html** betitelt ist:

```html
<html lang=en>
    ...
</html>
```

Wie man sehen kann, hat jedes Tag (wie bei einer Klammer) ein **öffnendes** und ein **schließendes** Element. Im schließenden Element gibt es nach dem **<** - Zeichen einen Slash, also **</** - dann den Namen und die schließende spiotze Klammer.

Wissen wir also, dass ein Paragraph in HTML als **P** beteichnet wird, ist seine Erzeugung nachgerade logisch:

```html
<p></p>
```

Zwischen den Tags steht dann der eigentliche Content, das, was auf der Webseite angezeigt werden soll.

Wie das Beispiel zeigt, enthält der **html** - Block neben dem **body**, der die Anzeigelemente enthält, zudem einen **head**, der wiederum einen **meta** und einen **title** Tag enthält.
Im **head** lassen sich Informationen verstecken, die für Suchmaschinen wichtig sind, der **meta** tag verweist auf den verwendeten Zeichensatz. Auf diese Weise können chinesische, japanische oder arabische Seiten einen anderen Zeichensatz markieren. 

Der oben verwendete **utf-8** Code unkludiert bereits alle Zeichensysteme.

Schauen wir uns nun den Teil an, von dem wir wissen, dass er auf der Webseite erscheint:


```html
    ...

    <body>
        <p>Minimal Art - Content</p>
    </body>
```

Hier sehen wir einen Paragraphen, der den folgenden Text annzeigt: **Minimal Art - Content**

HTML - Tags sind, hat man sie einmal begriffen, ziemlch trivial. 

+ &lt;h1> ist eine Überschrift der ersten Kategorie
+ &lt;h2> ist eine Überschrift der zweiten Kategorie
+ &lt;h3> ... dritte Katehgoe
+ &lt;h4> ... vierte Kategorie
+ &lt;div> ist ein Divider, dem Paragraphen verwandt - nur dass er auch für Bilder oder andere Steuerelemente reserviert ist
+ &lt;span> ist ein umspannendes Element, das zur Spezififierung von Minimal-Elementen gedacht ist




```html
    <body>
        <h1>Überschrift</h1>
        <p>Minimal Art - Content</p>
    </body>
```

Schauen wir uns diese Seite an, sehen wir, dass der Parahraph und die Überschrift unterschiedlich formatiert wurden.

## CSS

UM jedoch die volle Kontrolle über das Aussehen von Websites zu erlangen, wurde eeine weitere Sprachspezifikation erstellt, die sogenannten **Cascadwed Style Sheets**, kurz: **CSS**.

CSS wird relativ bald nach Einführung von HTML, im Jahr 1994, spezifiert.
Die Idee ist einfach: Man wollte das Aussehen von HTML Tags unabhängig von ihrem Inhalt beeinflussen können.

Wie aber greift nun eine solche CSS-Definition (mit der wir uns gleich beschäftigen werden) auf ein HTML-Element zu. Hier gib es zwei Schlüsselwörter, die man im HTML-Tag definieren kann, 

+ id 
+ class

### id

Dabei stellt die **id** ist dabei (auch wenn Nutzer das Prinzip, ohne Folgen zu fürchten, ignoprieren kann) eine einmalige Referenz auf ein HTML-Element dar.

Die **class** wiederum kann mehrere Elemente betreffen. Eine **id** wird in css über das Schlüsselzeichen **#** angeesprochen, eine Klasse über das Schlüsselzeichen **.**

Nehmen wir an, dass unsere HTML-Tags jetzt mit einem id und eine Klasse versehen sind, etwa so:



```html
    <body>
        <h1 id = "FirstTitle">Überschrift</h1>
        <p class = "FirstClass">Minimal Art - Content</p>
    </body>
```




