import { Locator, Page, expect } from '@playwright/test';
import { user } from '../fixtures/user';

export class ContactPage {
  readonly page: Page;
  readonly submitButton: Locator;
  readonly forenameInputMissingError: Locator;
  readonly emailInputMissingError: Locator;
  readonly messageInputMissingError: Locator;
  readonly headerMessageError: Locator;
  readonly forenameInput: Locator;
  readonly emailInput: Locator;
  readonly messageInput: Locator;
  readonly progressBar: Locator;
  readonly headerMessageAppreciation: Locator;

  constructor(page) {
    this.page = page;
    this.submitButton = page.getByRole('link', { name: 'Submit' });
    this.forenameInputMissingError = page.locator('#forename-err');
    this.emailInputMissingError = page.locator('#email-err');
    this.messageInputMissingError = page.locator('#message-err');
    this.headerMessageError = page.locator('#header-message');
    this.forenameInput = page.getByRole('textbox', { name: 'Forename *' });
    this.emailInput = page.getByRole('textbox', { name: 'Email *' });
    this.messageInput = page.getByRole('textbox', { name: 'Message *' });
    this.progressBar = page.locator('.progress');
    this.headerMessageAppreciation = page.locator('body');
  }

  async submitContactPageFormButton() {
    await this.submitButton.click();
  }

  async verifyHeaderMessageError() {
    await expect(this.headerMessageError).toContainText(
      "We welcome your feedback - but we won't get it unless you complete the form correctly.",
    );
  }

  async verifyForenameInputMissingError() {
    await expect(this.forenameInputMissingError).toContainText(
      'Forename is required',
    );
  }

  async verifyEmailInpuMissingError() {
    await expect(this.emailInputMissingError).toContainText(
      'Email is required',
    );
  }

  async verifyMessageInputMissingError() {
    await expect(this.messageInputMissingError).toContainText(
      'Message is required',
    );
  }

  async populateMandatoryFields() {
    await this.forenameInput.fill(user.name);
    await this.emailInput.fill(user.email);
    await this.messageInput.fill('test message');
  }

  async waitForProgressBarOnFormSubmission() {
    await this.progressBar.waitFor({ state: 'hidden' });
  }

  async verifyAppreciationMessage() {
    await expect(this.headerMessageAppreciation).toContainText(
      `Thanks ${user.name}, we appreciate your feedback.`,
    );
  }
}
