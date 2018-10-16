var MarkovRecommendation = function( sequence ) {
    var self = this;
    this.elements = [];


    this.create_item = function( obj ) {
       var id = self.elements.length; 
       var item = {
        id: id,
        links: [],
        obj: obj
        }
    self.elements.push( item ); 
    return item;   
    }


    this.recalculate = function(id) {
        var item = self.elements[id];
        var total = 0;

        for (var i = 0; i < item.links.length; i++) {
            var link = item.links[i];
            total += link.ct;
        }

        for (var i = 0; i < item.links.length; i++) {
            var link = item.links[i];
            link.frequency = (link.ct / total).toFixed(3);
        }
    }


    this.get_link = function(item, id) {
        for (var i = 0; i < item.links.length; i++) {
            var link = item.links[i];
            if (link.id === id) return link;
        }
    return null;
    }

    this.link_to = function( tg, el) {
        var target = self.elements[tg];
        if (target) {
            var element = self.elements[el];
            if (element) {
               // hier gbt es 
               var it = self.get_link( target, el);
               if (it === null) {
                var link = { id: el, ct: 1, frequency: null };
                target.links.push( link );    
                self.recalculate( target.id );
               }
            else {
                it.ct ++;
                self.recalculate( target.id );
                console.log( target );
            }

            self.sort_links( tg );

            } else {
                var item = self.create_item(el); 
                var link = {
                    id: item.id,
                    ct: 1,
                    frequency: null
                }
            target.links.push( link );    
            self.recalculate( target.id );
            console.log( target );
            }
        }
    }

    this.sort_links = function( no ) {
        var target = self.elements[no];

        // absteigend sortiert
        function compare(a,b) {
            if (a.frequency > b.frequency)
              return -1;
            if (a.frequency < b.frequency)
              return 1;
            return 0;
          } 

        target.links.sort( compare );  
        console.log("Hier wird sortiert");


    }


    this.add_element = function( el ) {
        self.create_item(el); 
        console.log( "Anzahl Elemente: " + self.elements.length );
    }


    this.init = function() {
        if (sequence) {
            for (var i = 0; i < sequence.length; i++) {
                var obj = sequence[i];

                 var item = {
                    id: i,
                    links: [],
                    obj: obj
                }          
                
                self.elements.push(item);
            }
        }

        // console.log( self.elements[2]);
    }

    self.init();

}



var bear = {
    title: "Bear",
    image: "bag_of_words/recommendations/bear.jpg"     
}

var car = {
    title: "Bear",
    image: "bag_of_words/recommendations/car.jpg"     
}


var dog = {
    title: "Dog",
    image: "bag_of_words/recommendations/dog.jpg"     
}

var doll = {
    title: "Dog",
    image: "bag_of_words/recommendations/doll.jpg"     
}


var duck = {
    title: "Dog",
    image: "bag_of_words/recommendations/duck.jpg"     
}

var handgrenade = {
    title: "Handgrenade",
    image: "bag_of_words/recommendations/handgrenade.jpg"     
}


var hare = {
    title: "Hare",
    image: "bag_of_words/recommendations/hare.jpg"     
}

var indigene = {
    title: "Indian",
    image: "bag_of_words/recommendations/indigene.jpg"     
}

var mickey = {
    title: "Mickey Mouse",
    image: "bag_of_words/recommendations/mickey.jpg"     
}

var penguin = {
    title: "Penguin",
    image: "bag_of_words/recommendations/penguin.jpg"     
}

var spider = {
    title: "Dog",
    image: "bag_of_words/recommendations/spider.jpg"     
}

var thor = {
    title: "Thor",
    image: "bag_of_words/recommendations/thor.jpg"     
}

var uboard = {
    title: "Uboard",
    image: "bag_of_words/recommendations/uboard.jpg"     
}


var pr = [bear, car, dog, doll, duck, handgrenade, hare, indigene, mickey, penguin, spider, thor, uboard];

var p = new MarkovRecommendation(pr);
p.add_element(uboard);
p.link_to(1, 12);
p.link_to(1, 4);
console.log( p.elements[1] );