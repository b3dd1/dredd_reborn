const { argv } = require('process');
const puppeteer = require('puppeteer');
const track = require('./sketch\ copy.js');
const sleep = require('sleep');
const readline = require('readline-sync');

urlDomain = process.argv[2];
/*track.navigateVictim(urlDomain).then(function(cookies) {
    console.log('************************');
    cookies.forEach(cookie => {
        console.log(cookie.name)
    });
    console.log("All the cookies are been printed.");

    console.log('Login with the attacker account.');
    readline.question('Press enter when the login is done.');
    
    track.navigateStriker().then(function() {
        console.log("PROGRAM TERMINATED!");

        process.exit(1);
    });
});*/

track.navigateVictim(urlDomain).then(function(cookies) {
        console.log('************************');
        cookies.forEach(cookie => {
            console.log(cookie.name)
        });
        console.log("All the cookies are been printed.");
        process.exit(1);
    }
);