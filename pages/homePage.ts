import { Locator, Page } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly contactLink: Locator;
  readonly startShoppingButton: Locator;

  constructor(page) {
    this.page = page;
    this.contactLink = page.getByRole('link', { name: 'Contact' });
    this.startShoppingButton = page.getByRole('link', {
      name: 'Start Shopping »',
    });
  }

  async navigateToHomePage() {
    await this.page.goto('/');
  }

  async navigateToContactPage() {
    await this.contactLink.click();
  }

  async startShopping() {
    await this.startShoppingButton.click();
  }
}
