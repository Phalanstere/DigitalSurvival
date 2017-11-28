# Software-  und Webentwicklung / letzte Trends

War die Computerentwicklung der 90er Jahre weitgehend dominiert von Stand-Alone-Systemen, wurde im Laufe der Zeit das Internet immer wichtiger.

Gleichwohl hielten sich noch lange Überreste der ehedem dominanten monolithischen Systeme. So dauerte es einige Jahre, bis sich das 1992 von Linus Torvalds wiederbelebte Unix-Betriebssystem als dominantes Serversystem durchsetzen konntr. (Heute allerdings laufen ca. 90 % aller Server auf Linux)

Die Zeit bis ca. 2005 zeigt eine Mischung verschiedenster, zumeeist proprietärer Systemne (immer mit dem Ziel, die Lauffähigkeit der Programme auf verschiedenen Betriebssystemen durchzusetzen ).
VisualBasic, C++, C#, Perl, Java, Ruby on Rails, PHP - das sind die Stichworte, die zugleich auch eine historische Linie hin zu den heute dominierenden Webtechnologien markieren.

Die Einführung der mobilen Technologien veränderte die Situation jedoch grundlegend.
Nicht nur für Desktop-Computer, sondern für alle erdenklichen Medien und Betriebssyteme galt es von nun an, ein Angebot zu erstellen. Zu den großen Plattformen wie Windows und Macintosh gesellten sich Android, Ubuntu und eine Unzahl von Linux-Variationen hinzu. 
Hinzu kamen Tablets & Smartphones unterschiedlicher Bauart und Größe.

Grundidee und Desiderat war logischerweise: eine **plattformagnostische** und **geräteunabhägige** Software. Die Software sollte sich dem Gerät anpassen, nicht umgekehrt.

# Das Ende von Flash

Ein Symptom für das Ende des proprietären Softwareparadigmas ist das Ende von **Flash**, also jener visuellen Oberfläche, die von **Adobe** entwickelt worden war und das avancierte, user-zentrierte Web-Angebot über ein Jahrzehnt dominierte. Dass Flash eine solche Beliebtheit errang, hat 

+ mit der Fixierung auf den Nutzer und die Nutzererfahrung zu tun
+ mit der Tatsache, dass ein solcher nutzerzenztriertes Angebot wahrnehmungspsycholgische Faktoren berücksichtigt

Die Antwort der Open Source-Bewegung auf die Herrschaft eines proprietären Systems war **HTML5**, das 2008 vom W3C-Konsortium präsentiert wurde. Hier waren alle dynamischen Aspekte berücksichtigt - bis hin zu **3d**-Technologien im Browser. 


# Git & Github

Mit den Open Source Systemen wurde die kollaborative Abstimmung des Codes immer wichtiger. Linus Torvalds entwickelte im Jahr 2005 ein Versionierungsprogramm namens **git**, mit dem es möglich war, die ASrbeit von großen Programmiererkohorten zu koordinieren - und im Zweifelsfall jede einzelne Programmierzeile nachvollziehbar zu machen.

Im Jahr 2008 kam - von Tom Preston Warner et. al. entwickelt, die **github** Plattform hinzu

[Github](https://www.github.com)

Git ist insofern eine ideale Programmiererumgebung, als Programmierer hier ihren Open-Source Code umsonst hosten können. Für einen Aufpreis können Firmen eine geschlossene Arbeitsumgebung einrichten.

Die Server der Firma sind hochverlässlich - die Umgebung intuitiv und leicht zu erfassen. Das Versionierungstool **git** wiederum führt dazu, dass alle Stadien einer Software festgehalten werden. Darüber hinaus sind **rollbacks** und eine Verzweigung des Codes in unterschiedliche Entwicklungsverlöufe (**branches**) möglich.

# Problematik von Backend und Frontend

Wenn man vom **Backend** spricht, ist grundsätzlich die Datenbankprogrammierung gemeint. **Frontend** wiederum meint die Oberfläche, die dem Nutzer zugänglich ist.

In der Regel sind diese beiden Welten auch physisch voneinander getrennt: Das Backend läuft auf dem **Server** (wo die Datenbank in der Regel liegt), das **Frontend** wird vom Kunden - dem **Client** auf seinen Browser heruntergeladen und dort - also **client-seitig** - ausgeführt.

Tatsächlich hat man es mit zwei unterschiedlichen Kulturen zu tun: einer abstrakten Datenebenee einerseits, einer eher an theatralischen und ästhetischen Effekten interessierte Darstellungsebene andererseits.

In diesen beiden Sphären herrschten unterschiedliche Denkfiguren. Das Backend sprach **MySQL** (Java, Perl, PHP), während sich das Frontend mit **JavaScript** und **CSS** beschäftigte.

Dabei ist **CSS** (die sog. Cascaded Style Sheets) eine Art Formatierungssrache, die über das Erscheinungsbild von Website-Elementen verfügt: etwa die Größe, Farbe und Schattiwerung eines Fonts, den Farbhintergrund, die Art und Weise, wie Bilder angeordnet sind etc.

Da **CSS** allerdings nicht (oder nur in höchst begrenzter Form) dynamisch ist, muss dies über eine Programmiersprache bewerkstelligt werden: Javascript. **Javascript** hat - dem Namen zum Trotz - nichts mit Java zu tun. Historisch weist es eher eine Verwandtschaft zur AI-Sprache LISP auf, die in den 60er Jahren entwickelt wurde. (Aber zur Bedeutung von Javascript Näheres im folgenden Abschnitt)

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

Weil es nicht sonderbar war, dass eine HTML-Seite auf Javascript-Dateien zurückgriff, die auf verschiedenen Servern lokalisiert waren, war **dsistributed computing** der Normalfall.
Die Austauschbarkeit der Daten schlug sich zudem in einem eigenen Datenformat (**json**) sowie der Möglchkeit nieder, über asynchrone Calls (**ajax**) sich zur Laufzeit aus verschiedenen Datenquellen zu bedienen - mit dem Effekt, dass sich in der Perspektive des Javascript-Entwicklers das Internet als eine Art globale Datenbank darbot.

Diese Offenheit bewirkte, dass nicht der PC des Nutzers, sopndern von Anbeginn das Internet der Bezugsrahmen für die Javascript-Programmierung war. 
Und just in diesem Feld des **distributed computings** macht sich zunehmend die Überlegenheit von Javascript gegenüber den herkömmlichen Programmiersprchen bemerkbar.

# R

Ein besonders markantes Beispiel für diese Problematik ist die Statistik-Programmiersprache **R**, die 1993 entwuickelt wurde und sich seither zum de facto-Standard für Statistiker entwickelt hat, nicht zuletzt deswegen, weil die Statistiker-Community wesentliche Programm-Module beigesteuert hat (sog. **packages**). Allerdings ist R nur in Ansätzen objektorientiert (und damit nur begrenzt als Hochsprache zu verwenden), zudem ermangelt es ihr an Web-Funktionalität. 

In dem Maße nun, in dem **real time**-Statistik zum Desiderat der Web-Entwicklung wird, werden diese Mängel eklatant.

Statistiken lassen sich nicht angemessen visualisieren, geschweige denn (wie es unterdessen zum Webstandard geworden ist) interaktiv explorieren. Bibliotheken wie die **d3.js**-Library, die den Bereich der Infografik erobert haben, sind für die Statistiker, die sich an R klammern, noch immer ein unerreichbarer Kontinent.


# OpenSource als Paradigmenwechsel

**git** und **github** haben bewirkt, dass OpenSource-Projekte an Bedeutung gewonnen haben. Zumeist hat man es mit gemischten Geschäftsmodellen zu tun: Da wird ein Service frei Haus geliefert, die Erläuterung oder die individuelle Anpassung aber (Stichwort: **customizing**) mit Geld vergütet.

Im Verlaufe dieser Entwicklung wurde sichtbar, dass weitverbreite Module (die Tausende von Nutzerrückmeldungen auf sich ziehen) jene Reslienz annehmen, wie sie auch schon das **Linux** Betriebssystem auszeichnete (und über **Windows** und **OSX** erhob). Proprietäre Softmodule hängen demgegnüber vom Wissen einzelner Programmierer ab - und sind schon ihres **black-box**-Charakters wqegen fehleranfälliger.

## Test driven development 

Um eine weitere Sicherheit von Programm-Modulen zu gewährleisten, die in hybriden Umgebungen im Einsatz sind (unterschiedliche Browser, Geräte, Plattformen), hat sich das **test-driven development** durchgesetzt. Hier wird die Funktionalität der Programme durch spezifische Tests überprüft. 

Durch diese Maßnahmen haben sich in der Welt der **Javascript**-Programmierung Maßstäbe entwickelt, die bei manch industriell hergestellter Software nicht gegeben ist.


# npm - Thesaurus des Wissens

Kurz nach Einführung von **node.js** etablierte sich **npm**, der **node package manager**, mit dem sich Javascript-Bibliotheken auf einfache Weise hosten, aber auch in das eigene Projekt einbinden lassen.

[npm](https://www.npmjs.com/enterprise)

Schaut man sich die Donwload-Zahlen dieser Plattform an, wird ersichtlich, welche Bedeutung die OpenSource-Community unterdessen erworben hat.

So konnte **npm** (Stand 28.11.2017) im letzten Monat allein 13 Milliarden Downloads verbuchen, zudem werden hier ca. 600.000 unterschiedliche Packages gehostet



+ AJAX - ein Akronym für **asynchoneous javascricpt and XML**, beschreibt den Mechanismus der asynchronen Datenübertragzng
+ API - Akronym für das **Advanced Programmer Interface**, meint den Zugriff auf einen Verkapselungslogik, bei der ein Programmierer, über ein simples Interface (eine programmatische Bedienoberfläche) Zugriff auf eine komplexe Funktionalität erhält, den Download von Wikipedia-Artikeln, Wettervorhersagen, die Google-Maps, Börsenkurse etc. Beziehen sich diese Elemente zumeist auf externe Anbieter, kann eine API auch die klassische Javascript-Umgebung um neue Funktionalitäten erweitern (Animation, 3d etc)  
+ CSS - Cascaded Style Sheets, eine Sprache, mit der sich das Aussehen von Webseiten programmieren lässt
+ Distributed Computing - hier werden Rechen- oder sonstige Prozeduren auf verschiedenen Rechnern exekutiert und dann zusammengeführt
+ DOM - ein Akronym für **Document Object Model** ist die Javascript-Schnitte auf die **HTML** - Elemente, die dynamische Webseiten ermöglicht. Zunehmend geht die Tendenz dahin, die gesamte Webseite über Javascript zu erzeugen. (s. **React**)
+ Electron - eine Programmierumgebung in Javascript, die es erlaubt, Webprogramme zu Desktop-Applikationen zu wandeln, die (plattformagnostisch) auf verschiedenen Betriebssystemen laufen
+ json - ein  Akronym für **Javascript Object Notation**, mit dem sich Javascript-Objekte in Textform über das Netz verschicken, in Datenbanken abspeichern und und wieder zu ausführbarem Code zurückverwandeln lassen. **json** ist insofern eine Datenbankschnittstelle.
+ Linux - ein von Linus Torvalds entwickeltes Betriebsystem, das auf das UNIX-Betriebssystem der 60er Jahre zurückgriff und im Geiste des OpenSource von der Programmiereraschar entwickelt wurde. Seiner Stabilität und Resilienz wegen ist Linux (mit seinen Dialekten **Debian**, **Ubuntu**, **Fedora** etc.) zum de-facto Standard bei Servern geworden sind
+ node.js - ein20089 vorgestelltes Framework, das server-seitiges Javascript erlaubt und auf diese Weise Javascript zur lingua franca des Webs macht
+ npm - Ein Akronym für den **Node Package Manager**, ein Format, in dem sich **node.jss** Pakete downloaden und als Module in das eigene Projekt einbinden lassen
+ NoSQL-Datenbanken - ein Datenbank-Typ, mit dem sich die tabellenorientierte Logik der SQL-Datenbaken überwinden lässt. Hier wird eine Entität nicht in Einzelteile zerlegt (Arm, Bein etc), sondern ihr Kontext wird erhalten. Beispiele sind **MongoDB**, **CouchDB** oder **NeDB**
+ php - ein Akronyom für **Personal Home Page**, eine Swerver-Sprache, die vor allem bis 2005 große Popularität besaß - nicht zuletzt deswegen, weil sie in einfacher Syntax eine Kommunikation zu SQL-Datenbanken herstellte
+ R - eine Programmiersprache für Statistiker
+ React.js - ist ein von Facebook entwickeltes Programmierungsframework, mit dem sich dynamische Webseiten aus einzelnen Bauteilen herstellen lassen. Innovativ waren 2 Aspekte: a) dass man das Styling der Webseite in Javascriipt vollzog (über *.jsx), b) dass die veränderten Variablen allesamt in States festgehalten wurden, weshalb sich die history einer Nutzung immer auch wiederholen und rückgängig machen lässt
+ ruby on rails - eine Programmierumgebung, die die Kommunikatipn zwischen Frontend und Backend erleichtern sollte
+ test driven development
+ V8 - Googles Chrome Engine
+ wasm - Web Assembler

