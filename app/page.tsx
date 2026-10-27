import { Suspense } from 'react';
import { LoadingShell, ScamApp } from '@/components/scam-app';
export default function HomePage() { return <Suspense fallback={<LoadingShell/>}><ScamApp view="home"/></Suspense>; }
