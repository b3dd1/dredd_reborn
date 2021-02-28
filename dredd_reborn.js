const puppeteer = require('puppeteer');
const track = require('./sketch_copy.js');
const sleep = require('sleep');
const readline = require('readline-sync');
const { resaultAnalysis } = require('./sketch_copy.js');

//Learn if user know the url domain of the testing site
//const youKnow = readline.keyInYN("Do you know the testing site url domain? ");
var knowUrl;

//MAIN SCRIPT
track.navigateVictim().then(function(cookies) {
    console.log('************************');
    cookies.forEach(cookie => {
        console.log(cookie.name)
    });
    console.log("All the cookies are been printed.");

    console.log('Login with the attacker account.');
    readline.question('Press enter when the login is done.');
    
    track.navigateStriker().then(function() {
        console.log("PROGRAM TERMINATED!");
        console.log(track.resaultAnalysis());
        process.exit(1);
    });
});

/*track.navigateVictim(urlDomain).then(function(cookies) {
        console.log('************************');
        cookies.forEach(cookie => {
            console.log(cookie.name)
        });
        console.log("All the cookies are been printed.");
        //resaultAnalysis();
        process.exit(1);
    }
);*/