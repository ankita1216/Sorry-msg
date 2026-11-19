import { useMemo } from 'react'

const ITEMS = ['💗', '✨', '🌸', '💕', '⭐', '🌷', '🤍', '☁️']

/** Decorative floating hearts, sparkles and flowers (pure CSS animation). */
export default function FloatingBackground() {
  const bits = useMemo(() => Array.from({ length: 26 }, (_, i) => ({
    id: i, icon: ITEMS[i % ITEMS.length], left: Math.random() * 100,
    size: 14 + Math.random() * 26, dur: 9 + Math.random() * 12, delay: -Math.random() * 20,
  })), [])
  return (
    <div className="floaters" aria-hidden="true">
      {bits.map((b) => (
        <span key={b.id} style={{ left: `${b.left}%`, fontSize: b.size, animationDuration: `${b.dur}s`, animationDelay: `${b.delay}s` }}>{b.icon}</span>
      ))}
    </div>
  )
}
