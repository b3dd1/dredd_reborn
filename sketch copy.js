//Inside this file must be insert the puppeteer recorder sketch
const puppeteer = require('puppeteer');
const fs = require('fs');
const fse = require('fs-extra');
const path = require('path');
const {
	request
} = require('http');
const readline = require('readline-sync');
const utility = require('./utility');
const {
	info
} = require('console');

//For the check of the url
const expression = /^(http)(s?)\:\/\/[0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*(:(0-9)*)*(\/?)([a-zA-Z0-9\-\.\?\,\'\/\\\+&amp;%\$#_]*)?$/gm;

//This array contains all the possible type of attack
const attackType = ['Related-domain session hijacking', 'Network session hijacking without HSTS', 'Related-domain session fixation', 'Network session fixation without HSTS'];

//For connect the script to an existing instance of Chrome
const webSocketDebuggerUrl = 'ws://127.0.0.1:9222/devtools/browser/53f48594-fa15-4b7a-b00c-a9868cd8c06a';

//Two variables for memorize each status-code, one for victim and one for attacker
var victimStatus;
var attackerStatus;

//Variables for memorize alla the page information about victim and attacker last page
var pageVictim;
var pageAttacker;

module.exports = {
	//Function for simulate the behaviour of victim
	navigateVictim: async function (urlDomain) {
		console.log("INIZIO DELLA NAVIGATE VICTIM");
		//Test for see if the main url insert from user is a valid url form
		if (!expression.test(urlDomain)) {
			throw new Error('This is not an URL, please retry');
		}
		console.log("L'URL è STATO CONTROLLATO");

		console.log("INIZIO AD ISTANZIARE BROWSER E PAGE");
		//Variable for memorize the instance of browser ad page for scrape the site and set the navigationPromise
		browserPage = await utility.createInstance(webSocketDebuggerUrl, urlDomain);
		browser = browserPage.browser;
		page = browserPage.page;
		const navigationPromise = page.waitForNavigation({
			timeout: 120000
		});
		console.log("HO ISTANZIATO BROWSER, PAGE E NAVIGATION PROMISE");


		//For memorize the requests
		requestsCompletes = [];
		reqMinimize = [];
		content = [];
		cont = 0;
		contReq = 0;

		//RULES FOR CREATE AN ACCOURATE SKETCH USING HEADLESS RECORDER
		//1)Insert here the headless recorder sscript from the first operation (await page.goto('...'))
		//to the last operation (excluding the line with browser.close()).
		//2)The sketch must start from the login page, insert all the credentials for access to the web-application with the correct account
		//(when you insert a string in all text input field when you finish writing press the tab key and headless recorder memorize the string
		//you write, if you won't memorize it don't press the tabulation key).
		//3)When you insert text in any search box don't press enter key, but click on the right button inside the web-application for start the
		//research.
		//For example of track see example.js file

		console.log("INIZIO ESECUZIONE SCRIPT VITTIMA");

		await page.goto('https://www.mondadoristore.it/')

		await page.setViewport({
			width: 1536,
			height: 731
		})

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

		console.log("FINE ESECUZIONE SCRIPT VITTIMA");


		//DO NOT DELETE THE FOLLOWING INSTRUCTION!!!
		//IF YOU DO IT THE PROGRAM WILL HAVE A WRONG BEHAVIOUR!!!
		const cookies = await page.cookies();

		console.log("STAMPO L'URL DELLA PAGINA: " + page.url());

		//Save the html code of the last page that it's used inside analysis function for extract the dom-tree
		pageVictim = await page.content();
		console.log(pageContent.length);

		//This method introduce so much errors saving html code about the last page
		//const data = await page.evaluate(() => document.querySelector('*').outerHTML);


		//debug
		console.log("Risposte le cui richieste contenevano: " + urlDomain + " " + reqMinimize.length);

		//Write file for save cookies (canvas-session.json), save the html of the page (pageVictim.html)
		//and debugging (request.json)
		try {
			fs.writeFileSync('pageVictim.xhtml', pageVictim);
			fs.writeFileSync('request.json', JSON.stringify(reqMinimize, null, 2));
			fs.writeFileSync('canvas-session.json', JSON.stringify(cookies, null, 2));
		} catch (err) {
			console.error(err);
		};
		console.log("Ho finito di creare il file con le richieste");

		//Extract the status-code from last response and print it
		victimStatus = requestsCompletes[requestsCompletes.length - 1].response().status();
		console.log("Last response victim status: " + victimStatus);

		await page.close();

		return cookies;
	},

	//Function for simulate the behaviour of striker
	navigateStriker: async function (urlDomain) {
		//Variable for memorize the instance of browser ad page for scrape the site and set the navigationPromise
		browserPage = await utility.createInstance(webSocketDebuggerUrl, urlDomain)
		browser = browserPage.browser;
		page = browserPage.page;
		const navigationPromise = page.waitForNavigation({
			timeout: 120000
		});

		//For memorize the requests
		requestsCompletes = [];
		contReq = 0;

		//Filter the cookies and set them in the page
		var newCookies = utility.filterCookies();
		console.log('Setting cookies in the new page.');
		for (i = 0; i < newCookies.length; i++) {
			await page.setCookie(newCookies[i]);
		}

		console.log("ESECUZIONE SCRIPT ATTACCANTE");

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

		await page.setViewport({
			width: 1536,
			height: 731
		})

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

		console.log("FINE ESECUZIONE SCRIPT ATTACCANTE");

		//DO NOT DELETE THE FOLLOWING INSTRUCTION!!!
		//IF YOU DO IT THE PROGRAM WILL HAVE A WRONG BEHAVIOUR!!!

		pageAttacker = await page.content();
		console.log(pageContent.length);

		try {
			fs.writeFileSync("pageAttacker.html", pageAttacker);
		} catch (err) {
			console.error(err);
		};

		await page.close();

		//Extract the status-code from last response and print it
		attackerStatus = requestsCompletes[requestsCompletes.length - 1].response().status();
		console.log("Last response attacker status: " + attackerStatus);

		return 1;
	},

	/*    executeNavigation: async function(page, navigationPromise) {
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
		},*/

	//Function for automate control about the test result
	resaultAnalysis: function () {
		if (victimStatus !== attackerStatus) {
			return "The site isn't subject to this type of attack!";
		} else {
			//Equal status-code, analize html code of attacker and victim page, if the dom-tree is equal the site
			//is subject to the attack proved, otherwise the attack can't be done
			console.log(pageVictim.length);
			console.log(pageAttacker.length);
		}
	}
}