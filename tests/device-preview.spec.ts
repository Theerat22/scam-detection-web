import { test, expect } from '@playwright/test';

test.use({ viewport: { width: 1440, height: 1000 }, isMobile: false, hasTouch: false });

test('desktop device selection persists and keeps app navigation usable', async ({ page }) => {
  await page.goto('/');
  const picker = page.getByLabel('กรอบมือถือ');
  await expect(picker).toHaveValue('iphone-pro');
  await expect(page.locator('.phone')).toHaveCSS('width', '402px');
  await page.evaluate(() => document.fonts.ready);
  await expect(page.locator('body')).toHaveCSS('font-family', /"IBM Plex Sans", "IBM Plex Sans Thai"/);
  await expect(page.locator('.screen-title')).toHaveCSS('font-family', /"IBM Plex Sans", "IBM Plex Sans Thai"/);
  const cdp = await page.context().newCDPSession(page);
  await cdp.send('DOM.enable');
  await cdp.send('CSS.enable');
  const { root } = await cdp.send('DOM.getDocument');
  const { nodeId } = await cdp.send('DOM.querySelector', { nodeId: root.nodeId, selector: '.screen-title' });
  const { fonts } = await cdp.send('CSS.getPlatformFontsForNode', { nodeId });
  expect(fonts.some(font => font.familyName.startsWith('IBM Plex Sans Thai') && font.isCustomFont)).toBe(true);
  expect(fonts.every(font => font.isCustomFont)).toBe(true);
  await cdp.detach();
  await page.screenshot({ path: '/tmp/scam-detection-preview/device-iphone.png' });
  await picker.selectOption('galaxy');
  await expect(page.locator('.dfs__screen')).toHaveCSS('width', '384px');
  await page.getByRole('button', { name: 'วางข้อความ' }).click();
  await expect(page.getByRole('heading', { name: 'ตรวจสอบข้อมูล' })).toBeVisible();
  await expect(picker).toHaveValue('galaxy');
  await page.reload();
  await expect(picker).toHaveValue('galaxy');
  await page.screenshot({ path: '/tmp/scam-detection-preview/device-samsung.png' });
  await picker.selectOption('galaxy-ultra');
  await expect(page.locator('.dfs__screen')).toHaveCSS('width', '412px');
  await picker.selectOption('iphone');
  await expect(page.locator('.dfs__screen')).toHaveCSS('width', '393px');
  await page.setViewportSize({ width: 320, height: 720 });
  await expect(picker).toHaveCount(0);
  await expect(page.locator('.phone')).toHaveCSS('width', '320px');
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(320);
});
