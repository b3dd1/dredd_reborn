const { argv } = require('process');
const puppeteer = require('puppeteer');
const track = require('./sketch\ copy.js');
const sleep = require('sleep');
const readline = require('readline-sync');

//Receive in input the URL of the testing site domain (ex: https://www.mondadoristore.it, https://www.reddit.com)
const urlDomain = readline.question('The domain of the testing site is:  ');

/*track.navigateVictim(urlDomain).then(function(cookies) {
    console.log('************************');
    cookies.forEach(cookie => {
        console.log(cookie.name)
    });
    console.log("All the cookies are been printed.");

    console.log('Login with the attacker account.');
    readline.question('Press enter when the login is done.');
    
    track.navigateStriker(urlDomain).then(function() {
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