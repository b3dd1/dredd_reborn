/*TRACCIE MONDADORI*/
//Aggiungere il primo libro di pimpa che appare dopo una ricerca ai preferiti
	await page.goto('https://connect.mondadori.it/login?area=WE&applicazione=INMONDADORI&urlRitorno=https%3A%2F%2Fwww.mondadoristore.it%2F')

	await page.setViewport({ width: 1536, height: 731 })

	await page.waitForSelector('.inner-tiny #username')
	await page.click('.inner-tiny #username')

	await page.type('.inner-tiny #username', 'Gino__')

	await page.type('.inner-tiny #password', 'AP?7916:fb')

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

//mondadori aggiungere un articolo al carrello
	await page.goto('https://connect.mondadori.it/login?area=WE&applicazione=INMONDADORI&urlRitorno=https%3A%2F%2Fwww.mondadoristore.it%2F&_ga=2.133473799.840360263.1610491816-986668735.1609892859')
	
	await page.setViewport({ width: 1920, height: 979 })

	await page.waitForSelector('.inner-tiny #username')
	await page.click('.inner-tiny #username')

	await page.type('.inner-tiny #username', 'Gino__')

	await page.type('.inner-tiny #password', 'AP?7916:fb')

	await page.waitForSelector('.inner-tiny > .left > #login-form > .submit-area > .btn')
	await page.click('.inner-tiny > .left > #login-form > .submit-area > .btn')

	await navigationPromise

	await page.waitForSelector('#big-header > #fixed-bar > #main-search #search-input')
	await page.click('#big-header > #fixed-bar > #main-search #search-input')

	await page.type('#big-header > #fixed-bar > #main-search #search-input', 'kobe')

	await page.waitForSelector('#fixed-bar > #main-search > .searchBar > #adv-search-button > .image')
	await page.click('#fixed-bar > #main-search > .searchBar > #adv-search-button > .image')

	await navigationPromise

	await page.waitForSelector('.info-data-product:nth-child(3) > .product-info > .product-info-wrapper > .title > .link')
	await page.click('.info-data-product:nth-child(3) > .product-info > .product-info-wrapper > .title > .link')

	await navigationPromise

	await page.waitForSelector('.price > .right > .info-data-product > #add-to-basket > .add')
	await page.click('.price > .right > .info-data-product > #add-to-basket > .add')

	await navigationPromise

/**************************************************************************************** */


//Accedere a reddit, creare un post e pubblicarlo
	await page.goto('https://www.reddit.com/login/')

	await page.setViewport({ width: 1920, height: 947 })

	await page.waitForSelector('.Step #loginUsername')
	await page.click('.Step #loginUsername')

	await page.type('.Step #loginUsername', 'bedaxx')

	await page.type('.Step #loginPassword', 'Gino Paperino')

	await page.waitForSelector('.Step > .Step__content > .AnimatedForm > .AnimatedForm__field > .AnimatedForm__submitButton')
	await page.click('.Step > .Step__content > .AnimatedForm > .AnimatedForm__field > .AnimatedForm__submitButton')

	await navigationPromise

	await page.waitForSelector('.\_19oWd7e3z7-ztUGzdIoCR7 > #email-verification-tooltip-id > #change-username-tooltip-id > .\_2zZ-KGHbWWqrwGlHWXR90y:nth-child(3) > .\_1x6pySZ2CoUnAfsFhGe7J1')
	await page.click('.\_19oWd7e3z7-ztUGzdIoCR7 > #email-verification-tooltip-id > #change-username-tooltip-id > .\_2zZ-KGHbWWqrwGlHWXR90y:nth-child(3) > .\_1x6pySZ2CoUnAfsFhGe7J1')

	await page.waitForSelector('.XZK-LTFT5CgGo9MvPQQsy > .\_2sfaZWDVT8JLAt2J9p4IzV > .\_3cWzf-usAKfGV1Ay7h2zM_ > div > .XHbKeEqnW58ib9mTN6jnS')
	await page.click('.XZK-LTFT5CgGo9MvPQQsy > .\_2sfaZWDVT8JLAt2J9p4IzV > .\_3cWzf-usAKfGV1Ay7h2zM_ > div > .XHbKeEqnW58ib9mTN6jnS')

	await page.type('.XZK-LTFT5CgGo9MvPQQsy > .\_2sfaZWDVT8JLAt2J9p4IzV > .\_3cWzf-usAKfGV1Ay7h2zM_ > .anPJr_ybRailY8NbAunl2 > .\_1MHSX9NVr4C2QxH2dMcg4M', 'u/bedaxx')

	await page.waitForSelector('.\_3w_665DK_NH7yIsRMuZkqB > .\_1zq6UabIEJJ-z9grsiCJY7 > .\_3zkbHfhLbXp21FwGj_kNZV > .\_2wyvfFW3oNcCs5GVkmcJ8z > .PqYQ3WC15KaceZuKcFI02')
	await page.click('.\_3w_665DK_NH7yIsRMuZkqB > .\_1zq6UabIEJJ-z9grsiCJY7 > .\_3zkbHfhLbXp21FwGj_kNZV > .\_2wyvfFW3oNcCs5GVkmcJ8z > .PqYQ3WC15KaceZuKcFI02')

	await page.type('.\_3w_665DK_NH7yIsRMuZkqB > .\_1zq6UabIEJJ-z9grsiCJY7 > .\_3zkbHfhLbXp21FwGj_kNZV > .\_2wyvfFW3oNcCs5GVkmcJ8z > .PqYQ3WC15KaceZuKcFI02', 'no')

	await page.waitForSelector('.XZK-LTFT5CgGo9MvPQQsy > .\_2DHDj0dbS1TkKD3fMqSbHy > .XZK-LTFT5CgGo9MvPQQsy > .\_1T0P_YQg7fOYLCRoKl_xxO > .\_18Bo5Wuo3tMV-RDB8-kh8Z')
	await page.click('.XZK-LTFT5CgGo9MvPQQsy > .\_2DHDj0dbS1TkKD3fMqSbHy > .XZK-LTFT5CgGo9MvPQQsy > .\_1T0P_YQg7fOYLCRoKl_xxO > .\_18Bo5Wuo3tMV-RDB8-kh8Z')