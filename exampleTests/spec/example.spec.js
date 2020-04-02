const { By, Key, until } = require('selenium-webdriver');
const assert = require('assert');
const terminalImage = require('terminal-image');
const {getDriver, capabilities} = require('../webdriver.js');


async function simpleTest(index, url) {
    const driver = getDriver(index);
    const {browserName, browserVersion} = capabilities[index];

    await driver.get(url);
    await driver.wait(function() {
      return driver.executeScript('return document.readyState').then(function(readyState) {
        return readyState === 'complete';
      });
    });

    const jj = await driver.takeScreenshot();
    // const decodedImage = Buffer.from(jj, 'base64');
    // const imageprint = await terminalImage.buffer(decodedImage);
    // console.log(imageprint);
    console.log(`<div>${browserName}${browserVersion}</div>`);
    console.log(`<div><img src="data:image/gif;base64,${jj}" width="300" /></div>`);

    const element = await driver.findElement(By.className('tui-image-editor-header-logo'));
    const img = await element.findElement(By.tagName('img'));
    const src = await img.getAttribute('src');
    const canvasSize = await driver.executeScript('return imageEditor.getCanvasSize()');

    driver.quit();

    return {src, canvasSize};
}


describe('group 1', () => {
    it('filefox- contain text', async function() {
        this.timeout(50000);
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

