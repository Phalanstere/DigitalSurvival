


function Control( div ) {
    var self = this;



    this.process = function() {
        switch( self.pct ) {
            case 0:
  
            break;

            case 1:

            break;

            case 2:

            break;

            case 3:
   
            break;

            case 4:

            break;

            case 5:
                
            break;

            case 6:
            break;
        }

    }


    this.checkKeys = function( ev ) {
        console.log( ev.code );
        switch( ev.code) {
            case 'ArrowRight':
                self.forward();
            break;

            case 'ArrowLeft':
                self.backward();
            break;
        }

    }


    this.navigation = function() {
        window.addEventListener("keydown", self.checkKeys );
    }

    this.pct = 0;

    this.forward = function() {
        self.pct ++;
        self.process();
    }


    this.backward = function() {
        if (self.pct > 0) self.pct --;
        self.process();
    }



    this.init = function() {
        self.navigation();
        alert("CONTROL00");
    }


    self.init();

}



function startControl() {
    var c = new Control();
}