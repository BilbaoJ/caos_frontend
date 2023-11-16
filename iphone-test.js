import { devices, browser} from 'k6/experimental/browser';
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

    const iphoneX = devices['iPhone X'];
    const context = browser.newContext(iphoneX);
    const page_iphone = context.newPage();

    try {
        await page_iphone.goto('http://localhost:3000/app/dashboard');
        await page_iphone.waitForNavigation();
        sleep(10);
        page_iphone.screenshot({ path: 'screenshots/iphone.png' });

    } catch (error) {
        console.log(error);
    }finally{
        page_iphone.close();
    }
}