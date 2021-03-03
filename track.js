const sleep = require('sleep');

module.exports = {
	//Function for execute the user's action
	userAction: async function(page, navigationPromise, identity) {
		try {
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
	
	
	
		} catch (error) {
			console.log(error)
			//This block is executed only if the user is the attacker and is been throw an error on executing the script
			if (identity === 1) {
				await page.screenshot({ path: 'attacker-screenshot.png' })
				sleep.sleep(2)
				pageAttacker = await page.content()
				console.log(this.resaultAnalysis())
				process.exit(1)
			}
		}
	}
}