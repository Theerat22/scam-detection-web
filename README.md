# Scam Detection

เว็บแอปต้นแบบสำหรับนิสิต สร้างจาก Figma เดิมด้วย Next.js App Router, TypeScript และ Tailwind CSS

## เริ่มใช้งาน

```bash
npm ci
npm run dev
```

เปิด http://127.0.0.1:3000

```bash
npm run typecheck
npm run build
npx playwright install chromium
npm run test:e2e
```

`npm run build && npm start` เปิด production preview บนพอร์ต 3000 (หรือกำหนด `PORT`)

`npm run build` สร้าง static export ใน `out/` นำไปใช้กับ static hosting ได้โดยไม่ต้องมีเซิร์ฟเวอร์ Node.js ใน production

## สิ่งที่ทำงานได้

- หน้าหลัก ตรวจข้อความ/ภาพ ผลวิเคราะห์ เทียบข้อมูล ประวัติ ตั้งค่า แจ้งเตือน และรายงานรายสัปดาห์
- วางและแก้ข้อความจริง เลือกหรือลากภาพจริงเข้ามาพรีวิว (สูงสุด 10 MB)
- Loading แบบ scan พร้อมขั้นตอน และคะแนนแบบนับขึ้น รองรับ reduced motion
- Recharts: hover ดู tooltip, คลิกแท่งหรือเลือกสัปดาห์, กดแยกประเภทสแกม
- Radix Themes: ปุ่มและสวิตช์ตั้งค่า ใช้งานด้วยคีย์บอร์ดได้
- ตั้งค่าถูกเก็บเฉพาะใน localStorage ของเบราว์เซอร์ ประวัติและภาพอยู่เฉพาะการใช้งานครั้งนี้
- Lucide icons และ IBM Plex Sans / IBM Plex Sans Thai ที่ติดตั้งและให้บริการจากโปรเจกต์

## ข้อมูลจำลอง

ไม่มี AI, OCR, ระบบรับ SMS/อีเมล หรือฐานข้อมูลมหาวิทยาลัยจริง ภาพไม่ถูกอัปโหลดออกจากเบราว์เซอร์ ผลวิเคราะห์และเหตุผลมาจากชุดข้อมูลตัวอย่าง สามารถเลือกผลลัพธ์เสี่ยงสูงหรือเสี่ยงต่ำที่หน้า Check ได้ การแจ้งเตือนเป็นหน้าจอจำลอง ไม่ใช่สิทธิ์แจ้งเตือนภัยระดับระบบปฏิบัติการ

## โครงสร้าง

- `app/`: Next.js routes, layout และ design tokens
- `components/scam-app.tsx`: หน้าจอและ flow
- `components/app-provider.tsx`: state, input validation และ mock analysis
- `components/report-chart.tsx`: กราฟรายสัปดาห์
- `components/ui.tsx`: คอมโพเนนต์ใช้ซ้ำและ Radix Dialog/Button
- `lib/mock-data.ts`: ข้อความ คะแนน สัปดาห์ และแหล่งอ้างอิงตัวอย่าง
- `tests/`: browser tests สำหรับ flow สำคัญ

[ต้นแบบ Figma](https://www.figma.com/design/2DI44d3YnJjiyhJCdxj4Aa)

บนเดสก์ท็อปแสดงกรอบแอปกว้าง 390px ตาม Figma บนมือถือขยายเต็มความกว้างและเลื่อนได้เมื่อเนื้อหายาว

## สถานะการตรวจสอบ

Production build และ TypeScript ผ่านแล้ว ตรวจกราฟสลับสัปดาห์ผ่านเบราว์เซอร์ได้ในรอบก่อนหน้า ส่วน browser test suite ยังไม่ผ่านการรันครบ: ระบบ sandbox ปิดกั้นการเปิด Chromium และการตรวจ UI รอบสุดท้ายถูกนโยบาย browser tool ปิดกั้น จึงยังไม่ยืนยันความตรง Figma ทุกพิกเซลหรือ flow ทั้งหมดบนเบราว์เซอร์

ทดสอบ E2E โดยเปิด `npm start` อีก terminal ก่อน แล้วใช้ `npm run test:e2e` สามารถกำหนด `PLAYWRIGHT_EXECUTABLE_PATH` เพื่อใช้ Chromium ที่ติดตั้งอยู่ได้
