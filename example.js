/*TRACCIE MONDADORI*/
//Aggiungere il primo libro di pimpa che appare dopo una ricerca ai preferiti
await page.goto('https://www.mondadoristore.it/')

await page.setViewport({ width: 1536, height: 731 })

await page.waitForSelector('#big-header > #fixed-bar > #main-search #search-input')
await page.click('#big-header > #fixed-bar > #main-search #search-input')

await page.type('#big-header > #fixed-bar > #main-search #search-input', 'kobe')

await page.waitForSelector('#fixed-bar > #main-search > .searchBar > #adv-search-button > .image')
await page.click('#fixed-bar > #main-search > .searchBar > #adv-search-button > .image')

await navigationPromise

await page.waitForSelector('.info-data-product:nth-child(3) > .product-info > .product-info-wrapper > .title > .link')
await page.click('.info-data-product:nth-child(3) > .product-info > .product-info-wrapper > .title > .link')

await navigationPromise

await page.waitForSelector('.price > .right > .info-data-product > .columRightDetail > .add-to-favorites-new')
await page.click('.price > .right > .info-data-product > .columRightDetail > .add-to-favorites-new')


//mondadori aggiungere un articolo al carrello
await page.goto('https://www.mondadoristore.it/')

await page.setViewport({ width: 1536, height: 731 })

await page.waitForSelector('#big-header > #fixed-bar > #main-search #search-input')
await page.click('#big-header > #fixed-bar > #main-search #search-input')

await page.type('#big-header > #fixed-bar > #main-search #search-input', 'kobe')

await page.waitForSelector('#fixed-bar > #main-search > .searchBar > #adv-search-button > .image')
await page.click('#fixed-bar > #main-search > .searchBar > #adv-search-button > .image')

await navigationPromise

await page.waitForSelector('.info-data-product:nth-child(6) > .product-info > .product-info-wrapper > .title > .link')
await page.click('.info-data-product:nth-child(6) > .product-info > .product-info-wrapper > .title > .link')

await navigationPromise

await page.waitForSelector('.price > .right > .info-data-product > #add-to-basket > .add')
await page.click('.price > .right > .info-data-product > #add-to-basket > .add')

await navigationPromise

//Modifica profilo mondadori
await page.goto('https://www.mondadoristore.it/')

await page.setViewport({ width: 1536, height: 731 })

await page.waitForSelector('#fixed-bar > #utilities > #user-box > div > .user-image-crop')
await page.click('#fixed-bar > #utilities > #user-box > div > .user-image-crop')

await page.waitForSelector('#fixed-bar > #utilities > #user-box > div > .user-image-crop')
await page.click('#fixed-bar > #utilities > #user-box > div > .user-image-crop')

await page.waitForSelector('#user-box > #user-dropdown > .list > .list-item:nth-child(6) > .link')
await page.click('#user-box > #user-dropdown > .list > .list-item:nth-child(6) > .link')

await navigationPromise

await page.waitForSelector('.span8 > #main-i-miei-dati > #formUpdateProfile > #dati-form > .single-row:nth-child(5)')
await page.click('.span8 > #main-i-miei-dati > #formUpdateProfile > #dati-form > .single-row:nth-child(5)')

await page.type('#main-i-miei-dati > #formUpdateProfile > #dati-form #NOME', 'Gino')

await page.waitForSelector('body > #content-row > .row > .wrapper')
await page.click('body > #content-row > .row > .wrapper')

await page.type('#main-i-miei-dati > #formUpdateProfile > #dati-form #NOME', '')

await page.waitForSelector('#main-i-miei-dati > #formUpdateProfile > #dati-form #NOME')
await page.click('#main-i-miei-dati > #formUpdateProfile > #dati-form #NOME')

await page.type('#main-i-miei-dati > #formUpdateProfile > #dati-form #NOME', 'Mario')

await page.waitForSelector('#main-i-miei-dati > #formUpdateProfile > #dati-form > #invia-dati > .btn:nth-child(1)')
await page.click('#main-i-miei-dati > #formUpdateProfile > #dati-form > #invia-dati > .btn:nth-child(1)')

await navigationPromise

/**************************************************************************************** */


//Creare un post e pubblicarlo su reddit
await page.goto('https://www.reddit.com/')

await page.setViewport({ width: 1536, height: 731 })

await page.waitForSelector('.\_3ozFtOe6WpJEMUtxDOIvtU > .\_1vyLCp-v-tE5QvZovwrASa > .\_1OVBBWLtHoSPfGCRaPzpTf > .\_2jJNpBqXMbbyOiGCElTYxZ > .zgT5MfUrDMC54cpiCpZFu')
await page.click('.\_3ozFtOe6WpJEMUtxDOIvtU > .\_1vyLCp-v-tE5QvZovwrASa > .\_1OVBBWLtHoSPfGCRaPzpTf > .\_2jJNpBqXMbbyOiGCElTYxZ > .zgT5MfUrDMC54cpiCpZFu')

await page.waitForSelector('.XZK-LTFT5CgGo9MvPQQsy > .\_2sfaZWDVT8JLAt2J9p4IzV > .\_3cWzf-usAKfGV1Ay7h2zM_ > .anPJr_ybRailY8NbAunl2 > .\_1MHSX9NVr4C2QxH2dMcg4M')
await page.click('.XZK-LTFT5CgGo9MvPQQsy > .\_2sfaZWDVT8JLAt2J9p4IzV > .\_3cWzf-usAKfGV1Ay7h2zM_ > .anPJr_ybRailY8NbAunl2 > .\_1MHSX9NVr4C2QxH2dMcg4M')

await page.type('.XZK-LTFT5CgGo9MvPQQsy > .\_2sfaZWDVT8JLAt2J9p4IzV > .\_3cWzf-usAKfGV1Ay7h2zM_ > .anPJr_ybRailY8NbAunl2 > .\_1MHSX9NVr4C2QxH2dMcg4M', 'u/Bob3121')

await page.waitForSelector('.\_3w_665DK_NH7yIsRMuZkqB > .\_1zq6UabIEJJ-z9grsiCJY7 > .\_3zkbHfhLbXp21FwGj_kNZV > .\_2wyvfFW3oNcCs5GVkmcJ8z > .PqYQ3WC15KaceZuKcFI02')
await page.click('.\_3w_665DK_NH7yIsRMuZkqB > .\_1zq6UabIEJJ-z9grsiCJY7 > .\_3zkbHfhLbXp21FwGj_kNZV > .\_2wyvfFW3oNcCs5GVkmcJ8z > .PqYQ3WC15KaceZuKcFI02')

await page.type('.\_3w_665DK_NH7yIsRMuZkqB > .\_1zq6UabIEJJ-z9grsiCJY7 > .\_3zkbHfhLbXp21FwGj_kNZV > .\_2wyvfFW3oNcCs5GVkmcJ8z > .PqYQ3WC15KaceZuKcFI02', 'Avada cadabra')

await page.waitForSelector('.XZK-LTFT5CgGo9MvPQQsy > .\_2DHDj0dbS1TkKD3fMqSbHy > .XZK-LTFT5CgGo9MvPQQsy > .\_1T0P_YQg7fOYLCRoKl_xxO > .\_18Bo5Wuo3tMV-RDB8-kh8Z')
await page.click('.XZK-LTFT5CgGo9MvPQQsy > .\_2DHDj0dbS1TkKD3fMqSbHy > .XZK-LTFT5CgGo9MvPQQsy > .\_1T0P_YQg7fOYLCRoKl_xxO > .\_18Bo5Wuo3tMV-RDB8-kh8Z')

/*Reddit, cambiare il nome utente */
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





/**************************************************************************************** */
/*Aliexpress, aggiungere un articolo alla wishlist e poi guardare gli articoli che sono presenti nella whishlist*/
await page.goto('https://it.aliexpress.com/')

await page.setViewport({ width: 1536, height: 731 })

await page.waitForSelector('.header-wrap #search-key')
await page.click('.header-wrap #search-key')

await page.type('.header-wrap #search-key', 'pallone')

await page.waitForSelector('.header-wrap > .hm-middle > #form-searchbar > .searchbar-operate-box > .search-button')
await page.click('.header-wrap > .hm-middle > #form-searchbar > .searchbar-operate-box > .search-button')

await navigationPromise

await page.waitForSelector('div:nth-child(1) > .list-item:nth-child(1) > .gallery > .product-img > .place-container > .atwl-btn-wrap > .add-wishlist-btn > .next-icon')
await page.click('div:nth-child(1) > .list-item:nth-child(1) > .gallery > .product-img > .place-container > .atwl-btn-wrap > .add-wishlist-btn > .next-icon')

await page.waitForSelector('#nav-global > .ng-item-wrap > .nav-wishlist > a > .text')
await page.click('#nav-global > .ng-item-wrap > .nav-wishlist > a > .text')

await navigationPromise

/*Rimuovere un articolo dalla wishlist*/
await page.goto('https://it.aliexpress.com/')

await page.setViewport({ width: 1536, height: 731 })

await page.waitForSelector('body #home-firstscreen')
await page.click('body #home-firstscreen')

await page.waitForSelector('#nav-global > .ng-item-wrap > .nav-wishlist > a > .text')
await page.click('#nav-global > .ng-item-wrap > .nav-wishlist > a > .text')

await navigationPromise

await page.waitForSelector('.list > .product > .action > p > .remove')
await page.click('.list > .product > .action > p > .remove')

await navigationPromise