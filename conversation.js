var outputs = require("./ouputs.js")
Array.prototype.random = function() {
	return this[Math.floor(Math.random()*this.length)];
}



function Conversation(msg) {
    this.msg = msg;
    conversationList = [];

    this.start = function() {
        console.log("Conversation started");
        msg.channel.sendMessage(outputs.greetings.random());
    };

    console.log("Created a new conversation");
    start();
    return this;
}

module.exports = (msg) => Conversation(msg);