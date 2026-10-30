import { expect, test } from '@playwright/test';
import path from 'node:path';
const artifacts = path.resolve(__dirname, '../../../work/web-screenshots');
const tinyPng = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAADElEQVR4nGO4GV4LAAO6Aa76S4zPAAAAAElFTkSuQmCC', 'base64');
test('home reproduces Figma and all primary destinations are usable', async ({ page }) => {
  const errors: string[] = []; page.on('pageerror', error => errors.push(error.message));
  await page.goto('/'); await page.evaluate(() => document.fonts.ready);
  await expect(page.getByRole('heading', { name: 'สวัสดี, เจมส์' })).toBeVisible();
  await expect(page.getByText('ยังไม่มี SMS ที่เสี่ยง')).toBeVisible();
  await expect(page.locator('.phone')).toHaveCSS('width', '390px');
  await page.screenshot({ path: path.join(artifacts, 'mobile-home.png'), fullPage: true });
  await page.getByRole('navigation', { name: 'เมนูหลัก' }).getByRole('link', { name: 'ตรวจสอบ' }).click();
  await expect(page.getByRole('heading', { name: 'เช็กก่อนเชื่อ' })).toBeVisible();
  await page.getByRole('navigation').getByRole('link', { name: 'ประวัติ' }).click();
  await expect(page.getByText('ที่เคยตรวจไว้')).toBeVisible(); expect(errors).toEqual([]);
});
test('text check shows loading, animates score, and links correct university comparison', async ({ page }) => {
  await page.goto('/check/'); const message = 'คุณได้รับทุน 15,000 บาท\nโอนค่าดำเนินการ 500 บาท';
  await page.getByLabel('ข้อความที่ต้องการตรวจ').fill(message);
  await page.getByRole('button', { name: 'วิเคราะห์ข้อความ' }).click();
  await expect(page.getByRole('heading', { name: 'กำลังเทียบข้อมูล' })).toBeVisible();
  await page.screenshot({ path: path.join(artifacts, 'mobile-loading.png'), fullPage: true });
  await expect(page).toHaveURL(/\/result\//);
  await expect(page.locator('.animated-score')).toHaveText('96%', { timeout: 5000 });
  await expect(page.locator('.original-message')).toContainText(message);
  await page.screenshot({ path: path.join(artifacts, 'mobile-result.png'), fullPage: true });
  await page.getByRole('button', { name: 'เทียบข้อมูลมหาวิทยาลัย' }).click();
  await expect(page.getByRole('heading', { name: 'คล้ายกัน แต่ต่างกัน' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'ศึกษาแหล่งอ้างอิงเพิ่มเติม' })).toHaveAttribute('href', /scholarships/);
});
test('image input accepts a real image, rejects corrupt files, and keeps analysis mocked', async ({ page }) => {
  const posts: string[] = []; page.on('request', request => { if (request.method() === 'POST') posts.push(request.url()); });
  await page.goto('/check/'); await page.getByRole('tab', { name: 'ภาพแชต' }).click();
  const fileInput = page.locator('input[type="file"]');
  await fileInput.setInputFiles({ name: 'broken.png', mimeType: 'image/png', buffer: Buffer.from('not an image') });
  await expect(page.locator('#main-content').getByRole('alert')).toContainText('เปิดภาพนี้ไม่ได้');
  await fileInput.setInputFiles({ name: 'conversation.png', mimeType: 'image/png', buffer: tinyPng });
  await expect(page.getByAltText('ภาพบทสนทนาที่เลือก')).toHaveAttribute('src', /^blob:/);
  await expect(page.getByText('conversation.png')).toBeVisible();
  await page.screenshot({ path: path.join(artifacts, 'mobile-image.png'), fullPage: true });
  await page.getByRole('button', { name: 'วิเคราะห์ภาพ', exact: true }).click();
  await expect(page).toHaveURL(/\/result\//);
  await expect(page.locator('#main-content')).not.toContainText('ตัวอย่าง');
  await expect(page.getByAltText('ภาพที่ส่งวิเคราะห์')).toHaveAttribute('src', /^blob:/); expect(posts).toEqual([]);
});
test('low-risk outcome and analysis cancellation work', async ({ page }) => {
  await page.goto('/check/'); await page.getByText('เลือกผลลัพธ์', { exact: false }).click();
  await page.getByRole('button', { name: 'เสี่ยงต่ำ · 4%' }).click();
  await page.getByRole('button', { name: 'วิเคราะห์ข้อความ' }).click();
  await page.getByRole('button', { name: 'ยกเลิก', exact: true }).click();
  await expect(page).toHaveURL(/\/check\//);
  await page.getByRole('button', { name: 'วิเคราะห์ข้อความ' }).click();
  await expect(page).toHaveURL(/\/result\//); await expect(page.locator('.animated-score')).toHaveText('4%', { timeout: 5000 });
  await expect(page.getByText('ไม่พบสัญญาณเสี่ยงเด่นชัด')).toBeVisible();
});
test('weekly chart supports arrows, bar selection, tooltip, and category drill-down', async ({ page }) => {
  await page.goto('/reports/'); await expect(page.getByRole('heading', { name: '48 รายงานต้องสงสัย' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'สัปดาห์ถัดไป' })).toBeDisabled();
  await page.getByRole('button', { name: 'สัปดาห์ก่อน' }).click();
  await expect(page.getByRole('heading', { name: '36 รายงานต้องสงสัย' })).toBeVisible();
  await page.locator('.recharts-bar-rectangle').first().click();
  await expect(page.getByRole('heading', { name: '20 รายงานต้องสงสัย' })).toBeVisible();
  await page.getByRole('button', { name: '19 – 25 ต.ค. 2569' }).click();
  await page.locator('.recharts-bar-rectangle').last().hover(); await expect(page.locator('.chart-tooltip')).toContainText('48 รายงาน');
  await page.mouse.move(1, 1); await page.screenshot({ path: path.join(artifacts, 'mobile-reports.png'), fullPage: true });
  await page.getByRole('button', { name: 'หลอกชำระค่าเทอม 15' }).click();
  await expect(page.getByRole('heading', { name: 'หลอกชำระค่าเทอม' })).toBeVisible();
  await expect(page.locator('.source-card')).toHaveAttribute('href', /tuition-and-fees/);
});
test('Radix setting switches persist and alert opens mock analysis', async ({ page }) => {
  await page.goto('/settings/'); const sms = page.getByRole('switch', { name: 'SMS', exact: true });
  await expect(sms).toBeChecked();
  const switchGeometry = await sms.evaluate(element => {
    const root = element.getBoundingClientRect();
    const thumb = element.querySelector('.rt-SwitchThumb')!.getBoundingClientRect();
    return { targetHeight: root.height, contained: thumb.left >= root.left && thumb.right <= root.right && thumb.top >= root.top && thumb.bottom <= root.bottom };
  });
  expect(switchGeometry.targetHeight).toBeGreaterThanOrEqual(44);
  expect(switchGeometry.contained).toBe(true);
  await sms.click(); await expect(sms).not.toBeChecked();
  await expect(page.getByRole('button', { name: 'ทดลองการแจ้งเตือน' })).toBeDisabled();
  await page.reload(); await expect(sms).not.toBeChecked(); await sms.click();
  await page.screenshot({ path: path.join(artifacts, 'mobile-settings.png'), fullPage: true });
  await page.getByRole('button', { name: 'ทดลองการแจ้งเตือน' }).click();
  await expect(page.getByText('ระวัง! ข้อความหลอกโอนเงิน')).toBeVisible();
  await page.locator('.device-notification').click(); await expect(page).toHaveURL(/\/result\//);
});
test('history filters and accessible clear confirmation show the empty state', async ({ page }) => {
  await page.goto('/history/'); await expect(page.locator('.history-list .message-row')).toHaveCount(4);
  await page.getByRole('button', { name: 'เสี่ยงสูง', exact: true }).click(); await expect(page.locator('.history-list .message-row')).toHaveCount(3);
  await page.getByRole('button', { name: 'ล้างประวัติ', exact: true }).click();
  const dialog = page.getByRole('dialog'); await expect(dialog).toBeVisible();
  await dialog.getByRole('button', { name: 'ล้างประวัติ', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'ยังไม่มีรายการเสี่ยงสูง' })).toBeVisible();
  await page.getByRole('navigation').getByRole('link', { name: 'หน้าหลัก' }).click();
  await expect(page.getByText('ยังไม่มีรายการตรวจ', { exact: true })).toBeVisible();
  await expect(page.locator('.message-row')).toHaveCount(0);
});
test('desktop preserves the Figma composition and mobile has no horizontal overflow', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 }); await page.goto('/'); await page.evaluate(() => document.fonts.ready);
  await expect(page.locator('.phone')).toHaveCSS('width', '390px');
  await page.screenshot({ path: path.join(artifacts, 'desktop-home.png'), fullPage: true });
  await page.goto('/reports/'); await page.screenshot({ path: path.join(artifacts, 'desktop-reports.png'), fullPage: true });
  await page.setViewportSize({ width: 320, height: 720 });
  for (const route of ['/check/', '/reports/', '/result/', '/settings/']) { await page.goto(route); const widths = await page.evaluate(() => [document.documentElement.scrollWidth, window.innerWidth]); expect(widths[0]).toBeLessThanOrEqual(widths[1]); }
});
