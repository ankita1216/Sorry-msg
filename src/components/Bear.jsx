import { motion } from 'framer-motion'

const MOUTHS = {
  sorry: 'M134 190 Q150 178 166 190',
  pout: 'M138 192 Q150 183 162 192',
  happy: 'M128 178 Q150 208 172 178 Z',
}

/** SVG teddy bear. mood: 'sorry' | 'pout' | 'happy' */
export default function Bear({ mood = 'sorry', onPoke }) {
  const happy = mood === 'happy'
  return (
    <motion.svg
      viewBox="0 0 300 300"
      className="bear"
      role="img"
      aria-label="A teddy bear saying sorry"
      onClick={onPoke}
      animate={happy ? { y: [0, -18, 0], rotate: [0, -4, 4, 0] } : { y: [0, -6, 0] }}
      transition={{ duration: happy ? 0.8 : 3.2, repeat: Infinity, ease: 'easeInOut' }}
      whileTap={{ scale: 0.94, rotate: -3 }}
    >
      {/* body */}
      <ellipse cx="150" cy="248" rx="82" ry="58" fill="#e8b98f" />
      <ellipse cx="150" cy="255" rx="50" ry="38" fill="#ffe8d2" />
      {/* ears */}
      {[80, 220].map((x) => (
        <g key={x}><circle cx={x} cy="68" r="38" fill="#e8b98f" /><circle cx={x} cy="70" r="20" fill="#ffb6cf" /></g>
      ))}
      {/* head */}
      <circle cx="150" cy="140" r="95" fill="#f0c6a0" />
      <ellipse cx="150" cy="172" rx="40" ry="29" fill="#fff1e2" />
      {/* cheeks */}
      <ellipse cx="88" cy="168" rx="17" ry="11" fill="#ff9fc0" opacity=".65" />
      <ellipse cx="212" cy="168" rx="17" ry="11" fill="#ff9fc0" opacity=".65" />
      {mood === 'pout' && <><circle cx="82" cy="168" r="22" fill="#ff9fc0" opacity=".25" /><circle cx="218" cy="168" r="22" fill="#ff9fc0" opacity=".25" /></>}
      {/* eyes */}
      {happy ? (
        <g fill="none" stroke="#4a3040" strokeWidth="7" strokeLinecap="round">
          <path d="M98 134 Q112 116 126 134" /><path d="M174 134 Q188 116 202 134" />
        </g>
      ) : (
        [112, 188].map((x) => (
          <g key={x} className="blink">
            <ellipse cx={x} cy="132" rx="15" ry={mood === 'sorry' ? 18 : 13} fill="#3d2a3a" />
            <circle cx={x - 5} cy="125" r="6" fill="#fff" />
            <circle cx={x + 5} cy="138" r="3" fill="#fff" />
          </g>
        ))
      )}
      {/* worried brows */}
      {!happy && (
        <g stroke="#7a5560" strokeWidth="5" strokeLinecap="round" fill="none">
          {mood === 'sorry'
            ? <><path d="M96 108 L126 98" /><path d="M204 108 L174 98" /></>
            : <><path d="M96 98 L126 108" /><path d="M204 98 L174 108" /></>}
        </g>
      )}
      {/* nose + mouth */}
      <ellipse cx="150" cy="158" rx="12" ry="8" fill="#6b4a4a" />
      <path d={MOUTHS[mood]} fill={happy ? '#ff7a9c' : 'none'} stroke="#6b4a4a" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      {/* tears */}
      {mood === 'sorry' && [112, 188].map((x, i) => (
        <motion.path key={x} d={`M${x} 150 q-6 12 0 16 q6 -4 0 -16z`} fill="#9fd8ff"
          animate={{ y: [0, 30], opacity: [0, 1, 0] }} transition={{ duration: 2, repeat: Infinity, delay: i * 0.9 }} />
      ))}
      {/* paws holding a heart */}
      <motion.g animate={{ scale: [1, 1.1, 1] }} style={{ originX: '150px', originY: '240px' }} transition={{ duration: 1.4, repeat: Infinity }}>
        <path d="M150 268 C100 235 118 205 150 226 C182 205 200 235 150 268Z" fill="#ff6b9b" />
        <ellipse cx="112" cy="236" rx="16" ry="13" fill="#f0c6a0" /><ellipse cx="188" cy="236" rx="16" ry="13" fill="#f0c6a0" />
      </motion.g>
    </motion.svg>
  )
}
