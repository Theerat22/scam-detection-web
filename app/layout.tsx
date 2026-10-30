import type { Metadata, Viewport } from 'next';
import { Theme } from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';
import '@fontsource/ibm-plex-sans/400.css';
import '@fontsource/ibm-plex-sans/500.css';
import '@fontsource/ibm-plex-sans/600.css';
import '@fontsource/ibm-plex-sans-thai/400.css';
import '@fontsource/ibm-plex-sans-thai/500.css';
import '@fontsource/ibm-plex-sans-thai/600.css';
import 'da-frame-set/styles.css';
import './globals.css';
import { AppProvider } from '@/components/app-provider';
import { DevicePreview } from '@/components/device-preview';
export const metadata: Metadata = { title: 'Scam Detection — เช็กก่อนเชื่อ', description: 'ช่วยนิสิตตรวจข้อความและภาพแชต พร้อมรายงานแนวโน้มสแกมรายสัปดาห์', applicationName: 'Scam Detection', robots: { index: false, follow: false }, icons: { icon: '/icon.svg' } };
export const viewport: Viewport = { width: 'device-width', initialScale: 1, themeColor: '#F3E9EE' };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="th"><body><Theme className="scam-theme" accentColor="crimson" grayColor="mauve" radius="large" appearance="light"><AppProvider><a href="#main-content" className="skip-link">ข้ามไปเนื้อหา</a><DevicePreview>{children}</DevicePreview></AppProvider></Theme></body></html>;
}
