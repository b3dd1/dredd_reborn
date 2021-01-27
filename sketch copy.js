//Inside this file must be insert the puppeteer recorder sketch
const puppeteer = require('puppeteer');
const fs = require('fs');
const fse = require('fs-extra');
const path = require('path');
const { request } = require('http');
const readline = require('readline-sync');
const utility = require('./utility');
const { info } = require('console');

//urlDomain = process.argv[2];
//For the check of the url
const expression = /^(http)(s?)\:\/\/[0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*(:(0-9)*)*(\/?)([a-zA-Z0-9\-\.\?\,\'\/\\\+&amp;%\$#_]*)?$/gm;
//For choose the type of attack
attackType = ['Related-domain session hijacking', 'Network session hijacking without HSTS', 'Related-domain session fixation', 'Network session fixation without HSTS'];
//For connect the script to an existing instance of Chrome
const webSocketDebuggerUrl = readline.question('Insert the webSocketDebuggerUrl value: ');


module.exports = {
    //Function for simulate the behaviour of victim
    navigateVictim: async function(urlDomain) {
        //Variable for memorize the instance of browser ad receive a new page
        browser = (await utility.createInstance(webSocketDebuggerUrl)).browser;
        page = (await utility.createInstance(webSocketDebuggerUrl)).page;
        const navigationPromise = page.waitForNavigation({timeout: 120000});
        

        requests = {};
        contReq = 0;

        if  (!expression.test(urlDomain)) {
			browser.close();
            throw new Error('Wrong url, retry');
        }

          //eventhalndler for testing the order of questions and reply
        page.on('request', async function(request) {
        const url = request.url();
        if (url.indexOf(urlDomain) == 0 && request.resourceType() != "image" && request.resourceType() != "media" && request.resourceType() != "font") {
            requests[contReq] =  "request url: " + url + " type: " + request.resourceType();
            contReq = contReq + 1;
            console.log(request.frame());
        }
        });

        //RULES FOR CREATE AN ACCOURATE SKETCH USING HEADLESS RECORDER (USE WITH CHROMIUM)
        //1)Insert here the headless recorder sscript from the first operation (await page.goto('...'))
        //to the last operation (excluding the line with browser.close()).
        //2)The sketch must start from the login page, insert all the credentials for access to the web-application with the correct account
        //(when you insert a string in all text input field when you finish writing press the tab key and headless recorder memorize the string
        //you write, if you won't memorize it don't press the tabulation key).
        //3)When you insert text in any search box don't press enter key, but click on the right button inside the web-application for start the
        //research.
        //For example of track see example.js file

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
        //utility.userAction(page, navigationPromise, browser);

        

        //DO NOT DELETE THE FOLLOWING INSTRUCTION!!!
        //IF YOU DO IT THE PROGRAM WILL HAVE A WRONG BEHAVIOUR!!!
        const cookies = await page.cookies();

		await page.close();
		
		console.log("Risposte le cui richieste contenevano " + urlDomain + " " + contReq);

        try {
            fs.writeFileSync('request.json', JSON.stringify(requests, null, 2));
            fs.writeFileSync('canvas-session.json', JSON.stringify(cookies, null, 2));
        } catch(err) {
            console.error(err);
        };
        console.log("Ho finito di creare il file con le richieste");
        //console.log('Stampo url e status-code della seconda richiesta effettuata');
        //console.log(requests[1].url() + " " + requests[1].response().status());

        //Clear the cookies
        //await page.deleteCookie(cookies);

        return cookies;
    },

    //Function for simulate the behaviour of striker
    navigateStriker: async function() {
        //Variable for memorize the instance of browser ad receive a new page
        browser = (await utility.createInstance(webSocketDebuggerUrl)).browser;
        page = (await utility.createInstance(webSocketDebuggerUrl)).page;
        const navigationPromise = page.waitForNavigation({timeout: 120000});

        //var requests = {};
        //var contReq = 0;
        var newCookies = utility.filterCookies();
        console.log(newCookies);

          //event halndler for testing the order of questions and reply
        /*page.on('request', async request => {
        const url = request.url();
        if (url.indexOf(urlDomain) == 0 && request.resourceType() != "image" && request.resourceType() != "media" && request.resourceType() != "font") {
            requests[contReq] = "request url: " + url + " type: " + request.resourceType();
            contReq = contReq + 1;
        }
        });*/

        
        console.log('Setting cookies in the new page.');
        for (i = 0; i < newCookies.length; i++) {
            await page.setCookie(newCookies[i]);
        }

        console.log("Execute the script");

        //RULES FOR CREATE AN ACCOURATE SKETCH USING HEADLESS RECORDER (USE WITH CHROMIUM)
        //1)Insert here the headless recorder sscript from the first operation (await page.goto('...'))
        //to the last operation (excluding the line with browser.close()).
        //2)The sketch must start from the login page, insert all the credentials for access to the web-application with the correct account
        //(when you insert a string in all text input field when you finish writing press the tab key and headless recorder memorize the string
        //you write, if you won't memorize it don't press the tabulation key).
        //3)When you insert text in any search box don't press enter key, but click on the right button inside the web-application for start the
        //research.
        //For example of track see example.js file

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
        
        

        //DO NOT DELETE THE FOLLOWING INSTRUCTION!!!
        //IF YOU DO IT THE PROGRAM WILL HAVE A WRONG BEHAVIOUR!!!

		await page.close();
		
		/*console.log("Risposte le cui richieste contenevano " + urlDomain + " " + contReq);

        fs.writeFile('request.json', JSON.stringify(requests, null, 2), function(err) {
            if (err) throw err;
            console.log('completed write of requests');
        });*/

        return 1;
    }
}



/*executeNavigation = function(page, navigationPromise) {
    //Function in which the user put the script
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
}*/

