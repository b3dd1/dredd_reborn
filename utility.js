const puppeteer = require('puppeteer');
const fs = require('fs');
const fse = require('fs-extra');
const path = require('path');
const { request } = require('http');
const readline = require('readline-sync');

const parentDomain = [".aliexpress.com", "aliexpress.com"];

module.exports = {
    //TODO Function that make the first action like ask to user the url domain (if known) and the control if is a valid url
    initialization: function() {
        var knowUrl = readline.keyInYN("Did you know the url of site's domain? ");

        if (knowUrl) {
            //Receive in input the URL of the testing site domain (ex: https://www.mondadoristore.it, https://www.reddit.com)
            const urlDomain = readline.question("The domain of the testing site is:  ");

            //For the check of the url
            //const expression = /^(http)(s?)\:\/\/[0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*(:(0-9)*)*(\/?)([a-zA-Z0-9\-\.\?\,\'\/\\\+&amp;%\$#_]*)?$/m;
            const expression = new RegExp('^(https?:\\/\\/)?'+ // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
            '(\\#[-a-z\\d_]*)?$','i');
            //Test for see if the main url insert from user is a valid url form
            if (!expression.test(urlDomain)) {
                throw new Error('This is not an URL, please retry');
            }
            console.log("L'URL è STATO CONTROLLATO");

            return urlDomain;
        }
        
        return 0;
    },

    //Function for filter cookies
    filterCookies: function(attackType) {
        console.log('Sono dentro la funzione filterCookies');
        //Read cookies from the file canvas-session.json
        console.log('Reading cookies from the previosly generated file canvas-session.');
        try {
            var cookiesString = fs.readFileSync('./canvas-session.json', 'utf8');
        } catch (err) {
            console.error(err);
        }
        const allCookies = JSON.parse(cookiesString);

        var filteredCookies;

        //Choose the type of attack
        choosenIndex = this.chooseAttack(attackType);
        console.log("L'indice arrivato è: " + choosenIndex);

        //Select the set of cookies that the attacker may can have
        console.log("Cookies filtering...");
        switch (choosenIndex) {
            case 0: //Related-domain session hijacking
                //TODO CERCARE UN MODO PER PARAMETRIZZARE IL DOMINIO DEI COOKIES E PER CAPIRE COME PARAMETRIZZARE I DOMINI PADRE
                filteredCookies = allCookies.filter(function (cookie) {
                    return cookie.domain.startsWith(parentDomain[0]) || cookie.domain.startsWith(parentDomain[1]);
                }); 
                break;
            case 1: //Network session hijacking (no HSTS or partial HSTS adoption)
                filteredCookies = allCookies.filter(function (cookie) {
                    return !cookie.secure ||  (!cookie.secure && (cookie.domain.startsWith(parentDomain[0]) || cookie.domain.startsWith(parentDomain[1])));
                });
                break;
            case 2: //Related-domain session fixation
                filteredCookies = allCookies.filter(function (cookie) {
                    return !cookie.domain.startsWith("__Host-");
                });
                break;
            case 3: //Network session fixation (no HSTS adopted and no __Host- or __Secure- prefix)
                filteredCookies = allCookies.filter(function (cookie) {
                    return !cookie.secure && ((!cookie.domain.startsWith("__Secure-")) && (!cookie.domain.startsWith("__Host-")));
                });
                break;
        }
        console.log("Cookies filtering terminated.");
        
        try {
            fs.writeFileSync("cookies-filtered.json", JSON.stringify(filteredCookies, null, 2));
        } catch (err) {
            console.error(err);
        };

        return filteredCookies;
    },

    //Function for choose the attack to execute from the array attackType that contains all the string with the possible
    //attack that can be done
    chooseAttack: function(attackType) {
        var choosenIndex = readline.keyInSelect(attackType, "Digit the index of the attack you want to run");
        console.log("The attack choosen is: " + attackType[choosenIndex] + ". Index: " + choosenIndex);

        return choosenIndex;
    },

    //Function for connecting the script to an existent instance of Google Chrome
    createInstance: async function(webSocketDebuggerUrl, urlDomain) {
        console.log("urlDomain is: " + urlDomain);
        //Creating the browser instance and the page instance
        const browser = await puppeteer.connect({
            browserWSEndpoint: webSocketDebuggerUrl,
            headless: false,
            slowMo: 400
        });
        const page = await browser.newPage();

        //Event handler for every request that starts
        page.on('request', async function(request) {
            //Extract url from request
            const url = request.url();

            if (urlDomain == 0) {
                if (request.resourceType() != "image" && request.resourceType() != "media" && request.resourceType() != "font" && request.resourceType() != "stylesheet" && request.resourceType() != "other") {
                    requestsCompletes[contReq] =  request;
                    reqMinimize[contReq] = "request url: " + url + " type: " + request.resourceType();
    
                    contReq = contReq + 1;
                }
            }
            else {
                if (url.indexOf(urlDomain) == 0 && request.resourceType() != "image" && request.resourceType() != "media" && request.resourceType() != "font" && request.resourceType() != "stylesheet" && request.resourceType() != "other") {
                    requestsCompletes[contReq] =  request;
                    reqMinimize[contReq] = "request url: " + url + " type: " + request.resourceType();
    
                    contReq = contReq + 1;
                }
            }
        });

        /*page.on('response', response => {
            console.log("L'url della risposta ricevuta è: " + response.url() + " con status-code: " + response.status());
        });*/

        return {"browser": browser, "page": page};
    },

    //Function for replicate the user interaction
    userAction: async function(page, navigationPromise, browser) {
    },

    //TODO Function for do automatic login for both victim and attacker
    authentication: function() {
        username = readline.question('Username: ', {hideEchoBack: false});
        password = readline.question('Password: ', {hideEchoBack: true});

        return {"username": username, "password": password};
    }
}
