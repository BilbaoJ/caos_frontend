import { browser } from 'k6/experimental/browser';
import { check, sleep } from 'k6';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/2.4.0/dist/bundle.js";

export const options = {
    stages: [
      { duration: '2m', target: 100 }, // traffic ramp-up from 1 to a higher 200 users over 10 minutes.
      { duration: '5m', target: 200 }, // stay at higher 200 users for 30 minutes
      { duration: '2m', target: 50 }, // ramp-down to 0 users
    ],
  };

export default async function() {
    
    const context = browser.newContext();
    const page = context.newPage();

    await page.goto('http://localhost:3000/app/dashboard');
    sleep(10);
    page.screenshot({ path: 'screenshots/dashboardTest.png' });

    const home = page.locator("//img[@id='home_page']");

    const groupOne = page.locator("//div[@id='group1']");
    await Promise.all([page.waitForNavigation(), groupOne.click()]);
    sleep(2);
    page.screenshot({ path: 'screenshot/group1.png' });

    check(page, {
        'Verify text': () =>
            page.locator("//h4[@class='MuiTypography-root MuiTypography-h4 css-1u557t5-MuiTypography-root']")
            .textContent() == 'PalmTechApi',
    });

    await Promise.all([page.waitForNavigation(), home.click()]);
    sleep(10);

    const groupTwo = page.locator("//div[@id='group2']");
    await Promise.all([page.waitForNavigation(), groupTwo.click()]);
    sleep(2);
    page.screenshot({ path: 'screenshot/group2.png' });

    check(page, {
        'Verify text': () =>
            page.locator("//h4[@class='MuiTypography-root MuiTypography-h4 css-1u557t5-MuiTypography-root']")
            .textContent() == 'Hospital-API',
    });

    await Promise.all([page.waitForNavigation(), home.click()]);
    sleep(10);

    const groupThree = page.locator("//div[@id='group3']");
    await Promise.all([page.waitForNavigation(), groupThree.click()]);
    sleep(2);
    page.screenshot({ path: 'screenshot/group3.png' });

    check(page, {
        'Verify text': () =>
            page.locator("//h4[@class='MuiTypography-root MuiTypography-h4 css-1u557t5-MuiTypography-root']")
            .textContent() == 'F1-API',
    });

    await Promise.all([page.waitForNavigation(), home.click()]);
    sleep(10);

    const groupFour = page.locator("//div[@id='group4']");
    await Promise.all([page.waitForNavigation(), groupFour.click()]);
    sleep(2);
    page.screenshot({ path: 'screenshot/group4.png' });

    check(page, {
        'Verify text': () =>
            page.locator("//h4[@class='MuiTypography-root MuiTypography-h4 css-1u557t5-MuiTypography-root']")
            .textContent() == 'Grupo 4', //TODO: cambiar nombre
    });

    await Promise.all([page.waitForNavigation(), home.click()]);
    sleep(10);

    const groupFive = page.locator("//div[@id='group5']");
    await Promise.all([page.waitForNavigation(), groupFive.click()]);
    sleep(2);
    page.screenshot({ path: 'screenshot/group5.png' });

    check(page, {
        'Verify text': () =>
            page.locator("//h4[@class='MuiTypography-root MuiTypography-h4 css-1u557t5-MuiTypography-root']")
            .textContent() == 'Grupo 5', //TODO: cambiar nombre
    });

    await Promise.all([page.waitForNavigation(), home.click()]);
    sleep(10);

    const groupSix = page.locator("//div[@id='group6']");
    await Promise.all([page.waitForNavigation(), groupSix.click()]);
    sleep(2);
    page.screenshot({ path: 'screenshot/group6.png' });

    check(page, {
        'Verify text': () =>
            page.locator("//h4[@class='MuiTypography-root MuiTypography-h4 css-1u557t5-MuiTypography-root']")
            .textContent() == 'Grupo 6', //TODO: cambiar nombre
    });
    
    page.close()
    await browser.close();
}

export function handleSummary(data) {
    const reportName = "report/stress_test_report_2.html";
    return {
        [reportName]: htmlReport(data, { debug: true })
    };
}