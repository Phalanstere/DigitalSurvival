var Car = function ( max, speedometer ) {
    this.max_velocity = max;
    this.state = "resting";
    this.velocity = 0;
    this.acceleration = 0;

    var self = this;


    this.display = function() {
        var el = document.getElementById("Vars");
        if (self.velocity) speedometer.update( self.velocity );
    }

    this.engine = function() {
        switch( self.state) {
            case "accelerate":
                if (self.velocity < self.max_velocity) {
                    self.acceleration += 0.1;
                    self.velocity += self.acceleration;

                }
            break;

            case "decelerate":
                if (self.velocity > 0) {
                        var diff = self.velocity * 0.1;
                        if (diff > 0.5) self.velocity -= diff;
                        else            self.velocity -= 0.5;
                    }
            break;

            case "resting":
                self.inertia();
            break;
        }
        
        if (self.velocity < 1 && self.state !== "accelerate") self.velocity = 0;

       self.display();
    }

    this.inertia = function() {
        var inertia = 0.5;
        self.velocity -= inertia;
        
        if (self.acceleration > 0) {
            var acc_inertia = 0.1;
            if ( self.acceleration > 0.1 ) self.acceleration -= acc_inertia;
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
    window.setInterval( this.engine, 50  );
}