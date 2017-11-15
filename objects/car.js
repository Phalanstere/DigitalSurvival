var Car = function ( max ) {
    this.max_velocity = max;
    this.state = "resting";
    this.velocity = 0;

    var self = this;

    this.display = function() {
        var el = document.getElementById("Vars");
        el.innerHTML = self.velocity;
    }

    this.engine = function() {
        switch( self.state) {
            case "accelerate":
                if (self.velocity < self.max_velocity) self.velocity += 1;
            break;

            case "decelerate":
                if (self.velocity > 0) self.velocity -= 2;
            break;

            case "resting":
                if (self.velocity > 1) self.velocity *= 0.99;
            break;
        }
        
       self.display();
    }

    this.press = function(event) {
        switch(event.code) {
            case 'ArrowUp':
                self.state = "accelerate";
                console.log("accelerate");
            break;

            case 'ArrowDown':
                self.state = "decelerate";
                console.log("decelerate");
            break;
        }
    }

    this.release = function(event) {
        console.log("RELEASE");

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
    window.setInterval( this.engine, 50  );
}