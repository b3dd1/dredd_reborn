const puppeteer = require('puppeteer');
const fs = require('fs');
const fse = require('fs-extra');
const path = require('path');
const { request } = require('http');
const readline = require('readline-sync');

module.exports = {
    //Function for filter cookies
    filterCookies: function() {
        //Read cookies from the file canvas-session.json
        console.log('Reading cookies from the previosly generated file canvas-session.');
        const cookiesString = fs.readFileSync('./canvas-session.json', 'utf8');
        const allCookies = JSON.parse(cookiesString);
        console.log('Sono dentro la funzione filterCookies');
        //console.log("Vado a stampare allCookies" + allCookies);
        var filteredCookies;

        //Choose the type of attack
        choosenIndex = this.chooseAttack();
        console.log("L'indice arrivato è: " + choosenIndex);

        //Select the set of cookies that the attacker may can have
        console.log("Cookies filtering...");
        switch (choosenIndex) {
            case 0: //Related-domain session hijacking
                //CERCARE UN MODO PER PARAMETRIZZARE IL DOMINIO DEI COOKIES
                filteredCookies = allCookies.filter(function (cookie) {
                    return cookie.domain.startsWith("mondadori.it") || cookie.domain.startsWith(".mondadori.it");
                });
                break;
            case 1: //Network session hijacking without HSTS
                filteredCookies = allCookies.filter(function (cookie) {
                    return !cookie.secure;
                });
                break;
            case 2: //Related-domain session fixation
                filteredCookies = allCookies.filter(function (cookie) {
                    return !cookie.domain.startsWith("__Host");
                });
                console.log("Sono dentro al terzo caso dello switch");
                console.log(filteredCookies);
                break;
            case 3: //Network session fixation without HSTS
                filteredCookies = allCookies.filter(function (cookie) {
                    return (!cookie.domain.startsWith("__Secure")) && (!cookie.domain.startsWith("__Host"));
                });
                break;
        }
        console.log("Cookies filtering terminated.");
        /*filteredCookies.forEach(cookie => {
            console.log(cookie.name);
        });
        console.log(filteredCookies);*/

        return filteredCookies;
    },

    //Function for choose the attack to execute
    chooseAttack: function() {
        var choosenIndex = readline.keyInSelect(attackType, "Digit the index of the attack you want to run");

        /*if (choosenIndex < 0 || choosenIndex > 4) {
            throw new Error("Error, bad selection!!");
        }*/
        console.log("The attack choosen is: " + attackType[choosenIndex] + ". Index: " + choosenIndex);

        return choosenIndex;
    },

    //Function for connecting the script to an existent instance of Google Chrome
    createInstance: async function(webSocketDebuggerUrl, urlDomain) {
        //Creating the browser instance and the page instance
        const browser = await puppeteer.connect({
            browserWSEndpoint: webSocketDebuggerUrl,
            headless: false,
            slowMo: 300
        });
        const page = await browser.newPage();

        //Event handler for every request that starts
        page.on('request', async function(request) {
            const url = request.url();
            if (url.indexOf(urlDomain) == 0 && request.resourceType() != "image" && request.resourceType() != "media" && request.resourceType() != "font" && request.resourceType() != "stylesheet") {
                requestsCompletes[contReq] =  request;
                reqMinimize[contReq] = "request url: " + url + " type: " + request.resourceType();

                contReq = contReq + 1;
            }
        });

        page.on("load", async function() {
            content[cont] = page.content();
            cont++;
        });

        return {"browser": browser, "page": page};
    },

    //Function for replicate the user interaction
    userAction: async function(page, navigationPromise, browser) {
        await page.goto('https://www.mondadoristore.it/')
  
        await page.setViewport({ width: 1536, height: 731 })
        
        await page.waitForSelector('#big-header > #fixed-bar > #main-search #search-input')
        await page.click('#big-header > #fixed-bar > #main-search #search-input')
        
        await page.type('#big-header > #fixed-bar > #main-search #search-input', 'mago merlino')
        
        await page.waitForSelector('#fixed-bar > #main-search > .searchBar > #adv-search-button > .image')
        await page.click('#fixed-bar > #main-search > .searchBar > #adv-search-button > .image')
        
        await navigationPromise
        
        await page.waitForSelector('.info-data-product:nth-child(1) > .product-info > .product-info-wrapper > .title > .link')
        await page.click('.info-data-product:nth-child(1) > .product-info > .product-info-wrapper > .title > .link')
        
        await navigationPromise
        
        await page.waitForSelector('.price > .right > .info-data-product > .columRightDetail > .add-to-favorites-new')
        await page.click('.price > .right > .info-data-product > .columRightDetail > .add-to-favorites-new')
    },

    authentication: function() {
        username = readline.question('Username: ', {hideEchoBack: false});
        password = readline.question('Password: ', {hideEchoBack: true});

        return {"username": username, "password": password};
    }
}
