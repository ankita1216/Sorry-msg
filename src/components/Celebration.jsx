import { useMemo } from 'react'
import { motion } from 'framer-motion'

const PIECES = ['💖', '🌸', '🌷', '🎉', '✨', '💕', '🌼', '🎊', '🧸']
const COLORS = ['#ff7eb3', '#b9a4ff', '#8fd3ff', '#ffe08a', '#ffb8d9']

/** Confetti + falling hearts/flowers burst. */
export default function Celebration() {
  const pieces = useMemo(() => Array.from({ length: 70 }, (_, i) => ({
    id: i, emoji: i % 3 === 0, icon: PIECES[i % PIECES.length], color: COLORS[i % COLORS.length],
    x: Math.random() * 100, size: 10 + Math.random() * 22, delay: Math.random() * 1.2,
    dur: 3 + Math.random() * 3, spin: (Math.random() - 0.5) * 900, drift: (Math.random() - 0.5) * 160,
  })), [])
  return (
    <div className="celebration" aria-hidden="true">
      {pieces.map((p) => (
        <motion.span key={p.id} className="piece"
          style={{ left: `${p.x}%`, fontSize: p.size, background: p.emoji ? 'none' : p.color, width: p.emoji ? 'auto' : p.size * 0.6, height: p.emoji ? 'auto' : p.size * 0.9, borderRadius: p.emoji ? 0 : 3 }}
          initial={{ y: '-10vh', opacity: 1, rotate: 0 }}
          animate={{ y: '110vh', x: p.drift, rotate: p.spin }}
          transition={{ duration: p.dur, delay: p.delay, ease: 'easeIn' }}>
          {p.emoji ? p.icon : ''}
        </motion.span>
      ))}
    </div>
  )
}
