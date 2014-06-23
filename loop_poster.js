#!/usr/bin/env node

var spammies;
var timer = 500;
if (process.argv[2].size == 0 || process.argv[2] == 'undefined') {
    console.log('Missing victim!');
    process.extit(0);
} else {
    spammies = process.argv[2].split('.');
    if (spammies.length < 2) {
        console.log('Needs at least 2 victims!');
        console.log('One can be a rand string, is just to pass around spam filter.');
        process.extit(0);
    }
    if (process.argv[3] == '-t' || process.argv[3] == '--timer') {
        if (process.argv[4] != 'undefined') {
            timer = process.argv[4] * 1000;
        } else {
            console.log('Using default timer (1sec)');
        }
    }
}

// Waiting from my api token ...
var url = 'http://yo.moinnadeem.com/'
var socket = require('socket.io-client')(url);
socket.on('connect', function() {
    console.log('ON!');

    socket.on('disconnect', function() {
        console.log('GONE!');
        process.exit(1);
    });
    setInterval(function() {
        spammies.forEach(function(spammed) {
            socket.send(spammed);
            console.log(spammed + ', YO!');
        });
    }, timer);
});