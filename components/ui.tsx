'use client';
import { Button as RadixButton, type ButtonProps } from '@radix-ui/themes';
import * as Dialog from '@radix-ui/react-dialog';
import { ArrowUpRight, ChevronLeft, ChevronRight, X, ShieldCheck, Wifi } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import type { ReactNode } from 'react';
export function Button({ variant = 'solid', className = '', ...props }: ButtonProps) { return <RadixButton {...props} variant={variant} size="3" className={`app-button ${variant === 'soft' ? 'secondary' : ''} ${className}`} />; }
export function AppHeader({ title, home = false }: { title: string; home?: boolean }) {
  const router = useRouter();
  return <header className={home ? 'brand-header' : 'app-header'}>{home ? <div className="flex min-w-0 items-center gap-2.5"><ShieldCheck className="text-accent" size={27} strokeWidth={1.7} /><span className="font-latin text-xl font-semibold">Scam Detection</span></div> : <><button className="icon-button back-button" aria-label="กลับ" onClick={() => window.history.length > 1 ? router.back() : router.push('/')}><ChevronLeft size={24} strokeWidth={1.7} /></button><h1>{title}</h1></>}{home && <Link href="/settings/" className="icon-button settings-button" aria-label="การตั้งค่า"><SettingsGlyph /></Link>}</header>;
}
function SettingsGlyph() { return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"><path d="M4 7h16M4 17h16"/><circle cx="8" cy="7" r="3" fill="var(--pink-soft)"/><circle cx="16" cy="17" r="3" fill="var(--pink-soft)"/></svg>; }
export function SystemStatus() { return <div className="system-status" aria-hidden="true"><span className="font-latin font-semibold">9:41</span><div className="flex items-center gap-7"><Wifi size={16} strokeWidth={1.6} /><span className="battery" /></div></div>; }
export function SourceCard({ title, href, onClick }: { title: string; href?: string; onClick?: () => void }) {
  const body = <><span className="text-xs text-muted">ข้อมูลมหาวิทยาลัยที่ใกล้เคียง</span><strong className="text-base font-semibold">{title}</strong><span className="source-link">chula.ac.th · อ่านแหล่งอ้างอิง <ArrowUpRight size={14} /></span></>;
  return href ? <a className="source-card" href={href} target="_blank" rel="noopener noreferrer">{body}</a> : <button className="source-card" onClick={onClick}>{body}</button>;
}
export function Chevron({ size = 18 }: { size?: number }) { return <ChevronRight size={size} strokeWidth={1.7} aria-hidden="true" />; }
export function Modal({ open, onOpenChange, title, description, children }: { open: boolean; onOpenChange: (open: boolean) => void; title: string; description: string; children: ReactNode }) {
  return <Dialog.Root open={open} onOpenChange={onOpenChange}><Dialog.Portal><Dialog.Overlay className="dialog-overlay" /><Dialog.Content className="dialog-content"><Dialog.Close className="icon-button dialog-close" aria-label="ปิด"><X size={22}/></Dialog.Close><Dialog.Title className="text-2xl font-semibold">{title}</Dialog.Title><Dialog.Description className="mt-3 text-sm leading-relaxed text-muted">{description}</Dialog.Description><div className="mt-6 flex flex-col gap-3">{children}</div></Dialog.Content></Dialog.Portal></Dialog.Root>;
}
