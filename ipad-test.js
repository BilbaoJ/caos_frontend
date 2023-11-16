import {devices, browser} from 'k6/experimental/browser';
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

    const ipad = devices['iPad Mini'];
    const context = browser.newContext(ipad);
    const page_ipad = context.newPage();

    try {
        await page_ipad.goto('http://localhost:3000/app/dashboard');
        sleep(10);
        page_ipad.screenshot({ path: 'screenshots/ipad.png' });

    } catch (error) {
        console.log(error);
    }finally{
        page_ipad.close();
        browser.close();
    }
}