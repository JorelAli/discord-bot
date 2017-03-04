var outputs = require("./ouputs.js");
var inputs = require("./inputs.js");
var oneLinerJoke = require('one-liner-joke');

Array.prototype.random = function() {
    "use strict";
	return this[Math.floor(Math.random()*this.length)];
};

var natureEnum = {
    NONE: 0, 
    BORED: 1, //Feeling bored 
    LONELY: 2, //Feeling lonely
    SAD: 3 //Feeling sad
};

var thingEnum = {
    NONE: -1,
    VIDEO: 0,
    CHESS: 1
};

String.prototype.containsArray = function(array) {
    for(item in array) {
        if(this.includes(array[item])) {
            return true;
        }
    }
    return false;
}


function Conversation(msg) {

    this.conversationList = [];
    //Awaiting a yes/no answer from a question
    this.awaitingConfirmation = false;
    this.questionNature = natureEnum.NONE;
    this.thingNature = thingEnum.NONE;
    this.isDead = false;

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
            console.log("No indicated");
            switch(questionNature) {
                case natureEnum.BORED:

                    break;
                case natureEnum.LONELY:
                    break;
                case natureEnum.SAD:
                    break;
            }
        } else if(inputs.yes.includes(message.toLowerCase())) {
            console.log("Yes indicated");
            switch(questionNature) {
                case natureEnum.BORED:
                    if(thingNature == thingEnum.CHESS) {
                        msg.channel.sendMessage("Awesome, let's go: https://www.chess.com/live");
                        this.isDead = true;
                        return true;
                    }
                    break;
                case natureEnum.LONELY:
                    break;
                case natureEnum.SAD:
                    break;
            }
        }
        return false;
    };

    /* Suggests what to do based on the initial question "What's up?" */
    this.response = function(message) { 
        if(message.containsArray(inputs.terminator)) {
            msg.channel.sendMessage("No problem. See you later :)");
            return;
        }
        if(message.includes("joke")) {
           var getRandomJoke = oneLinerJoke.getRandomJoke();
           msg.channel.sendMessage(getRandomJoke.body);
        }
        else if(message.includes("bored")) {
            var thing = outputs.thingsToDo.random();
            if(thing.includes('chess')) {
                thingNature = thingEnum.CHESS;
            }
            msg.channel.sendMessage("Do you want to " + thing + "?");
            awaitingConfirmation = true;
            questionNature = natureEnum.BORED;
        }
    };

    conversationList.push(msg);
    return this;
}

module.exports = (msg) => Conversation(msg);