import { chromium, devices, browser} from 'k6/experimental/browser';
import { sleep } from 'k6';

export const options = {
    scenarios: {
        browser: {
        executor: 'shared-iterations',
        options: {
            browser: {
                type: 'chromium',
            },
        },
        },
    },
}

export default async function () {

    //const browser = chromium.launch({ headless: false });
    try {
        const iphoneX = devices['iPhone X'];
        const context1 = browser.newContext(iphoneX);
        const page_iphone = context1.newPage();
        await page_iphone.goto('http://localhost:3000/app/dashboard');
        page_iphone.screenshot({ path: 'screenshot/iphone.png' });
        sleep(10);
        page_iphone.close();
        browser.close();

        const ipad = devices['iPad Mini'];
        const context2 = browser.newContext(ipad);
        const page_ipad = context2.newPage();
        await page_ipad.goto('http://localhost:3000/app/dashboard');
        page_ipad.screenshot({ path: 'screenshot/ipad.png' });
        sleep(10);
        page_ipad.close();
        browser.close();

        const samsung = devices['Samsung Galaxy A51/71'];
        const context3 = browser.newContext(samsung);
        const page_samsung = context3.newPage();
        await page_samsung.goto('http://localhost:3000/app/dashboard');
        page_samsung.screenshot({ path: 'screenshot/samsung.png' });
        sleep(10);
        page_samsung.close();
        browser.close();

    } catch (error) {
        console.log(error);
    }
}