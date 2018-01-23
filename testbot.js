var UniversalBot = require("universal_bot");

if ( UniversalBot ) console.log("Der Bot ist da");

var params = {};

params.aiml = [
    "./bot/css.json",
];

var bot = new UniversalBot( params );

if (bot) console.log("Bot ist erzeugt worden");