import { test } from '@playwright/test';
import { HomePage } from '../pages/homePage';
import { ShopPage } from '../pages/shopPage';
import { CartPage } from '../pages/cartPage';

test('Cart page - Verify total from subtotals ', async ({ page }) => {
  const homePage = new HomePage(page);
  const shopPage = new ShopPage(page);
  const cartPage = new CartPage(page);

  await homePage.navigateToHomePage();
  await homePage.startShopping();

  await shopPage.addProductsToCart();
  await shopPage.navigateToCart();

  await cartPage.verifySubtotalsAreCorrect();
  await cartPage.verifyPriceForEachProduct();
  await cartPage.verifyTotal();
});
