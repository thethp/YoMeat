var yoplait = require('yoplait');
var config = require('./config.json');
var io = require('socket.io-client');

console.log('Signing up: ' + config.yoUsername + ' with UDID: ' + config.udid);
yoplait.logIn(config.yoUsername,config.yoPassword,config.udid,function(err,yo) {
    if (err) {
	return console.log('Sign up failed! ', err);
    }

    this.address = 'https://chat.meatspac.es';
    this.socket = io.connect(this.address);
    this.socket.on('connect_error', function cb(data) {
	console.log(data, data.error);
    });
    this.socket.on('message', function cb(data) {
	var msg = data.chat.value.message;
	if(msg.match(/tod/gi) || msg.match(/thp/gi) || msg.match(/thewor/gi)) sendOutYo();
    });

    function sendOutYo() {
	console.log('Yo-ing user');
	yo.sendYo(config.yoToAccount, function(err) {
	    if (err) {
		console.log('nogo on the yo: ', err);
	    } else {
		console.log('YO');
	    }
	});
    }
});
