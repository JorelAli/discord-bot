var outputs = require("./ouputs.js");
var inputs = require("./inputs.js");
Array.prototype.random = function() {
    "use strict";
	return this[Math.floor(Math.random()*this.length)];
};

var natureEnum = {
    NONE: 0, 
    BORED: 1, 
    LONELY: 2, 
    SAD: 3
};

function Conversation(msg) {

    var conversationList = [];
    //Awaiting a yes/no answer from a question
    var awaitingConfirmation = false;
    var questionNature = natureEnum.NONE;

    this.start = function() {
        console.log("Conversation started");
        msg.channel.sendMessage(outputs.greetings.random());
    };

    this.add = function() {
        conversationList.push("hi");
    };

    this.ask = function() {
        //asks a question
        msg.channel.sendMessage("What's up?");
    };

    /* Interprets a yes/no answer to a question */
    this.parseAnswer = function(message) {
        awaitingConfirmation = false;
        if(inputs.no.includes(message.toLowerCase())) {

        }
    };

    /* Suggests what to do based on the initial question "What's up?" */
    this.response = function(message) {
        if(message.includes("bored")) {
            msg.channel.sendMessage("Wanna do something fun?");
            awaitingConfirmation = true;
            questionNature = natureEnum.BORED;
        }
    };

    conversationList.push(msg);
    return this;
}

module.exports = (msg) => Conversation(msg);