import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { LoadingShell, ScamApp } from '@/components/scam-app';
import { isView, views } from '@/lib/mock-data';
export const dynamicParams = false;
export function generateStaticParams() { return views.filter(view => view !== 'home').map(view => ({ view })); }
export default async function AppPage({ params }: { params: Promise<{ view: string }> }) { const { view } = await params; if (!isView(view)) notFound(); return <Suspense fallback={<LoadingShell/>}><ScamApp view={view}/></Suspense>; }
