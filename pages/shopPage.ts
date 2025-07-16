import { Locator, Page } from '@playwright/test';

export class ShopPage {
  readonly page: Page;
  readonly stuffedFrogProduct: Locator;
  readonly fluffyBunnyProduct: Locator;
  readonly valentineBearProduct: Locator;
  readonly cartLink: Locator;

  constructor(page) {
    this.page = page;
    this.stuffedFrogProduct = page
      .locator('#product-2')
      .getByRole('link', { name: 'Buy' });
    this.fluffyBunnyProduct = page
      .locator('#product-4')
      .getByRole('link', { name: 'Buy' });
    this.valentineBearProduct = page
      .locator('#product-7')
      .getByRole('link', { name: 'Buy' });
    this.cartLink = page.getByRole('link', { name: 'Cart (10)' });
  }

  async addProductsToCart() {
    await this.stuffedFrogProduct.click({ clickCount: 2 });
    await this.fluffyBunnyProduct.click({ clickCount: 5 });
    await this.valentineBearProduct.click({ clickCount: 3 });
  }

  async navigateToCart() {
    await this.cartLink.click();
  }
}
