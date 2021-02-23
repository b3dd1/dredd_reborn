//Inside this file must be insert the puppeteer recorder sketch
const puppeteer = require('puppeteer');
const fs = require('fs');
const fse = require('fs-extra');
const path = require('path');
const {request} = require('http');
const readline = require('readline-sync');
const utility = require('./utility');
const {info} = require('console');
const jsdom = require("jsdom");

//For the check of the url
const expression = /^(http)(s?)\:\/\/[0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*(:(0-9)*)*(\/?)([a-zA-Z0-9\-\.\?\,\'\/\\\+&amp;%\$#_]*)?$/gm;

//This array contains all the possible type of attack
const attackType = ['Related-domain session hijacking', 'Network session hijacking without HSTS', 'Related-domain session fixation', 'Network session fixation without HSTS'];

//TODO Save the value webSocketDebuggerUrl in a sessionStorage and we take it or from a request to the specific url and obtain the .json with the
//specific value or we ask this string at the begin of test and in this case the user can put this a single time, after that we take it from storage
//the second method must be thinking about it (but it doesn't make me freak), I can try to resolve this problem with a cookie hidden and saved here
//with a small time-to-live (for example one/two hours) and with a mechanism of try...catch for relevate if the webSocket is changed prematurely
//For connect the script to an existing instance of Chrome
const webSocketDebuggerUrl = 'ws://127.0.0.1:9222/devtools/browser/f0fb65a4-a955-4477-bbeb-208970a8c177';

//Two variables for memorize each status-code, one for victim and one for attacker
var victimStatus;
var attackerStatus;

//Variables for memorize alla the page information about victim and attacker last page
var pageVictim;
var pageAttacker;

//Variables for memorize the dom-tree for both victim and attacker


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
		//Saving the cookies about the site (1-st party cookies)
		const cookies = await page.cookies();

		//Try to print and save all the cookies saved
		//console.log(await page._client.send('Network.getAllCookies'));
		//const allCookiesInvolvedInteraction = await page._client.send('Network.getAllCookies');

		//Debug
		console.log("STAMPO L'URL DELLA PAGINA: " + page.url());

		//Save the html code of the last page that it's used inside analysis function for extract the dom-tree
		console.debug("STO SALVANDO L'HTML DELLA PAGINA DELLA VITTIMA");
		pageVictim = await page.content();
		console.log(pageVictim.length);

		//This method introduce so much errors saving html code about the last page
		//const data = await page.evaluate(() => document.querySelector('*').outerHTML);


		//debug
		console.log("Risposte le cui richieste contenevano: " + urlDomain + " " + reqMinimize.length);

		//Write file for save cookies (canvas-session.json), save the html of the page (pageVictim.html)
		//and debugging (request.json)
		try {
			fs.writeFileSync('pageVictim.html', pageVictim);
			fs.writeFileSync('request.json', JSON.stringify(reqMinimize, null, 2));
			fs.writeFileSync('canvas-session.json', JSON.stringify(cookies, null, 2));
			//fs.writeFileSync('allCookiesInvolved.json', JSON.stringify(allCookiesInvolvedInteraction, null, 2));
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
		var newCookies = utility.filterCookies(attackType);
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

		//Save the html code of the last page that it's used inside analysis function for extract the dom-tree
		console.debug("STO SALVANDO L'HTML DELLA PAGINA DELL'ATTACCANTE");
		pageAttacker = await page.content();
		console.log(pageAttacker.length);

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
			
			console.log("RICEVUTI DUE STATUS CODE UGUALI");

			//This two actions are necessary for delete useless tabulations and blank spaces for have all the html in one line
			pageVictimOneLine = pageVictim.replace(/(\r\n|\n+|\r|\t+|\s\s+)/gm, "");
			pageAttackerOneLine = pageAttacker.replace(/(\r\n|\n+|\r|\t+|\s\s+)/gm, "");
			console.log("RIMOSSI SPAZIE E TEBULAZIONI");

			//Parse the html for make it a dom
			var domVictim = new jsdom.JSDOM(pageVictim);
			var domAttacker = new jsdom.JSDOM(pageAttacker);
			console.log("CREATA L'ISTANZA DI DOCUMENT, PROVO A CREARE IL DOM-TREE...");

			//Get the html node from the code about the last page
			rootNodeVictim = domVictim.window.document.documentElement;
			rootNodeAttacker = domAttacker.window.document.documentElement;

			//Function for extract the dom tree
			var domTree = function(nodeHtml) {
				if (nodeHtml.hasChildNodes()) {
					var child = [];
					for (var i = 0; i < nodeHtml.childNodes.length; i++) {
						child.push(domTree(nodeHtml.childNodes[i]));
					}
			
					return {
						nodeName: nodeHtml.nodeName,
						parentName: nodeHtml.parentNode.nodeName,
						child: child
					};
				}
			
				return {
					nodeName: nodeHtml.nodeName,
					parentName: nodeHtml.parentNode.nodeName
				};
			};

			//Get the dom tree from the HTML in one line to avoid to have inside the tree too much text node referred to
			//spaces and tabulations
			domTreeVictim = domTree(rootNodeVictim);
			domTreeAttacker = domTree(rootNodeAttacker);
			
			//Print the file that contains two dom trees and two HTML in one line
			console.log("DOM-TREE CREATO, LO STAMPO NEL FILE DOMTREEVICTIM.JSON");
			try {
				fs.writeFileSync("domTreeVictim.json", JSON.stringify(domTreeVictim, null, 2));
				fs.writeFileSync("domTreeAttacker.json", JSON.stringify(domTreeAttacker, null, 2));
				fs.writeFileSync("htmlOneLineAttacker.html", pageAttackerOneLine);
				fs.writeFileSync("htmlOneLineVictim.html", pageVictimOneLine);
			} catch (err) {
				console.error(err);
			}

			//See if the attacker's dom-tree is equal to victim's dom-tree
			if (JSON.stringify(domTreeVictim, null, 2) === JSON.stringify(domTreeAttacker, null, 2)) {
				return "DOM trees are equal! The attack can be done!";
			}
			else {
				return "Equal status code but the DOM tree are different, so the attack can't be done!"
			}
		}
		
	}
}