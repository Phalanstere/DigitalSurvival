'use strict';

function randomizedPoint(obj) {
	if (typeof(obj) === 'object')
		{
        let res;    
		var {min, max, type} = obj;
		if (min) {
			res = Math.random() * (max-min); 
			res += min;
			}
		else {
			res = Math.random() * max;
		}

        switch (type)   {
            case '%':
                res = res.toFixed(2) + type;
            break;

            case "px":
                res = Math.floor(res) + type;
            break;

            default:
                res = Math.floor(res);
            break;
        }

		return res;
    }
    


	return 'input is no object'; 
}


function minmaxRandom(obj) {
	if (typeof(obj) === 'object')
		{
        let res;    
		var {min, max} = obj;

		if (min) {
			res = Math.random() * (max-min); 
			res += min;
			}
		else res = Math.random() * max;
		return res;
		}
	return 'input is no object'; 
}

function randomizedFontsize(obj) {
	if (typeof(obj) === 'object')
		{
		var {min, max, typ} = obj;

		if (min) {
			res = Math.random() * (max-min); 
			res += min;
			}
		else {
			res = Math.random() * max;
		}

		if (typ )
			{
			switch (typ)
				{
				case 'px':
					res = Math.floor(res);
					res += typ; 
				break;

				case 'em':
					res = res.toFixed(2);
					res += typ;
				break; 

				case 'vw':
					res = res.toFixed(2);
					res += typ;
				break;

				case 'int':
					res = Math.floor(res);
				breal;
				}
			}	
		
		return res;
		}
	return 'input is no object'; 
}

var fSize = randomizedFontsize;


function isCyclic (obj) {
    var seenObjects = [];
    function detect (obj) {
        if (obj && typeof obj === 'object') {
        if (seenObjects.indexOf(obj) !== -1) {
        return true;
    }

    seenObjects.push(obj);
    for (var key in obj) {
        if (obj.hasOwnProperty(key) && detect(obj[key])) {
            return true;
            }
        }
    }
    return false;
    }
return detect(obj);
}



var Animator = function Animator(obj) {
    var self = this;
    this.id = null;
    this.events = [];

    this.start = 0;
    this.time = 0;
    this.fin = 10000;
    this.paused = false; // flag, checks if it's paused
    this.pause = 0;
    this.template_file = null;


    this.reset_events = function() {
        var i;
        for ( i = 0; i < self.events.length; i++ ) {
        self.events[i].done = false;
        }
    };


 this.clean_events = function() {
    var i, ev;
    for ( i = 0; i < self.events.length; i++ ) {
        self.events[i].done = false;
        ev = self.events[i];
        delete ev.splitted;
        delete ev.dom;
        delete ev.splits;
        delete ev.raphael;
        delete ev.circle;
        delete ev.rect;
        }
    };


 this.set_new_text = function(el, text) {
    if (Array.isArray(text) === true) {
        var x = Math.floor ( Math.random() * text.length );
        el.innerHTML = text[x];
    } 
    else {
        el.innerHTML = text;   
    }

 }


 this.greensock_event = function(event) {
    var tl,
    el,
    config = {},
    new_config,
    delay,
    props;
    el = document.getElementById('root');

   
    if ( event.div ) {
        el = document.getElementById( event.div );
    }
    
    if (event.newtext) this.set_new_text(el, event.newtext);

    config = self.get_greensock_props(event);
        if ( event.delay ) {
        delay = (event.delay/1000).toFixed( 2 );
        } else {
        delay = 0;
    }
    
    new_config = self.get_random_greensock_props(event);
    if (new_config) Object.assign(config, new_config);


        tl = new TimelineMax({ });
        tl.pause();
        tl.to( el, (event.duration/1000).toFixed(2), config, delay );
        tl.play();
    };


  this.random_position = function() {
      var x, off = 3000;
      x = (Math.random() * off) - off*0.5;


      return x;
  };






  this.random_coordinates = function() {
    var x,y;
    x = (Math.random() *100).toFixed(2); 
    y = (Math.random() * 100).toFixed(2);

    x += "%";
    y += '%';

    return { x, y};
  }


  this.set_random_position = function(event) {

    if (event.div) {
        if (Array.isArray(event.div)) {

           let list = event.div;

           for (var i = 0; i < list.length; i++) {
               let pos = this.random_coordinates();
               var el = document.getElementById( event.div[i] )
               TweenLite.set(el,    { color: "blue", position: "absolute", left: pos.x, top:pos.y } );
           }
        }
    else{
        let pos = this.random_coordinates();
        var el = document.getElementById( event.div);
        if (el) TweenLite.set(el,    { color: "orange", position: "absolute", left: pos.x, top:pos.y } );
        }
    }

  }



this.get_random_color = function() {
    var r = Math.floor( Math.random() * 256);
    var g = Math.floor( Math.random() * 256);
    var b = Math.floor( Math.random() * 256);

    return 'rgb(' + r + ',' + g + ',' + b + ')';
}


this.get_random_fontsize = function(type) {

    if (type && typeof(type) !== "boolean")
        {  
        return randomizedFontSize(type);
         
        }
    return Math.random() * 10 + "vw";
    
}


this.get_random_point = function(type) {
    if (type && typeof(type) !== "boolean") return randomizedPoint(type);
    var p = (Math.random() * 100).toFixed(2);
    return p + "%";
}


this.get_random_letter_spacing = function() {
    var ls = Math.floor(Math.random() * 20);
    return ls + 'px';
}


this.get_random_values = function(type, val) {

    switch(type)   {
        case 'color':
            if (val && typeof(val) !== "boolean") return randomizedColors.apply(this, val);
            return this.get_random_color();
        break;

        case 'backgroundColor':
            return this.get_random_color();
        break;

        case 'scale':
            if (val && typeof(val !== 'boolean')) return minmaxRandom( val );
            return Math.random().toFixed(2);
        break;


        case 'opacity':
            if (val && typeof(val !== 'boolean')) return minmaxRandom( val );
            return Math.random().toFixed(2);
        break;

        case 'fontSize':
            return this.get_random_fontsize();
        break; 

        case "left":
            return this.get_random_point( val );
        break;

        case "top":
            return this.get_random_point( val );
        break;
        
        case 'letterSpacing':
            return this.get_random_letter_spacing();
        break; 

        case 'rotation':
             if (val && typeof(val !== 'boolean')) return minmaxRandom( val );
            else return Math.random() * 360;
        break;

    }
}


this.set_random_values = function(dom, values) {
    let target = {};


    for (var n = 0; n < values.length; n++) {
        var v = values[n];

        switch(v) {
        case 'opacity':
            target['opacity'] = Math.random().toFixed(2);
        break;

        case 'color':
            target['color'] = this.get_random_color();
        break;

        case 'fontSize':
            target['fontSize'] = this.get_random_fontsize();
        break; 

        case 'left':
            target['left'] = this.get_random_point();
        break;

        case 'top':
            target['top'] = this.get_random_point();
        break;

        case 'letterSpacing':
            target['letterSpacing'] = this.get_random_letter_spacing();
        break; 
        }
    }
 
    TweenLite.set(dom, target );
}


this.random_values = function(event) {
    if (event.div) {
        if (Array.isArray(event.div)) { 

        let list = event.div;
        for (var i = 0; i < list.length; i++) {
            var el = document.getElementById( event.div[i] )
            if (el) this.set_random_values(el, event.values);
            }

        }
        else {
        var el = document.getElementById( event.div);
        if (el) this.set_random_values(el, event.values);
        }
    }

} 




// hier fehlen zwei Funktionen

this.greensock_array = function(event) {

        var tl,
        el,
        config = {},
        new_config = null,
        delay,
        props,
        configs = [],
        ev,
        duration,
        delay,

        el = document.getElementById( 'Container' );

        if ( event.div ) {
            el = document.getElementById( event.div );
        }

       for (var i = 0; i < event.events.length; i++) {
          ev = event.events[i];
          config = self.get_greensock_props(ev);
    
          new_config = self.get_random_greensock_props(ev);
          if (new_config) Object.assign(config, new_config);

          if (ev.newtext) this.set_new_text(el, ev.newtext);  // you can set a newtext just in the fist event
          configs.push(config);

       };

       if (event.callback) tl = new TimelineMax({ onComplete: event.callback });
       else tl = new TimelineMax({  });


       tl.pause();

         for (var i = 0; i < event.events.length; i++) {
                ev = event.events[i];

                if (ev.duration) duration = (ev.duration/1000).toFixed(3);
                else             duration = 0;

                if (ev.delay)   delay = (ev.delay/1000).toFixed(3);
                else            delay = 0;

                tl.to(el, duration, configs[i],  delay);
            }

       tl.play();

   };



    this.check_greensock_command = function(key) {
        if (typeof(key) === 'string') 
            {
            if (key.search("config") !== -1)  return eval(key); 
            else return key;
            }
        else return key;    
    } ;


    // a preliminary function,

    this.get_random_greensock_props = function(event) {
        var props; 
        var config = {};
        var new_key;
        props = ['random_color', 'random_backgroundColor', 'random_left', 'random_top', 'random_fontSize',
                'random_letterSpacing', 'random_opacity', 'random_rotation', 'random_scale'];

        for (var i = 0; i < props.length; i++ ) {
            var key = props[ i ];
            if ( event[key] ) {
               
               new_key = key.slice(7);
               config[new_key] = self.get_random_values(new_key, event[key]);
            }
        }

    return config;
    }


    this.get_greensock_props = function(event) {
        var props,
        config = {};


        props = ['left', 'top', 'right', 'width', 'height', 'opacity', 'scale', 'rotation', 'backgroundColor', 'display', 
            'webkitTextStroke', 'webkitTextFillColor', 'webkitTextStrokeWidth',
            'border', 'borderTop', 'borderBottom',   
            'borderRadius', 'background', 'fontSize', 'fontFamily', 'text', 'bezier',
            'letterSpacing', 'color', 'textShadow', 'boxShadow', 'skewX', 'skewY', 'skewZ',
            'textAlign', 'textDecoration', 'backgroundColor',
            'transition','ease', 'webkitFilter', 'fontVariant', 'textTransform',
            'backgroundImage',
            'perspective', 'transform'
        ];

        for (var i = 0; i < props.length; i++ ) {
            var key = props[ i ];
            if ( event[key] ) {
                if (key === "ease") config[key] = self.check_greensock_command(event[key]);
                else                config[key] = event[key];
            }
        }

        return config;
    };



  ///////////////////////////// SPLITTEXT SECTION //////////////////

  this.split_div = function(event, type, additionalClass) {
      var d, text, name, id, list = [], s ="", c;
      event.splitted = true;
      d = document.getElementById(event.div);
      text = d.innerHTML;
      event.splits = text.length;

      name = event.div + "_span";

      switch(type)
        {
        case "letters":

          for (var i = 0; i < text.length; i++ ) {
              id = name + i;
              s += '<span class = "' + name + '" id = "' + id + '">' + text[i] + '</span>';
            }
       break;

       case "words":
         list = text.split(" ");
         event.splits = list.length;
         

         
          for (var i = 0; i < list.length; i++ ) {
              id = name + i;
                if (additionalClass) s += '<span class = "' + name + ' ' + additionalClass + '" id = "' + id + '">' + list[i] + ' </span>'; 
                else s += '<span class = "' + name + '" id = "' + id + '">' + list[i] + ' </span>';
            }
         
       break;
       }


      d.innerHTML = s;
      return name; // returns the class name
  };




  this.split_random_colors = function(event) {
      var name, output;

      if (!event.splitted) {
        if ( $("#" + event.div).has("." + event.div + "_span").length > 0)
            {
            event.dom = $("#" + event.div).children();
            event.splits = event.dom.length;     
            }
        else
            { 
            self.split_div(event, "letters");
            }
        }

      for (var i = 0; i < event.splits; i++) {
        var output = randomized("gold", 0.2);

        name = event.div + "_span" + i;
        var output = randomized("gold", 0.25);
        $("#" + name).css("color", output);
        

        }

  };


  this.split_relative_to_absolute = function(event) {
     var pos, cl, el, l, t, i;
     cl = event.div + "_span";
     event.dom = document.getElementsByClassName(cl); 
     i = event.dom.length;
     
     while(i--) {
        
        name = event.div + "_span" + i;
        pos  = $("#" + name).position();
        el  = event.dom[i];
        
        TweenLite.set(el,    { position: "absolute" } );
        l = parseInt(pos.left);
        t = parseInt(pos.top);
        
        event.dom[i].setAttribute("x",l);
        event.dom[i].setAttribute("y",t);
        
        TweenLite.set(el,    { left: pos.left } );  
        
        } 
  }; 





   this.splittext = function(event){
     switch(event.subtype) {
       case "random_colors":
         self.split_random_colors(event);
       break;

       case "machine_gun":
        self.split_machinegun(event);
       break;
       
       case "explosion":
        alert("Es folgt eine Explosion");
        self.split_explosion(event);
       break;
       
       case "shivering":
         self.split_shivering(event);
       break;
       
     }
   };


  this.typewriter = function(event) {
        var s = "", n, name, elements = [], interval, config = {};

        if (event.duration) {
            interval = event.duration*0.001 / event.text.length;
        } else {
            interval =  0.2;
        }

        config = self.get_greensock_props(event);

        name = event.div + "_tyewriter";

        for (n = 0; n < event.text.length; n++ ) {
            s += '<span class = "' + name + '">' + event.text[n] + '</span>';
        }


        // $( '#' + event.div ).html(s);                                        // JQUERY Überrest
        document.getElementById(event.div).innerHTML = s;

        elements = document.getElementsByClassName(name);
        var tl = new TimelineMax({ onComplete: done });
        tl.pause();

        tl.to( elements, 0, {
            'color': 'rgba(0,0,0,0)'
        });
        tl.staggerTo( elements, 0.2, config, interval );

        tl.play();

        function done() {
            if (event.callback) {
                window.setTimeout(event.callback, 0);
            }
        }
    };
    
    this.canvas = function(event) {
        var s;
        
        switch(event.subtype) {
          case "circle":
            alert("erzeugt einen Kreis");
          break;  
        };
        
    };





  this.fire_event = function(event) {
        var s;

        switch(event.type) {
            case 'greensock':
                self.greensock_event(event);
            break;


            case 'repetitive_greensock_event':
                self.create_repetitive_greensock_events(event);
            break;

            case 'stop_animator':
                self.stop();
            break;


            case 'random_position':
                self.set_random_position(event);
            break; 


            case 'random_values':
                self.random_values(event);
            break;

            case 'greensockArray':
               self.greensock_array(event);
            break;

            case 'splittext':
               self.splittext(event);
            break;
                    
            
            case 'canvas':
                self.canvas(event);
            break;
            
            case 'typewriter':
                self.typewriter(event);
            break;


        }
    };



    this.create_event = function(event) {
        self.events.push(event);

    };
  

  this.get_humanized_time = function(interval, irregularity) {
    var x = (Math.random() * irregularity*2) - irregularity;
    return Math.floor(x);
  }


  this.create_repetitive_greensock_events = function(meta) {
    let no;
    if (meta.no) no = meta.no;
    else no = 10;
    for (var i = 0; i < no; i++) {
        let copy = Object.assign({}, meta.event); 
        let t;
        if (meta.irregular)     
            {
            let change = self.get_humanized_time(meta.interval, meta.irregular); 
            t = meta.time + 1000 + (meta.interval * i-1) + change;
            }
        else t = meta.time + 1000 + (meta.interval * i);
        copy.time = t;
        copy.done = false;
        self.create_event( copy);
        }

    self.sort_events(self.events);

    // global.ev = self.events;
    }



this.check_events = function() {
        var i;
        for ( i = 0; i < self.events.length; i++ ) {
            if ( !self.events[i].done && self.events[i].time < self.time ) {
                self.events[i].done = true;
                self.fire_event( self.events[i] );
            }
        }
    };

    this.check_end = function() {
        if (self.time > self.fin && obj.loop === true) {
            self.reset_events();
            self.time = 0;
            self.start = new Date().getTime();
        }
       else
        {

         if (self.time > self.fin)
            {  
            self.rewind();
            }

        }
    };



    this.loop = function loop() {
        self.time = new Date().getTime() - self.start;


        self.check_events();
        self.check_end();

        if (obj.development === true) self.writeTime();

        if (self.paused === false) {
            // console.log("Der Animator startet mit dem Intervall " + obj.interval +  " Pause " + self.paused);
            window.setTimeout( self.loop, obj.interval);
            // self.interval = setInterval( self.loop.bind(this), obj.ihterval);
            
            }
    };


  this.begin = function() {
      self.start = new Date().getTime() - self.time;
      self.paused = false;
      self.loop();
    };


    // in fact it's a pause
    this.stop = function() {
      self.pause = new Date().getTime();
      self.paused = true;
    };

    // stop and rewind
    this.rewind = function() {
      self.reset_events();
      self.time = 0;
      if (obj.development === true) window.setTimeout( self.writeTime,obj.interval*2);
      self.paused = true;

      if (obj.loop === true) console.log("");
      else if (obj.onEnd) {
          obj.onEnd();
      }
    };


    this.add_event = function(event) {
        self.events.push(event);
        self.sort_events(self.events);
    };


    this.sort_events = function(events) {
        function compare(a,b) {
            if (a.time < b.time) { return -1; }
            if (a.time > b.time) { return 1;  }
            return 0;
        }
        events.sort(compare);
        self.fin = events[events.length-1].time + events[events.length-1].duration + 1000;
    };



    this.refresh = function refresh() {
      self.sort_events( self.events );
      self.rewind();
      window.anim = this;
      if (self.interface) self.interface.repaint();
    };


this.init = function() {
        // global.loopedEvents = this;
        if (obj.events.length == 0)
            {
            alert("You haven't defined any events");
            return;
            }

        self.config = obj;

        if (obj.templateFile)
            {
            self.template_file = obj.templateFile;
            }

        if ( obj.events ) {
            self.events = obj.events;
        }


        // so that the events are in a virginal state
        self.reset_events();


        self.sort_events( self.events );
        self.el = document.getElementById(obj.div);
        if (obj.player) {
            self.init_player();
        }


        if (obj.development) {
            self.interface = new iface(this);
            }

        // check if a dbFile is associated
        
        if (obj.dbFile) 
            {
            self.interface.read_file ( obj.dbFile );
            }


        if (obj.hasOwnProperty('autostart') === true)
          {
          if (obj.autostart === true)
            {
            self.start = new Date().getTime();
            self.loop();
            }
          }
        else
          {

            // self.start = new Date().getTime();
            // self.loop();
          // in either case autostart
          }
    };



    self.init();

};


function Cover() {
    var self = this;
    this.animator = null;

    this.defined_dom_elements = function( root ) {
        for (var i = 0; i < coverDivs.length; i++) {
            var el = coverDivs[i];
            var div = document.createElement("div");
            if (el.className) {
                div.className = el.className; 
            }
            else div.className = el.id;
            div.id = el.id;
            div.innerHTML = el.innerHTML;
            root.appendChild(div);
        }
    }

    this.create_dom_elements = function() {
        var div = document.createElement("div");
        div.className = 'cover';
        div.id = 'cover';
        div.innerHTML = '';
        document.body.appendChild(div);

        if ( coverDivs) self.defined_dom_elements( div );
        else {
            var title = document.createElement("div");
            title.className = 'cover-title';
            title.id = 'coverTitle'
            title.innerHTML = 'TITLE';
            div.appendChild( title);
    
            var subtitle = document.createElement("div");
            subtitle.className = 'cover-subtitle';
            subtitle.id = 'coverSubtitle'
            subtitle.innerHTML = 'subtitle';
            div.appendChild( subtitle);
        }


    }


    this.init = function() {
        self.create_dom_elements();
        window.setTimeout( self.animation, 1000);
    }

   this.remove = function() {
        document.getElementById('cover').remove();

   }


   this.animation = function() {
    var obj = {
        autostart: true,
        events: coverEvents,
        loop:false,
        onEnd: self.remove
      };


      self.animator = new Animator( obj );
   }

    self.init();
};
