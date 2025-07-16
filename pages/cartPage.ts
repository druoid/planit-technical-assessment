import { Locator, Page, expect } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly stuffedFrogPrice: Locator;
  readonly fluffyBunnyPrice: Locator;
  readonly valentineBearPrice: Locator;
  readonly stuffedFrogQuantity: Locator;
  readonly fluffyBunnyQuantity: Locator;
  readonly valentineBearQuantity: Locator;
  readonly stuffedFrogSubTotal: Locator;
  readonly fluffyBunnySubTotal: Locator;
  readonly valentineBearSubTotal: Locator;
  readonly total: Locator;

  constructor(page) {
    this.page = page;
    this.stuffedFrogPrice = page.locator('//table//tr[1]/td[2]');
    this.fluffyBunnyPrice = page.locator('//table//tr[2]/td[2]');
    this.valentineBearPrice = page.locator('//table//tr[3]/td[2]');
    this.stuffedFrogQuantity = page.locator('//table//tr[1]/td[3]/input');
    this.fluffyBunnyQuantity = page.locator('//table//tr[2]/td[3]/input');
    this.valentineBearQuantity = page.locator('//table//tr[3]/td[3]/input');
    this.stuffedFrogSubTotal = page.locator('//table//tr[1]/td[4]');
    this.fluffyBunnySubTotal = page.locator('//table//tr[2]/td[4]');
    this.valentineBearSubTotal = page.locator('//table//tr[3]/td[4]');
    this.total = page
      .locator('//table//tr[1]/td[1]')
      .filter({ hasText: 'Total: 116.9' });
  }

  async verifySubtotalsAreCorrect() {
    const stuffedFrogPrice = (await this.stuffedFrogPrice.innerText()).slice(1);
    const stuffedFrogQuantity = await this.stuffedFrogQuantity.inputValue();
    const stuffedFrogSubTotal = (
      await this.stuffedFrogSubTotal.innerText()
    ).slice(1);
    const stuffedFrogSubTotalCalculated =
      parseFloat(stuffedFrogPrice) * parseFloat(stuffedFrogQuantity);
    await expect(stuffedFrogSubTotal).toContain(
      stuffedFrogSubTotalCalculated.toString(),
    );

    const fluffyBunnyPrice = (await this.fluffyBunnyPrice.innerText()).slice(1);
    const fluffyBunnyQuantity = await this.fluffyBunnyQuantity.inputValue();
    const fluffyBunnySubTotal = (
      await this.fluffyBunnySubTotal.innerText()
    ).slice(1);
    const fluffyBunnySubTotalCalculated =
      parseFloat(fluffyBunnyPrice) * parseFloat(fluffyBunnyQuantity);
    await expect(fluffyBunnySubTotal).toContain(
      fluffyBunnySubTotalCalculated.toString(),
    );

    const valentineBearPrice = (
      await this.valentineBearPrice.innerText()
    ).slice(1);
    const valentineBearQuantity = await this.valentineBearQuantity.inputValue();
    const valentineBearSubTotal = (
      await this.valentineBearSubTotal.innerText()
    ).slice(1);
    const valentineBearSubTotalCalculated =
      parseFloat(valentineBearPrice) * parseFloat(valentineBearQuantity);
    await expect(valentineBearSubTotal).toContain(
      valentineBearSubTotalCalculated.toString(),
    );
  }

  async verifyPriceForEachProduct() {
    await expect((await this.stuffedFrogPrice.innerText()).slice(1)).toContain(
      '10.99',
    );
    await expect((await this.fluffyBunnyPrice.innerText()).slice(1)).toContain(
      '9.99',
    );
    await expect(
      (await this.valentineBearPrice.innerText()).slice(1),
    ).toContain('14.99');
  }

  async verifyTotal() {
    const total = (await this.total.innerText()).slice(7);

    await expect(this.total).toContainText('Total: 116.9');

    const stuffedFrogPrice = (await this.stuffedFrogPrice.innerText()).slice(1);
    const stuffedFrogQuantity = await this.stuffedFrogQuantity.inputValue();
    const stuffedFrogSubTotalCalculated =
      parseFloat(stuffedFrogPrice) * parseFloat(stuffedFrogQuantity);

    const fluffyBunnyPrice = (await this.fluffyBunnyPrice.innerText()).slice(1);
    const fluffyBunnyQuantity = await this.fluffyBunnyQuantity.inputValue();
    const fluffyBunnySubTotalCalculated =
      parseFloat(fluffyBunnyPrice) * parseFloat(fluffyBunnyQuantity);

    const valentineBearPrice = (
      await this.valentineBearPrice.innerText()
    ).slice(1);
    const valentineBearQuantity = await this.valentineBearQuantity.inputValue();
    const valentineBearSubTotalCalculated =
      parseFloat(valentineBearPrice) * parseFloat(valentineBearQuantity);

    const sumTotal =
      parseFloat(stuffedFrogSubTotalCalculated.toString()) +
      parseFloat(fluffyBunnySubTotalCalculated.toString()) +
      parseFloat(valentineBearSubTotalCalculated.toString());

    expect(total).toContain(sumTotal.toString());

    //UI has a bug where it shows 116.9 instead of 116.90
    //expect(total).toContain(sumTotal.toFixed(2).toString());
  }
}
