'use client';
import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from 'react';
import { examples, sampleText, safeText, type Analysis, type DemoOutcome, type Pattern } from '@/lib/mock-data';
interface Upload { url: string; name: string; size: number; }
interface Preferences { sms: boolean; email: boolean; notifications: boolean; }
interface AppState {
  draft: string; setDraft: (value: string) => void;
  inputMode: 'text' | 'image'; setInputMode: (value: 'text' | 'image') => void;
  outcome: DemoOutcome; setOutcome: (value: DemoOutcome) => void;
  upload: Upload | null; acceptFile: (file: File) => Promise<void>; removeUpload: () => void;
  uploadError: string; setUploadError: (value: string) => void;
  result: Analysis; openResult: (value: Analysis) => void;
  history: Analysis[]; finishAnalysis: () => void; clearHistory: () => void;
  preferences: Preferences; setPreference: (key: keyof Preferences, value: boolean) => void;
  riskAlert: boolean; simulateAlert: () => void;
  pattern: Pattern; setPattern: (value: Pattern) => void;
  week: number; setWeek: (value: number) => void;
  toast: string; showToast: (value: string) => void;
}
const Context = createContext<AppState | null>(null);
const preferenceKey = 'scam-detection.preferences.v1';
export function AppProvider({ children }: { children: ReactNode }) {
  const [draft, setDraft] = useState(sampleText);
  const [inputMode, setInputMode] = useState<'text' | 'image'>('text');
  const [outcome, setOutcome] = useState<DemoOutcome>('high');
  const [upload, setUpload] = useState<Upload | null>(null);
  const [uploadError, setUploadError] = useState('');
  const [result, setResult] = useState<Analysis>(examples.sms);
  const [history, setHistory] = useState<Analysis[]>([examples.sms, examples.email, examples.image, examples.safe]);
  const [preferences, setPreferences] = useState<Preferences>({ sms: true, email: true, notifications: true });
  const [riskAlert, setRiskAlert] = useState(false);
  const [pattern, setPattern] = useState<Pattern>('scholarship');
  const [week, setWeek] = useState(3);
  const [toast, setToast] = useState('');
  const uploadRef = useRef<string | null>(null);
  const retainedImageUrls = useRef(new Set<string>());
  const uploadRequest = useRef(0);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    try { const raw = localStorage.getItem(preferenceKey); if (raw) { const value: unknown = JSON.parse(raw); if (typeof value === 'object' && value !== null && ['sms', 'email', 'notifications'].every(key => typeof (value as Record<string, unknown>)[key] === 'boolean')) setPreferences(value as Preferences); } } catch { /* Storage may be unavailable in private browsing. */ }
    return () => { for (const url of retainedImageUrls.current) URL.revokeObjectURL(url); if (toastTimer.current) clearTimeout(toastTimer.current); };
  }, []);
  function showToast(value: string) { if (toastTimer.current) clearTimeout(toastTimer.current); setToast(value); toastTimer.current = setTimeout(() => setToast(''), 3200); }
  async function acceptFile(file: File) {
    const request = ++uploadRequest.current;
    setUploadError('');
    if (!['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/avif'].includes(file.type)) { setUploadError('เลือกภาพ JPG, PNG, WebP, GIF หรือ AVIF'); return; }
    if (file.size > 10 * 1024 * 1024) { setUploadError('ภาพใหญ่เกิน 10 MB ลองลดขนาดก่อน'); return; }
    const url = URL.createObjectURL(file);
    try { const image = new Image(); image.src = url; await image.decode(); if (!image.width || !image.height) throw new Error('empty image'); } catch { URL.revokeObjectURL(url); setUploadError('เปิดภาพนี้ไม่ได้ ลองเลือกภาพอื่น'); return; }
    if (request !== uploadRequest.current) { URL.revokeObjectURL(url); return; }
    retainedImageUrls.current.add(url);
    if (uploadRef.current && !history.some(item => item.imageUrl === uploadRef.current)) { URL.revokeObjectURL(uploadRef.current); retainedImageUrls.current.delete(uploadRef.current); }
    uploadRef.current = url; setUpload({ url, name: file.name, size: file.size });
  }
  function removeUpload() { uploadRequest.current++; if (uploadRef.current && !history.some(item => item.imageUrl === uploadRef.current)) { URL.revokeObjectURL(uploadRef.current); retainedImageUrls.current.delete(uploadRef.current); } uploadRef.current = null; setUpload(null); setUploadError(''); }
  function finishAnalysis() {
    const base = outcome === 'low' ? examples.safe : inputMode === 'image' ? examples.image : examples.sms;
    const analysis: Analysis = { ...base, id: crypto.randomUUID(), channel: inputMode === 'image' ? 'ภาพแชต' : 'ข้อความ', title: inputMode === 'image' ? 'ภาพบทสนทนาของคุณ' : 'ข้อความที่คุณตรวจ', sender: inputMode === 'image' ? 'ภาพที่คุณเลือก' : 'ข้อความที่คุณวาง', text: inputMode === 'image' ? (outcome === 'low' ? safeText : examples.image.text) : draft, imageUrl: inputMode === 'image' ? upload?.url : undefined, imageName: inputMode === 'image' ? upload?.name : undefined, time: new Intl.DateTimeFormat('th-TH', { timeZone: 'Asia/Bangkok', hour: '2-digit', minute: '2-digit' }).format(new Date()) };
    setResult(analysis); setHistory(old => [analysis, ...old].slice(0, 50));
  }
  function setPreference(key: keyof Preferences, value: boolean) { setPreferences(old => { const next = { ...old, [key]: value }; try { localStorage.setItem(preferenceKey, JSON.stringify(next)); } catch { /* Preferences still work for the current visit. */ } return next; }); }
  function simulateAlert() { setRiskAlert(true); setResult(examples.sms); }
  return <Context.Provider value={{ draft, setDraft, inputMode, setInputMode, outcome, setOutcome, upload, acceptFile, removeUpload, uploadError, setUploadError, result, openResult: setResult, history, finishAnalysis, clearHistory: () => { setHistory([]); showToast('ล้างประวัติแล้ว'); }, preferences, setPreference, riskAlert, simulateAlert, pattern, setPattern, week, setWeek, toast, showToast }}>{children}</Context.Provider>;
}
export function useApp() { const app = useContext(Context); if (!app) throw new Error('AppProvider is required'); return app; }
