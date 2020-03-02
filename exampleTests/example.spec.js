const assert = require('assert');
const { Builder, By, Key, until } = require('selenium-webdriver');
const http = require('http');

const BROWSERSTACK_USERNAME = process.env.BROWSERSTACK_USERNAME || 'kimjinwoo4';
const BROWSERSTACK_ACCESS_KEY = process.env.BROWSERSTACK_ACCESS_KEY || 'yopqSJLdAq3t6wbtwoXW';

let HttpAgent = new http.Agent({
	keepAlive: true,
});

let capabilities = [
    {
        browserName: 'Firefox',
        name: 'Firefox Test',
        os: 'Windows',
        build: 'Test Build 01',
        project: 'My Awesome App'
    },
    {
        browserName: 'Chrome',
        name: 'Chrome Test',
        os: 'Windows',
        build: 'Test Build 01',
        project: 'My Awesome App'
    }, 
    {
        "os" : "Windows",
        "osVersion" : "7",
        "name": 'IE10 Test',
        "browserName" : "IE",
        "browserVersion" : "10.0"
    }, 
    {
        "os" : "Windows",
        "osVersion" : "10",
        "name": 'IE11 Test',
        "browserName" : "IE",
        "browserVersion" : "11.0"
    },
    {
        "os" : "OS X",
        "osVersion" : "Catalina",
        "name": 'Safari Test',
        "browserName" : "Safari",
        "browserVersion" : "13.0",
    }, 
    {
        "os" : "Windows",
        "osVersion" : "10",
        "name": 'Edge Test',
        "browserName" : "Edge",
        "browserVersion" : "80.0",
    }
];


function getDriver(index){
    return new Builder()
        .usingHttpAgent(HttpAgent)
        .withCapabilities(capabilities[index])
        .usingServer(`http://${BROWSERSTACK_USERNAME}:${BROWSERSTACK_ACCESS_KEY}@hub.browserstack.com/wd/hub`)
        .build();
}

async function simpleTest(index, url) {
    const driver = getDriver(index);

    await driver.get(url);
    await driver.wait(until.titleContains('Design'));

    const element = await driver.findElement(By.className('tui-image-editor-header-logo'));
    const img = await element.findElement(By.tagName('img'));
    const src = await img.getAttribute('src');
    const canvasSize = await driver.executeScript('return imageEditor.getCanvasSize()');

    driver.quit();

    return {src, canvasSize};
}


describe('group 1', () => {
    it('filefox- contain text', async function() {
        this.timeout(30000);
        const url = 'http://nhn.github.io/tui.image-editor/latest/examples/example01-includeUi.html';
        const jj = Object.keys(capabilities).map(index => {
            return simpleTest(index, url);
        });
        const puhaha = await Promise.all(jj);
        puhaha.forEach(({src, canvasSize}) => {
            assert.equal(src, 'https://uicdn.toast.com/toastui/img/tui-image-editor-bi.png');
            assert.equal(canvasSize.width, 1125);
            assert.equal(canvasSize.height, 803);
        });
    });
});

