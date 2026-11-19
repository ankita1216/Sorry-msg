import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'

/** Opening animation: a sealed love-letter that opens on tap. */
export default function Intro({ onOpen }) {
  return (
    <motion.div className="intro" exit={{ opacity: 0, scale: 1.15 }} transition={{ duration: 0.7 }}>
      <motion.button className="envelope" onClick={onOpen} aria-label="Open the letter"
        initial={{ scale: 0, rotate: -15 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: 'spring', stiffness: 120, damping: 10 }}
        whileHover={{ scale: 1.06, rotate: 2 }} whileTap={{ scale: 0.95 }}>
        <span className="flap" />
        <motion.span className="seal" animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1.2 }}><Heart fill="currentColor" size={30} /></motion.span>
      </motion.button>
      <motion.p className="hand intro-text" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
        a little letter, just for you…
      </motion.p>
      <motion.small initial={{ opacity: 0 }} animate={{ opacity: 0.7 }} transition={{ delay: 1.4 }}>tap to open</motion.small>
    </motion.div>
  )
}
