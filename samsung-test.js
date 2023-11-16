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

    const samsung = devices['Galaxy S5'];
    const context = browser.newContext(samsung);
    const page_samsung = context.newPage();

    try {
        await page_samsung.goto('http://localhost:3000/app/dashboard');
        sleep(10);
        page_samsung.screenshot({ path: 'screenshots/samsung.png' });
    } catch (error) {
        console.log(error);
    }finally{
        page_samsung.close();
        browser.close();
    }
}