import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Heart, Frown } from 'lucide-react'
import Bear from './components/Bear.jsx'
import Intro from './components/Intro.jsx'
import Celebration from './components/Celebration.jsx'
import FloatingBackground from './components/FloatingBackground.jsx'
import MusicToggle from './components/MusicToggle.jsx'
import { useMusicBox } from './hooks/useMusicBox.js'

const MESSAGES = [
  "I'm really sorry! 🥺",
  'Please don\'t be angry with me.',
  "I promise I'll make it up to you! ❤️",
  'Can I get one little smile?',
  'Sending you a thousand hugs!',
  'Please forgive me? 🥹',
  'You are too special to lose.',
]

const ANGRY_REPLIES = [
  'Okay okay… I deserve that 😢',
  'Noted. *sniffles* I will bring snacks 🍪',
  "Even angry, you're the cutest person ever 🥺",
  "I'm hugging my own heart until you're ready 🫂",
  'Plot twist: I am not giving up 🧸💪',
  'Fine… tiny forgive button is getting bigger 👀',
]

const ANGRY_LABELS = ['Still Angry 😠', 'Still Angry 😤', 'Still a bit angry 😾', 'Mmm… maybe 🙄', 'Ugh, fine 🥹']

export default function App() {
  const [opened, setOpened] = useState(false)
  const [i, setI] = useState(0)
  const [forgiven, setForgiven] = useState(false)
  const [angry, setAngry] = useState(0)
  const [reply, setReply] = useState('')
  const [hugs, setHugs] = useState([])
  const music = useMusicBox()
  const hugId = useRef(0)

  // rotate messages
  useEffect(() => {
    if (!opened || forgiven) return
    const t = setInterval(() => setI((n) => (n + 1) % MESSAGES.length), 3600)
    return () => clearInterval(t)
  }, [opened, forgiven])

  const open = () => { setOpened(true); music.toggle() }

  const poke = useCallback(() => {
    const id = hugId.current++
    setHugs((h) => [...h, { id, x: 35 + Math.random() * 30 }])
    setTimeout(() => setHugs((h) => h.filter((x) => x.id !== id)), 1600)
  }, [])

  const stillAngry = () => {
    setReply(ANGRY_REPLIES[angry % ANGRY_REPLIES.length])
    setAngry((n) => n + 1)
  }

  const mood = forgiven ? 'happy' : angry > 0 ? 'pout' : 'sorry'
  const forgiveScale = 1 + Math.min(angry, 6) * 0.1
  const angryScale = Math.max(1 - angry * 0.1, 0.55)
  const angryLabel = ANGRY_LABELS[Math.min(angry, ANGRY_LABELS.length - 1)]

  return (
    <>
      <FloatingBackground />
      <AnimatePresence>{!opened && <Intro key="intro" onOpen={open} />}</AnimatePresence>

      {opened && (
        <>
          <MusicToggle playing={music.playing} onToggle={music.toggle} />
          <main className="stage">
            <motion.h1 className="hand title" initial={{ y: -30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ type: 'spring', delay: 0.2 }}>
              {forgiven ? 'Yay!! Thank you 💖' : "I'm Sorry"}
            </motion.h1>

            <motion.div className="bear-wrap" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 150, damping: 11, delay: 0.4 }}>
              <Bear mood={mood} onPoke={poke} />
              {hugs.map((h) => (
                <motion.span key={h.id} className="hug-pop" style={{ left: `${h.x}%` }} initial={{ y: 0, opacity: 1, scale: 0.6 }} animate={{ y: -120, opacity: 0, scale: 1.4 }} transition={{ duration: 1.5 }}>💗</motion.span>
              ))}
            </motion.div>

            <div className="bubble" aria-live="polite">
              <AnimatePresence mode="wait">
                <motion.p key={forgiven ? 'done' : reply || i} className="hand msg"
                  initial={{ opacity: 0, y: 16, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -16, scale: 0.9 }} transition={{ duration: 0.4 }}>
                  {forgiven ? 'You made my whole world brighter. I love you to the moon and back 🌙💕' : reply || MESSAGES[i]}
                </motion.p>
              </AnimatePresence>
            </div>

            {!forgiven ? (
              <div className="actions">
                <motion.button className="btn forgive" animate={{ scale: forgiveScale }} whileHover={{ scale: forgiveScale * 1.08 }} whileTap={{ scale: forgiveScale * 0.92 }} onClick={() => setForgiven(true)}>
                  <Heart size={20} fill="currentColor" /> Forgive Me?
                </motion.button>
                <motion.button className="btn angry" animate={{ scale: angryScale, rotate: angry ? [0, -4, 4, 0] : 0 }} whileTap={{ scale: angryScale * 0.9 }} onClick={stillAngry}>
                  <Frown size={18} /> {angryLabel}
                </motion.button>
              </div>
            ) : (
              <motion.button className="btn ghost" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }} onClick={() => { setForgiven(false); setAngry(0); setReply('') }}>
                Say sorry again 🧸
              </motion.button>
            )}
          </main>
          {forgiven && <Celebration />}
        </>
      )}
    </>
  )
}
