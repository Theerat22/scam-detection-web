'use client';

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { DeviceFrame, frameSize, getDevice, useFitScale } from 'da-frame-set';

const devices = [
  { id: 'iphone-pro', label: 'iPhone Pro' },
  { id: 'iphone', label: 'iPhone' },
  { id: 'galaxy', label: 'Samsung Galaxy' },
  { id: 'galaxy-ultra', label: 'Samsung Galaxy Ultra' },
] as const;
type PhoneId = typeof devices[number]['id'];
const storageKey = 'scam-detection-preview-device';

export function DevicePreview({ children }: { children: ReactNode }) {
  const [desktop, setDesktop] = useState(false);
  const [device, setDevice] = useState<PhoneId>('iphone-pro');
  const pathname = usePathname();
  const preview = useRef<HTMLDivElement>(null);
  const size = frameSize(getDevice(device));
  const { ref, scale, measured } = useFitScale({ contentWidth: size.width, contentHeight: size.height, padding: { x: 32, y: 24 } });

  useEffect(() => {
    const query = window.matchMedia('(min-width: 1024px) and (hover: hover) and (pointer: fine)');
    const update = () => setDesktop(query.matches);
    update();
    query.addEventListener('change', update);
    try {
      const saved = localStorage.getItem(storageKey);
      if (devices.some(item => item.id === saved)) setDevice(saved as PhoneId);
    } catch { /* Preview still works when browser storage is unavailable. */ }
    return () => query.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    preview.current?.querySelector('.dfs__screen')?.scrollTo(0, 0);
  }, [pathname]);

  if (!desktop) return <div className="app-stage">{children}</div>;

  return <div className="desktop-preview" ref={preview} style={{ '--preview-height': `${getDevice(device).height}px` } as CSSProperties}>
    <div className="device-toolbar">
      <label htmlFor="preview-device">กรอบมือถือ</label>
      <select id="preview-device" value={device} onChange={event => {
        const next = event.target.value as PhoneId;
        setDevice(next);
        try { localStorage.setItem(storageKey, next); } catch { /* Keep the selection for this visit. */ }
      }}>
        {devices.map(item => <option key={item.id} value={item.id}>{item.label}</option>)}
      </select>
    </div>
    <div className="device-preview-canvas" ref={ref}>
      <DeviceFrame device={device} scale={scale} hidden={!measured}>
        {children}
      </DeviceFrame>
    </div>
  </div>;
}
