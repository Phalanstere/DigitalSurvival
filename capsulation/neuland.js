Neuland = {}

String.prototype.capitalize = function() {
	return this.charAt(0).toUpperCase() + this.slice(1);
}

Neuland.Cog = function(div, id) {
	var self = this;
	this.id = id;
	this.div = div;
	this.counter = parseInt(Math.random() * 360);

	this.random = parseInt(Math.random() * 2) - 1;

	this.angle = (parseInt(Math.random() * 12) + 1) * this.random;

	this.iterator = 0;
	this.color = "red";

	this.init = function() {
		var tg = "#tg_" + id + " path";
		$(tg).css("fill", "red");

		var n = "#svg_" + self.id + " path";

		// $(n).css("fill", "#330000");

		$(n).animate({

			stroke : "red",
			opacity : 1,

		}, 10, function() {

		});

	}

	self.init();
}
/*************************************************************************************************/

Neuland.NewbieInformation = function(manager) {
	var self = this;

	this.manager = manager;

	this.username = null;
	this.location = null;
	this.mail_address = null;
	this.competence = null;
	this.gender = null;
	this.perference = null;

	this.locale = "en";

	this.questions = ["name", "location", "mail", "gender", "preference", "competence"];

	this.reset_array = function(val) {
		n = new Array();
		for(var i = 0; i < self.questions.length; i++) {
			if(self.questions[i] != val)
				n.push(self.questions[i]);
		}

		self.questions = n;
	}

	this.random_question = function() {
		var x = parseInt(Math.random() * self.questions.length);

		var answer;

		if(x > 0)
			answer = self.questions[x];
		else
			answer = "nothing";

		switch(answer) {
			case "competence":
				command = "mega_machine.newbie_manager.newbie_informer.get_competence(" + x + ")";
				mega_machine.dialog.entry_question("Tell us what you're good in'?", command, 0);
				break;

			case "preference":
				command = "mega_machine.newbie_manager.newbie_informer.get_preference(" + x + ")";
				mega_machine.dialog.entry_question("Tell us what you like?", command, 0);
				break;

			case "name":
				command = "mega_machine.newbie_manager.newbie_informer.get_name(" + x + ")";
				mega_machine.dialog.entry_question("Do you want to tell us your name?", command, 0);
				break;

			case "location":
				command = "mega_machine.newbie_manager.newbie_informer.get_location(" + x + ")";
				mega_machine.dialog.entry_question("Tell us where you are?", command, 0);
				break;

			case "mail":
				command = "mega_machine.newbie_manager.newbie_informer.get_mail(" + x + ")";
				mega_machine.dialog.entry_question("Do you want to tell us your mail address?", command, 0);
				break;

			case "gender":
				command = "mega_machine.newbie_manager.newbie_informer.get_gender(" + x + ")";
				mega_machine.dialog.entry_question("What is your gender?", command, 0);
				break;

			default:
				// alert(answer);
				break;
		}

	}

	this.get_preference = function() {
		this.perference = $("#dialog_answer").val();
		self.reset_array("preference");
	}

	this.get_competence = function() {
		this.competence = $("#dialog_answer").val();
		self.reset_array("competence");
	}

	this.get_gender = function() {
		this.gender = $("#dialog_answer").val();
		self.reset_array("gender");
	}

	this.get_mail = function() {
		this.mail_address = $("#dialog_answer").val();
		self.reset_array("mail");
	}

	this.get_location = function() {
		this.location = $("#dialog_answer").val();
		self.reset_array("location");
	}

	this.get_name = function() {
		val = $("#dialog_answer").val();

		this.username = val;
		self.reset_array("name");
	}

	this.init = function() {

	}

	self.init();

}
/*****************************************************************************************************/

Neuland.NewbieManager = function(admin) {
	this.admin = admin;
	var self = this;

	this.newbie = false;

	this.newbie_informer = null;

	this.clicked_database = false;
	this.clicked_os = false;

	this.cookie = false;
	this.os_counter = 0;
	// Zählt die Eingaben des Nutzers, löst einen Entscheidungsbaum aus

	this.avatar_images = null;

	this.click_counter = 0;

	this.explanation_done = false;

	this.explanation_array = [];
	this.explanation_counter = 0;

	this.psycho_art = false;

	this.automated_registration = false;

	this.intro_counter = 0;

	this.intro_register = function()
	{
	mega_machine.public.registration_procedure();
	$("#ArtifactsLayer").fadeOut();		
	}


	this.intro = function() {
		var x = document.getElementById("IntroPage");

		if(!x) {
			var s = '<div id = "IntroPage">';

			s += '<div id = "IntroScreen"></div>';

			s += '<div id = "IntroPageContent">';

			s += '<div id = "IntroPageForward">></div>';
			s += '<div id = "IntroPageExit">x</div>';

			s += '<div id = "IntroText">TEXT</div>';

			s += '</div>';

			s += '</div>';

			$("body").append(s);

			$("#IntroPage").fadeIn();

			$("#IntroPageExit").click(function() {
				$("#IntroPage").fadeOut();
			});

			$("#IntroPageForward").click(function() {
				mega_machine.newbie_manager.intro();
			});

		}


	    



		$("#IntroPage").show();

		self.intro_counter++;

		if(self.intro_counter != 13) {
			var n = "intro_" + self.intro_counter;
			var s = mega_machine.public.messages.get(n);

			$("#IntroText").html(s);
			
			
	   		switch(self.intro_counter)
	   		{
	   		case 1:
	   		 var s = '<img src = "/images/new_interface/intro/01_Truth.jpg"/>';
	   		 $("#IntroScreen").html(s);
	   		break;	
	   		
	   		case 2:
	   		var s = '<img src = "/images/new_interface/intro/02_Water.jpg"/>';
	   		 $("#IntroScreen").html(s);
	   		break;
	   		
	   		case 3:
	   		var s = '<img src = "/images/new_interface/intro/03_Annika.jpg"/>';
	   		 $("#IntroScreen").html(s);
	   		break;	 
	   		  		
	   		case 4:
	   		var s = '<img src = "/images/new_interface/intro/04_Paar.jpg"/>';
	   		 $("#IntroScreen").html(s);
	   		break;	 	   		

	   		case 5:
	   		var s = '<img src = "/images/new_interface/intro/05_Nacht.jpg"/>';
	   		 $("#IntroScreen").html(s);
	   		break;	 
	   		
	   		
	   		case 6:
	   		var s = '<img src = "/images/new_interface/intro/06_Wanner.jpg"/>';
	   		 $("#IntroScreen").html(s);
	   		break;	 
	   		
	   		case 7:
	   		var s = '<img src = "/images/new_interface/intro/Maske.jpg"/>';
	   		 $("#IntroScreen").html(s);
	   		break;	 
	   		
	   		case 8:
	   		var s = '<img src = "/images/new_interface/intro/08_Beermann2.jpg"/>';
	   		 $("#IntroScreen").html(s);
	   		break;	 	   		
	   			   		
	   		case 9:
	   		var s = '<img src = "/images/new_interface/intro/09_Turtle.jpg"/>';
	   		 $("#IntroScreen").html(s);
	   		break;	 

	   		case 10:
	   		var s = '<img src = "/images/new_interface/intro/10_Goldfisch.jpg"/>';
	   		 $("#IntroScreen").html(s);
	   		break;	 

	   		case 11:
	   		var s = '<img src = "/images/new_interface/intro/11_Blomberg2.jpg"/>';
	   		 $("#IntroScreen").html(s);
	   		break;	

	   		case 12:
	   		var s = '<img src = "/images/new_interface/intro/11_Blomberg2.jpg"/>';
	   		 $("#IntroScreen").html(s);
	   		break;	
	   		
	   		}
			
			
			
			
			
		} else {
			$("#IntroPage").fadeOut();
			self.intro_counter = 0;
		}

	}

	this.login_registration_offer = function() {

	}

	this.user_options = function() {
		if(mega_machine.public.status == "public") {
			mega_machine.newbie_manager.language_choice();
			// mega_machine.public.show_register();
			mega_machine.public.login_or_register();
		}

	}

	this.virgo_clinique = function() {
		mega_machine.change_active_page();
		mega_machine.show_website("virgoclinique.eu");

		mega_machine.dialog.feedback(mega_machine.public.messages.get("optimization"));
	}

	this.shop_feedback = function() {
		var s = mega_machine.public.messages.get("exclusive_shop");
		mega_machine.dialog.feedback(s);

		if(self.automated_registration == false) {
			self.automated_registration = true;
			var s = "mega_machine.newbie_manager.automatic_register_page()";

			mega_machine.newbie_manager.automatic_register_page();
			// window.setTimeout(s, 1200);
		}
	}

	this.ready_for_registration = function() {
		var s = mega_machine.public.messages.get("registration_ready");

		alert(s);
	}

	this.automatic_register_page = function() {
		self.log_in();

		var s = "javascript:mega_machine.start_enrollment()";
		window.setTimeout(s, 1500);

		var q = "javascript:mega_machine.newbie_manager.ready_for_registration()";
		window.setTimeout(q, 5500);
	}

	this.language_choice = function() {

		var s = '<div id = "FrontLanguageChoice">';

		s += '';

		s += '<div id = "English" onclick = "javascript:mega_machine.newbie_manager.set_language(1)" class = "language active_language" >';
		s += "English";
		s += '</div>';

		s += '<div id = "Espagnol" onclick = "javascript:mega_machine.newbie_manager.set_language(3)" class = "language">';
		s += "Español";
		s += '</div>';

		s += '<div id = "Deutsch" onclick = "javascript:mega_machine.newbie_manager.set_language(2)" class = "language">';
		s += "Deutsch";
		s += '</div>';

		s += '</div>';

		s += '<div id = "IntroButton">INTRO</div>';

		$("#Neuland").append(s);

		// mega_machine.dialog.feedback(s);

		$("#IntroButton").click(function() {
			// alert("INTRO");
			mega_machine.newbie_manager.intro();
		});

	}

	this.psychotest_artifact = function() {
		if(self.psycho_art == false) {
			self.psycho_art = true;

			var s = '<div class = "Artifacts" id = "Rorschach" title = "the Rorschach mystery">';

			s += '<div class = "ArtifactsImage">';
			s += '<img src = "/images/new_interface/Rorschach.jpg"/>';
			s += '</div>';

			s += '<div class = "name">';
			s += "Psychoanalysis";
			s += '</div>';
			s += '</div>';

			$("#ArtifactLayer").append(s);

			$("#Rorschach").css({

				left : 700,
				top : 290,
			});

			$("#Rorschach").draggable();

			$("#Rorschach").click(function() {

				mega_machine.newbie_manager.psychotest();
			});

		}
	}

	this.hack_art = false;
	this.hack_start = false;

	this.hacker_artifact = function() {
		self.hack_art = true;

		var s = '<div class = "Artifacts" id = "Hacker" title = "hack this website!">';

		s += '<div class = "ArtifactsImage">';
		s += '<img src = "/images/new_interface/hack.jpg"/>';
		s += '</div>';

		s += '<div class = "name">';
		s += "Hacker";
		s += '</div>';
		s += '</div>';

		$("#ArtifactLayer").append(s);

		$("#Hacker").css({

			left : 600,
			top : 380,
		});

		$("#Hacker").draggable();

		$("#Hacker").click(function() {

			if(mega_machine.newbie_manager.hack_start == false) {
				mega_machine.newbie_manager.hack_start = true;
				mega_machine.start_hacking_game();
			}

			// mega_machine.newbie_manager.psychotest();
		});

	}

	this.psychotest_video = false;

	this.psychotest = function() {
		if(self.psychotest_video == false) {
			self.psychotest_video = true;
			mega_machine.public.psychotest.video();
		} else {
			if(self.hack_art == false) {
				var s = "self.hacker_artifact()";
				window.setTimeout(s, 4500);
			}

		}
	}

	this.set_language = function(no) {
		$(".language").removeClass("active_language");

		switch(no) {
			case 1:
				self.admin.cookie_manager.modify("locale", "en");
				// $("#dialog_feedback").fadeOut();

				var s = mega_machine.public.messages.get("greeting");
				s += '<div class = "image_size"><img src = "/images/new_interface/Wilde.jpg"/></div>';

				mega_machine.dialog.feedback(s);

				$("#English").addClass("active_language");

				break;

			case 3:
				self.admin.cookie_manager.modify("locale", "es");
				// $("#dialog_feedback").fadeOut();
				var s = mega_machine.public.messages.get("greeting");
				s += '<div class = "image_size"><img src = "/images/new_interface/Lorca.jpg"/></div>';
				mega_machine.dialog.feedback(s);

				$("#Espagnol").addClass("active_language");

				break;

			case 2:
				self.admin.cookie_manager.modify("locale", "de");
				var s = mega_machine.public.messages.get("greeting");
				s += '<div class = "image_size"><img src = "/images/new_interface/Nietzsche.jpg"/></div>';
				mega_machine.dialog.feedback(s);
				// $("#dialog_feedback").fadeOut();

				$("#Deutsch").addClass("active_language");

				break;

		}
	}

	this.fill_explanations = function() {
		var s = "TwinKomplex is the DIA's recruitment game. ";
		s += "We are always looking for talent, all over the world. "

		s += "<br>Your're welcome!<br>"
		self.explanation_array.push(s);

		s = "You will be part of a network that will stand up for you.<br>";
		self.explanation_array.push(s);

		s = "As a part of this community, you may remain anonymous.<br>"
		self.explanation_array.push(s);

		s = "You will cooperate with others.<br>"
		self.explanation_array.push(s);

		s = "Read tracks, leave tracks!<br>"
		self.explanation_array.push(s);

		s = "This is real presence, not a false promise.<br>"
		self.explanation_array.push(s);

		s = "Your time makes us stronger.<br>"
		self.explanation_array.push(s);

		s = "You will make sense.<br>"
		self.explanation_array.push(s);

		// void

		s = "Reality is a lie exposed by fiction - so please: Feel free to lie!<br>";
		self.explanation_array.push(s);

	}

	this.explanation = function() {
		if(self.explanation_done == false) {
			self.fill_explanations();

			var s = self.explanation_array[0];

			t = '<div id = "GameExplanation" class = "hyphenate">';
			t += '</div>';

			t += '<div id = "GameExplanationStored">';
			t += '</div>';

			$("#NeulandDouble").append(t);

			self.explanation_done = true;
			mega_machine.statusbar.show_typewriter(s);
			self.explanation_counter++;
		} else {
			no = self.explanation_counter;

			if(no < self.explanation_array.length) {
				var s = self.explanation_array[no];
				mega_machine.statusbar.show_typewriter(s);
				self.explanation_counter++;
			}
		}

	}

	this.show_cubes = function() {
		var t = '<div id = "LeftCube">';
		t += '</div>';

		t += '<div id = "RightCube">';
		t += '</div>';

		$("#NarrativeContext").append(t);

		// mega_machine.public.knot_manager.initial.paint_tree("RightCube");
	}

	this.getLocation = function() {
		if(navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(self.showPosition);

		} else
			alert("not supported");
	}

	this.showPosition = function(position) {
		var s = "Latitude: " + position.coords.latitude + "<br>Longitude: " + position.coords.longitude;

		var x = position.coords.latitude + "," + position.coords.longitude;
		mega_machine.cookie_manager.modify("coord", x);

		var n = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
		// Aberdeen
		mega_machine.map_context.map.map.setCenter(n);

		mega_machine.map_context.map.solitaire_marker(n);

	}

	this.setGamestate = function(no) {

		switch(no) {
			case 1:
				$("#NeulandDouble").hide();
				mega_machine.newbie_manager.show_first_group();
				$("#ArtifactsLayer").css("zIndex", 2);
				mega_machine.target_page("down", "map", false);
				mega_machine.map_context.set_active_map("nethernet");
				$("#text_entry").hide();
				break;

			case 2:
				// Die Fensterwechsel sind sichtbar
				$("#NeulandDouble").hide();
				mega_machine.newbie_manager.show_first_group();
				$("#ArtifactsLayer").css("zIndex", 2);
				mega_machine.target_page("down", "map", false);
				mega_machine.map_context.set_active_map("nethernet");
				$("#text_entry").hide();
				$("#LowerMini").show();
				$("#UpperMini").show();
				break;

			case 3:
				$("#NeulandDouble").hide();
				mega_machine.newbie_manager.show_first_group();
				$("#ArtifactsLayer").css("zIndex", 2);
				mega_machine.target_page("down", "lab", false);
				$("#text_entry").hide();
				$("#LowerMini").show();
				$("#UpperMini").show();

				$("#lab_interaction").show();

				// self.open_laboratory();

				var s = "mega_machine.newbie_manager.stop_clockwork(0)";
				window.setTimeout(s, 10000);
				break;

			case 4:
				$("#NeulandDouble").hide();
				mega_machine.newbie_manager.show_first_group();
				$("#ArtifactsLayer").css("zIndex", 2);
				mega_machine.target_page("down", "lab", false);

				$("#text_entry").hide();
				$("#LowerMini").show();
				$("#UpperMini").show();

				$("#lab_interaction").show();

				$("#db_switch").show();

				$("#db_interaction").show();
				$("#db_switch").show();

				$("#os_interaction").show();
				$("#os_switch").show();

				var s = "mega_machine.newbie_manager.stop_clockwork(1)";
				window.setTimeout(s, 10000);

				break;

			case 5:
				// Nutzer hat schon einmal das Registrierungsformular geöffnet
				$("#NeulandDouble").hide();
				mega_machine.newbie_manager.show_first_group();
				$("#ArtifactsLayer").css("zIndex", 2);
				mega_machine.target_page("down", "lab", false);

				$("#text_entry").hide();
				$("#LowerMini").show();
				$("#UpperMini").show();

				$("#lab_interaction").show();

				$("#db_switch").show();

				$("#db_interaction").show();
				$("#db_switch").show();

				$("#os_interaction").show();
				$("#os_switch").show();

				var s = "mega_machine.newbie_manager.stop_clockwork(2)";
				window.setTimeout(s, 10000);
				break;

			case 6:
				// Der Nutzer hat das Registierungsformular geöffnet und schon auf eines der Attributes geklickt
				$("#NeulandDouble").hide();
				mega_machine.newbie_manager.show_first_group();
				$("#ArtifactsLayer").css("zIndex", 2);
				mega_machine.target_page("down", "lab", false);

				$("#text_entry").hide();
				$("#LowerMini").show();
				$("#UpperMini").show();

				$("#lab_interaction").show();

				$("#db_switch").show();

				$("#db_interaction").show();
				$("#db_switch").show();

				$("#os_interaction").show();
				$("#os_switch").show();

				var s = "mega_machine.newbie_manager.stop_clockwork(3)";
				window.setTimeout(s, 6000);
				break;

			case 7:
				// der Nutzer hat das Hackerspiel gestartet
				$("#NeulandDouble").hide();
				mega_machine.newbie_manager.show_first_group();
				$("#ArtifactsLayer").css("zIndex", 2);
				mega_machine.target_page("down", "lab", false);

				$("#text_entry").hide();
				$("#LowerMini").show();
				$("#UpperMini").show();

				$("#lab_interaction").show();

				$("#db_switch").show();

				$("#db_interaction").show();
				$("#db_switch").show();

				$("#os_interaction").show();
				$("#os_switch").show();

				var s = "mega_machine.newbie_manager.stop_clockwork(4)";
				window.setTimeout(s, 6000);

				mega_machine.delayed_job("psychotest", 10000);

				break;

			case 8:
				// Der Nutzer hat den Psychotest gestartet

				$("#NeulandDouble").hide();
				mega_machine.newbie_manager.show_first_group();
				$("#ArtifactsLayer").css("zIndex", 2);
				mega_machine.target_page("down", "lab", false);

				$("#text_entry").hide();
				$("#LowerMini").show();
				$("#UpperMini").show();

				$("#lab_interaction").show();

				$("#db_switch").show();

				$("#db_interaction").show();
				$("#db_switch").show();

				$("#os_interaction").show();
				$("#os_switch").show();

				var s = "mega_machine.newbie_manager.stop_clockwork(4)";
				window.setTimeout(s, 6000);

				mega_machine.delayed_job("hacking_game", 10000);

				break;

			case 9:
				// Der Nutzer den den Psychotest beendet
				break;

			case 10:
				// Der Nutzer hat den Psychotest wiederholt
				break;

			case 100:
				$("#NeulandDouble").hide();
				mega_machine.newbie_manager.show_first_group();
				$("#ArtifactsLayer").css("zIndex", 2);
				mega_machine.target_page("down", "lab", false);

				$("#text_entry").hide();
				$("#LowerMini").show();
				$("#UpperMini").show();

				$("#lab_interaction").show();

				$("#db_switch").show();

				$("#db_interaction").show();
				$("#db_switch").show();

				$("#os_interaction").show();
				$("#os_switch").show();

				break;

			default:

				break;

		}

		// Hier sollte festgehalten werden, was passiert, wenn  der Wert größer ist

	}
	/************************************ ENROLLMENT ******************************************************/

	this.select_language = function(input) {

		switch(input.value) {
			case "choice":
				var s = "choice of language is a mandatory entry field";
				mega_machine.statusbar.show(s);
				break;

			case "english":
				self.admin.cookie_manager.modify("locale", "en");
				$("#player_locale").val("en");
				break;

			case "german":
				self.admin.cookie_manager.modify("locale", "de");
				$("#player_locale").val("de");
				break;

			case "spanish":
				self.admin.cookie_manager.modify("locale", "es");
				$("#player_locale").val("es");
				break;

		}
	}

	this.select_competence = function(input) {
		self.admin.cookie_manager.modify("quality", input.value);
		self.admin.cookie_manager.modify("gamestate", 6);

		switch(input.value) {
			case "bulgarian":
				var s = 'Brilliant!<br><br>';
				s += '<img src = "/images/new_interface/mafia.jpg"/>';
				mega_machine.dialog.feedback(s);
				break;

			case "courage":
				var s = 'Brilliant!<br><br>';
				s += '<img src = "/images/new_interface/courage3.jpg"/>';
				mega_machine.dialog.feedback(s);
				break;

			case "empathy":
				var s = 'Brilliant!<br><br>';
				s += '<img src = "/images/new_interface/empathy.jpg"/>';
				mega_machine.dialog.feedback(s)
				break;

			case "socializing":
				var s = 'Brilliant!<br><br>';
				s += '<img src = "/images/new_interface/cheerleader03.jpg"/>';
				mega_machine.dialog.feedback(s)
				break;

			case "money":
				var s = 'Brilliant!<br><br>';
				s += '<img src = "/images/new_interface/sau.jpg"/>';
				mega_machine.dialog.feedback(s)
				break;

			case "fartist":
				var s = 'Brilliant!<br><br>';
				s += '<img src = "/images/new_interface/fartist2.jpg"/>';
				s += '<a href="http://en.wikipedia.org/wiki/Le_P%C3%A9tomane" target="_blank">wikipedia</a>';

				mega_machine.dialog.feedback(s);

				break;

			default:
				alert(input.value);
				break;

		}
	}

	this.select_preferences = function(input) {
		self.admin.cookie_manager.modify("preference", input.value);
		self.admin.cookie_manager.modify("gamestate", 6);

		switch(input.value) {
			case "aardvarks":
				var s = 'Good luck!<br><br>';
				s += '<img src = "/images/new_interface/erdferkel.jpg"/>';
				mega_machine.dialog.feedback(s);
				break;

			case "lederhose":
				var s = 'Good luck!<br><br>';
				s += '<img src = "/images/new_interface/Lederhose01.jpg"/>';
				mega_machine.dialog.feedback(s);
				break;

			case "calligraphy":
				var s = 'Good luck!<br><br>';
				s += '<img src = "/images/new_interface/kalligraphie.jpg"/>';
				mega_machine.dialog.feedback(s);
				break;

			case "shakespeare":
				var s = 'Good luck!<br><br>';
				s += '<img src = "/images/new_interface/mudmen.jpg"/>';
				mega_machine.dialog.feedback(s);
				break;

			case "potatoes":
				var s = 'Good luck!<br><br>';
				s += '<img src = "/images/new_interface/potato01.jpg"/>';
				mega_machine.dialog.feedback(s);
				break;

			case "math":
				var s = 'Good luck!';
				s += '<div class = "quote">Donc, définitivement: ';
				s += 'Dieu est le plus court chemin du zéro à l’infini, dans un sens ou dans l’autre.<br>';

				s += '<br>Alfred Jarry</div>';

				mega_machine.dialog.feedback(s);
				break;

			case "medicine":
				var s = 'Good luck!<br><br>';
				s += '<img src = "/images/new_interface/cloning.jpg"/>';
				mega_machine.dialog.feedback(s);
				break;

		}
	}

	this.select_gender = function(input) {
		self.admin.cookie_manager.modify("gender", input.value);
		self.admin.cookie_manager.modify("gamestate", 6);

		switch(input.value) {
			case "belgian giant":

				var s = 'Are you sure?<br><br>';
				s += '<img src = "/images/new_interface/giantbunny.jpg"/>';

				s += '<a href="http://nl.wikipedia.org/wiki/Vlaamse_Reus_(konijn)" target="_blank">wikipedia</a>';

				mega_machine.dialog.feedback(s);

				break;

			case "virgin":
				break;

			case "purse":
				var s = 'Are you sure?<br><br><br><br>';

				s += '<img src = "/images/new_interface/granta.jpg"/>';

				s += '<br><br>';

				s += '<a href="http://www.granta.com/Archive/Granta-110-Sex" target="_blank">Granta magazine</a>';

				mega_machine.dialog.feedback(s);
				break;

			case "opportunist":
				var s = 'Are you sure?<br><br>';
				s += '<img src = "/images/new_interface/opportunist.jpg"/>';
				mega_machine.dialog.feedback(s);
				break;

			case "consumer":
				var s = 'Are you sure?<br><br>';
				s += '<img src = "/images/new_interface/kim.jpg"/>';
				mega_machine.dialog.feedback(s);
				break;

			case "elephant":
				var s = 'Are you sure?<br><br>';
				s += '<img src = "/images/new_interface/elefant.jpg"/>';
				mega_machine.dialog.feedback(s);
				break;

			default:
				alert(input.value);
				break;

		}

	}

	this.getting_signup_form = function() {
		var url = "/engine/registrations/new";

		$.ajax({
			type : "GET",
			url : url

		}).done(function(msg) {

			$("#enrollment_form").html(msg);

		});
	}

	this.enrollment_process = function() {

		$("#NarrativeContext").html("");

		self.getting_signup_form();

		var s = '<div id = "RegistrationPage">';

		s += '<div id = "RegTitle">DIA ENROLLMENT FORM </div>';
		s += '<div id = "RegTree"></div>';

		s += '<div id = "RegQuotation">'
		// s += "Liebe heißt, geben was man nicht hat und noch dazu jemandem, der es nicht haben will.<br>"
		// s += '<span class = "RegAuthor">(Jacques Lacan, † 9. September 1981)</span>';
		s += '</div>';

		s += '<div id = "RegFormular">';
		s += '<div class = "legend">GEOGRAPHIC LOCATION</div>';
		s += '<br>';

		s += '<div id = "location" class = "form_field">';

		s += '<input type="text" id="geo_input">';

		s += '</div>';
		s += '<br>';

		s += '<div class = "legend">GENDER</div>';
		s += '<div id = "gender" class = "field">';

		s += '<select id="genders_options" onchange="mega_machine.newbie_manager.select_gender(this)">';

		s += '<option value = "consumer">consumer</option>';
		// s += '<option value = "squirrel">squirrel</option>'; // 
		
		
		s += '<option value = "elephant">elephant</option>';
		s += '<option value = "opportunist">opportunist</option>';
		s += '<option value = "belgian giant">belgian giant</option>';
		s += '<option value = "purse">purse</option>';

		s += '</select>';

		s += '</div>';

		s += '<div class = "legend">PREFERENCE</div>';

		s += '<div id = "preference" class = "field">';

		s += '<select id="preference_options" onchange="mega_machine.newbie_manager.select_preferences(this)">';

		s += '<option value = "lederhose">Lederhose</option>';
		s += '<option value = "shakespeare">Skakespeare</option>';
		s += '<option value = "math">math</option>';
		s += '<option value = "medicine">医学</option>';
		s += '<option value = "aardvarks">aardvarks</option>';
		s += '<option value = "potatoes">potatotes</option>';

		s += '</select>';
		s += '</div>';

		s += '<div class = "legend">QUALITIES</div>';

		s += '<div id = "competence" class = "field">';

		s += '<select id="competence_options" onchange="mega_machine.newbie_manager.select_competence(this)">';

		s += '<option value = "empathy">empathy</option>';
		s += '<option value = "courage">courage</option>';
		s += '<option value = "fartist">fartist</option>';
		s += '<option value = "money">big spender</option>';
		s += '<option value = "socializing">socializing</option>';
		s += '<option value = "bulgarian">Bulgarian</option>';

		s += '</select>';
		s += '</div>';

		s += '<div class = "legend">LANGUAGE<span class = "star">*</span></div>';
		s += '<div id = "language" class = "field">';

		s += '<select id="language_options" class = "necessary" onchange="mega_machine.newbie_manager.select_language(this)">';
		s += '<option value = "choice" class = "necessary">choose language!</option>';
		s += '<option value = "english" class = "necessary">English</option>';
		s += '<option value = "spanish" class = "necessary">Spanish</option>';
		s += '<option value = "german" class = "necessary">German</option>';

		s += '</select>';

		s += '</div>';

		s += '<div id = "enrollment_form"></div>';

		/*

		 s += '<br>';
		 s += '<div class = "legend">AGENT NAME<span class = "star">*</span></div>';
		 s += '<input class = "obligatory" type="text" id="agend_name">';
		 s += '<br>';

		 s += '<div class = "legend">MAIL ADDRESS<span class = "star">*</span></div>';
		 s += '<input class = "obligatory" type="text" id="agend_name">';
		 s += '<br>';

		 s += '<div class = "legend">PASSWORD<span class = "star">*</span></div>';
		 s += '<input class = "obligatory" type="text" id="agend_name">';
		 s += '<br>';

		 s += '<div class = "submit">SUBMIT</div>';
		 s += '<br>';

		 s += '</div>';

		 */

		s += '</div>';

		s += '</div>';

		$("#NarrativeContext").append(s);

		$("#NarrativeContext").show();

		if(mega_machine.cookie_manager.cookie_obj.coord != 0) {
			$("#geo_input").val(mega_machine.cookie_manager.cookie_obj.coord);
		}

		// mega_machine.public.knot_manager.enrollment.paint_tree("RegTree", "DELAY");

		return true;
	}

	this.show_form = function() {
		$("#RegFormular").fadeIn();
	}

	this.enrollment_psychotest = function(caller) {
		var s = "";

		switch(mega_machine.newbie_manager.newbie_informer.locale) {
			case "de":
				s += "Wir sind kein weiteres soziales Netzwerk. Und deshalb: Wir sind nicht an Ihren Daten, sondern nur an Ihrer persönlichen Sicherheit interessiert. Deshalb: <br>";

				s += "<li>Nutzen Sie statt Ihres wirkichen Namens eine Legende.</li>";
				s += "<li>Nutzen Sie statt eines Profilbildes ein Avatar-Bild, das es anderen Nutzern erlaubt, Sie wiederzuerkennen.</li>";

				s += "<li>Wenn Sie uns eine Email-Addresse anvertrauen, so vor allem deswegen, damit wir Sie in Notfällen kontaktieren können</li>";

				s += "Wir brauchen verlässliche und verschwiegene Mítarbeiter.";
				s += "Wenn Sie die Regeln des gegenseitigen Respekts brechen, ist dies für ein Grund, Sie aus unserer Organisation auszhuschließen."

				break;

			case "en":

				s += "This is not another social network. Therefore: We are NOT interested in getting your personal data. We recommend:<br>";

				s += "<ul>";

				s += "<li>Don't use your real name, use a legend.</li>";
				s += "<li>Don't show your face, just a catchy avatar that will allow other agents to identify you</li>";

				s += "<li>If you tell us your email address, it may be any valid address that allows us to contact you.</li>";

				s += "</ul>";

				s += "We are looking for reliable and reticent agents. Breaking the rules of mutual respect will be a reason to sort you out."

				break;

			case "es":

				break;

		}

		var command = "mega_machine.newbie_manager.show_form()";

		self.admin.dialog.feedback(s, command, 1);
		// true cancel - command

	}
	/************************************ REGISTRIERUNGSPROZESS ********************************************/

	this.registration_process = function(caller) {
		return false;
	}

	this.webcam_process = function(caller) {
		$('#NarrativeContext').photobooth();
	}

	this.hacker_process_caller

	this.hacker_process = function() {
		if(self.hacker_process_caller)
			self.hacker_process_caller.callback(true);

		mega_machine.statusbar.show("Have a look at the laboratory, there you'll find futher instructions ");
	}

	this.deny_hacker_process = function() {
		if(self.hacker_process_caller)
			self.hacker_process_caller.callback(false);
	}

	this.hacking_task = function(caller) {
		self.hacker_process_caller = caller;

		var testfall = caller;

		var s = "So you want to hack the DIA ";
		command = "mega_machine.newbie_manager.hacker_process()";
		negative = "mega_machine.newbie_manager.deny_hacker_process()";

		mega_machine.dialog.confirmation(s, command, negative);
	}

	this.hacking_timeout = function() {
		var s = "Seems you are not the hacker genuis you pretended to be. You can try anew, but you could register as an ordinary user anyway. We also accept ordinary people -";
		s += "as long as they pass our psycho test."
		mega_machine.dialog.feedback(s);
	}

	this.hacking_info = function(caller) {

	}

	this.attempts = 0;
	this.hacker_start_time

	this.dirty_hack = function() {
		mega_machine.cookie_manager.modify("hacking", 1);

		var positive = "mega_machine.newbie_manager.check_password()";
		mega_machine.dialog.entry_question("You're bold, great! So have a try and type in the password", positive, 0);

		mega_machine.cookie_manager.modify("gamestate", 7);
	}

	this.check_password_copy = function(text) {

		for(var i = 0; i < hackphrase.list.length; i++) {
			console.log(hackphrase.list[i] + " - " + text);

			if(hackphrase.list[i] == text) {
				alert("gefunden");
				return true;
			}
		}

		return false;
	}

	this.check_first_pattern = function(text) {
		var first = text.slice(0, 3);
		var assumption = false;
		if(hackphrase)
			assumption = hackphrase.check_initial(first);

		console.log("FIRST PATTERN " + assumption);

		return assumption;
	}

	this.check_last_pattern = function(text) {
		n = text.length;
		start = n - 12;

		var last = text.slice(start, n);

		var assumption = false;
		if(hackphrase)
			assumption = hackphrase.check_last(last);

		console.log("LAST PATTERN " + assumption + " sequenz " + last);

		return true;

	}

	this.check_timestamp = function(input) {
		var t = parseInt(input.slice(3, 16));

		n = new Date().getTime();

		diff = n - t;

		if(t < n && t > (n - 60000)) {
			return true;
		}

		console.log("time diff " + diff);
		return false;

	}

	this.solved_hack = function() {
		var s = "WOW! COOL! KABOOM! YOU ARE A TRUE GENIUS! BRILLIANT! ONE OUT OF A THOUSAND!!!";

		s += "<br>Have a look at your inventory ";
		mega_machine.dialog.feedback(s);
	}

	this.check_password = function() {
		if(self.attempts == 0)
			self.hacker_start_time = new Date().getTime();

		self.attempts++;

		var copypaste = self.check_password_copy(mega_machine.dialog.text_input);
		var input = mega_machine.dialog.text_input;

		if(copypaste == true) {
			var s = "Nice attempt, such a copy paste!<br><br>";
			s += "Sure, you could repeat that with all the passwords we gave you.";
			s += "But what about a smarter solution?"

			mega_machine.dialog.feedback(s);

		} else {
			var first = self.check_first_pattern(input);
			var second = self.check_last_pattern(input);

			if(first == true || second == true) {
				if(first == true && second == false) {
					var s = "hmm... that's promising. Seems that you have solved the first triple. Faily easy, wasn't it";
					mega_machine.dialog.feedback(s);
				}
				if(second == true && first == false) {
					var s = "You have got the closing sequence, great!";
					mega_machine.dialog.feedback(s);
				}

			}

			if(first == true && second == true) {
				if(self.check_timestamp(input) == true)
					mega_machine.newbie_manager.solved_hack();
				else {
					var s = "Wow! Now the only thing missing is the center part. All these numbers, what do they mean?";
					mega_machine.dialog.feedback(s);
				}
			}

			if(hackphrase) {
				if(input.length < hackphrase.list[i].length)
					mega_machine.dialog.feedback("didn't' you notice that alle the passwords are of the same length?");

			}

		}

	}
	/********************************** IDENTIFIKATIONS-PROZESS *********************************************/

	this.engaged_player = false;

	this.nethernet_manifesto = null;

	this.check_engagement = function() {
		return self.engaged_player;
	}

	this.lab_initialized = false;

	this.open_laboratory = function() {
		// mega_machine.cookie_manager.modify("gamestate", 3);

		$("#lab_interaction").show();

		mega_machine.target_page("down", "lab", false);

		// $("#lab_interaction").css({ boxShadow: 'inset 1px 3px 6px red' });
		// $('#lab_interaction').animate({boxShadow: 'inset 1px 3px 6px red'});

		if(self.lab_initialized == false) {
			self.lab_initialized = true;
			self.public_laboratory();
		}

	}

	this.lab_explanation = function() {

		var m = mega_machine.public.messages.get("lab_explain");

		var n = '<div id = "lab_explanation">';
		n += m;
		n += '</div>';

		$("#ArtifactLayer").append(n);

		n = '$("#lab_explanation").fadeOut()';
		window.setTimeout(n, 12000);
	}

	this.public_laboratory = function() {
		if(mega_machine.cookie_manager.cookie_obj.game_state < 3 && self.lab_initialized == false) {
			// alert("PUBLIC");

			// http://www.twinkomplex.com/system/clips/87/original/vi_null_Frank_DIA_IchWeissEsNicht_A-720p.HQ.mp4

			$("lab_interaction").show();
			mega_machine.statusbar.delayed_message("now you can enter the DIA laboratory", 3000);
			mega_machine.statusbar.delayed_message("learn more about the organization", 16000);

			self.lab_explanation();

			var s = '<div class = "Artifacts" id = "Sternagel" title = "this will open a video view">';

			s += '<div class = "ArtifactsImage">';
			s += '<img src = "/images/new_interface/sternagel.png"/>';
			s += '</div>';

			s += '<div class = "name">';
			s += "DIA co-founder Frank Sternagel - VIDEO";
			s += '</div>';
			s += '</div>';

			$("#ArtifactLayer").append(s);

			$("#Sternagel").draggable();

			$("#Sternagel").css({

				left : 560,
				top : 30,
			});

			self.additional_artifacts();
			self.audio_artifact();

			self.text_artifact();

			$("#Sternagel").click(function() {

				mega_machine.newbie_manager.sternagel_video();
			});

		} else
			self.laboratory_initialized();

	}

	this.laboratory_initialized = function()// wie oben, nur ohne die Nachrichten
	{
		if(self.lab_initialized == false) {
			self.lab_initialized = true;

			$("lab_interaction").show();

			var s = '<div class = "Artifacts" id = "Sternagel" title = "this will open a video view">';

			s += '<div class = "ArtifactsImage">';
			s += '<img src = "/images/new_interface/sternagel.png"/>';
			s += '</div>';

			s += '<div class = "name">';
			s += "DIA co-founder Frank Sternagel - VIDEO";
			s += '</div>';
			s += '</div>';

			$("#ArtifactLayer").append(s);

			$("#Sternagel").draggable();

			$("#Sternagel").css({

				left : 560,
				top : 30,
			});

			self.additional_artifacts();
			self.audio_artifact();

			self.text_artifact();

			$("#Sternagel").click(function() {
				mega_machine.newbie_manager.sternagel_video();
			});

		}

	}

	this.revolution_audio = function() {
		var ogg = "http://www.twinkomplex.com/system/audio_clips/93/vorbis/22c88efcf34833bbcdd482d3.ogg";
		var mp3 = "http://www.twinkomplex.com/system/audio_clips/93/original/22c88efcf34833bbcdd482d3.mp3";

		var media = {
		};

		media.ogg = ogg, media.mp3 = mp3, mega_machine.jsplayer(media);
	}

	this.nethernet_text = function() {
		mega_machine.cookie_manager.modify("gamestate", 4);

		$("#LabDetailedView").show();

		var div = '<div id = "DetailViewContent">';
		div += '</div>';

		div += '<div id = "DetailedText">';
		div += self.nethernet_manifesto;
		div += '</div>';

		$("#DetailedItem").html(div);

	}

	this.banana_text = function() {
		mega_machine.cookie_manager.modify("gamestate", 4);

		$("#LabDetailedView").show();

		// var img = "http://twinkomplex.com/system/images/71/de/original/gr_01_Netz_Manifest_A.jpg";
		var img = "/images/new_interface/BananaRepublique.jpg";

		var div = '<div id = "DetailViewContent">';
		div += '<img src = "' + img + '" id ="detail_image" />';
		div += '</div>';

		$("#DetailedItem").html(div);

		jQuery(function($) {
			$("#detail_image").smoothZoom({
				width : "100%",
				height : "100%",
				pan_BUTTONS_SHOW : "YES",
				pan_LIMIT_BOUNDARY : "YES",
				button_SIZE : 24,
				button_ALIGN : "top right",
				zoom_MAX : 400,
				border_TRANSPARENCY : 20
			});
		});

	}

	this.intro_sternagel = function() {
		$("#IntroPage").fadeOut();
		self.sternagel_video();
	}

	this.sternagel_video = function() {
		mega_machine.cookie_manager.increment_attribute("sternagel_video", 1);
		mega_machine.cookie_manager.modify("gamestate", 4);

		$("#UpperMini").show();

		var s = '<div id="video_player">';

		// http://www.twinkomplex.com/system/clips/87/poster_sidebar/vi_null_Frank_DIA_IchWeissEsNicht_A-720p.HQ.jpg

		s += '<video  controls poster="http://www.twinkomplex.com/system/clips/87/poster/twinkle2.jpg" >';

		s += '<source src="http://www.twinkomplex.com/system/clips/87/h264/vi_null_Frank_DIA_IchWeissEsNicht_A-720p.HQ.mp4" type=\'video/mp4; codecs="avc1.42E01E, mp4a.40.2"\'></source>';
		s += '<source src="http://www.twinkomplex.com/system/clips/87/theora/vi_null_Frank_DIA_IchWeissEsNicht_A-720p.HQ.ogv" type=\'video/ogg; codecs="theora, vorbis"\'></source>';
		s += '<source src="http://www.twinkomplex.com/system/clips/87/webm/vi_null_Frank_DIA_IchWeissEsNicht_A-720p.HQ.webm" type=\'video/webm; codecs="vp8, vorbis"\'></source>';

		s += '</video>';
		s += '</div>';
		s += '<script type=\'text/javascript\'>';

		s += '$(function() { $(\'video\').videoSub({useBarDefaultStyle: false}) })';

		s += '</script>';

		Video.play(s);

		// WIEDER ÖFFNEN
		/*
		 var s = "mega_machine.newbie_manager.additional_artifacts()";
		 window. setTimeout(s, 3000);

		 var s = "mega_machine.newbie_manager.audio_artifact()";
		 window. setTimeout(s, 10000);
		 */
	}

	this.additional_artifacts = function() {
		var s = '<div class = "Artifacts" id = "BananaRepublique" title = "if you click this polaroid, you will see a detailed view">';

		s += '<div class = "ArtifactsImage">';
		s += '<img src = "/images/new_interface/BananaRepubliqueSmall.jpg"/>';
		s += '</div>';

		s += '<div class = "name">';
		s += "Banana Republic";
		s += '</div>';
		s += '</div>';

		$("#ArtifactLayer").append(s);

		$("#BananaRepublique").css({

			left : 100,
			top : 50,
		});

		$("#BananaRepublique").click(function() {

			if(mega_machine.newbie_manager.psycho_art == false) {
				var s = "mega_machine.newbie_manager.psychotest_artifact()";
				window.setTimeout(s, 1900);
			}

		});

		$("#BananaRepublique").draggable();

		////
		$("#BananaRepublique").click(function() {

			mega_machine.newbie_manager.banana_text();
		});

	}

	this.text_artifact = function() {
		jQuery.get('/NewInterface/nethernet_de.txt', function(data) {
			self.nethernet_manifesto = data;
		});

		var s = '<div class = "Artifacts" id = "NethernetManifesto" title = "you can click me, drag me, move me around">';

		s += '<div class = "ArtifactsImage">';
		s += '<img src = "/images/new_interface/network.jpg"/>';
		s += '</div>';

		s += '<div class = "name">';
		s += "Nethernet manifesto";
		s += '</div>';
		s += '</div>';

		$("#ArtifactLayer").append(s);

		$("#NethernetManifesto").draggable();

		$("#NethernetManifesto").css({
			left : 400,
			top : 180,
		});

		$("#NethernetManifesto").click(function() {

			mega_machine.cookie_manager.increment_attribute("nethernet", 1);
			mega_machine.newbie_manager.nethernet_text();

			var s = "mega_machine.newbie_manager.hacker_artifact()";
			window.setTimeout(s, 4500);

		});
	}

	this.audio_artifact = function() {
		var s = '<div class = "Artifacts" id = "BananaRepubliqueAudio" title = "you can click me, drag me, move me around">';

		s += '<div class = "ArtifactsImage">';
		s += '<img src = "/images/new_interface/mao.jpg"/>';
		s += '</div>';

		s += '<div class = "name">';
		s += "Banana Republic / Audio";
		s += '</div>';
		s += '</div>';

		$("#ArtifactLayer").append(s);

		$("#BananaRepubliqueAudio").css({

			left : 250,
			top : 90,
		});

		$("#BananaRepubliqueAudio").draggable();

		$("#BananaRepubliqueAudio").click(function() {

			$("#db_interaction").show();
			$("#db_switch").show();

			$("#os_interaction").show();
			$("#os_switch").show();

			mega_machine.newbie_manager.revolution_audio();

		});

	}
	/********************************************************************************************************/

	this.bar_dragged = false;

	this.draggable_action = function() {
		if(self.bar_dragged == false) {
			self.show_lower_mini();
			self.bar_dragged = true;

			// $("#lab_interaction").show();
			// mega_machine.newbie_manager.public_laboratory();

			mega_machine.cookie_manager.modify("gamestate", 4);
			//                                         WWWL
		}
	}

	this.check_draggable = function() {
		if(self.bar_dragged == false)
			mega_machine.statusbar.show("drag this bar");

		return self.bar_dragged;
	}

	this.show_draggable = function() {

		return false;
	}

	this.registered = function() {

		$("#ArtifactsLayer").hide();
		return true;
	}

	this.countdown = function(no) {
		$("#Countdown").show();
		$("#Countdown").html(no);
		$("#Countdown").fadeOut(1200);
	}

	this.newbie_click = function() {
		self.click_counter += 1;

		switch(self.click_counter) {
			case 1:
				$("#embedded_tree").show();
				self.countdown(4);
				break;

			case 2:
				self.countdown(3);

				// c = self.new_cog();
				// var n = "#svg_" + c.id + " path";

				// $(n).css("fill", "red");

				break;

			case 3:
				self.countdown(2);
				$("#NeulandDouble").fadeOut();

				$("#Neuland").css("backgroundColor", "black");
				$("#tools").css("backgroundColor", "black");
				break;

			case 4:
				mega_machine.system_tracker.slide_toggle();
				self.countdown(1);
				break;

			case 5:
				$("#ArtifactsLayer").css("zIndex", 2);

				this.beginning = false;
				$("#LowerPage").html("");

				// mega_machine.statusbar.show("welcome at DiA");

				$("#LowerPage").animate({
					"backgroundColor" : "rgb(192,192,192)",
				}, 800);

				var s = 'mega_machine.newbie_manager.show_first_group()';
				// JJJ
				window.setTimeout(s, 3000);

				mega_machine.cookie_manager.modify("gamestate", 1);

				self.countdown(1);
				break;

		}
	}

	this.first_group_counter = 0;
	this.map_clicked = false;
	this.web_clicked = false;
	this.shop_clicked = false;
	this.news_clicked = false;

	this.first_group_interaction_dialogue = function(type) {
		switch(type) {
			case 0:
				// map
				$("#text_field").val("enter your location");
				break;

			case 1:
				// web
				$("#text_field").val("enter your website");
				break;

		}
	}

	this.create_newbie_process = function() {

		$("#NarrativeContext").css("zIndex", 3);
		$("#NarrativeContext").css("backgroundColor", "rgba(0,0,0,0)");
		mega_machine.public.knot_manager.newbie_process();

	}

	this.first_group_interaction = function(type) {
		self.first_group_counter += 1;

		if(self.first_group_counter == 3) {
			var s = "mega_machine.newbie_manager.create_newbie_process()";
			window.setTimeout(s, 2000);
		}

		switch(type) {
			case "map":
				if(self.map_clicked == false) {
					self.map_clicked = true;

					var s = "mega_machine.newbie_manager.first_group_interaction_dialogue(0)";
					window.setTimeout(s, 2000);
				}
				break;

			case "web":
				if(self.web_clicked == false) {
					self.web_clicked = true;

					var s = "mega_machine.newbie_manager.first_group_interaction_dialogue(1)";
					window.setTimeout(s, 2000);
				}
				break;
		}
	}

	this.show_first_group = function() {
		$("#news_interaction").fadeIn();

		$("#map_interaction").fadeIn();

		$("#web_interaction").fadeIn();
		$("#shop_interaction").fadeIn();

		$("#lab_interaction").fadeIn();

	}

	this.show_element = function(type) {
		switch(type) {
			case 1:
				// NEWS

				$("#news_interaction").show();
				$("#news_interaction").css({
					boxShadow : 'inset 1px 3px 6px red'
				})

				self.admin.public.knot_manager.newbie_process();
				break;
		}
	}

	this.paint_players = function() {
		mega_machine.resize_context("narrative_context");
		self.stop_clockwork(100);

		mega_machine.narrative_context.random_players = self.avatar_images;

		var s = '';

		for(var i = 0; i < self.avatar_images.length; i++) {
			n = "player_serial_" + i;

			s += '<div id = "' + n + '" class = "player_avatar_serial">';
			s += '<img src = "' + self.avatar_images[i].avatar_url + '"/>';
			s += '</div>';
		}

		mega_machine.resize_context("up");

		nh = $("#NarrativeContainer").height();
		$("#NarrativeContainer").css("width", nh);

		$("#NarrativeContainer").html(s);

		// Die Interaktion ////////////////////////////////////

		for(var i = 0; i < self.avatar_images.length; i++) {
			n = "#player_serial_" + i;
			$(n).click(function() {
				mega_machine.newbie_manager.image_choice();
			});

		}

		/////////////////////////////////////////////

		$("#NarrativeRaphael").css({
			width : nh,
			height : nh,
			top : $("#NarrativeContainer").position().top,
			left : $("#NarrativeContainer").position().left,
		})

		iw = nh / 10;

		$(".player_avatar_serial").css({
			width : iw,
			height : iw,
		});

	}

	this.image_choice_counter = 0;

	this.image_choice = function() {
		var bg = mega_machine.narrative_context.crypto_information();

		var name = "#icg_" + self.image_choice_counter;

		$(name).html(bg);
		self.image_choice_counter++;

		if(self.image_choice_counter == 4) {
			mega_machine.statusbar.show("identification code delivered");
			mega_machine.cookie_manager.modify("ident", true);

			mega_machine.newbie_manager.open_laboratory();

			// window.clearInterval( mega_machine.narrative_context.team_formation_pid);

		}

	}

	this.image_choice_grid = function() {
		var s = '<div id = "image_choice_grid">';

		for(var i = 0; i < 4; i++) {
			var name = "icg_" + i;
			s += '<div id = "' + name + '" class = "image_choice_element">';
			s += i;
			s += '</div>';
		}

		s += '</div>';

		$("#NarrativeContext").append(s);

	}

	this.identification_process = function() {
		mega_machine.cookie_manager.modify("ident", true);

		mega_machine.narrative_context.logo.stop_process();
		mega_machine.newbie_manager.paint_players();
		mega_machine.narrative_context.start_team_formation();

		$("#NarrativeContext").css("background", "black");

		var explanation = mega_machine.public.messages.get("team_explain");

		var s = '<div id = "team_explanation">';
		s += explanation;
		s += '</div>';
		$("#NarrativeContext").append(s);

		// DER TREE

		$("#embedded_tree").hide();

		var s = '<div id = "identification_tree"></div>';
		$("#NarrativeContext").append(s);

		// mega_machine.public.knot_manager.ident.paint_tree("identification_tree");
	}

	this.identification_images = function(caller) {
		mega_machine.target_page("up", "narrative", true);
		$("#NarrativeContext").show();

		self.image_choice_grid();

		var url = "/engine/identification_images";
		$.ajax({
			type : "GET",
			url : url

		}).done(function(msg) {

			mega_machine.newbie_manager.avatar_images = msg;
			mega_machine.statusbar.show("identification process started - click the agents you would rely on");
			if(caller)
				caller.callback(true);

			var s = "mega_machine.newbie_manager.identification_process()";
			window.setTimeout(s, 1500);

			/*
			 mega_machine.newbie_manager.paint_players();
			 mega_machine.narrative_context.start_team_formation();

			 $("#embedded_tree").fadeOut(5000);

			 var s = '<div id = "identification_tree"></div>';
			 $("#NarrativeContext").append(s);

			 mega_machine.public.knot_manager.ident.paint_tree("identification_tree");
			 */
		});
	}

	this.cookie_check = function(caller) {
		console.log("NB - COOKIE CHECK");
		if(caller)
			caller.callback(self.cookie);
	}

	this.spinner_rotation = function() {
		$('#SpinnerLogo').tween({
			rotate : {
				start : 0,
				stop : 360,
				time : 0,
				duration : 3,
				effect : 'linear',

				onFrame : function(element, state) {
					// Do something funky here
				}
			},
			onStop : function(element) {

				// if ($("#SpinnerLogo").css("display") == "block" ) mega_machine.newbie_manager.spinner_rotation();

			}
		});

		$.play();
	}

	this.gray_ct = 0;
	this.white_ct = 30;
	this.black_ct = 0;

	this.rotate_gray_spinner = function() {
		self.gray_ct += 3;
		;
		$("#SpinnerGray").rotate(self.gray_ct);

		self.white_ct += 6;
		$('#SpinnerLogoSlow').rotate(self.white_ct);

		self.black_ct -= 10;
		$('#SpinnerLogo').rotate(self.black_ct);

	}

	this.spinner_fast_rotation = function() {
		$('#SpinnerLogoSlow').tween({
			rotate : {
				start : 0,
				stop : -360,
				time : 0,
				duration : 1,
				effect : 'linear',

				onFrame : function(element, state) {
					// Do something funky here
				}
			},
			onStop : function(element) {

				if($("#SpinnerLogoSlow").css("display") == "block") {
					mega_machine.newbie_manager.rotate_gray_spinner();
					mega_machine.newbie_manager.spinner_fast_rotation();
				}

			}
		});

		$.play();
	}

	this.clockwork_pid = 0;

	this.titling_ct = 0;
	this.title = "TWINKOMPLEX";

	this.titling = function() {
		self.titling_ct++;
		var t = self.title.slice(0, self.titling_ct);
		$("#GameTitle .text").html(t);
	}

	this.cogs = new Array();

	this.new_cog = function() {
		w = window.innerWidth * 1.5;
		x = Math.random() * w;

		plus = parseInt(Math.random() * 2);
		if(plus == 0)
			x *= -1;

		h = window.innerHeight * 1.5;
		y = Math.random() * h;
		y -= window.innerHeight / 2;

		plus = parseInt(Math.random() * 2);
		if(plus == 0)
			y *= -1;

		var max = 1400;
		size = parseInt(Math.random() * max);

		var id = self.cogs.length;
		var name = "Cog_" + id;

		var svg_name = "svg_" + id;
		var target_name = "tg_" + id;

		var svg = '<svg id = "' + svg_name + '" version="1.1" id="Standard" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="200px" height="200px" viewBox="0 0 200 200" enable-background="new 0 0 200 200" xml:space="preserve"><path d="M169.945,200c11.962-8.367,21.688-18.093,30.055-30.055c-8.927-8.927-17.87-17.855-26.797-26.781 c7.706-13.094,11.777-27.989,11.777-43.164c-14.164,0-28.328,0-42.492,0c0,23.459-19.028,42.49-42.488,42.49 c0,14.164,0,28.327,0,42.49c15.174,0,30.086-4.071,43.164-11.777C152.09,182.129,161.02,191.073,169.945,200 c0.001,0,0.002-0.001,0.003-0.002"/></svg>';

		var s = '<div class = "Spinner" id = "' + name + '">' + svg;

		s += '<div class = "target">';

		tg = '<svg id = "' + target_name + '" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="32px" height="32px" viewBox="0 0 32 32" enable-background="new 0 0 32 32" xml:space="preserve"><line stroke="red" stroke-width="0.75" x1="0" y1="16" x2="32" y2="16"/><line stroke="red" stroke-width="0.75" x1="16" y1="0" x2="16" y2="32"/></svg>';

		s += tg;

		s += '</div>';

		s += '</div>';

		// s = '<div class = "Spinner" id = "' + name + '"><img src = "/images/new_interface/logo_weiss.svg"/></div>';

		$("#ArtifactsLayer").append(s);

		n = $("#" + name);
		var x = new Neuland.Cog(n, id);

		self.cogs.push(x);
		n.rotate(x.angle);

		n.css({
			left : x,
			top : y,
			width : size,
			height : size,
		});

		// console.log("SIZE " + size + " x " + x + " y " + y);
		return x;
	}

	this.clockwork_array = function() {
		for(var i = 0; i < self.cogs.length; i++) {

			var c = self.cogs[i];

			c.counter += c.angle;
			$(c.div).rotate(c.counter);
		}
	}

	this.beginning = true;

	this.clockwork = function() {
		if($("#SpinnerLogo").css("display") == "block") {
			if(this.beginning == true) {
				self.rotate_gray_spinner();
				self.titling();
			}

			if(self.cogs.length < 15)
				self.new_cog();

			self.clockwork_array();

		}

		/////////////////// Hier Anpassung des Gamestates

	}

	this.newbie_process = function(caller) {

		/*
		 var s = '<div id = "NeulandDouble">';

		 s += '<div id = "SpinnerLogo"><img src = "/images/new_interface/logo_black.svg"/></div>';
		 s += '<div id = "SpinnerLogoSlow"><img src = "/images/new_interface/logo_weiss.svg"></div>';

		 // <embed src = "/images/new_interface/zahnwerk_4.svg"  type = "image/svg+xml"/>:

		 s += '</div>';

		 // JJJ - LÖSCHEN

		 s += '<div id = "GameTitle">';
		 s += '<div class = "text"></div>';
		 s += '<div class = "logo"><img src = "/images/new_interface/logo_weiss.svg"></div>';
		 s += '<div id = "Countdown"></div>';
		 s += '</div>';

		 $("body").append(s);
		 */

		$("#NeulandDouble").click(function() {
			$(this).fadeOut();
		});

		/*        CLOCKWORK
		s = '<div id = "SpinnerGray"><img src = "/images/new_interface/logo_black.svg"/></div>';

		$("#NarrativeContext").append(s);

		$('#SpinnerLogoSlow').rotate(self.white_ct);

		var s = "mega_machine.newbie_manager.clockwork()";
		self.clockwork_pid = window.setInterval(s, 750);

		*/

		// self.spinner_rotation();
		// self.spinner_fast_rotation();

		$("#ArtifactsLayer").click(function() {

			mega_machine.newbie_manager.newbie_click();
		});

		if(self.admin.cookie_manager.cookie_obj) {
			var state = self.admin.cookie_manager.cookie_obj.game_state;

			if(mega_machine.public.status == "public")
				self.setGamestate(state);
			else
				self.setGamestate(100);

		}

		return true;
	}

	this.start_hacker_tree = function() {
		self.admin.public.decision_tree_manager.hacker_tree();

		self.admin.change_active_page();
		self.admin.narrative_context.init_context();
	}

	this.count_system_commands = function() {
		self.os_counter++;

		alert(self.os_counter);
	}

	this.start_decision_tree = function() {
		alert("sollte den Entscheiodungsbaum für den Newbie starten ");
	}

	this.database_check = function(caller) {
		return self.clicked_database;
	}

	this.click_check = function(caller) {
		console.log("NB - CLICK CHECK");
		if(caller)
			caller.callback(self.cookie);
	}

	this.message = function(msg) {

	}

	this.first_time = function(type) {

		switch(type) {
			case "db":
				if(self.clicked_database == false) {
					self.clicked_database = true;
				}
				break;

			case "os":
				if(self.clicked_os == false) {
					self.clicked_os = true;
				}
				break;

			case "map":
				alert("die Karte");
				break;

		}
	}

	this.check_cookie = function() {
		// document.cookie = '=; expires=Thu, 01-Jan-70 00:00:01 GMT;';

		mega_machine.public.interface_info.show();

		window.document.cookie = "twinkomplex.newbie";
		var s = document.cookie;

		return false;
	}

	this.log_in = function() {
		self.lower_mini_clicked();

		// $('#PersonalButton').rotate(-90);

		var degree = -90;

		$('#PersonalButton').tween({
			rotate : {
				start : 0,
				stop : 135,
				time : 0,
				duration : 0.6,
				effect : 'linear',

				onFrame : function(element, state) {
					// Do something funky here
				}
			},
			onStop : function(element) {

				mega_machine.login();

			}
		});

		$.play();

		/*

		$('#PersonalButton').animate
		({
		'-webkit-transform': 'rotate(' + degree + 'deg)',
		'-moz-transform': 'rotate(' + -90 + 'deg)',
		'-ms-transform': 'rotate(' + degree + 'deg)',
		'-o-transform': 'rotate(' + degree + 'deg)',
		'transform': 'rotate(' + degree + 'deg)',
		}, 2000);
		*/

		// mega_machine.login();
	}

	this.show_lower_mini = function() {
		$("#LowerMini").show();
		$("#UpperMini").show();

		$("#VectorGrafixOverlay").html("");

		self.admin.cookie_manager.modify("gamestate", 2);
		return true;
	}

	this.check_lower_mini = function() {

	}

	this.check_fullscreen = function(caller) {
		if(mega_machine.cookie_manager && mega_machine.public.status == "public") {
			// if (mega_machine.cookie_manager.cookie_obj.ident == 0)	mega_machine.public.knot_manager.identification_process();

		}
	}

	this.stop_clockwork = function(no) {
		if(mega_machine.newbie_manager.clockwork_pid) {
			window.clearInterval(mega_machine.newbie_manager.clockwork_pid);
			$("#ArtifactsLayer").hide();

			$("#SpinnerGray").fadeOut();
			$("#GameTitle .text").fadeOut();

			if(no == 0)
				mega_machine.target_page("up", "map", false);

			if(no == 1) {
				mega_machine.target_page("up", "news", false);
				mega_machine.system_context.select_news("intelligence");
			}

			if(no == 2) {
				mega_machine.target_page("up", "shop", false);
			}

			if(no == 3) {
				mega_machine.psychotest_question();
			}

			if(no == 4) {
				mega_machine.target_page("up", "map", true);

				mega_machine.map_context.set_active_map("satellite");

				mega_machine.map_context.map.set_type("SATELLITE");

				mega_machine.map_context.map.setZoom(12);
				mega_machine.map_context.map.search("Khovd");

			}

		}

	}

	this.upper_mini_click_no = 0;

	this.upper_mini_clicked = function() {

		self.upper_mini_click_no += 1;

		if(self.upper_mini_click_no == 1) {
			mega_machine.narrative_context.logo.stop_process();
			// mega_machine.statusbar.show("you have changed the active window");

			window.clearInterval(mega_machine.newbie_manager.clockwork_pid);
			$("#ArtifactsLayer").hide();

			$("#SpinnerGray").fadeOut();

			mega_machine.newbie_manager.stop_clockwork(100);
			mega_machine.target_page("up", "system", false);

		}

	}

	this.lower_mini_click_no = 0;
	this.fullscreen_understood = false;

	this.lower_mini_clicked = function() {
		self.lower_mini_click_no += 1;

		if(self.lower_mini_click_no == 1) {
			window.clearInterval(mega_machine.newbie_manager.clockwork_pid);
			$("#ArtifactsLayer").hide();

			$("#SpinnerGray").fadeOut();
			$("#GameTitle .text").fadeOut();
		}

		if(self.lower_mini_click_no == 2) {
			// $("#UpperMini").show();
			// self.fullscreen_understood = true;
		}
	}

	this.hide_interface_elements = function() {
		var s = '<div id = "language_choice"><img src = "/images/new_interface/language_white.svg"/></div>';

		$("#Agenten").hide();

		$("#social_interaction").hide();
		$("#team_switch").hide();

		$("#mail_interaction").hide();
		$("#mail_switch").hide();

		$("#db_interaction").hide();
		$("#db_switch").hide();

		$("#os_interaction").hide();
		$("#os_switch").hide();

		$("#bot_interaction").hide();
		$("#bot_switch").hide();

		$("#lab_interaction").hide();
		$("#shop_interaction").hide();
		$("#web_interaction").hide();
		$("#news_interaction").hide();
		$("#map_interaction").hide();

		$("#UpperMini").hide();
		$("#LowerMini").hide();

	}

	this.start = function() {
		self.newbie = true;

		self.hide_interface_elements();

		// alert("START des Newbie Managers ");

	}

	this.init = function() {
		self.newbie_informer = new Neuland.NewbieInformation(self);
	}

	this.init();
}
VectorPainter = function(div_to_append_svg, id, click_class, text, view_box, fill, stroke_width, color, duration_begin, duration, path_length, path) {

	console.log("PAINTER WIRD ERZEUGT");

	var obj = this;

	this.div_to_append_svg = div_to_append_svg;
	this.id = id;
	this.click_class = click_class;
	this.text = text;
	this.view_box = view_box;
	this.fill = fill;
	this.stroke_width = stroke_width;
	this.color = color;
	this.duration_begin = duration_begin;
	this.duration = duration;
	this.path = path;
	this.path_length = path_length;

	this.init = function() {
		console.log("INIT");
		obj.svg_path_code();
	}

	this.svg_path_code = function() {
		var s = '<div class ="svg_div" id =' + id + '>';
		s += '<p class = "inside_text">' + text + '</p>';
		s += '<svg width="100%" height="100%" viewBox="' + view_box + '" fill="' + fill + '" stroke="' + color + '" stroke-width="' + stroke_width + '" >';
		s += '<path stroke="' + color + '"';
		s += 'd="' + path + '"';
		s += 'stroke-dasharray="' + path_length + '" stroke-dashoffset="' + path_length + '" visibility="hidden"';
		s += '>';
		s += '<set attributeName="visibility" attributeType="CSS" to="visible" begin="' + duration_begin + '" dur="' + duration + '" fill="freeze"></set>';
		s += '<animate attributeName="stroke-dashoffset" from="' + path_length + '" to="0" begin="' + duration_begin + '" dur="' + duration + '" fill="freeze" keySplines="0.4 0 0.7 1" calcMode="spline"></animate>';
		s += '</path>';
		s += '</svg>';
		s += '</div>';

		$(div_to_append_svg).append(s);

	}

	obj.init();
}

Neuland.PainterInteraction = function() {

	console.log("Painter Interaction START");

	var obj = this;
	var svg_drawing = new Array();

	this.drawings = new Array();

	/////spiral effect///////////
	svg_drawing[0] = 'new VectorPainter("#NarrativeContext","svg_0","click_0","", "0 0 1440 900", "rgba(255,255,255,0)", "1","black","0s", "10s", "137733", "m 719.817,444.291 13.358,-850.23 m 13.351,0.313 -26.709,849.917 m 40.057,-849.39 -40.057,849.388 m 0,0.002 53.389,-848.655 m 13.326,0.943 -66.715,847.712 m 80.026,-846.559 -80.025,846.56 m 93.311,-845.198 -93.313,845.197 m -10e-4,0 106.576,-843.63 M 719.815,444.291 839.63,-397.556 m 13.206,1.982 -133.019,839.865 m -0.002,0 146.198,-837.675 M 719.815,444.291 879.151,-390.982 M 719.815,444.291 892.255,-388.375 M 719.815,444.291 905.31,-385.563 m 13.015,3.014 -198.51,826.84 m 211.474,-823.62 -211.474,823.62 m 224.38,-820.198 -224.38,820.198 M 957.052,-372.28 719.815,444.291 m 0,0 250.032,-812.747 M 719.815,444.291 982.584,-364.426 M 719.815,444.291 995.254,-360.198 m 12.604,4.426 -288.041,800.063 m 0,0 300.571,-795.438 m 12.462,4.819 -313.032,790.62 m 325.406,-785.607 -325.407,785.606 m 337.706,-780.396 -337.706,780.396 m 0,0 349.923,-774.999 m 12.133,5.593 -362.056,769.403 m 0,0.003 374.095,-763.624 m 11.944,5.969 -386.039,757.655 m 397.896,-751.493 -397.896,751.493 m 0,0 409.651,-745.153 m 11.655,6.528 -421.306,738.625 m 432.857,-731.918 -432.857,731.918 m 444.299,-725.03 -444.299,725.03 m 0,0 455.632,-717.957 m 11.222,7.239 -466.854,710.718 m 0,0 477.956,-703.297 m 10.993,7.595 -488.949,695.702 m 0,0 499.813,-687.933 m -499.813,687.933 510.557,-679.998 m 10.616,8.104 -521.173,671.894 M 1251.48,-219.334 719.817,444.291 m 0,0 542.021,-655.192 m -542.021,655.192 552.244,-646.599 m 10.091,8.755 -562.335,637.844 m 0,0 572.285,-628.935 m -572.285,628.935 582.091,-619.866 m -582.091,619.866 591.756,-610.646 m 9.52,9.366 -601.275,601.28 m -10e-4,0 610.647,-591.759 m 9.223,9.664 -619.87,582.095 m 0,0 628.935,-572.287 m 8.908,9.948 -637.843,562.339 M 1366.414,-107.96 719.817,444.291 m 0,0 655.191,-542.023 m 8.435,10.357 -663.626,531.666 M 1391.71,-76.886 719.817,444.291 m 0,0 679.996,-510.56 m 7.936,10.747 -687.932,499.813 m 695.701,-488.948 -695.7,488.949 m -10e-4,-10e-4 703.289,-477.961 m 7.429,11.108 -710.718,466.853 M 1437.774,-11.341 719.817,444.291 m 725.031,-444.3 -725.03,444.3 m -10e-4,0 731.918,-432.854 M 719.817,444.291 1458.444,22.986 M 719.817,444.291 1464.967,34.639 M 719.817,444.291 1471.31,46.394 m 6.163,11.85 -757.656,386.047 M 1483.438,70.194 719.817,444.288 m 0,0.003 769.399,-362.056 m 5.596,12.131 -774.995,349.925 m 0,0 780.395,-337.713 m 5.208,12.307 -785.603,325.406 m 790.62,-313.032 -790.62,313.032 m 0,0 795.438,-300.574 M 719.817,444.291 1519.879,156.253 m -800.062,288.038 804.488,-275.44 m 4.226,12.669 -808.714,262.771 M 1532.559,194.258 719.817,444.291 m 0,0 816.568,-237.237 M 719.817,444.291 1540.01,219.91 m 3.423,12.91 -823.616,211.471 m 0,0 826.84,-198.508 M 719.817,444.291 1549.671,258.795 M 719.817,444.291 1552.483,271.852 M 719.817,444.291 1555.09,284.957 M 719.817,444.291 1557.488,298.093 M 719.817,444.291 1559.682,311.268 M 719.817,444.291 1561.665,324.478 m 1.779,13.236 -843.627,106.577 m 0,0 845.196,-93.313 m -845.196,93.313 846.56,-80.025 m -846.56,80.025 847.712,-66.715 m -847.712,66.715 848.653,-53.394 m -848.653,53.394 849.386,-40.055 m 0.526,13.342 -849.912,26.713 m 0,0 850.23,-13.36 m 0.104,13.36 H 719.817 m 0,0 850.23,13.355 M 719.817,444.291 1569.727,471 m -0.521,13.346 -849.389,-40.055 m 848.656,53.389 -848.655,-53.392 m -0.003,0.003 847.714,66.712 m -1.152,13.314 -846.562,-80.025 m 845.197,93.306 -845.196,-93.31 M 1563.444,550.865 719.815,444.288 M 1561.667,564.101 719.817,444.288 M 1559.683,577.31 719.817,444.291 m 0,0 837.671,146.198 M 719.817,444.291 1555.09,603.628 m -2.605,13.098 -832.668,-172.435 m 0,0 829.852,185.495 m -3.012,13.011 -826.84,-198.506 M 1543.433,655.763 719.817,444.291 m 820.196,224.38 -820.195,-224.38 M 1536.386,681.526 719.817,444.291 m 0,0 812.741,250.033 m -4.027,12.731 -808.714,-262.764 m 0,0 804.488,275.435 m -4.426,12.603 -800.062,-288.038 m 0,0 795.438,300.569 M 719.817,444.291 1510.436,757.316 m -5.016,12.382 -785.603,-325.407 m 0,0 780.395,337.705 M 719.817,444.291 1494.809,794.216 M 719.817,444.291 1489.216,806.34 M 719.817,444.291 1483.438,818.386 M 719.817,444.291 1477.472,830.333 M 719.817,444.291 1471.31,842.187 m -751.493,-397.896 745.15,409.646 m -6.523,11.657 -738.627,-421.303 m 0,0 731.918,432.852 m -6.887,11.445 -725.03,-444.297 m -10e-4,0 717.957,455.629 M 719.817,444.291 1430.535,911.142 m -7.427,11.105 -703.291,-477.956 m 695.701,488.949 -695.7,-488.948 m -10e-4,-10e-4 687.93,499.813 M 719.817,444.291 1399.813,954.848 M 719.817,444.291 1391.712,965.463 M 719.817,444.291 1383.443,975.955 M 719.817,444.291 1375.008,986.312 M 719.817,444.291 1366.416,996.534 m -8.754,10.089 -637.845,-562.332 m 628.935,572.282 -628.935,-572.282 m 0,0 619.866,582.091 m -9.218,9.665 -610.648,-591.756 m 0,0 601.272,601.272 m -601.272,-601.272 591.759,610.645 m -9.668,9.221 -582.091,-619.866 m 0,0 572.285,628.934 m -9.95,8.908 -562.333,-637.845 m -0.002,0.003 552.246,646.597 M 719.817,444.291 1261.84,1099.48 m -10.358,8.436 -531.665,-663.625 m 521.175,671.892 -521.175,-671.892 m 510.559,679.998 -510.559,-679.998 m 0,0 499.813,687.932 m -10.861,7.766 L 719.817,444.291 M 1197.776,1147.58 719.819,444.288 m 466.852,710.716 -466.854,-710.713 m 0,0 455.632,717.957 m -455.632,-717.957 444.299,725.025 m -444.299,-725.025 432.854,731.915 m -11.548,6.71 -421.306,-738.625 m 0,0 409.651,745.152 m -11.753,6.338 -397.897,-751.49 m 386.038,757.65 -386.039,-757.65 M 1093.912,1207.91 719.817,444.291 m 362.056,769.402 -362.054,-769.402 m -0.002,0 349.923,774.994 m -349.923,-774.994 337.706,780.395 m -337.706,-780.395 325.406,785.605 m -12.373,5.014 -313.033,-790.619 m 0,0 300.571,795.438 M 719.817,444.291 1007.855,1244.353 M 719.817,444.291 995.256,1248.782 M 719.817,444.291 982.584,1253.003 M 719.817,444.291 969.85,1257.032 M 719.817,444.291 957.051,1260.856 m -12.856,3.629 -224.378,-820.194 m 0,0 211.472,823.615 M 719.817,444.291 918.325,1271.128 M 719.817,444.291 905.31,1274.145 m -13.051,2.807 -172.44,-832.661 M 879.151,1279.562 719.817,444.291 M 866.016,1281.962 719.817,444.291 m 0,0 133.016,839.862 m -13.203,1.988 -119.813,-841.85 m 106.575,843.627 -106.574,-843.63 m 93.313,845.198 -93.313,-845.194 m -10e-4,-10e-4 80.023,846.56 m -80.023,-846.56 66.713,847.707 m -66.713,-847.707 53.391,848.655 m -53.391,-848.655 40.055,849.391 m -40.055,-849.391 26.707,849.911 m -13.346,0.317 -13.36,-850.23 m -10e-4,850.333 V 444.291 m -13.358,850.228 13.358,-850.23 M 693.104,1294.2 719.818,444.288 M 679.76,1293.68 719.817,444.288 m 0,0.003 -53.396,848.655 M 653.1,1292 719.818,444.291 m -10e-4,0 -80.025,846.56 m -13.285,-1.365 93.313,-845.194 m -0.003,-10e-4 -106.577,843.629 m 106.577,-843.629 -119.815,841.85 m 119.815,-841.85 -133.023,839.862 m -13.172,-2.191 146.197,-837.671 m -0.002,0 -159.337,835.271 m -13.099,-2.61 172.438,-832.661 m -0.002,0 -185.496,829.854 m -13.01,-3.017 198.506,-826.837 M 508.349,1267.904 719.818,444.289 M 495.439,1264.485 719.817,444.292 m 0,-10e-4 -237.235,816.565 M 469.787,1257.032 719.82,444.291 M 457.048,1253.005 719.817,444.291 m 0,0 -275.437,804.487 m -12.603,-4.428 288.04,-800.062 m 0,0.003 -300.574,795.438 m -12.455,-4.819 313.03,-790.619 m -10e-4,0 -325.408,785.605 M 719.817,444.291 382.109,1224.686 M 719.817,444.291 369.894,1219.285 m -12.13,-5.592 362.055,-769.401 M 345.723,1207.91 719.818,444.291 m -386.047,757.65 386.047,-757.649 m -10e-4,-10e-4 -397.895,751.49 M 719.817,444.291 310.166,1189.44 M 719.817,444.291 298.512,1182.916 M 719.817,444.291 286.961,1176.206 M 719.817,444.291 275.52,1169.317 m -11.332,-7.067 455.629,-717.959 m 0,0 -466.851,710.713 m -11.105,-7.424 477.957,-703.292 m -10e-4,0.003 -488.946,695.697 M 719.817,444.291 220.002,1132.223 M 719.817,444.291 209.26,1124.289 M 719.817,444.291 198.642,1116.183 m -10.488,-8.264 531.665,-663.628 M 177.793,1099.483 719.819,444.289 m -0.002,0.002 -552.249,646.597 m -10.09,-8.755 562.339,-637.845 m 0,0.003 -572.287,628.934 m -9.806,-9.068 582.093,-619.866 m 0,0 -591.758,610.646 M 719.817,444.291 118.537,1045.566 M 719.817,444.291 109.171,1036.047 M 719.817,444.291 99.948,1026.382 m -9.065,-9.809 628.934,-572.282 m 0,0 -637.844,562.332 M 73.218,996.534 719.817,444.291 m 0,0 L 64.625,986.312 M 719.817,444.291 56.192,975.955 M 719.817,444.291 47.925,965.463 M 719.817,444.291 39.819,954.848 M 719.817,444.291 31.88,944.104 M 24.12,933.24 719.818,444.292 M 16.523,922.247 719.819,444.291 M 9.1,911.142 719.817,444.291 M 1.858,899.92 719.817,444.291 M -5.213,888.588 719.819,444.288 M -12.098,877.143 719.819,444.291 m -0.002,0 -738.627,421.305 m -6.523,-11.658 745.152,-409.646 m -0.002,-10e-4 -751.493,397.896 M 719.817,444.291 -37.837,830.333 m -5.972,-11.947 763.626,-374.095 m 0,0 -769.406,362.051 M -55.18,794.216 719.817,444.291 M -60.579,781.996 719.819,444.291 M -65.786,769.699 719.819,444.291 m -0.002,0 -790.62,313.025 m -4.818,-12.455 795.44,-300.569 M -80.246,732.331 719.817,444.291 m 0,0 -804.488,275.433 M -88.896,707.055 719.818,444.291 M -92.926,694.322 719.82,444.289 m -0.003,0.002 -816.57,237.235 m 816.57,-237.235 -820.194,224.38 m 820.194,-224.38 -823.623,211.472 m -3.216,-12.966 826.839,-198.506 M -110.038,629.786 719.817,444.291 M -112.85,616.726 719.817,444.291 M -115.456,603.628 719.817,444.291 m -837.668,146.196 837.67,-146.198 m -0.002,0.002 -839.866,133.019 m -1.983,-13.206 841.85,-119.815 m -10e-4,0.002 -843.629,106.576 M 719.817,444.291 -125.38,537.6 m 845.197,-93.309 -846.561,80.025 m -1.151,-13.31 847.712,-66.715 m 0,0 -848.655,53.391 m -0.733,-13.336 849.388,-40.055 m 0,0 L -130.1,471 m -0.312,-13.355 850.231,-13.356 m -0.002,0.002 h -850.333 m 850.333,0 -850.231,-13.36 M 719.817,444.291 -130.1,417.58 m 849.917,26.711 -849.388,-40.055 m 849.388,40.055 -848.655,-53.394 m 0.943,-13.321 847.712,66.715 m 0,0 -846.561,-80.023 m 846.561,80.023 -845.198,-93.313 m 845.198,93.313 -843.629,-106.578 m 843.629,106.578 -841.85,-119.813 m 841.85,119.813 -839.866,-133.023 m 2.198,-13.174 837.67,146.198 m -0.002,-10e-4 -835.273,-159.334 m 2.606,-13.105 832.667,172.439 M -110.038,258.793 719.817,444.288 m 0,0.003 -826.839,-198.508 M 719.817,444.291 -103.805,232.82 m 3.428,-12.907 820.194,224.378 M -96.753,207.057 719.818,444.291 M -92.926,194.258 719.82,444.291 M -88.896,181.52 719.818,444.289 m -10e-4,0.002 -804.489,-275.44 M 719.817,444.291 -80.246,156.253 M 719.817,444.291 -75.621,143.715 M 719.817,444.291 -70.803,131.259 M 719.817,444.291 -65.788,118.885 M 719.817,444.291 -60.579,106.578 m 5.399,-12.21 774.997,349.923 m 0,0 L -49.589,82.236 m 5.78,-12.039 763.626,374.092 M -37.837,58.244 719.818,444.291 M -31.676,46.394 719.819,444.291 m -0.002,0 L -25.333,34.637 M 719.817,444.291 -18.81,22.987 M 719.817,444.291 -12.103,11.437 m 6.89,-11.443 725.032,444.297 M 1.858,-11.341 719.817,444.288 M 9.1,-22.562 719.817,444.289 M 16.523,-33.673 719.819,444.288 m -0.002,0.003 L 24.12,-44.655 M 719.817,444.291 31.88,-55.522 m 7.939,-10.744 679.998,510.557 M 47.925,-76.886 719.817,444.292 m 0,-10e-4 L 56.192,-87.372 M 719.817,444.291 64.625,-97.732 m 8.593,-10.228 646.599,552.249 M 81.975,-118.048 719.819,444.288 M 90.883,-127.993 719.817,444.292 M 99.948,-137.804 719.817,444.292 m 0,-10e-4 -610.646,-591.761 m 9.367,-9.519 601.28,601.277 M 128.059,-166.355 719.817,444.291 M 137.722,-175.577 719.818,444.289 m -10e-4,0.002 -572.287,-628.934 m 9.95,-8.909 562.337,637.843 m 0,0 -552.249,-646.597 M 719.817,444.291 177.793,-210.901 m 10.361,-8.433 531.665,663.625 m -0.002,0 -521.174,-671.892 M 719.817,444.291 209.26,-235.707 M 719.817,444.291 220.002,-243.641 M 719.817,444.291 230.872,-251.411 M 719.817,444.291 241.861,-259.003 M 719.817,444.291 252.964,-266.427 M 719.817,444.291 264.188,-273.668 m 11.332,-7.071 444.299,725.03 m -0.002,0 -432.856,-731.918 M 719.817,444.291 298.513,-294.334 m 11.653,-6.526 409.653,745.151 M 321.922,-307.202 719.817,444.291 M 333.771,-313.364 719.818,444.291 M 345.723,-319.333 719.818,444.291 M 357.764,-325.115 719.817,444.289 m 0,0.002 -349.922,-774.997 m 12.212,-5.399 337.71,780.396 m 0,0 -325.408,-785.603 m 325.408,785.603 -313.032,-790.62 m 12.457,-4.818 300.576,795.438 M 431.777,-355.772 719.817,444.289 M 444.38,-360.198 719.818,444.291 m -10e-4,0 -262.769,-808.717 m 262.769,808.717 -250.03,-812.746 m 250.03,812.746 -237.234,-816.569 m 12.856,-3.629 224.378,820.198 m -211.471,-823.62 211.471,823.621 m -198.508,-826.841 198.508,826.84 m 0,0 -185.495,-829.852 M 719.817,444.291 547.378,-388.375 m 13.102,-2.607 159.337,835.273 m 0,0 -146.197,-837.673 m 13.176,-2.192 133.021,839.865 M 600.005,-397.556 719.818,444.292 M 613.243,-399.336 719.818,444.291 m -10e-4,0 -93.313,-845.197 m 13.291,-1.362 80.022,846.56 m 0,-10e-4 -66.717,-847.712 m 66.717,847.712 -53.396,-848.655 m 53.396,848.655 -40.06,-849.386 m 13.347,-0.528 26.714,849.914 m -13.359,-850.227 13.358,850.228 m 0,-850.335 v 850.334");'

	$(".box_0").css({
		'position' : 'absolute',
		'width' : '100%',
		'height' : '100%',
		'cursor' : 'url(/images/new_interface/plus_40.svg),pointer',
		'left' : '0%',
		'top' : '0%'
	});

	this.load_svg = function(id) {
		console.log("Einladen der Grafik aus der Datei ");

		var url = "/engine/vector_graphics/" + id;

		$.ajax({
			type : "GET",
			url : url

		}).done(function(msg) {

			// alert(msg.vector_graphic.style);

			s = new VectorPainter(msg.vector_graphic.data);
			eval(s.div_to_append_svg);

			testfall = s;

			// mega_machine.narrative_context.vector_grafix.drawings.push(s);
			// mega_machine.narrative_context.vector_grafix.process();
		});
	}

	this.process = function() {
		alert("Anzahl Grafiken " + obj.drawings.length);
		eval(obj.drawings[0]);
	}

	this.init = function() {

		// obj.array_click();
		// obj.load_svg(1);
	}

	this.array_click = function() {
		console.log("GLEICH DER EVAL ");
		eval(svg_drawing[0]);

		$("#svg_0").click(function() {

			// eval(svg_drawing[1]);

			$("#svg_0").unbind('click');

		});
	}

	obj.init();
}
function marc() {
	mega_machine.narrative_context.init_context();
	mega_machine.narrative_context.vector_grafix.load_svg(1);

}

/************************************************** ARTEFAKTE ***********************************************************************/

Neuland.Color = function(r, g, b, a) {
	this.r = r;
	this.g = g;
	this.b = b;
	this.a = a;
}

Neuland.Artifact = function(x, y, size, color, svg) {
	this.x = x;
	this.y = y;
	this.size = size;
	this.color = color;

	this.svg = svg;
}

Neuland.Artifacts = function() {
	var self = this;

	this.list = new Array();
	this.width = null;
	this.height = null;

	this.initial_layer = null;

	this.change_position = function() {
		for(var i = 0; i < self.list.length; i++) {
			a = self.list[i];

			x = parseInt(Math.random() * 3) - 1;
			y = parseInt(Math.random() * 3) - 1;

			a.x += x;
			a.y += y;

			a.svg.attr("x", a.x);
			a.svg.attr("y", a.y);
		}
	}

	this.loop = function() {
		// self.change_position();   // *** TEMPORARILY
	}

	this.random_color = function() {

	}

	this.standard_colors = function() {

	}

	this.random_artifacts = function(no) {
		for(var i = 0; i < no; i++) {
			var x = parseInt(Math.random() * self.width);
			var y = parseInt(Math.random() * self.height);

			col = new Neuland.Color(255, 0, 0, 1);
			size = 1;

			svg = self.paper.rect(x, y, size, size).attr({
				fill : "red",
				stroke : "none",
			});

			n = new Neuland.Artifact(x, y, size, col, svg);

			self.list.push(n);
		}

	}

	this.init = function() {
		var s = '<div id = "ArtifactsLayer"></div>';
		$("body").append(s);

		x = document.getElementById("ArtifactsLayer");
		var w = window.innerWidth;
		var h = window.innerHeight;

		self.width = w;
		self.height = h;

		self.paper = Raphael(x, w, h);
		// self.random_artifacts(20);

		/// sollte später woanders hin gesteckt werden

		var s = '<div id = "InitialLayer"></div>';
		$("body").append(s);

		x = document.getElementById("InitialLayer");
		var w = window.innerWidth;
		var h = window.innerHeight;

		self.width = w;
		self.height = h;

		self.initial_layer = Raphael(x, w, h);
		// self.random_artifacts(20);

		$("#InitialLayer").click(function(event) {
			mega_machine.public.quotes.set_quote();
			mega_machine.interface_master.artifact.seismographic(event);
			mega_machine.newbie_manager.explanation();
		});

	}

	this.big_number_ct = 0;
	this.hover_circle

	this.seismographic = function(event)//
	{
		var id = "bign_" + self.big_number_ct;
		var id2 = "bigimg_" + self.big_number_ct;

		var s = '<div id = "' + id + '" class = "big_number"><img id = "' + id2 + '" src = "/images/new_interface/plus_red.svg"/></div>';
		$("#InitialLayer").append(s);

		var name = "#" + id;
		$(name).css({

			opacity : 1,
			left : event.clientX - 16,
			top : event.clientY - 16,

		});

		$(name).mouseover(function() {

			if(self.hover_circle)
				self.hover_circle.remove();

			x = $(this).position().left + 16;
			y = $(this).position().top + 16;

			self.hover_circle = self.initial_layer.circle(x, y, 28).attr({
				stroke : "rgba(255,0,0, 1)",
				"stroke-width" : 5
			})

		});

		$(name).mouseout(function() {
			if(self.hover_circle)
				self.hover_circle.remove();
		});

		$(name).click(function() {

			$("#InitialLayer").hide();

			$(".MediaField").show();
			$("#SystemWidget").show();
			$(".legal_notes").show();

			if(mega_machine.cookie_manager.cookie_obj) {
				c = mega_machine.cookie_manager.cookie_obj;
				if(mega_machine.public.status == "public") {
					// if (c.game_state < 3) mega_machine.narrative_context.vector_grafix.load_svg(3);   // XANADU
					if(c.game_state < 3) {
						var s = "mega_machine.public.tutorial.start_drag_tutorial()";
						window.setTimeout(s, 5000);
					} else {

						if(mega_machine.public.status == "public") {
							var s = "mega_machine.newbie_manager.user_options()";
							window.setTimeout(s, 5000);
						}
					}
				}
			}

			$("#NeulandDouble").hide();
			mega_machine.newbie_manager.show_first_group();

			// mega_machine.narrative_context.create_logo();

			$("#ArtifactsLayer").css("zIndex", 2);
			mega_machine.target_page("down", "map", false);

			// Auf die schwarze Karte gehen
			mega_machine.map_context.set_active_map("nethernet");
			$(".MapGrid").removeClass("active_grid");
			$("#map_zoom_3").addClass("active_grid");
			///////////////////////////////

			mega_machine.newbie_manager.beginning = false;

			mega_machine.newbie_manager.show_first_group();
			// mega_machine.cookie_manager.modify("gamestate", 1);

		});

		self.big_number_ct++;

		//////////////////////////////////
		circle = self.initial_layer.circle(event.clientX, event.clientY, 100).attr("stroke", "red");
		var anim = Raphael.animation({
			r : 500,
			opacity : 0
		}, 5000);
		circle.animate(anim);

		circle2 = self.initial_layer.circle(event.clientX, event.clientY, 20).attr("stroke", "red");
		var anim = Raphael.animation({
			r : 470,
			opacity : 0
		}, 4800);
		circle2.animate(anim);

	}

	self.init();
}

Neuland.Interface = function(admin) {
	this.admin = admin;
	var self = this;

	this.artifact = null;

	this.list = new Array("team", "bot", "mail", "db", "os", "map", "web", "lab", "news", "shop");

	this.last = null;
	this.current = "bot";

	this.blinking = new Array();

	this.memory_paper = null;
	this.interaction_paper = null;
	this.horizontal_line = null;
	this.horizontal_path = null;
	this.horizontal_point = null;

	this.diagonalen = function() {
		//memory_container
		/*
		 var g = document.getElementById("memory_container");

		 w = $("#memory_container").width();
		 h = $("#memory_container").height() - 4;

		 self.memory_paper = Raphael(g, w, h);
		 var s = "M" + 2 + " " + 6 + "L" + w + " " + h;
		 var c = self.memory_paper.path(s).attr({stroke: "rgba(255,255,200, 0.2)" })

		 s = "M" + 2 + " " + h + "L" + w + " " + 6;
		 c = self.memory_paper.path(s).attr({stroke: "rgba(255,255,200, 0.2)" })

		 */

		var i = document.getElementById("os_interaction");
		w = $("#os_interaction").width();
		h = $("#os_interaction").height() - 1;

		//alert("Breite " + w + " Höhe " + h);

		self.interaction_paper = Raphael(i, w, h);

		s = "M" + 2 + " " + 2 + "L" + w + " " + h;
		c = self.interaction_paper.path(s).attr({
			stroke : "rgba(255,255,200, 0.2)"
		})

		// jetzt die Horizontale

		self.create_horizontal();

		/*
		var hb  = document.getElementById("HorizontalBar");
		w = $("#HorizontalBar").width();
		h = $("#HorizontalBar").height();

		self.horizontal_line = Raphael(hb, w, 16);
		*/
		// self.paint_horizontal_line("map");

	}

	this.create_horizontal = function() {
		var hb = document.getElementById("HorizontalBar");
		w = $("#HorizontalBar").width();
		h = $("#HorizontalBar").height();

		self.horizontal_line = Raphael(hb, w, 16);
	}

	this.remove_horizontal = function() {
		self.horizontal_line.remove();
	}

	this.remove_horizontal_line = function() {
		if(self.horizontal_path != null) {
			self.horizontal_path.remove();
		}
	}

	this.highlight_context = function(type) {
		$(".Context").css("color", "white");

		switch(type) {
			case "map":
				$("#map_interaction_text").css("color", "red");

				break;

			case "web":
				$("#web_interaction_text").css("color", "red");
				break;

			case "lab":
				$("#lab_interaction_text").css("color", "red");
				break;

			case "news":
				$("#news_interaction_text").css("color", "red");
				break;

			case "shop":
				$("#shop_interaction_text").css("color", "red");
				break;

		}
	}

	this.paint_horizontal_line = function(type) {
		var tp, target, ty;

		target = $("#tools").position().left;

		console.log("TARGET " + target);

		switch(type) {
			case "map":
				tp = $("#map_interaction").position().left + $("#Bar").position().left;
				var y = $("#map_interaction").height();
				ty = tp + y;

				break;

			case "web":
				tp = $("#web_interaction").position().left + $("#Bar").position().left;

				break;

			case "lab":
				tp = $("#lab_interaction").position().left + $("#Bar").position().left;

				break;

			case "news":
				tp = $("#news_interaction").position().left + $("#Bar").position().left;

				break;

			case "shop":
				tp = $("#shop_interaction").position().left + $("#Bar").position().left;

				break;

		}

		x = tp + 5;

		if(type == "map" || type == "news" || type == "shop") {
			start = "M" + tp + " " + 0 + "L" + x + " " + 0;
			end = "M" + tp + " " + 0 + "L" + target + " " + 0;

			if(self.horizontal_path != null)
				self.horizontal_path.remove();

			self.horizontal_path = self.horizontal_line.path(start).attr({
				stroke : "rgba(255,0,0, 1)"
			})

			// circle = self.horizontal_line.circle(tp, 2, 2).attr({stroke: "none", fill: "red", opacity: 1}) ;

			self.horizontal_path.animate({
				path : end
			}, 2000);

		} else
			self.remove_horizontal_line();

	}

	this.find = function(el) {
		for(var i = 0; i < self.list.length; i++) {
			if(self.list[i] == el)
				return i;
		}
	}

	this.get_list = function() {
		temp = new Array();
		start = self.find(self.last);
		end = self.find(self.current);

		if(end > start) {
			for(var i = start; i <= end; i++) {
				el = self.list[i];
				element = "#" + el + "_pointer";
				temp.push(element);
			}

		} else {
			for(var i = start; i >= end; i--) {
				el = self.list[i];
				element = "#" + el + "_pointer";
				temp.push(element);
			}
		}

		return temp;
	}

	this.process = function(no) {
		// console.log("process " + no);

		$(this.blinking[no]).css("backgroundColor", "red");

		$(this.blinking[no]).animate({

			"backgroundColor" : "white",

		}, 900);

	}

	this.color_reset = function() {
		$("#Bar .Text").css("color", "gold");
	}

	this.visibility_reset = function() {
		$(".HL_Border").removeClass("visible");
		$(".HL_Pointer").removeClass("visible");
	}

	this.color_marker = function(current) {
		self.color_reset();
		self.visibility_reset();

		switch(current) {
			case "team":
				$("#social_interaction .Text").css("color", "deeppink");
				$("#team_pointer_hl").addClass("visible");
				$("#team_pointer_border").addClass("visible");
				$("#team_switch").css("color", "deeppink");
				$("#team_switch").css("opacity", 1);

				$("#text_entry").css({
					"borderBottom" : "solid 2px deeppink",
					"borderRight" : "solid 2px deeppink",
					"borderTop" : "solid 2px deeppink",
				});

				break;

			case "bot":
				$("#bot_interaction .Text").css("color", "orange");
				$("#bot_pointer_hl").addClass("visible");
				$("#bot_pointer_border").addClass("visible");
				$("#bot_switch").css("color", "orange");
				$("#bot_switch").css("opacity", 1);

				$("#text_entry").css({
					"borderBottom" : "solid 2px orange",
					"borderRight" : "solid 2px orange",
					"borderTop" : "solid 2px orange",
				});
				break;

			case "mail":
				$("#mail_interaction .Text").css("color", "cyan");
				$("#mail_pointer_hl").addClass("visible");
				$("#mail_pointer_border").addClass("visible");
				$("#mail_switch").css("color", "cyan");
				$("#mail_switch").css("opacity", 1);

				$("#text_entry").css({
					"borderBottom" : "solid 2px cyan",
					"borderRight" : "solid 2px cyan",
					"borderTop" : "solid 2px cyan",
				});

				break;

			case "db":
				$("#db_interaction .Text").css("color", "lightgreen");
				$("#db_pointer_hl").addClass("visible");
				$("#db_pointer_border").addClass("visible");
				$("#db_switch").css("color", "green");
				$("#db_switch").css("opacity", 1);

				$("#text_entry").css({
					"borderBottom" : "solid 2px green",
					"borderRight" : "solid 2px green",
					"borderTop" : "solid 2px green",
				});

				break;

			case "os":
				$("#os_interaction .Text").css("color", "red");
				$("#os_pointer_hl").addClass("visible");
				$("#os_pointer_border").addClass("visible");
				$("#os_switch").css("color", "red");
				$("#os_switch").css("opacity", 1);

				$("#text_entry").css({
					"borderBottom" : "solid 2px red",
					"borderRight" : "solid 2px red",
					"borderTop" : "solid 2px red",
				});
				break;

			default:
				console.log(current);
				break;
		}
	}

	this.blink = function(current) {
		if(current == "map" || current == "web" || current == "lab" || current == "news" || current == "shop") {
			self.paint_horizontal_line(current);
			self.highlight_context(current);
		}

		console.log("BLINK " + current);

		if($("#text_entry").css("display") == "none")
			self.trigger_text_entry();

		self.color_marker(current);

		self.current = current;

		self.blinking = self.get_list();

		var movement = 900;
		var interval = movement / self.blinking.length;

		for( i = 0; i < self.blinking.length; i++) {
			var s = "mega_machine.interface_master.process(" + i + ")";
			window.setTimeout(s, i * interval);
		}

		self.last = current;

	}

	this.init = function() {
		this.artifact = new Neuland.Artifacts();
		self.diagonalen();
	}

	this.text_entry_pid = null;

	this.text_entry_process = function() {

		n = new Date().getTime();
		t = parseInt($("#text_entry").attr("time"));

		console.log("text entry check");

		if(n > t + 13000) {
			var x = document.activeElement;

			if($("#text_entry input").is(":focus")) {
				$("#text_entry").attr("time", n);
			} else {

				mega.last_text_entry_pos = $("#text_entry").position().left;
				$("#text_entry").fadeOut();

				if(self.text_entry_pid) {
					window.clearInterval(self.text_entry_pid);
					self.text_entry_pid = null;
					console.log("sollte den PID klären ");
				}

			}
		}
	}

	this.trigger_text_entry = function() {
		display = $("#text_entry").css("display");
		n = new Date().getTime();

		if(display == "none") {
			$("#text_entry").fadeIn();
		}

		mega_machine.ruler.text_entry_clicked = n;

		console.log("entry clicked " + n);

		/*
		 s = 'mega_machine.interface_master.text_entry_process()';
		 self.text_entry_pid =  window.setInterval(s, 3000);
		 }

		 $("#text_entry").attr("time", n);
		 */
	}

	self.init();

}
/*******************************************************************************************************/
Neuland.Dialog = function(admin) {
	this.admin = admin;
	var self = this;

	this.confirmation_commmand = null;
	this.negative_confirmation_command = null;

	this.avatar = function(form) {
		x = document.getElementById("avatar_window");

		if(!x) {
			var s = '<div id = "avatar_window">';
			s += '<div id = "title">';
			s += "change agent picture ";
			s += '</div>';

			s += form;

			s += '<input id = "CancelUpload" type="submit" value="Cancel">';

			s += '</div>';

			$("body").append(s);

			var t = '<input type="submit" value="Update profile" name="commit" class="update">';

			$(".commit").html(t);

			$("#CancelUpload").click(function() {
				$("#avatar_window").fadeOut();
			});

		} else
			$("#avatar_window").show();
	}

	this.login_window = function(form) {
		x = document.getElementById("login_window");

		if(!x) {
			var s = '<div id = "login_window">';

			s += '<div id = "close_login"><img src = "/images/new_interface/exit_white.svg"></div>';

			s += form;

			s += '<div id = "not_registered">';
			s += "I am not registered yet.";
			s += '<a href = "javascript:mega_machine.start_enrollment();">Register now!</a>';
			s += '</div>';

			s += '</div>';

			$("#Neuland").append(s);

			$("#close_login").click(function() {

				$("#login_window").hide();
			});

		} else
			$("#login_window").show();
	}

	this.check_pending_friendships = function() {
		if(self.admin.public.player.ego.friendship_requests.length > 0) {
			console.log("Hier sollte ich Freundschaftsabfragen malen");
		}
	}

	this.big_alert = function(text) {
		var x = document.getElementById("big_alert");
		if(!x) {
			var s = '<div id = "big_alert"></div>';
			$("body").append(s);
		}

		$("#big_alert").html(text);

		alert(text);
	}

	this.showDialog = function() {
		// alert("sollte den Dialog zeigen");
		self.check_pending_friendships();

	}

	this.negative_confirmation = function() {
		eval(self.negative_confirmation_command);
	}

	this.positive_confirmation = function() {
		$("#confirmation").fadeOut();
		eval(self.confirmation_command);

	}

	this.styled_confirmation = function(text, command, negative_confirmation, left, right) {
		if(negative_confirmation)
			self.negative_confirmation_command = negative_confirmation;
		else
			self.negative_confirmation_command = null;

		self.confirmation_command = command;
		var x = document.getElementById("confirmation");

		if(!x) {
			var c = '<div id = "confirmation">';

			c += '<div id = "confirmation_text">';
			c += text;
			c += '</div>';

			c += '<div id = "confirm_cancel">' + left + '</div>';
			c += '<div id = "confirm_ok">' + right + '</div>';

			c += '</div>';

			$("body").append(c);

			$("#confirm_cancel").click(function() {
				$("#confirmation").fadeOut();
				mega_machine.dialog.negative_confirmation();
			});

			$("#confirm_ok").click(function() {

				mega_machine.dialog.positive_confirmation();

			});

			$("#confirmation").css({

				height : 450,
			});

		} else {
			$("#confirmation_text").html(text);

			c += '<div id = "confirm_cancel">' + left + '</div>';
			c += '<div id = "confirm_ok">' + right + '</div>';

			$("#confirmation").fadeIn();
		}

	}

	this.confirmation = function(text, command, negative_confirmation) {
		if(negative_confirmation)
			self.negative_confirmation_command = negative_confirmation;
		else
			self.negative_confirmation_command = null;

		self.confirmation_command = command;
		var x = document.getElementById("confirmation");

		if(!x) {
			var c = '<div id = "confirmation">';

			c += '<div id = "confirmation_text">';
			c += text;
			c += '</div>';

			c += '<div id = "confirm_cancel">CANCEL</div>';
			c += '<div id = "confirm_ok">OK</div>';

			c += '</div>';

			$("body").append(c);

			$("#confirm_cancel").click(function() {
				$("#confirmation").fadeOut();
				mega_machine.dialog.negative_confirmation();
			});

			$("#confirm_ok").click(function() {

				mega_machine.dialog.positive_confirmation();

			});

		} else {
			$("#confirmation_text").html(text);

			$("#confirm_ok").html("OK");
			$("#confirm_cancel").html("CANCEL");

			$("#confirmation").fadeIn();
		}

	}
	/************************ Ein Dialog, nei dem man etwas eingeben, oder die Eingabe verweigern kann *********************/
	this.positive_command = null;
	this.negation_command = null;

	this.question_feedback = function(answer) {
		self.text_input = $("#dialog_answer").val();

		eval(self.positive_command);
		$("#entry_question").fadeOut();
	}

	this.text_input = null;

	this.entry_question = function(text, positive_command, negative_command) {
		self.text_input = $("#dialog_answer").val();

		self.positive_command = positive_command;
		self.negative_command = negative_command;

		var x = document.getElementById("entry_question");
		if(!x) {
			var c = '<div id = "entry_question">';

			c += '<div id = "entry_question_text">';
			c += text;
			c += '</div>';

			c += '<div id = "entry_question_field">';
			c += '<input type="text" id="dialog_answer">';
			c += '</div>';

			c += '<div id = "entry_cancel">CANCEL</div>';
			c += '<div id = "entry_submit">SUBMIT</div>';

			c += '</div>';
			$("body").append(c);

			$("#entry_cancel").click(function() {
				$("#entry_question").fadeOut();
			});

			$("#entry_submit").click(function() {

				mega_machine.dialog.question_feedback(true);

			});

		} else {
			$("#entry_question_text").html(text);
			$("#entry_question").fadeIn();
			$("#dialog_answer").val(" ");
		}
	}
	/**********************************************************************************************/
	this.feedback = function(text, command, cancel_command) {
		var x = document.getElementById("dialog_feedback");
		self.positive_command = command;

		if(!x) {
			var c = '<div id = "dialog_feedback">';

			c += '<div id = "dialog_feedback_text" class = "hyphenate">';
			c += text;
			c += '</div>';

			c += '<div id = "feedback_ok">OK</div>';

			if(cancel_command)
				c += '<div id = "feedback_cancel">CANCEL</div>'

			c += '</div>';

			$("body").append(c);

			Hyphenator.run();

			$("#feedback_ok").click(function() {
				$("#dialog_feedback").fadeOut();

				if(command)
					eval(command);
			});

			$("#feedback_cancel").click(function() {
				$("#dialog_feedback").fadeOut();

				eval(cancel_command);
			});

		} else {
			$("#dialog_feedback_text").html(text);
			$("#dialog_feedback").fadeIn();

			$("#feedback_ok").unbind('click');

			Hyphenator.run();

			$("#feedback_ok").click(function() {
				$("#dialog_feedback").fadeOut();

				if(command)
					eval(command);
			});

		}
	}
}
///////////////////////////////////////////// VIDEO ////////////////////////////////////////////////////

Neuland.VideoContext = function(name, admin) {
	var self = this;
	this.admin = admin;
	this.name = name;

	this.div = null;

	this.renderer = null;

	this.state = "video";
	this.context = "video";

	this.active = false;

	this.reposition = function() {
		if(mega_machine.active_range == "up") {
			h = $("#VideoContext").height();

			var tp = $("#Neuland").position().top - h;
			$("#VideoContext").css({
				top : tp,
			});

		}
	}

	this.init_context = function() {
		self.admin.active_context = self;
		self.admin.contextualize(self);

		if(self.div == null) {
			// if (mega_machine.active_range == "up") mega_machine.page_down();
			// else								   mega_machine.page_up();

			var nh = $("#Neuland").height();

			var s = '<div id = "VideoContext">';
			s += '<div id = "full_screen_content"></div>';
			s += '</div>';

			$("body").append(s);
			self.div = $("#VideoContext");
			self.admin.ruler.new_context(self.div, "VIDEO");

			var h = window.innerHeight - nh;
			$("#VideoContext").css("height", h);

			mega_machine.null_communication();

			self.reposition();

			$("#VideoContext").mouseover(function() {
				mega_machine.mouselistener.active_area = "video";
			});

		} else {
			// if (mega_machine.active_range == "up") mega_machine.page_down();
			// else								   mega_machine.page_up();

			self.admin.ruler.new_context(self.div, "VIDEO");

			self.reposition();
		}
	}
}
////////////////////////////////// NARRATIVE CONTEXT /////////////////////////////////////////////////

Neuland.NarrativeContext = function(name, admin) {
	var self = this;
	this.admin = admin;
	this.name = name;

	this.div = null;

	this.state = "narrative";
	this.context = "narrative";

	this.active = false;

	this.vector_grafix = null;
	this.vector_grafix_overlay = null;

	this.paper = null;

	this.random_players = new Array();

	this.team_formation_pid = null;
	this.team_counter = 0;
	this.selected_players = new Array();
	this.actual_team = new Array();

	this.elements = new Array();

	this.logo = null;

	this.reposition = function() {
		var tp = $("#Neuland").position().top;
		var h = $("#NarrativeContext").height();
		$("#NarrativeContext").css({
			top : tp - h
		});
	}

	this.create_logo = function() {

		self.logo = new Logo.Quad();

		// var logo = new Logo.DynamicLogo("Decentral Intelligence Agency", "#NarrativeContext", "DynamicLogo");

		/*
		var logo2 = new Logo.DynamicLogo("DECENTRAL INTELLIGENCE AGENCY", "#NarrativeContext", "DynamicTitle");
		var logo = new Logo.Polyeder(self.paper, 5, 2300, "rgba(0,0,0, 1)", 0);
		*/
		// var logo3 = new Logo.Polyeder(self.paper, 9, 52200, "rgba(0,0,0,0.1)", 0);
		//var logo2 = new Logo.Polyeder(self.paper, 7, 2050, "rgba(0,0,0,0.7)", 0);

		/*
		 var logo5 = new Logo.Polyeder(self.paper, 8, 16100, "rgba(255,0,0,0.5)", 0);
		 */
	}

	this.stop_team_formation = function() {
		window.clearInterval(self.team_formation_pid);
	}

	this.check_double_player = function(no) {
		for(var n = 0; n < self.selected_players.length; n++) {
			if(no == self.selected_players[n])
				return true;
		}

		return false;
	}

	this.get_random_player = function() {
		var l = 100;
		var x = parseInt(Math.random() * l);

		while(self.check_double_player(x) == true) {
			x = parseInt(Math.random() * l);
		}

		self.selected_players.push(x);
		return x;
	}

	this.random_question = function() {

	}

	this.register = function() {
		mega_machine.newbie_manager.newbie_informer.random_question();
		mega_machine.newbie_manager.engaged_player = true;
	}

	this.enter_field = function() {
		var r = Math.random();
		if(r < 0.2)
			return true;
		else
			return false;
	}

	this.crypto_information = function() {
		var s = "";

		for(var i = 0; i < 144; i++) {
			var r = parseInt(Math.random() * 2);
			var name;

			if(r == 0)
				name = "crypto_red";
			else
				name = "crypto_green";

			s += '<span class = "' + name + '"></span>';
		}

		return s;
	}

	this.remove_team = function() {
		for(var m = 0; m < 4; m++) {
			p = "#player_serial_" + self.actual_team[m];

			if(self.enter_field() == false) {
				var bg = self.crypto_information();
				$(p).html(bg);

				// $(p).html("");
			} else {
				var s = '<img class = "logo_rotate" src = "/images/new_interface/logo_weiss.svg"/>';
				$(p).html(s);

				$(p).click(function() {
					mega_machine.narrative_context.register();
				});

			}
		}

		self.actual_team = [];

		self.team_counter = 0;

		for(var m = 0; m < self.elements.length; m++) {
			self.elements[m].remove();
		}
	}

	this.paint_line = function(no) {
		// circle = self.paper.circle(100, 100, 50).attr("fill", "green");
		switch(no) {
			case 1:
				var origin = "#player_serial_" + self.actual_team[0];
				var target = "#player_serial_" + self.actual_team[1];

				var size = $(origin).height();
				var ox = $(origin).position().left + size / 2;
				var oy = $(origin).position().top + size / 2;

				var tx = $(target).position().left + size / 2;
				var ty = $(target).position().top + size / 2;

				self.process_line(ox, oy, tx, ty, target);

				break;

			case 2:
				var origin = "#player_serial_" + self.actual_team[1];
				var target = "#player_serial_" + self.actual_team[2];

				var size = $(origin).height();
				var ox = $(origin).position().left + size / 2;
				var oy = $(origin).position().top + size / 2;

				var tx = $(target).position().left + size / 2;
				var ty = $(target).position().top + size / 2;

				self.process_line(ox, oy, tx, ty, target);
				break;

			case 3:
				var origin = "#player_serial_" + self.actual_team[2];
				var target = "#player_serial_" + self.actual_team[3];

				var size = $(origin).height();
				var ox = $(origin).position().left + size / 2;
				var oy = $(origin).position().top + size / 2;

				var tx = $(target).position().left + size / 2;
				var ty = $(target).position().top + size / 2;

				self.process_line(ox, oy, tx, ty, target);
				break;

		}
	}

	this.process_line = function(ox, oy, tx, ty, target) {
		start = "M" + ox + " " + oy + "L" + ox + " " + oy;
		end = "M" + ox + " " + oy + "L" + tx + " " + ty;

		first_line = self.paper.path(start).attr({
			stroke : "rgba(255,0,0, 1)",
			"stroke-width" : 2
		})
		first_line.animate({
			path : end
		}, 250, function() {

			mega_machine.narrative_context.paint_quad(0, target);

			self.elements.push(first_line);

		});
	}

	this.paint_quad = function(no, div) {

		var stroke = 2;

		var x = $(div).position().left + stroke / 2;
		var y = $(div).position().top + stroke / 2;
		var size = $(div).height() - stroke;

		rect = self.paper.rect(x, y, size, size).attr({
			"stroke" : "rgba(255,0,0,1)",
			"stroke-width" : stroke,
			"fill" : "rgba(255,0,0, 0.6)"
		});

		self.elements.push(rect);
	}

	this.team_formation = function() {

		// if (self.team_counter == 4) self.team_counter = 0;

		var actual = self.get_random_player();

		self.actual_team.push(actual);

		n = "#player_serial_" + actual;
		// $(n).addClass("player_highlighted");

		console.log(self.actual_team);

		// self.paint_quad(self.team_counter, n);

		switch(self.team_counter) {
			case 0:
				self.paint_quad(self.team_counter, n);
				break;

			case 1:
				self.paint_line(1);
				break;

			case 2:
				self.paint_line(2);
				break;

			case 3:
				self.paint_line(3);

				var s = "mega_machine.narrative_context.remove_team()";
				window.setTimeout(s, 750);

				// self.actual_team = [];
				break;
		}

		self.team_counter++;
		if(self.selected_players.length == 40) {
			self.stop_team_formation();

		}

	}

	this.start_team_formation = function() {
		var s = "mega_machine.narrative_context.team_formation()";
		self.team_formation_pid = window.setInterval(s, 1500);
	}

	this.titling = function() {

	}

	this.init_paper = function() {
		var layer = document.getElementById("NarrativeRaphael");
		var g = $("#NarrativeRaphael");

		var width = g.width();
		var height = g.height();

		self.paper = Raphael(layer, width, height);

		// circle = self.paper.circle(100, 100, 400).attr("fill", "green");
	}

	this.init_context = function() {
		self.admin.active_context = self;
		self.admin.contextualize(self);

		if(self.div == null) {

			var s = '<div id = "NarrativeContext">';
			s += '<div id = "NarrativeContainer"></div>';
			s += '<div id = "NarrativeRaphael"></div>';
			s += '</div>';

			s += '<div id = "VectorGrafixOverlay"></div>';

			$("body").append(s);
			self.div = $("#NarrativeContext");
			self.admin.ruler.new_context(self.div, "ACT");

			self.init_paper();

			mega_machine.null_communication();

			self.vector_grafix = new Neuland.PainterInteraction();

			$("#NarrativeContext").mouseover(function() {
				mega_machine.mouselistener.active_area = "narrative";
			});

		} else {
			self.admin.ruler.new_context(self.div, "ACT");
			$("#tools").html("");
		}
	}

	this.big_message = function() {

	}
}
////////////////////////////////////////////////////////////////////////////////////////////////////////

Neuland.SurpriseContext = function(name, admin) {
	var self = this;
	this.admin = admin;
	this.name = name;

	this.div = null;

	this.renderer = null;

	this.state = "surprise";
	this.context = "surprise";

	this.active = false;

	this.location_photos = function() {
		if(self.admin.active_range == "down")
			self.admin.active_range = "up";
		else
			self.admin.active_range = "down";

		self.init_context();

		no = self.admin.map_context.history.length - 1;
		term = self.admin.map_context.history[no];

		self.flickr_fotos(term);
	}

	this.paint_fotos = function(list) {
		var s = "";

		for(var i = 0; i < list.length; i++) {
			// s += '<iframe src="' +  list[i] + '" width= "100%" height= "100%"></iframe>';

			s += '<div class = "flickr">';
			s += '<img src = "' + list[i] + '"/>';
			s += '</div>';

		}

		$("#SurpriseContext").html(s);
	}

	this.flickr_fotos = function(text) {
		mega_machine.info_miner.flickr_search(text);
	}

	this.random_term = function() {
		no = mega_machine.db_communication.query_history.length;
		var ret = parseInt(Math.random() * no);

		return mega_machine.db_communication.query_history[ret];
	}

	this.inactivity = function() {
		if(self.active_context != self) {
			self.init_context();
			if(self.active == false) {
				self.active = true;

				var term = self.random_term();
				this.flickr_fotos(term);
			}
		}
	}

	this.init_context = function() {
		self.admin.active_context = self;
		self.admin.contextualize(self);
		$("#tools").html("");

		if(self.div == null) {

			var s = '<div id = "SurpriseContext"></div>';
			$("body").append(s);
			self.div = $("#SurpriseContext");
			self.admin.ruler.new_context(self.div, "SURPRISE");

			mega_machine.null_communication();

			$("#SurpriseContext").mouseover(function() {
				mega_machine.mouselistener.active_area = "surprise";
			});

		} else
			self.admin.ruler.new_context(self.div, "SURPRISE");
	}

	this.system_input = function(text) {
	}
}
/*******************************************************************************************************/
Neuland.Statusbar = function(admin) {
	this.admin = admin;
	var self = this;

	this.message = null;
	this.temporary = "";
	this.pid = null;

	this.counter = 0;

	this.command = null;

	this.execute_command = function() {
		switch(self.command) {
			case "new achievement":
				mega_machine.window_jumper("achievements");
				break;

			case "new artifact":
				// alert("sollte den Artefakt zeigen");
				mega_machine.lab_context.init_context();
				break;


			case "team note":
			    mega_machine.set_communication_mode("social");
			break;

			case "next chapter":
				// alert("sollte neues Kapitel zeigen");
				break;

			case "friendship_request":
				alert("Freundschaftsabfrage");
				break;

			case "buy TwinDollars":
				mega_machine.dialog.feedback("you can get TwinDollar by clicking on the credit card");
				break;

			case "inventory":
				mega_machine.window_jumper("inventory");
				break;

			default:
				//alert(self.command);
				self.hide();
				break;
		}
	}

	this.typewriter_messages = "";

	this.typewriter = function(msg) {
		if(self.temporary.length < self.message.length) {
			x = self.temporary.length + 1;
			self.temporary = self.message.slice(0, x);

			$("#GameExplanation").html(self.temporary);
		} else {
			if(self.pid) {

				window.clearInterval(self.pid);
				self.pid = null;
			}
		}
	}

	this.old_text = "";

	this.show_typewriter = function(text) {
		// self.typewriter_messages += self.temporary;
		$("#GameExplanationStored").prepend(self.old_text);
		self.old_text = text;

		self.message = text;

		self.counter = 0;
		self.temporary = "";

		$("#GameExplanation").html(self.temporary);

		var s = "mega_machine.statusbar.typewriter()";
		if(self.pid == null) {
			self.pid = window.setInterval(s, 45);

		}
	}

	this.type_message = function() {
		if(self.temporary.length < self.message.length) {
			x = self.temporary.length + 1;
			self.temporary = self.message.slice(0, x);

			$("#status_message").html(self.temporary);
		} else {
			console.log("Intervall wird gelöscht");
			if(self.pid) {
				window.clearInterval(self.pid);
				self.pid = null;
			}
		}

	}

	this.delayed_message = function(text, time) {
		var s = 'mega_machine.statusbar.show("' + text + '")';
		window.setTimeout(s, time);
	}

	this.show = function(text) {
		// soundManager.play("messages_folder_click");

		self.message = text;
		$("#statusbar").fadeIn();

		self.counter = 0;
		self.temporary = "";

		$("#status_message").html(self.temporary);

		var s = "mega_machine.statusbar.type_message()";
		if(self.pid == null) {
			self.pid = window.setInterval(s, 45);

			var s = "mega_machine.statusbar.hide()";
			window.setTimeout(s, 10000);
		}
	}

	this.hide = function() {
		$("#statusbar").fadeOut(500);
	}
}
/************************************************** PLAYER_MESSAGES *****************************************************/

Neuland.PlayerMessage = function(admin) {
	var self = this;
	this.admin = admin;

	this.language = "en";
	this.player_status = false;

	this.check_player_status = function() {
		if(self.admin.public.player != null)
			self.player_status = true;

	}

	this.message = function(msg) {
		var answer = "";

		self.check_player_status();

		switch(msg) {
			case "mail system not available":
				switch(self.language) {
					case "de":
						answer = "Dies ist ein internes Kommunikationsystem, das allein den registrierten Agenten vornehalten ist"
						break;

					case "en":
						answer = "WARNING. This is an internal communication system that only registered agents may use";
						break;
				}

				break;

			case "mail search not allowed":
				switch(self.language) {
					case "de":
						answer = "nur unsere registrierten Agenten können Suchabfragen ihrer Mail-Accounts durchführen";
						break;

					case "en":
						answer = "WARNING. Only our registerd agents may performs search queries on their mail accounts";
						break;
				}
				break;

		}

		return answer;
	}
}
/************************************************** Mail  *****************************************************/

Neuland.Mail = function(admin) {
	var self = this;
	this.admin = admin;

	this.player = null;

	this.active_area = null;

	this.formatted_outgoing_item = function(item) {
		var d = new Date(item.attributes.sent_at);
		var time = d.format("dd.mm, hh:MM");

		var id = "private_message_" + item.attributes.id;
		var body_id = "private_message_body_" + item.attributes.id;

		var s = '<div class = "private_message_container">';

		s += '<div class = "private_message" id = "' + id + '">';

		s += '<div class = "messages_from">';
		s += '<div class = "date">';
		s += time;
		s += '</div>';

		// ABSENDER
		s += '<div class = "from">';
		s += '<span class = "from">';
		s += item.attributes.recipient_name;
		s += '</span>';
		s += '</div>';
		//
		s += '<div class="messages_profilepic">';
		s += '<img src = "' + item.attributes.recipient_avatar + '"/>';
		s += '</div>';

		var js = "javascript:mega_machine.public.mail_system.open_mail(" + item.attributes.id + ")";

		// Subject
		s += '<div class = "messages_subject" onclick = "' + js + '">';
		s += '<div class = "subject">';
		s += item.attributes.subject
		s += '</div>';
		s += '</div>';
		//

		s += '</div>';

		s += '</div>';

		s += '<div class = "messages_body" id = "' + body_id + '">';
		s += '<div class = "content hyphenate">';
		s += item.attributes.content;
		s += '</div>';

		s += '</div>';

		s += '</div>';

		s += '</div>';

		return s;
	}




this.update_click_event = function()
	{
		$(".content a.private_message_link").live("click", function() {
	      var data;
	      data = $(this).data();
	      ActionInvoker.invoke("/player_private_message_link_actions?private_message_id=" + data.private_message_id + "&key=" + data.key);
	      return false;
	    });
	}



	this.markdown_correction = function(item)
	{
	var sc = new RegExp("<link ");
  	check = item.attributes.content.search(sc);
  		
  		if (check != -1)
  			{
  			var id = item.attributes.id; 
  			if (item.attributes.content)
  				{
  				// item.attributes.content = self.link_check(item.attributes.content, item.attributes.id);
  				
  				item.attributes.content = Markdown.convert(item.attributes.content, item.attributes.id);	
  				self.update_click_event();  	
  				}
  			}				
	
	}
	
	this.check_read = function(id)
	{
	for (var i = 0; i < mega_machine.public.mail_system.incoming.length; i++)
		{
		mail = mega_machine.public.mail_system.incoming.at(i);
		
		if (mail.attributes.id == id)
			{
				
			if (mail.attributes.read != true)
				{

					
				mega_machine.public.mail_system.check_action(mail);
					
				var n = "#mid_private_message_" + id;
				$(n).removeClass("unread_message");	
				mega_machine.public.mail_system.set_read(id);
				
				mail.attributes.read = true;
				
				
				
				var nt = "#mid_unread_message_" + id;
				$(nt).removeClass("unread");
				$(nt).addClass("read");
				}	
			}	
		}	
	}	
	
	
	
	this.open_mail = function(id)
	{
	self.check_read(id);	
		
		
	var body = "#mid_private_message_body_" + id;	
	var msg  = "#mid_private_message_" + id;	
	
	
	visible = $(body).css("display");
	
	if (visible == "none")
		{ 
		$(body).show();
		
		$(msg).css("borderLeft", "solid 10px orange");		
		}
	else
		{
		$(msg).css("borderLeft", "solid 10px transparent");		
		$(body).hide();
		}
	}
	
	
	this.formatted_item = function(item) {
		
		self.markdown_correction(item);


		var d = new Date(item.attributes.sent_at);
		var time = d.format("dd.mm, hh:MM");

		var id = "mid_private_message_" + item.attributes.id;
		var body_id = "mid_private_message_body_" + item.attributes.id;

		var s = '<div class = "private_message_container">';

		if(item.attributes.read == true)
			s += '<div class = "private_message" id = "' + id + '">';
		else
			s += '<div class = "private_message unread_message" id = "' + id + '">';

		s += '<div class = "messages_from">';

		if(item.attributes.read == true)
			s += '<div class = "read"></div>';
		else {
			var r = "mid_unread_message_" + item.attributes.id;

			s += '<div id = "' + r + '" class = "unread"><div class = "pointer"></div></div>';
		}

		s += '<div class = "date">';
		s += time;
		s += '</div>';

		// ABSENDER
		s += '<div class = "from">';
		s += '<span class = "from">';
		s += item.attributes.sender_name;
		s += '</span>';
		s += '</div>';
		//
		s += '<div class="messages_profilepic">';
		s += '<img src = "' + item.attributes.sender_avatar + '"/>';
		s += '</div>';

		// var js = "javascript:mega_machine.public.mail_system.open_mail(" + item.attributes.id + ")";
		var js = "javascript:mega_machine.personal.mail.open_mail(" + item.attributes.id + ")";



		// Subject
		s += '<div class = "messages_subject" onclick = "' + js + '">';
		s += '<div class = "subject">';
		s += item.attributes.subject
		s += '</div>';
		s += '</div>';
		//

		s += '</div>';

		s += '</div>';

		s += '<div class = "messages_body" id = "' + body_id + '">';

		js = "javascript:mega_machine.personal.mail.reply_to_mail(" + item.attributes.id + ")";

		s += '<div class = "mail_reply" onclick = "' + js + '"><img src = "/images/new_interface/mail_reply.svg"/></div>';

		s += '<div class = "content hyphenate">';
		s += item.attributes.content;
		s += '</div>';

		s += '</div>';

		s += '</div>';

		s += '</div>';

		return s;
	}
	
	
	
	this.old_formatted_item = function(item) {
		
		self.markdown_correction(item);


		var d = new Date(item.attributes.sent_at);
		var time = d.format("dd.mm, hh:MM");

		var id = "private_message_" + item.attributes.id;
		var body_id = "private_message_body_" + item.attributes.id;

		var s = '<div class = "private_message_container">';

		if(item.attributes.read == true)
			s += '<div class = "private_message" id = "' + id + '">';
		else
			s += '<div class = "private_message unread_message" id = "' + id + '">';

		s += '<div class = "messages_from">';

		if(item.attributes.read == true)
			s += '<div class = "read"></div>';
		else {
			var r = "unread_message_" + item.attributes.id;

			s += '<div id = "' + r + '" class = "unread"><div class = "pointer"></div></div>';
		}

		s += '<div class = "date">';
		s += time;
		s += '</div>';

		// ABSENDER
		s += '<div class = "from">';
		s += '<span class = "from">';
		s += item.attributes.sender_name;
		s += '</span>';
		s += '</div>';
		//
		s += '<div class="messages_profilepic">';
		s += '<img src = "' + item.attributes.sender_avatar + '"/>';
		s += '</div>';

		// var js = "javascript:mega_machine.public.mail_system.open_mail(" + item.attributes.id + ")";
		var js = "javascript:mega_machine.personal.mail.open_mail(" + item.attributes.id + ")";



		// Subject
		s += '<div class = "messages_subject" onclick = "' + js + '">';
		s += '<div class = "subject">';
		s += item.attributes.subject
		s += '</div>';
		s += '</div>';
		//

		s += '</div>';

		s += '</div>';

		s += '<div class = "messages_body" id = "' + body_id + '">';

		js = "javascript:mega_machine.personal.mail.reply_to_mail(" + item.attributes.id + ")";

		s += '<div class = "mail_reply" onclick = "' + js + '"><img src = "/images/new_interface/mail_reply.svg"/></div>';

		s += '<div class = "content hyphenate">';
		s += item.attributes.content;
		s += '</div>';

		s += '</div>';

		s += '</div>';

		s += '</div>';

		return s;
	}

	this.find_mail = function(id) {
		for(var i = 0; i < self.incoming.length; i++) {
			mail = self.incoming.at(i);

			if(mail.attributes.id == id)
				return mail;
		}
	}

	this.reply_to_mail = function(id) {
		mail = self.find_mail(id);

		self.active_area = "new mail";
		self.clean_up("new");
		$("#new_mail_container").slideDown();

		var re = "Re:" + mail.attributes.subject;

		$("#NewMailSubject").val(re);

		var s = '<img src = "' + mail.attributes.sender_avatar + '"/>';
		$(".selected_contact").html(s);

		$(".selected_contact").attr("data_id", mail.attributes.sender_id);

	}

	this.loaded = false;
	this.personal_loaded = false;

	this.check_incoming = function() {

		if(mega_machine.public.mail_system.incoming.length > 0) {
			if(self.personal_loaded == false) {

				mega_machine.personal.mail.incoming = mega_machine.public.mail_system.incoming;
				mega_machine.personal.mail.outgoing = mega_machine.public.mail_system.outgoing;

				mega_machine.personal.mail.paint_incoming();
				mega_machine.personal.mail.paint_outgoing();
				self.personal_loaded = true;

			}

		} else {
			if(self.loaded == false) {
				self.loaded = true;

				self.load_pms();
			}

		}
	}

	this.check_outgoing = function() {
		if(mega_machine.public.mail_system.incoming.length > 0) {
		} else {
			if(self.loaded == false) {
				self.loaded = true;
				self.load_pms();
			}

		}
	}

	this.paint_incoming = function() {
		var s = "";

		for(var i = 0; i < self.incoming.length; i++) {
			item = self.incoming.at(i);
			s += self.formatted_item(item);
		}

		$("#incoming_mail_container").html(s);

		Hyphenator.run();
	}

	this.paint_outgoing = function() {
		var s = "";

		for(var i = 0; i < self.outgoing.length; i++) {
			item = self.outgoing.at(i);
			s += self.formatted_outgoing_item(item);
		}

		$("#outgoing_mail_container").html(s);
	}



	this.load_pms = function() {
		if(self.admin.public.status == "private") {
			var url = "/engine/pms/";

			$.ajax({
				type : "GET",
				url : url

			}).done(function(msg) {

				for(var i = 0; i < msg.sent.length; i++) {
					mega_machine.public.mail_system.outgoing.add(msg.sent[i]);
				}

				for(var i = 0; i < msg.received.length; i++) {
					mega_machine.public.mail_system.incoming.add(msg.received[i]);
				}

				mega_machine.personal.mail.incoming = mega_machine.public.mail_system.incoming;
				mega_machine.personal.mail.outgoing = mega_machine.public.mail_system.outgoing;

				mega_machine.personal.mail.paint_incoming();
				mega_machine.personal.mail.paint_outgoing();
			});
		}
	}

	this.clean_up = function(type) {
		switch(type) {
			case "in":

				if($("#outgoing_mail_container").css("display") == "block") {
					$("#outgoing_mail_container").slideUp();
				}

				if($("#new_mail_container").css("display") == "block") {
					$("#new_mail_container").slideUp();
				}

				break;

			case "out":

				if($("#incoming_mail_container").css("display") == "block") {
					$("#incoming_mail_container").slideUp();
				}

				if($("#new_mail_container").css("display") == "block") {
					$("#new_mail_container").slideUp();
				}

				break;

			case "new":
				if($("#incoming_mail_container").css("display") == "block") {
					$("#incoming_mail_container").slideUp();
				}

				if($("#outgoing_mail_container").css("display") == "block") {
					$("#outgoing_mail_container").slideUp();
				}

				break;

		}
	}

	this.init = function() {
		var s = '<div id = "mail" class = "active_page">';

		s += '<div id = "incoming_mails">';

		s += "IN";

		s += '</div>';

		s += '<div id = "incoming_mail_container">';
		s += '</div>';

		s += '<div id = "outgoing_mails">';
		s += "OUT";
		s += '</div>';

		s += '<div id = "outgoing_mail_container">';
		s += '</div>';

		s += '<div id = "new_mail">';
		s += "NEW";
		s += '</div>';

		s += '<div id = "new_mail_container">';

		s += '<div id = "new_mail_subject">';
		s += '<input type="text" id="NewMailSubject">';
		s += '</div>'

		s += '<div id = "new_mail_content">';
		s += '<textarea id = "NewMailContent" name ="NewMailContent"></textarea>';
		s += '</div>';

		s += '<div id = "new_mail_submit">';
		s += "SUBMIT";
		s += '</div>'

		s += '<div id = "new_mail_contacts">';
		s += self.get_contacts();
		s += '</div>'

		s += '</div>';

		s += '</div>';

		self.div_text = s;
		$("#PPContainer").append(s);

		$(".select_contacts").click(function() {

			$(".friends").show();

		});

		$("#incoming_mails").click(function() {
			mega_machine.personal.mail.active_area = "in";
			mega_machine.personal.mail.clean_up("in");

			mega_machine.personal.mail.check_incoming();

			$("#incoming_mail_container").slideDown();
		});

		$("#outgoing_mails").click(function() {
			mega_machine.personal.mail.show_outgoing_mails();
			/*
			 mega_machine.personal.mail.active_area = "out";
			 mega_machine.personal.mail.clean_up("out");

			 mega_machine.personal.mail.check_outgoing();

			 $("#outgoing_mail_container").slideDown();
			 */
		});

		$("#new_mail").click(function() {
			mega_machine.personal.mail.new_mail();
			/*
			 mega_machine.personal.mail.active_area = "new mail";
			 mega_machine.personal.mail.clean_up("new");
			 $("#new_mail_container").slideDown();
			 */
		});

		$("#new_mail_submit").click(function() {

			var text = "Text";
			var recipient_id = 9;

			var subject = $("#NewMailSubject").val();
			var text = $("#NewMailContent").val();

			var recipient_id = $(".selected_contact").attr("data_id");

			$.post("/private_messages", {
				"content" : text,
				"subject" : subject,
				"recipient_id" : recipient_id,
			}, function(data) {

				frage = data;

				if(mega_machine.public.player.ego.chapter_no == 0)
					agent_evaluation.check_message(recipient_id);

				mega_machine.statusbar.show("transfer successful");
				$("#mail").slideUp();
				
				$("#NewMailContent").val("");
				$("#NewMailSubject").val("");
				
				mega_machine.public.mail_system.outgoing.add(data.message);


				mega_machine.personal.mail.paint_outgoing();
				
			});

		});

	}

	this.new_mail = function() {
		mega_machine.personal.mail.active_area = "new mail";
		mega_machine.personal.mail.clean_up("new");
		$("#new_mail_container").slideDown();
	}

	this.show_outgoing_mails = function() {
		mega_machine.personal.mail.active_area = "out";
		mega_machine.personal.mail.clean_up("out");

		mega_machine.personal.mail.check_outgoing();

		$("#outgoing_mail_container").slideDown();
	}

	this.show_incoming_mails = function() {
		mega_machine.personal.mail.active_area = "in";
		mega_machine.personal.mail.clean_up("in");

		mega_machine.personal.mail.check_incoming();

		$("#incoming_mail_container").slideDown();
	}

	this.take = function(no) {
		testfall = no;
		alert("suche den Adressaten aus " + no.selectedIndex);
	}

	this.find_friend = function(no) {
		var friends = mega_machine.public.player.ego.friends;
		for(var i = 0; i < friends.length; i++) {
			if(friends[i].id == no)
				return friends[i];
		}

	}

	this.set_recipient = function(no) {
		friend = self.find_friend(no);

		var s = '<img src = "' + friend.avatar_url + '"/>';
		$(".selected_contact").html(s);

		$(".selected_contact").attr("data_id", no);

		$("#new_mail_contacts .friends").hide();
	}

	this.get_contacts = function() {
		var friends = mega_machine.public.player.ego.friends;

		var s = "";

		// s += '<select id = "new_mail_select" onchange="mega_machine.personal.mail.take(this);"><option>Pattern</option>';
		s += '<div id = new_mail_contacts>';

		s += '<div class = "select_contacts">SELECT</div>';

		s += '<div class = "selected_contact"></div>';

		s += '<div class = "friends">';

		for(var i = 0; i < friends.length; i++) {
			var js = "javascript:mega_machine.personal.mail.set_recipient(" + friends[i].id + ")";

			s += '<div class = "contact" onclick = "' + js + '" >';
			s += '<div class = "avatar">';
			s += '<img src = "' + friends[i].avatar_url + '"/>';
			s += '</div>';

			s += '<div class = "name">';
			s += friends[i].username;
			s += '</div>';

			s += '</div>';

		}
		s += '</div>';

		s += '</div>';

		// s += '</select>';

		return s;
	}

	this.show = function() {
		// $("#PPContainer").html(self.div_text);

		$("#mail").show();
	}

	self.init();
}
/************************************************** Journal  *****************************************************/

Neuland.Journal = function(admin) {
	var self = this;
	this.admin = admin;

	this.player = null;


	this.set_chapter = function(no)
	{
	var url = "/agenda_items/" + no;

		$.ajax({
       type : "GET",
       url : url
    
        }).done(function(msg) 
        {
		$("#agendas").replaceWith(msg);
      
        });


	}


	this.get_agenda_entries = function() {
		if(self.admin.public.status == "private") {
			self.player = self.admin.public.player;

			var chapter = 0;

			switch(self.player.ego.chapter) {
				case "Chapter 1":
					chapter = 1;
					break;

				default:
					// alert( self.admin.public.player.ego.chapter);
					break;

			}

			var url = "/agenda_items/" + chapter;

			$.ajax({
				type : "GET",
				url : url

			}).done(function(msg) {

				// $("#journal").html(msg);

				Agenda.replace(msg);
			});

		}
	}

	this.init = function() {
		var s = '<div id = "journal" class = "active_page">';

		// s += '<div id = "list_container">';
		// s += '</div>';
		s += '<div id = "application_log"></div>';

		s += '</div>';

		self.div_text = s;
		$("#PPContainer").append(s);

		self.get_agenda_entries();
		
		var no = mega_machine.public.player.ego.chapter_no;
		self.set_chapter(no);

	}

	this.show = function() {
		// $("#PPContainer").html(self.div_text);

		$("#journal").show();
	}

	self.init();
}
/************************************************** Mail  *****************************************************/
Neuland.AgentFile = function(admin) {
	var self = this;
	this.admin = admin;

	this.div_text = null;

	this.evaluation = null;

	this.open_tab = null;

	this.show = function() {
		$("#file").show();
	}

	this.dossier = function() {

		var s = '<div class = "line">';

		s += '<div class= "label">REACTION TIME</div>';
		s += '<div class = "value"  id = "reaction_time">' + self.evaluation.reaction_time + '</div>';

		s + '</div>';

		$("#file #fitness_container").append(s);

		///

		s = '<div class = "line">';

		s += '<div class= "label">QUIZ EVALUATION</div>';
		s += '<div class = "value"  id = "reaction_time">' + self.evaluation.quiz_result + '</div>';

		s + '</div>';

		$("#file #knowledge_container").append(s);

	}

	this.get_evaluation_data = function() {
		if(mega_machine.public.player.ego.chapter_no > 0) {
			var url = "/engine/agent_evaluations";

			$.ajax({
				type : "GET",
				url : url

			}).done(function(msg) {
				if(msg)
					mega_machine.personal.file.evaluation = msg.agent_evaluation;

				mega_machine.personal.file.dossier();

			});

		}
	}

	this.write_psychotest = function(msg) {
		var s = '<div id = "psychotest_label">PSYCHOTEST</div>';

		s += '<div id = "psychotest">';

		s += msg.data.psychotest_result.content;

		s += '</div>';

		$("#file #psychology_container").append(s);
	}

	this.read_psychotest = function() {
		self.get_evaluation_data();

		// alert("sollte den Psychotest aus der Datenbank einlesen ");

		var url = "/engine/psychotest_results";

		$.ajax({
			type : "GET",
			url : url

		}).done(function(msg) {
			labtest = msg;

			if(msg.data.psychotest_result.content)
				mega_machine.personal.file.write_psychotest(msg);

		});

	}

	this.tab_toggle = function(active) {
		if(self.open_tab != null)
			$(self.open_tab).slideUp();

		var s = "#" + active + "_container";

		if(self.open_tab != s) {
			$(s).slideDown();
			self.open_tab = s;
		}
	}

	this.init = function() {
		mega_machine.cookie_manager.get_psychotest();

		var psy = mega_machine.cookie_manager.psycho_cookie;

		var psychotest_result = "";
		if(psy == null) {
			psychotest_result = "Es gibt noch kein Resultat ";
		} else
			psychotest_result = psy.psychotest;

		self.read_psychotest();

		var s = '<div id = "file" class = "active_page">';

		s += '<div id = "fitness">';

		s += "FITNESS";

		s += '</div>';

		s += '<div id = "fitness_container">';
		s += '</div>';

		s += '<div id = "knowledge">';
		s += "KNOWLEDGE";
		s += '</div>';

		s += '<div id = "knowledge_container">';
		s += '</div>';

		s += '<div id = "psychology">';
		s += "PSYCHOLOGY";
		s += '</div>';

		s += '<div id = "psychology_container" class = "hyphenate">';
		s += '</div>'

		s += '<div id = "social_skills">';
		s += "SOCIAL SKILLS";
		s += '</div>';

		s += '<div id = "social_skills_container">';
		s += '</div>'

		s += '</div>';

		self.div_text = s;
		$("#PPContainer").append(s);

		Hyphenator.run();

		$("#file #fitness").click(function() {
			mega_machine.personal.file.tab_toggle("fitness");
		});

		$("#file #knowledge").click(function() {

			mega_machine.personal.file.tab_toggle("knowledge");
		});

		$("#file #psychology").click(function() {

			mega_machine.personal.file.tab_toggle("psychology");
		});

		$("#file #social_skills").click(function() {

			mega_machine.personal.file.tab_toggle("social_skills");
		});

	}

	self.init();
}
/************************************************** Settings  *****************************************************/
Neuland.Settings = function(admin) {
	var self = this;
	this.admin = admin;

	this.div_text = null;
	this.show = function() {
		// $("#PPContainer").html(self.div_text);
		$("#settings").show();
	}

	this.skype = function() {
		// var s = '<a href="skype:mburckhardt?call"><img src="http://download.skype.com/share/skypebuttons/buttons/call_green_white_92x82.png" style="border: none;" width="92" height="82" alt="Skype Me™!" /></a>';
		return s;
	}


	this.hide_feedback = function()
		{
		$("#feedback_button").html("FEEDBACK");	
		$("#feedback_hide").hide();
		$("#feedback").hide();
		}


	this.handle_feedback = function() {
		if($("#feedback").css("display") == "none") {
			$("#FeedbackContent").val(" ");

			$("#feedback").show();
			$("#feedback_button").html("SUBMIT");
			$("#feedback_hide").show();
			
		} else {
			$("#feedback").hide();
			$("#feedback_hide").hide();
			$("#feedback_button").html("FEEDBACK");

			text = $("#FeedbackContent").val()

			$.post("/feedbacks", {
				"feedback[message]" : text,
			}, function(data) {

				mega_machine.statusbar.show("thank you for your feedback!");

			});

			// feedback[message]	Hallo, versende Feedback
		}
	}

	this.init = function() {
		var name = mega_machine.public.player.ego.username;
		var mail = mega_machine.public.player.ego.email;

		var s = '<div id = "settings" class = "active_page">';

		s += '<div id = "avatar" title = "click to change the profile picture">';
		s += '<img src = "' + mega_machine.public.player.ego.large_avatar_url + '"/>';
		s += '</div>';

		s += '<div id = "user_name" class = "user_entry_legend">';
		s += "USERNAME";
		s += '</div>';

		s += '<div id = "user_name" class = "user_entry">';
		s += '<input type="text" id="settings_name">';
		s += '</div>';

		s += '<br>';

		s += '<div id = "user_name" class = "user_entry_legend">';
		s += "MAIL";
		s += '</div>';

		s += '<div id = "user_email" class = "user_entry">';
		s += '<input type="text" id="settings_email">';
		s += '</div>';

		s += '<br>';
		s += '<br>';

		s += '<div id = "user_name" class = "user_entry_legend">';
		s += "ENABLE NOTIFICATION";
		s += '</div>';

		s += '<div id = "user_notification" class = "user_entry">';
		s += '<input type="checkbox" id="settings_notification">';
		s += '</div>';

		s += '<div id = "feedback">';
		s += '<textarea id = "FeedbackContent" name ="FeedbackContent"></textarea>';
		s += '</div>';

		s += '<div id = "feedback_button">FEEDBACK</div>';
		s += '<div id = "feedback_hide">CANCEL</div>';

		s += '</div>';

		self.div_text = s;
		$("#PPContainer").append(s);

		$("#settings_name").val(name);
		$("#settings_email").val(mail);

		// s += self.admin.public.player.ego.email;

		$("#settings #avatar").click(function() {
			mega_machine.player_avatar();
		});

		$("#feedback_button").click(function() {

			mega_machine.personal.settings.handle_feedback();
		});
		
		$("#feedback_hide").click(function() {
		  mega_machine.personal.settings.hide_feedback();
		
		});		
		
		
	}

	self.init();
}
/************************************************** Achievements  *****************************************************/
Neuland.Achievements = function(admin) {
	var self = this;
	this.admin = admin;

	this.player = self.admin.public.player.ego;

	this.div_text = null;

	this.show = function() {
		// $("#PPContainer").html(self.div_text);

		$("#achievements").show();
	}

	this.paint_achievements = function() {
		// alert("Anzahl der positiven Achievements " + self.player.achievements.positive.length);
		var s = "";
		for( i = 0; i < self.player.achievements.positive.length; i++) {
			achievement = self.player.achievements.positive[i];

			s += '<div class = "pos_achievement" title = "' + achievement.description + '">';

			icon = achievement.icon_positive_big;

			s += '<img src = "' + icon + '"/>';
			s += '</div>';
		}

		for( i = 0; i < self.player.achievements.negative.length; i++) {

			achievement = self.player.achievements.negative[i];
			icon = achievement.icon_negative_big;

			s += '<div class = "neg_achievement" title = "' + achievement.description + '">';
			s += '<img src = "' + icon + '"/>';
			s += '</div>';
		}

		// alert("Anzahl der negativen Achievements " + self.player.achievements.negative.length);
		return s;
	}

	this.repaint = function() {
		$("#achievements").remove();

		var s = '<div id = "achievements" class = "active_page">';

		s += self.paint_achievements();

		s += '</div>';

		self.div_text = s;

		$("#PPContainer").append(s);
	}

	this.init = function() {
		var s = '<div id = "achievements" class = "active_page">';

		s += self.paint_achievements();

		s += '</div>';

		self.div_text = s;
		$("#PPContainer").append(s);
	}

	self.init();
}
/************************************************** Inventory  *****************************************************/
Neuland.Friendlist = function(admin) {
	var self = this;
	this.admin = admin;

	this.div_text = null;
	this.player = null;
	this.recipient = null;

	this.friend_mail = null;

	this.show = function() {
		// $("#PPContainer").html(self.div_text);
		$("#friendlist").show();
	}

	this.get_mail_script = function(id) {
		
		var s = "javascript:mega_machine.personal.friends.send_mail(" + id + ")";
		return s;
	}

	this.find_friend = function(id) {
		for( i = 0; i < self.player.friends.length; i++) {
			if(self.player.friends[i].id == id)
				return self.player.friends[i];
		}

		return 0;
	}

	this.create_mail_fields = function(friend) {
		var s = "";

		s += '<div class = "recipient">'
		s += friend.username;
		s += '</div>';

		s += '<div class = "subject">'
		s += "subject";
		s += '</div>';

		s += '<div class = "mailcontent">'
		s += '<textarea id = "MessageContent" name ="FriendMailer"></textarea>';
		s += '</div>';

		s += '<div class = "cancel_button">'
		s += "CANCEL";
		s += '</div>';

		s += '<div class = "send_button">'
		s += "SEND";
		s += '</div>';

		$("#friend_mailer").html(s);

		$(".cancel_button").click(function() {

			$("#friend_mailer").fadeOut();
			mega_machine.personal.friends.clean_friend_display();
		});

		$(".send_button").click(function() {

			mega_machine.personal.friends.deliver_mail();
		});

	}

	this.clean_friend_display = function() {
		for(var i = 0; i < self.player.friends.length; i++) {
			f = self.player.friends[i];
			n = $("#friend_" + f.id);
			n.removeClass("passive_friend");
			n.removeClass("active_friend");
		}
	}

	this.highlight_friend = function(friend) {
		self.clean_friend_display();

		for(var i = 0; i < self.player.friends.length; i++) {
			f = self.player.friends[i];
			if(f.id != friend.id) {
				n = $("#friend_" + f.id);
				n.addClass("passive_friend");
			} else {
				n = $("#friend_" + f.id);
				n.addClass("active_friend");
			}
		}
	}

	this.send_mail = function(friend_id) {
		
		var friend = self.find_friend(friend_id);
		self.recipient = friend;

		frage = friend;
		// NEU

		mega_machine.personal.activate_mail();
		mega_machine.personal.set_title("_mail");


		$(".personal_icon_text").removeClass("active");
		$("#bt_PersonalMail .personal_icon_text").addClass("active");


		mega_machine.personal.mail.new_mail();


		$("#NewMailSubject").val("subject");
		
		
		var s = '<img src = "' + friend.avatar_url + '"/>';
		$(".selected_contact").html(s);

		
		$(".selected_contact").attr("data_id", friend.id);
		
	}

	this.deliver_mail = function() {
		var c = $("#MessageContent").val();

		$.ajax({
			type : "POST",
			url : "/private_messages",
			data : {
				content : c,
				subject : "subject",
				recipient_id : self.recipient.id,
			},
			dataType : "JSON",

			success : function(data) {
				$("#friend_mailer").fadeOut();
				mega_machine.personal.friends.clean_friend_display();

				$(".InfoGrafix").show();
				$(".News").show();
			}
		});

	}

	this.get_accept_script = function(id) {
		var s = "javascript: mega_machine.personal.accept_friendship(" + id + ")";
		return s;
	}

	this.get_decline_script = function(id) {
		var s = "javascript: mega_machine.personal.decline_friendship(" + id + ")";
		return s;
	}

	this.get_requestors = function() {
		if(self.player == null)
			self.player = self.admin.public.player.ego;

		var s = "";
		for( i = 0; i < self.player.friendship_requests.length; i++) {
			id = self.player.friendship_requests[i].friendship.player_id;
			no = self.player.friendship_requests[i].friendship.id;

			var personnel = self.admin.public.player.check_acquaintance(id);

			testfall = personnel;

			s += '<div class = "friend_request_container" id = "friendship_request_' + no + '">';

			s += '<div class = "avatar">'
			s += '<img src = "' + personnel.avatar_url + '"/>';
			s += '</div>';

			///

			s += '<div class = "info">';
			s += '<div class = "user">';
			s += personnel.username;
			s += '</div>';

			s += '<div class = "small">';
			s += "security level: " + personnel.level;
			s += '</div>';

			s += '<div class = "small">';
			s += "friends: " + personnel.friends_count;
			s += '</div>';

			s += '</div>';

			s += '<div class = "accept" onclick = "' + self.get_accept_script(no) + '">ACCEPT</div>';
			s += '<div class = "decline" onclick = "' + self.get_decline_script(no) + '">DECLINE</div>';

			///
			s += '</div>';
		}
		return s;
	}

	this.get_friends = function() {
		if(self.player == null)
			self.player = self.admin.public.player.ego;

		var s = "";

		for( i = 0; i < self.player.friends.length; i++) {
			f = self.player.friends[i];

			s += '<div class = "friend_container" id = "friend_' + f.id + '">';

			s += '<div class = "avatar">'
			s += '<img src = "' + f.avatar_url + '"/>';
			s += '</div>';

			s += '<div class = "info">';
			s += '<div class = "user">';
			s += f.username;
			s += '</div>';

			s += '<div class = "small">';
			s += "security level: " + f.level;
			s += '</div>';

			/*
			 s += '<div class = "small">';
			 s += "mission: " +  f.chapter;
			 s += '</div>';
			 */

			s += '<div class = "small">';
			s += "friends: " + f.friends_count;
			s += '</div>';

			s += '<div class = "mail_friend" onclick = "' + self.get_mail_script(f.id) + '" >';
			s += 'SEND MAIL';
			s += '</div>';

			s += '</div>';

			var identify = "friend_achievements_" + f.id;
			s += '<div id = "' + identify + '" class = "friend_achievements">';

			for(var j = 0; j < f.achievements.positive.length; j++) {

				s += '<div class = "achievement" title = "' + f.achievements.positive[j].description + '">';
				s += '<img src = "' + f.achievements.positive[j].icon_positive_big + '"/>';
				s += '</div>';
			}

			s += '</div>';

			s += '</div>';
		}

		return s;
	}

	this.init = function() {

		// self.get_friends();

		var s = '<div id = "friendlist" class = "active_page">';

		s += self.get_requestors();
		s += self.get_friends();

		s += '</div>';

		self.div_text = s;

		$("#PPContainer").append(s);

		self.set_interaction();

	}

	this.repaint = function() {
		$("#friendlist").remove();

		var s = '<div id = "friendlist" class = "active_page">';

		s += self.get_requestors();
		s += self.get_friends();

		s += '</div>';

		self.div_text = s;

		$("#PPContainer").append(s);

		self.set_interaction();
	}

	this.set_interaction = function() {

		for( i = 0; i < self.player.friends.length; i++) {
			f = self.player.friends[i];

			if(f.achievements.positive.length > 6) {
				f.achievements_iterator = 0;

				// alert("Das sollte beweglich sein ");
				var id = "#friend_" + f.id;
				var ident = "achievement_controller_" + f.id;

				var s = '<div id = "' + ident + '" class = "next_achievement"><img src = "/images/new_interface/w_arrow_right.svg"/></div>';

				$(id).append(s);

				$("#" + ident).attr("friend_id", f.id);

				$("#" + ident).click(function(event) {

					no = $(this).attr("friend_id");
					mega_machine.personal.friends.next_achievements(no);
				});

			}
		}
	}

	this.next_achievements = function(no) {
		f = self.find_friend(no);
		f.achievements_iterator++;

		if(f.achievements_iterator == f.achievements.positive.length)
			f.achievements_iterator = 0;

		id = "#friend_achievements_" + no;
		$(id).html("");

		// alert("Der Iterator steht bei " + f.achievements_iterator);

		var s = "";

		var it = f.achievements_iterator;

		for(var j = it; j < f.achievements.positive.length; j++) {
			s += '<div class = "achievement">';
			s += '<img src = "' + f.achievements.positive[j].icon_positive_big + '"/>';
			s += '</div>';
		}

		for(var j = 0; j < it; j++) {
			s += '<div class = "achievement">';
			s += '<img src = "' + f.achievements.positive[j].icon_positive_big + '"/>';
			s += '</div>';
		}

		$(id).html(s);

		console.log(it);

	}

	self.init();
}
/************************************************** Inventory  *****************************************************/

Neuland.Inventory = function(admin) {
	var self = this;
	this.admin = admin;

	this.player = self.admin.public.player.ego;

	this.div_text = null;

	this.show = function() {
		// $("#PPContainer").html(self.div_text);
		$("#inventory").show();
	}





	this.fullscreen_slide_in = function() {
		w = window.innerWidth;

		$('#fullscreen_item').tween({
			left : {
				start : -w,
				stop : 0,
				time : 0,
				units : 'px',
				duration : 0.7,
				effect : 'easeInOut'
			},

		});

		$.play();
	}

	this.fullscreen_slide_out = function() {
		window.innerWidth = w;

		$("#conversion_info").fadeOut();

		$('#fullscreen_item').tween({
			left : {
				start : 0,
				stop : 1920,
				time : 0,
				units : 'px',
				duration : 0.7,
				effect : 'easeInOut'
			},

		});

		$.play();
	}

	this.fullscreen_item = function(item) {
		
		self.check_conversion(item);
		
		
		x = document.getElementById("fullscreen_item");

		if(!x) {
			var s = '<div id = "fullscreen_item">';
			s += '<img src = "' + item.big_image + '"/>';
			s += '</div>';
			$("body").append(s);

			$("#fullscreen_item").click(function() {
				
				// alert("Tausch");  // TTT
				
				
				mega_machine.personal.inventory.fullscreen_slide_out();
			});

		} else {
			var s = '<img src = "' + item.big_image + '"/>';
			$("#fullscreen_item").html(s);

			self.fullscreen_slide_in();
		}
	}

	this.remove_item = function(change, id) {
		console.log("REMOVE");
		
		var found = false;

		for(var i = 0; i < self.player.player_items.length; i++) {
			item = self.player.player_items[i];
			if(item.inventory_item_id == id) {
				
				var n = $("#inventory_item_count_" + id);
				var q = $("#inventory_item_id_" + id);

				
				item.quantity += change.change;

				if(item.quantity > 0) {
					
					n.html(item.quantity);
				} else
					if (item.quantity == 0)
						{ 
						n.remove();
						q.remove();
						}

				var found = true;
			}
		}

	}


   this.repaint = function()
   {
   var s = self.paint_items();
   $("#inventory").html(s);

   }


    this.reload_items = function()
    {
    var url = "/engine/get_items";
    $.ajax({
		type : "GET",
		url : url

		}).done(function(data) {
		
		mega_machine.public.player.ego.player_items = data;
		mega_machine.personal.inventory.repaint();
		});
    
    }


	this.item_presence = function(id)
	{
	var res = false;
	
	for(var i = 0; i < self.player.player_items.length; i++)
		{
		if (self.player.player_items[i].inventory_item_id == id) res = true;
		}
	
	if (res == false) self.reload_items();

	} 


	this.add_item = function(change, id) {
		self.item_presence(id, change);
		
		for(var i = 0; i < self.player.player_items.length; i++) {
			item = self.player.player_items[i];
			if(item.inventory_item_id == id) {
				item.quantity += change.change;

				var n = $("#inventory_item_count_" + id);
				n.html(item.quantity);

			}
		}
	}

	this.inventory_item = function(no) {
		for(var i = 0; i < self.player.player_items.length; i++) {
			item = self.player.player_items[i];
			if(item.inventory_item_id == no) {
				self.fullscreen_item(item);
			}
		}
	}


	this.actual_item 		= null;
	this.actual_player_item = null;


	this.show_conversion_info = function(item, player_item)
	{
	self.actual_item 			= item;
	self.actual_player_item		= player_item;
		
		
	var x = document.getElementById("conversion_info");
	if (!x)
		{	
		var s = '<div id = "conversion_info"></div>';
		$("body").append(s);	
		}
	$("#conversion_info").fadeIn();	
		
	
	var s = "";
	
	for (var i = 0; i < item.attributes_x.length; i++)
		{
		obj = item.attributes_x[i];
		
		if (obj.analysis_boost)
			{
			var boost = " acceleration: ";				
			s += '<div class = "boost">' + obj.boosting_analysis_of + ' ' + boost + obj.analysis_boost + '%</div>';	
						
			}
		
		if (obj.energy_boost)
			{
			var js = 'javascript:mega_machine.personal.inventory.boost_energy()';
			
			
			s += '<div onclick = "' + js + '" class = "boost" title ="boost_energy">energy boost: ' + obj.energy_boost + '%</div>';		

			}
			
		}
		
	$("#conversion_info").html(s);
		
	}


  this.boost_energy = function()
  	{
  	if (self.actual_player_item) 
  		{
		var url = "/engine/energy_charges?inventory_item_id=" + self.actual_player_item.id; 

	 	$.ajax({
          type : "GET",
          url : url

          }).done(function(msg) {

		  frage = msg;

	      var id = mega_machine.personal.inventory.actual_item.inventory_item_id;
		  mega_machine.personal.inventory.remove_item(frage.inventory_change, id);

		  mega_machine.public.player.mod_energy(msg);

          });




		//////////////////////
  		}	
  
  	
  	}



	this.check_conversion = function(item)
	{
	var shop_item = mega_machine.shop_context.find_item(  item.inventory_item_id );
	
	if (item.attributes_x.length > 0)
		{
		// alert("hier gibt es was, sollte testen, ob hier eine Konversion möglch ist " + item.inventory_item_id);
		self.show_conversion_info(shop_item, item);
		}

	}



	this.paint_items = function() {
		var s = "";

		for(var i = 0; i < self.player.player_items.length; i++) {
			item = self.player.player_items[i];

			no = item.inventory_item_id;

			id = "inventory_item_id_" + no;

			js = 'javascript:mega_machine.personal.inventory.inventory_item(' + no + ')';

			s += '<div id = "' + id + '" class = "player_item" onclick = "' + js + '">';

			s += '<img src = "' + item.image + '"/>';

			s += '<div class = "player_item_count" id = "inventory_item_count_' + no + '">';
			s += item.quantity;
			s += '</div>';

			s += '<div class = "player_item_overlay">';

			s += item.description;

			s += '</div>';

			s += '</div>';

		}

		return s;
	}

	this.init = function() {
		var s = '<div id = "inventory">';

		s += self.paint_items();

		s += '</div>';

		self.div_text = s;

		$("#PPContainer").append(s);
	}

	this.repaint = function() {
		$("#inventory").remove();

		var s = '<div id = "inventory">';
		s += self.paint_items();
		s += '</div>';
		self.div_text = s;

		$("#PPContainer").append(s);
	}

	self.init();
}
/************************************************** JOINT MESSAGE WINDOW *****************************************************/

Neuland.MessageContext = function(typ, id, text) {
	this.typ = typ;
	this.id = id;
	this.div

	this.history = new Array();
	this.offset = 0;

	var self = this;

	this.time

	this.create_old_div = function() {
		var name = "joint_message_" + self.typ;
		var s = '<div id = "MessageContext_' + self.id + '" class = "' + name + '">';

		var focus = "message_focus " + self.typ + "_focus";

		s += '<div class = "' + focus + '"></div>';

		for( i = 0; i < self.history.length; i++) {
			s += self.history[i];
		}
		s += '</div>';

		return s;
	}

	this.create_div = function() {
		var list = self.history;

		var name = "joint_message_" + self.typ;
		var s = '<div id = "MessageContext_' + self.id + '" class = "' + name + '">';

		var focus = "message_focus " + self.typ + "_focus";

		s += '<div class = "' + focus + '"></div>';

		var i = list.length;
		while(i--) {
			s += list[i];
		}

		s += '</div>';

		return s;
	}

	this.init = function() {
		self.time = new Date().getTime();
		self.history.push(text);
	}

	self.init();

}
var testobjekt;

Neuland.JointMessages = function(admin) {
	var self = this;
	this.admin = admin;
	this.textlayer = null;

	this.active_source = null;
	this.active_div = null;

	this.context_history = new Array();
	this.active_message_context = null;

	this.bot_filter = false;
	this.social_filter = false;
	this.db_filter = false;
	this.mail_filter = false;
	this.system_filter = false;

	this.slideUp = function() {

		$("#joint_messages_handler").slideUp(60, function() {
			$("#joint_messages").slideUp();
		});
	}

	this.slideDown = function() {
		$("#joint_messages").slideDown(function() {
			$("#joint_messages_handler").slideDown();
		});
	}

	this.show = function() {
		if($("#joint_messages").css("display") == "none") {
			self.refresh_textlayer();

			self.slideDown();
			// $("#joint_messages").show();

			// var s = '<img src = "/images/new_interface/minus.svg"/>';
			// $(".joint_messages_exit").html(s);
		} else {
			self.refresh_textlayer();
		}
	}

	this.hide = function() {
		$("#joint_messages").hide();

		// var s = '<img src = "/images/new_interface/plus.svg"/>';
		// $(".joint_messages_exit").html(s);
	}

	this.set_message = function(source, text) {
		if(source != self.active_source) {
			self.create_new_div(source, text);
		} else {

			self.active_message_context.history.push(text);
			self.refresh_textlayer();
		}

	}

	this.reset_filter = function() {
		self.social_filter = false;
		self.bot_filter = false;
		self.db_filter = false;
		self.mail_filter = false;
		self.system_filter = false;

		self.refresh_textlayer();
	}

	this.activate_filter = function(typ) {
		if(typ == "mail")
			self.mail_filter = false;
		if(typ == "bot")
			self.bot_filter = false;
		if(typ == "db")
			self.db_filter = false;
		if(typ == "system")
			self.system_filter = false;
		if(typ == "social")
			self.social_filter = false;

		self.refresh_textlayer();
	}

	this.muted_tab = function(typ) {
		$(typ).css("color", "rgb(32,32,32)");
		$(typ).css("opacity", 0.2);

	}

	this.deactivate_tabs = function(typ) {
		if(typ == "social") {
			self.muted_tab("#bot_switch");
			self.muted_tab("#db_switch");
			self.muted_tab("#mail_switch");
			self.muted_tab("#os_switch");
		}

		if(typ == "bot") {
			self.muted_tab("#team_switch");
			self.muted_tab("#db_switch");
			self.muted_tab("#mail_switch");
			self.muted_tab("#os_switch");
		}

		if(typ == "db") {
			self.muted_tab("#team_switch");
			self.muted_tab("#bot_switch");
			self.muted_tab("#mail_switch");
			self.muted_tab("#os_switch");
		}

		if(typ == "mail") {
			self.muted_tab("#team_switch");
			self.muted_tab("#bot_switch");
			self.muted_tab("#db_switch");
			self.muted_tab("#os_switch");
		}

		if(typ == "system") {
			self.muted_tab("#team_switch");
			self.muted_tab("#bot_switch");
			self.muted_tab("#db_switch");
			self.muted_tab("#mail_switch");
		}

	}

	this.filter = function(typ) {
		self.deactivate_tabs(typ);

		if(typ == "social") {
			self.bot_filter = true;
			self.db_filter = true;
			self.mail_filter = true;
			self.system_filter = true;
		}

		if(typ == "bot") {
			self.social_filter = true;
			self.db_filter = true;
			self.mail_filter = true;
			self.system_filter = true;
		}

		if(typ == "db") {
			self.social_filter = true;
			self.bot_filter = true;
			self.mail_filter = true;
			self.system_filter = true;
		}

		if(typ == "mail") {
			self.social_filter = true;
			self.bot_filter = true;
			self.db_filter = true;
			self.system_filter = true;
		}

		if(typ == "system") {
			self.social_filter = true;
			self.bot_filter = true;
			self.db_filter = true;
			self.mail_filter = true;
		}

		self.refresh_textlayer();
	}

	this.set_interaction = function(message_context, div) {
		n = $("." + message_context.typ + "_focus");

		n.click(function() {
			mega_machine.joint_messages.filter(message_context.typ);
		});

		div.click(function() {

			// mega_machine.joint_messages.filter( message_context.typ);
		});
	}

	this.invisible = function(typ) {
		switch(typ) {
			case "bot":
				return self.bot_filter;
				break;

			case "db":
				return self.db_filter;
				break;

			case "mail":
				return self.mail_filter;
				break;

			case "social":
				return self.social_filter;
				break;

			case "system":
				return self.system_filter;
				break;
		}

		return false;
	}

	this.refresh_textlayer = function() {
		l = self.context_history.length;

		self.textlayer.html("");

		var width = $("#joint_messages").width();

		while(l--) {
			t = self.context_history[l];

			if(self.invisible(t.typ) == false) {
				var content = t.create_div();

				self.textlayer.append(content);
				// self.textlayer.prepend(content);

				d = $("#MessageContext_" + t.id);
				d.css("left", t.offset);

				d.css("width", width - t.offset);

				self.set_interaction(t, d);
			}
		}
	}

	this.create_new_div = function(source, text) {
		l = self.context_history.length;
		n = new Neuland.MessageContext(source, l, text);

		self.active_message_context = n;

		self.active_source = source;
		var width = $("#joint_messages").width();

		switch(source) {
			case "db":
				left = $("#db_interaction").position().left;
				n.offset = left

				break;

			case "mail":

				left = $("#mail_interaction").position().left;
				n.offset = left

				break;

			case "system":
				left = $("#os_interaction").position().left;
				n.offset = left
				break;

			case "bot":
				left = $("#bot_interaction").position().left;

				n.offset = left;

				break;

			case "social":
				// alert("ein neues DIV");
				left = $("#social_interaction").position().left;
				n.offset = left;
				break;

		}

		self.context_history.push(n);
		self.refresh_textlayer();

	}

	this.init_textlayer = function() {
		left = $("#social_interaction").position().left + $("#Bar").position().left;

		tp = $("#Neuland").height() + 2;

		var s = '<div id = "joint_messages" class = "communication_layer">';

		s += '</div>';

		s += '<div id = "joint_messages_handler">';

		s += '<div id = "team_switch" class = "inactive">TEAM<div class = "pointer"></div></div>';
		s += '<div id = "bot_switch" class = "inactive">BOT<div class = "pointer"></div></div>';
		s += '<div id = "mail_switch" class = "inactive">MAIL<div class = "pointer"></div></div>';
		s += '<div id = "db_switch" class = "inactive">DBASE<div class = "pointer"></div></div>';
		s += '<div id = "os_switch">SYSTEM<div class = "pointer"></div></div>';

		s += '<div class = "dragger">';
		s += '<div class = "points"></div>';
		s += '<div class = "points"></div>';
		s += '<div class = "points"></div>';

		s += '</div>';

		s += '<div class = "exit_arrow"><img src = "/images/new_interface/strong_exit.svg"/></div>';

		s += '</div>';

		$("#Neuland").append(s);
		// $("#body").append(s);

		$("#joint_messages").mouseover(function() {
			mega_machine.unset_draggable();
		});

		$("#joint_messages").mouseout(function() {
			mega_machine.set_draggable();
		});

		$(".dragger").mouseover(function() {
		
			mega_machine.unset_draggable();
		});

		$(".dragger").mouseout(function() {
			mega_machine.set_draggable();

		});


		self.expandable_communicator();



		$("#joint_messages_handler").click(function() {

			// mega_machine.joint_messages.slideUp();
		});






		var n = $("#joint_messages");

		n.css("overflow-y", "auto");
		n.mCustomScrollbar({

			scrollButtons : {
				enable : false,
				scrollType : "continuous",
				scrollSpeed : 120,
				scrollAmount : 40
			},
		});

		$("#team_switch").click(function() {

			if($("#team_switch").css("opacity") < 1) {
				mega_machine.set_communication_mode("social");
			} else {
				mega_machine.joint_messages.filter("social");
			}

		});

		$("#bot_switch").click(function() {

			if($("#bot_switch").css("opacity") < 1)
				mega_machine.set_communication_mode("bot");
			else
				mega_machine.joint_messages.filter("bot");
		});

		$("#mail_switch").click(function() {

			if($("#mail_switch").css("opacity") < 1)
				mega_machine.set_communication_mode("mail");
			else
				mega_machine.joint_messages.filter("mail");
		});

		$("#db_switch").click(function() {

			if($("#db_switch").css("opacity") < 1)
				mega_machine.set_communication_mode("db");
			else
				mega_machine.joint_messages.filter("db");

		});

		$("#os_switch").click(function() {

			if($("#os_switch").css("opacity") < 1)
				mega_machine.set_communication_mode("system");
			else
				mega_machine.joint_messages.filter("system");

		});

		$(".exit_arrow").click(function() {

			mega_machine.joint_messages.slideUp();
		});

		$("#joint_messages").css({

			left : left,
			top : tp,
		});

		self.textlayer = $("#joint_messages");

		$("#joint_messages_handler").css({
			left : left,
			top : tp + $("#joint_messages").height(),
		});

	}


	this.expandable_communicator = function()
	{
	
	$(".dragger").draggable({
		
		axis : "y",
		
		start : function(event, ui) {			
		},

		drag : function(event, ui){
		
		var tp = $("#Neuland").position().top +  $("#Neuland").height(); 
		var height = event.clientY - tp - 8;

		var offset = height + $("#Neuland").height();

		
		$("#joint_messages").css("height", height);
		$("#joint_messages_handler").css("top", offset);
		
		},


		stop : function(event, ui) {

		var tp = $("#Neuland").position().top +  $("#Neuland").height(); 
		var height = event.clientY - tp - 8;

		var offset = height + $("#Neuland").height();

		
		$("#joint_messages").css("height", height);
		$("#joint_messages_handler").css("top", offset);
		
		$("#joint_messages_handler .dragger").css("top", 8);
		}
	});
	
		
	}


	this.init = function() {
		self.init_textlayer();
	}

	self.init();
}
/****************************************************** OPERATING SYSTEM *****************************************************/

Neuland.SystemCommunication = function(admin) {
	var self = this;
	this.admin = admin;

	this.textlayer = null;

	this.history = new Array();
	this.iterator = 0;

	this.call = function(id) {
		item = self.admin.public.operating_system.find_item(id);
		$("#text_field").val(item.attributes.key);
	}

	this.info = function() {
		var s = '<div class = "system_message_help">';
		s += "DIA OS, vs. 11.1.26, 2003-213<br>";
		s += "=============================<br>";

		s += "DIA-GNU bash, version release, 6.1.17<br>"
		s += "This is a multifunctional console. You can type javascript commands as well as the shell commands that are defined internally. Type <b>help</b> to see the complete list, <b>help [command]</b> to see an explanation of the given command";
		s += "As a non registered user you only have access to very few commands."

		s += '</div>';
		return s;
	}

	this.get_help = function() {
		var s = '<br><div class = "system_message_help">HELP SYSTEM<br>'
		s += "=====================================<br>"

		s += '<b>alias</b> - create an alias<br>';
		s += '<b>break</b> - exit from a loop<br>';
		s += '<b>cat</b>  - concatenate and print (display) the content of files<br>';
		s += '<b>cd</b> - change directory<br>';
		s += '<b>clear</b> - clear terminal screen<br>';
		s += '<b>enter</b> - enter DIA<br>';
		s += '<b>psychotest</b> - start the psychotest<br>';
		s += '<b>self optimization</b>';

		s += '</div>';

		return s;
	}

	this.show_json_object = function() {

	}

	this.errcheck_caller = function() {
		data = {
			text : "Ein langer, mehrzeiliger Text"
		}

		jQuery.ajax({
			async : true,
			data : data,
			dataType : 'json',
			type : 'put',
			url : "/error_check/caller/",
			success : function(msg) {

				alert("Daten sind abgeschickt ");

			}
		});

	}

	this.json_digester = function(data) {

	}

	this.spec = function(text) {
		//      /error_check/input?text=Task.find(:last)
		var test = new RegExp("errcheck");

		end = text.search(test)
		if(end == 0) {
			var s = text.slice(9, text.length);

			var url = "/error_check/input?text=" + s;

			$.ajax({
				type : "GET",
				url : url

			}).done(function(msg) {

				labtest = msg;
			});

		}

		return false;
	}

	this.check_keyword = function(text) {
		var ret = false;

		ret = self.spec(text);

		switch(text) {
			case "help":
				var s = self.get_help();
				self.admin.joint_messages.set_message("system", s);

				ret = true;
				break;

			case "DIRTYHACK":
				if(mega_machine.public.status == "public")
					mega_machine.cookie_manager.increment_attribute("hacking", 1);

				var positive = "mega_machine.newbie_manager.check_password()";

				mega_machine.dialog.entry_question("You're bold, great! So have a try and type in the password", positive, 0);

				ret = true;

				break;

			// OS

			case "alias":
				mega_machine.dialog.feedback(mega_machine.public.messages.get("no_access"));
				return true;
				break;

			case "break":
				mega_machine.dialog.feedback("loop cancelled");
				return true;
				break;

			case "psychotest":
				mega_machine.public.psychotest.video();
				return true;
				break;

			case "self optimization":
				mega_machine.newbie_manager.virgo_clinique();
				break;

			case "cls":
				self.admin.joint_messages.activate_filter("system");
				self.admin.joint_messages.refresh_textlayer();
				ret = true;
				break;

			case "enter":
				if(self.admin.public.status == "public") {
					mega_machine.hacker_question();
				}
				ret = true;
				break;

			case "xxxPasswordList":

				mega_machine.target_page("down", "lab", true);
				mega_machine.statusbar.show("this process will take about 10 seconds ");
				n = new EngineData.HackingPhrase();

				mega_machine.start_internal_eggtimer(1200, "mega_machine.newbie_manager.hacking_timeout()");

				ret = true;
				break;

		}

		return ret;
	}

	this.strip_command = function(text) {
		var sc = new RegExp(" ");
		check = text.search(sc);
		var com = "";

		if(check != -1) {
			com = text.slice(0, check);
		}
		return com;
	}

	this.check_explanation = function(text) {
		var sc = new RegExp("-help");
		check = text.search(sc);

		var ret = false;

		if(check != -1) {
			x = self.strip_command(text);

			for(var i = 0; i < self.admin.public.operating_system.item_list.length; i++) {
				item = self.admin.public.operating_system.item_list.at(i);

				if(item.attributes.key == x) {
					ret = true;
					self.show_explanation(item.attributes.key);
				}
			}

		}

		return ret;
	}

	this.show_explanation = function(command) {
		item = self.valid_command(command);

		var s = '<div class = "system_message_help">';
		s += '-------------------------<br>';
		s += item.attributes.helptext + '<br>';
		s += '-------------------------<br>';
		s += '</div>';

		self.admin.joint_messages.set_message("system", s);
	}

	this.valid_command = function(text) {
		for(var i = 0; i < self.admin.public.operating_system.item_list.length; i++) {
			item = self.admin.public.operating_system.item_list.at(i);
			if(item.attributes.key == text)
				return item;
		}
		return null;
	}

	this.console = function(text) {
		try {
			eval(text);
			soundManager.play("console_found");
			return true;
		} catch(err) {
			console.log("FEHLER " + err.message);
			return false;
		}
	}

	this.process = function(text) {
		self.history.push(text);
		if(self.console(text) == false) {

			item = self.valid_command(text);
			if(!item) {
				if(mega_machine.public.status == "public")
					mega_machine.newbie_manager.count_system_commands();

				self.admin.statusbar.show("invalid command");
				soundManager.play("console_fail");
			} else {
				alert("Ausführen");
			}

		}

	}

	this.input = function(text) {
		if(mega_machine.public.status == "public")
			mega_machine.cookie_manager.increment_attribute("system", 1);

		var s = '<div class = "system_message">' + text + '</div>';
		self.admin.joint_messages.set_message("system", s);

		if(self.check_keyword(text) == false) {
			console.log("Jetzt die Erklärung");

			var check = self.check_explanation(text);

			if(check == false) {
				self.process(text);
			}
		}

	}

	this.load_comms = function() {
		var url = "/engine/system_commands";

		$.ajax({
			type : "GET",
			url : url

		}).done(function(msg) {

			for(var i = 0; i < msg.items.length; i++) {
				var item = new EngineData.InventoryItem(msg.items[i].system_command);
				self.admin.public.operating_system.item_list.add(item);

				// s += item.attributes.key + '<br>';
			}

			// mega_machine.painter.paint_operating_system();
			self.admin.joint_messages.set_message("system", mega_machine.system_communication.info());

		});

	}

	this.deactivate = function() {
		$("#system_communication").fadeOut("fast");
		self.admin.check_null_communication("system");
	}

	this.position = function() {
		self.admin.interface_master.blink("os");

		current = $("#text_entry").position().left;
		left = $("#os_interaction").position().left + $("#Bar").position().left + 1;

		$('#text_entry').tween({
			left : {
				start : current,
				stop : left,
				time : 0,
				units : 'px',
				duration : 0.7,
				effect : 'easeInOut'
			},

		});

		$.play();
	}

	this.activate = function() {
		self.admin.set_communication_mode("system");
		self.position();
	}

	this.init_textlayer = function() {
		self.admin.joint_messages.system_filter = false;

		left = $("#Bar").position().left;
		width = $("#text_entry").width();

		tp = -400;

		var s = '<div id = "system_communication" class = "communication_layer">';
		s += '<div id = "system_exit" class = "textlayer_exit"><img src = "/images/new_interface/exit.svg"/></div>';
		s += '<div id = "system_inner_field"></div>';

		s += '</div>';

		$("#Neuland").append(s);
		$("#system_communication").hide();

		$("#system_communication").css({

			left : left,
			top : tp,
			width : width,
		});

		self.position();

		self.textlayer = $("#system_communication");
		self.load_comms();

		$("#system_exit").click(function() {
			mega_machine.system_communication.deactivate();
		});

	}

	this.trigger = function() {
		if(self.textlayer == null)
			self.init_textlayer();
		else
			self.admin.joint_messages.activate_filter("system");

		self.admin.joint_messages.show();
	}
}
/****************************************************** TEAM ***************************************************************/

Neuland.SocialCommunication = function(admin) {
	var self = this;
	this.admin = admin;
	this.textlayer = null;

	this.player = null;
	this.team = null;

	this.limited_range = 100;

	this.history = new Array();
	this.iterator = 0;

	this.joint_history = [];

	this.notify = function(data) {
		var s = '<div class = "social_message">'
		s += data;
		s += '</div>';
		self.admin.joint_messages.set_message("social", s);
	}

	this.formatted_time = function(time) {
		var now = new Date();

		var now_day = now.getDate();

		d = new Date(time);
		h = d.getHours();

		var day = d.getDate();

		if(now_day > day) {
			if(day < 10)
				day = "0" + day;

			month = d.getMonth() + 1;
			if(month < 10)
				month = "0" + month;

			if(h < 10)
				h = "0" + h;
			m = d.getMinutes();
			if(m < 10)
				m = "0" + m;

			return day + "." + month + ", " + h + ":" + m;
		} else {

			if(h < 10)
				h = "0" + h;

			m = d.getMinutes();
			if(m < 10)
				m = "0" + m;

			return h + ":" + m;
		}
	}

	this.get_user_name = function(id) {
		if(self.admin.public.player.ego.id == id)
			return self.admin.public.player.ego.username;

		for( i = 0; i < self.admin.public.player.ego.teammates.length; i++) {
			mate = self.admin.public.player.ego.teammates[i];

			if(mate.id == id)
				return mate.username;
		}
	}

	this.print_comment = function(note) {
		var s = '<li class = "LoggedInUser">';

		s += '<span class = "time">';
		s += self.formatted_time(note.created_at);
		s += '</span>';

		var name = self.get_user_name(note.player_id);

		s += '<a>' + name + ':</a>';

		s += '<div class = "message">';
		s += note.content;
		s += '</div>';

		s += '</li>';

		return s;
	}

	this.print_note = function(note) {
		n = note.notification_type;
		var comment = false;

		if(!n) {
			n = "loggedInUser";
			var s = self.print_comment(note);
			return s;
		} else {
			var s = '<li class = "' + n + '">';

			s += '<span class = "time">';
			// s += note.created_at;
			s += self.formatted_time(note.created_at);
			s += '</span>';

			s += '<p class = "notification">';
			s += note.content;
			s += '</p>';
			s += '</li>';

			return s;
		}

		/*
		 <li class="signin notification">
		 <div class="icon"></div>
		 <span class="time">10:22</span>
		 <p class="notification">Agent Kupfer1 hat sich eingeloggt.</p>
		 </li>
		 */
	}

	this.info = function() {
		self.player = self.admin.public.player;
		self.team = self.admin.public.player.actual_team;

		var s = '<div class = "social_communication_help">';
		s += "DIA Socializer, vs. 4.1.26, 2003-213<br>";
		s += "=====================================<br>";
		s += "For our registered agents only<br>";
		s += '</div>';

		if(self.team != null) {
			frage = self.team.notes;

			var limit = 0;
			if((self.team.notes.length - self.limited_range) > 0)
				limit = self.team.notes.length - self.limited_range;

			s += '<div class = "social_message">';

			for(var i = self.team.notes.length - 1; i > limit; i--) {
				self.joint_history.push(self.team.notes[i].note)

				s += self.print_note(self.team.notes[i].note);
			}

			if(self.team.notes.length > limit) {
				s += '<div onclick = "javascript:mega_machine.social_communication.read_all_messages()" class = "all_social_messages">';
				s += 'read more';
				s += '</div>';
			}

			s += '</div>';

			// alert("Anzahl der Notes " + self.team.notes.length);
		} else
			alert("Team ist noch unbesetzt");

		return s;
	}

	this.read_all_messages = function() {

		limit = self.team.notes.length - self.limited_range;

		var s = "";

		for(var i = limit; i > 0; i--) {
			s += self.print_note(self.team.notes[i].note);
		}

		$(".all_social_messages").html(s);

		$(".all_social_messages").css({
			"text-decoration" : "none",
			color : "purple",
		});

	}

	this.user_comment = function(text) {
		d = new Date().getTime();

		var s = '<div class = "social_message">';

		s += '<li class = "LoggedInUser">';

		s += '<span class = "time">';
		s += self.formatted_time(d);
		s += '</span>';

		var name = self.admin.public.player.ego.username;

		s += '<a>' + name + '</a>';

		s += '<div class = "message">';
		s += text;
		s += '</div>';

		s += '</li>';

		s += '</div>';

		return s;
	}

	this.input = function(text) {
		if(self.admin.public.status == "private") {
			self.history.push(text);

			var s = self.user_comment(text);

			// var s = '<div class = "social_message">' + text + '</div>';

			self.admin.joint_messages.set_message("social", s);

			$.post("/notes", {
				"content" : text,
			}, function(data) {

				// alert("angekommen");

			});

		}
	}

	this.deactivate = function() {
		$("#social_communication").fadeOut("fast");
		self.admin.check_null_communication("social");
	}

	this.position = function() {
		self.admin.interface_master.blink("team");

		current = $("#text_entry").position().left;
		left = $("#social_interaction").position().left + $("#Bar").position().left + 1;

		$('#text_entry').tween({
			left : {
				start : current,
				stop : left,
				time : 0,
				units : 'px',
				duration : 0.7,
				effect : 'easeInOut'
			},

		});

		$.play();
	}

	this.activate = function() {
		self.admin.set_communication_mode("social");
		self.position();

	}

	this.init_textlayer = function() {
		self.admin.joint_messages.social_filter = false;

		self.admin.joint_messages.set_message("social", self.info());

		left = $("#social_interaction").position().left + $("#Bar").position().left;

		tp = $("#Neuland").height() + 10;

		var s = '<div id = "social_communication" class = "communication_layer">';
		s += '<div id = "social_exit" class = "textlayer_exit"><img src = "/images/new_interface/exit.svg"/></div>';
		s += '</div>';

		$("#Neuland").append(s);

		$("#social_communication").hide();

		$("#social_communication").css({

			left : left,
			top : tp,
		});

		self.position();

		self.textlayer = $("#social_communication");

		$("#social_communication").mouseover(function() {

			$(".communication_layer").css("z-index", 1);
			$(this).css("z-index", 10);

		});

		$("#social_communication").mouseout(function() {
			mega_machine.reset_indices("team", this);
		});

		$("#social_communication").click(function() {

			mega_machine.social_communication.activate();
		});

		$("#social_exit").click(function() {

			mega_machine.social_communication.deactivate();
		});

	}

	this.trigger = function() {

		if(self.textlayer == null)
			self.init_textlayer();
		else
			self.admin.joint_messages.activate_filter("social");

		self.admin.joint_messages.show();
	}
}
/****************************************************** BOT ***************************************************************/

Neuland.BotCommunication = function(admin) {
	var self = this;
	this.admin = admin;

	this.textlayer = null;

	this.history = new Array();
	this.iterator = 0;

	this.eval_counter = 0;
	// Chapter 0.5

	this.deactivate = function() {
		$("#bot_communication").fadeOut("fast");
		self.admin.check_null_communication("bot");
	}

	this.position = function() {
		self.admin.interface_master.blink("bot");

		current = $("#text_entry").position().left;
		left = $("#bot_interaction").position().left + $("#Bar").position().left + 1;

		$('#text_entry').tween({
			left : {
				start : current,
				stop : left,
				time : 0,
				units : 'px',
				duration : 0.7,
				effect : 'easeInOut'
			},

		});

		$.play();
	}

	this.check_evaluation_mode = function(text) {

		if(mega_machine.public.player.ego.chapter_no == 0) {

			self.eval_counter++;

			if(text == "stop") {
				t = agent_evaluation.get_task("bot");
				if(t.solved == false) {
					if(self.eval_counter > 100)
						self.eval_counter = 100;

					var s = 'agent_evaluation.bot_conversation_done(' + self.eval_counter + ')';
					window.setTimeout(s, 7000);
				}

			}

		}

		/*
		 if (self.eval_counter == 5)
		 {
		 agent_evaluation.bot_conversation_done();
		 }
		 */
	}

	this.input = function(text) {
		self.check_evaluation_mode(text);

		self.history.push(text);

		var s = '<div class = "bot_message">' + text + '</div>';
		self.admin.joint_messages.set_message("bot", s);

		$.post("/console_queries", {

			"console_query[query]" : text,
		}, function(data) {

			var s = '<div class = "bot_answer">' + data.output + '</div>';

			mega_machine.bot_communication.history.push(data.output);

			mega_machine.joint_messages.set_message("bot", s);

			$("#text_entry input").val("");
			$("#text_entry input").focus();
		});

	}

	this.activate = function() {
		self.admin.set_communication_mode("bot");

		self.position();

	}

	this.init_textlayer = function() {
		self.admin.joint_messages.bot_filter = false;

		left = $("#bot_interaction").position().left + $("#Bar").position().left;

		tp = $("#Neuland").height() + 10;

		var s = '<div id = "bot_communication" class = "communication_layer">';
		s += '<div id = "bot_exit" class = "textlayer_exit"><img src = "/images/new_interface/exit.svg"/></div>';
		s += '</div>';

		$("#Neuland").append(s);

		$("#bot_communication").hide();

		$("#bot_communication").css({

			left : left,
			top : tp,
		});

		self.position();

		self.textlayer = $("#bot_communication");

		$("#bot_communication").mouseover(function() {

			$(".communication_layer").css("z-index", 1);
			$(this).css("z-index", 10);

		});

		$("#bot_communication").mouseout(function() {
			mega_machine.reset_indices("bot", this);
		});

		$("#bot_communication").click(function() {

			mega_machine.bot_communication.activate();
		});

		$("#bot_exit").click(function() {

			mega_machine.bot_communication.deactivate();
		});

	}

	this.trigger = function() {
		if(self.textlayer == null)
			self.init_textlayer();
		else
			self.admin.joint_messages.activate_filter("bot");

		self.admin.joint_messages.show();
	}
}
/****************************************************** Neuland ***************************************************************/
Neuland.ExternalQuery = function(key, text) {
	this.key = key;
	this.text = text;
}
/****************************************************** Database ***************************************************************/

Neuland.DatabaseCommunication = function(admin) {
	var self = this;
	this.admin = admin;

	this.textlayer = null;

	this.query_history = new Array();
	this.iterator = 0;

	this.history = new Array();
	this.div_history = new Array();

	this.wikipedia = null;
	this.last_wikipedia_search = null;
	this.wikipedia_articles = new Array();

	this.keywords = new Array();

	this.init_keywords = function() {
		self.keywords.push("cls");
		self.keywords.push("help");
	}

	this.wikipedia_search = function(text) {
		soundManager.play("console_found");

		self.last_wikipedia_search = text;
		var s = '<div class = "db_error">';
		s += "! scanning external servers...";
		s += '</div>';

		$("#db_inner_field").append(s);

		self.div_history.push(s);

		self.admin.joint_messages.set_message("db", s);

		if(self.wikipedia == null)
			self.wikipedia = new InfoMiner.Scraper(self.admin);
		self.wikipedia.wikipedia_request(text);
		// info_grabber.wikipedia_request(text);
	}

	this.reduced_version = function(text, no) {
		var offset = 550;

		if(text.length > offset) {

			var js = 'javascript:mega_machine.call_wikipedia(' + no + ')';

			// self.last_wikipedia_search

			t = text.slice(0, offset);

			t += ' ... ';

			t += '<span class = "read_more" onclick = "' + js + '">';

			t += ' mehr lesen';

			t += '</span>';

			return t;
		}

		return text;
	}

	this.short_entry = function(text) {
		no = self.wikipedia_articles.length;
		e = new Neuland.ExternalQuery(self.last_wikipedia_search, text);
		self.wikipedia_articles.push(e);

		self.reduced_version(text);

		var s = '<div class = "db_answer hyphenate">';
		// s += text;
		s += self.reduced_version(text, no);

		s += '</div>';

		$("#db_inner_field").append(s);

		self.div_history.push(s);
		// HISTORY
		self.admin.joint_messages.set_message("db", s);

		Hyphenator.run();
	}

	this.error_message = function() {
		var s = '<div class = "db_error">';
		s += "! no entry found";
		s += '</div>';

		$("#db_inner_field").append(s);

		self.div_history.push(s);
		// HISTORY

		self.admin.joint_messages.set_message("db", s);

	}

	this.get_external_source = function(text)// Wikipedia z.B.
	{
		return null;
	}

	this.command = function(text) {
		var s = "";

		switch(text) {
			case "cls":
				var s = 'DIA Database, vs. 17.3.1, 2003-2012<br>';
				s += '===================================<br>';

				$("#db_inner_field").html(s);
				break;

			case "help":
				var s = "HELP. The DIA database is easy to handle. just type the search term into the text entry field."
				s = '<div class = "db_answer"><< ' + s + '</div>';
				$("#db_inner_field").append(s);
				break;

		}

	}

	this.check_keyword = function(text) {
		res = false;
		for(var i = 0; i < self.keywords.length; i++) {
			if(self.keywords[i] == text) {
				self.command(text);
				res = true;
			}
		}

		return res;
	}

	this.check = function(text) {
		if(self.check_keyword(text) == false)
			self.check_query(text);
	}

	/*

	this.check_actions = function(item) {
	}
	*/

	this.check_action = function(item) {
		alert("Anzahl der Aktionen " + item.actions.length);

		var act = "";

		for(var n = 0; n < item.actions.length; n++) {
			act += item.actions[n].id;
			if(n != 0)
				act += " ";
		}

		return act;
	}

	this.commit = function(no) {

		$.post("/player_database_link_actions", {

			"database_link_id" : no,
		}, function(data) {

			ActionInvoker.runActions(data);

		});
	}

	this.check_links = function(item) {
		var laction = "";

		if(item.attributes.database_links.length > 0) {
			for(var k = 0; k < item.attributes.database_links.length; k++) {
				link = item.attributes.database_links[k];

				var data = link.id;

				var script = 'javascript: mega_machine.db_communication.commit(' + data + ')';

				laction += '<div class = "db_link" data = "' + data + '"   onclick = "' + script + '"> --> ' + link.description + '</div>';

				// alert(laction);
			}
		}

		return laction;
	}

	this.check_instant_action = function(item) {
		if(item.attributes.actions.length > 0) {
			var s = "db " + item.attributes.key;

			$.post("/console_queries", {

				"console_query[query]" : s,
			}, function(data) {
			ActionInvoker.runActions(data.actions);
			});
		}
	}

	this.check_query = function(text) {

		self.history.push(text);
		self.query_history.push(text);

		// NUR LOG
		self.admin.system_tracker.log("search_database", text);

		var s = '<div class = "db_query">>> ' + text + '</div>';

		$("#db_inner_field").append(s);
		self.div_history.push(s);
		// HISTORY

		self.admin.joint_messages.set_message("db", s);

		m = self.query(text);

		if(m) {
			
			if (self.security_block == false)
				{
				self.check_instant_action(m);

				var s = '<div class = "db_answer"><< ' + m.attributes.description + '</div>';

				s += self.check_links(m);

				$("#db_inner_field").append(s);

				self.div_history.push(s);
				// HISORY

				self.admin.joint_messages.set_message("db", s);
				}
				

		} else {
			// self.error_message();
			self.wikipedia_search(text);
		}
	}


    this.security_block = false;


	this.check_security_level = function(item) {
		
		self.security_block = false;
		
		if(item.attributes.required_level > 0) {
			if(self.admin.public.status == "public") {
				self.admin.dialog.feedback("This is confidential information. Only registered agents will have access");
				return false;
			} else {

				if(mega_machine.public.player.ego.level >= item.attributes.required_level)
					return true;
				else
					{
					self.security_block = true;
					return false;
					}
			}
		}

		return true;
	}


	this.check_actions = function(item)
	{
	if (item.attributes.actions.length > 0)
		{
		alert("an diesem Datenbankeintrag hängen Aktionen ");	
		}
	}
	
	this.single_query = function(text) {
		var result = null;

		for(var i = 0; i < item_list.length; i++) {
			item = item_list.at(i);
			if(item.attributes.key == text) {
				var res = self.check_security_level(item);
				if(res == true)
					{
					
					result = item;
					}
					
				else {
					var msg = "============== !BEWARE! =================<br>";
					msg += "You do not have the necessary security level for this information."
					self.admin.dialog.feedback(msg);
					
					result = "access forbidden";
				}
			}
		}
		return result;
	}

	this.regular_expression = function(text) {

	}

	this.external_source = function(text) {
		return null;
	}

	this.query = function(text) {
		if(mega_machine.public.status == "public")
			mega_machine.cookie_manager.increment_attribute("database", 1);
		else {
			if(mega_machine.public.player.ego.chapter_no == 0) {
				if(text == "Sheikh Salamat Parveen")
					agent_evaluation.internet_solved();
			}
		}

		item_list = self.admin.public.data_system.item_list;

		result_item = self.single_query(text);

		if(result_item == null)
			result_item = self.single_query(text.toLowerCase());

		if(result_item == null)
			result_item = self.single_query(text.capitalize());

		if(result_item == null)
			result_item = self.single_query(text.toUpperCase());

		if(result_item == null)
			result_item = self.get_external_source(text);

		return result_item;
	}

	this.load_process = false;

	this.load_db = function() {
		if(self.load_process == false) {
			self.load_process = true;
			self.load_entries();
		}
	}

	this.load_entries = function() {
		self.load_process = true;

		var url = "/engine/database_entries";

		$.ajax({
			type : "GET",
			url : url

		}).done(function(msg) {

			for(var i = 0; i < msg.length; i++) {
				d = msg[i];
				self.admin.public.data_system.item_list.add(d);
			}

		});

	}

	this.scrape_wikipedia = function(text) {

	}

	this.deactivate = function() {
		self.admin.check_null_communication("db");
		$("#db_communication").fadeOut("fast");
	}

	this.position = function() {
		self.admin.interface_master.blink("db");

		current = $("#text_entry").position().left;
		left = $("#db_interaction").position().left + $("#Bar").position().left + 1;

		$('#text_entry').tween({
			left : {
				start : current,
				stop : left,
				time : 0,
				units : 'px',
				duration : 0.7,
				effect : 'easeInOut'
			},

		});

		$.play();
	}

	this.activate = function() {
		self.admin.set_communication_mode("db");
		self.position();

	}

	this.init_textlayer = function() {
		self.admin.joint_messages.db_filter = false;

		self.init_keywords();
		self.load_entries();

		left = $("#db_interaction").position().left + $("#Bar").position().left;

		tp = $("#Neuland").height() + 10;

		var s = '<div id = "db_communication" class = "communication_layer">';
		s += '<div id = "db_exit" class = "textlayer_exit"><img src = "/images/new_interface/exit.svg"/></div>';
		s += '<div id = "db_inner_field">';
		s += 'DIA Database, vs. 17.3.1, 2003-2012<br>';
		s += '===================================<br>';
		s += '</div>';
		s += '</div>';

		$("#Neuland").append(s);

		$("#db_communication").css({

			left : left,
			top : tp,
		});

		$("#db_communication").hide();

		self.position();

		self.textlayer = $("#db_communication");

		$("#db_communication").mouseover(function() {

			$(".communication_layer").css("z-index", 1);
			$(this).css("z-index", 10);

		});

		$("#db_communication").mouseout(function() {
			mega_machine.reset_indices("db", this);
		});

		$("#db_communication").click(function() {

			mega_machine.db_communication.activate();

		});

		$("#db_exit").click(function() {

			mega_machine.db_communication.deactivate();
		});

	}

	this.trigger = function() {
		if(self.textlayer == null)
			self.init_textlayer();
		else
			self.admin.joint_messages.activate_filter("db");

		self.admin.joint_messages.show();
	}
}
/**************************************************** MAYIL *******************************************************************/

Neuland.MailCommunication = function(admin) {
	var self = this;
	this.admin = admin;

	this.textlayer = null;

	this.keywords = new Array("in", "out", "unread");

	this.history = new Array();
	this.iterator = 0;

	this.new_message = function(msg) {
		// alert("Mail Communication, bekomme eine neue Nachricht");

		var s = '<div class = "private_message_container">';
		s += msg.template;
		s += '</div>';

		self.admin.joint_messages.set_message("mail", s);

		$("#messages_body a.private_message_link").live("click", function() {
			var data;
			data = $(this).data();
			ActionInvoker.invoke("/player_private_message_link_actions?private_message_id=" + data.private_message_id + "&key=" + data.key);
			return false;
		});

	}

	this.perform_command = function(key) {
		switch(key) {
			case "in":
				alert("alle eigehenden Mails");
				break;

			case "out":
				alert("alle ausgehenden Mails");
				break;
		}
	}

	this.check_keywords = function(text) {
		for(var i = 0; i < self.keywords.length; i++) {
			if(text == self.keywords[i])
				return true;
		}

		return false;
	}

	this.input = function(text) {
		if(self.admin.public.status == "private") {
			self.history.push(text);

			if(self.check_keywords(text) == true) {
				self.admin.public.mail_system.command(text);
			} else
				self.admin.public.mail_system.search(text);

		} else {
			var s = '<div class = "Mailer">';
			s += 'DIA Mail System, version 11.17.1<br>'
			s += "===================================<br>"
			s += self.admin.player_messages.message("mail search not allowed");
			s += '</div>';
			self.admin.joint_messages.set_message("mail", s);
		}
	}

	this.deactivate = function() {
		$("#mail_communication").fadeOut("fast");
		self.admin.check_null_communication("mail");
	}

	this.position = function() {
		self.admin.interface_master.blink("mail");

		current = $("#text_entry").position().left;
		left = $("#mail_interaction").position().left + $("#Bar").position().left + 1;

		$('#text_entry').tween({
			left : {
				start : current,
				stop : left,
				time : 0,
				units : 'px',
				duration : 0.7,
				effect : 'easeInOut'
			},

		});

		$.play();
	}

	this.activate = function() {
		self.admin.set_communication_mode("mail");
		self.position();
	}






	this.check_player = function() {

		if(self.admin.public.status == "private") {
			var url = "/engine/pms/";

			$.ajax({
				type : "GET",
				url : url

			}).done(function(msg) {

				for(var i = 0; i < msg.sent.length; i++) {
					mega_machine.public.mail_system.outgoing.add(msg.sent[i]);
				}

				for(var i = 0; i < msg.received.length; i++) {
					mega_machine.public.mail_system.incoming.add(msg.received[i]);
				}

				mega_machine.public.mail_system.short_view();

			});
		} else {
			// not registered yet
			var s = '<div class = "Mailer">';
			s += 'DIA Mail System, version 11.17.1<br>'
			s += "===================================<br>"

			s += self.admin.player_messages.message("mail system not available");

			s += '</div>';

			self.admin.joint_messages.set_message("mail", s);
		}

	}

	this.init_textlayer = function() {
		if (mega_machine.public.mail_system.incoming.length == 0)
			{
			self.check_player();
			}
		else mega_machine.public.mail_system.short_view();

		left = $("#mail_interaction").position().left + $("#Bar").position().left;

		tp = $("#Neuland").height() + 10;

		var s = '<div id = "mail_communication" class = "communication_layer">';
		s += '<div id = "mail_exit" class = "textlayer_exit"><img src = "/images/new_interface/exit.svg"/></div>';
		s += '</div>';

		$("#Neuland").append(s);

		$("#mail_communication").hide();

		$("#mail_communication").css({

			left : left,
			top : tp,
		});

		self.position();

		self.textlayer = $("#mail_communication");

		$("#mail_communication").mouseover(function() {

			$(".communication_layer").css("z-index", 1);
			$(this).css("z-index", 10);

		});

		$("#mail_communication").mouseout(function() {
			mega_machine.reset_indices("mail", this);
		});

		$("#mail_communication").click(function() {

			mega_machine.mail_communication.activate();
		});

		$("#mail_exit").click(function() {

			mega_machine.mail_communication.deactivate();
		});

	}

	this.trigger = function()// Das ist die Funtion
	{
		if(self.textlayer == null)
			self.init_textlayer();

		self.admin.joint_messages.activate_filter("mail");

		self.admin.joint_messages.show();
	}
}
/****************************************************** Acquaintance *****************************************************/
Neuland.Acquaintance = function(admin) {
	this.inventory = null;
	this.friends = null;
	this.achievements = null;
	this.settings = null;
	this.journal = null;
}
/****************************************************** Ende Kommunikation *****************************************************/

Neuland.Personal = function(admin) {
	var self = this;
	this.admin = admin;

	this.inventory = null;
	this.friends = null;
	this.achievements = null;
	this.settings = null;
	this.journal = null;

	this.file = null;

	this.active_page = null;
	this.player = null;

	this.acquaintance_mode = false;

	this.page_built = false;
	// Dann ist die Seite noch nicht aufgerufen worden


	this.add_friendship_request = function(msg)
	{
	var x = document.getElementById("friendlist");
	if (!x)
		{
		mega_machine.personal_page_toggle();	
		}
		
		
	data = msg.friend;
	personnel = data;

	s += '<div class = "friend_request_container" id = "friendship_request_' + data.id + '">';

	s += '<div class = "avatar">'
	s += '<img src = "' + data.avatar_url + '"/>';
	s += '</div>';

	///

	s += '<div class = "info">';
	s += '<div class = "user">';
	s += data.username;
	s += '</div>';

	s += '<div class = "small">';
	s += "security level: " + data.level;
	s += '</div>';

	s += '<div class = "small">';
	s += "friends: " + data.friends_count;
	s += '</div>';

	s += '</div>';

	s += '<div class = "accept" onclick = "' + self.friends.get_accept_script(msg.friendship_id) + '">ACCEPT</div>';
	s += '<div class = "decline" onclick = "' + self.friends.get_decline_script(msg.friendship_id) + '">DECLINE</div>';

	///
	s += '</div>';


	if (x)
		{
	
		$("#friendlist").prepend(s);
		console.log ("Anfrage hinzugefügt");
		}
	else
		{
		
		$("#friendlist").prepend(s);	
		}	
		
		
	}


	this.check_init = function() {
		if(self.page_built == false) {
			self.page_built = true;
			mega_machine.personal_page_toggle();
			self.automatic_interaction();

		}
	}

	this.update_friends = function() {
		var url = "/engine/get_friends";

		$.ajax({
			type : "GET",
			url : url

		}).done(function(data) {

			mega_machine.public.player.ego.friends = data.friends;

			mega_machine.personal.friends.repaint();
		});

	}

	this.accept_friendship = function(id) {
		var n = "#friendship_request_" + id;
		$(n).remove();

		return $.ajax({
			type : "PUT",
			url : "/friendships/" + id + "?accept=true",
			contentType : "application/json",
			processData : false,
			data : "{}",
			success : function(data) {

				testfall = data;

				mega_machine.public.player.remove_friendship_request(id);
				mega_machine.personal.update_friends();

			}
		});

	}

	this.decline_friendship = function(id) {
		self.admin.public.player.remove_friendship_request(id);

		var n = "#friendship_request_" + id;
		$(n).remove();

		return $.ajax({
			type : "PUT",
			url : "/friendships/" + id + "?reject=true",
			contentType : "application/json",
			processData : false,
			data : "{}",
			success : function(data) {

			}
		});

	}

	this.load_acquaintances = function(list) {
		for( i = 0; i < list.length; i++) {
			self.load_acquaintance(list[i]);
		}
	}

	this.load_acquaintance = function(id) {
		self.player = self.admin.public.player;
		var personnage = self.player.check_acquaintance(id);

		if(!personnage) {
			var url = "/engine/players/" + id;

			$.ajax({
				type : "GET",
				url : url

			}).done(function(data) {

				mega_machine.public.player.acquaintances.push(data);
			});

		}

	}

	this.total_refresh = function() {
		var pic = self.get_agent_pic();

		$("#PPContainer").html("");

		$("#PersonalAgent").html(pic);

		self.acquaintance_mode = false;

		$("#PPContainer").html(self.personal_backup);

	    $(".MindmapTrigger").hide();


		$("#PersonalAgentName").html(mega_machine.public.player.ego.username);

		mega_machine.personal_page_toggle();
		/*
		 if (self.friends) 			self.friends.repaint();

		 if (self.inventory) 		self.inventory.repaint();
		 $("#inventory").hide();

		 if (self.achievements) 		self.achievements.repaint();
		 $("#achievements").hide();
		 */
	}

	this.check_friend = function(person) {
		for(var i = 0; i < person.friends.length; i++) {
			f = person.friends[i];
			if(f.id == mega_machine.public.player.ego.id) {
				return true;
			}
		}
		return false;
	}

	this.send_friendship_request = function(id) {
		$.post("/friendships", {
			"friend_id" : id
		},function(){

		$(".become_friend").hide();
		});



	}

	this.personal_backup = "";
	// hier ist der letzte Stand verzeichnet

	this.paint_acquaintance = function(person) {
		acquaintance_mode = true;

		divtest = person;


		$(".closeMiddleWindow").show();

		// $("#PersonalPage").css("backgroundColor", "rgb(48,32,32)");

		var s = '<img src = "' + person.avatar_url + '"/>';
		$('#PersonalAgent').html(s);
		
		$(".MindmapTrigger").hide();
		

		var s = "";

		var befriended = self.check_friend(person);
		// alert( befriended);

		if(befriended == false) {

			s += '<div class = "become_friend" data = "' + person.id + '">';
			s += "BECOME A FRIEND";
			s += '</div>';
			$("#PersonalAgent").append(s);

			$("#PersonalAgentName").html(person.username);

			$(".become_friend").click(function() {

				id = $(this).attr("data");
				var command = "mega_machine.personal.send_friendship_request(" + id + ")";

				// alert(command);

				var rq = mega_machine.public.messages.get("friendship_request");
				mega_machine.dialog.confirmation(rq, command);

				// mega_machine.personal.send_friendship_request(id);
			});
		}

		$("#PPContainer").html("");

		var s = '<div id = "friendlist">';

		for( i = 0; i < person.friends.length; i++) {
			f = person.friends[i];

			s += '<div class = "friend_container" id = "friend_' + f.id + '">';

			s += '<div class = "avatar">'
			s += '<img src = "' + f.avatar_url + '"/>';
			s += '</div>';

			s += '<div class = "info">';
			s += '<div class = "user">';
			s += f.username;
			s += '</div>';

			s += '<div class = "small">';
			s += "security level: " + f.level;
			s += '</div>';

			/*
			 s += '<div class = "small">';
			 s += "mission: " +  f.chapter;
			 s += '</div>';
			 */

			s += '<div class = "small">';
			s += "friends: " + f.friends_count;
			s += '</div>';

			s += '</div>';

			var identify = "friend_achievements_" + f.id;
			s += '<div id = "' + identify + '" class = "friend_achievements">';

			for(var j = 0; j < f.achievements.positive.length; j++) {
				s += '<div class = "achievement">';
				s += '<img src = "' + f.achievements.positive[j].icon_positive_big + '"/>';
				s += '</div>';
			}

			s += '</div>';

			if(befriended == false)
				console.log("sollte einen Button hinzufügen ");

			s += '</div>';

		}

		s += '</div>';

		//////////////////////////// INVENTORY ///////////////////////////////// GGG

		s += '<div id = "inventory">';

		for( i = 0; i < person.player_items.length; i++) {
			item = person.player_items[i];

			no = item.inventory_item_id;

			id = "inventory_item_id_" + no;

			js = 'javascript:mega_machine.personal.inventory.inventory_item(' + no + ')';

			s += '<div id = "' + id + '" class = "player_item" onclick = "' + js + '">';

			s += '<img src = "' + item.image + '"/>';

			s += '<div class = "player_item_count" id = "inventory_item_count_' + no + '">';
			s += item.quantity;
			s += '</div>';

			s += '<div class = "player_item_overlay">';

			s += item.description;

			s += '</div>';

			s += '</div>';

		}

		s += '</div>';

		///////////////////////////////////////// ENDE INVENTORY

		s += '<div id = "achievements">';

		for(var i = 0; i < person.achievements.positive.length; i++) {
			s += '<div class = "pos_achievement">';

			achievement = person.achievements.positive[i];
			icon = achievement.icon_positive_big;

			s += '<img src = "' + icon + '"/>';
			s += '</div>';
		}

		for(var i = 0; i < person.achievements.negative.length; i++) {
			s += '<div class = "neg_achievement">';

			achievement = person.achievements.negative[i];
			icon = achievement.icon_negative_big;

			s += '<img src = "' + icon + '"/>';
			s += '</div>';
		}

		s += '</div>';

		////////////////////////////////////////////////////////////////////////

		$("#PPContainer").html(s);

		self.hide_personal_tabs();

	}

	this.hide_personal_tabs = function() {
		$("#bt_PersonalMail").hide();
		$("#bt_PersonalDiary").hide();
		$("#bt_PersonalSettings").hide();

		$("#bt_PersonalFile").hide();
		// NEU

		$("#friendlist").hide();
		$("#inventory").hide();
		$("#achievements").hide();

		$("#file").hide();
	}

	this.show_personal_tabs = function() {
		$("#bt_PersonalMail").show();
		$("#bt_PersonalDiary").show();
		$("#bt_PersonalSettings").show();
		$("#bt_PersonalFile").show();
	}

	this.show_acquaintance = function(person) {
		if(self.acquaintance_mode == false) {
			self.personal_backup = $("#PPContainer").html();
		}

		$("#PersonalAgentName").html(person.username);
		// XYZ

		self.acquaintance_mode = true;

		self.admin.bar_slider_on();
		self.set_tabs();
		mega_machine.joint_messages.hide();
		mega_machine.ruler.hide_bar();

		self.paint_acquaintance(person);
	}

	this.acquaintance_info = function(id) {
		self.player = self.admin.public.player;
		var personnage = self.player.check_acquaintance(id);

		if(personnage) {
			self.show_acquaintance(personnage);
		} else {

			var url = "/engine/players/" + id;

			$.ajax({
				type : "GET",
				url : url

			}).done(function(data) {

				mega_machine.public.player.acquaintances.push(data);
				var personnage = mega_machine.public.player.check_acquaintance(data.id);
				mega_machine.personal.show_acquaintance(personnage);

			});

		}

	}

	this.init = function() {

	}

	this.hide_page = function(type) {
		switch(type) {
			case "settings":
				$("#settings").hide();
				break;

			case "achievements":
				$("#achievements").hide();
				break;

			case "friends":
				$("#friendlist").hide();
				break;

			case "inventory":
				$("#inventory").hide();
				break;

			case "journal":
				$("#journal").hide();
				break;

			case "mail":
				$("#mail").hide();
				break;

			case "file":
				$("#file").hide();
				break;

		}
	}


	this.active_window = function(type)
	{
	switch(type)
		{
		case "mail":
			self.activate_mail();
			self.set_title("_mail");
				
			$(".personal_icon_text").removeClass("active");
			$("#bt_PersonalMail .personal_icon_text").addClass("active");
		
		break;	
		
		case "inventory":
			self.activate_inventory();
			self.set_title("_inventory");
				
			$(".personal_icon_text").removeClass("active");
			$("#bt_PersonalInventory .personal_icon_text").addClass("active");
		
		break;
		
		
		case "friends":
			self.activate_friends();
			self.set_title("_friends");
				
			$(".personal_icon_text").removeClass("active");
			$("#bt_PersonalFriends .personal_icon_text").addClass("active");
		
		break;					


		case "achievements":
			self.activate_achievements();
			self.set_title("_achievements");
				
			$(".personal_icon_text").removeClass("active");
			$("#bt_PersonalAchievements .personal_icon_text").addClass("active");
		
		break;	

		case "journal":
			self.activate_journal();
			self.set_title("_journal");
				
			$(".personal_icon_text").removeClass("active");
			$("#bt_PersonalJournal .personal_icon_text").addClass("active");
		
		break;	


		case "settings":
			self.activate_settings();
			self.set_title("_settings");
				
			$(".personal_icon_text").removeClass("active");
			$("#bt_PersonalSettings .personal_icon_text").addClass("active");
		
		break;	

		case "file":
			self.activate_file();
			self.set_title("_file");
				
			$(".personal_icon_text").removeClass("active");
			$("#bt_PersonalFile .personal_icon_text").addClass("active");
		
		break;	

		
		}	
	}



	this.set_active_page = function(type) {
		if(self.active_page != null) {
			if(self.active_page != type) {
				self.hide_page(self.active_page);
				// die alte Seite
				self.active_page = type;
			}

		} else
			self.active_page = type;
	}

	this.activate_mail = function() {
		if(self.admin.public.status == "public")
			alert("nur für registrierte Spieler");
		{

			if(self.mail == null)
				self.mail = new Neuland.Mail(self.admin);
			else
				self.mail.show();

			self.set_active_page("mail");
		}
	}

	this.activate_file = function() {
		if(self.admin.public.status == "public")
			alert("nur für registrierte Spieler");
		{
			if(self.file == null)
				self.file = new Neuland.AgentFile(self.admin);
			else
				self.file.show();

			self.set_active_page("file");
		}
	}

	this.activate_journal = function() {
		if(self.admin.public.status == "public")
			alert("nur für registrierte Spieler");
		{

			if(self.journal == null)
				self.journal = new Neuland.Journal(self.admin);
			else
				self.journal.show();

			self.set_active_page("journal");
		}
	}

	this.activate_settings = function() {
		if(self.admin.public.status == "public")
			alert("nur für registrierte Spieler");
		else {
			if(self.settings == null)
				self.settings = new Neuland.Settings(self.admin);
			else
				self.settings.show();

			self.set_active_page("settings");
		}
	}

	this.activate_achievements = function() {
		if(self.admin.public.status == "public")
			alert("nur für registrierte Spieler");
		else {
			if(self.achievements == null)
				self.achievements = new Neuland.Achievements(self.admin);
			else
				self.achievements.show();

			self.set_active_page("achievements");
		}
	}

	this.activate_friends = function() {
		if(self.admin.public.status == "public")
			alert("nur für registrierte Spieler");
		else {
			if(self.friends == null)
				self.friends = new Neuland.Friendlist(self.admin);
			else
				self.friends.show();

			self.set_active_page("friends");
		}
	}

	this.activate_inventory = function() {
		if(self.admin.public.status == "public")
			alert("nur für registrierte Spieler");
		else {
			if(self.inventory == null)
				self.inventory = new Neuland.Inventory(self.admin);
			else
				self.inventory.show();

			self.set_active_page("inventory");
		}
	}

	this.hide = function() {
		$('#PersonalPage').css({
			height : 0
		});

	}

	this.get_agent_pic = function() {
		if(self.admin.public.status == "private") {
			return '<img src = "' + self.admin.public.player.ego.large_avatar_url + '"/>';
		} else
			return "Spieler unbekannt";
	}

	this.create_friend_page = function(id) {
		var s = '<div id = "FriendPage">';

		s += '<div id = "PPContainer"></div>';

		s += '<div id = "PersonalAgent">';

		// s += self.get_agent_pic();

		s += '</div>';

		s += '<div id = "PersonalPageTitle">';
		s += '_inventory';
		s += '</div>';

		s += '</div>';
		$("body").append(s);

	}

	this.create_personal_page = function() {
		mega_machine.public.bulletin.load();

		self.page_built = true;

		var s = '<div id = "PersonalPage">';

		s += '<div class = "News">';
		s += '<div id = "Bulletin"></div>';
		s += '</div>';

		s += '<div class = "InfoGrafix">';

		s += '<div id = "SparklineTest" class = "sparkline"></div>';

		s += '</div>';

		s += '<div id = "PPContainer"></div>';

		s += '<div id = "AgentPic">';

		s += '</div>';

		s += '<div id = "PersonalPageTitle">';
		s += '_inventory';
		s += '</div>';

		s += '</div>';
		$("body").append(s);

		s = self.get_agent_pic();
		$("#PersonalAgent").html(s);

		$("#PersonalAgentName").html("Agent " + mega_machine.public.player.ego.username);

		$("#PersonalAgent").click(function() {
			if(mega_machine.personal.acquaintance_mode == false) {
				mega_machine.personal_page_toggle();
			}
		});

		$('.sparkline').sparkline();

		var myvalues = [10, 8, 5, 7, 4, 4, 1, 99, 33, 277, 66, 199, 102];
		// $('#SparklineTest').sparkline(myvalues);
	}

	this.set_title = function(text) {
		$("#PersonalPageTitle").html(text);
	}

	this.hide_tabs = function() {
		$("#tools").html(" ");

		$("#file").hide();
		// schmutzig
	}

	this.automatic_interaction = function() {

		self.activate_inventory();
		self.set_title("_inventory");

		$(".personal_icon_text").removeClass("active");
		$("#bt_PersonalInventory .personal_icon_text").addClass("active");

		self.activate_achievements();
		self.set_title("_achievements");

		$(".personal_icon_text").removeClass("active");
		$("#bt_PersonalAchievements .personal_icon_text").addClass("active");

		self.activate_friends();
		self.set_title("_friends");

		$(".personal_icon_text").removeClass("active");
		$("#bt_PersonalFriends .personal_icon_text").addClass("active");

	}

	this.set_personal_interaction = function() {
		$("#bt_PersonalInventory").click(function() {
			self.activate_inventory();
			self.set_title("_inventory");

			$(".personal_icon_text").removeClass("active");
			$("#bt_PersonalInventory .personal_icon_text").addClass("active");
		});

		$("#bt_PersonalFriends").click(function() {
			// alert("sollte Freunde anzeigen");
			self.activate_friends();
			self.set_title("_friends");

			$(".personal_icon_text").removeClass("active");
			$("#bt_PersonalFriends .personal_icon_text").addClass("active");
		});

		$("#bt_PersonalAchievements").click(function() {

			self.activate_achievements();
			self.set_title("_achievements");

			$(".personal_icon_text").removeClass("active");
			$("#bt_PersonalAchievements .personal_icon_text").addClass("active");
		});

		$("#bt_PersonalSettings").click(function() {
			self.activate_settings();
			self.set_title("_settings");

			$(".personal_icon_text").removeClass("active");
			$("#bt_PersonalSettings .personal_icon_text").addClass("active");
		});

		$("#bt_PersonalDiary").click(function() {
			self.activate_journal();
			self.set_title("_journal");

			$(".personal_icon_text").removeClass("active");
			$("#bt_PersonalDiary .personal_icon_text").addClass("active");
		});

		$("#bt_PersonalMail").click(function() {
			self.activate_mail();
			self.set_title("_mail");

			$(".personal_icon_text").removeClass("active");
			$("#bt_PersonalMail .personal_icon_text").addClass("active");
		});

		$("#bt_PersonalFile").click(function() {

			self.activate_file();
			self.set_title("_file");

			$(".personal_icon_text").removeClass("active");
			$("#bt_PersonalFile .personal_icon_text").addClass("active");

		});

	}

	this.acquaintance_tabs = function() {
		alert("Interaktion für die Kolleegen ");
	}

	this.first_time = function() {
		self.automatic_interaction();
	}

	this.set_tabs = function() {
		var s = "";

		/*
		 s   += '<div id = "bt_PersonalInventory" class = "MapGrid"  title "inventory"><img src = "/images/new_interface/white_box.svg"/></div>';
		 s 	+= 	 '<div id = "bt_PersonalFriends"  class = "MapGrid" title "friends"><img src = "/images/new_interface/group_white.svg"/></div>';
		 s 	+= 	 '<div id = "bt_PersonalAchievements"  class = "MapGrid" title "achievements"><img src = "/images/new_interface/badge.svg"/></div>';
		 s 	+= 	 '<div id = "bt_PersonalDiary"  class = "MapGrid" title "diary"><img src = "/images/new_interface/notebook.svg"/></div>';

		 s 	+= 	 '<div id = "bt_PersonalMail"  title "mail"><img src = "/images/new_interface/mail_white.png"/></div>';

		 s 	+= 	 '<div id = "bt_PersonalSettings"  title "settings"><img src = "/images/new_interface/gear.svg"/></div>';
		 */

		s += '<div id = "bt_PersonalInventory" class = "PersonalGrid"  title "inventory">';
		s += '<div class = "personal_icon_text">INVENTORY</div>';

		s += '</div>';

		s += '<div id = "bt_PersonalFriends"  class = "PersonalGrid" title "friends">';
		s += '<div class = "personal_icon_text">FRIENDS</div>';
		s += '</div>';

		s += '<div id = "bt_PersonalAchievements"  class = "PersonalGrid" title "achievements">';
		s += '<div class = "personal_icon_text">ACHIEVEMENTS</div>';
		s += '</div>';

		s += '<div id = "bt_PersonalMail"  class = "PersonalGrid" title "mail">';
		s += '<div class = "personal_icon_text">MAILBOX</div>';
		s += '</div>';

		s += '<div id = "bt_PersonalDiary"  class = "PersonalGrid" title "diary">';
		s += '<div class = "personal_icon_text">JOURNAL</div>';
		s += '</div>';

		s += '<div id = "bt_PersonalSettings" class = "PersonalGrid" title = "settings">';
		s += '<div class = "personal_icon_text">SETTINGS</div>';
		s += '</div>';

		s += '<div id = "bt_PersonalFile" class = "PersonalGrid" title = "settings">';
		s += '<div class = "personal_icon_text">FILE</div>';
		s += '</div>';

		$("#personal_tools").html(s);

		self.set_personal_interaction();

		self.admin.system_tracker.hide();

		self.first_time();

	}

	self.init();
}

Neuland.SystemTracker = function(admin) {
	var self = this;
	this.admin = admin;

	this.visible = false;

	this.commands = new Array();
	this.range = 50;
	this.max_size = 800;
	this.iterator = 0;
	this.changed_array = false;

	this.sys_command = new Array();

	this.div = null;

	this.log = function(command, param) {
		var s = command + '("' + param + '")';
		self.add_element(s);
	}

	this.log_message = function(text) {
		self.add_element(text);
	}

	this.add_element = function(st) {
		self.commands.push(st);
		self.iterator++;

		if(self.iterator > 4500) {
			end = self.commands.length - 1;
			start = end - self.range;
			var list = self.commands.slice(start, end);

			self.commands = [];

			for(var i = 0; i < list.length; i++) {
				self.commands.push(list[i]);
			}
			self.iterator = self.commands.length;
		}

		self.changed_array = true;
	}

	this.fancy_commands = function() {
		rnd = Math.random();

		if(rnd < 0.05) {
			nr = parseInt(Math.random() * self.sys_command.length);

			self.add_element(self.sys_command[nr]);
		}
	}

	this.create_div = function() {
		var s = '<div id = "SystemWidget">';

		// s += '<div class = "arrow"></div>';

		// s += '<div id = "activity_header">ACTIVITY_LOG</div>';
		s += '<div id = "activity"></div>';

		// s += '<div id = "system_log_header">SYSTEM_LOG</div>';
		s += '<div id = "SystemLog"></div>';

		s += '</div>';

		s += '<div id = "SystemWidgetArrow"></div>';

		$("body").append(s);

		// self.div = $("#SystemLog");
		self.div = $("#SystemWidget");

		// self.show();

		// w = window.innerWidth * 0.85;
		// self.div.css("left", w);

		/*
		 $("#SystemWidget .arrow").click(function(){

		 mega_machine.system_tracker.slide_toggle();
		 });
		 */

		$("#SystemWidgetArrow").css("left", window.innerWidth - 42);

		$("#SystemWidgetArrow").click(function() {

			mega_machine.system_tracker.slide_toggle();
		});

	}

	this.visible_widget = function() {
		$("#SystemWidget").fadeIn();
	}

	this.hide_widget = function() {
		this.visible = false;

		self.div.animate({
			left : window.innerWidth,

		}, 900, function() {

			$("#SystemWidget").hide();
			var s = "mega_machine.system_tracker.visible_widget()";
			window.setTimeout(s, 2000);

		});
	}

	this.slide_toggle = function() {
		var l = $("#SystemWidgetArrow").position().left;
		if(l < window.innerWidth * 0.86) {
			this.visible = false;

			$("#SystemWidgetArrow").animate({
				left : window.innerWidth - 42,
			}, 900, function() {
			});

			self.div.animate({
				left : window.innerWidth,
			}, 900, function() {
				this.visible = true;
				$("#SystemWidget").hide();
			});

		} else {
			this.visible = true;

			self.div.css("left", window.innerWidth);
			self.div.show();

			// OPEN
			$("#SystemWidgetArrow").animate({
				left : window.innerWidth * 0.82,
			}, 900, function() {
			});

			self.div.animate({
				left : window.innerWidth * 0.85,
			}, 900, function() {
			});

		}

	}

	this.slide_toggle_old = function() {
		var l = $("#SystemWidgetArrow").position().left;
		if(l < window.innerWidth * 0.86) {
			$("#SystemWidget").show();

			$("#SystemWidgetArrow").animate({
				left : window.innerWidth - 42,
			}, 900, function() {
			});

			self.div.animate({
				left : window.innerWidth,
			}, 900, function() {
				this.visible = true;
				$("#SystemWidget").hide();
			});

		} else {
			this.visible = true;
			self.div.show();

			if(mega_machine.public.status == "public")
				mega_machine.cookie_manager.increment_attribute("system_tracker", 1);

			// OPEN
			$("#SystemWidgetArrow").animate({
				left : window.innerWidth * 0.82,
			}, 900, function() {
			});

			self.div.animate({
				left : window.innerWidth * 0.85,
			}, 900, function() {
			});

		}

	}

	this.slide_toggle_old = function() {

		if(self.div.position().left == window.innerWidth) {
			this.visible = true;

			$("#SystemWidget").show();

			$("#SystemWidgetArrow").animate({
				left : window.innerWidth * 0.85,
			}, 900, function() {
			});

			self.div.animate({
				left : window.innerWidth * 0.85,

			}, 900, function() {

			});

		} else {
			this.visible = false;

			$("#SystemWidgetArrow").animate({
				left : window.innerWidth - 42,
			}, 900, function() {
			});

			self.div.animate({
				left : window.innerWidth,

			}, 900, function() {

				$("#SystemWidget").hide();

			});

		}
	}

	this.toggle = function() {
		if(self.div.css("display") == "none") {

			self.show();

		} else {
			self.hide();
		}
	}

	this.resize = function() {
		if(self.div.css("display") != "none")
			self.show();
	}

	this.show = function() {
		self.div.show();

		var tp = $("#Neuland").position().top + $("#Neuland").height() + 3;

		var height = window.innerHeight - tp;

		self.div.css({

			top : tp,
			height : height - 40,
		});

		var h = (height / 2) - 42;

		$("#SystemWidgetArrow").css({
			top : tp + h,
		});

	}

	this.hide = function() {
		self.div.hide();
	}

	this.update = function() {

		if(self.commands.length < self.range) {
			w = self.commands.length;

			var cm = "";
			while(w--) {
				cm += self.commands[w] + '<br>';
			}

			$("#SystemLog").html(cm);
		} else {
			end = self.commands.length - 1;
			start = end - self.range;
			var list = self.commands.slice(start, end);
			var cm = "";

			for( w = end; w > start; w--) {
				cm += self.commands[w] + '<br>';
			}
			$("#SystemLog").html(cm);
		}
	}

	this.show_data = function() {

		if(self.div == null)
			self.create_div();
		else {
			if(self.changed_array == true) {
				if(self.visible == true) {

					// console.log("Aktialisierung des Widgets ");
					self.update();
					self.changed_array = false;

				}
			}
		}

	}

	this.loop = function() {
		self.fancy_commands();
		self.show_data();
	}

	this.init = function() {
		var cm = "psycho_evaluation(17, 0.5, 217)";
		self.sys_command.push(cm);

		cm = 'Dirichlet allocations started()';
		self.sys_command.push(cm);

		cm = 'word stripping process(129, 155)';
		self.sys_command.push(cm);

		cm = 'bootstrapping("beginner")';
		self.sys_command.push(cm);

		cm = 'supervisor.check_idle()';
		self.sys_command.push(cm);

		cm = 'supervisor.check_markov_chains(17)';
		self.sys_command.push(cm);

		cm = 'data.gaussian_distribution()';
		self.sys_command.push(cm);

		cm = 'data_miner.quantile(5, "MAX")';
		self.sys_command.push(cm);

		cm = 'data_miner.check_hilbert_space(99, 0.2173, "multi_dim")';
		self.sys_command.push(cm);

		cm = 'bootstrapping("medium")';
		self.sys_command.push(cm);

		cm = 'supervisor.attention_control( { id: 17, state: "beginner", dist: "normal"})';
		self.sys_command.push(cm);

		cm = 'grid.ip_tracker_started()';
		self.sys_command.push(cm);

		cm = 'grid.ip_tracker_started()';
		self.sys_command.push(cm);

		cm = 'grid.emergency_check() <br> <span class = "red">FALSE</span>';
		self.sys_command.push(cm);

		cm = 'Counting objects: 15, done. <br> Delta compression using up to 4 threads. <br> Compressing objects: 100% (12/12), done. <br> Writing objects: 100% (12/12), 9.33 KiB, done.';
		self.sys_command.push(cm);

		cm = 'user_manager.set_cookie() <br><span class = "green">COOKIE SET</span>';
		self.sys_command.push(cm);

		cm = '<span class = "gray">awk{ ips[$5]++ } END { for (ip in ips) { print ip } }</span>';
		self.sys_command.push(cm);

		cm = '<span class = "green">UPDATE COMPLETE</span>';
		self.sys_command.push(cm);

		cm = 'fast_hack_detection.started() <br><span class = "green">NO RESULT</span>';
		self.sys_command.push(cm);

		cm = 'ip_check.started("105.217.66.39")';
		self.sys_command.push(cm);

		cm = 'ip_check.complete("105.217.66.39"), <br><span class = "green">NO RESULT</span>';
		self.sys_command.push(cm);

		cm = '<span class = "gray">-module(math).<br> -export([fac/1]).</span>';
		self.sys_command.push(cm);

		cm = '<span class = "gray">lookup(Key, {Key, Val, _, _}) ->{ok, Val};.</span>';
		self.sys_command.push(cm);

		cm = '<span class = "gray">sort([Pivot|T])</span>';
		self.sys_command.push(cm);

		cm = '<span class = "gray">> Adder = fun(N) -> fun(X) -> X + N end</span>';
		self.sys_command.push(cm);

		cm = 'user.attention_check({countdown: 77})';
		self.sys_command.push(cm);

		cm = 'kernel.temperature_check()';
		self.sys_command.push(cm);

		cm = 'kernel.cooler_check()';
		self.sys_command.push(cm);

		cm = 'kernel.EPROM_check()';
		self.sys_command.push(cm);

		cm = '<span class = "gray">(eval-when (compile load eval)</span>';
		self.sys_command.push(cm);

		cm = '<span class = "gray">Pid = spawn(Fun@Node)</span><br><span class = "green">PROCESS SPAWNED</span>';
		self.sys_command.push(cm);

		cm = '<span class = "gray">Pid = kill(Fun@Node)</span><br><span class = "green">PROCESS KILLED</span>';
		self.sys_command.push(cm);

		cm = '<span class = "gray">	(defmacro WITH-3D-VECTOR-ON-STACK ((vector-name &optional list-of-xyz-component-names)</span>';
		self.sys_command.push(cm);

		cm = 'supervisor.vertical_redundancy_check()';
		self.sys_command.push(cm);

		cm = 'supervisor.check_delta_modulation()';
		self.sys_command.push(cm);

		cm = 'supervisor.carrier_check()<br><span class = "green">TRUE</span>';
		self.sys_command.push(cm);

		cm = 'cookie.extraction_started()<br><span class = "green">TRUE<br>12/12 items set</span>';
		self.sys_command.push(cm);

		cm = 'supervisor.check_timeout()';
		self.sys_command.push(cm);

		cm = 'supervisor.proxy_tracker()';
		self.sys_command.push(cm);

		cm = 'anonymous.proxy_tracker()';
		self.sys_command.push(cm);

		cm = 'anonymous.privacy_check()<br><span class = "orange">INSECURE</span>';
		self.sys_command.push(cm);

		cm = 'anonymous.licklider_transmission_protocol()';
		self.sys_command.push(cm);

		cm = 'clear_logs()';
		self.sys_command.push(cm);

		cm = 'update_logs()';
		self.sys_command.push(cm);

		cm = 'transmission repetion rate: 0.25msec';
		self.sys_command.push(cm);

		cm = '.click( youClick ) <span class = "green">// this === "zombie"</span>';
		self.sys_command.push(cm);

		cm = 'zombie_detection.start()';
		self.sys_command.push(cm);

		cm = '<span class = "green">ZOMBIES KILLED, 12/17#, 835msec, done</span>';
		self.sys_command.push(cm);

		cm = '<span class = "red">ZOMBIES DETECTED, 32, 1835msec, STANDBY</span>';
		self.sys_command.push(cm);

		cm = 'crawler.start()';
		self.sys_command.push(cm);

		cm = 'crawler.pause()';
		self.sys_command.push(cm);

		cm = 'crawler.delivery()';
		self.sys_command.push(cm);

		z = parseInt(Math.random() * 1000);
		cm = 'capek_infusions_done()<br><span class = "green">ASSIMILATION COMPLETE, ' + z + ' msec</span>';
		self.sys_command.push(cm);

		cm = '<span class = "blink">ZONE RED</span><br>Mossad attack<bt><br><span class = "green">blocked. systems working</span>';
		self.sys_command.push(cm);
	}

	self.init();
}
/***********************                              DAS WEB                          ************************************/

Neuland.WebContext = function(name, admin) {
	var self = this;
	this.name = name;
	this.admin = admin;

	this.address = "http://www.altavista.com";

	this.div = null;

	this.context = "web";

	this.history = new Array();
	this.iterator = 0;

	this.reset_tools = function() {
		$("#tools").html("");
	}

	this.check_site = function(site) {
		for(var i = 0; i < self.history.length; i++) {
			if(self.history[i] == site)
				return true;
		}

		return false;
	}

	this.add_site = function(site) {
		if(self.check_site(site) == false) {
			self.history.push(site);
			self.iterator = 0;
		}
	}

	this.init_context = function() {
		if(mega_machine.public.status == "public")
			mega_machine.cookie_manager.increment_attribute("web_context", 1);

		self.admin.active_context = self;
		self.admin.contextualize(self);

		var x = document.getElementById("WebContext");

		if(!x) {
			var s = '<div id = "WebContext">';
			s += '<iframe src="' + self.address + '" width= "100%" height= "100%"></iframe>';
			s += '</div>';

			$("body").append(s);

			self.history.push(self.address);

			self.init_tools();

			self.div = $("#WebContext");

			self.admin.system_tracker.add_element("WebContext.init_context()");

			$("#WebContext").mouseover(function() {
				mega_machine.mouselistener.active_area = "web";
			});

			mega_machine.null_communication();
			self.admin.ruler.new_context(self.div, "WEB");

			if(mega_machine.public.status == "public")
				mega_machine.newbie_manager.first_group_interaction("web");

			// self.history.push("http://www.decentral-intelligence-agency.eu");
			self.check_size();
		} else {
			self.reset_tools();
			self.admin.ruler.new_context(self.div, "WEB");

			self.check_size();

		}

		self.admin.interface_master.blink("web");
	}

	this.check_size = function() {
		if(mega_machine.fullscreen == true) {
			if(mega_machine.active_context == mega_machine.web_context) {
				var nh = $("#Neuland").height();

				$("#WebContext").css({
					height : window.innerHeight - nh

				});
			}
		} else {
			if(mega_machine.upper_context == mega_machine.web_context)// war upper_page_context
			{
				t = $("#Neuland").position().top;

				$("#WebContext").css({
					top : -2,
					height : t

				});

			} else {
				$("#WebContext").css({
					height : window.innerHeight

				});
			}

		}
	}

	this.init_tools = function() {
		$("#tools").html("");
	}
}

Neuland.ScanProcess = function(time, coord, results) {
	this.time = time;
	this.coord = coord;
	this.results = results;
}
/***********************                              DIE KARTE                          ************************************/

Neuland.MapContext = function(name, admin) {
	var self = this;
	this.name = name;

	this.admin = admin;

	this.map = null;
	this.map_div = null;
	this.context = "map";

	this.history = new Array();
	this.iterator = 0;

	this.active_map = "standard";
	this.nethernet = null;

	this.scan_process_list = [];

	this.formatted_time = function(time) {
		d = new Date(time);
		h = d.getHours();
		sec = d.getSeconds();

		m = d.getMinutes();
		if(m < 10)
			m = "0" + m;
		if(sec < 10)
			sec = "0" + sec;

		return h + ":" + m + ":" + sec;
	}

	this.mega_byte = 712;
	this.connections_established = 32;
	this.packages_failed = 2;

	this.bellevue_visible = false;

	this.dead_drops_written = false;

	this.single_deaddrop = function(loc) {

		labtest = data;

		var drop = loc.streetview_list.at(0);

		activist = drop;

		var d = loc.attributes.title;

		var s = "";

		var js = 'javascript:external_map.show_streetview(' + loc.attributes.id + ');';

		s += '<div onclick = "' + js + '" class = "streetview_link">';
		s += d;
		s += '</div>';

		$("#DeadDropList").prepend(s);
	}

	this.dead_drop_samples = function() {
		if(self.dead_drops_written == false) {
			self.dead_drops_written = true;
		} else
			$("#DeadDropList").html("");

		list = external_map.map_location_list;

		var x = document.getElementById("DeadDropList");

		if(!x) {
			var s = '<div id = "DeadDropList">';

			s += '<div id = "dead_drop_header">';

			s += '<div class = "recent_dead_drops active_language">RECENT</div>';
			s += '<div class = "personal_dead_drops">PERSONAL</div>';

			s += '</div>';

			s += '<div id = "recent_dead_drops_container"></div>';
			s += '<div id = "personal_dead_drops_container"></div>';

			s += '</div>';

			$("#external_map").append(s);

			h = window.innerHeight;

			$(".recent_dead_drops").click(function() {

				$("#recent_dead_drops_container").show();
				$("#personal_dead_drops_container").hide();
				$(".recent_dead_drops").addClass("active_language");
				$(".personal_dead_drops").removeClass("active_language");
			});

			$(".personal_dead_drops").click(function() {

				$("#recent_dead_drops_container").hide();
				$("#personal_dead_drops_container").show();
				$(".personal_dead_drops").addClass("active_language");
				$(".recent_dead_drops").removeClass("active_language");
			});

		}

		var s = '';

		var i = list.length;

		// for (var i = 0; i < list.length; i++)
		while(i--) {
			var drop = list.at(i);
			var d = list.at(i).attributes.title;

			if(drop.streetview_list.length > 0) {
				var js = 'javascript:external_map.show_streetview(' + drop.attributes.id + ');';

				s += '<div onclick = "' + js + '" class = "streetview_link">';
				s += d;
				s += '</div>';
			}

			labtest = drop;
		}

		$("#recent_dead_drops_container").html(s);

		// jetzt die persönlichen Deaddrops
		var i = list.length;
		var t = "";

		if(mega_machine.public.status == "private") {

			while(i--) {
				var drop = list.at(i);
				var d = list.at(i).attributes.title;

				if(drop.attributes.player_name == mega_machine.public.player.ego.username) {
					var js = "javascript:do_nothing()";

					if(drop.streetview_list.length > 0)
						js = 'javascript:external_map.show_streetview(' + drop.attributes.id + ');';

					t += '<div onclick = "' + js + '" class = "streetview_link">';
					t += d;
					t += '</div>';
				}

			}

			$("#personal_dead_drops_container").html(t);

		}

	}

	this.show_bellevue = function() {
		self.bellevue_visible = true;

		if(self.map.map_location_list.length == 0)
			self.map.load_bellevue_locations("mega_machine.map_context.dead_drop_samples()");
		else {
			self.map.write_bellevue_locations();
			self.dead_drop_samples();

			$("#DeadDropList").show();
		}
	}

	this.hide_bellevue = function() {
		if(self.bellevue_visible == true) {
			self.bellevue_visible = false;
			self.map.clear_bellevue_locations();

			$("#DeadDropList").hide();
		}
	}

	this.update_data_packages = function() {
		r = parseInt(Math.random() * 112);
		self.mega_byte += r;

		var q = Math.random();
		if(q > 0.97)
			self.packages_failed += 1;

		self.connections_established += 1;

		self.paint_infobox();

		var s = "data_packages sent: " + self.mega_byte;
		s += "<br>connections established: " + self.connections_established;
		s += "<br>packages failed: " + self.packages_failed;

		$("#scan_information").html(s);

	}

	this.paint_infobox = function() {
		if(self.active_map != "satellite") {

			var x = document.getElementById("scan_information");

			if(!x) {
				var s = '<div id = "scan_information"></div>';
				$("#external_map").append(s);
			}
		}
	}

	this.scan_process_info = function(no) {
		var s = "scan process executed at: " + self.formatted_time(self.scan_process_list[no].time) + "<br>";

		s += "lat: " + self.scan_process_list[no].coord.lat() + ",<br>";
		s += "lng: " + self.scan_process_list[no].coord.lng() + "<br>";

		if(!self.scan_process_list[no].results)
			s += "results: 0";
		else
			s += "results: " + self.scan_process_list[no].results;

		s += "<br><br>";
		return s;
	}

	this.paint_process_list = function() {
		self.paint_infobox();

		var s = "";

		for(var i = 0; i < self.scan_process_list.length; i++) {
			s += self.scan_process_info(i);
		}

		$("#scan_information").html(s);

	}

	this.track_process = function(coord, results) {
		var d = new Date().getTime();
		var p = new Neuland.ScanProcess(d, coord, results);
		self.scan_process_list.push(p);

		var circle;

		var scanOptions = {
			strokeColor : "red",
			strokeOpacity : 0.18,
			strokeWeight : 2,
			fillColor : "red",
			fillOpacity : 0.18,
			map : self.map.map,
			center : coord,
			radius : 1500
		};
		circle = new google.maps.Circle(scanOptions);

		var no = self.scan_process_list.length - 1;

		google.maps.event.addListener(circle, 'mouseover', function() {

			mega_machine.map_context.scan_info_window(no);
		});

		google.maps.event.addListener(circle, 'mouseout', function() {
			$("#scan_process_information").hide();
		});

		self.paint_process_list();
	}

	this.scan_info_window = function(number) {
		var xpos = mega_machine.mouselistener.mouseX - $("#external_map").position().left;
		var ypos = mega_machine.mouselistener.mouseY - $("#external_map").position().top;

		var scan = self.scan_process_info(number);
		var x = document.getElementById("scan_process_information");

		if(!x) {
			var s = '<div id = "scan_process_information"></div>';
			$("#external_map").append(s);
		}

		$("#scan_process_information").show();

		$("#scan_process_information").css({
			left : xpos,
			top : ypos
		});

		$("#scan_process_information").html(scan);

	}

	this.multifunctional = function() {

		switch(self.active_map) {
			case "standard":
				if(mega_machine.fullscreen == false) {
					if(mega_machine.upper_context == self)
						mega_machine.ruler.upper_page_setting();
					// war upper_page_context
					else
						mega_machine.ruler.lower_page_setting();
				}

				self.map.new_location(1);
				self.set_active_map("localizer");
				break;

			case "nethernet":

				if(mega_machine.public.status == "public") {
					self.admin.statusbar.show("As an agent you can be part of the nethernet too");
					mega_machine.newbie_manager.getLocation();
				} else {
					mega_machine.map_context.nethernet.check();
				}

				break;

			case "satellite":
				if(self.admin.public.status == "private") {
					if(mega_machine.public.player.ego.energy > 30) {
						self.scan_map();
					} else
						mega_machine.dialog.feedback(mega_machine.public.messages.get("no energy"));
				} else
					self.admin.statusbar.show("You have to be a registered agent to perform a  scan");
				break;
		}
	}

	this.info_styling = function(no) {
		switch(no) {
			case 0:
				$("#scan_information").css({
					color : "white",
				});
				break;

			case 1:
				$("#scan_information").css({
					color : "black",
				});
				break;
		}
	}

	this.clear_last_map = function() {
		var typ = self.active_map;

		switch(typ) {
			case "mobile":
				self.admin.public.mobile_players.clear();
				$("#mobile_player_info").hide();
				break;

			case "standard":
				$("#bellevue_preview").hide();
				break;
		}
	}

	this.set_active_map = function(type) {
		self.clear_last_map();

		self.active_map = type;

		mega_machine.exception_handler.check_system_widget()

		switch(type) {
			case "standard":
				self.map.map.minZoom = 11;
				self.map.map.maxZoom = 17;
				self.map.setZoom(12);

				mega_machine.map_context.map.random_connections_reset();
				self.info_styling(1);
				$("#Radar").show();
				$("#Radar").html("LOCALIZE");
				self.show_bellevue();

				break;

			case "localizer":
				self.map.set_type("ROADMAP");
				self.map.map.setOptions({
					styles : Tourismus
				});
				self.map.map.minZoom = 12;
				self.map.map.maxZoom = 21;
				self.map.setZoom(16);

				mega_machine.map_context.map.random_connections_reset();
				self.info_styling(1);
				$("#Radar").show();
				$("#Radar").html("LOCALIZE");

				self.dead_drop_samples();
				break;

			case "satellite":
				mega_machine.map_context.map.random_connections_reset();
				self.info_styling(0);

				self.paint_process_list();
				self.hide_bellevue();
				break;

			case "mobile":
				if(self.admin.public.status == "public")
					mega_machine.public.location_check();
				mega_machine.map_context.map.random_connections_reset();
				self.info_styling(1);
				mega_machine.public.mobile_players_info();
				mega_machine.public.mobile_players.paint();
				self.hide_bellevue();

				break;

			case "nethernet":
				self.hide_bellevue();
				self.map.set_type("ROADMAP");
				self.map.map.setOptions({
					styles : black_world
				});

				self.map.map.minZoom = 3;
				self.map.map.maxZoom = 17;

				self.info_styling(0);

				self.map.setZoom(6);
				var s = "mega_machine.map_context.map.setZoom(6)";
				window.setTimeout(s, 1000);

				$("#Radar").show();
				$("#Radar").html("LOCALIZE");

				$(".MapGrid").removeClass("active_grid");
				$(this).addClass("active_grid");

				mega_machine.public.task_manager.invisible_tasks();

				mega_machine.map_context.map.random_connections(30);

				break;
		}

	}

	this.add_search_text = function(text) {
		self.history.push(text);
	}

	this.show_radar = function() {
		$("#Radar").fadeIn();
	}

	this.hide_radar = function() {
		$("#Radar").fadeIn();
	}

	this.fullscreen_toggle = function() {
		var context;

		if(self.admin.lower_context) {
			if(self.admin.lower_context.name == "map")
				context = "lower";
			else
				context = "upper";
		}

		if(context == "lower") {
			mega_machine.ruler.lower_page_setting();
			mega_machine.check_active_context();

			mega_machine.mute_communication();
		} else {
			mega_machine.ruler.upper_page_setting();
			mega_machine.check_active_context();
			mega_machine.mute_communication();
		}

	}

	this.init_context = function() {
		if(mega_machine.public.status == "public")
			mega_machine.cookie_manager.increment_attribute("map_context", 1);

		self.admin.active_context = self;
		self.admin.contextualize(self);

		self.admin.system_tracker.add_element("self.admin.active_context = self");
		self.admin.system_tracker.add_element("MapContext.init_context()");

		if(self.map == null) {

			var s = '<div id = "external_map">';

			s += '</div>';

			s += '<div id = "task_overlay"><div id = "task_container"></div></div>';

			$("body").append(s);

			external_map = new ExternalMap();

			self.admin.screen_size("external map");

			self.map = external_map;
			self.map_div = $("#external_map");

			$("#external_map").mouseover(function() {
				mega_machine.mouselistener.active_area = "map";
			});

			$("#external_map").dblclick(function() {
				mega_machine.map_context.fullscreen_toggle();
			});

			mega_machine.null_communication();
			self.admin.ruler.new_context(self.map_div, "MAP");

			if(mega_machine.public.status == "public")
				mega_machine.newbie_manager.first_group_interaction("map");
		} else {
			self.admin.ruler.new_context(self.map_div, "MAP");
			mega_machine.null_communication();
		}

		self.init_tools();

		self.admin.interface_master.blink("map");
	}

	this.reset_tools = function() {
		var s = '<div id = "inner_tools">';

		var s = '<div id = "inner_tools">';

		s += '<div class = "MapGrid active_grid" id = "map_zoom_1">';
		s += '<div class = "centered_pointer"></div>';
		s += '<div class = "map_tool down">STATIONS</div>';
		s += '</div>';

		s += '<div class = "MapGrid" id = "map_zoom_2">';
		s += '<div class = "centered_pointer"></div>';
		s += '<div class = "map_tool up">MOBILE</div>';
		s += '</div>';

		s += '<div class = "MapGrid" id = "map_zoom_3">';
		s += '<div class = "centered_pointer"></div>';
		s += '<div class = "map_tool down">NETHERNET</div>';
		s += '</div>';

		s += '<div class = "MapGrid" id = "satellite" >';
		s += '<div class = "centered_pointer"></div>';
		s += '<div class = "map_tool up">SATELLITE</div>';
		s += '</div>';

		s += '<div class = "MapGrid" id = "Multifunctional">';
		s += '<div class = "centered_pointer"></div>';
		s += '<div id = "Radar" class = "map_tool down gold">SCAN</div>';
		s += '</div>';

		s += '<div class = "MapGrid">';
		s += '<div class = "centered_pointer"></div>';
		s += '<div id = "photograph" class = "map_tool up gold">FOTOS</div>';
		s += '</div>';

		s += '</div>';

		$("#tools").html(s);

		self.set_interactions();
	}

	this.init_tools = function() {
		self.admin.system_tracker.add_element("MapContext.init_tools()");

		$("#tools").html("");

		var s = '<div id = "inner_tools">';

		s += '<div class = "MapGrid active_grid" id = "map_zoom_1">';
		s += '<div class = "centered_pointer"></div>';
		s += '<div class = "map_tool down">STATIONS</div>';
		s += '</div>';

		s += '<div class = "MapGrid" id = "map_zoom_2">';
		s += '<div class = "centered_pointer"></div>';
		s += '<div class = "map_tool up">MOBILE</div>';
		s += '</div>';

		s += '<div class = "MapGrid" id = "map_zoom_3">';
		s += '<div class = "centered_pointer"></div>';
		s += '<div class = "map_tool down">NETHERNET</div>';
		s += '</div>';

		s += '<div class = "MapGrid" id = "satellite" >';
		s += '<div class = "centered_pointer"></div>';
		s += '<div class = "map_tool up">SATELLITE</div>';
		s += '</div>';

		s += '<div class = "MapGrid" id = "Multifunctional">';
		s += '<div class = "centered_pointer"></div>';
		s += '<div id = "Radar" class = "map_tool down gold">SCAN</div>';
		s += '</div>';

		s += '<div class = "MapGrid">';
		s += '<div class = "centered_pointer"></div>';
		s += '<div id = "photograph" class = "map_tool up gold">FOTOS</div>';
		s += '</div>';

		s += '</div>';

		$("#tools").append(s);

		self.admin.active_area("map");

		self.set_interactions();

	}

	this.set_interactions = function() {
		$("#Radar").click(function() {

			mega_machine.map_context.multifunctional();
			// mega_machine.map_context.scan_map();

		});

		$("#Multifunctional").click(function() {

			mega_machine.map_context.multifunctional();
			// mega_machine.map_context.scan_map();

		});

		$("#map_zoom_1").click(function() {

			mega_machine.map_context.set_active_map("standard");

			/*
			 mega_machine.map_context.map.set_type("TERRAIN");
			 mega_machine.map_context.map.map.setOptions({styles: industrie});

			 mega_machine.map_context.map.map.minZoom = 11;

			 mega_machine.map_context.map.setZoom(12);
			 var s = "mega_machine.map_context.map.setZoom(12)";
			 window.setTimeout(s, 1000);
			 */

			mega_machine.map_context.map.set_type("ROADMAP");
			mega_machine.map_context.map.map.setOptions({
				styles : Tourismus
			});

			mega_machine.map_context.map.map.minZoom = 10;
			mega_machine.map_context.map.map.maxZoom = 20;
			mega_machine.map_context.map.setZoom(15);

			$(".MapGrid").removeClass("active_grid");
			$(this).addClass("active_grid");

			mega_machine.public.task_manager.invisible_tasks();
		});

		$("#map_zoom_2").click(function() {

			mega_machine.map_context.set_active_map("mobile");

			mega_machine.map_context.map.set_type("TERRAIN");
			mega_machine.map_context.map.map.setOptions({
				styles : industrie
			});

			mega_machine.map_context.map.map.minZoom = 11;

			mega_machine.map_context.map.setZoom(12);
			var s = "mega_machine.map_context.map.setZoom(12)";
			window.setTimeout(s, 1000);

			/*
			 mega_machine.map_context.map.set_type("ROADMAP");
			 mega_machine.map_context.map.map.setOptions({styles: Tourismus});

			 mega_machine.map_context.map.map.minZoom = 10;
			 mega_machine.map_context.map.map.maxZoom = 20;
			 mega_machine.map_context.map.setZoom(12);
			 */

			$("#Radar").hide();

			mega_machine.public.task_manager.invisible_tasks();
			// TASK

			$(".MapGrid").removeClass("active_grid");
			$(this).addClass("active_grid");

		});

		$("#map_zoom_3").click(function() {

			mega_machine.map_context.set_active_map("nethernet");
		});

		$("#satellite").click(function() {

			mega_machine.map_context.set_active_map("satellite");

			mega_machine.map_context.map.map.maxZoom = 21;
			mega_machine.map_context.map.map.minZoom = 16;

			mega_machine.map_context.map.set_type("SATELLITE");

			mega_machine.map_context.map.setZoom(18);

			mega_machine.map_context.map.map.maxZoom = 21;
			mega_machine.map_context.map.map.minZoom = 17;

			$(".MapGrid").removeClass("active_grid");
			$(this).addClass("active_grid");

			mega_machine.public.task_manager.visible_tasks();
			// TASK - Problematik

			$("#Radar").show();
			$("#Radar").html("SCAN");

			if(mega_machine.fullscreen == false) {
				if(mega_machine.active_range == "up")
					mega_machine.ruler.upper_page_setting();
				else
					mega_machine.ruler.lower_page_setting();
			}

		});

		$("#photograph").click(function() {

			mega_machine.surprise_context.location_photos();
		});

	}

	this.scanner_spin = null;

	this.scan_map = function() {
		self.scanner_spin = self.admin.spinner.start_scan_process();

		var center = self.map.map.getCenter();
		centerParams = "center[lat]=" + center.lat() + "&" + "center[lng]=" + center.lng();
		// bounds = Map.mapCanvas.getBounds();
		bounds = self.map.map.getBounds();
		boundsParams = "bounds[north_east][lat]=" + bounds.getNorthEast().lat() + "&bounds[north_east][lng]=" + bounds.getNorthEast().lng() + "&bounds[south_west][lat]=" + bounds.getSouthWest().lat() + "&bounds[south_west][lng]=" + bounds.getSouthWest().lng(); divtest;

		return $.ajax({
			type : "POST",
			url : "/radar_searches?" + boundsParams + "&" + centerParams,
			contentType : "application/json",
			success : function(data) {

				// {"tasks":[],"energy":{"value":67,"time_to_refill":58,"change":-33}}
				mega_machine.public.player.mod_energy(data);

				mega_machine.spinner.stop_scan_process();
				mega_machine.map_context.track_process(center, data.length);

				mega_machine.spinner.stop_scan_process();
				
				mega_machine.public.task_manager.paint_random_task();
				mega_machine.public.task_manager.check_radius();
				

			},
			error : function() {

				alert("nicht mehr genug Energie");
				// _this.noEnergyDialog.dialog("open");

			}
		});

	}
}
/***********************                             LABORATORY                           ************************************/
Neuland.Laboratory = function(lab_context) {
	this.parent = lab_context;
	var self = this;

	this.init = function() {

	}

	self.init();

}

Neuland.ResearchMethod = function(name, id) {
	this.id = id;
	this.name = name;
	this.completed = false;
	this.analysis = null;
}

Neuland.AnalysisBar = function(artefact) {
	var self = this;
	this.artefact = artefact;
	this.methods = new Array();

	this.init = function() {
		r = new Neuland.ResearchMethod("db", 0);
		self.methods.push(r);

		r = new Neuland.ResearchMethod("fingerprints", 1);
		self.methods.push(r);

		r = new Neuland.ResearchMethod("chemical", 2);
		self.methods.push(r);

		r = new Neuland.ResearchMethod("dna", 3);
		self.methods.push(r);

		r = new Neuland.ResearchMethod("spectral", 4);
		self.methods.push(r);

		r = new Neuland.ResearchMethod("crypto", 5);
		self.methods.push(r);

		r = new Neuland.ResearchMethod("pattern", 6);
		self.methods.push(r);

	}

	self.init();
}
/***********************                              PROGRESS-BAR                       ************************************/

Neuland.ProgressBar = function() {

}
/*********************** ist für den Analysen-Stand zuständig        ************************************/


Neuland.ArtifactMonitor = function()
	{
	var self = this;
	this.artifacts = [];
	
	this.running   = [];
	this.busy  = false;  
	
	this.painter = [];
	
	
	this.is_busy = function()           // checkt, ob der Spieler noch etwas machen darf oder nicht;
	{
	self.busy = false;	
		
	for (var i = 0; i < self.running.length; i++)
		{
		var j = self.running[i];
		if (j.player_id == mega_machine.public.player.ego.id) self.busy = true;	
		}	
	}
	
		
		
		
		
	
	this.animate_artifact = function(no)
	{
	id = self.painter[no].team_artifact_id;

	n = "team_artifact_animation_" + id;

		$("#" + n).css({
			top : "-50px",
		});

		$("#" + n).animate({
			top : "130px",
		}, 900);	
	}
	
	
	this.stop_painter = function(team_artifact_id)
	{
	for (var i = 0; i < self.painter.length; i++)
		{
		p = self.painter[i];
		if (p.team_artifact_id == team_artifact_id)
			{
			window.clearInterval(p.pid);
			p.done = true;	
			}	
		}	
	}
	
	
	
	this.create_painter = function(rj, pid)
	{
	job = {};
	job.team_artifact_id 	= rj.team_artifact_id;
	job.pid             	= pid;
	job.done				= false;
		
	job.commander      		= rj.player_id;	
		
	self.painter.push(job);	
	}
	
	
	this.paint = function()
	{
	for (var i = 0; i < self.running.length; i++)
		{
		var a = self.running[i];
		var n = "#team_artifact_" + a.team_artifact_id;
		var id = "team_artifact_animation_" + a.team_artifact_id;
		
		var s = '<div id = "' + id + '" class = "analysis_animation"><img src = "/images/new_interface/glow.png"/></div>';
		$(n).append(s);
	
	
		no = self.painter.length;
			
		var s = "mega_machine.lab_context.monitor.animate_artifact(" + no + ")";
		
		var offset = parseInt(Math.random() * 150);
		
		var x = window.setInterval(s, 1000 + offset);	
		
		self.create_painter(a, x)
		}	
	}
	
	
	this.erase = function()
	{
	for (var i = 0; i < self.painter.length; i++)
		{
		window.clearInterval(self.painter[i].pid);	
		}	
		
	for (var i = 0; i < self.running.length; i++)
		{	
			
		var a = self.running[i];
		var id = "#team_artifact_animation_" + a.team_artifact_id;
	
		$(id).remove();			
		}		
	}
	
	
	this.ongoing = function()
	{	
			
	var list = [];
		
	for (var i = 0; i < self.artifacts.length; i++)
		{
		var art = self.artifacts[i];
		var jobs = art.analysis_jobs;
		
		for (var j = 0; j < jobs.length; j++)
			{
			if (jobs[j].completed == false)
				{
				var running = {};
				running.job = jobs[j];
				running.team_artifact_id 		= art.id;
				running.artifact_id				= art.artifact.id;
											
								
				list.push(running);
				

				var d = running.job.time_left * 1000;
				
				// var cm = "alert('Hallo')";
				var cm = 'mega_machine.lab_context.monitor.stop_painter(' + running.team_artifact_id + ')';
				
				
				
				mega_machine.event_machine.add_event(d, cm);  // EVM 
				}	
			}

		}	
	self.running = list;
	self.is_busy();
	
	self.paint();
	
	return list;	
	}
	
	this.latest = function()
		{
		var url = "/engine/team_artifacts";
		
		  $.ajax({
          type : "GET",
          url : url

          }).done(function(data) {
          	mega_machine.lab_context.monitor.erase();
          	
			mega_machine.lab_context.monitor.artifacts = data.artifacts;
			mega_machine.lab_context.monitor.ongoing();
		  });
			
		}
	}



Neuland.Event = function(time, command)
	{
	this.time 		= time;
	this.command	= command;
	this.done       = false;
	}


Neuland.EventMachine = function(admin)
	{
	var self = this;
	this.admin = admin;	
	this.list = [];
	
	this.clean_list = function(id)
		{
			
		}


	this.add_event = function(offset, command)                // EVM
		{
		var time = new Date().getTime() + offset;	
		var e = new Neuland.Event(time, command);	
		
		self.list.push(e);	
		}
	
	
	this.loop = function()
		{
		if (self.list.length > 0)
			{
			var d = new Date().getTime();
			// console.log("loop");	
			
			for (var i = 0; i < self.list.length; i++)
				{
				if (d > self.list[i].time && self.list[i].done == false)
					{
					self.list[i].done = true;	
					eval( self.list[i].command);
					}	
				}
			
			}
		}
	
	
	
	
	}


Neuland.LabContext = function(name, admin) {
	var self = this;
	this.name = name;
	this.admin = admin;

	this.laboratory = null;

	this.lab = null;

	this.team = null;

	this.context = "lab";

	this.dragging = false;

	this.ongoing_analysis_jobs = new Array();                       // OAJ
	this.actual_analysis_jobs   = new Array(); 
	
	this.ongoing_analysis_pids = new Array();

	this.running_jobs = null;

	this.visualizer = null;

	this.monitor = new Neuland.ArtifactMonitor();
	

	this.latest_artifact_infos = function()
	{
	var url = "/engine/team_artifacts";
		
	}


	this.check_boost = function(type)
	{
	var solutions = [];	
		

	for (var i = 0; i < mega_machine.public.player.ego.player_items.length; i++)
			{
			var attr = mega_machine.public.player.ego.player_items[i].attributes_x;
			
			for (var j = 0; j < attr.length; j++)
				{
			
				
				if (attr[j].boosting_analysis_of == type)				
					{
					var c = {};
					c.item = mega_machine.public.player.ego.player_items[i]; 
					c.analysis = attr[j];
					
					solutions.push(c);
					}
					
				}
			
			}

	self.paint_boost(solutions);
	}



	this.paint_boost = function(solutions)
	{
	var x = document.getElementById("boost_options");
	if (! x)
		{
		var s = '<div id = "boost_options"></div>';		
		$("body").append(s);	
		
		}
		
	var s = "";	
		
	for (var i = 0; i < solutions.length; i++)
		{
		var item 		= solutions[i].item;
		var analysis 	= solutions[i].analysis;
		
		frage = item;
		
		s += '<div class = "choice">';
		
			s += '<div class = "icon">';
			 s += '<img src = "' + item.big_image + '"/>';
			s += '</div>';
		
			s += '<div class = "commit">';
			
			   s += "analysis boost: ";
			   s += analysis.boosting_analysis_of +  " " + analysis.analysis_boost +   " %";
			
			s += '</div>';
		
		
		s += '</div>';
			
		}	
		
	$("#boost_options").html(s);
	}




	this.message = function(message) {
		frage = message;
		alert("bekomme eine neue Nachricht, ans Labor");
	}

	this.load_artifact = function(id) {
		var url = "/engine/team_artifacts/" + id;

		$.ajax({
			type : "GET",
			url : url

		}).done(function(msg) {
			frage = msg;
			// alert("Daten sind angekommen");
			mega_machine.lab_context.new_artifact(msg);

			mega_machine.statusbar.show("new artifact found");
			mega_machine.statusbar.command = "new artifact";
		});
	}



	this.new_artifact_actions = function(data)
	{
	var aktionen = 	data.artifact.artifact.actions;
	
	for (var i = 0; i < aktionen.length; i++)
		{
		if (aktionen[i].type != "ActionImage" &&  aktionen[i].type != "ActionVideo" &&  aktionen[i].type != "ActionAudio")
			simple_action(aktionen[i].id );
		else
			{
				
			}	
		}
	}


	this.new_artifact = function(data) {
		// alert("Habe einen neuen Artefakt bekommen");

		self.team.artifacts.push(data.artifact);
		self.paint_item(data.artifact);
		self.new_artifact_display(data.artifact);

		self.new_artifact_display(data.artifact.id);

		var n = $("#team_artifact_" + data.artifact.id);

		self.new_artifact_actions(data);
	

		n.click(function() {

			if(mega_machine.lab_context.dragging == false) {
				$(this).removeClass("new_article");
				id = $(this).attr("data_id");
				mega_machine.lab_context.detail_analysis(id);
			}
		});

	}

	this.new_artifact_display = function(no) {
		var n = "#team_artifact_" + no;
		$(n).addClass("new_artifact");
	}

	this.update_bar = function(type, percentage) {
		switch(type) {
			case "spectral":
				p = (percentage * 100) + "%";
				$("#spectral_progress").css("width", p);
				break;

			case "chemical":
				p = (percentage * 100) + "%";
				$("#chemo_progress").css("width", p);
				break;

			case "cryptographic":
				p = (percentage * 100) + "%";

				$("#crypto_progress").css("width", p);
				break;

			case "pattern":
				p = (percentage * 100) + "%";
				$("#pattern_progress").css("width", p);
				break;

			case "DNA":
				p = (percentage * 100) + "%";
				$("#dna_progress").css("width", p);
				break;

			case "database":
				p = (percentage * 100) + "%";
				$("#data_progress").css("width", p);
				break;

			case "fingerprints":
				p = (percentage * 100) + "%";
				$("#fingerprint_progress").css("width", p);
				break;

			default:
				console.log(type);
				break;

		}
	}

	this.set_bar_finished = function(type) {

	}

	this.refresh_team_artifacts = function() {

	}

	this.loop = function()// damit der Fortschritt der Analysen überwacht werden kann
	{
		if(self.running_jobs.length > 0) {
			date = new Date().getTime();

			for(var k = 0; k < self.running_jobs.length; k++) {
				jb = self.running_jobs.at(k);
				var diff = jb.attributes.end - date;

				jb.attributes.percentage = 1 - (diff / (jb.attributes.analysis_time * 1000));

				if(jb.attributes.visible == true) {
					if (jb.attributes.done == false) self.update_bar(jb.attributes.method, jb.attributes.percentage)
					// console.log(jb.attributes.method);
				}

				if(jb.attributes.percentage > 1) {
					self.set_analysis_complete(jb.attributes.analysis_job_id);

				}
			}

		}
	}

	this.set_analysis_complete = function(analysis_job_id) {
		for(var i = 0; i < self.team.artifacts.length; i++) {
			art = self.team.artifacts[i];

			for(var j = 0; j < art.analysis_jobs.length; j++) {
				job = art.analysis_jobs[j];
				if(job.analysis_job_id == analysis_job_id) {
					job.completed = true;
				}
			}
		}

	}

	this.check_open_analysis_jobs = function() {
		for(var i = 0; i < self.team.artifacts.length; i++) {
			a = self.team.artifacts[i];
			//
			for(var j = 0; j < a.analysis_jobs.length; j++) {
				job = a.analysis_jobs[j];

				frage = job;

				if(job.completed == false) {
					if(job.time_left > 0) {
						anjob = new EngineData.AnalysisJob();

						date = new Date().getTime();

						anjob.set({

							analysis_job_id : job.analysis_job_id,
							artifact_id : a.id,
							time_left : job.time_left,
							analysis_time : job.analysis_time,
							percentage : 1 - (job.time_left / job.analysis_time),
							visible : false,
							start : date,
							end : date + job.time_left * 1000,
							method : job.research_method_key,
							player_id : job.player_id,

						});

						self.running_jobs.add(anjob);
					} else
						{
						self.stop_analysis(job.analysis_job_id, a.id);
						}
				}

			}
			//

		}

		for(var i = 0; i < self.running_jobs.length; i++) {
			id = self.running_jobs.at(0).attributes.artifact_id;
			// self.artifact_animation(id);                                      // OAJ
		}
	}

	this.get_display_info = function(id) {

		for(var i = 0; i < self.team.display_info.length; i++) {
			d = self.team.display_info[i].player_team_artifact;

			if(d.team_artifact_id == id) {
				//alert("habs gefunden");
				return d;
			}

		}

		//alert("nicht gefunden");
		return 0;
	}

	this.team_artifact_info = function(id) {
		for(var i = 0; i < self.team.artifacts.length; i++) {
			a = self.team.artifacts[i];
			if(a.id == id) {
				var s = "Das ist der Team-Artefakt mit der ID " + a.id;
				s += " - Name ist " + a.artifact.name;

				s += "\nBeschreibung " + a.artifact.description;
				s += "\nbezieht sich auf den Artefakt mit der ID: " + a.artifact.id;

				alert(s);

				data = self.get_display_info(id);

			}
		}
	}

	this.update_position = function(artifact_id) {
		t = "#team_artifact_" + artifact_id;

		pos = $(t).position();
		x = pos.left;
		y = pos.top;

		// alert(" x " + x + " y " + y);

		w = window.innerWidth;
		h = window.innerHeight;

		var percent_x = (x / w) * 100;
		var percent_y = (y / h) * 100;

		id = parseInt(artifact_id);

		$.post("/player_team_artifacts", {
			"player_team_artifact[left]" : percent_x,
			"player_team_artifact[top]" : percent_y,
			"team_artifact_id" : id
		});

	}

	this.position_check = function(artifact, data) {

		if(data.left < -2) {
			data.left = 0;
		}

		if(data.top < -2) {
			data.left = 0;
		}

		if(!data.left && !data.top) {
			left = parseInt(Math.random() * 2);
			top = parseInt(Math.random() * 5);

			data = {
				left : left,
				top : top,
			};
		}

		return data;
	}

	this.get_artifact = function(id) {
		for(var i = 0; i < self.team.artifacts.length; i++) {

			a = self.team.artifacts[i];
			frage = a.artifact;

			if(a.id == id)
				return a;
		}
		return 0;
	}

	this.paint_artifact_info = function() {

	}

	this.busy = function() {
		var occupied = false;

		for(var k = 0; k < self.running_jobs.length; k++) {
			var actual = self.running_jobs.at(k);

			if(actual.attributes.player_id == mega_machine.public.player.ego.id) {
				if(!actual.attributes.done)
					occupied = true;
			}
		}

		return occupied;
	}


	// OAJ
	this.od_check_double_animation = function(artifacts_id) {
		
		for(var i = 0; i < self.ongoing_analysis_jobs.length; i++) {
			if(self.ongoing_analysis_jobs[i] == artifacts_id) {
				// alert("ist schon da");
				return true;
			}
		}

		return false;
	}


	this.check_double_animation = function(artifacts_id) {
		
		for(var i = 0; i < self.actual_analysis_jobs.length; i++) {
			job = self.actual_analysis_jobs[i];
			
			if (job.done == false)
				{
			
				if(self.actual_analysis_jobs[i].artifact_id == artifacts_id) 
					{
					return true;
					}
				}
		}

	return false;
	}




	this.animate_artifact = function(no) {
		id = self.ongoing_analysis_jobs[no];

		n = "team_artifact_animation_" + id;

		$("#" + n).css({
			top : "-50px",
		});

		$("#" + n).animate({

			top : "130px",

		}, 900);

	}

	
	// OAJ
	this.stop_animation = function(artifact_id) {

		
		for(var i = 0; i < self.ongoing_analysis_jobs.length; i++) {
			jb = self.ongoing_analysis_jobs[i];
			if(jb == artifact_id) {

				window.clearInterval(self.ongoing_analysis_pids[i]);
			}
		}

	self.stop_analysis_animation(artifact_id);
		// ongoing_analysis_pids
	}

	
	this.stop_analysis_animation = function(artifact_id)
		{
			
		for(var i = 0; i < self.actual_analysis_jobs.length; i++) 
			{
			var job = self.actual_analysis_jobs[i];
			
			if (job.done == false)
				{			
				if (job.artifact_id == artifact_id)
					{
					job.done = true;	
					window.clearInterval(job.pid);					
					}	
				} 
			}		
		}
	
	
	
	this.personal_analysis = [];


	this.research_animation = function(artifact_id, research_id)
		{
			
		}



	this.create_new_job = function(artifact_id, research_id, pid)
		{
		job = {};
		job.artifact_id 	= artifact_id;
		job.research_id 	= research_id;
		job.pid             = pid;
		job.done			= false;
		
		job.commander       = mega_machine.public.player.ego.id;	
		
		self.actual_analysis_jobs.push(job);
		}



	


	this.artifact_animation = function(artifact_id, research_id) {
		if(self.check_double_animation(artifact_id) == false) {
			var n = "#team_artifact_" + artifact_id;
			id = "team_artifact_animation_" + artifact_id;

			var s = '<div id = "' + id + '" class = "analysis_animation"><img src = "/images/new_interface/glow.png"/></div>';
			$(n).append(s);

			no = self.ongoing_analysis_jobs.length;                  // OAJ
			self.ongoing_analysis_jobs.push(artifact_id);

			var s = "mega_machine.lab_context.animate_artifact(" + no + ")";
			var x = window.setInterval(s, 1000);

			self.ongoing_analysis_pids.push(x);
			
			self.create_new_job(artifact_id, research_id, x);
			
			
		} else {

			var n = "#team_artifact_" + artifact_id;
			id = "team_artifact_animation_" + artifact_id;

			var s = '<div id = "' + id + '" class = "analysis_animation"><img src = "/images/new_interface/glow.png"/></div>';
			$(n).append(s);

			no = self.ongoing_analysis_jobs.length;
			

			
			self.ongoing_analysis_jobs.push(artifact_id);             // OAJ

			self.ongoing_analysis_pids.push(0);
		}
	}

	this.update_team_analysis = function(data) {
		id = data.team_artifact_id;

		// alert("UPDATE des ARTEFAKTS " + id);

		for(var n = 0; n < self.team.artifacts.length; n++) {
			if(self.team.artifacts[n].id == id) {
				self.team.artifacts[n].analysis_jobs = data.analysis_jobs;

				self.detail_analysis(id);
			}
		}
	}

	this.refresh_analysis_data = function(id) {
		var refresh = "/engine/analysis_jobs?team_artifact_id=" + id;

		$.ajax({
			type : "GET",
			url : refresh

		}).done(function(data) {
			mega_machine.lab_context.update_team_analysis(data);
		});

	}





	this.stop_analysis = function(id, artifact_id) {
		// var s = "/analysis_jobs/" + id;

		// alert("beendet die Analyse für den Team Artefakt "  + artifact_id);
		self.stop_animation(artifact_id);

		

		// self.refresh_analysis_data(artifact_id);
		var s = "mega_machine.lab_context.refresh_analysis_data(" + artifact_id + ")";
		window.setTimeout(s, 1000);

		return $.ajax({
			type : "PUT",
			url : "/analysis_jobs/" + id,
			contentType : "application/json",
			processData : false,
			data : "{}",
			success : function(data) {

				frage = data;

				if(data.actions.length > 0) {
					alert("AKTION - OBACHT");
				}

				// alert("Prozess beendet, Research-Methode abgelaufen");

			}
		});
	}
	// this.start_analysis = function(research_method_id, artifact_id)
	this.start_analysis_process = function(research_method_id, artifact_id) {
		/* NEU
		 divtest = self.get_artifact(artifact_id);
		 var method = self.get_method(divtest.artifact, research_method_id);
		 method.started = true;
		 */

		var url = "/analysis_jobs?team_artifact_id=" + artifact_id + '&research_method_id=' + research_method_id;
		$.post(url, {

		}, function(data) {

			frage = data;

			mega_machine.lab_context.monitor.latest();

			// mega_machine.lab_context.artifact_animation(artifact_id, research_method_id);    // OAJ
			self.running_jobs.add(data);

			activist = data;

			/*
			 var s = 'mega_machine.lab_context.stop_analysis(' + data.analysis_job_id + ')';
			 window.setTimeout(s, data.time_left* 1000);
			 */
		});
	}

	this.get_method = function(artifact, research_method_id) {

		for(var i = 0; i < artifact.research_methods.length; i++) {
			var m = artifact.research_methods[i];

			if(m.research_method_id == research_method_id) {
				var s = "Methode hat die ID " + m.id;
				s += " und den Namen " + m.name;
				s += " sie dauert: " + m.time;

				return m;
			}
		}

		return 0;
	}

	this.formatted_time = function(time) {
		if(time < 100)
			return time + " seconds";
		if(time > 100 < time < 3600) {
			var minutes = parseInt(time / 60);
			var seconds = time % 60;

			var s = minutes + " min";
			return s;
		}

		if(time > 3600) {
			var hours = parseInt(time / 3600);
			var minutes = time % 60;

			var s = hours + " h " + minutes + " min";
			return s;
		}

	}

	this.cancel_analysis_process = function(research_method_id, artifact_id) {
		$(".analysis").removeClass("an_selected");
	}

	this.running_jobs_info = function() {
		var s = "Anzahl der laufenden Analyse Jobs ";
	}

	this.check_permission = function() {
		var permission = true;

		for(var i = 0; i < self.running_jobs.length; i++) {
			var j = self.running_jobs.at(i);

			// alert(j.attributes.player_id);

			if(j.attributes.player_id == mega_machine.public.player.ego.id)
				permission = false;
		}

		return permission;
	}

	this.start_analysis = function(research_method_id, artifact_id) {
		var ret = self.busy();

		if(ret == false) {
			divtest = self.get_artifact(artifact_id);
			var method = self.get_method(divtest.artifact, research_method_id);

			labtest = method;

			if(method) {
				var command = "mega_machine.lab_context.start_analysis_process(" + research_method_id + "," + artifact_id + ")";
				var cancel = "mega_machine.lab_context.cancel_analysis_process(" + research_method_id + "," + artifact_id + ")";

				// divtest = method;

				var s = "This analysis will last about " + self.formatted_time(method.time);

				mega_machine.dialog.confirmation(s, command, cancel);
			}
		} else {
			// var s = "You can only perform one analysis at a time";
			var s = mega_machine.public.messages.get("one_analysis");
			mega_machine.dialog.feedback(s);

			switch(research_method_id) {
				case 1:
					$("#db_analysis").removeClass("an_selected");
					break;

				case 2:
					$("#fingerprint_analysis").removeClass("an_selected");
					break;

				case 3:
					$("#chemo_analysis").removeClass("an_selected");
					break;

				case 4:
					$("#dna_analysis").removeClass("an_selected");
					break;

				case 5:
					$("#spectral_analysis").removeClass("an_selected");
					break;

				case 6:
					$("#crypto_analysis").removeClass("an_selected");
					break;

				case 7:
					$("#pattern_analysis").removeClass("an_selected");
					break;

				default:

					break;

				/*
				 r = new Neuland.ResearchMethod("db", 0);

				 r = new Neuland.ResearchMethod("fingerprints", 1);

				 r = new Neuland.ResearchMethod("chemical", 2);

				 r = new Neuland.ResearchMethod("dna", 3);

				 r = new Neuland.ResearchMethod("spectral", 4);

				 r = new Neuland.ResearchMethod("crypto", 5);

				 r = new Neuland.ResearchMethod("pattern", 6);
				 */

			}

		}
	}

	this.ongoing_job = function(bar) {
		var artifact = bar.artefact;

	}

	this.toolbar_interaction = function(bar) {
		labtest = bar;

		if(bar.methods[0].completed == true) {
			$("#db_analysis").addClass("an_completed");
		} else {
			if(bar.methods[0].analysis || bar.methods[0].started) {
				// alert("hier läuft die Analyse");
				$("#db_analysis").addClass("an_ongoing");
			} else {
				$("#db_analysis").click(function() {
					id = $(this).attr("artifact");

					// alert("könnte eine DB-Analyse starten für das Element mit der ID " + id);
					$("#db_analysis").addClass("an_selected");
					self.start_analysis(1, id);

				});
			}

		}

		if(bar.methods[1].completed == true) {
			$("#fingerprint_analysis").addClass("an_completed");
		} else {
			if(bar.methods[1].analysis || bar.methods[1].started) {
				// alert("Analyse läuft");
				$("#fingerprint_analysis").addClass("an_ongoing");

			} else {

				$("#fingerprint_analysis").click(function() {

					id = $(this).attr("artifact");
					$("#fingerprint_analysis").addClass("an_selected");
					self.start_analysis(2, id);

				});
			}
		}

		if(bar.methods[2].completed == true) {
			$("#chemo_analysis").addClass("an_completed");
		} else {
			if(bar.methods[2].analysis) {
				// alert("Analyse läuft");
				$("#chemo_analysis").addClass("an_ongoing");

			} else {
				$("#chemo_analysis").click(function() {

					id = $(this).attr("artifact");
					$("#chemo_analysis").addClass("an_selected");
					self.start_analysis(3, id);

				});
			}
		}

		if(bar.methods[3].completed == true) {
			$("#dna_analysis").addClass("an_completed");
		} else {
			if(bar.methods[3].analysis) {
				$("#dna_analysis").addClass("an_ongoing");

			} else {
				///

				$("#dna_analysis").click(function() {

					id = $(this).attr("artifact");
					$("#dna_analysis").addClass("an_selected");
					self.start_analysis(4, id);

				});

				///
			}
		}

		if(bar.methods[4].completed == true) {
			$("#spectral_analysis").addClass("an_completed");
		} else {
			if(bar.methods[4].analysis) {
				$("#spectral_analysis").addClass("an_ongoing");

			} else {
				///

				$("#spectral_analysis").click(function() {

					// alert("könnte eine Spectral-Analyse starten");
					id = $(this).attr("artifact");
					$("#spectral_analysis").addClass("an_selected");
					self.start_analysis(5, id);

				});

				///
			}
		}

		if(bar.methods[5].completed == true) {
			$("#crypto_analysis").addClass("an_completed");
		} else {
			if(bar.methods[5].analysis) {

				$("#crypto_analysis").addClass("an_ongoing");

			} else {
				///
				$("#crypto_analysis").click(function() {

					// alert("könnte eine Krypto-Analyse starten");
					id = $(this).attr("artifact");

					$("#crypto_analysis").addClass("an_selected");
					self.start_analysis(6, id);
				});

				///
			}
		}

		if(bar.methods[6].completed == true) {
			$("#pattern_analysis").addClass("an_completed");
		} else {
			if(bar.methods[6].analysis) {
				$("#pattern_analysis").addClass("an_ongoing");
			} else {
				///

				$("#pattern_analysis").click(function() {

					// alert("könnte eine Pattern-Analyse starten");
					id = $(this).attr("artifact");

					$("#pattern_analysis").addClass("an_selected");
					self.start_analysis(7, id);
				});

				///
			}
		}

	}

	this.paint_toolbar = function(bar, artifact) {
		frage = bar;

		id = artifact.id;

		divtest = artifact;

		var s = '<div id = "analysis_header">ANALYSIS</div>';
		s += '<div id = "analysis_bio">--- BIO</div>';
		s += '<div id = "analysis_math">--- MATH</div>';
		s += '<div id = "analysis_data">--- DATA</div>';

		s += '<div id = "analysis_blocker">';
		s += '<div id = "analysis_blocker_interior">';

		s += '<img src = "' + artifact.artifact.icon_large + '"/>';

		s += '</div>';

		s += '</div>';

		s += '<div id = "fingerprint_analysis" class = "analysis" artifact = "' + id + '">';
		s += '<div class = "content">FINGERPRINTS</div>';
		s += '<div id = "fingerprint_progress" class = "progressbar"></div>';
		s += '</div>';

		s += '<div id = "spectral_analysis" class = "analysis" artifact = "' + id + '">';
		s += '<div class = "content">SPECTRAL</div>';
		s += '<div id = "spectral_progress" class = "progressbar"></div>';
		s += '</div>';

		s += '<div id = "db_analysis" class = "analysis" artifact = "' + id + '">';
		s += '<div class = "content">DATA</div>';
		s += '<div id = "data_progress" class = "progressbar"></div>';
		s += '</div>';

		s += '<div id = "chemo_analysis" class = "analysis" artifact = "' + id + '">';
		s += '<div class = "content">CHEMICAL</div>';
		s += '<div id = "chemo_progress" class = "progressbar"></div>';
		s += '</div>';

		s += '<div id = "crypto_analysis" class = "analysis" artifact = "' + id + '">';
		s += '<div class = "content">CRYPTO</div>';
		s += '<div id = "crypto_progress" class = "progressbar"></div>';
		s += '</div>';

		s += '<div class = "blind_analysis"></div>';

		s += '<div id = "dna_analysis" class = "analysis" artifact = "' + id + '">';
		s += '<div class = "content">DNA</div>';
		s += '<div id = "dna_progress" class = "progressbar"></div>';
		s += '</div>';

		s += '<div id = "pattern_analysis" class = "analysis" artifact = "' + id + '">';
		s += '<div class = "content">PATTERN</div>';
		s += '<div id = "pattern_progress" class = "progressbar"></div>';
		s += '</div>';

		$("#tools").html(s);

		self.toolbar_interaction(bar);

		self.check_progress_bars(artifact);

	}

	this.check_progress_bars = function(artifact) {
		// alert("Progressbars checken " + artifact.id);

		for(var i = 0; i < self.running_jobs.length; i++) {
			job = self.running_jobs.at(i);
			job.attributes.visible = false;
		}

		for(var i = 0; i < self.running_jobs.length; i++) {
			job = self.running_jobs.at(i);
			if(job.attributes.artifact_id == artifact.id) {
				// alert("dynamische Progressbar");
				job.attributes.visible = true;
			}
		}
	}

	this.set_toolbar = function(art) {
		b = new Neuland.AnalysisBar(art);

		if(art.analysis_jobs) {
			for( i = 0; i < art.analysis_jobs.length; i++) {
				an = art.analysis_jobs[i];
				switch(an.research_method_key) {
					case "database":

						b.methods[0].analysis = an;

						if(an.completed == true) {
							b.methods[0].completed = true;
						}
						break;

					case "fingerprints":
						b.methods[1].analysis = an;

						if(an.completed == true) {
							b.methods[1].completed = true;

						}

						break;

					case "chemical":
						// alert("Hier kommt die Chemie");
						b.methods[2].analysis = an;
						if(an.completed == true)
							b.methods[2].completed = true;

						break;

					case "DNA":
						// alert("Hier kommt die DNA");

						b.methods[3].analysis = an;
						if(an.completed == true)
							b.methods[3].completed = true;
						break;

					case "spectral":
						// alert("Hier Spektralanalyse");

						b.methods[4].analysis = an;
						if(an.completed == true)
							b.methods[4].completed = true;
						break;

					case "cryptographic":
						// alert("Hier die Kryptographie");
						b.methods[5].analysis = an;
						if(an.completed == true)
							b.methods[5].completed = true;
						break;

					case "pattern":
						// alert("Hier Patternanalyse");
						b.methods[6].analysis = an;
						if(an.completed == true)
							b.methods[6].completed = true;
						break;

					default:
						alert(an.research_method_key)
						break;
				}

			}

			self.paint_toolbar(b, art);
		}

	}

	this.artifact_info_window = function() {
		h = window.innerHeight;

		pos = $("#Neuland").position();

		if(pos.top < h * 0.2) {
			hw = h - pos.top - $("#Neuland").height();
			tp = pos.top + $("#Neuland").height();

			$("#ArtifactInfo").css({
				top : tp,
				height : hw,

			});

		} else {

			$("#ArtifactInfo").css({
				top : 0,
				height : pos.top,

			});
		}
	}

	this.team_member_avatar = function(id) {
		mates = mega_machine.public.player.ego.teammates;

		for(var i = 0; i < mates.length; i++) {
			if(mates[i].id == id)
				return mates[i].avatar_url;
		}

		return mega_machine.public.player.ego.avatar_url;
	}

	this.get_analysis_job_info = function(job) {
		var s = "";

		var s = '<div class = "analysis_job">';

		s += '<div class = "avatar">';
		img = self.team_member_avatar(job.player_id);
		s += '<img src = "' + img + '"/>';
		s += '</div>';

		s += '<div class = "results">';
		s += '<div class = "name">';
		s += job.research_method_name;
		s += '</div>';

		s += '<div class = "date">';
		s += job.created_at;
		s += '</div>';

		s += '<div class = "description">';
		s += job.outcome;
		s += '</div>';

		s += '</div>';

		s += '</div>';

		return s;
	}

	this.artifact_info = function(artifact) {
		self.artifact_info_window();
		var s = "";

		if(artifact.artifact) {

			s += '<div class = "artifact_data">';
			s += '<div class = "title">';
			s += artifact.artifact.name;
			s += '</div>';

			s += '<div class = "description">';
			s += artifact.artifact.description;
			s += '</div>';

			s += '</div>';
		}

		if(artifact.analysis_jobs) {

			for(var i = 0; i < artifact.analysis_jobs.length; i++) {
				an = artifact.analysis_jobs[i];
				s += self.get_analysis_job_info(an);
			}

			$("#ArtifactInfoContent").html(s);
		}
	}

	this.detail_analysis = function(id) {
		$(".Artifacts").removeClass("selected_artifact");

		var n = $("#team_artifact_" + id);
		n.addClass("selected_artifact");

		a = self.get_artifact(id);

		if(self.laboratory == null)
			self.laboratoy = new Neuland.Laboratory(self);

		// $("#LabDetailedView").show();

		self.set_toolbar(a);
		self.artifact_info(a);

		$("#ArtifactInfo").show();
	}

	this.preview = function(id) {
		a = self.get_artifact(id);

		analysis = {};

		if(a.analysis_jobs) {
			// alert("Analysejobs " + a.analysis_jobs.length);

			for(var i = 0; i < a.analysis_jobs.length; i++) {
				an = a.analysis_jobs[i];
				if(an.completed == false) {
					// alert("Job ist noch nicht erledigt");
				} else {
					// alert (an.research_method_key);
				}
			}

		}

	}

	this.close_full_details = function() {
		$("#LabDetailedView").fadeOut();
	}

	this.assign_ressource = function(data) {
		// alert("sollte die Ressource zuordnen " + data.artifact);

		for(var i = 0; i < self.team.artifacts.length; i++) {
			a = self.team.artifacts[i];

			// alert("Data-Artefakt "  + data.artifact);

			if(a.artifact.id == data.artifact) {
				a.type = data.type;
				a.ressource = data.ressource;
				self.paint_full_detailed_ressource(a);
			}
		}
	}

	this.call_ressource = function(url) {
		$.ajax({
			type : "GET",
			url : url

		}).done(function(msg) {

			mega_machine.lab_context.assign_ressource(msg);

		});

	}

	this.read_artifact_ressource = function(artifact, artifact_parent) {
		divtest = artifact_parent;

		for(var i = 0; i < artifact.actions.length; i++) {
			t = artifact.actions[i].type;
			switch(t) {
				case "ActionImage":
					artifact.type = "image";
					return artifact.actions[i].attached_media;
					break;

				case "ActionAudio":
					artifact.type = "audio";
					artifact.audio_action = artifact.actions[i].id;
					
					self.get_artifact_media(artifact_parent);

					// return artifact.actions[i].attached_media;
					return "audio";
					break;

				case "ActionVideo":				
					artifact.type = "video";
					artifact.video_action = artifact.actions[i].id;

					labtest = artifact;
					// alert("ACTION VIDEO " + artifact.actions[i].attached_media);
					return "video";


					break;
			}

		}

	}

	this.get_artifact_media = function(team_artifact) {

		var url = "/engine/team_artifacts/" + team_artifact.id;

		$.ajax({
			type : "GET",
			url : url

		}).done(function(msg) {

			team_artifact.media = msg.media;

		});

	}

	this.get_artifact_ressource = function(artifact) {
		if(artifact.actions.length == 1) {
			// var s = "/engine/artifact_ressource/action_id=" + artifact.actions[0].id;
			// alert(s);
			t = artifact.actions[0].type;
			switch(t) {
				case "ActionImage":
					var s = "/engine/artifact_ressource?type=image&key=" + artifact.actions[0].key + "&artifact_id=" + artifact.id;
					self.call_ressource(s);
					break;

				case "ActionAudio":
					var s = "/engine/artifact_ressource?type=audio&key=" + artifact.actions[0].key + "&artifact_id=" + artifact.id;

					self.call_ressource(s);

					break;

				case "ActionVideo":
					var s = "/engine/artifact_ressource?type=video&key=" + artifact.actions[0].key + "&artifact_id=" + artifact.id;
					self.call_ressource(s);
					break;
			}

		}

	}

	this.artifact_action = function(artifact) {
		
		
		if (artifact.ressource == "video")	
			{
			simple_action(artifact.artifact.video_action);
			}
		

		if (artifact.ressource == "audio")	
			{
			simple_action(artifact.artifact.audio_action);
			}


		// ActionInvoker.invoke("/player_artifact_actions?team_artifact_id=" + id, function() {

			// return Teams.loadArtifact(id, callback);
		// });

	}

	this.audio_test = function() {

	}

	this.full_details = function(id) {
		a = self.get_artifact(id);

		if(a.artifact) {

			if(!a.ressource) {
				// alert("attached media einlesen");
				a.ressource = self.read_artifact_ressource(a.artifact, a);

				if(a.ressource != "video" && a.ressource != "audio") {
					$("#LabDetailedView").show();
					self.paint_full_detailed_ressource(a);

				} else {
					self.artifact_action(a);
				}

			} else {
				// $("#LabDetailedView").show();
				// self.paint_full_detailed_ressource(a);
				self.display_artifact(a);

			}
		}

	}

	this.display_artifact = function(a) {
		if(a.ressource != "video" && a.ressource != "audio") {
			$("#LabDetailedView").show();
			self.paint_full_detailed_ressource(a);

		} else {
			if(a.media)// hier sind die Medien dem Objekt zugeordnet
			{
				mega_machine.jsplayer(a.media, true);
			} else
				self.artifact_action(a);
		}
	}

	this.paint_full_detailed_ressource = function(a) {
		frage = a;

		switch(a.artifact.type) {
			case "image":

				var img = a.ressource;

				var div = '<div id = "DetailViewContent">';
				div += '<img src = "' + img + '" id ="detail_image"/>';
				div += '</div>';

				$("#DetailedItem").html(div);

				jQuery(function($) {
					$("#detail_image").smoothZoom({
						width : "100%",
						height : "100%",
						pan_BUTTONS_SHOW : "YES",
						pan_LIMIT_BOUNDARY : "YES",
						button_SIZE : 24,
						button_ALIGN : "top right",
						zoom_MAX : 400,
						border_TRANSPARENCY : 20
					});
				});

				// var s = "mega_machine.lab_context.call_zoomer()";
				// window.setTimeout(s, 50);

				break;

			case "audio":
				break;

			case "video":
				break;

		}

	}

	this.call_zoomer = function() {
		jQuery(function($) {
			$("#detail_image").smoothZoom({
				width : 512,
				height : 384,
				pan_BUTTONS_SHOW : "NO",
				pan_LIMIT_BOUNDARY : "NO",
				button_SIZE : 24,
				button_ALIGN : "top right",
				zoom_MAX : 100,
				border_TRANSPARENCY : 20
			});
		});
	}

	this.paint_item = function(artifact) {
		self.painted = true;

		var id = "team_artifact_" + artifact.id;

		var s = '<div class = "Artifacts" id = "' + id + '"   data_id = "' + artifact.id + '">';

		s += '<div class = "ArtifactsImage">';
		s += '<img src = "' + artifact.artifact.icon_large + '"/>';
		s += '</div>';

		s += '<div class = "name">';
		s += artifact.artifact.name;
		s += '</div>';
		s += '</div>';

		$("#ArtifactLayer").append(s);

		data = self.get_display_info(artifact.id);
		data = self.position_check(artifact, data);

		console.log("LEFT " + data.left + " -- TOP " + data.top);

		var n = $("#" + id);

		n.css({
			left : data.left + "%",
			top : data.top + "%",
		});

		n.click(function() {

			if(mega_machine.lab_context.dragging == false) {
				id = $(this).attr("data_id");

				// $(this).addClass("selected_artifact");

				mega_machine.lab_context.detail_analysis(id);
			}

		});

		n.dblclick(function() {

			id = $(this).attr("data_id");
			mega_machine.lab_context.full_details(id);
			// alert("Anzeige des gesamten Bildschirms");

		});

		n.mouseover(function() {

			id = $(this).attr("data_id");
			mega_machine.lab_context.preview(id);
		});

		n.draggable({
			start : function(event, ui) {
				mega_machine.lab_context.dragging = true;
			},

			stop : function(event, ui) {

				id = $(this).attr("data_id");
				mega_machine.lab_context.update_position(id);

				var s = "mega_machine.lab_context.dragging = false";
				window.setTimeout(s, 100);
			}
		});
	}

	this.paint_artifacts = function() {
		if(self.team == null)
			self.team = self.admin.public.player.actual_team;

		var s = "";

		for(var i = 0; i < self.team.artifacts.length; i++) {
			a = self.team.artifacts[i];
			self.paint_item(a);
			// alert(a.id + " sollte die DisplayInfo holen");

		}

	}

	this.show_artifacts = function() {
		if(self.admin.public.status == "private") {
			if(self.admin.public.player.actual_team != null) {
				self.paint_artifacts();
			} else {

			}
			self.check_open_analysis_jobs();
		} else {
			mega_machine.newbie_manager.public_laboratory();
		}

	}

	this.detailed_view = function() {
		var m = '<div id = "LabDetailedView">';

		m += '<div id = "back_button">';
		// m += '<img src = "/images/new_interface/home.svg"/>';
		m += '<img src = "/images/artifact/close_50x50.png"/>';
		m += '</div>';

		m += '<div id = "DetailedItem"></div>';

		m += '</div>';

		return m;
	}

	this.upper_pos_correction = function() {
		if(mega_machine.active_range == "up") {
			var nh = $("#Neuland").height();

			tp = $("#LabContext").position().top;

			$("#LabContext").css("top", tp + nh);
		}
	}

	this.fullscreen_toggle = function() {
		var context;

		if(self.admin.lower_context) {
			if(self.admin.lower_context.name == "lab")
				context = "lower";
			else
				context = "upper";
		}

		if(context == "lower") {
			mega_machine.ruler.lower_page_setting();
			mega_machine.check_active_context();

			mega_machine.mute_communication();
		} else {
			mega_machine.ruler.upper_page_setting();
			mega_machine.check_active_context();
			mega_machine.mute_communication();
		}

	}

	this.init_context = function() {
		if(mega_machine.public.status == "public")
			mega_machine.cookie_manager.increment_attribute("lab_context", 1);

		self.admin.system_tracker.add_element("self.admin.active_context = self");
		self.admin.system_tracker.add_element("LabContext.init_context()");

		self.admin.active_context = self;
		self.admin.contextualize(self);

		if(self.lab == null) {
			var s = '<div id = "LabContext">';

			s += '<div id = "ArtifactLayer"></div>';

			s += self.detailed_view();
			s += '</div>';

			s += '<div id = "ArtifactInfo">';

			s += '<div id = "DetailView">';
			s += '<img src = "/images/new_interface/zoomer.svg"/>';
			s += '</div>';

			s += '<div id = "ArtifactInfoContent"></div>';

			s += '</div>';
			$("body").append(s);

			// self.admin.screen_size("LabContext");

			self.init_tools();

			$("#LabContext").dblclick(function() {

				// mega_machine.lab_context.fullscreen_toggle();
			});

			$("#ArtifactInfo").click(function() {

				$(this).hide();
			});

			$("#DetailView").click(function() {

				mega_machine.lab_context.full_details();

			});

			$("#back_button").click(function() {

				mega_machine.lab_context.close_full_details();
			});

			var x = $("#Neuland").height();
			h = window.innerHeight - x;
			$("#LabContext").css("height", h);

			self.lab = $("#LabContext");

			// self.upper_pos_correction();

			self.admin.ruler.new_context(self.lab, "LAB");
			mega_machine.null_communication();
			self.show_artifacts();
			//

			$("#LabContext").mouseover(function() {
				mega_machine.mouselistener.active_area = "lab";

			});

			var s = "mega_machine.lab_context.upper_pos_correction()";
			window.setTimeout(s, 1000);
		} else {
			self.handle_exception();

			self.init_tools();
			self.admin.ruler.new_context(self.lab, "LAB");
			mega_machine.null_communication();
			self.upper_pos_correction();

		}

		self.admin.interface_master.blink("lab");
	}

	this.painted = false;
	// Flag, der klärt, ob die Artefakte eingeladen sind

	this.handle_exception = function() {
		if(self.painted == false) {
			self.show_artifacts();
		}
	}

	this.init_tools = function() {
		self.admin.system_tracker.add_element("LabContext.init_tools()")

		$("#tools").html("");
	}

	this.init = function() {
		this.running_jobs = new EngineData.AnalysisJob_List();
	}

	self.init();

}
/***********************                              Der NEWS - CONTEXT                           ************************************/

var frage;

Neuland.SystemContext = function(name, admin) {
	var self = this;
	this.name = name;
	this.admin = admin;

	this.entry_list = null;

	this.div = null;

	this.renderer = null;

	this.state = "db";

	this.context = "system";

	this.max_feed = 30;

	this.actual_feed// das, was gerade zu sehen ist

	this.select_news = function(input) {
		switch(input.value) {
			case "technology":
				// self.admin.info_miner.special_feed("technology");

				if(self.admin.info_miner.technology_feed_results.length < self.max_feed)
					self.admin.info_miner.special_feed("technology");
				else
					self.admin.info_miner.remix("technology", 20);
				// d.h. 20 Elemente
				break;

			case "intelligence":
				// self.admin.info_miner.special_feed("intelligence");
				if(self.admin.info_miner.intelligence_feed_results.length < self.max_feed)
					self.admin.info_miner.special_feed("intelligence");
				else
					self.admin.info_miner.remix("intelligence", 20);
				// d.h. 20 Elemente
				break;

			case "warfare":
				// self.admin.info_miner.special_feed("warfare");

				if(self.admin.info_miner.warfare_feed_results.length < self.max_feed)
					self.admin.info_miner.special_feed("warfare");
				else
					self.admin.info_miner.remix("warfare", 20);
				// d.h. 20 Elemente
				break;

			case "science":
				// self.admin.info_miner.special_feed("science");

				if(self.admin.info_miner.science_feed_results.length < self.max_feed)
					self.admin.info_miner.special_feed("science");
				else
					self.admin.info_miner.remix("science", 20);
				break;

			case "politics":
				if(self.admin.info_miner.politic_feed_results.length < self.max_feed)
					self.admin.info_miner.special_feed("politics");
				else
					self.admin.info_miner.remix("politics", 20);
				// d.h. 20 Elemente

				break;

			case "art":
				// alert("Jetzt kommt die Kunst");
				// self.admin.info_miner.special_feed("art");
				if(self.admin.info_miner.art_feed_results.length < self.max_feed)
					self.admin.info_miner.special_feed("art");
				else
					self.admin.info_miner.remix("art", 20);
				// d.h. 20 Elemente
				break;
		}
	}

	this.fullscreen_toggle = function() {
		var context;

		if(self.admin.lower_context) {
			if(self.admin.lower_context.name == "system")
				context = "lower";
			else
				context = "upper";
		}

		if(context == "lower") {
			mega_machine.ruler.lower_page_setting();
			mega_machine.check_active_context();

			mega_machine.mute_communication();
		} else {
			mega_machine.ruler.upper_page_setting();
			mega_machine.check_active_context();
			mega_machine.mute_communication();
		}

	}

	this.check_size = function() {

		if(mega_machine.active_range == "up") {
			t = $("#Neuland").position().top;

			$("#SystemContext").css({
				top : 0,
				height : t

			});
		} else {
			$("#SystemContext").css({
				height : window.innerHeight

			});
		}

	}

	this.init_context = function() {
		if(mega_machine.public.status == "public")
			mega_machine.cookie_manager.increment_attribute("news_context", 1);

		self.admin.active_context = self;
		self.admin.contextualize(self);

		self.add_options();

		if(self.div == null) {
			// self.entry_list = new EngineData.DatabaseEntry_List();
			// self.load_entries();

			var s = '<div id = "SystemContext"></div>';
			$("body").append(s);
			self.div = $("#SystemContext");
			self.admin.ruler.new_context(self.div, "SYSTEM");

			// self.renderer = new CSS_Renderer.RenderMachine(self.admin, self.div);  // funktioniert grundsätzlich
			self.admin.display_rss();

			mega_machine.null_communication();

			self.admin.info_miner.special_feed("politics");

			$("#SystemContext").mouseover(function() {
				mega_machine.mouselistener.active_area = "system";
			});

			$("#SystemContext").dblclick(function() {
				mega_machine.system_context.fullscreen_toggle();

				self.check_size();
			});

		} else {
			self.admin.ruler.new_context(self.div, "SYSTEM");
			self.check_size();
		}

		if(mega_machine.public.status == "public")
			mega_machine.newbie_manager.first_group_interaction("news");

		self.admin.interface_master.blink("news");
	}

	this.system_input = function(text) {

		switch(self.state) {
			case "system":
				eval(text);
				break;

			case "db":
				self.DatabaseCommunication.check(text);
				break;

			default:
				console.log("system_input " + self.state);
				break;

		}

	}

	this.reset_tools = function() {
		$("#tools").html("");

		var s = '<div id = "inner_tools">';
		s += '<div class = "pointer"></div>';

		s += '<select id="news_options" onchange="mega_machine.system_context.select_news(this)">';

		s += '<option value = "politics">politics</option>';
		s += '<option value = "science">science</option>';
		s += '<option value = "intelligence">intelligence</option>';
		s += '<option value = "technology">technology</option>';
		s += '<option value = "warfare">warfare</option>';
		s += '<option value = "art">les beaux arts</option>';

		s += '</div>';

		s += '</div>';

		$("#tools").html(s);
	}

	this.add_options = function() {
		$("#tools").html("");

		var s = '<div id = "inner_tools">';

		s += '<div class = "pointer"></div>';

		s += '<select id="news_options" onchange="mega_machine.system_context.select_news(this)">';

		s += '<option value = "politics">politics</option>';
		s += '<option value = "science">science</option>';
		s += '<option value = "intelligence">intelligence</option>';
		s += '<option value = "technology">technology</option>';
		s += '<option value = "warfare">warfare</option>';
		s += '<option value = "art">les beaux arts</option>';

		s += '</div>';

		$("#tools").append(s);
	}

	this.init_tools = function() {
		self.admin.system_tracker.add_element("SystemContext.init_tools()");

		self.admin.active_area("system");

		$("#tools").html("");

		/*
		 var s = '<div id = "Database"><img src = "/images/new_interface/database.svg"></div>';

		 s += '<div id = "Bot"><img src = "/images/new_interface/bot.svg"></div>';
		 s += '<div id = "SystemCall"><img src = "/images/new_interface/console.svg"></div>';

		 s += '<div id = "politics" class = "rubrik"><div class ="text">POLITICS</div></div>';
		 s += '<div id = "intelligence" class = "rubrik"><div class ="text">INTELLIGENCE</div></div>';
		 s += '<div id = "finance" class = "rubrik"><div class ="text">FINANCE</div></div>';
		 s += '<div id = "culture" class = "rubrik"><div class ="text">CULTURE</div></div>';

		 $("#tools").append(s);

		 $("#SystemCall").click(function(){
		 mega_machine.system_context.state = "system";
		 });

		 $("#Bot").click(function(){
		 mega_machine.system_context.state = "bot";
		 });

		 $("#politics").click(function(){
		 mega_machine.info_miner.flickr_search("Peenemünde");
		 });
		 */

	}
}
/***********************                              PERSONAL                           ************************************/

Neuland.PersonalContext = function(name, admin) {
	var self = this;
	this.name = name;
	this.admin = admin;

	this.div = null;

	this.init_context = function() {
		self.admin.active_context = self;
		self.admin.contextualize(self);

		if(self.system == null) {
			var s = '<div id = "PersonalContext"></div>';
			$("body").append(s);
			self.div = $("#PersonalContext");
			self.admin.ruler.new_context(self.div, "PERSONAL");

			$("#PersonalContext").mouseover(function() {
				mega_machine.mouselistener.active_area = "personal";
			});

		} else
			self.admin.ruler.new_context(self.div, "PERSONAL");
	}

	this.system_input = function(text) {
		alert("System - Texteingabe " + text);
	}

	this.init_tools = function() {
		self.admin.system_tracker.add_element("PersonalContext.init_tools()");
		/*
		 $("#tools").html("");
		 var s = '<div id = "MailSystem"><img src = "/images/new_interface/mail.svg"></div>';

		 $("#tools").append(s);
		 */
	}
}

Neuland.ShopDepartment = function(shop_context) {
	var self = this;
	this.list = null;
	this.iterator = 0;

	this.shop_context = shop_context;

	this.left = function() {
		self.iterator++;
		if(self.iterator == self.list.length)
			self.iterator = 0;

		self.shop_context.repaint(self.list, self.iterator);

	}

	this.right = function() {
		self.iterator--;
		if(self.iterator < 0)
			self.iterator = self.list.length - 1;

		self.shop_context.repaint(self.list, self.iterator);

	}
}
/***********************                              SHOP                           ************************************/

Neuland.ShopContext = function(name, admin) {
	var self = this;
	this.name = name;
	this.admin = admin;

	this.div = null;
	this.context = "shop";

	this.sales_dep = null;
	this.goods_dep = null;
	this.premium_dep = null;
	this.active = null;

	this.active_department = "sales";

	this.start_adyen = function() {
		if(self.admin.public.status == "public") {
			self.admin.dialog.feedback("This is, as you may see, a very exclusive shop, meant for our registered agents only");
			self.start_music();

			var s = "mega_machine.newbie_manager.virgo_clinique();";
			window.setTimeout(s, 7500);
		} else {
			self.start_music();

			$("#payments_overlay iframe").attr("src", "/payments/new");
			soundManager.play("getting_money");
			$("#payments_overlay").show();
		}
	}

	this.showCreditCard = function() {
		x = document.getElementById("CreditCard");

		if(!x) {
			var s = '<div id = "CreditCard" class = "creditcard"></div>';
			// s += '<div id="payments_overlay" class="hidden" style="display: none;">';
			// s += '</div>';

			$("body").append(s);
			$("#payments_overlay").append("<iframe id = 'AdyenFrame'></iframe>");

			$("#CreditCard").click(function() {

				mega_machine.shop_context.start_adyen();
				/*
				 $("#payments_overlay iframe").attr("src", "/payments/new");
				 soundManager.play("getting_money");
				 $("#payments_overlay").show();
				 */
			});

			// $("#CreditCard").hide();

		} else
			$("#CreditCard").show();

		self.creditCard_position();

	}

	this.creditCard_hover = function(dir) {
		$("#CreditCard").unbind('mouseover');
		$("#CreditCard").unbind('mouseout');

		var orgig, target;
		if(dir == "down") {
			target = window.innerHeight - 120;
			orig = window.innerHeight - 60;
		}

		if(dir == "up") {
			target = -60;
			orig = -100;
		}

		$("#CreditCard").mouseover(function() {

			$(this).animate({
				top : target,
			}, 300);

		});

		$("#CreditCard").mouseout(function() {

			$(this).animate({
				top : orig,
			}, 300);

		});

	}

	this.creditCard_position = function() {
		if(mega_machine.lower_context) {
			if(mega_machine.lower_context == this) {
				// var top = $("#Neuland").position().top;
				h = window.innerHeight - 60;

				$("#CreditCard").css({
					left : 100,
					top : h,

				});

				self.creditCard_hover("down");
			}
		}

		if(mega_machine.upper_context) {
			if(mega_machine.upper_context == this) {
				h = -102;

				$("#CreditCard").css({
					left : 100,
					top : h,

				});

				self.creditCard_hover("up");
			}

		}

	}

	this.hideCreditCard = function() {
		$("#CreditCard").hide();
	}

	this.set_tools = function() {
		var s = "";

		s += '<div id = "inner_tools">';

		s += '<div id = "premium" class = "inactive_shop">';
		s += '<div class = "text">PREMIUM</div>';
		s += '<div class = "pointer"></div>';

		s += '</div>';

		s += '<div id = "goods" class = "inactive_shop">';
		s += '<div class = "text">GOODS</div>';
		s += '<div class = "pointer"></div>';

		s += '</div>';

		s += '<div id = "sales" class = "inactive_shop">';
		s += '<div class = "text">SALES</div>';
		s += '<div class = "pointer"></div>';

		s += '</div>';

		s += '</div>';

		$("#tools").html(s);

		$("#sales").click(function() {

			$("#sales").addClass("active_shop");
			$("#goods").removeClass("active_shop");
			$("#premium").removeClass("active_shop");

			mega_machine.shop_context.show_sales();
		});

		$("#goods").click(function() {

			$("#sales").removeClass("active_shop");
			$("#goods").addClass("active_shop");
			$("#premium").removeClass("active_shop");

			mega_machine.shop_context.show_goods();
		});

		$("#premium").click(function() {

			$("#sales").removeClass("active_shop");
			$("#goods").removeClass("active_shop");
			$("#premium").addClass("active_shop");

			mega_machine.shop_context.show_premium();
		});

	}

	this.start_music = function() {
		// soundManager.play("market_store_music");

		var media = {
		};

		media.ogg = "/audio/music/player_rating.ogg";
		media.mp3 = "/audio/music/player_rating.mp3";

		mega_machine.jsplayer(media, true);

	}

	this.stop_music = function() {
		soundManager.stop("market_store_music");
	}

	this.fullscreen_toggle = function() {
		var context;

		if(self.admin.lower_context) {
			if(self.admin.lower_context.name == "shop")
				context = "lower";
			else
				context = "upper";
		}

		if(context == "lower") {
			mega_machine.ruler.lower_page_setting();
			mega_machine.check_active_context();

			mega_machine.mute_communication();
		} else {
			mega_machine.ruler.upper_page_setting();
			mega_machine.check_active_context();
			mega_machine.mute_communication();
		}

	}

	this.init_context = function() {
		if(mega_machine.public.status == "public")
			mega_machine.cookie_manager.increment_attribute("shop_context", 1);

		self.admin.active_context = self;
		self.admin.contextualize(self);

		if(self.div == null) {
			var s = '<div id = "ShopContext"></div>';
			$("body").append(s);
			self.div = $("#ShopContext");

			self.admin.screen_size("ShopContext");

			self.admin.ruler.new_context(self.div, "SHOP");

			mega_machine.null_communication();

			self.load_items();
			self.showCreditCard();

			if(mega_machine.active_range == "up") {

				var nh = $("#Neuland").height();

				tp = $("#ShopContext").position().top;
				$("#ShopContext").css("top", tp + nh);
			}

			$("#ShopContext").mouseover(function() {
				mega_machine.mouselistener.active_area = "shop";

				// self.set_tools();

			});

			$("#ShopContext").dblclick(function() {

				mega_machine.shop_context.fullscreen_toggle();

			});

			if(mega_machine.public.status == "public")
				mega_machine.newbie_manager.first_group_interaction("shop");

		} else {
			self.admin.ruler.new_context(self.div, "SHOP");
			mega_machine.null_communication();

			self.set_tools();
			self.showCreditCard();

			/*
			 if (mega_machine.active_range == "up")
			 {
			 tp = $("#ShopContext").position().top;
			 $("#ShopContext").css("top", tp + 80);
			 }
			 */

			self.resize();
		}

		self.admin.interface_master.blink("shop");
	}
	/*
	 this.paint_items = function(data)
	 {

	 }
	 */




	this.load_items = function() {
		
		var url = "/engine/inventory_items";

		url += "?locale=" + mega_machine.public.messages.get_locale();



		$.ajax({
			type : "GET",
			url : url

		}).done(function(msg) {

			for(var i = 0; i < msg.items.length; i++) {
				var item = new EngineData.InventoryItem(msg.items[i]);

				if(item.attributes.credit_price == null && item.attributes.twin_dollar_price == null) {
				} else
					self.admin.public.shop.item_list.add(item);

			}

			// mega_machine.painter.paint_shop();
			mega_machine.shop_context.show_sales();
			mega_machine.shop_context.refresh();
			mega_machine.shop_context.set_tools();
		});
	}

	this.left_item = function() {
		switch(self.active_department) {
			case "sales":
				self.sales_dep.left();
				break;

			case "goods":
				self.goods_dep.left();
				break;

			case "premium":
				self.premium_dep.left();
				break;
		}
	}

	this.right_item = function() {
		switch(self.active_department) {
			case "sales":
				self.sales_dep.right();
				break;

			case "goods":
				self.goods_dep.right();
				break;

			case "premium":
				self.premium_dep.right();
				break;
		}
	}
	/*
	 this.check_size = function()
	 {

	 }
	 */

	this.resize = function() {
		if(mega_machine.fullscreen == false) {

			if(mega_machine.upper_context.name == "shop") {
				var tp = $("#Neuland").position().top;

				$("#ShopContext").css({
					top : 0,
					height : tp,
				});
			}

			if(mega_machine.lower_context) {

				if(mega_machine.lower_context.name == "shop") {
					var tp = $("#Neuland").position().top;
					h = window.innerHeight - tp;

					var nh = $("#Neuland").height();

					$("#ShopContext").css({
						top : tp + nh,
						height : h,
					});

				}
			}

		} else {
			if(mega_machine.active_context == mega_machine.shop_context) {

				var nh = $("#Neuland").height();

				var tp;
				if(mega_machine.lower_context.name == "shop")
					tp = nh;
				else
					tp = 0;

				h = window.innerHeight - nh;

				$("#ShopContext").css({
					height : h,
					top : tp,
				});
			}

		}

		self.refresh();
	}

	this.refresh = function() {

		if(self.active) {
			// self.resize();

			self.repaint(self.active.list, self.active.iterator);

		}

		var com = "mega_machine.shop_context.toggle_description_text()";
		window.setTimeout(com, 2000);
	}

	this.repaint = function(list, iterator) {

		$("#ShopContext").html("");

		var counter = 0;

		var s = '<div id = "ItemList">';

		for(var i = iterator; i < list.length; i++) {

			item = list.at(i);
			s += '<div class = "Item"><img src = "' + item.attributes.icon + '"/></div>';
			counter++;
		}

		if(counter < 8)
			counter = 8 - counter;

		for(var i = 0; i < counter; i++) {
			item = list.at(i);
			s += '<div class = "Item"><img src = "' + item.attributes.icon + '"/></div>';
		}

		s += '<div class = "LeftArrow"><img src = "/images/new_interface/arrow_left.svg"/></div>';
		s += '<div class = "RightArrow"><img src = "/images/new_interface/arrow_right.svg"/></div>';

		s += '</div>';

		$("#ShopContext").html(s);

		h = self.big_item_height();
		self.paint_big_items(h, list);

		fsize = parseInt(h / 10);

		$(".big_item_title").css("fontSize", fsize);
		$(".price").css("fontSize", fsize);

		fsize = parseInt(h / 25);
		$(".big_item_description").css("fontSize", fsize);

		$('#ItemList').bind('mousewheel', function(event, delta) {
			if(delta > 0)
				mega_machine.shop_context.right_item();
			else
				mega_machine.shop_context.left_item();
		});

		$('#BigItemList').bind('mousewheel', function(event, delta) {
			if(delta > 0)
				mega_machine.shop_context.right_item();
			else
				mega_machine.shop_context.left_item();
		});

		$(".LeftArrow").click(function() {
			mega_machine.shop_context.left_item();
		});

		$(".RightArrow").click(function() {
			mega_machine.shop_context.right_item();
		});

		self.position_adaption();

	}

	this.toggle_description_text = function() {

		// Lass den Text verschwinden, wenn der Shop kleiner als 30% des Screens ist
		var sh = $("#ShopContext").height();
		if(sh < window.innerHeight * 0.4) {
			console.log("TOGGLE HIDE ");

			$(".big_item_description").hide();
		} else
			$(".big_item_description").show();

		// Ende
	}

	this.position_adaption = function() {
		if(self.div == self.admin.ruler.lower_page) {
			// alert("DOWN");
			$("#ItemList").css({

				top : 0,
			});
		} else {
			sh = $("#ShopContext").height();
			pos = sh - h - 132;
			$("#BigItemList").css("top", pos);
		}

	}

	this.big_item_height = function() {
		if(self.div == mega_machine.ruler.upper_page) {
			var tp = $("#Neuland").position().top;
			return tp - 128;
		} else {
			w = window.innerHeight;
			tp = $("#ShopContext").position().top;
			height = w - tp - 130;
			return height;
		}
	}

	this.old_big_item_height = function() {
		if(self.admin.active_range == "up") {
			tp = $("#Neuland").position().top;

			return tp - 128;
		} else {

			w = window.innerHeight;
			tp = $("#ShopContext").position().top;

			height = w - tp - 130;

			return height;
		}
	}

	this.find_item = function(item_id) {
		for(var i = 0; i < self.admin.public.player.ego.player_items.length; i++) {
			item = self.admin.public.player.ego.player_items[i];
			if(item.inventory_item_id == item_id)
				return item;
		}

		return 0;
	}

	this.buy = function(item_id) {
		if(self.admin.public.player.check_item_availability(item_id) == true) {
			$.post("/orders", {
				"inventory_item_id" : item_id,
			}, function(data) {

				testfall = data;

				if(data.money_change.credits)
					mega_machine.public.player.mod_credits(data.money_change.credits);

				if(data.money_change.twin_dollars)
					mega_machine.public.player.mod_twindollars(data.money_change.twin_dollars);

				mega_machine.statusbar.show("transaction successful");
				mega_machine.statusbar.command = "inventory";

				item = data.item;
				res = mega_machine.shop_context.find_item(item.id);

				if(res) {
					res.quantity += data.inventory_change.change;
					if(mega_machine.personal.inventory)
						mega_machine.personal.inventory.repaint();
				} else {
					data.item.quantity = 1;
					data.item.inventory_item_id = data.item.id;
					self.admin.public.player.ego.player_items.push(data.item);

					if(mega_machine.personal.inventory)
						mega_machine.personal.inventory.repaint();
				}

			});

			// Ende IF
		}

	}

   
	this.enough_money = function(item)
	{
	labtest = item;
	
	
	var currency = "credits";
	var price;

	if (item.attributes.credit_price)
		{
		currency = "credits";
	 	price = item.attributes.credit_price;
	 	
	 	if (price < mega_machine.public.player.ego.credits) return 1;
	 	else return 0;
	 	}
	else 
		{
		currency = "TD";
		price = item.attributes.twin_dollar_price;
		if (price < mega_machine.public.player.ego.twin_dollars) return 1;
		else return -1;
		}								
	
	}


	this.buy_item = function(id) {
		if(mega_machine.public.status == "private") {

			for(var i = 0; i < self.admin.public.shop.item_list.length; i++) {
				item = self.admin.public.shop.item_list.at(i);

				if(item.attributes.id == id) {
					var enough = self.enough_money(item);
					if (enough != 1)
						{ 
						if (enough == 0 ) mega_machine.statusbar.show(   mega_machine.public.messages.get("missing_credits")  );		
						else mega_machine.statusbar.show(   mega_machine.public.messages.get("missing_dollar")  );

							
						}
					else
					{
					
					var s = item.attributes.name;
					s += " costs ";
					s += item.attributes.price;

					s += ". Are you sure you want to buy it?";

					command = "mega_machine.shop_context.buy(" + id + ")";

					mega_machine.dialog.confirmation(s, command);
					}
				}
			}
		} else
			mega_machine.newbie_manager.shop_feedback();
	}

	this.paint_big_items = function(height, list) {
		var size = window.innerWidth / height;
		sz = Math.ceil(size) + 1;

		var width = (height / 9) * 16;

		it = self.active.iterator;

		var target_no = it + sz;
		counter = 0;

		var s = '<div id = "BigItemList">';

		for(var i = it; i < list.length; i++) {
			if(counter < target_no) {
				item = list.at(i);
				name = "Item_" + item.attributes.id;

				s += '<div class = "BigItem" id = "' + name + '"><img src = "' + item.attributes.image + '"/>';

				s += '<div class = "Overlay">';

				s += '<div class = "big_item_title">';
				s += item.attributes.name;
				s += '</div>';

				s += '<div class = "big_item_description hyphenate">';
				s += item.attributes.description;
				s += '</div>';

				s += '<div class = "price">';
				s += item.attributes.price;
				s += '</div>';

				js = 'javascript:mega_machine.shop_context.buy_item(' + item.attributes.id + ')';

				s += '<div class = "buy" onclick = "' + js + '">';
				s += '<img src = "/images/market/buynow.png"/>';
				s += '</div>';

				s += '</div>';

				s += '</div>';
			}

			counter++;
		}

		if(counter < target_no) {
			for(var i = 0; i < list.length; i++) {
				if(counter < target_no) {
					item = list.at(i);
					name = "Item_" + item.attributes.id;

					s += '<div class = "BigItem" id = "' + name + '"><img src = "' + item.attributes.image + '"/></div>';
				}

				counter++;
			}
		}

		s += '</div>';

		$("#ShopContext").append(s);

		$("#BigItemList").css("height", height);

		$(".BigItem").css("width", width);

		Hyphenator.run();

	}

	this.paint_list = function(list) {

		var s = '<div id = "ItemList">';

		for(var i = 0; i < list.length; i++) {

			item = list.at(i);
			s += '<div class = "Item"><img src = "' + item.attributes.icon + '"/></div>';
		}

		s += '<div class = "LeftArrow"><img src = "/images/new_interface/arrow_left.svg"/></div>';
		s += '<div class = "RightArrow"><img src = "/images/new_interface/arrow_right.svg"/></div>';

		s += '</div>';

		$("#ShopContext").html(s);

		h = self.big_item_height();
		self.paint_big_items(h, list);

		$('#ItemList').bind('mousewheel', function(event, delta) {
			if(delta > 0)
				mega_machine.shop_context.right_item();
			else
				mega_machine.shop_context.left_item();

		});

		$('#BigItemList').bind('mousewheel', function(event, delta) {
			if(delta > 0)
				mega_machine.shop_context.right_item();
			else
				mega_machine.shop_context.left_item();
		});

		$(".LeftArrow").click(function() {
			mega_machine.shop_context.left_item();
		});

		$(".RightArrow").click(function() {
			mega_machine.shop_context.right_item();
		});

		if(self.admin.active_range == "down") {
			// alert("DOWN");
			$("#ItemList").css({

				top : 0,
			});
		} else {
			sh = $("#ShopContext").height();
			pos = sh - h - 132;
			$("#BigItemList").css("top", pos);
		}

	}

	this.show_sales = function() {
		var list = self.admin.public.shop.item_list;
		var sales = new EngineData.InventortyItem_List();

		testfall = list;

		for(var i = 0; i < list.length; i++) {
			if(list.at(i).attributes.category == "sales") {
				sales.add(list.at(i));
			}
		}

		self.active_department = "sales";
		self.active = self.sales_dep;

		self.sales_dep.list = sales;
		self.paint_list(sales);

		self.refresh();
	}

	this.show_goods = function() {
		var list = self.admin.public.shop.item_list;
		var goods = new EngineData.InventortyItem_List();

		testfall = list;

		for(var i = 0; i < list.length; i++) {
			if(list.at(i).attributes.category == "goods") {
				goods.add(list.at(i));
			}
		}

		self.active_department = "goods";
		self.active = self.goods_dep;
		self.goods_dep.list = goods;
		self.paint_list(goods);

		self.refresh();
	}

	this.show_premium = function() {
		var list = self.admin.public.shop.item_list;
		var premium = new EngineData.InventortyItem_List();

		testfall = list;

		for(var i = 0; i < list.length; i++) {
			if(list.at(i).attributes.category == "premium") {
				premium.add(list.at(i));
			}
		}

		self.active_department = "premium";

		self.active = self.premium_dep;

		self.premium_dep.list = premium;
		self.paint_list(premium);

		self.refresh();
	}

	this.init_tools = function() {
		self.admin.system_tracker.add_element("ShopContext.init_tools()");
		$("#tools").html("");

	}

	this.init = function() {
		self.sales_dep = new Neuland.ShopDepartment(self);
		self.goods_dep = new Neuland.ShopDepartment(self);
		self.premium_dep = new Neuland.ShopDepartment(self);
	}

	self.init();

}

Neuland.InterfaceReceptor = function(div, elem, admin, context, context_object) {
	var self = this;
	this.div
	this.admin = admin;
	this.active = false;

	this.context = context;
	this.object = context_object;

	this.id = null;

	this.activate = function(ruler) {
		self.active = true;

		self.admin.activity_meter.event("activate_receptor", self);
		self.admin.active_receptor = self;
		self.plugin(ruler);
	}

	this.set_context = function() {
		if(self.object != null) {
			self.object.init_context();
		}
	}

	this.plugin = function(ruler) {
		h = ruler.div.height();
		sh = self.div.height();

		offset = (sh - h) / 2;

		tp = parseInt(self.div.position().top + offset), ruler.div.attr("receptor", self.id)

		ruler.div.animate({

			top : tp,

		}, 300, function() {

			id = parseInt($(this).attr("receptor"));

			mega_machine.receptor_list[id].set_context();
		});

	}

	this.init = function() {
		self.id = self.admin.receptor_list.length;

		x = document.getElementById(div);
		if(!x) {
			var s = '<div id = "' + div + '"></div>';
			$("body").append(s);

			self.div = $("#" + div);

			self.div.draggable({
				axis : "y"
			});
		}
	}

	self.init();
}

Neuland.InterfaceElement = function(div, admin)// Der Supervisor empfängt die Nachrichten
{
	this.div = $("#" + div);
	this.admin = admin;

	this._new_commands = {};

	this.upper_page = null;
	this.lower_page = null;
	this.buffer = null;

	this.type = null;

	this.screwed = false;

	this.las_position = 0;
	// hält die letzte Position des Rulers fest

	this.middle_reset = false;
	// wenn das TRUE ist, werden die Seiten auf die Grundposition gesetzt

	var self = this;

	this.set_type = function() {
		$("#text_field").val(self.type);
		self.admin.active_context.init_tools();
	}

	this.hide_bar = function() {
		if($("#Bar").css("display") == "block") {
			$("#Bar").fadeOut();
			$("#text_entry").fadeOut();

			$("#Agenten").fadeOut();
			$("#PageSwitch").fadeOut();

			$("#memory_container").hide();
			$("#tools").hide();
			$("#joint_messages_handler").hide();

			$("#personal_tools").show();
			$("#PersonalAgent").show();

			$("#Bulletin").show();

			$("#PersonalAgentInfo").show();

			// $("#AgentPic").fadeIn();

			mega_machine.interface_master.remove_horizontal_line();
		}
	}

	this.show_bar = function() {
		if($("#Bar").css("display") == "none") {
			$("#Bar").fadeIn();
			$("#text_entry").fadeIn();
			$("#Agenten").fadeIn();

			$("#PageSwitch").fadeIn();

			$("#memory_container").show();
			$("#tools").show();

			$("#personal_tools").fadeOut();
			$("#PersonalAgent").hide();
			$("#PersonalAgentInfo").hide();
			$("#Bulletin").hide();

			// Der umgekehrte Prozess
			$("#AgentPic").hide();
			$("#PersonalPageTitle").fadeOut();

			$("#SystemWidget").fadeIn();

			// mega_machine.interface_master.create_horizontal();
		}
	}

	this.left_page = function() {
		switch(self.admin.active_context.name) {
			case "map":
				self.admin.shop_context.init_context();
				break;

			case "web":
				self.admin.map_context.init_context();
				break;

			case "lab":
				self.admin.web_context.init_context();
				break;

			case "system":
				self.admin.lab_context.init_context();
				break;

			case "shop":
				self.admin.system_context.init_context();
				break;

			case "narrative":
				self.admin.shop_context.init_context();
				break;

			case "surprise":
				self.admin.shop_context.init_context();
				break;

			default:
				alert(self.admin.active_context.name);
				break;
		}
	}

	this.right_page = function() {
		console.log(self.admin.active_context.name);

		switch(self.admin.active_context.name) {
			case "map":
				self.admin.web_context.init_context();
				break;

			case "web":
				self.admin.lab_context.init_context();
				break;

			case "lab":
				self.admin.system_context.init_context();
				break;

			case "system":
				self.admin.shop_context.init_context();
				break;

			case "shop":
				self.admin.map_context.init_context();
				break;

			case "narrative":
				self.admin.map_context.init_context();
				break;

			case "surprise":
				self.admin.shop_context.map_context();
				break;

			default:
				alert(self.admin.active_context.name);
				break;
		}
	}

	this.set_context = function(type, pos) {
		self.set_active(type);

		var context = null;

		switch(type) {
			case "MAP":
				context = self.admin.map_context;

				break;

			case "WEB":
				context = self.admin.web_context;
				break;

			case "LAB":
				context = self.admin.lab_context;
				break;

			case "SYSTEM":
				context = self.admin.system_context;
				break;

			case "SHOP":
				context = self.admin.shop_context;
				break;

			case "SURPRISE":
				context = self.admin.surprise;
				break;

			case "NARRATIVE":
				context = self.admin.narrative;
				break;

			case "VIDEO":
				context = self.admin.video_context;
				break;

		}

		self.admin.active_context = context;

		switch(pos) {
			case "up":
				self.admin.upper_page_context = context;
				break;

			case "down":
				self.admin.lower_page_context = context;
				break;
		}
	}

	this.set_active = function(type) {
		$(".Choice2").removeClass("clicked");
		$(".Context").css("color", "white");

		switch(type) {
			case "SHOP":

				$("#shop_interaction").addClass("clicked");
				$("#shop_interaction_text").css("color", "red");
				break;

			case "MAP":
				$("#map_interaction").addClass("clicked");
				$("#map_interaction_text").css("color", "red");
				break;

			case "WEB":
				$("#web_interaction").addClass("clicked");
				$("#web_interaction_text").css("color", "red");
				break;

			case "LAB":
				$("#lab_interaction").addClass("clicked");
				$("#lab_interaction_text").css("color", "red");
				break;

			case "SYSTEM":
				$("#news_interaction").addClass("clicked");
				$("#news_interaction_text").css("color", "red");
				break;

			case "SURPRISE":

				break;

			case "ACT":

				break;

			case "VIDEO":
				break;

			case "NARRATIVE":
				break;

			default:
				alert("setze das aktive Fenster" + type);
				break;
		}
	}

	this.check_switch = function(div, type, direction) {
		if(direction == "up") {
			if(div == self.lower_page) {
				mega_machine.statusbar.show("UP - oben und unten identisch");
				return true;
			}
		}

		if(direction == "down") {

			if(div == self.upper_page) {
				mega_machine.statusbar.show("DOWN - oben und unten identisch");
				return true;
			}
		}

		return false;
	}

	this.page_comparison = function(div, type, direction) {

		if(self.admin.lower_context && self.admin.upper_context) {
			if(self.admin.lower_context == self.admin.upper_context)
				return true;
		}

		return false;
	}

	this.check_fullscreen_context = function(div, type) {
		var lp = $("#Neuland").attr("lastpos");
		var target = $(div).attr("lastpos");

		var nh = $("#Neuland").height();

		if(!target) {
			if(self.admin.active_range == "down")
				$(div).attr("lastpos", lp + nh);
			if(self.admin.active_range == "up") {
				h = $(div).height();
				$(div).attr("lastpos", lp - h);
			}
		}
	}

	this.page_switcher = function() {
		var nh = $("#Neuland").height();

		var tp = $("#Neuland").position().top + nh;

		self.lower_page = self.upper_page;
		self.lower_page.css({
			top : tp + h,
		});

		self.lower_page.show();

	}

	this.new_context = function(div, type) {
		self.admin.null_communication(type);
		// stellt sicher, dass das Eingabefeld frei wird

		if(mega_machine.fullscreen == true)
			self.check_fullscreen_context(div, type);
		// damit die Positionen beim Reset synchronisiert werden

		if(div != self.buffer) {
			var tp = $("#Neuland").position().top;
			var h = $("#Neuland").height();
			var wh = window.innerHeight;

			var y = 0;

			if(self.admin.active_range == "up") {
				var old_context = self.admin.upper_page_context;
				// falls es einen Switch gibt
				// var sw = self.check_switch(div, type, "up"); // outdated

				self.set_context(type, "up");
				var sw = self.page_comparison(div, type, "up");
				// NEU !!!

				$("#UpperMiniLabel").html(type);

				self.type = type;
				// self.buffer = div;
				div.show();

				self.upper_page.hide();

				// Ausnahmefall
				if(sw == true)// HHH
				{
					self.lower_page = self.upper_page;
					self.lower_page.css({
						top : tp + h,
					});

					self.lower_page.show();
					self.page_switch_handling("down", old_context);

					self.context_switch();
					mega_machine.special_repaint();

				}
				/////

				self.upper_page = div;
				y = tp - wh;

			} else {
				var old_context = self.admin.lower_page_context;
				// falls es einen Switch gibt
				// var sw = self.check_switch(div, type, "down"); // outdated

				self.set_context(type, "down");
				self.set_label("down", type);
				var sw = self.page_comparison(div, type, "down");
				// NEU !!!

				self.type = type;
				self.buffer = div;
				div.show();
				self.lower_page.hide();

				// Ausnahmefall
				if(sw == true) {
					self.upper_page = self.lower_page;
					self.upper_page.css({
						top : tp - wh,
					});

					self.upper_page.show();

					self.page_switch_handling("up", old_context);

					self.context_switch();

					mega_machine.special_repaint();

					// self.set_context(self.upper_page_context.name, "up");

				}
				/////

				self.lower_page = div;
				y = tp + h;

			}

			$("#text_field").val(type);

			div.css({
				top : y,
			});

		}

	}

	this.context_switch = function() {
		if(self.admin.lower_page_context == self.admin.upper_page_context) {
			var s = "oben und unten identisch " + self.admin.upper_page_context.name;

			mega_machine.statusbar.show(s);

		}

	}

	this.page_context_info = function(old) {
		var s = "Der obere Kontext ist " + self.admin.upper_page_context.name;
		s += "-- Der untere Kontext ist " + self.admin.lower_page_context.name;

		alert(s);

		return s;

	}

	this.page_switch_handling = function(dir, old_context) {
		name = old_context.name;

		switch(name) {
			case "map":
				self.set_label(dir, "MAP");
				break;

			case "lab":
				self.set_label(dir, "LAB");
				break;

			case "web":
				self.set_label(dir, "WEB");
				break;

			case "shop":
				self.set_label(dir, "SHOP");
				break;

			case "system":
				self.set_label(dir, "SYSTEM");
				break;

			default:
				alert(name);
				break;
		}

		if(dir == "up") {

			self.admin.upper_page_context = old_context;
			self.admin.upper_context = old_context;

		} else {

			self.admin.lower_page_context = old_context;
			self.admin.lower_context = old_context;
		}

	}

	this.set_label = function(dir, type) {
		var label = "";

		switch(type) {
			case "MAP":
				label = "MAP";
				break;

			case "WEB":
				label = "WEB";
				break;

			case "SHOP":
				label = "STORE";
				break;

			case "SYSTEM":
				label = "NEWS";
				break;

			case "LAB":
				label = "LAB";
				break;
		}

		if(dir == "up")
			$("#UpperMiniLabel").html(label);
		else
			$("#LowerMiniLabel").html(label);
	}

	this.text_entry_clicked = 0;

	this.text_entry_supervisor = function() {
		n = new Date().getTime();

		if(n > self.text_entry_clicked + 10000) {
			if($("#text_entry    input").is(":focus"))
				text_entry_clicked = n + 10000;
			else
				$("#text_entry").fadeOut();
		}

	}

	this.loop = function() {
		/*
		 if (self.div.position().top < 0) self.div.css("top", 0);

		 h = window.innerHeight - 44;
		 if (self.div.position().top > h) self.div.css("top", h);
		 */

		this.text_entry_supervisor();
	}

	this.check_receptors = function(event) {
		for( k = 0; k < self.admin.receptor_list.length; k++) {
			pos = self.admin.receptor_list[k].div.position();
			height = self.admin.receptor_list[k].div.height();

			console.log("Neuschreiben der Leisten");

			if(event.clientY > pos.top && event.clientY < pos.top + height) {
				self.admin.receptor_list[k].activate(self);
			} else {
				// Überlappung des Rulers testen
			}

		}
	}

	this.check_special_cases = function() {
		mega_machine.special_repaint();
	}

	this.sidebar_windows = function() {
		if($("#ArtifactInfoContent").css("display") == "block") {
			mega_machine.lab_context.artifact_info_window();
		}
	}

	this.check_web = function() {
		if(mega_machine.upper_page_context) {
			if(mega_machine.upper_page_context.name == "web")
				self.add_web_overlay();
		}

		if(mega_machine.lower_page_context) {
			if(mega_machine.lower_page_context.name == "web")
				self.add_web_overlay();
		}

	}

	this.add_web_overlay = function() {
		var s = '<div id = "web_overlay"></div>';
		$("body").append(s);

		$("#web_overlay").css({
			top : $("#WebContext").position().top,
			height : $("#WebContext").height(),
		});
	}

	this.remove_web = function() {
		$("#web_overlay").remove();
	}

	this.original_position = function() {
		// alert("solllte die Fenster in die Normalposition bringen");
		h = window.innerHeight / 2 - 40;

		var nh = $("#Neuland").height();

		$("#Neuland").css("top", h);
		self.lower_page.css("top", h + nh);

		if(self.upper_page) {
			hp = self.upper_page.height();

			if(hp < h * 0.5)
				alert("hier gibt es ein Problem");

			target = h - hp;
			self.upper_page.css("top", target);
		}

	}

	this.sensitive_margin = function() {
		self.middle_reset = true;

		if(tp < h * 0.1) {
			if(mega_machine.ruler.force_process == 0) {
				mega_machine.ruler.force_process = 1;
				mega_machine.ruler.force_fullscreen("down");
			}

		} else {
			if(mega_machine.ruler.force_process == 0) {
				mega_machine.ruler.force_process = 1;
				mega_machine.ruler.force_fullscreen("up");
			}

		}
	}

	this.center_process = 0;

	this.center_position = function() {
		mega_machine.set_active_page(mega_machine.active_range);

		h = window.innerHeight / 2 - 40;

		$("#Neuland").css("top", h);
		var nh = $("#Neuland").height();

		self.lower_page.css("top", h + nh);

		if(self.upper_page) {
			hp = self.upper_page.height();

			if(hp < h * 0.5)
				alert("hier gibt es ein Problem");

			target = h - hp;
			self.upper_page.css("top", target);
		}

		mega_machine.set_draggable();
	}

	this.reset_bars = function() {
		mega_machine.fullscreen = false;
		$("#LowerMini").show();
		$("#UpperMini").show();

		if(mega_machine.active_range == "down") {
			$("#LowerMini").css({
				top : "37.5%",
				height : "60%",

			});

			$("#UpperMini").css({
				top : 0,
				height : "33%",

			});

		} else {
			$("#UpperMini").css({
				"backgroundColor" : "rgba(255, 0,0, 1)",
				opacity : 1,
				top : "2.5%",
				height : "60%",
			});

			$("#LowerMini").css({
				"backgroundColor" : "rgba(255,255,255, 0.5)",
				top : "66%",
				height : "33%",
			});
		}

	}

	this.page_position_calm_down = function() {
		tp = $("#Neuland").position().top;
		h = window.innerHeight;

		self.admin.system_tracker.resize();

		nh = $("#Neuland").height();

		if(tp < h * 0.1 || tp > h * 0.8)
			self.sensitive_margin();
		else {
			if(mega_machine.fullscreen == true)
				self.reset_bars();

			start = self.lower_page.position().top;

			$(self.lower_page).tween({

				top : {
					start : start,
					stop : tp + nh,
					time : 0,
					units : 'px',
					duration : 0.3,
					effect : 'easeInOut'
				},

			});

			/////////////////////////////////////////////

			$.play();
		}

	}

	this.handle_fullscreen_exception = function() {
		if(self.center_process == 0) {
			self.center_process = 1;
			mega_machine.unset_draggable();
			var s = "mega_machine.ruler.center_position()";
			window.setTimeout(s, 400);
		}

	}

	this.page_position = function(event, correction) {
		h = window.innerHeight;
		tp = self.div.position().top;

		self.middle_reset = false;

		hp = self.upper_page.height();
		target = tp - hp;
		self.upper_page.css("top", target);

		target = tp + self.div.height();
		if(!correction == true)
			target = target - 12;

		self.lower_page.css("top", target - 12);

		if($("#SystemWidget").position().left < window.innerWidth)
			self.admin.system_tracker.resize();

	}

	this.page_position_old = function(event, correction) {

		h = window.innerHeight;
		tp = self.div.position().top;

		if(mega_machine.fullscreen == true)
			self.handle_fullscreen_exception();
		else {
			//

			self.middle_reset = false;

			hp = self.upper_page.height();
			target = tp - hp;
			self.upper_page.css("top", target);

			target = tp + self.div.height();
			if(!correction == true)
				target = target - 12;

			self.lower_page.css("top", target - 12);

			if($("#SystemWidget").position().left < window.innerWidth) {
				console.log("Anpassung des Widgets");
				self.admin.system_tracker.resize();
			}
		}

	}

	this.reset_fullscreen = function(page) {
		if(page == "up") {
			lp = $(self.upper_page).attr("lastpos");
			h = $("#Neuland").height();
			sw = window.innerHeight;

			// TWEEN

			$('#Neuland').tween({
				top : {
					start : sw - h,
					stop : lp2,
					time : 0,
					units : 'px',
					duration : 0.7,
					effect : 'easeInOut'
				},

			});

			$(self.upper_page).tween({

				top : {
					start : 0,
					stop : lp,
					time : 0,
					units : 'px',
					duration : 0.7,
					effect : 'easeInOut',

					onStop : function() {
						mega_machine.ruler.check_special_cases();
					}
				},

			});

			////////////////////// lower page /////////
			var nh = $("#Neuland").height();

			$(self.lower_page).tween({

				top : {
					start : sw,
					stop : lp2 + nh,
					time : 0,
					units : 'px',
					duration : 0.7,
					effect : 'easeInOut'
				},

			});

			/////////////////////////////////////////////

			$.play();

			$(self.lower_page).show();

		} else {
			lp = $(self.lower_page).attr("lastpos");
			lp2 = $("#Neuland").attr("lastpos");

			h = $("#Neuland").height();

			// TWEEN

			$('#Neuland').tween({
				top : {
					start : 0,
					stop : lp2,
					time : 0,
					units : 'px',
					duration : 0.7,
					effect : 'easeInOut',

					onStop : function() {
						mega_machine.ruler.check_special_cases();
					}
				},

			});

			$(self.lower_page).tween({

				top : {
					start : h,
					stop : lp,
					time : 0,
					units : 'px',
					duration : 0.7,
					effect : 'easeInOut'
				},

			});

			$.play();

			console.log("Fullscreen neu setzen");

			////////////////////// upper page /////////

			last_position = self.upper_page.position().top;
			uph = self.upper_page.height();

			$(self.upper_page).tween({

				top : {
					start : last_position,
					stop : lp2 - uph,
					time : 0,
					units : 'px',
					duration : 0.7,
					effect : 'easeInOut'
				},

			});

			/////////////////////////////////////////////

			$(self.upper_page).show();

		}
	}

	this.force_process = 0;

	this.memorize_positions = function(page) {
		if(page == "up") {
			var center = window.innerHeight / 2 - 40;
			$("#Neuland").attr("lastpos", center);
			$(self.upper_page).attr("lastpos", center - 40);
			$(self.lower_page).attr("lastpos", center + 40);
		} else {
			var center = window.innerHeight / 2 - 40;
			$("#Neuland").attr("lastpos", center);
			$(self.upper_page).attr("lastpos", center - 40);
			$(self.lower_page).attr("lastpos", center + 40);
		}
	}

	this.synchronize_positions = function(active_page)// wenn Fullscreen, stimmt die letzte Position mit dem Ziel überein
	{
		var lp = $("#Neuland").attr("lastpos");
		var target = $(active_page).attr("lastpos");
		var nh = $("#Neuland").height();

		if(!target)
			$(active_page).attr("lastpos", lp + nh);

	}

	this.reset_force_process = function() {
		self.force_process = 0;
	}

	this.force_fullscreen = function(page) {
		var s = "mega_machine.ruler.reset_force_process()";
		window.setTimeout(s, 4000);

		if(page == "up") {
			if(mega_machine.active_range == "down")
				mega_machine.change_active_page();

			mega_machine.ruler.upper_page_setting();
			mega_machine.check_active_context();
			mega_machine.mute_communication();

			self.memorize_positions();
		} else {

			if(mega_machine.active_range == "up")
				mega_machine.change_active_page();

			mega_machine.ruler.lower_page_setting();
			mega_machine.check_active_context();
			mega_machine.mute_communication();

			self.memorize_positions();

		}
	}

	this.set_fullscreen = function(page) {
		if(page == "up") {
			last_position = self.upper_page.position().top;
			$(self.upper_page).attr("lastpos", last_position);

			lp2 = $("#Neuland").position().top;
			$("#Neuland").attr("lastpos", lp2);

			h = $("#Neuland").height();
			sw = window.innerHeight;

			// TWEEN

			$('#Neuland').tween({
				top : {
					start : lp2,
					stop : sw - h,
					time : 0,
					units : 'px',
					duration : 0.7,
					effect : 'easeInOut',
					onStop : function() {
						mega_machine.ruler.check_special_cases();
						mega_machine.ruler.sidebar_windows();
					}
				},

			});

			$(self.upper_page).tween({

				top : {
					start : last_position,
					stop : 0,
					time : 0,
					units : 'px',
					duration : 0.7,
					effect : 'easeInOut'
				},

			});

			////////////// die untere Seite //////////////

			last_position = self.lower_page.position().top;

			$(self.lower_page).tween({

				top : {
					start : last_position,
					stop : sw,
					time : 0,
					units : 'px',
					duration : 0.7,
					effect : 'easeInOut'
				},

			});

			////////////////////////////////////////////////

			$.play();

			//

			// $(self.lower_page).hide();

		} else {
			last_position = self.lower_page.position().top;
			$(self.lower_page).attr("lastpos", last_position);

			lp2 = $("#Neuland").position().top;
			$("#Neuland").attr("lastpos", lp2);

			var sh = window.innerHeight;

			h = $("#Neuland").height();

			// TWEEN

			$('#Neuland').tween({
				top : {
					start : lp2,
					stop : 0,
					time : 0,
					units : 'px',
					duration : 0.7,
					effect : 'easeInOut'
				},

			});

			$(self.lower_page).tween({

				top : {
					start : last_position,
					stop : h,
					time : 0,
					units : 'px',
					duration : 0.7,
					effect : 'easeInOut',
					onStop : function() {
						mega_machine.ruler.check_special_cases();
						mega_machine.ruler.sidebar_windows();
					}
				},

			});

			////////////7 Jetzt die obere Seite /////////////////////

			last_position = self.upper_page.position().top;
			tg = last_position - self.upper_page.height();

			$(self.upper_page).tween({

				top : {
					start : last_position,
					stop : tg,
					time : 0,
					units : 'px',
					duration : 0.7,
					effect : 'easeInOut',

				},

			});

			/////////////////////////////////////////////////////////

			$.play();

			//

			// $(self.upper_page).hide();

		}

	}

	this.check_position = function() {

	}

	this.lower_page_setting = function() {
		// alert("LOWERPAGE");

		if(mega_machine.active_range == "down") {
			if(mega_machine.fullscreen == false) {
				mega_machine.fullscreen = true;
				mega_machine.ruler.set_fullscreen("down")

				/// CSS
				$("#LowerMini").css({
					top : 0,
					height : "100%",

				});

				$("#UpperMini").css({
					top : 0,
					height : 0,

				});
				// Ende CSS
			} else {
				mega_machine.fullscreen = false;
				mega_machine.ruler.reset_fullscreen("down")

				$("#LowerMini").css({
					top : "37.5%",
					height : "60%",
					color : "white",
				});

				$("#UpperMini").css({
					top : 0,
					height : "33%",
					color : "black"
				});
				// Ende CSS
			}

		} else {
			mega_machine.active_range = "down";
			self.change_mini_display("down");
			self.toolbar_reset("down");
		}
	}

	this.change_mini_display = function(range) {

		if(range == "up") {
			$("#UpperMini").css({
				"backgroundColor" : "rgba(255,0,0, 1)",
				opacity : 1,
				top : "-2.5%", // war 2.5
				height : "60%",
				color : "white",
			});

			$("#LowerMiniLabel").css({
				color : "black",
			});

			$("#UpperMiniLabel").css({
				color : "white",
			});

			$("#LowerMini").css({
				"backgroundColor" : "rgba(255,255,255, 0.5)",
				top : "66%",
				height : "33%",
				color : "black",                                          // war 33
			});
		} else {
			$("#LowerMini").css({
				"backgroundColor" : "rgba(255,0,0, 1)",
				opacity : 1,
				top : "42.5%",
				height : "60%",
				color : "white",
			});

			$("#LowerMiniLabel").css({
				color : "white",
			});

			$("#UpperMiniLabel").css({
				color : "black",
			});

			$("#UpperMini").css({
				"backgroundColor" : "rgba(255,255,255, 0.5)",
				top : 0,
				height : "33%",
				color : "white"
			});

		}

	}

	this.upper_page_setting = function() {

		if(mega_machine.active_range == "up") {
			if(mega_machine.fullscreen == false) {
				mega_machine.fullscreen = true;
				mega_machine.ruler.set_fullscreen("up");

				/// CSS
				$("#UpperMini").css({
					top : 0,
					height : "100%",

				});

				$("#LowerMini").hide();
				// Ende CSS
			} else {
				mega_machine.fullscreen = false;
				mega_machine.ruler.reset_fullscreen("up");

				$("#LowerMini").css({
					height : "33%",
					top : "66%",
					color : "black",
				});

				$("#UpperMini").css({
					height : "60%",
					top : "2.5%",
					color : "white",
				});

				$("#LowerMini").show();
				// Ende CSS
			}

		} else {

			mega_machine.active_range = "up";

			self.change_mini_display("up");

			self.toolbar_reset("up");

		}
	}

	this.exchange_toolbar = function(name) {
		switch(name) {
			case "map":
				mega_machine.map_context.reset_tools();
				break;

			case "system":
				mega_machine.system_context.reset_tools();
				break;

			case "shop":
				mega_machine.shop_context.set_tools();
				break;

			case "web":
				mega_machine.web_context.reset_tools();
				break;

			case "lab":
				mega_machine.lab_context.init_tools();
				break;

			case "narrative":
				mega_machine.zero_tools();
				break;

			case "video":
				mega_machine.zero_tools();
				break;

			default:
				alert(name);
				break;
		}
	}

	this.toolbar_reset = function(dir) {
		if(dir == "up" && mega_machine.upper_page_context)
			self.exchange_toolbar(mega_machine.upper_page_context.name)
		if(dir == "down" && mega_machine.lower_page_context)
			self.exchange_toolbar(mega_machine.lower_page_context.name)
	}

	this.legal_notes = function() {

		var s = '<div class = "legal_notes">';
		s += '<div id = "impressum">impressum</div>';
		s += '<div id = "AGB">AGB</div>';
		s += '</div>';
		s += '<div id = "copyright">©Ludic Philosophy, 2010-2013</div>';

		$("body").append(s);

		$("#impressum").click(function() {
			mega_machine.public.impressum();
		});

		$("#AGB").click(function() {
			mega_machine.public.agb();
		});

	}

	this.init = function() {
		var uid = "3ce95f4f995e4d"

		var s = '<div id = "Neuland"  class = "Neuland">';

		s += '<div id = "HorizontalBar" class = "horizontal"></div>';

		s += '<div id = "statusbar">';
		s += '<div class = "horizontal"></div>';
		s += '<div id = "status_message">YOU HAVE GAINED A NEW ACHIEVEMENT</div>';
		s += '</div>';

		s += '<div id = "reminder"></div>';
		// s += '<div id = "reminder_button"><img src ="/images/new_interface/upgrade.svg"/></div>';
		s += '<div id = "reminder_button">NEXT MISSION</div>';

		s += '<div id = "PersonalAgent"></div>';
		s += '<div id = "PersonalAgentInfo">';
		s += '<div id = "PersonalAgentName" class = "name">AGENT NONAME</div>';
		// s += '<div class = "unique">_' + uid + '</div>';
		s += '</div>';

		s += '<div id = "Agenten">';
		s += '<div id = "Agent_A"><img src = "/images/new_interface/Seberg.jpg"/></div>';

		s += '<div id = "Agent_B"><img src = "/images/new_interface/chickens_1.jpg"/></div>';
		s += '<div id = "Agent_C"><img src = "/images/new_interface/chickens2.jpg"/></div>';
		s += '<div id = "Agent_D"><img src = "/images/new_interface/Seberg.jpg"/></div>';
		s += '</div>';

		s += '<div class = "eggtimer"></div>';
		s += '<div class = "closeMiddleWindow">&#x21e9</div>';		
		
		s += '<div class = "MindmapTrigger">';

		s += '<div id = "MindmapText">';
		// s += 'M<br>I<br>N<br>D<br>M<br>A<br>P';
		s += 'MINDMAP';
		s += '</div>';

		s += '</div>';

		s += '<div id = "text_entry">';
		s += '<span id = "prompt">_</span>';
		s += '</span><input type="text" id="text_field">';

		// s += '<div id = "Pointer"><img src = "/images/new_interface/triangle.png"/></div>';

		s += '</div>';

		s += '<div id = "Bar">';

		/************************** Kommunikation ***************************/

		s += '<div id = "social_interaction" class = "Choice"><div id = "team_pointer" class = "pointer"></div>';
		s += '<div id = "team_pointer_hl" class = "HL_Pointer"></div>';
		s += '<div id = "team_pointer_border" class = "HL_Border"></div>';
		s += '<div class = "Text">TEAM</div></div>';

		s += '<div id = "bot_interaction" class = "Choice"><div id = "bot_pointer" class = "pointer"></div>';
		s += '<div id = "bot_pointer_hl" class = "HL_Pointer"></div>';
		s += '<div id = "bot_pointer_border" class = "HL_Border"></div>';
		s += '<div class = "Text">BOT</div></div>';

		s += '<div id = "mail_interaction" class = "Choice"><div id = "mail_pointer" class = "pointer"></div>';
		s += '<div id = "mail_pointer_hl" class = "HL_Pointer"></div>';
		s += '<div id = "mail_pointer_border" class = "HL_Border"></div>';
		s += '<div class = "Text">MAIL</div></div>';

		s += '<div id = "db_interaction" class = "Choice"><div id = "db_pointer" class = "pointer"></div>';
		s += '<div id = "db_pointer_hl" class = "HL_Pointer"></div>';
		s += '<div id = "db_pointer_border" class = "HL_Border"></div>';
		s += '<div class = "Text">D-BASE</div></div>';

		s += '<div id = "os_interaction" class = "Choice without_top"><div id = "os_pointer" class = "pointer"></div>';
		s += '<div id = "os_pointer_hl" class = "HL_Pointer"></div>';
		s += '<div id = "os_pointer_border" class = "HL_Border"></div>';
		s += '<div class = "Text">SYSTEM</div></div>';

		s += '<div id = "stop" class = "STOP"></div>';
		/************************** Räume ***************************/

		s += '<div id = "map_interaction" class = "Choice2"><div id = "map_pointer" class = "pointer"></div>';
		s += '<div id = "map_middle_pointer" class = "middle_pointer"></div>';
		s += '<div id = "map_interaction_text" class = "Context">MAP</div></div>';

		s += '<div id = "web_interaction" class = "Choice2"><div id = "web_pointer" class = "pointer"></div>';
		s += '<div id = "web_interaction_text" class = "Context">WEB</div></div>';

		s += '<div id = "lab_interaction" class = "Choice2"><div id = "lab_pointer" class = "pointer"></div>';
		s += '<div id = "lab_interaction_text" class = "Context">LAB</div></div>';

		s += '<div id = "news_interaction" class = "Choice2"><div id = "news_pointer" class = "pointer"></div>';
		s += '<div id = "news_middle_pointer" class = "middle_pointer"></div>';
		s += '<div id = "news_interaction_text" class = "Context">NEWS</div></div>';

		s += '<div id = "shop_interaction" class = "Choice2 without_bottom"><div id = "shop_pointer" class = "pointer"></div>';
		s += '<div id = "shop_middle_pointer" class = "middle_pointer"></div>';
		s += '<div id = "shop_interaction_text" class = "Context">STORE</div></div>';

		// s += '<div id = "shop_interaction" class = "Choice2"><div class = "Context">STORE</div></div>';

		s += '</div>';

		s += '<div id = "PageSwitch">';
		s += '<div id = "UpperMini" class = "mini"><div id = "UpperMiniLabel">LABEL</div></div>';
		s += '<div id = "LowerMini" class = "mini active_element"><div id = "LowerMiniLabel">LABEL</div></div>';
		s += '</div>';

		s += '<div id = "memory_container">';

		s += '<div id = "memory_marker"></div>';
		s += '<div id = "memory"></div>';
		s += '</div>';

		s += '<div id = "tools">';
		s += '<div id = "inner_tools"></div>';
		s += '</div>';

		s += '<div id = "PersonalButtonContainer">';

		s += '<div id = "PersonalButton"><img src = "/images/new_interface/logo_weiss.svg"/></div>';

		s += '</div>';

		s += '<div class = "MoneyField">';

		// s += '<div class = "pointer"></div>';
		// s += '<div class = "pointer2"></div>';

		s += '<div class = "credits" title = "credits"></div>';
		s += '<div class = "dollars" title = "dollars"></div>';

		// s += self.admin.embed_radio(); // RADIO wird hinzugefügt

		s += '</div>';

		s += '<div id = "personal_tools"></div>';

		s += '</div>';

		s += '<div id = "UpperPage"></div>';
		s += '<div id = "LowerPage"></div>';

		s += '<div class = "MediaField">'
		s += mega_machine.embed_radio();
		s += mega_machine.embed_video_button();
		s += mega_machine.embed_logout_button();
		s += mega_machine.embed_social_media();

		s += '</div>';

		$("body").append(s);

		self.legal_notes();

		$("#statusbar").click(function() {
			mega_machine.statusbar.hide();
			mega_machine.statusbar.execute_command();
		});

		$("#social_media_button").click(function() {
			mega_machine.public.social_media();

		});

		$("#reminder_button").click(function() {
			mega_machine.public.next_chapter_question();
		});

		$(".MindmapTrigger").click(function() {
			mega_machine.mindmap.show();
			// mega_machine.agent_file();
		});

		$("#Agent_A").click(function() {
			if(mega_machine.public.status == "private") {
				if(mega_machine.public.player.ego.teammates[0]) {
					user = mega_machine.public.player.ego.teammates[0].id;
					mega_machine.show_friend_page(user);
				}

			}
		});

		$("#Agent_B").click(function() {
			if(mega_machine.public.status == "private") {
				if(mega_machine.public.player.ego.teammates[1]) {
					// alert( mega_machine.public.player.ego.teammates[1].username );
					user = mega_machine.public.player.ego.teammates[1].id;
					mega_machine.show_friend_page(user);
				}

			}
		});

		$("#Agent_C").click(function() {
			if(mega_machine.public.status == "private") {
				if(mega_machine.public.player.ego.teammates[2]) {
					// alert("Nummer 3 ist " + mega_machine.public.player.ego.teammates[2].username );
					user = mega_machine.public.player.ego.teammates[2].id;
					mega_machine.show_friend_page(user);
				}

			}
		});




		$("#Agent_D").click(function() {
			if(mega_machine.public.status == "private") {
				mega_machine.personal_page_toggle();
			}
		});

		self.admin.radio_interaction();
		self.admin.video_interaction();




		$(".closeMiddleWindow").click(function() {
			if(mega_machine.public.status == "private") {
				mega_machine.personal_page_toggle();
			}
		});




		$("#lab_interaction").click(function() {

			mega_machine.lab_context.init_context();
		});

		$("#web_interaction").click(function() {
			mega_machine.web_context.init_context();
		});

		$("#map_interaction").click(function() {
			mega_machine.map_context.init_context();
		});

		$("#shop_interaction").click(function() {
			mega_machine.shop_context.init_context();
		});

		$("#news_interaction").click(function() {
			mega_machine.system_context.init_context();
		});

		/// Die Kommunuikation

		$("#db_interaction").click(function() {

			if(mega_machine.public.status == "public")
				mega_machine.newbie_manager.first_time("db");

			mega_machine.set_communication_mode("db");
		});

		$("#os_interaction").click(function() {
			if(mega_machine.public.status == "public")
				mega_machine.newbie_manager.first_time("os");

			mega_machine.set_communication_mode("system");
		});

		$("#bot_interaction").click(function() {
			mega_machine.set_communication_mode("bot");
		});

		$("#social_interaction").click(function() {
			mega_machine.set_communication_mode("social");
		});

		$("#mail_interaction").click(function() {
			mega_machine.set_communication_mode("mail");
		});

		$("#PersonalButton").click(function() {

			if(mega_machine.public.status == "private")
				mega_machine.personal_page_toggle();
			else
				mega_machine.newbie_manager.log_in();
		});

		$("#UpperMini").click(function() {
			mega_machine.narrative_context.logo.stop_process();

			mega_machine.ruler.upper_page_setting();
			mega_machine.check_active_context();
			mega_machine.mute_communication();

			if(mega_machine.public.status == "public")
				mega_machine.newbie_manager.upper_mini_clicked();
		});

		$("#LowerMini").click(function() {
			mega_machine.ruler.lower_page_setting();
			mega_machine.check_active_context();

			mega_machine.mute_communication();

			if(mega_machine.public.status == "public")
				mega_machine.newbie_manager.lower_mini_clicked();
		});

		$("#PageSwitch2").click(function() {

			if(mega_machine.active_range == "down") {
				mega_machine.active_range = "up";

				var s = '<img src = "/images/new_interface/switch_up.png"/>';
				$("#PageSwitch").html(s);

				if(mega_machine.upper_page_context) {
					$("#text_field").val(mega_machine.upper_page_context.context.toUpperCase());

					mega_machine.ruler.set_context(mega_machine.upper_page_context.context.toUpperCase());
				}

			} else {
				mega_machine.active_range = "down";
				var s = '<img src = "/images/new_interface/switch_down.png"/>';
				$("#PageSwitch").html(s);

				if(mega_machine.lower_page_context) {
					$("#text_field").val(mega_machine.lower_page_context.context.toUpperCase());
					mega_machine.ruler.set_context(mega_machine.lower_page_context.context.toUpperCase());
				}
			}
		});

		// $("#Neuland").draggable({ axis: "y" } );

		$("#Neuland").draggable({

			axis : "y",

			start : function(event, ui) {
				mega_machine.ruler.check_web();
				// überprüft, ob eines der Fenster der iFrame ist
			},

			drag : function(event, ui) {
				mega_machine.ruler.page_position();
			},

			stop : function(event, ui) {
				// if (mega_machine.public.status == "public") mega_machine.newbie_manager.draggable_action();

				mega_machine.ruler.page_position_calm_down();

				mega_machine.newbie_manager.draggable_action();

				mega_machine.ruler.check_special_cases();

				mega_machine.ruler.sidebar_windows();
				mega_machine.ruler.remove_web();
				// mega_machine.ruler.check_receptors(event);
			}
		});

		self.upper_page = $("#UpperPage");
		self.lower_page = $("#LowerPage");

		self.div = $("#Neuland");

		$("#text_entry input").click(function() {
			// mega_machine.communication_check();

			$(this).val("");
		});

		$("#text_entry input").keydown(function(event) {

			switch(event.keyCode) {
				case 13:
					v = $(this).val();
					mega_machine.input(v);
					break;

				case 38:
					mega_machine.history_back();
					break;

				case 40:
					mega_machine.history_forward();
					break;
			}

		});
	}

	self.init();
}
/*                                        SUPERVSION                             */

Neuland.MouseListener = function(admin) {
	var self = this;
	this.admin = admin;

	this.init = false;

	this.mouseX = 0;
	this.mouseY = 0;

	this.diffX = 0;
	this.diffY = 0;

	this.distance = 0;

	this.down = false;

	this.active_toolbar = "down";
	this.active_area = null;

	this.velocity_array = new Array();

	this.down = function(event) {
		self.down = true;
		self.admin.activity_meter.event("mousedown", [self.mouseX, self.mouseY]);
	}

	this.up = function(event) {
		self.down = false;
		self.admin.activity_meter.event("mouseup", [self.mouseX, self.mouseY]);
	}

	this.set_toolbar = function() {
		switch(self.active_area) {
			case "shop":
				console.log("SHOP-TOOLBAR");
				break;

			case "web":
				alert("WEB-TOOLBAR");
				break;

			case "lab":
				alert("LAB-TOOLBAR");
				break;

			case "map":
				self.admin.map_context.init_tools();
				break;

			case "system":
				self.admin.system_context.init_tools();
				break;

		}
	}

	this.toolbar_check = function() {
		if(self.mouseY < $("#Neuland").position().top - 50) {

			if(self.active_toolbar == "down") {
				self.active_toolbar = "up";
				self.set_toolbar();
				$('#Neuland').css('border-bottom', 'solid 3px white');
				$('#Neuland').css('border-top', 'none');
			}
		} else {
			if(self.mouseY > $("#Neuland").position().top + $("#Neuland").height() + 50) {
				///
				if(self.active_toolbar == "up") {
					self.active_toolbar = "down";
					self.set_toolbar();

					$('#Neuland').css('border-bottom', 'none');
					$('#Neuland').css('border-top', 'solid 3px white');

				}
				////
			}

		}
	}

	this.move = function(event) {
		if(self.init == true) {

			self.diffX = event.clientX - self.mouseX;
			self.mouseX = event.clientX;

			self.diffY = event.clientY - self.mouseY;
			self.mouseY = event.clientY;

			self.distance += (Math.abs(self.diffX) + Math.abs(self.diffX) );

			// self.admin.activity_meter.event("mousemove", [self.mouseX, self.mouseY]);
			// self.toolbar_check();

		} else {
			self.init = true;
			self.mouseX = event.clientX;
			self.mouseY = event.clientY;
		}
	}
}

Neuland.Keylogger = function(admin) {
	var self = this;

	this.admin = admin;
	this.type = "Keylogger";

	this.key_states = {};

	this.control = false;
	this.shift = false;

	this.focussed = function() {
		x = document.getElementById("text_entry");
		if(x)
			if($("#text_entry    input").is(":focus"))
				return true;

		x = document.getElementById("dialog_answer");
		if(x) {
			if($("#dialog_answer").is(":focus")) {
				return true;
			}
		}

		return false;
	}

	this.streetview_check = function(keyCode) {
		if(mega_machine.map_context.map.streetview_visible == true) {
			external_map.streetview_coordinates();
		}
	}

	this.shortcuts = function(event) {
		switch(event.keyCode) {

			case 17:

				break;

			case 37:
				if(self.focussed() == false && mega_machine.map_context.map.streetview_visible == false)
					mega_machine.ruler.left_page();

				self.streetview_check(event);

				break;

			case 39:
				if(self.focussed() == false && mega_machine.map_context.map.streetview_visible == false)
					mega_machine.ruler.right_page();
				self.streetview_check(event);
				break;

			case 38:
				if(self.focussed() == false && mega_machine.map_context.map.streetview_visible == false)
					mega_machine.set_active_page("up");
				self.streetview_check(event);
				break;

			case 40:
				if(self.focussed() == false && mega_machine.map_context.map.streetview_visible == false)
					mega_machine.set_active_page("down");
				self.streetview_check(event);
				break;

		}
	}

	this.key_down = function(event) {
		if(event.keyCode == 16)
			self.shift = true;
		if(event.keyCode == 17)
			self.control = true;

		self.key_states[event.keyCode] = true;
		self.admin.activity_meter.event("key_down", event.keyCode);

		self.shortcuts(event);
	}

	this.key_up = function(event) {
		if(event.keyCode == 16)
			self.shift = false;
		if(event.keyCode == 17)
			self.control = false;

		self.key_states[event.keyCode] = false;
		self.admin.activity_meter.event("key_up", event.keyCode);
	}
}
/* -------------------------------------------------------------- */

Neuland.ActivityList = function(max) {
	var self = this;
	this.iterator = 0;
	this.max = max;
	this.list = new Array();
	this.actual = new Array();

	this.add = function(value) {
		if(self.list.length < self.max) {
			self.list.push(Math.abs(value));
			self.actual = self.list;
		}
		self.iterator++;

		if(self.iterator > 60) {
			end = self.list.length - 1;
			start = end - 60;
			self.actual = self.list.slice(start, end);
			self.actual.reverse();
		}

		if(self.iterator > self.max) {
			self.iterator = 0;
			self.list = [];
		}

	}
}
/* ------------------------------------------------------------- */

Neuland.Activity = function(type, params, time) {
	this.type = type;
	this.params = params;
	this.time = time;
}
/*  ------------------------------------------ Der Aktivitäts-Supervisor  -------------------------------------------------------*/

Neuland.ActivityMeter = function(admin) {
	var self = this;
	this.admin = admin;

	this.start_time = 0;
	this.duration = 0;
	this.velocity = 0;

	this.last_event = 0;
	this.time_out = 0;

	self.velocityList = null;

	this.activities = new Array();

	this.last_timespan = null;
	this.timespan = 200;

	this.event = function(type, params) {
		self.last_event = new Date().getTime();
		this.activities.push(new Neuland.Activity(type, params, self.duration));

		var el = 'activity_meter.event(' + type + ')';

		self.admin.system_tracker.add_element(el)

		self.show_activities();
	}

	this.get_values = function() {
		var t = "dist: " + self.admin.mouselistener.distance;
		t += "<br>veloc: " + self.velocity.toFixed(2);

		t += '<div id = "SparklineVelocity" class = "sparkline"></div>';

		t += "<br>time: " + self.duration;

		t += "<br>events: " + self.activities.length;
		t += "<br>timeOut: " + self.time_out;
		t += '<br>';

		if(self.admin.active_receptor)
			t += "<br>context: " + self.admin.active_receptor.context;

		return t;
	}

	this.loop = function() {
		if(self.start_time == 0) {
			self.start_time = new Date().getTime();
			self.last_event = self.start_time;
		}

		self.duration = new Date().getTime() - self.start_time;
		self.velocity = self.admin.mouselistener.distance / self.duration;
		self.time_out = new Date().getTime() - self.last_event;

		self.velocityList.add(self.admin.mouselistener.distance);

		if(self.admin.development == true)
			self.show_activities();

		// CRAWLER
		if(self.time_out > 600000) {
			// if (self.admin.info_miner.check_time() == true) self.admin.info_miner.start_mining("München");
			// alert("inactivity");
			mega_machine.surprise_context.inactivity();

			// mega_machine.system_tracker.hide_widget();

			self.time_out = 0;
		}

	}

	this.show_activities = function() {
		x = document.getElementById("activity");
		if(!x) {
			// var s = '<div id = "activity"></div>';
			// $("body").append(s);
		} else {
			// $("#activity").html(self.get_values() );
		}

		var x = document.getElementById("SystemWidget");
		if(x) {

			if($("#SystemWidget").position().left < window.innerWidth) {
				$('#SparklineVelocity').sparkline(self.velocityList.actual, {
					type : 'line'
				});
			}

		}

	}

	this.init = function() {
		self.velocityList = new Neuland.ActivityList(200);
		$('.sparkline').sparkline();

		var stats = new Stats();
		stats.setMode(0);
		// 0: fps, 1: ms

		stats.domElement.style.position = 'absolute';
		stats.domElement.style.left = '0px';
		stats.domElement.style.top = '0px';
		stats.domElement.style.zIndex = '10';

		document.body.appendChild(stats.domElement);

		setInterval(function() {

			stats.begin();
			stats.end();

		}, 1000 / 60);

	}

	self.init();
}
/*  ------------------------------------------ Der Painter, für die einzelnen Fenster --------------------------------------------*/

Neuland.Painter = function(admin) {
	var self = this;
	this.admin = admin;

	this.paint_operating_system = function() {
		var s = 'DIA OS, version 11.17.1<br>';
		s += '===================================<br>';

		s += '<br>';
		s += '<div class = "os_explanation">This is a control instrument for the advanced users.';
		s += 'type help to see an axpanation of all availabe commands';
		s += '</div>';

		for(var i = 0; i < self.admin.public.operating_system.item_list.length; i++) {
			item = self.admin.public.operating_system.item_list.at(i);
			s += '<div class = "os_command" onclick = "javascript: mega_machine.system_communication.call(' + item.attributes.id + ')">' + item.attributes.key + '</div>';
		}

		$("#system_inner_field").html(s);

	}

	this.paint_shop = function() {
		var s = '<div id = "ItemList">';

		for(var i = 0; i < self.admin.public.shop.item_list.length; i++) {

			item = self.admin.public.shop.item_list.at(i);

			s += '<div class = "Item"><img src = "' + item.attributes.icon + '"/></div>';

		}

		s += '</div>';
		$("#ShopContext").html(s);

		if(self.admin.active_range == "down") {
			// alert("DOWN");
			$("#ItemList").css({

				top : 0,
			});
		}

		// alert("ItemList geschrieben");

	}
}
/*  ------------------------------------------ Das Hauptobjekt -------------------------------------------------------*/

Neuland.MegaMachine = function(development) {
	var self = this;
	this.objects = {};

	this.development = development;

	this.keylogger = null;
	this.mouselistener = null;

	this.activity_meter = null;
	this.system_tracker = null;

	this.ruler = null;

	this.active_receptor = null;
	this.active_context = null;

	this.upper_context = null;
	// für den oberen Screen
	this.lower_context = null;
	// für den unteren Screen

	this.receptor_list = new Array();

	this.pid = null;

	this.active_context = null;
	this.upper_page_context = null;
	this.lower_page_context = null;

	this.info_mine = null;

	this.web_context = null;
	this.map_context = null;
	this.lab_context = null;
	this.system_context = null;
	this.personal_context = null;
	this.shop_context = null;

	this.video_context = null;

	this.communication_context = false;

	this.communication_obj = null;
	// Der Joker, kann entweder db, system, bot, mail sein

	this.system_communication = null;
	this.bot_communication = null;
	this.db_communication = null;
	this.mail_communication = null;
	this.social_communication = null;

	this.joint_messages = null;

	this.player_messages = null;

	this.personal_page = null;
	this.personal = null;

	this.friend_page = null;

	this.surprise_context = null;
	this.narrative_context = null;

	this.active_range = "down";
	this.fullscreen = false;

	this.public = null;
	this.painter = null;

	this.feedback_manager = null;

	this.statusbar = null;
	this.dialog = null;

	this.open_personal_page = false;

	this.newsfeed_windows = 0;

	this.interface_master = null;

	this.newbie_manager = null;
	this.cookie_manager = null;

	this.chapter_manager_list = [];
	this.chapter_supervisor = null;

	this.spinner = null;

	this.exception_handler = null;

	this.mindmap = null;

	this.evaluation = null;

	this.event_machine = null;


	// mega_machine.greeting();

	this.media_bar = function() {
		$(".MediaField").show();
		$("#SystemWidget").show();
		$(".legal_notes").show();
	}

	this.ProblematicBrowserCheck = function() {
		var N = navigator.appName, ua = navigator.userAgent, tem;
		var M = ua.match(/(opera|chrome|safari|firefox|msie)\/?\s*(\.?\d+(\.\d+)*)/i);
		if(M && ( tem = ua.match(/version\/([\.\d]+)/i)) != null)
			M[2] = tem[1];
		M = M ? [M[1], M[2]] : [N, navigator.appVersion, '-?'];
		return M;
	}

	this.greeting = function() {
		var s = "You are entering the real world";

		var div = '<div id = "Initiation">';
		div += '<div id = "Greeting">'
		div += s;
		div += '</div>';

		div += '<div id = "Psychologist">'
		div += "In a few seconds you will meet our psychologist ";
		div += '</div>';

		div += '<div id = "TwinKomplex">TWINKOMPLEX</div>';

		div += '</div>';

		$("body").append(div);

		$("#Greeting").fadeIn(3000, function() {

			$("#Greeting").delay(4000).fadeOut(3000, function() {
			});

		});

		$("#Psychologist").delay(11000).fadeIn(4000, function() {

			$("#Psychologist").delay(3000).fadeOut(4500, function() {
				mega_machine.public.player.trigger_brueckner_video();
			});

			$("#TwinKomplex").delay(3000).fadeOut(4500, function() {

			});

		});

	}

	this.agent_file = function() {
		self.evaluation = new Neuland.Evaluation();
	}

	this.get_chapter_cookie = function(no) {
		for(var i = 0; i < self.chapter_manager_list.length; i++) {
			var a = self.chapter_manager_list[i];
			if(a.cookie_obj.chapter_state == no)
				return a;
		}

		return 0;
	}

	this.intro_video = function() {
		test_action(202);
	}

	this.persistent_window_call = function() {
		// $.get('/sidebar_windows', function(data) { alert(data) });
		$.getJSON('/sidebar_windows', function(data) {
			$.each(data, function(_, action) {
				Actions[action.action_type].run(action)
			})
		});
	}

	this.psychotest_question = function() {
		var command = "mega_machine.public.psychotest.video()";
		// muss später der Film sein

		var s = mega_machine.public.messages.get("psychotest_candidate");

		self.dialog.confirmation(s, command)
	}

	this.start_hacking_game = function() {
		if(mega_machine.public.status == "public")
			mega_machine.cookie_manager.increment_attribute("hacking", 1);

		mega_machine.set_communication_mode("system");
		mega_machine.system_communication.input("xxxPasswordList");
	}

	this.hacker_question = function() {
		var command = "mega_machine.start_hacking_game()";
		var s = mega_machine.public.messages.get("hacker");
		self.dialog.confirmation(s, command)
	}

	this.delayed_job = function(type, time) {
		switch(type) {
			case "psychotest":
				if(self.cookie_manager.cookie_obj) {
					if(self.cookie_manager.cookie_obj.psychotest == 0) {
						var s = "mega_machine.psychotest_question()";
						window.setTimeout(s, time);
					}
				}
				break;

			case "hacking_game":
				if(self.cookie_manager.cookie_obj) {
					if(self.cookie_manager.cookie_obj.hacking == 0) {
						var s = "mega_machine.hacker_question()";
						window.setTimeout(s, time);
					}
				}
				break;

		}

	}

	this.start_enrollment = function() {
		$("#NarrativeContext").css("background", "white");

		$("#login_window").hide();
		self.public.knot_manager.enrollment_process();

		// mega_machine.newbie_manager.enrollment_process();
		mega_machine.cookie_manager.modify("gamestate", 5);
	}

	this.change_active_page = function() {
		if(self.fullscreen == false) {
			if(self.active_range == "down") {
				mega_machine.ruler.upper_page_setting();
				mega_machine.check_active_context();
				mega_machine.mute_communication();
			} else {
				mega_machine.ruler.lower_page_setting();
				mega_machine.check_active_context();
				mega_machine.mute_communication();
			}
		} else {
			// alert("FULLSCRREN - TOGGLE");
		}
	}

	this.blinker = function(name) {
		switch(name) {
			case "map":
				self.interface_master.blink("map");
				break;

			case "web":
				self.interface_master.blink("web");
				break;

			case "shop":
				self.interface_master.blink("shop");
				break;

			case "news":
				self.interface_master.blink("news");
				break;

			case "news":
				self.interface_master.blink("news");
				break;

			case "system":
				self.interface_master.blink("news");
				break;

		}
	}

	this.zero_tools = function() {
		$("#tools").html("");
	}

	this.new_target_page = function(dir, type, fullscreen) {
		if(self.fullscreen == true) {
			if(dir != self.active_range)
				self.change_active_page();

			if(dir == "down") {
				mega_machine.ruler.reset_fullscreen("up");

			}

		}
	}

	this.target_page = function(dir, type, fullscreen) {
		if(self.fullscreen == false) {
			if(dir != self.active_range)
				self.change_active_page();

			switch(type) {
				case "map":
					self.map_context.init_context();
					if(fullscreen == true) {
						if(self.active_range == "up")
							self.ruler.upper_page_setting();
						else
							self.ruler.lower_page_setting();
					}
					break;

				case "web":
					self.web_context.init_context();
					if(fullscreen == true) {
						if(self.active_range == "up")
							self.ruler.upper_page_setting();
						else
							self.ruler.lower_page_setting();
					}
					break;

				case "narrative":
					self.narrative_context.init_context();
					if(fullscreen == true) {
						if(self.active_range == "up")
							self.ruler.upper_page_setting();
						else
							self.ruler.lower_page_setting();
					}

					break;

				case "news":
					self.system_context.init_context();
					if(fullscreen == true) {
						if(self.active_range == "up")
							self.ruler.upper_page_setting();
						else
							self.ruler.lower_page_setting();
					}

					break;

				case "shop":
					self.shop_context.init_context();
					if(fullscreen == true) {
						if(self.active_range == "up")
							self.ruler.upper_page_setting();
						else
							self.ruler.lower_page_setting();
					}

					break;

				case "video":
					self.video_context.init_context();
					if(fullscreen == true) {
						if(self.active_range == "up")
							self.ruler.upper_page_setting();
						else
							self.ruler.lower_page_setting();
					}

					break;

				case "lab":
					self.lab_context.init_context();
					if(fullscreen == true) {
						if(self.active_range == "up")
							self.ruler.upper_page_setting();
						else
							self.ruler.lower_page_setting();
					}
					break;
			}

		} else {
			if(self.active_range != dir && self.fullscreen == true) {
				self.ruler.center_position();

				self.change_active_page();
				self.active_range = dir;

				switch(type) {
					case "map":
						self.map_context.init_context();
						break;

					case "narrative":
						self.narrative_context.init_context();
						break;

					case "lab":
						self.lab_context.init_context();
						break;

					case "web":
						self.web_context.init_context();
						break;

					case "shop":
						self.shop_context.init_context();
						break;

					case "news":
						self.system_context.init_context();
						break;

					case "video":
						self.video_context.init_context();
						break;

					case "surprise":
						self.surprise_context.init_context();
						break;
				}

				if(self.active_range == "up")
					self.ruler.upper_page_setting();
				else
					self.ruler.lower_page_setting();

			} else {
				switch(type) {
					case "map":
						self.map_context.init_context();
						break;

					case "narrative":
						self.narrative_context.init_context();
						break;

					case "lab":
						self.lab_context.init_context();
						break;

					case "web":
						self.web_context.init_context();
						break;

					case "shop":
						self.shop_context.init_context();
						break;

					case "news":
						self.system_context.init_context();
						break;

					case "video":
						self.video_context.init_context();
						break;

					case "surprise":
						self.surprise_context.init_context();
						break;

				}

			}

		}
	}

	this.set_active_page = function(dir) {
		if(self.fullscreen == false) {
			if(dir == "up") {
				mega_machine.ruler.upper_page_setting();
				mega_machine.check_active_context();
				mega_machine.mute_communication();

				if(mega_machine.upper_context)
					self.blinker(self.upper_context.name);

			} else {
				mega_machine.ruler.lower_page_setting();
				mega_machine.check_active_context();
				mega_machine.mute_communication();

				if(mega_machine.lower_context)
					self.blinker(self.lower_context.name);
			}
		} else {
			////
			if(dir == "up") {
				mega_machine.ruler.synchronize_positions(mega_machine.ruler.upper_page);

				mega_machine.ruler.upper_page_setting();
				mega_machine.check_active_context();
				mega_machine.mute_communication();

				if(mega_machine.upper_context)
					self.blinker(self.upper_context.name);

			} else {
				mega_machine.ruler.synchronize_positions(mega_machine.ruler.lower_page);

				mega_machine.ruler.lower_page_setting();
				mega_machine.check_active_context();
				mega_machine.mute_communication();

				if(mega_machine.lower_context)
					self.blinker(self.lower_context.name);
			}

			///
		}
	}

	this.text_entry_visible = function() {
		$("#text_entry").fadeIn();
	}

	this.set_draggable = function() {
		$("#Neuland").draggable('enable');
	}

	this.unset_draggable = function() {
		$("#Neuland").draggable('disable');
	}

	this.visible_map = function() {
		var dir = "none";

		if(self.upper_context) {
			if(self.upper_context.name == "map")
				dir = "up";
		}

		if(self.lower_context) {
			if(self.lower_context.name == "map")
				dir = "down";
		}
		return dir;
	}

	this.location_jump = function(link) {
		frage = link;
		lat = link.attr("data-lat");
		lng = link.attr("data-lng");

		center = new google.maps.LatLng(lat, lng);

		// self.hide_personal_page();

		c = self.visible_map();

		if(c != "none") {
			self.map_context.map.map.setCenter(center);
		} else {
			if(self.active_range == "down") {
				self.active_range == "up";
				mega_machine.map_context.init_context();
				self.map_context.map.map.setCenter(center);
				self.active_range == "down";
			} else {
				self.active_range == "down";
				mega_machine.map_context.init_context();
				self.map_context.map.map.setCenter(center);
				self.active_range == "up";
			}
		}

	}

	this.jsplayer = function(media, autostart) {

		var s = '<div id="jquery_jplayer_1" class="jp-jplayer"></div>'

		s += '<div id="jp_container_1" class="jp-audio">';
		s += '<div class="jp-type-single">';
		s += '<div class="jp-gui jp-interface">';
		s += '<ul class="jp-controls">';
		s += '<li><a href="javascript:;" class="jp-play" tabindex="1">play</a></li>';
		s += '<li><a href="javascript:;" class="jp-pause" tabindex="1">pause</a></li>';
		s += '<li><a href="javascript:;" class="jp-stop" tabindex="1">stop</a></li>';
		s += '<li><a href="javascript:;" class="jp-mute" tabindex="1" title="mute">mute</a></li>';
		s += '<li><a href="javascript:;" class="jp-unmute" tabindex="1" title="unmute">unmute</a></li>';
		s += '<li><a href="javascript:;" class="jp-volume-max" tabindex="1" title="max volume">max volume</a></li>';
		s += '</ul>';
		s += '<div class="jp-progress">';
		s += '<div class="jp-seek-bar">';
		s += '<div class="jp-play-bar"></div>';
		s += '</div>';
		s += '</div>';
		s += '<div class="jp-volume-bar">';
		s += '<div class="jp-volume-bar-value"></div>';
		s += '</div>';
		s += '<div class="jp-time-holder">';
		s += '<div class="jp-current-time"></div>';
		s += '<div class="jp-duration"></div>';

		s += '<ul class="jp-toggles">';
		s += '<li><a href="javascript:;" class="jp-repeat" tabindex="1" title="repeat">repeat</a></li>';
		s += '<li><a href="javascript:;" class="jp-repeat-off" tabindex="1" title="repeat off">repeat off</a></li>';
		s += '</ul>';
		s += '</div>';
		s += '</div>';
		s += '</div>';
		s += '</div>';

		$("#tools").html(s);

		if(!autostart) {

			$("#jquery_jplayer_1").jPlayer({
				ready : function(event) {
					$(this).jPlayer("setMedia", {
						mp3 : media.mp3,
						oga : media.ogg
					});
				},
				swfPath : "js",
				supplied : "mp3, oga",
				wmode : "window"
			});
		} else {

			$("#jquery_jplayer_1").jPlayer({
				ready : function(event) {
					$(this).jPlayer("setMedia", {
						mp3 : media.mp3,
						oga : media.ogg
					}).jPlayer("play");
				},
				swfPath : "js",
				supplied : "mp3, oga",
				wmode : "window"
			});
		}

		// .jPlayer("play"); // Attempt to auto play the media

	}

	this.audio_player = function() {
		// var s = '<div class="ui360"><a href="/system/audio_clips/3/original/1b0e62522d922d56d2429a72.mp3">PLAY</a></div>';

		var s = '<div class="ui360">';

		s += '<div class="ui">';
		s += '<canvas class="sm2-canvas"></canvas>';
		s += '<span class="sm2-360btn"></span>';
		s += '<div class="sm2-timing"></div>';
		s += '<div class="sm2-cover"></div>';
		s += '</div>';

		s += '<a class = "sm2_link" href="http://127.0.0.1:3000/system/audio_clips/3/original/1b0e62522d922d56d2429a72.mp3">PLAY</a>';
		s += '</div>';

		// $("#inner_tools").html(s);

		threeSixtyPlayer.config = {
			playNext : false, // stop after one sound, or play through list until end
			autoPlay : false, // start playing the first sound right away
			allowMultiple : true, // let many sounds play at once (false = one at a time)
			loadRingColor : '#ccc', // amount of sound which has loaded
			playRingColor : '#000', // amount of sound which has played
			backgroundRingColor : '#eee', // "default" color shown underneath everything else
			animDuration : 500,
			animTransition : Animator.tx.bouncy // http://www.berniecode.com/writing/animator.html
		}

	}

	this.reset_marker_number = function() {
		self.newsfeed_windows--;

		if(self.newsfeed_windows > 0) {
			$("#memory_marker").html(self.newsfeed_windows);
		} else
			$("#memory_marker").html("");
	}

	this.remove_window = function(id) {
		// alert("sollte die Sidebar entfernen mit der ID " + id);

		$.ajax({
			type : "DELETE",
			url : "../sidebar_windows/" + id

		}).done(function(msg) {
		});
	}

	this.add_window = function(div, action) {

		self.newsfeed_windows++;
		$("#memory_marker").html(self.newsfeed_windows);

		var $elements = $(div);
		divtest = action;

		$("#memory").append($elements);

		name = "action_" + action.action_id;

		$elements.attr("id", name);

		$elements.attr("action_id", action.action_id);

		return $elements;
	}

	this.window_jumper = function(name) {
		if(self.personal_page == null)
			self.personal_page_toggle();
		else
			self.show_personal_page();

		switch(name) {
			case "inventory":
				mega_machine.personal.active_window("inventory");
				break;

			case "mail":
				mega_machine.personal.active_window("mail");
				break;

			case "mail_in":
				mega_machine.personal.active_window("mail");
				self.personal.mail.show_incoming_mails();		
				break;

			case "mail_out":
				mega_machine.personal.active_window("mail");
				self.personal.mail.show_outgoing_mails();
				break;

			case "new_mail":
				mega_machine.personal.active_window("mail");
				self.personal.mail.new_mail();				
				break;

			case "achievements":
				mega_machine.personal.active_window("achievements");
				break;

			case "journal":
				mega_machine.personal.active_window("journal");
				break;

			case "friends":
				mega_machine.personal.active_window("friends");
				break;

			case "settings":
				mega_machine.personal.active_window("settings")
				break;

			case "file":
				mega_machine.personal.active_window("file");
				break;

		}
	}

	this.check_sidebar_actions = function() {
		var url = "/engine/untriggered_actions";
		$.ajax({
			type : "GET",
			url : url

		}).done(function(msg) {
			divtest = msg;

			$("#memory").html(msg.sidebar)

		});
	}

	this.check_scheduled_actions = function() {
		var url = "/engine/check_scheduled_actions";

		$.ajax({
			type : "GET",
			url : url

		}).done(function(msg) {
			labtest = msg;
			ScheduledActionManager.set_scheduled_actions(msg);

		});
	}

	this.page_up = function() {
		self.ruler.upper_page_setting();
		self.check_active_context();
		self.mute_communication();
	}

	this.page_down = function() {
		self.ruler.lower_page_setting();
		self.check_active_context();

		self.mute_communication();
	}

	this.show_video_layer = function() {
		self.video_context.init_context();
	}

	this.resize_context = function(pos) {
		if(pos == "up") {
			n = $("#Neuland").position().top;

			self.ruler.upper_page.css({

				height : n,
				top : 0,
			});

		} else {
			// alert("sollte den oberen Kontext neu zeichnen");
		}

	}

	this.special_repaint = function() {
		if(mega_machine.upper_context) {
			if(mega_machine.upper_context.name == "shop")
				mega_machine.shop_context.resize();
			// das war refresh

			if(mega_machine.upper_context.name == "narrative")
				mega_machine.narrative_context.reposition();
			// das war refresh

			if(mega_machine.upper_context.name == "video")
				mega_machine.video_context.reposition();

			// SYSTEM
			if(mega_machine.upper_context.name == "system") {
				if(mega_machine.fullscreen == false)
					self.system_context.check_size();
				else {
					self.system_context.check_size();
				}

			}
			// SYSTEM ENDE

			if(mega_machine.upper_context.name == "web") {
				self.web_context.check_size();
			}

		}

		if(mega_machine.lower_context) {
			if(mega_machine.lower_context.name == "shop") {
				mega_machine.shop_context.resize();
				// war refresh
			}
		}

		if(mega_machine.upper_context) {
			if(mega_machine.upper_context.name == "map" && $("#task_overlay").css("display") == "block") {
				tp = $("#external_map").position().top;
				$("#task_overlay").css("top", tp);
			}
		}

		if(mega_machine.lower_context) {
			if(mega_machine.lower_context.name == "map" && $("#task_overlay").css("display") == "block") {
				tp = $("#external_map").position().top;
				$("#task_overlay").css("top", tp);
			}
		}

	}

	this.check_page_sizes = function() {
		var doc = document.getElementById("LabContext");
		if(doc) {
			var nh = $("#Neuland").height();

			var h = window.innerHeight - nh;
			$("#LabContext").css("height", h);

			alert("Labor existiert");
		}

	}

	this.repaint = function() {
		// self.check_page_sizes();

		self.special_repaint();

		console.log("sollte die Maschine neu malen");

		var tp = $("#Neuland").position().top;
		var h = $("#Neuland").height();
		var wh = window.innerHeight;

		if(self.ruler.upper_page != null) {

			self.ruler.upper_page.css({
				top : tp - wh,

			});
		}

		if(self.ruler.lower_page != null) {
			self.ruler.lower_page.css({
				top : tp + h,

			});
		}

	}

	this.contextualize = function(context) {
		if(self.active_range == "up") {
			self.upper_context = context;
		} else {
			self.lower_context = context;
		}
	}

	this.reset_indices = function(type, div) {
		if(self.active_communication == type) {
			//alert("brauche nichts zu machen");
		} else {
			$(div).css("z-index", 1);
		}
	}

	this.top_index = function(type) {
		switch(type) {
			case "social":
				$(".communication_layer").css("z-index", 1);
				$("#social_communication").css("z-index", 10);

				// $("#social_communication").show();

				if(self.social_communication.textlayer != null) {
					self.social_communication.position();
				}

				break;

			case "mail":
				$(".communication_layer").css("z-index", 1);
				$("#mail_communication").css("z-index", 10);
				// $("#mail_communication").show();

				if(self.mail_communication.textlayer != null) {
					// alert("AKTIVIEREN");
					self.mail_communication.position();
				}

				break;

			case "bot":
				$(".communication_layer").css("z-index", 1);
				$("#bot_communication").css("z-index", 10);
				// $("#bot_communication").show();

				if(self.bot_communication.textlayer != null)
					self.bot_communication.position();
				break;

			case "db":
				$(".communication_layer").css("z-index", 1);
				$("#db_communication").css("z-index", 10);
				// $("#db_communication").show();
				if(self.db_communication.textlayer != null)
					self.db_communication.position();
				break;

			case "system":
				$(".communication_layer").css("z-index", 1);
				$("#system_communication").css("z-index", 10);
				// $("#system_communication").show();
				if(self.system_communication.textlayer != null)
					self.system_communication.position();
				break;

			default:
				alert("TOP INDEX " + type);
				break;
		}
	}

	this.communication_check = function() {
		if(self.communication_context == true) {

			switch(self.active_communication) {
				case "system":
					self.system_communication.trigger();
					break;

				case "bot":
					self.bot_communication.trigger();
					break;

				case "db":
					self.db_communication.trigger();
					break;

				case "mail":
					self.mail_communication.trigger();
					break;

				case "social":
					self.social_communication.trigger();

					break;

				default:
					alert("communication check " + self.active_communication);
					break;

			}
		}

	}

	this.hide_text_entry = function() {
		$("#text_entry").fadeOut();
	}

	this.text_entry_fade_out = function() {
		var s = "mega_machine.hide_text_entry()";
		window.setTimeout(s, 900);
	}

	this.last_text_entry_pos = 0;

	this.slide_position = function(div, text) {

		if(text == "SHOP") {
			self.last_text_entry_pos = $("#text_entry").position().left;
			self.text_entry_fade_out();
		}

		if(text == "NEWS") {
			self.last_text_entry_pos = $("#text_entry").position().left;
			self.text_entry_fade_out();
		}

		if(text == "LAB") {
			self.last_text_entry_pos = $("#text_entry").position().left;
			self.text_entry_fade_out();
		}

		$("#text_entry").css({
			"borderBottom" : "solid 2px transparent",
			"borderRight" : "solid 2px transparent",
			"borderTop" : "solid 2px transparent",
		});

		/*
		 if (text == "MAP") $("#text_entry").show();
		 if (text == "WEB") $("#text_entry").show();
		 */

		$("#text_field").val(text);

		p = $("#" + div);

		current = $("#text_entry").position().left;
		left = p.position().left + $("#Bar").position().left + 1;

		if(current == 0)
			current = self.last_text_entry_pos;

		$('#text_entry').tween({
			left : {
				start : current,
				stop : left,
				time : 0,
				units : 'px',
				duration : 0.7,
				effect : 'easeInOut'
			},

		});

		$.play();

	}

	this.check_active_context = function() {
		if(self.active_range == "up") {
			if(self.upper_context) {
				self.active_context = self.upper_context;

				self.interaction_reset();

				self.ruler.set_active(self.upper_context.context.toUpperCase());

			}
		} else {
			///
			if(self.lower_context) {
				self.active_context = self.lower_context;
				self.interaction_reset();

				self.ruler.set_active(self.lower_context.context.toUpperCase());
			}
			///
		}

	}

	this.interaction_reset = function() {
		if(self.active_range == "down") {
			if(self.active_context) {
				switch(self.active_context.context) {
					case "map":
						self.slide_position("map_interaction", "MAP");
						break;

					case "lab":
						self.slide_position("lab_interaction", "LAB");
						break;

					case "web":
						self.slide_position("web_interaction", "WEB");
						break;

					case "shop":
						self.slide_position("shop_interaction", "SHOP");
						break;

					case "system":
						self.slide_position("news_interaction", "NEWS");
						break;

					default:
						// alert("Der aktive Kontext" + self.active_context.context);
						break;
				}
			}
		} else {
			if(self.active_context) {
				/////

				switch(self.active_context.context) {
					case "map":
						self.slide_position("map_interaction", "MAP");
						break;

					case "lab":
						self.slide_position("lab_interaction", "LAB");
						break;

					case "web":
						self.slide_position("web_interaction", "WEB");
						break;

					case "shop":
						self.slide_position("shop_interaction", "SHOP");
						break;

					case "system":
						self.slide_position("news_interaction", "NEWS");
						break;

					default:
						// alert("Der aktive Kontext" + self.active_context.context);
						break;
				}
				////
			}
		}
	}

	this.repositioning = function() {
		if(self.active_context) {
			/////
			switch(self.active_context.context) {
				case "map":
					self.slide_position("map_interaction", "MAP");
					break;

				case "lab":

					self.slide_position("lab_interaction", "LAB");
					break;

				case "web":
					self.slide_position("web_interaction", "WEB");
					break;

				case "shop":
					self.slide_position("shop_interaction", "SHOP");
					break;

				case "system":
					self.slide_position("news_interaction", "NEWS");
					break;

				default:
					alert(" AKTIVER KONTEXT " + self.active_context.context);
					break;
			}
			////
		}
	}

	this.mute_communication = function() {
		self.communication_context = false;
		$(".Choice").removeClass("active_communication");
	}

	this.check_null_communication = function(type) {
		if(self.active_communication == type) {
			self.communication_context = false;
			$(".Choice").removeClass("active_communication");
			self.repositioning();

		} else {
			// nicht identisch
		}
	}

	this.null_communication = function(type) {
		self.exception_handler.check();
		// überflüssige DIVS, die nichts im Kontext zu suchen haben

		$(".Choice").removeClass("active_communication");
		self.communication_context = false;
		self.active_communication = null;

		self.interaction_reset();

		if(type) {
			switch(type) {
				case "SHOP":
					$("#text_field").val("SHOP");
					break;

				case "WEB":
					$("#text_field").val("WEB");
					break;

				case "MAP":
					$("#text_field").val("MAP");
					break;

				case "LAB":
					$("#text_field").val("LAB");
					break;

				case "SYSTEM":
					$("#text_field").val("NEWS");
					break;

				case "SOCIAL":
					$("#text_field").val("TEAM");
					break;

				case "SURPRISE":
					$("#text_field").val("SCREENSAVER");
					break;

				case "ACT":
					$("#text_field").val("");
					break;

				case "VIDEO":
					$("#text_field").val("VIDEO");
					break;

				default:
					alert("PROBLEM " + type);
					break;
			}
		}

	}

	this.set_communication_mode = function(type) {
		$(".Choice").removeClass("active_communication");

		switch(type) {

			case "system":

				self.communication_context = true;
				self.active_communication = "system";
				self.communication_obj = self.system_communication;

				$("#os_interaction").addClass("active_communication");

				$("#text_field").val("DIA OS");

				self.top_index("system");
				self.communication_check();

				break;

			case "bot":

				self.active_communication = "bot";
				self.communication_context = true;
				self.communication_obj = self.bot_communication;

				$("#bot_interaction").addClass("active_communication");
				$("#text_field").val("BOT");

				self.top_index("bot");
				self.communication_check();

				break;

			case "db":
				self.active_communication = "db";
				self.communication_context = true;
				self.communication_obj = self.db_communication;

				$("#db_interaction").addClass("active_communication");
				$("#text_field").val("DATABASE");

				self.top_index("db");
				self.communication_check();
				break;

			case "social":

				self.active_communication = "social";
				self.communication_context = true;
				self.communication_obj = self.social_communication;

				$("#social_interaction").addClass("active_communication");
				$("#text_field").val("TEAM");
				self.top_index("social");

				self.communication_check();

				break;

			case "mail":

				self.active_communication = "mail";
				self.communication_context = true;
				self.communication_obj = self.mail_communication;

				$("#mail_interaction").addClass("active_communication");
				$("#text_field").val("MAIL");

				self.top_index("mail");
				self.communication_check();

				break;

		}
	}

	this.screen_size = function(div) {
		var s = $("#" + div);
		h = $("#Neuland").height();
		wh = window.innerHeight - h;

		s.css({
			height : wh,
		});

	}

	this.friend_slider_on = function() {

		tp = $("#Neuland").position().top;
		self.ruler.last_position = tp;

		var target = window.innerHeight * 0.2;

		var height = window.innerHeight * 0.5;

		var offset = $("#Neuland").height();

		$('#Neuland').tween({
			top : {
				start : tp,
				stop : target,
				time : 0,
				units : 'px',
				duration : 1,
				effect : 'easeInOut'
			},

		});

		$('#FriendPage').tween({

			top : {
				start : tp + offset,
				stop : target + offset,
				time : 0,
				units : 'px',
				duration : 1,
				effect : 'easeInOut',
				onStop : function() {

					$("#AgentPic").fadeIn();

				}
			},

			height : {
				start : 0,
				stop : height,
				time : 0,
				units : 'px',
				duration : 1,
				effect : 'easeInOut'
			},

		});

		$.play();
	}

	this.bar_slider_fullscreen_off = function() {
		if(self.active_range == "down") {
			var height = window.innerHeight * 0.5;

			tp = $("#Neuland").position().top;
			self.ruler.last_position = tp;

			nh = $("#Neuland").height();

			$('#PersonalPage').tween({

				top : {
					start : tp,
					stop : nh,
					time : 0,
					units : 'px',
					duration : 1,
					effect : 'easeInOut',
					onStop : function() {

						$("#AgentPic").fadeIn();

					}
				},

				height : {
					start : height,
					stop : 0,
					time : 0,
					units : 'px',
					duration : 1,
					effect : 'easeInOut'
				},

			});

			$.play();

		} else {
			var height = window.innerHeight * 0.5;

			tp = $("#Neuland").position().top;
			self.ruler.last_position = tp;
			var nh = $("#Neuland").height();

			var end = window.innerHeight - nh;

			$('#Neuland').tween({

				top : {
					start : tp,
					stop : end,
					time : 0,
					units : 'px',
					duration : 1,

				},

			});

			$('#PersonalPage').tween({

				top : {
					start : height,
					stop : window.innerHeight,
					time : 0,
					units : 'px',
					duration : 1,

					onStop : function() {

						$("#AgentPic").fadeOut();

					}
				},

				height : {
					start : height,
					stop : 0,
					time : 0,
					units : 'px',
					duration : 1,

				},

			});

			$.play();
		}
	}

	this.bar_slider_fullscreen_on = function() {
		if(self.active_range == "down") {
			mega_machine.ruler.hide_bar();

			var height = window.innerHeight * 0.5;

			tp = $("#Neuland").position().top;
			self.ruler.last_position = tp;

			$('#PersonalPage').tween({

				top : {
					start : 80,
					stop : 80,
					time : 0,
					units : 'px',
					duration : 1,
					effect : 'easeInOut',
					onStop : function() {

						$("#AgentPic").fadeIn();

					}
				},

				height : {
					start : 0,
					stop : height,
					time : 0,
					units : 'px',
					duration : 1,
					effect : 'easeInOut'
				},

			});

			$.play();

		} else {
			// alert("der obere sitzt unten")   FFF

			var height = window.innerHeight * 0.5;

			tp = $("#Neuland").position().top;
			self.ruler.last_position = tp;

			var init = window.innerHeight - 80;

			$('#Neuland').tween({

				top : {
					start : tp,
					stop : height - 80,
					time : 0,
					units : 'px',
					duration : 1,
					effect : 'easeInOut',
				},

			});

			$('#PersonalPage').tween({

				top : {
					start : window.innerHeight,
					stop : height,
					time : 0,
					units : 'px',
					duration : 1,
					effect : 'easeInOut',
					onStop : function() {

						$("#AgentPic").fadeIn();
						mega_machine.ruler.hide_bar();
					}
				},

				height : {
					start : 0,
					stop : height,
					time : 0,
					units : 'px',
					duration : 1,
					effect : 'easeInOut'
				},

			});

			$.play();
		}

	}

	this.bar_slider_on = function() {

		tp = $("#Neuland").position().top;
		self.ruler.last_position = tp;

		var target = window.innerHeight * 0.2;

		var height = window.innerHeight * 0.5;

		var offset = $("#Neuland").height();

		$('#Neuland').tween({
			top : {
				start : tp,
				stop : target,
				time : 0,
				units : 'px',
				duration : 1,
				effect : 'easeInOut'
			},

		});

		$('#PersonalPage').tween({

			top : {
				start : tp + offset,
				stop : target + offset,
				time : 0,
				units : 'px',
				duration : 1,
				effect : 'easeInOut',
				onStop : function() {

					$("#AgentPic").fadeIn();

				}
			},

			height : {
				start : 0,
				stop : height,
				time : 0,
				units : 'px',
				duration : 1,
				effect : 'easeInOut'
			},

		});

		$.play();
	}

	this.bar_slider_off = function() {
		var tp = $("#Neuland").position().top;
		var target = self.ruler.last_position;
		var height = window.innerHeight * 0.5;
		var offset = $("#Neuland").height();

		$('#Neuland').tween({
			top : {
				start : tp,
				stop : target,
				time : 0,
				units : 'px',
				duration : 1,
				effect : 'easeInOut'
			},

		});

		$('#PersonalPage').tween({

			top : {
				start : tp + offset,
				stop : target + offset,
				time : 0,
				units : 'px',
				duration : 1,
				effect : 'easeInOut'
			},

			height : {
				start : height,
				stop : 0,
				time : 0,
				units : 'px',
				duration : 1,
				effect : 'easeInOut'
			},

		});

		$.play();
	}

	this.embed_logout_button = function() {
		var s = '<div id = logout_button>';
		s += '<img src = "/images/new_interface/logout.svg"/>';

		s += '</div>';

		return s;
	};

	this.embed_radio = function() {
		var s = '<div id = radio>';
		s += '<img src = "/images/new_interface/radio_of_32x32.png"/>';

		s += '</div>';
		return s;
	}

	this.embed_social_media = function() {
		var s = '<div id = "social_media_button">';
		s += '<img src = "/NewInterface/social/recommend.png"/>';
		s += '</div>';
		return s;
	}

	this.embed_video_button = function() {
		var s = '<div id = video_button>';
		s += '<img src = "/images/new_interface/film.svg"/>';

		s += '</div>';

		return s;
	}

	this.toggle_video = function() {
		// alert("sollte das VideoLayer ein- und ausschalten ");
		x = document.getElementById("VideoContext");

		if(x) {
			if($("#VideoContext").css("display") == "none") {

				mega_machine.video_context.init_context();
			}
		}

	}

	this.toggle_radio_plugin = function() {
		x = document.getElementById("radio_plugin");
		if(!x) {
			var s = '<div id = "radio_plugin">';
			s += '<a id="onlineRadioLink" href="http://radiotuna.com/">internet radio</a><script type="text/javascript" src="http://radiotuna.com/OnlineRadioPlayer/EmbedRadio?playerParams=%7B%22styleSelection0%22%3A143%2C%22styleSelection1%22%3A250%2C%22styleSelection2%22%3A171%2C%22textColor%22%3A15987442%2C%22backgroundColor%22%3A1315860%2C%22buttonColor%22%3A16744626%2C%22glowColor%22%3A16744626%2C%22playerSize%22%3A240%2C%22playerType%22%3A%22style%22%7D&width=240&height=292"></script>';
			s += '</div>';

			$("#Neuland").append(s);

			if(mega_machine.public.status == "public")
				mega_machine.cookie_manager.increment_attribute("radio", 1);
		} else {

			if($("#radio_plugin").css("display") == "none") {
				$("#radio_plugin").show();
				if(mega_machine.public.status == "public")
					mega_machine.cookie_manager.increment_attribute("radio", 1);

			} else
				$("#radio_plugin").hide();

		}
	}

	this.radio_interaction = function() {

		$("#radio").click(function() {

			mega_machine.toggle_radio_plugin();
			/*

			 */
		});
	}

	this.process_logout = function() {
		var url = "/logout";
		$.ajax({
			type : "GET",
			url : url

		}).done(function(msg) {

			window.location.href = "/nova";

		});
	}

	this.logout = function() {
		var s = "Agent " + self.public.player.ego.username + ", are you sure that you want to logout?"
		var command = "mega_machine.process_logout()";
		self.dialog.confirmation(s, command);

		// alert("Der Agent möchte die Sitzung beenden ");
	}

	this.login = function() {
		var url = "/engine/sessions/new";

		$.ajax({
			type : "GET",
			url : url

		}).done(function(msg) {

			mega_machine.dialog.login_window(msg);

		});

	}

	this.video_interaction = function() {
		$("#logout_button").click(function() {
			mega_machine.logout();
		});

		$("#video_button").click(function() {

			mega_machine.toggle_video();

		});
	}

	this.show_friend_page = function(id) {
		self.personal.check_init();
		//
		self.personal.acquaintance_info(id);
	}

	this.show_personal_page = function() {

		if(self.personal_page.css("display") == "none" || self.personal_page.height() == 0) {
			self.unset_draggable();

			$(".MindmapTrigger").hide();

			if(self.personal.acquaintance_mode == true)
				{
				// mega_machine.statusbar.show("PROBLEMZONE");
				$("#PersonalAgentName").html(mega_machine.public.player.ego.username);
				}

			self.personal.acquaintance_mode = false;

			if(self.fullscreen == false) {

				self.bar_slider_on();
				self.personal.set_tabs();
				mega_machine.joint_messages.hide();
				mega_machine.ruler.hide_bar();
			} else {
				// alert("zeigt die persönliche Seite ");

				self.bar_slider_fullscreen_on();
				// FFF
				self.personal.set_tabs();
				mega_machine.joint_messages.hide();

			}

		}
	}

	this.hide_personal_page = function() {
		$(".MindmapTrigger").show();
		$(".closeMiddleWindow").hide();

		if(self.fullscreen == false) {
			self.set_draggable();
			self.open_personal_page = false;

			self.bar_slider_off();
			self.personal.hide_tabs();
			mega_machine.ruler.show_bar();
		} else// FFF
		{
			self.set_draggable();
			self.open_personal_page = false;

			self.bar_slider_fullscreen_off();
			self.personal.hide_tabs();
			mega_machine.ruler.show_bar();
		}

	}

	this.personal_page_toggle = function() {
		if(self.personal_page == null) {
			$(".MindmapTrigger").hide();


			$(".closeMiddleWindow").show();

			self.unset_draggable();
			self.personal.create_personal_page();

			self.personal_page = $("#PersonalPage");

			/*
			 self.bar_slider_on();

			 self.personal.set_tabs();
			 mega_machine.joint_messages.hide();
			 mega_machine.ruler.hide_bar();
			 */

			self.open_personal_page = true;

			// NEU
			if(self.fullscreen == false) {

				self.bar_slider_on();
				self.personal.set_tabs();
				mega_machine.joint_messages.hide();
				mega_machine.ruler.hide_bar();
			} else {
				self.bar_slider_fullscreen_on();
				self.personal.set_tabs();
				mega_machine.joint_messages.hide();
			}
			///

		}
		else {

			if(self.personal_page.css("display") == "none" || self.personal_page.height() == 0) {
				self.unset_draggable();
				self.open_personal_page = true;

				$(".MindmapTrigger").hide();
				$(".closeMiddleWindow").show();

				/// PERSÖNLICH
				if(self.personal.acquaintance_mode == false) {
					if(self.fullscreen == false) {

						self.bar_slider_on();
						self.personal.set_tabs();
						mega_machine.joint_messages.hide();
						mega_machine.ruler.hide_bar();
					} else {
						self.bar_slider_fullscreen_on();
						self.personal.set_tabs();
						mega_machine.joint_messages.hide();
					}
				} else {

					self.personal.total_refresh();
					self.personal.set_tabs();
					mega_machine.joint_messages.hide();
					mega_machine.ruler.hide_bar();
				}
			} else {
				self.hide_personal_page();
				/*
				 self.open_personal_page = false;
				 self.bar_slider_off();
				 self.personal.hide_tabs();
				 mega_machine.ruler.show_bar();
				 */
			}

		}

	}

	this.communication_history_back = function() {
		no = self.communication_obj.history.length + self.communication_obj.iterator;

		console.log("KommunikationsObjekt " + no);

		if(no > 0) {
			self.communication_obj.iterator--;
			console.log(self.communication_obj.iterator);

			var nr = self.communication_obj.history.length - 1 + self.communication_obj.iterator;

			console.log("Schritt zurück " + nr);
			$("#text_field").val(self.communication_obj.history[nr]);
		}
	}

	this.history_back = function() {
		if(self.communication_context == false) {
			console.log("backwards " + self.active_context.history.length + " Iterator " + self.active_context.iterator);

			no = self.active_context.history.length + self.active_context.iterator;

			if(no > 0) {
				self.active_context.iterator--;

				var nr = self.active_context.history.length - 1 + self.active_context.iterator;
				console.log("Schritt zurück " + nr);
				$("#text_field").val(self.active_context.history[nr]);
			}

		} else
			self.communication_history_back();

	}

	this.communication_history_forward = function() {
		no = self.communication_obj.history.length + self.communication_obj.iterator;

		if(no < self.communication_obj.history.length) {
			self.communication_obj.iterator++;
			var nr = self.communication_obj.history.length - 1 + self.communication_obj.iterator;
			$("#text_field").val(self.communication_obj.history[nr]);
		}
	}

	this.history_forward = function() {
		if(self.communication_context == false) {
			console.log("forward" + self.active_context.history.length + " Iterator " + self.active_context.iterator);
			no = self.active_context.history.length + self.active_context.iterator;

			if(no < self.active_context.history.length) {
				self.active_context.iterator++;
				var nr = self.active_context.history.length - 1 + self.active_context.iterator;
				$("#text_field").val(self.active_context.history[nr]);
			}
		} else
			self.communication_history_forward();
	}

	this.active_area = function(input) {
		switch(input) {
			case "system":
				$("#text_field").val("NEWS");
				self.active_context = self.system_context;
				break;

			case "map":
				$("#text_field").val("MAP");
				self.active_context = self.map_context;
				break;
		}

	}
	// hier sollte ein Check kommen, ob der Link gültig ist

	this.feed_link = function(no) {
		article = self.system_context.actual_feed[no];

		if(article.link) {
			if(self.active_range == "down")
				self.active_range = "up";
			else
				self.active_range = "down";

			self.web_context.init_context();
			// self.show_website(article.link);

			var s = '<iframe src="' + article.link + '" width= "100%" height= "100%"></iframe>';
			$("#WebContext").html(s);

			if(self.active_range == "down")
				self.active_range = "up";
			else
				self.active_range = "down";

		}
	}

	this.display_selected_feed = function(feed) {
		self.system_context.actual_feed = feed;

		$("#SystemContext").html("");

		str = "";

		for( i = 0; i < feed.length; i++) {

			str += '<div onclick = "javascript:mega_machine.feed_link(' + i + ')" class = "rss_feed">';

			str += '<div class = "title">' + feed[i].title + '</div>';
			str += '<div class = "description hyphenate">' + feed[i].description + '</div>';

			str += '</div>';

		}

		$("#SystemContext").append(str);

		Hyphenator.run();
	}

	this.display_rss = function() {
		if(self.info_miner.feed_list.length > 0) {

			feed = self.info_miner.feed_list[0];

			str = "";

			for( i = 0; i < feed.length; i++) {
				str += '<div class = "rss_feed">';

				str += '<div class = "title">' + feed[i].title + '</div>';
				str += '<div class = "description">' + feed[i].description + '</div>';

				str += '</div>';

			}

			$("#SystemContext").append(str);
		}
	}

	this.check_web_address = function(text) {
		if(text == "home")
			text = "http://www.altavista.com";

		var sc = new RegExp("http://www.");
		check = text.search(sc);

		if(check == 0)
			return text;
		else {
			var sc = new RegExp("www.");
			check = text.search(sc);
			if(check == 0) {
				var txt = "http://" + text;
				return txt;
			} else {
				// text = "http://" + text;
				txt = "http://www." + text;
				return txt;
			}
		}
	}

	this.input = function(text) {
		$("#text_entry input").blur();

		if(self.communication_context == false)
			self.general_input(text);
		else {

			switch(self.active_communication) {
				case "system":
					self.system_communication.input(text);
					// alert("Komm mit dem Systen");
					break;

				case "db":
					self.db_communication.check(text);
					break;

				case "bot":
					self.bot_communication.input(text);
					break;

				case "mail":
					self.mail_communication.input(text);
					break;

				case "social":
					// alert("sollte mit dem Team kommunizieren");
					self.social_communication.input(text);
					break;

				default:
					alert(self.active_communication);
					break;
			}
		}

	}

	this.general_input = function(text) {

		switch(self.active_context.context) {
			case "map":
				// FUN
				var s = 'self.active_receptor.object.map.search("' + text + '")';
				self.system_tracker.add_element(s);
				//
				self.map_context.add_search_text(text);
				self.map_context.map.search(text);
				break;

			case "web":
				var s = 'self.active_receptor.object.website("' + text + '")';
				self.system_tracker.add_element(s);

				text = self.check_web_address(text);

				var s = '<iframe src="' + text + '" width= "100%" height= "100%"></iframe>';

				self.web_context.add_site(text);

				$("#WebContext").html(s);

				break;

			case "system":
				// self.active_receptor.object.system_input(text);
				self.system_context.system_input(text);

				break;

			default:
				alert(self.active_receptor.context);
				break;
		}
	}

	this.show_includes = function() {
		for(x in self) {
			alert(self[x]);
		}
	}

	this.start_internal_eggtimer = function(time, command) {

		eggtimer = new EngineData.EggTimer();

		eggtimer.attributes.time = time;
		eggtimer.attributes.time_left = time;

		eggtimer.attributes.command = command;

		p = self.public.player = new EngineData.Player(0);

		no = self.public.player.eggtimers.length;
		self.public.player.eggtimers.push(eggtimer);

		$(".eggtimer").show();

		var s = 'mega_machine.public.player.eggtimers[' + no + '].inline_process()';
		eggtimer.pid = window.setInterval(s, 1000);
	}
	//Reaktion auf Eggtimer
	this.start_eggtimer = function(action) {
		frage = action;

		eggtimer = new EngineData.EggTimer();
		eggtimer.attributes.id = action.player_egg_timer_id;
		eggtimer.attributes.time = action.time;
		eggtimer.attributes.time_left = action.time;
		eggtimer.attributes.visible = action.visible;

		no = self.public.player.eggtimers.length;
		self.public.player.eggtimers.push(eggtimer);

		if(action.visible == true) {
			$(".eggtimer").html(" ");
			
			$(".eggtimer").show();
			
			var s = 'mega_machine.public.player.eggtimers[' + no + '].process()';
			eggtimer.pid = window.setInterval(s, 1000);
		} else {
			var s = 'mega_machine.public.player.eggtimers[' + no + '].finish()';
			window.setTimeout(s, action.time * 1000);
		}

	}
	//Reaktion auf Eggtimer
	this.stop_eggtimer = function(action) {
		console.log("STOP EGGTIMER");
		frage = action;
		id = frage.player_egg_timer_id;
		
		for (var i = 0; i < self.public.player.eggtimers.length; i++)
			{
			var eggtimer = self.public.player.eggtimers[i];
			if (eggtimer.attributes.id == id)
				{
				window.clearInterval(eggtimer.pid);
				$(".eggtimer").delay(5000).fadeOut(2000);
				}	
			}
		
		
	}
	// Reaktion auf Teamcounter
	this.modify_teamcounter = function(action) {
		frage = action;

	}

	this.modify_counter = function(action) {
		alert("Counter wird erzeugt ");
	}
	//Reaktion auf -> ActionAddInventoryItem
	this.remove_inventory_item = function(change, id) {
		frage = change;

		if(self.personal.inventory) {
			self.personal.inventory.remove_item(change, id);
		} else {

			/*
			self.personal_page_toggle();

			self.personal.activate_inventory();
			self.personal.set_title("_inventory");
			$(".personal_icon_text").removeClass("active");
			$("#bt_PersonalInventory .personal_icon_text").addClass("active");
			*/


			self.window_jumper("inventory");
			self.personal.inventory.remove_item(change, id);

		}

	}
	//Reaktion auf -> ActionAddInventoryItem
	this.add_inventory_item = function(change, id) {
		frage = change;
		// alert("Hinzufügen eines InventarItems");
		if(self.personal.inventory) {
			self.personal.inventory.add_item(change, id);
		} else {
			
			/*
			self.personal_page_toggle();
			self.personal.activate_inventory();
			self.personal.set_title("_inventory");
			$(".personal_icon_text").removeClass("active");
			$("#bt_PersonalInventory .personal_icon_text").addClass("active");
			*/
			self.window_jumper("inventory");
			
			self.personal.inventory.add_item(change, id);
		}

	}
	//Reaktion auf ActionSendMessageToTeam
	

	this.get_team_message = function(id)
		{
		var url = "/engine/get_pm?id=" + id;
		
		$.ajax({
			type : "GET",
			url : url

		}).done(function(msg) {
			frage = msg;
			mega_machine.statusbar.show(   mega_machine.public.messages.get("new_mail")  );

			// AXW
			if (mega_machine.public.mail_system.incoming.length == 0) 
				{
				console.log("sollte die Mails einladen ");	
				}
		    else
		    	{
		    	mega_machine.public.mail_system.incoming.add(frage);
		    	// mega_machine.public.mail_system.incoming.sort();
		    	// mega_machine.public.mail_system.incoming.models.reverse();		    	


				mega_machine.personal.mail.check_incoming();
		    	}


		});


		
		}

	
	
	this.old_get_team_message = function(id) {
		// alert("sollte eine Nachricht herunterladen " + id);
		var url = "/engine/private_messages/" + id;
		
		


		$.ajax({
			type : "GET",
			url : url

		}).done(function(msg) {
			frage = msg;
			
			mega_machine.statusbar.show(   mega_machine.public.messages.get("new_mail")  );
			
			mega_machine.mail_communication.new_message(msg);


		});

	}
	// Reaktion auf ActionChangeTwinDollarToCredit
	this.twindollar_to_credit = function(action) {
		self.public.player.mod_twindollars(action.money_change.twin_dollars);
		self.public.player.mod_credits(action.money_change.credits);

		var s = "you have converted " + Math.abs(action.money_change.twin_dollars) + " TwinDollar to ";
		s += action.money_change.credits + " credits";

		self.statusbar.show(s);

	}
	///////////////// EDin FollowUp-Task

	this.follow_up = function(action) {
		console.log("follow_up");

		frage = action;
		self.public.task_manager.process(action.followup.id);

		if(action.followup.visibility === "localized") {

		}
	}
	// Reaktion auf ActionGoToTask
	this.trigger_task = function(action) {

		self.public.task_manager.showTask(action.task.id);

		if(action.task.visibility === "localized") {
			alert("ein lokalisierter Task, sollte ihn der Karte hinzufügen ");
		}
	}
	// Reaktion auf ActionGoToTask
	this.goto_task = function(action) {
		frage = action;

		var s = action.task.lat + "," + action.task.lng;
		self.map_context.map.search(s);
	}

	this.cancel = function(action) {
		$("#task_overlay").hide();
		$("#task_container .task").html("");
		$("#task_container").hide();
	}
	// Reaktion auf ActionHideTask
	this.hide_task = function(action) {
		frage = action;
		// alert("hide " + action.task.id);
		self.public.task_manager.hideTask(action.task.id);
	}
	// Reaktion auf ActionAddArtifact
	this.add_artifact = function(action) {
		testfall = action;

		var url = "/engine/team_artifacts/" + action.artifact_id;

		$.ajax({
			type : "GET",
			url : url

		}).done(function(msg) {
			frage = msg;
			// alert("Datan sind angekommen");
			mega_machine.lab_context.new_artifact(msg);

			mega_machine.statusbar.show("new artifact found");
			mega_machine.statusbar.command = "new artifact";
		});

		/*
		 [{"action_id":491,"action_type":"ActionAddArtifact",
		 "template":"<li class='team_artifact_67 new' data-id='67' style='left: 40%; top: 40%;'>\n  <img alt=\"Police\"
		 src=\"/system/icons/72/dv/large/policing-title.jpg\" />\n  <div class='name'>\n    Police\n  </div>\n</li>\n","template_sidebar":"
		 <div class='sidebar_window new_artifact'>\n
		 <div class='tab'>\n    <!-- switch classes of title AND titletext to active or folded when _ is clicked -->\n    <p class='title'>New Artifact</p>\n    <div class='remove'></div>\n    <!-- the _ will be replaced by a background-img in minimize - as soon as a pic is available^^ -->\n    <div class='minimize'></div>\n  </div>\n  <div class='content'>\n    <img alt=\"Police\" class=\"normal\" height=\"52\" src=\"/system/icons/72/dv/thumb/policing-title.jpg\" title=\"Police\" width=\"81\" />\n    <p>Artifact Police has just been found!</p>\n    <a class='examine' data-artifact_id='67' href='#'>Examine</a>\n  </div>\n</div>\n","artifact_id":67}]
		 */

	}
	// PUSHER add_team_artifact
	this.add_team_artifact = function(data) {
		divtest = data;
		self.lab_context.load_artifact(data.team_artifact_id);

	}

	this.update_analysis_state = function(data, type) {

		/*
		var running = new EngineData.AnalysisJob();
		running.attributes.analysis_time = data.analysis_time;
		running.attributes.research_method_id = data.research_method_id;
		running.attributes.team_artifact_id = data.team_artifact_id;
		*/

		// self.lab_context.running_jobs.add(running);

		var s = "mega_machine.lab_context.stop_analysis(" + data.analysis_job_id + "," + data.team_artifact_id + ")";
		window.setTimeout(s, data.analysis_time * 1000);

		// alert("Das Team wird informiert " + type);
		/*
		 analysis_time 600
		 ongoing_time 0
		 research_method_id 6
		 team_artifact_id 72
		 */
	}


	
	this.research_analysis_actions = function(job_id)
	{
	var url = "/engine/analysis_jobs/" + job_id;
		
		$.ajax({
    	type : "GET",
    	url : url

    	}).done(function(data) {
    	activist = data;
    	
    	console.log("Aktionen sollten aufgerfen werden ");
    		
    	return ActionInvoker.runActions(data);
    	});	
		
	/*	
	 $.ajax({
        type: "PUT",
        url: "/analysis_jobs/" + job_id,
        contentType: "application/json",
        processData: false,
        success: function(data) {
		  
		  alert("AKTIONEN AUFRUF ");
		  activist = data;
			
          return ActionInvoker.runActions(data.actions);
        }
      });
      */
	}


	this.analysis_finished = function(data) {
		job_id = data.analysis_job_id;

		mega_machine.lab_context.monitor.latest(); // holt die letzten Infos

		activist = data;

		for(var k = 0; k < self.lab_context.running_jobs.length; k++) {
			var actual = self.lab_context.running_jobs.at(k);
			if(actual.attributes.analysis_job_id == job_id) {
				actual.attributes.done = true;
				
				self.research_analysis_actions(job_id);
			}
		}

		mega_machine.statusbar.show( mega_machine.public.messages.get("analysis_finished"));
	
		// http://127.0.0.1:3000/player_artifact_actions?team_artifact_id=381
		
		console.log("Analyse beendet");
	}
	
	
	
	// Reaktion auf -> Pusher -> new Achievement
	this.new_achievement = function(data) {
		frage = data;

		var url = "/engine/updated_achievements";
		$.ajax({
			type : "GET",
			url : url

		}).done(function(msg) {
			mega_machine.public.player.ego.achievements = msg.achievements;
			if($("#PPContainer").css("display"))
				mega_machine.personal.achievements.repaint();

			mega_machine.statusbar.show("you have gained a new achievement");
			mega_machine.statusbar.command = "new achievement";
		});

	}
	//Reaktion auf -> ActionNextChapter

	this.next_chapter = function(action) {
		frage = action;

		var s = mega_machine.public.messages.get("next_mission");

		self.statusbar.show(s);
		self.statusbar.command = "next chapter";

		$("#reminder_button").show();
	}

	this.proceed_to_next_chapter = function() {
		var url = "/engine_next_chapter";

		$.ajax({
			type : "GET",
			url : url

		}).done(function(msg) {

			if(msg == false)
				self.dialog.feedback("You are not authorized top proceed to the next mission");
			else
				self.public.rating.start();

		});

	}
	// Reaktion auf FriendshipRequest

	this.show_friendship_request = function(data) {
		testfall = data;
		self.statusbar.show("somebody sent a frienship request");
		self.statusbar.command = "friendship_request";
		
	
		self.personal.add_friendship_request(data);	
		
		console.log("Freundschaftsanfrage")   // XXWWW

	}
	
	

		//
	this.custom_html = function(content)
	{
	self.web_context.init_context();
	$("#WebContext").html(content);
	}
	
	
	//Reaktion auf -> ActionWebsite
	this.show_website = function(address) {
		console.log("sollte diese Addresse zeigen " + address);

		self.web_context.init_context();

		text = self.check_web_address(address);

		var s = '<iframe src="' + text + '" width= "100%" height= "100%"></iframe>';

		self.web_context.add_site(text);

		$("#WebContext").html(s);

	}
	//Reaktion auf -> ActionSendMessage
	this.get_message = function(data) {
		alert(data.pm.private_message.content);

		self.feedback_manager.activity("mail");
	}
	//Reaktion auf -> ActionMessageToTeambox
	this.teambox_message = function(message) {
		frage = message;
	}

	this.loop = function() {
		self.activity_meter.loop();
		self.ruler.loop();
		// Das Interface - Element

		self.system_tracker.loop();

		self.lab_context.loop();

		self.event_machine.loop();

		if(self.interface_master)
			self.interface_master.artifact.loop();
		// console.log("time");
	}

	this.fancy_commands = function() {

	}

	this.player_avatar = function() {
		var url = "/engine/player_avatar/" + self.public.player.ego.id + "/edit";

		$.ajax({
			type : "GET",
			url : url

		}).done(function(msg) {

			mega_machine.dialog.avatar(msg.form_html);

		});
	}

	this.call_wikipedia = function(no) {

		var locale = "de";

		if( locale = "dv")
			locale = "en";

		if(self.public.status != "public") {
			if(mega_machine.public.player.ego)
				locale = mega_machine.public.player.ego.locale;
		} else {
			if(mega_machine.cookie_manager.cookie_obj.locale != 0)
				locale = mega_machine.cookie_manager.cookie_obj.locale;
		}

		var s = 'http://www.de.wikipedia.org/wiki/';

		switch(locale) {
			case "de":
				s = 'http://www.de.wikipedia.org/wiki/';
				break;

			case "en":
				s = 'http://www.en.wikipedia.org/wiki/';
				break;

			case "es":
				s = 'http://www.es.wikipedia.org/wiki/';
				break;

		}

		var key = self.db_communication.wikipedia_articles[no].key;
		key = key.replace(/\s/, "_");

		s += key;
		self.show_website(s);

	}

	this.pusher = null;
	this.pusher_channel = null;

	this.start_pusher = function() {
		var url = "/engine/pusher";
		$.ajax({
			type : "GET",
			url : url

		}).done(function(msg) {
			// team + channel
			// mega_machine.pusher = new Neuland.PusherCommunicator(mega_machine, msg);
			PusherApp.config = msg;
			if(PusherApp.config) {
				PusherApp.initialize();
				PusherApp.subscribe();
				return PusherApp.listen();
			}
		});

	}

	this.db_communication_mode = function() {
		self.set_communication_mode("db");
		$("#text_entry").show();
		$("#text_entry input").focus();
	}

	this.black_bar = function() {
		var s = '<div id = "NeulandDouble">';
		s += '</div>';

		$("body").append(s);
	}







  this.change_neuronal_energy = function(action)
  {
  // Das geht zwar, aber die Gesamtarchitektur ist höchst fraglich

  /*

  var url = "/engine/player_neural_triggers";

	$.ajax({
          type : "GET",
          url : url

          }).done(function(data) {
           
           if (data.length > 0)
           	{
           	activist = data;
           	act = data[0].player_neural_trigger;
           	NeuralTrigger.fire(act.id);
           	} 
           
           
          });

*/
  }




	this.triggerAPI = function(key, value, address) {
		
		switch(key)
		{
		case "lobby":
		 console.log("an api call that triggers the LOBBY");
		break;	
		
		case "command":
		  eval(address);
		break;
		

		
		case "micro_effect":
		 // alert("Aufruf eines MikroEeffekts " + address);
		 microfx_playback(address);
		break;

		
		}
		
		
		
		switch(address) {
			case "agent_file":
				self.agent_file();
				break;

			case "intervention":

				break;

		}

	}

	this.init = function() {
		mega_machine = self;
		self.type = "MegaMachine";

		self.mindmap = new Neuland.Mindmap(self);

		self.newbie_manager = new Neuland.NewbieManager(self);
		self.cookie_manager = new EngineData.CookieManager(self);
		self.exception_handler = new Neuland.ExceptionHandler(self);

		self.chapter_supervisor = new EngineData.ChapterSupervisor(self);

		self.statusbar = new Neuland.Statusbar(self);
		self.dialog = new Neuland.Dialog(self);

		self.info_miner = new InfoMiner.Grabber(self);
		self.public = new EngineData.Public(self);

		self.painter = new Neuland.Painter(self);

		self.personal = new Neuland.Personal(self);

		self.feedback_manager = new IFeedback.Manager(self);

		self.keylogger = new Neuland.Keylogger(self);
		self.mouselistener = new Neuland.MouseListener(self);
		self.activity_meter = new Neuland.ActivityMeter(self);

		self.system_tracker = new Neuland.SystemTracker(self);

		self.ruler = new Neuland.InterfaceElement("Neuland", self);

		self.spinner = new EngineData.Spinner(self);

		self.player_messages = new Neuland.PlayerMessage(self);

		self.surprise_context = new Neuland.SurpriseContext("surprise", self);
		self.video_context = new Neuland.VideoContext("video", self);
		self.narrative_context = new Neuland.NarrativeContext("narrative", self);

		self.web_context = new Neuland.WebContext("web", self);
		self.map_context = new Neuland.MapContext("map", self);
		self.map_context.nethernet = new ExternalMap.Nethernet(self.map_context);

		self.lab_context = new Neuland.LabContext("lab", self);
		self.system_context = new Neuland.SystemContext("system", self);
		self.personal_context = new Neuland.PersonalContext("personal", self);
		self.shop_context = new Neuland.ShopContext("shop", self);

		self.system_communication = new Neuland.SystemCommunication(self);
		self.bot_communication = new Neuland.BotCommunication(self);
		self.db_communication = new Neuland.DatabaseCommunication(self);
		self.mail_communication = new Neuland.MailCommunication(self);
		self.social_communication = new Neuland.SocialCommunication(self);

		self.joint_messages = new Neuland.JointMessages(self);
		
		self.event_machine  = new Neuland.EventMachine(self);
		
		

		/*
		 self.receptor_list.push( new Neuland.InterfaceReceptor("Rezeptor1", "Neuland", self, "map", self.map_context) );
		 self.receptor_list.push( new Neuland.InterfaceReceptor("Rezeptor2", "Neuland", self, "web", self.web_context) );
		 self.receptor_list.push( new Neuland.InterfaceReceptor("Rezeptor3", "Neuland", self, "lab", self.lab_context) );
		 self.receptor_list.push( new Neuland.InterfaceReceptor("Rezeptor4", "Neuland", self, "personal", self.personal_context) );
		 self.receptor_list.push( new Neuland.InterfaceReceptor("Rezeptor5", "Neuland", self, "system", self.system_context) );

		 self.receptor_list.push( new Neuland.InterfaceReceptor("Rezeptor6", "Neuland", self, "shop", self.shop_context) );
		 */

		document.onkeydown = self.keylogger.key_down;
		document.onkeyup = self.keylogger.key_up;

		document.onmousemove = self.mouselistener.move;
		document.onmousedown = self.mouselistener.down;
		document.onmouseup = self.mouselistener.up;

		self.interface_master = new Neuland.Interface(self);
		self.public.knot_manager.initial_process();

		var s = "mega_machine.loop()";

		self.pid = window.setInterval(s, 50);

		mega_machine.narrative_context.create_logo();

		self.black_bar();

		var user_browser = self.ProblematicBrowserCheck();

		if(user_browser[0] == "MSIE" || user_browser[0] == "Opera") {
			alert("This website demands features which are not supported by your browser. We recommend using Chrome, Firefox or Safari");
		}

	}

	self.init();
}

Neuland.PusherCommunicator = function(admin, config) {
	this.admin = admin;
	var self = this;
	this.pusher = null;
	this.channel = null;

	this.channel_auth_endpoint

	this.init = function() {
		// var WEB_SOCKET_DEBUG;
		// Pusher.log = function(message) {};
		// WEB_SOCKET_DEBUG = false;
		self.channel_auth_endpoint = "/pusher_auth";
		self.pusher = new Pusher('3c60e10a5dfa8b722fec');

		alert("INITIALISIERUNG");
	}

	this.subscribe = function() {
		self.channel = self.pusher.subscribe(config.channel);
	}

	self.init();
}
function test_action(no) {
	// http://127.0.0.1:3000/player_database_link_actions?database_link_id=146

	$.post("/player_database_link_actions", {

		"database_link_id" : no,
	}, function(data) {

		ActionInvoker.runActions(data);

	});

}

function query_action(text) {
	// http://127.0.0.1:3000/player_database_link_actions?database_link_id=146

	$.post("/console_queries", {

		"console_query[query]" : text,
	}, function(data) {

		alert("das geht an den Bot " + data.output);

	});

}


$(window).resize(function() {

	mega_machine.repaint();
});

var divtest;
var labtest;

function do_nothing() {
	return 0;
}

