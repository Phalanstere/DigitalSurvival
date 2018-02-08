function open_node() {
    window.open("https://nodejs.org/en/", "_blank"); 
    manager.counter ++;
    if (manager.counter === 2) manager.show_next_lesson();
}


var Manager = function() {
    var self = this;

    this.counter = 0;

    this.show_next_lesson = function() {
        var next = document.getElementById("NEXT");
        next.style.display = 'block';
    }

    this.open_studio = function() {
        var st = document.getElementById("studio");
        TweenMax.to(st, .7, { bottom: 80, ease: Elastic.easeOut.config(0.9, 0.3), onComplete: function(){
            window.open("https://code.visualstudio.com/", "_blank"); 
        } });
    }


    this.init = function() {
        var div = document.createElement("div");
        div.id = "DigitalSurvival";
        div.className = "Survival";
        var s = "Digital Survival";
        div.innerHTML = s;    
        document.body.appendChild(div);

        div = document.createElement("div");
        div.id = "studio";
        div.className = "studio";
        div.title = "Visual Studio Code";
        var s = '<img src = "js/StudioCode.svg"/>';
        div.innerHTML = s;   
        document.body.appendChild(div);

        div = document.createElement("div");
        div.id = "node";
        div.className = "node";
        div.title = "Node.js";
        var s = '<img src = "js/node.png"/>';
        div.innerHTML = s;   
        document.body.appendChild(div);

        div = document.createElement("div");
        div.id = "link";
        div.className = "link";
        div.title = "weiterführende Ressourcen";
        var s = '<a href = "https://github.com/Phalanstere/DigitalSurvival/blob/master/Ressourcen.md" target="_blank">Ressourcen</a>';
        div.innerHTML = s;   
        document.body.appendChild(div);


        div = document.createElement("div");
        div.id = "NEXT";
        div.className = "NEXT";
        s = '<div onclick = "manager.open_next_lesson()" class ="NEXT">';
        s += "▶";
        s += '</div>';

        div.innerHTML = s;
        div.title = "nächste Lektion";
        document.body.appendChild(div);



        var el = document.getElementById("DigitalSurvival");
        TweenMax.to(el, 4.2, { 
            bottom: 30,ease: Elastic.easeOut.config(0.2, 0.8) });

        var st = document.getElementById("studio");
        TweenMax.to(st, 1.4, { delay: 1.3, left: '37%', ease: Elastic.easeOut.config(0.9, 0.3) });

        st.addEventListener('click', function () {
            self.show_next_lesson();

            TweenMax.to(this, 1.4, { opacity: 0.2 });
            window.open("https://code.visualstudio.com/", "_blank"); 

          });
          
        var node = document.getElementById("node");
        TweenMax.to(node, 1.7, { delay: 4, top: '30%', ease: Elastic.easeOut.config(0.2, 0.3) });
  
        node.addEventListener('click', function () {
              TweenMax.to(this, 1.4, { opacity: 0.2,  onComplete: open_node });
        });
    }

    this.open_blocks = function() {
        window.open("https://github.com/Phalanstere/DigitalSurvival/blob/master/BuildingBlocks.md", "_blank");
    }

    this.open_next_lesson = function() {
        window.open(" http://ludicmedia.de:17777/DigitalS/Lektion01/", "_blank"); 
    }


    self.init();
}


var manager;

function startControl() {
    manager = new Manager();
}