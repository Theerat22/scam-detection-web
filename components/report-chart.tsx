'use client';
import { useEffect, useState } from 'react';
import { Bar, BarChart, Cell, LabelList, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { useReducedMotion } from 'motion/react';
import { weeks, type Week } from '@/lib/mock-data';
export function ReportChart({ selected, onSelect }: { selected: number; onSelect: (value: number) => void }) {
  const [ready, setReady] = useState(false);
  const reducedMotion = useReducedMotion();
  useEffect(() => setReady(true), []);
  return <div className="report-chart" aria-label="กราฟรายงานต้องสงสัย 4 สัปดาห์">
    <div className="chart-canvas" data-testid="report-chart">
      {ready ? <ResponsiveContainer width="100%" height={130} minWidth={0}>
        <BarChart accessibilityLayer data={weeks} margin={{ top: 24, right: 5, bottom: 0, left: 5 }} barSize={40}>
          <XAxis dataKey="label" hide /><YAxis hide domain={[0, 60]} />
          <Tooltip cursor={{ fill: 'var(--pink-soft)', radius: 8 }} content={({ active, payload }) => active && payload?.length ? <div className="chart-tooltip"><span>{(payload[0].payload as Week).label}</span><strong>{payload[0].value} รายงาน</strong></div> : null} />
          <Bar dataKey="count" radius={[4, 4, 2, 2]} isAnimationActive={!reducedMotion} animationDuration={600} onClick={data => { const item = data as unknown as { payload?: Week }; if (item.payload) onSelect(item.payload.index); }}>
            {weeks.map(week => <Cell key={week.index} fill={week.index === selected ? '#D9577D' : '#E9E1E5'} cursor="pointer" />)}
            <LabelList dataKey="count" position="top" fill="#71646C" fontSize={14} fontWeight={600} offset={8} />
          </Bar>
        </BarChart>
      </ResponsiveContainer> : <div className="chart-placeholder" aria-hidden="true" />}
    </div>
    <div className="chart-week-buttons" role="group" aria-label="เลือกสัปดาห์จากกราฟ">{weeks.map(week => <button key={week.index} aria-label={week.range} aria-pressed={selected === week.index} onClick={() => onSelect(week.index)} className={selected === week.index ? 'selected' : ''}>{week.short.split('\n').map((line, i) => <span key={i}>{line}</span>)}</button>)}</div>
    <span className="sr-only">{weeks.map(week => `${week.label} ${week.count} รายงาน`).join(' · ')}</span>
  </div>;
}
