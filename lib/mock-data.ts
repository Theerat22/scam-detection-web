export type Channel = 'SMS' | 'อีเมล' | 'ภาพแชต' | 'ข้อความ';
export type Pattern = 'scholarship' | 'tuition' | 'impersonation';
export type DemoOutcome = 'high' | 'low';
export interface Analysis {
  id: string; title: string; channel: Channel; sender: string; text: string;
  score: number; pattern: Pattern; time: string; reasons: string[];
  sourceUrl: string; sourceTitle: string; sourceDomain: string;
  imageUrl?: string; imageName?: string;
}
export const scholarshipUrl = 'https://www.chula.ac.th/academics/admissions/scholarships/';
export const tuitionUrl = 'https://www.chula.ac.th/academics/admissions/tuition-and-fees/';
export const sampleText = 'คุณได้รับทุน 15,000 บาท\nชำระค่าดำเนินการ 500 บาท ภายใน 30 นาที เพื่อยืนยันสิทธิ์\ncu-scholar.example/confirm';
export const sampleImageText = '“รับทุนได้ทันที โอนค่าดำเนินการ\n500 บาทก่อน 10 โมงนะคะ”';
export const safeText = 'ประกาศรับสมัครทุนการศึกษา\nอ่านรายละเอียดและเงื่อนไขได้ที่เว็บไซต์มหาวิทยาลัย';
export const examples: Record<'sms' | 'email' | 'image' | 'safe', Analysis> = {
  sms: { id: 'sample-sms', title: 'แจ้งชำระค่าธรรมเนียมทุน', channel: 'SMS', sender: 'CU-SCHOLAR', text: sampleText, score: 96, pattern: 'scholarship', time: '09:41', reasons: ['ขอค่าดำเนินการก่อนรับทุน', 'ลิงก์ไม่ใช่โดเมนมหาวิทยาลัย'], sourceUrl: scholarshipUrl, sourceTitle: 'ทุนการศึกษา จุฬาฯ', sourceDomain: 'chula.ac.th' },
  email: { id: 'sample-email', title: 'แจ้งยอดค้างชำระค่าเทอม', channel: 'อีเมล', sender: 'student-support@chula-aid.example', text: 'แจ้งยอดค้างชำระค่าเทอม\nกรุณาโอน 12,000 บาทภายในวันนี้ เพื่อรักษาสถานภาพนิสิต\nchula-aid.example/pay', score: 92, pattern: 'tuition', time: '09:32', reasons: ['ผู้ส่งไม่ใช่โดเมนมหาวิทยาลัย', 'เร่งให้โอนเงินไปบัญชีภายนอก'], sourceUrl: tuitionUrl, sourceTitle: 'ค่าธรรมเนียมการศึกษา', sourceDomain: 'chula.ac.th' },
  image: { id: 'sample-image', title: 'บทสนทนาเรื่องทุน', channel: 'ภาพแชต', sender: 'ข้อความจากภาพบทสนทนา', text: sampleImageText, score: 96, pattern: 'scholarship', time: '09:25', reasons: ['ขอค่าดำเนินการก่อนรับทุน', 'เร่งให้โอนเงินภายในเวลาสั้น'], sourceUrl: scholarshipUrl, sourceTitle: 'ทุนการศึกษา จุฬาฯ', sourceDomain: 'chula.ac.th' },
  safe: { id: 'sample-safe', title: 'ประกาศรับสมัครทุน', channel: 'อีเมล', sender: 'student@chula.ac.th', text: safeText, score: 4, pattern: 'scholarship', time: '09:20', reasons: [], sourceUrl: scholarshipUrl, sourceTitle: 'ทุนการศึกษา จุฬาฯ', sourceDomain: 'chula.ac.th' },
};
export interface Week { index: number; label: string; short: string; range: string; count: number; growth: number | null; categories: [number, number, number]; }
export const weeks: Week[] = [
  { index: 0, label: '28 ก.ย. – 4 ต.ค.', short: '28 ก.ย.\n– 4 ต.ค.', range: '28 ก.ย. – 4 ต.ค. 2569', count: 20, growth: null, categories: [8, 7, 5] },
  { index: 1, label: '5 – 11 ต.ค.', short: '5–11\nต.ค.', range: '5 – 11 ต.ค. 2569', count: 28, growth: 40, categories: [11, 10, 7] },
  { index: 2, label: '12 – 18 ต.ค.', short: '12–18\nต.ค.', range: '12 – 18 ต.ค. 2569', count: 36, growth: 29, categories: [16, 12, 8] },
  { index: 3, label: '19 – 25 ต.ค.', short: '19–25\nต.ค.', range: '19 – 25 ต.ค. 2569', count: 48, growth: 33, categories: [24, 15, 9] },
];
export const patterns: Record<Pattern, { title: string; sample: string; signals: [string, string]; action: string; source: string; url: string }> = {
  scholarship: { title: 'หลอกทุนการศึกษา', sample: '“ได้รับทุน 15,000 บาท\nโอนค่าดำเนินการ 500 บาทก่อน”', signals: ['ขอเงินก่อนรับทุน', 'เร่งให้ยืนยันสิทธิ์ผ่านลิงก์ภายนอก'], action: 'ตรวจเงื่อนไขทุนจากมหาวิทยาลัย\nก่อนโอนเงินหรือส่งข้อมูลส่วนตัว', source: 'ทุนการศึกษา จุฬาฯ', url: scholarshipUrl },
  tuition: { title: 'หลอกชำระค่าเทอม', sample: '“มีค่าเทอมค้าง 12,000 บาท\nโอนภายในวันนี้เพื่อรักษาสถานภาพ”', signals: ['เร่งให้จ่ายเงินเพื่อไม่ให้เสียสถานภาพ', 'ให้โอนเข้าบัญชีนอกระบบมหาวิทยาลัย'], action: 'ตรวจสอบยอดและช่องทางชำระ\nกับมหาวิทยาลัยโดยตรง', source: 'ค่าธรรมเนียมการศึกษา', url: tuitionUrl },
  impersonation: { title: 'แอบอ้างเจ้าหน้าที่', sample: '“ติดต่อจากมหาวิทยาลัย\nส่งรหัส OTP เพื่อยืนยันบัญชีนิสิต”', signals: ['ขอรหัส OTP หรือรหัสผ่าน', 'อ้างชื่อหน่วยงานโดยไม่ให้ตรวจสอบ'], action: 'หยุดส่งข้อมูล และติดต่อหน่วยงาน\nผ่านช่องทางทางการด้วยตัวเอง', source: 'เว็บไซต์จุฬาฯ', url: 'https://www.chula.ac.th/' },
};
export const patternKeys: Pattern[] = ['scholarship', 'tuition', 'impersonation'];
export const views = ['home', 'check', 'analyzing', 'result', 'references', 'reports', 'pattern', 'history', 'settings', 'alert', 'feedback', 'error'] as const;
export type View = typeof views[number];
export const isView = (value: string): value is View => (views as readonly string[]).includes(value);
