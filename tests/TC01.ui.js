/// ignore file ////
const { test, expect } = require('@playwright/test');


test(' test will navigate to Japan eSIM page and validate details', async ({ page }) => {

    // Launch a browser and navigate to Airalo's website
    await page.goto('https://www.airalo.com/')

    //Validate Home page launched successfully with  title and url for home page
    let pageTitle = await page.title()
    await expect(page).toHaveTitle('Buy eSIMs for international travel - Airalo')
    await expect(page).toHaveURL('https://www.airalo.com/')

    //Handle all the pop ups and notifications present on the screen
    await page.locator('button#onetrust-accept-btn-handler').click() // cookies notification
    await page.locator('button#wzrk-cancel').click()                 // Notification 
    await page.locator("[data-testid ='close-button']").click()      // e sim add notification

    // On search field  type "Japan"
    await page.fill('input[placeholder="Search data packs for 200+ countries and regions"]', 'Japan');

    // Select from Local section
    const drpDown = '//div[@id="__layout"]//ul/li[2]/span';
    await page.waitForSelector(drpDown, { state: 'visible', timeout: 20000 });
    await page.locator(drpDown).click()
    test.slow()

    // Validate the navigation to Next page with the new URL and title.
    await page.waitForSelector('#store-title', { state: 'visible', timeout: 60000 });
    test.slow()
    await page.waitForURL('https://www.airalo.com/japan-esim')
    await expect(page).toHaveTitle("Japan eSIM, from $4.50 USD | World’s first eSIM store · Airalo")

    // wait for complete page to load
    await page.waitForSelector('#store-title',{ state: 'visible', timeout: 70000 })

    // select the first package and click on buy now
    const simList = await page.$$('.sim-item-link button')
    if (simList.length > 0) {
        // Click on the first button in the list
        await simList[0].click();
        await page.waitForTimeout(1000);
        // Wait for a short period after clicking        
    } else {
        console.log(' No package found to be clicked');
    }
    

    // Validate the package deatils after the load
    //Validate the title 
    const titleText = await page.locator('.sim-detail-operator p').textContent()
    await expect(titleText.trim()).toBe('Moshi Moshi');
    console.log(titleText)
    
    //Validate Coverage  field    
    const coverageVal = await page.locator("ul[data-testid='sim-detail-info-list'] p[data-testid='COVERAGE-value']")
    await expect(coverageVal).toContainText('Japan')

    //validate Data field
    const dataVal = await page.locator("ul[data-testid='sim-detail-info-list'] p[data-testid='DATA-value']")
    await expect(dataVal).toHaveText("1 GB")

    //validate Validity field
    const validityVal = await page.locator("ul[data-testid='sim-detail-info-list'] p[data-testid='VALIDITY-value']")
    await expect(validityVal).toHaveText("7 Days")

    //validate the Price field
    const priceVal = await page.locator("ul[data-testid='sim-detail-info-list'] p[data-testid='PRICE-value']")
    await expect(priceVal).toHaveText("$4.50 USD")
    console.log("test completed successfully")
        
    });






