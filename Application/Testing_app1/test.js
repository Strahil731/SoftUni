import { chromium } from 'playwright-chromium';
import { expect } from 'chai';

/** 
* @type {import ('playwright-chromium').BrowserServer}
*/
let browser;

/**
 * @type {import('playwright-chromium').Page}
 */
let page;

describe('E2E tests', async function () {
    this.timeout(60000);

    before(async () => { browser = await chromium.launch(); });
    after(async () => { await browser.close(); });
    beforeEach(async () => { page = await browser.newPage(); });
    afterEach(async () => { await page.close(); });

    it('Loads Title', async () => {
        await page.goto("http://127.0.0.1:5500/Application/Testing_app1/index.html");
        await page.waitForLoadState('networkidle');

        const title = await page.$$eval("div.head span", (items) => items.map(i => i.textContent));

        expect(title).to.include("Scalable Vector Graphics");
    });

    it('Show More', async () => {
        await page.goto("http://127.0.0.1:5500/Application/Testing_app1/index.html");
        await page.click("text=more");
        await page.waitForLoadState('networkidle');

        const visible = await page.isVisible("text=Scalable Vector Graphics (SVG) is an Extensible Markup Language (XML)");
        expect(visible).to.be.true;
    });

    it('Less Text', async () => {
        await page.goto("http://127.0.0.1:5500/Application/Testing_app1/index.html");
        await page.locator("text=less");
        await page.waitForLoadState("networkidle");

        const unvisible = await page.isHidden("text=Scalable Vector Graphics (SVG) is an Extensible Markup Language (XML)");
        expect(unvisible).to.be.true;
    });
});