var Car = function ( max ) {
    var self = this;

    this.max_velocity = max;
    this.state = "resting";
    this.velocity = 0;

    this.engine = function() {
        switch( this.state) {
            case "accelerate":
                if (self.velocity < self.max_velocity) self.velocity += 0.3; 
            break;

            case "decelerate":
                if (self.velocity > 0.5) self.velocity -= 0.5;   
            break;

            case "resting":
                if (self.velocity > 0) self.velocity -= 0.05;
            break;
        }
    }

    this.press = function(event) {
        switch(event.code) {
            
            case 'ArrowUp':
                self.state = "accelerate";
            break;

            case 'ArrowDown':
                self.state = "decelerate";
            break;
        }

    this.release = function(event) {
        switch(event.code) {
            
            case 'ArrowUp':
                self.state = "resting";
            break;

            case 'ArrowDown':
                self.state = "resting";
            break;
        }
    }




    window.addEventListener("keydown", this.press );  // Taste wird gedrückz
    window.addEventListener("keyup", this.release );    // wird wieder losgelassen
}

var s = new Car(200);