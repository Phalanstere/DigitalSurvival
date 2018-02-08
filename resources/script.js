function open_node() {
    window.open("https://nodejs.org/en/", "_blank"); 
}


var Manager = function() {
    var self = this;


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
        var s = "Digital Survival - Ressourcen";
        div.innerHTML = s;    
        document.body.appendChild(div);

        div = document.createElement("div");
        div.id = "studio";
        div.className = "studio";
        var s = '<img src = "js/StudioCode.svg"/>';
        div.innerHTML = s;   
        document.body.appendChild(div);

        div = document.createElement("div");
        div.id = "node";
        div.className = "node";
        var s = '<img src = "js/node.png"/>';
        div.innerHTML = s;   
        document.body.appendChild(div);


        var el = document.getElementById("DigitalSurvival");
        TweenMax.to(el, 4.2, { 
            bottom: 30,ease: Elastic.easeOut.config(0.2, 0.8) });

        var st = document.getElementById("studio");
        TweenMax.to(st, 1.4, { delay: 1.3, left: '60%', ease: Elastic.easeOut.config(0.9, 0.3) });

        st.addEventListener('click', function () {
            TweenMax.to(this, 1.4, { opacity: 0.2 });
            window.open("https://code.visualstudio.com/", "_blank"); 

          });
          
        var node = document.getElementById("node");
        TweenMax.to(node, 1.7, { delay: 4, top: '25%', ease: Elastic.easeOut.config(0.2, 0.3) });
  
        node.addEventListener('click', function () {
              TweenMax.to(this, 1.4, { opacity: 0.2,  onComplete: open_node });
        });
    }

    this.open_node = function() {

    }


    self.init();
}




function startControl() {
    var m = new Manager();
}