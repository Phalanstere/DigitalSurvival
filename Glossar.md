# Software-  und Webentwicklung / letzte Trends

War die Computerentwicllung der 90er Jahre weitgehend dominiert von Stand-Alone-Systemen, wurde das Internet immer wichtiger.
Gleichwohl hielten sich noch lange Überreste der ehedem dominanten monolithischen Systeme. Es dauerte relativ lange, bis sich das 1992 von Linus Torvalds wiederbelebte Unix-Betriebssystem als dominates Serversystem durchsetzte.

Die Zeit bis ca. 2005 zeigt eine Mischung verschiedenster, teils proprietärer Systemne (allerdings immer mit dem Ziel, die Lauffähigkeit der Programme auf verschiedenen Betriebssyttemen durchzusetzen ).
VisualBasci, C++, C#, Perl, Java, Ruby on Rails, PHP - das sind die Stichworte, die zugleich auch eine historische Linie hin zu den Webtechnologien markieren.

Die Einführung der mobilen Technologien veränderte die Situation jedoch grundlegend.
Nicht nur für Desktop-Computer, sondern für alle erdenklichen Medien und Betriebssyteme galt es nun ein Angebot zu erstellen. Zu den großen Plattformen wie Widnows und Macintosh gesellten sich Android, Ubuntu und eine Unzahl von Linux-Variationen hinzu. 
Hinzu kamen Tablets & Smartphones unterschiedlicher Bauart und Größe.

Die Grundidee war mithin eine **plattformagnostische** und **geräteunabhägige** Software. Die Sioftware sollte sich dem Gerät anpassen, nicht umgekehrt.

# Das Ende von Flash

Ein Symptom für das Ende des proprietären Softwareparadigmas ist das Ende von **Flash**, also jener visuellen Oberfläche, die von **Adobe** entwickelt worden war und das avancierte, user-zentrierte Web-Angebot über ein Jahrzehnt dominierte. Dass Flash eine solche Beliebtheit errang, hat 

+ mit der Fixierung auf den Nutzer und die Nutzererfahrung zu tun
+ mit der Tatsache, dass ein solcher nutzerzenzriertes Angebot wahrehmungspsycholgische Faktoren berücksichtigt

Die Antwort der Open Source-Bewegung auf die Herrschaft eines proprietären Systems war **HTML5**, das 2008 vom W3C-Konsortium präsentiert wurde. Hier waren alle dynamischen Aspekte berücksichtigt - bis hin zu **3d**-Technologien im Browser. 


# Git & Github

Mit den Open Source Systemen wurde die Abstimmung des Codes immer wichtiger. Linus Torvalds entwickelte im Jahr 2005 ein Versionierungsprogramm namens **git**, mit dem es möglich war, die ASrbeit von große Programmiererkohorten zu koordinieren - und im Zweifelsfall jede einzelne Programmierzeile nachvollziehbar zu machen.

Im Jahr 2008 kam - von Tom Preston Warner et. al. entwickelt, die **github** Plattform hinzu

[Github](https://www.github.com)

Git ist eine ideale Programmiererumgebung, als Programmierer hier ihren Open-Source Code umsonst hosten können. Für einen Aufpreis können Firmen eine geschlossene Arbeitsumgebung einrichten.

Die Server der Firma suind hochverlässlich - die Umgebung intuitiv und leicht zu erfassen. Das Versionierungstool **git** wiederum führt dazu, dass alle Stadien einer Software festgehalten werden, dass darüberhinaus **rollbacks** und eine Verzweigung des Codes in unterschiedliche Entwicklungsverlöufe (**ranches**) möglich sind.

# Problematik von Backend und Frontend

Wenn man vom **Backend** spricht, ist grundsätzlich die Datenbankprogrammierung gemeint. **Frontend** wiederum meint die Oberfläche, die dem Nutzer zugänglich ist.

In der Regel sind diese beiden Welten auch physisch voneinander getrennt: Das Backend läuft auf dem **Server** (wo die Datenbank in der Regel liegt), das **Frontend** wird vom Kunden - dem **Client** auf seinen Browser heruntergeladen und dort - also **client-seitig** - ausgeführt.

Tatsächlich hat man es mit zwei unterschiedlichen Kulturen zu tun: einer abstrakten Datenebenee einerseits, einer eher an theatralischen und ästhetischen Effekten interessierte Darstellungsebene andererseits.

In diesen beiden Sphären herrschten unterschiedliche Denkfiguren. Das Backend sprach **MySQL** (Java, Perl, PHP), während sich das Frontend mit **JavaScript** und **CSS** beschäftigte.

Dabei ist **CSS** (die sog. Cascaded Style Sheets) eine Art Formatierungssrache, die über das Erscheinungsbild von Website-Elementen verfügt: etwa die Größe und Farbe eines Fonts, den Farvhintergrund, die Art und Weise, wie Bilder angeordnet sind etc.

Da **CSS** allerdings nicht (oder nur in höchst begrenzter Form) dynamisch ist, muss dies über eine Programmiersprache bewerkstelligt werden: Javascript. **Javascript** hat - trotz dem Names - nichts mit Java zu tun. Historisch weist es eher eine Verwandtschaft zur AI-Sprache LISP auf, die in den 60er Jahren entwickelt wurde. (Aber zur Bedeutung von Javascript Näheres im folgenden Abschnitt)

Um die Trennung von Backend und Forntend aufzuheben, gab es intensive Bemühungen. Sie gingenvor allem dahin, den Kommunikationskanal zu den **SQL**-Datenbanken zu erleichtern.

# Ruby on Rails - eine geniale Zwischenlösung

Ein Versuch in dieser Hinscht war die **Ruby in Rails** - Enzwicklungsumgebung, die von David Heinemeier Hansson im Jahr 2004 vorgestellt wurde. Hier lag der Fokus darauf, die klobigen **SQL**-Datenbanken leichter zugäglich zu machen und in dynamische Programmierumgebungen einzubetten. Zu diesem Zweck war das **Rails** -Interface konzipiert, das von der Script-Sprache **ruby** gesteuert wurde. Auf diese Weise konnten die Backend-Programmierer mit Daten aus der Datenbank umgehen, als hätten sie gewöhnliche Variablen vor sich.

Zweifellos bewirkte das Framework einen Entwicklungssprung. **github** beispielsweise wurde damit programmiert. Dennoch wurde die alte **Backend** und **Frontend**-Antinomie nur teilweise aufgelöst, ja, in mancherlei Hinsicht sogar kompliziert. Denn nun begannen die **Backend**-Programmierer große Teile des Design serverseitig amzubieten - und auf diese Weise das ästhetische Primat und die Ausdrucksmöglichkeit der Frontend-Designer zu unterlaufen. 



# JavaScript als lingua franca

Vor diesem Hintergrund ist die überragende Bedeutung zu verstehen, die Javascript annahm - und zwar in dem Augenblick, als auch die Backend-Programmierung nicht mehr auf Sondersprachen wie **ruby** angewiesen war, sondern sich in Javascript bewerkstelligen ließ.

Der Durchbruch war hier das **node.js** Framework, das Ryan Dahl im Jahr 2008 vorstellte. Er führte vor, dass ein Server sich mit wenigen Zeilen Javascript starten ließ:


```javascript
var http = require('http');

//create a server object:
http.createServer(function (req, res) {
  res.write('Hello World!'); //write a response to the client
  res.end(); //end the response
}).listen(8080); //the server object listens on port 8080

```

Mit dem Durchbruch von **node.js**, das zudem extrem performant und zuverlässig war, wurde Javascript zur lingua franca des Netzes. Ein Teil dieses Erfolg war auch Googles **Chrome**-Browser zuzuschreiben, dessen **V8**-Engine die Sprache extrem beschleunigt. Diese wiederum wird in C++ (also extrem prozessornah) entwickelt und beschleunigt bestimmte Javascript-Prozeduren enorm - mit dem Effekt, dass Javascript mit kompilierten Sprachen wie **Java** oder **Python** mithalten kann, ja, sie nicht selten an Performance überbietet.

Weil Javascript unter der Haube mit Assembler (**wasm**) auf Maschinencode zurückgreifen kann, hat es sich zu einer hochperformaten, zugleich fehlertoleranten Sprache gemausert. 

Ein weiterer Vorzug von Javascript ist die syntaktische Flexbilität, die einerseits simple Pogrammieraufgaben auf simple Weised abarbeitet, andererseits hochkomplexe Architekturen abbilden kann.

Der größte Vorzug freilch basiert auf einer **sozialen**, gleichfalls programmatischen Dimension. Da Javascript von Anbeginn die Sprache des Netzes war, war auch das Netz die logische Zirkulationssphäre.

Weil es nicht sonderbar war, dass eine HTML-Seite auf Javascript-Dateien zurückgriff, die auf verschiedenen Servern lokalisiert waren, war **dsistributed computing** eine Art Normalfall.
Die Austauschbarkeit der Daten schlug sich zudem in einem Datenformat (**json**) sowie der Mäglchkeit nieder, über asynchrone Calls (**ajax**) sich zur Laufzeit aus verschiedenen Datenquellen zu bedienen. 

Diese Offenheit bewirkte, dass nicht der PC des Nutzers, sopndern von Anbeginn das Internet der Bezugsrahmen für die Javascript-Programmierung war. 
Und just in diesem Feld des **distributed computings** macht sich zunehmend die Überlegenheit von Javascript gegenüber den herkömmlichen Programmiersprchen bemerkbar.

# R

Ein besonders markantes Beispiel für diese Problematik ist die Statistik-Programmiersprache **R**, die 1993 entwuickelt wurde und sich seither zum de facto-Standard für Statistiker entwickelt hat, nicht zuletzt deswegen, weil die Statistiker-Community wesentliche Programm-Module beigesteuert hat (sog. **packages**). Allerdings ist R nur in Ansätzen objektorientiert (und damit nur begrenzt als Hochsprache zu verwenden), zudem ermangelt es ihr an Web-Funktionalität. In dem Maße nun, in dem **real time**-Statistik zum Desiderat der Web-Entwicklung wird, werden diese Mängel eklatant.
Statistiken lassen sich nichgt mehr angemessen visualisieren, geschweige denn, wie es unterdessen zum Webstandard geworden ist, interaktiv explorieren. Bibliotheken wie die **d3.js**-Library, die den Bereich der Infografik erobert haben, sind für die Statistiker, die sich an R klammern, noch immer ein unerreichbarer Kontinent.


# OpenSource als Paradigmenwechsel




+ AJAX - ein Akronym für **asynchoneous javascricpt and XML**, beschreibt den Mechanismus der asynchronen Datenübertragzng
+ API - Akronym für das **Advanced Programmer Interface** meint den Zugriff auf einen Verkapselungslogik, bei der ein Programmierer, über ein simples Interface (eine programmatische Bedienoberfläche) Zugriff auf eine komplexe Funktionalität erhält, den Download von Wikipedia-Artikeln, Wettervorhersagen, die Google-Maps, Börsenkurse etc. Beziehen sich diese Elemente zumeist auf externe Anbieter, kann eine API auch die klassische Javascript-Umgebung um neue Funktionalitäten erweitern (Animation, 3d etc)  
+ CSS - Cascaded Style Sheets, eine Sprache, mit der sich das Aussehen von Webseiten programmieren lässt
+ Distributed Computing - hier werden Rechen- oder sonstige Prozeduren auf verschiedenen Rechnern exekutiert und dann zusammengeführt
+ json - ein  Akronym für **Javascript Object Notation**, mit dem sich Javascript-Objekte in Textform über das Netz verschicken, in Datenbanken abspeichern und und wieder zu ausführbarem Code zurückverwandeln lassen. **json** ist insofern eine Datenbankschnittstelle.
+ node.js
+ npm - Ein Akronym für den **Node Package Manager**, ein Format, in dem sich **node.jss** Pakete downloaden und als Module in das eigene Projekt einbinden lassen
+ R - eine Programmiersprache für Statistiker
+ V8 - Googles Chrome Engine
+ wasm - Web Assembler

