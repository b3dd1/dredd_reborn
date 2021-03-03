//Inside this file must be insert the puppeteer recorder sketch
const puppeteer = require('puppeteer');
const fs = require('fs');
const sleep = require('sleep');
const fse = require('fs-extra');
const path = require('path');
const {request} = require('http');
const readline = require('readline-sync');
const utility = require('./utility');
const {info} = require('console');
const jsdom = require("jsdom");
const track = require("./track.js");
const { initialization } = require('./utility');

//Save the url domain (if known) and control if it is a domain
const urlDomain = initialization();

//This array contains all the possible type of attack
const attackType = ['Session hijacking, related-domain attacker', 'Session hijacking, network attacker', 'Session fixation, related-domain attacker', 'Session fixation, network attacker'];

//TODO Save the value webSocketDebuggerUrl in a sessionStorage and we take it or from a request to the specific url and obtain the .json with the
//specific value or we ask this string at the begin of test and in this case the user can put this a single time, after that we take it from storage
//the second method must be thinking about it (but it doesn't make me freak), I can try to resolve this problem with a cookie hidden and saved here
//with a small time-to-live (for example one/two hours) and with a mechanism of try...catch for relevate if the webSocket is changed prematurely
//For connect the script to an existing instance of Chrome
const webSocketDebuggerUrl = 'ws://127.0.0.1:9222/devtools/browser/6ba946d4-8d59-4a55-968a-62758016541f';

//Two variables for memorize each status-code, one for victim and one for attacker
var victimStatus;
var attackerStatus;

//Variables for memorize alla the page information about victim and attacker last page
var pageVictim;
var pageAttacker;

//For indicate if the script is inside navigateVictim (=0) ore navigateStriker (=1)
var identity;

//Memorize the username of the victim, used for the resault analisys 
const username = readline.question("Insert the victim's username: ");

module.exports = {
	//Function for simulate the behaviour of victim
	navigateVictim: async function () {
		indentity = 0;

		console.log("INIZIO DELLA NAVIGATE VICTIM");

		console.log("INIZIO AD ISTANZIARE BROWSER E PAGE");
		//Variable for memorize the instance of browser ad page for scrape the site and set the navigationPromise
		browserPage = await utility.createInstance(webSocketDebuggerUrl, urlDomain);
		browser = browserPage.browser;
		page = browserPage.page;
		const navigationPromise = page.waitForNavigation({
			timeout: 120000,
			waitUntil: ['domcontentloaded', 'networkidle0']
		});
		console.log("HO ISTANZIATO BROWSER, PAGE E NAVIGATION PROMISE");


		//For memorize the requests completes and only url+type
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

		console.log("INIZIO ESECUZIONE SCRIPT VITTIMA, PLEASE WAIT....");

		await page.goto('https://www.reddit.com/')
	
		await page.setViewport({ width: 1536, height: 731 })

		await page.waitForSelector('.\_1nxEQl5D2Bx2jxDILRHemb > div > .qYj03fU5CXf5t2Fc5iSvg > .\_3ozFtOe6WpJEMUtxDOIvtU > .\_1vyLCp-v-tE5QvZovwrASa')
		await page.click('.\_1nxEQl5D2Bx2jxDILRHemb > div > .qYj03fU5CXf5t2Fc5iSvg > .\_3ozFtOe6WpJEMUtxDOIvtU > .\_1vyLCp-v-tE5QvZovwrASa')

		await page.waitForSelector('#email-verification-tooltip-id #email-collection-tooltip-id')
		await page.click('#email-verification-tooltip-id #email-collection-tooltip-id')

		await page.waitForSelector('body > div > .\_2uYY-KeuYHKiwl-9aF0UiL > .\_1YWXCINvcuU7nk0ED-bta8:nth-child(4) > .vzhy90YD0qH7ZDJi7xMGw')
		await page.click('body > div > .\_2uYY-KeuYHKiwl-9aF0UiL > .\_1YWXCINvcuU7nk0ED-bta8:nth-child(4) > .vzhy90YD0qH7ZDJi7xMGw')

		await page.waitForSelector('.\_1nxEQl5D2Bx2jxDILRHemb > .aq7Z-V1l4XpWUOsbbPQed > .\_3FtOlkq31vuUJkzTkq4--W > .M7VDHU4AdgCc6tHaZ-UUy > .\_1PoD47oSHsBQ37RfRPY-G-:nth-child(2)')
		await page.click('.\_1nxEQl5D2Bx2jxDILRHemb > .aq7Z-V1l4XpWUOsbbPQed > .\_3FtOlkq31vuUJkzTkq4--W > .M7VDHU4AdgCc6tHaZ-UUy > .\_1PoD47oSHsBQ37RfRPY-G-:nth-child(2)')

		await page.waitForSelector('.\_1OrNGmpfcSuSebbZM5vYq4 > .\_3FVpvZ7OLbS_68QzaxplxT > .\_2f63as5b5FASHMqGd5P1o0 > .\_1oREjd5ToMFah-VfX5Zt1z > .\_3CWuMoFPzdbJCxYJVmEw00')
		await page.click('.\_1OrNGmpfcSuSebbZM5vYq4 > .\_3FVpvZ7OLbS_68QzaxplxT > .\_2f63as5b5FASHMqGd5P1o0 > .\_1oREjd5ToMFah-VfX5Zt1z > .\_3CWuMoFPzdbJCxYJVmEw00')

		await page.type('.\_1OrNGmpfcSuSebbZM5vYq4 > .\_3FVpvZ7OLbS_68QzaxplxT > .\_2f63as5b5FASHMqGd5P1o0 > .\_1oREjd5ToMFah-VfX5Zt1z > .\_3CWuMoFPzdbJCxYJVmEw00', 'gigino')

		await page.waitForSelector('.\_1OrNGmpfcSuSebbZM5vYq4 > .\_3FVpvZ7OLbS_68QzaxplxT > .\_2f63as5b5FASHMqGd5P1o0 > .\_1oREjd5ToMFah-VfX5Zt1z > .\_2gchCc4pmLk-CHEErYmFaP')
		await page.click('.\_1OrNGmpfcSuSebbZM5vYq4 > .\_3FVpvZ7OLbS_68QzaxplxT > .\_2f63as5b5FASHMqGd5P1o0 > .\_1oREjd5ToMFah-VfX5Zt1z > .\_2gchCc4pmLk-CHEErYmFaP')

		await page.waitForSelector('.\_1nxEQl5D2Bx2jxDILRHemb > .aq7Z-V1l4XpWUOsbbPQed > .\_1OrNGmpfcSuSebbZM5vYq4 > .\_3FVpvZ7OLbS_68QzaxplxT > .\_3IMnOO5YHH-N0YB3yfV2Ha')
		await page.click('.\_1nxEQl5D2Bx2jxDILRHemb > .aq7Z-V1l4XpWUOsbbPQed > .\_1OrNGmpfcSuSebbZM5vYq4 > .\_3FVpvZ7OLbS_68QzaxplxT > .\_3IMnOO5YHH-N0YB3yfV2Ha')

		//DO NOT DELETE THE FOLLOWING INSTRUCTION!!!
		//IF YOU DO IT THE PROGRAM WILL HAVE A WRONG BEHAVIOUR!!!

		//Try to print and save all the cookies saved
		//console.log(await page._client.send('Network.getAllCookies'));
		//const allCookiesInvolvedInteraction = await page._client.send('Network.getAllCookies');

		console.log("FINE ESECUZIONE SCRIPT VITTIMA");

		//Debug
		console.log("STAMPO L'URL DELLA PAGINA: " + page.url());

		console.log("I go to sleep for 7 seconds....");
		sleep.sleep(7);

		//Save the html code of the last page that it's used inside analysis function for extract the dom-tree
		console.debug("STO SALVANDO L'HTML DELLA PAGINA DELLA VITTIMA");
		await page.screenshot({path: 'victim-screenshot.png'});
		sleep.sleep(2);
		pageVictim = await page.content();
		console.log(pageVictim.length);

		//Saving cookies about the site (1-st party cookies)
		const cookies = await page.cookies();

		//debug
		console.log("Risposte le cui richieste contenevano: " + urlDomain + " " + reqMinimize.length);

		//Write file for save cookies (canvas-session.json), save the html of the page (pageVictim.html)
		//and debugging (request.json)
		try {
			fs.writeFileSync('pageVictim.html', pageVictim);
			fs.writeFileSync('requestVictim.json', JSON.stringify(reqMinimize, null, 2));
			fs.writeFileSync('canvas-session.json', JSON.stringify(cookies, null, 2));
		} catch (err) {
			console.error(err);
		};
		console.log("Ho finito di creare il file con le richieste");

		//Extract the status-code from last response and print it
		try {
		victimStatus = requestsCompletes[requestsCompletes.length - 1].response().status();
		console.log("Last response victim status: " + victimStatus);
		} catch (error) {
			throw new Error("No request found, maybe the url domain is wrong, if you don't know it restart the program and doesn't set it!");
		}

		await page.close();

		return cookies;
	},

	//Function for simulate the behaviour of striker
	navigateStriker: async function () {
		identity = 1;

		//Variable for memorize the instance of browser ad page for scrape the site and set the navigationPromise
		browserPage = await utility.createInstance(webSocketDebuggerUrl, urlDomain)
		browser = browserPage.browser;
		page = browserPage.page;
		const navigationPromise = page.waitForNavigation({
			timeout: 120000,
			waitUntil: ['domcontentloaded', 'networkidle0']
		});

		//For memorize the requests
		requestsCompletes = [];
		reqMinimize = [];
		contReq = 0;

		//Filter the cookies and set them in the page
		var newCookies = utility.filterCookies(attackType);
		console.log('Setting cookies in the new page.');
		for (i = 0; i < newCookies.length; i++) {
			await page.setCookie(newCookies[i]);
		}

		console.log("ESECUZIONE SCRIPT ATTACCANTE, PLEASE WAIT....");

		//RULES FOR CREATE AN ACCOURATE SKETCH USING HEADLESS RECORDER (USE WITH CHROMIUM)
		//1)Insert here the headless recorder sscript from the first operation (await page.goto('...'))
		//to the last operation (excluding the line with browser.close()).
		//2)The sketch must start from the login page, insert all the credentials for access to the web-application with the correct account
		//(when you insert a string in all text input field when you finish writing press the tab key and headless recorder memorize the string
		//you write, if you won't memorize it don't press the tabulation key).
		//3)When you insert text in any search box don't press enter key, but click on the right button inside the web-application for start the
		//research.
		//For example of track see example.js file

		await page.goto('https://www.reddit.com/')
	
		await page.setViewport({ width: 1536, height: 731 })

		await page.waitForSelector('.\_1nxEQl5D2Bx2jxDILRHemb > div > .qYj03fU5CXf5t2Fc5iSvg > .\_3ozFtOe6WpJEMUtxDOIvtU > .\_1vyLCp-v-tE5QvZovwrASa')
		await page.click('.\_1nxEQl5D2Bx2jxDILRHemb > div > .qYj03fU5CXf5t2Fc5iSvg > .\_3ozFtOe6WpJEMUtxDOIvtU > .\_1vyLCp-v-tE5QvZovwrASa')

		await page.waitForSelector('#email-verification-tooltip-id #email-collection-tooltip-id')
		await page.click('#email-verification-tooltip-id #email-collection-tooltip-id')

		await page.waitForSelector('body > div > .\_2uYY-KeuYHKiwl-9aF0UiL > .\_1YWXCINvcuU7nk0ED-bta8:nth-child(4) > .vzhy90YD0qH7ZDJi7xMGw')
		await page.click('body > div > .\_2uYY-KeuYHKiwl-9aF0UiL > .\_1YWXCINvcuU7nk0ED-bta8:nth-child(4) > .vzhy90YD0qH7ZDJi7xMGw')

		await page.waitForSelector('.\_1nxEQl5D2Bx2jxDILRHemb > .aq7Z-V1l4XpWUOsbbPQed > .\_3FtOlkq31vuUJkzTkq4--W > .M7VDHU4AdgCc6tHaZ-UUy > .\_1PoD47oSHsBQ37RfRPY-G-:nth-child(2)')
		await page.click('.\_1nxEQl5D2Bx2jxDILRHemb > .aq7Z-V1l4XpWUOsbbPQed > .\_3FtOlkq31vuUJkzTkq4--W > .M7VDHU4AdgCc6tHaZ-UUy > .\_1PoD47oSHsBQ37RfRPY-G-:nth-child(2)')

		await page.waitForSelector('.\_1OrNGmpfcSuSebbZM5vYq4 > .\_3FVpvZ7OLbS_68QzaxplxT > .\_2f63as5b5FASHMqGd5P1o0 > .\_1oREjd5ToMFah-VfX5Zt1z > .\_3CWuMoFPzdbJCxYJVmEw00')
		await page.click('.\_1OrNGmpfcSuSebbZM5vYq4 > .\_3FVpvZ7OLbS_68QzaxplxT > .\_2f63as5b5FASHMqGd5P1o0 > .\_1oREjd5ToMFah-VfX5Zt1z > .\_3CWuMoFPzdbJCxYJVmEw00')

		await page.type('.\_1OrNGmpfcSuSebbZM5vYq4 > .\_3FVpvZ7OLbS_68QzaxplxT > .\_2f63as5b5FASHMqGd5P1o0 > .\_1oREjd5ToMFah-VfX5Zt1z > .\_3CWuMoFPzdbJCxYJVmEw00', 'gigino')

		await page.waitForSelector('.\_1OrNGmpfcSuSebbZM5vYq4 > .\_3FVpvZ7OLbS_68QzaxplxT > .\_2f63as5b5FASHMqGd5P1o0 > .\_1oREjd5ToMFah-VfX5Zt1z > .\_2gchCc4pmLk-CHEErYmFaP')
		await page.click('.\_1OrNGmpfcSuSebbZM5vYq4 > .\_3FVpvZ7OLbS_68QzaxplxT > .\_2f63as5b5FASHMqGd5P1o0 > .\_1oREjd5ToMFah-VfX5Zt1z > .\_2gchCc4pmLk-CHEErYmFaP')

		await page.waitForSelector('.\_1nxEQl5D2Bx2jxDILRHemb > .aq7Z-V1l4XpWUOsbbPQed > .\_1OrNGmpfcSuSebbZM5vYq4 > .\_3FVpvZ7OLbS_68QzaxplxT > .\_3IMnOO5YHH-N0YB3yfV2Ha')
		await page.click('.\_1nxEQl5D2Bx2jxDILRHemb > .aq7Z-V1l4XpWUOsbbPQed > .\_1OrNGmpfcSuSebbZM5vYq4 > .\_3FVpvZ7OLbS_68QzaxplxT > .\_3IMnOO5YHH-N0YB3yfV2Ha')

		//DO NOT DELETE THE FOLLOWING INSTRUCTION!!!
		//IF YOU DO IT THE PROGRAM WILL HAVE A WRONG BEHAVIOUR!!!
		console.log("FINE ESECUZIONE SCRIPT ATTACCANTE");

		//Debug
		console.log("STAMPO L'URL DELLA PAGINA: " + page.url());

		console.log("I go to sleep for 7 seconds....");
		sleep.sleep(7);

		//Save the html code of the last page that it's used inside analysis function for extract the dom-tree
		console.debug("STO SALVANDO L'HTML DELLA PAGINA DELL'ATTACCANTE");
		await page.screenshot({path: 'attacker-screenshot.png'});
		sleep.sleep(2);
		pageAttacker = await page.content();
		console.log(pageAttacker.length);

		try {
			fs.writeFileSync("pageAttacker.html", pageAttacker);
			fs.writeFileSync('requestsAttacker.json', JSON.stringify(reqMinimize, null, 2));
		} catch (err) {
			console.error(err);
		};

		await page.close();

		//Extract the status-code from last response and print it
		attackerStatus = requestsCompletes[requestsCompletes.length - 1].response().status();
		console.log("Last response attacker status: " + attackerStatus);

		return 1;
	},

	//Function for automate control about the test result
	resaultAnalysis: function () {

		//If the attacker hasn't no status-code meaning that attacker's script has rised an error and probably the attack can't be done
		if (victimStatus === attackerStatus || attackerStatus === undefined) {
			//Equal status-code, analize html code of attacker and victim page, if the dom-tree is equal the site
			//is subject to the attack proved, otherwise the attack can't be done
			
			console.log("RICEVUTI DUE STATUS CODE UGUALI O è STATO GENERATO UN ERRORE NELLO SCRIPT DELL'ATTACCANTE");

			//This two actions are necessary for delete useless tabulations and blank spaces for have all the html in one line
			pageVictimOneLine = pageVictim.replace(/(\r\n|\n+|\r|\t+|\s\s+)/gm, "");
			pageAttackerOneLine = pageAttacker.replace(/(\r\n|\n+|\r|\t+|\s\s+)/gm, "");
			//console.log("RIMOSSI SPAZIE E TEBULAZIONI");

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
			console.log("DOM-TREE CREATI, LI STAMPO NEL FILE DOMTREEVICTIM.JSON E DOMTREEATTACKER.JSON");
			try {
				fs.writeFileSync("domTreeVictim.json", JSON.stringify(domTreeVictim, null, 2));
				fs.writeFileSync("domTreeAttacker.json", JSON.stringify(domTreeAttacker, null, 2));
				//fs.writeFileSync("htmlOneLineAttacker.html", pageAttackerOneLine);
				//fs.writeFileSync("htmlOneLineVictim.html", pageVictimOneLine);
			} catch (err) {
				console.error(err);
			}

			//This condition is necessary when the attacker try to execut the script and is raised an error
			if (attackerStatus === undefined && (JSON.stringify(domTreeVictim, null, 2) === JSON.stringify(domTreeAttacker, null, 2))) {
				return "DOM trees are not equal, attack can't be done!";
			}

			//See if the attacker's dom-tree is equal to victim's dom-tree and if inside the html code of attacker I can find the username of victim, if yes the attack can be done
			if (JSON.stringify(domTreeVictim, null, 2) === JSON.stringify(domTreeAttacker, null, 2) && (pageVictim.includes(username) && pageAttacker.includes(username))) {
				return "DOM trees are equal! The attack can be done!";
			}
			else {
				return "Equal status code but the DOM tree are different, so the attack can't be done!"
			}
		} else {
			return "Attacker's status-code isn't equal to victim's status-code, so this site isn't subject to this type of attack!";
		}
		
	}
}