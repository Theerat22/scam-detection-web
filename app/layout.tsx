import type { Metadata, Viewport } from 'next';
import { Theme } from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';
import '@fontsource/ibm-plex-sans/400.css';
import '@fontsource/ibm-plex-sans/500.css';
import '@fontsource/ibm-plex-sans/600.css';
import '@fontsource/ibm-plex-sans-thai/400.css';
import '@fontsource/ibm-plex-sans-thai/500.css';
import '@fontsource/ibm-plex-sans-thai/600.css';
import './globals.css';
import { AppProvider } from '@/components/app-provider';
export const metadata: Metadata = { title: 'Scam Detection — เช็กก่อนเชื่อ', description: 'แอปต้นแบบช่วยนิสิตตรวจข้อความและภาพแชต พร้อมรายงานแนวโน้มสแกมรายสัปดาห์ ข้อมูลทั้งหมดเป็นตัวอย่าง', applicationName: 'Scam Detection', robots: { index: false, follow: false }, icons: { icon: '/icon.svg' } };
export const viewport: Viewport = { width: 'device-width', initialScale: 1, themeColor: '#F3E9EE' };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="th"><body><Theme accentColor="crimson" grayColor="mauve" radius="large" appearance="light"><AppProvider><a href="#main-content" className="skip-link">ข้ามไปเนื้อหา</a><div className="app-stage">{children}</div></AppProvider></Theme></body></html>;
}
