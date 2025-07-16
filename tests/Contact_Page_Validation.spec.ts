import { test } from '@playwright/test';
import { HomePage } from '../pages/homePage';
import { ContactPage } from '../pages/contactPage';

test.describe('Test contact page', () => {
  test('Contact page - Verify error messages on incomplete form submission', async ({ page }) => {
    const homePage = new HomePage(page);
    const contactPage = new ContactPage(page);

    await homePage.navigateToHomePage();
    await homePage.navigateToContactPage();

    await contactPage.submitContactPageFormButton();
    await contactPage.verifyHeaderMessageError();
    await contactPage.verifyForenameInputMissingError();
    await contactPage.verifyEmailInpuMissingError();
    await contactPage.verifyMessageInputMissingError();

    await contactPage.populateMandatoryFields();
    await contactPage.submitContactPageFormButton();
    await contactPage.waitForProgressBarOnFormSubmission();
    await contactPage.verifyAppreciationMessage();
  });

  test('Contact page - Verify complete form submission', async ({ page }) => {
    const homePage = new HomePage(page);
    const contactPage = new ContactPage(page);

    await homePage.navigateToHomePage();
    await homePage.navigateToContactPage();

    await contactPage.populateMandatoryFields();
    await contactPage.submitContactPageFormButton();
    await contactPage.waitForProgressBarOnFormSubmission();
    await contactPage.verifyAppreciationMessage();
  });
});
