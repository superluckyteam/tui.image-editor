const {Builder} = require('selenium-webdriver');
const http = require('http');

const BROWSERSTACK_USERNAME = process.env.BROWSERSTACK_USERNAME || 'kimjinwoo4';
const BROWSERSTACK_ACCESS_KEY = process.env.BROWSERSTACK_ACCESS_KEY || 'yopqSJLdAq3t6wbtwoXW';

const HttpAgent = new http.Agent({
    keepAlive: true
});

const capabilities = [
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
    }, {
        os: 'Windows',
        osVersion: '7',
        name: 'IE10 Test',
        browserName: 'IE',
        browserVersion: '10.0'
    }, {
        os: 'Windows',
        osVersion: '10',
        name: 'IE11 Test',
        browserName: 'IE',
        browserVersion: '11.0'
    }, {
        os: 'OS X',
        osVersion: 'Catalina',
        name: 'Safari Test',
        browserName: 'Safari',
        browserVersion: '13.0'
    }, {
        os: 'Windows',
        osVersion: '10',
        name: 'Edge Test',
        browserName: 'Edge',
        browserVersion: '80.0'
    }
];

function getDriver(index) {
    return new Builder()
        .usingHttpAgent(HttpAgent)
        .withCapabilities(capabilities[index])
        .usingServer(`http://${BROWSERSTACK_USERNAME}:${BROWSERSTACK_ACCESS_KEY}@hub.browserstack.com/wd/hub`)
        .build();
}
exports.capabilities = capabilities;
exports.getDriver = getDriver;
