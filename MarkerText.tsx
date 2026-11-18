import { useEffect, useId, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import './marker-text.css';

const strokes = {
  Underline: 'M2 45 Q31 41 57 43 T118 42',
  Strike: 'M2 28 Q52 22 118 23',
  Circle: 'M83 5 C41 -2 2 6 1 23 S24 49 66 47 S121 37 119 22 S100 7 83 5 Z',
  Box: 'M6 4 Q57 2 118 4 L119 45 Q63 47 2 44 L3 3 L14 3',
  Wave: 'M2 44 Q9 39 16 44 T30 44 T44 44 T58 44 T72 44 T86 44 T100 44 T118 43',
  Highlight: 'M2 31 Q50 27 118 28',
};

export type MarkerStyle = keyof typeof strokes;
export const markerStyles = Object.keys(strokes) as MarkerStyle[];

type Props = { children: ReactNode; variant?: MarkerStyle; color?: string; delay?: number };

export function MarkerText({ children, variant = 'Underline', color = '#FF46C4', delay = 0 }: Props) {
  const maskId = useId();
  const ref = useRef<HTMLSpanElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        observer.disconnect();
      }
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  return <span ref={ref} className="marker-text" data-visible={visible || undefined}
    data-highlight={variant === 'Highlight' || undefined}
    style={{ '--marker-color': color, '--marker-delay': delay + 'ms' } as CSSProperties}>
    {children}
    <svg key={variant} aria-hidden="true" viewBox="0 0 120 50" preserveAspectRatio="none">
      <defs>
        <mask id={maskId} maskUnits="userSpaceOnUse" x="-60" y="-25" width="240" height="100">
          <path className="marker-reveal" pathLength="1" d={strokes[variant]} />
        </mask>
      </defs>
      <path className="marker-ink" mask={`url(#${maskId})`} d={strokes[variant]} />
    </svg>
  </span>;
}
