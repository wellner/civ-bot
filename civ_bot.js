const Discord = require("discord.js");
const express = require('express');
const bodyParser = require('body-parser');
const EventEmitter = require('events');
//const auth = require('./auth.json');

const PORT = process.env.PORT || 3030;

const app = express();
const CHANNEL_ID = '699328433108418646';
app.use(bodyParser.json());

var client = new Discord.Client();
 
client.on("ready", (e) => {
    console.log("I am ready!");
    let ch = client.channels.get(CHANNEL_ID);
    console.log("Got channel " + ch);
});

USER_MAP = {
    "Palver" : "<@398964095203803146>",
    "Aeon": "<@493217027859939338>",
    "zerodev": "<@696499822688993392>",
    "fustyWumpus": "<@436356454132351006>",
    "Pumpkeenhead": "<@699077957926256710>"
}
 
class WebhookListener extends EventEmitter {
 listen() {
     app.post('/civ6', (req, res) => {
	 const gameName = req.body.value1;
	 const playerName = req.body.value2;
	 const gameTurnNo = req.body.value3;
	 res.send({ status: 'OK' });
	 console.log("On Turn reached .. received playerName = " + playerName);
	 let ch = client.channels.get(CHANNEL_ID);
	 ch.send("Hey " + USER_MAP[playerName] + " it's your turn");
     });
   app.listen(PORT);
 }
}

const listener = new WebhookListener();
listener.listen();
console.log("Token = " + process.env.BOT_TOKEN);
client.login(process.env.BOT_TOKEN);
