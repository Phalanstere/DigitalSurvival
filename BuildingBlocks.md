# Das Web und seine Bausteine 

Zunächst einmal wollen wir uns, bevor wie in die P>rogrammierungswelten einsteigen, einen Editor herunterladen, der uns in unserer ersten Lektion, aber auch künftig gute Dienste tun kann.
**Micrrosoft** hat mit seinem **Visual Studio** einen sehr schönen Editor ist, der zudem kostenlos erhältlich ist:


[Microsoft Visual Studio](https://code.visualstudio.com)

## HTML

Was ist der Grundbaustein des heutigen Internets? 
Ganz einfach: **HTML**, also jene **H**ypter**t**ext **M**arkup **L**anguage, wie sie Tim Berners Lee in den frühen 90ern entwickelt hat.

Schauen wir uns ein **minimales HTML-Dokument** einmal an:  


```html
var http = require('http');

//create a server object:
http.createServer(function (req, res) {
  res.write('Hello World!'); //write a response to the client
  res.end(); //end the response
}).listen(8080); //the server object listens on port 8080

```