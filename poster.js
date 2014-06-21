#!/usr/bin/env node

var spammed;

if (process.argv[2].size == 0 || process.argv[2] == 'undefined') {
    console.log('Missing victim!');
    process.extit(0);
} else {
    spammed = process.argv[2];
}

// Deprec
function randomInterval() {
    return (4000 + (Math.floor((Math.random() * 10) + 1) * 1000));
}

// Waiting from my api token ...
var url = 'http://yo.moinnadeem.com/'
var socket = require('socket.io-client')(url);
var output_control = false;
socket.on('connect', function() {
    console.log('ON!');

    socket.on('disconnect', function() {
        console.log('GONE!');
        process.exit(1);
    });

    socket.send(spammed);
    console.log(spammed + ', YO!');
    output_control = true;
});

var counter = 0;
setInterval(function() {
    var text;
    switch (counter) {
        case 0:
            text = 'Alive!';
            break;
        case 1:
            text = 'Probably now...';
            break;
        case 2:
            text = 'Ok, now!';
            break;
        case 3:
            text = 'Hum...';
            break;
        case 4:
            text = 'HEY? Anyone?';
            break;
        case 5:
            text = 'DYING HERE!!';
            break;
        default:
            text = '';
            break;
    }
    if (output_control) {
        console.log('Giving it a sec just to be sure...');
        clearInterval(this);
    } else {
        console.log(text);
    }
    counter++;
}, 1000);

setTimeout(function() {
    socket.disconnect();
    if (!output_control) {
        console.log('Dead....');
        console.log('Looks like ' + url + ' is not responding.');
        console.log('Sorry!');
    } else {
        console.log('DONE!');
    }
    process.exit(1);
}, 6000)

//var readline = require('readline');
//var rl = readline.createInterface({
//    input: process.stdin,
//    output: process.stdout
//});

//function sendYo(spammed) {
//    socket.send(spammed);
//    setTimeout(function() {
//        sendYo();
//    }, randomInterval());
//}

//rl.question("Who do you wanna spam? ", function(answer) {
//    var spammed = answer;
//    console.log("Thank you! Lets start anoying " + spammed);
//    rl.close();
//    sendYo(spammed);
//});