const puppeteer = require('puppeteer')

async function name() {
    const browser = await puppeteer.launch({headless: false})
    const page = await browser.newPage()

    await page.goto('https://www.amazon.com/')
    await page.waitFor(3000)

    await page.type('#twotabsearchtextbox', 'iphone xr')
    await page.waitFor(2000)

    await page.click('#nav-search-submit-button')
    await page.waitFor(3000)

    const enlaces = await page.evaluate(() => {
        const elements = document.querySelectorAll('a.a-link-normal.a-text-normal') 

        const links = []
        for (let el of elements) {
            links.push(el.href)
        }

        return links
    })

    for (enlace of enlaces) {
        await page.goto(enlace)
        page.waitFor(1000)
    }

    await browser.close()
}

name()