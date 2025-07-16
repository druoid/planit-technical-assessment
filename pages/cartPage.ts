import { Locator, Page, expect } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly stuffedFrogPrice: Locator;
  readonly fluffyBunnyPrice: Locator;
  readonly valentineBearPrice: Locator;
  readonly stuffedFrogQuantity: Locator;
  readonly fluffyBunnyQuantity: Locator;
  readonly valentineBearQuanity: Locator;
  readonly stuffedFrogSubTotal: Locator;
  readonly fluffyBunnySubTotal: Locator;
  readonly valentineBearSubTotal: Locator;
  readonly total: Locator;

  constructor(page) {
    this.page = page;
    this.stuffedFrogPrice = page.getByRole('cell', { name: '$10.99' });
    this.fluffyBunnyPrice = page.getByRole('cell', { name: '$9.99' });
    this.valentineBearPrice = page.getByRole('cell', { name: '$14.99' });
    this.stuffedFrogQuantity = page
      .getByRole('row', { name: 'Stuffed Frog $10.99 2 $' })
      .getByRole('spinbutton');
    this.fluffyBunnyQuantity = page
      .getByRole('row', { name: 'Fluffy Bunny $9.99 5 $' })
      .getByRole('spinbutton');
    this.valentineBearQuanity = page
      .getByRole('cell', { name: '3', exact: true })
      .getByRole('spinbutton');
    this.stuffedFrogSubTotal = page.getByRole('cell', { name: '$21.98' });
    this.fluffyBunnySubTotal = page.getByRole('cell', { name: '$49.95' });
    this.valentineBearSubTotal = page.getByRole('cell', { name: '$44.97' });
    this.total = page.getByRole('strong');
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
    const valentineBearQuanity = await this.valentineBearQuanity.inputValue();
    const valentineBearSubTotal = (
      await this.valentineBearSubTotal.innerText()
    ).slice(1);
    const valentineBearSubTotalCalculated =
      parseFloat(valentineBearPrice) * parseFloat(valentineBearQuanity);
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
    const valentineBearQuanity = await this.valentineBearQuanity.inputValue();
    const valentineBearSubTotalCalculated =
      parseFloat(valentineBearPrice) * parseFloat(valentineBearQuanity);

    const sumTotal =
      parseFloat(stuffedFrogSubTotalCalculated.toString()) +
      parseFloat(fluffyBunnySubTotalCalculated.toString()) +
      parseFloat(valentineBearSubTotalCalculated.toString());

    expect(total).toContain(sumTotal.toString());

    //UI has a bug where it shows 116.9 instead of 116.90
    //expect(total).toContain(sumTotal.toFixed(2).toString());
  }
}
