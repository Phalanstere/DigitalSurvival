function spokenMessage(msg) {
    var el = document.getElementById("reader");
    var actual = el.innerHTML;
    actual += msg;

    el.innerHTML = actual;

     
}

function spokenSegment( msg) {
    var el = document.getElementById("segment");
    el.innerHTML = msg;
}


function Dictate() {
    var self = this;

    this.is_recording = false;
    
    this.trigger_mic = function() {
        var el = document.getElementById("Microphone")
    
        if (self.is_recording) {
                
                self.tl.stop();
    
                self.recognizer.stop();
                TweenMax.to(el, 0.3, { background: "pink", scale: 1 });
                self.is_recording = false;
    
                }
            else {
                self.recognizer.start();
                self.is_recording = true;
        
                 TweenMax.to(el, 0, { background: "pink" }  );
                 var tl = new TimelineMax({repeat: 3});  
    
                tl.to(el, 0.3, {background: "red", scale: 1.08, repeat:-1, yoyo:true})
                tl.play();
    
                self.tl = tl;
                }
        }


    

    this.speech_recognition = function() {
        self.show_microphone();

        var recognizer = new webkitSpeechRecognition();
        recognizer.continuous = true;
        recognizer.interimResults = true;


        recognizer.onresult = function(event) { //the event holds the results
            if (typeof(event.results) === 'undefined') { //Something is wrong…
                recognition.stop();
                return;
            }

            for (var i = event.resultIndex; i < event.results.length; ++i) {      
                if (event.results[i].isFinal) spokenMessage( event.results[i][0].transcript);   
                else spokenSegment ( event.results[i][0].transcript);  
                } 
        }; 

        // recognizer.start();

    self.recognizer = recognizer;
    }



    this.show_microphone = function() {
        
                var el = document.getElementById("Microphone");
        
                if ( ! el ){
                    e = document.createElement("div");
                    e.className = "Microphone";
                    e.id = "Microphone";         
                    e.onclick = self.trigger_mic;
                    e.innerHTML = '<img src = "capsulation/mike.png"/>';
                    document.getElementById("full").appendChild(e);
        
                    var el = document.getElementById("reader");
                    if (el) this.speech_recognition();
                }
        
            }


        this.init = function() {
            self.show_microphone();
        }


        self.init();
}


function startDictate() {
    var d = new Dictate();
}