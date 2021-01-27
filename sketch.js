//Inside this file must be insert the puppeteer recorder sketch
const puppeteer = require('puppeteer');
const fs = require('fs');
const fse = require('fs-extra');
const path = require('path');
const { request } = require('http');

module.exports = {
    navigateVictim: async function() {
        //try to insert here the puppeteer recorder track and make some test to see if
        //it can upload in dredd_reborn.js script like a module
        const browser = await puppeteer.launch({headless: false, slowMo: 250});
        const page = await browser.newPage();
        requests = {};
        responses = {};
		cont = 0;
        countReqMainUrl = 0;
        contReq = 0;
        urlDomain = process.argv[2];
        const expression = /^(http)(s?)\:\/\/[0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*(:(0-9)*)*(\/?)([a-zA-Z0-9\-\.\?\,\'\/\\\+&amp;%\$#_]*)?$/gm;

        if  (!expression.test(urlDomain)) {
			browser.close();
            throw new Error('Wrong url, retry');
        }

        
        /*page.on("response", response => {
			cont = cont + 1;
            mainUrl = urlDomain;
            const request = response.request();
            const url = request.url();
            const status = response.status();
            //responses[cont] = response.json();
            //console.log("response url:", url, "status:", status);
                if (url.indexOf(mainUrl) == 0 && response.request().resourceType() == "xhr") {
					//mainUrlStatus = status;
                    console.log("response url:", url, "status:", status);
                    //responses[countReqMainUrl] = response.json(); => il .json() non funziona perchè prima va fatta la stringify
                    responses[countReqMainUrl] = "response url: " + url + " status: " + status;
                    countReqMainUrl = countReqMainUrl + 1;
                }
          });*/
          //eventhalndler for testing the order of questions and reply
          page.on('request', async request => {
            //const mainUrl = https://www.mondadoristore.it;
            const url = request.url();
            if (url.indexOf(urlDomain) == 0 && request.resourceType() != "image" && request.resourceType() != "media" && request.resourceType() != "font") {
                //console.log("request url:", url);
                requests[contReq] = "request url: " + url + " type: " + request.resourceType();
                console.log(request);
                contReq = contReq + 1;
            }
          });
        
        const navigationPromise = page.waitForNavigation({timeout: 120000});

        //RULES FOR CREATE AN ACCOURATE SKETCH USING HEADLESS RECORDER (USE WITH CHROMIUM)
        //1)Insert here the headless recorder sscript from the first operation (await page.goto('...'))
        //to the last operation (excluding the line with browser.close()).
        //2)The sketch must start from the login page, insert all the credentials for access to the web-application with the correct account
        //(when you insert a string in all text input field when you finish writing press the tab key and headless recorder memorize the string
        //you write, if you won't memorize it don't press the tabulation key).
        //3)When you insert text in any search box don't press enter key, but click on the right button inside the web-application for start the
        //research.
        //For example of track see example.js file
  
        await page.goto('https://connect.mondadori.it/login?area=WE&applicazione=INMONDADORI&urlRitorno=https%3A%2F%2Fwww.mondadoristore.it%2F')

        await page.setViewport({ width: 1536, height: 731 })
    
        await page.waitForSelector('.inner-tiny #username')
        await page.click('.inner-tiny #username')
    
        await page.waitForSelector('.inner-tiny > .left > #login-form > .submit-area > .btn')
        await page.click('.inner-tiny > .left > #login-form > .submit-area > .btn')
    
        await navigationPromise
    
        await page.waitForSelector('#big-header > #fixed-bar > #main-search #search-input')
        await page.click('#big-header > #fixed-bar > #main-search #search-input')
    
        await page.type('#big-header > #fixed-bar > #main-search #search-input', 'pimpa')
    
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
        const cookies = await page.cookies();

		await browser.close();
		
		/*console.log("STO PER STAMPARE LA QUINTA RICHIESTA");
		console.log(requests[0]);
		console.log("STO PER STAMPARE LA QUINTA RISPOSTA");
        console.log(responses[0]);*/
		//console.log("Risposte totali ricevute: " + cont);
		console.log("Risposte le cui richieste contenevano " + urlDomain + " " + contReq);
        //console.log(responses[219]);
        //console.log(contReq);

        /*fs.writeFile('responses.json', JSON.stringify(responses, null, 2), function(err) {
            if (err) throw err;
            console.log('completed write of responses');
        });*/

        /*while (//ci sono elementi nell'array delle risposte) {
            //salva url e status nell'array delle risposte per quella relativa risposta
        };*/



        fs.writeFile('request.json', JSON.stringify(requests, null, 2), function(err) {
            if (err) throw err;
            console.log('completed write of requests');
        });

        return cookies;
    }
 }