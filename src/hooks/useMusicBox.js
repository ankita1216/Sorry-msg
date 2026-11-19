import { useCallback, useEffect, useRef, useState } from 'react'

// Soft music-box lullaby synthesized with the Web Audio API (no audio files, no network).
// It only starts after the user presses the music button / opens the card.
const NOTES = [523.25, 659.25, 783.99, 659.25, 880, 783.99, 659.25, 587.33, 523.25, 659.25, 587.33, 392, 523.25, 587.33, 659.25, 783.99]

export function useMusicBox() {
  const [playing, setPlaying] = useState(false)
  const ctxRef = useRef(null)
  const timerRef = useRef(null)
  const step = useRef(0)

  const ping = useCallback(() => {
    const ctx = ctxRef.current
    if (!ctx) return
    const t = ctx.currentTime
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = 'sine'
    osc.frequency.value = NOTES[step.current++ % NOTES.length]
    gain.gain.setValueAtTime(0.0001, t)
    gain.gain.exponentialRampToValueAtTime(0.12, t + 0.02)
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 1.2)
    osc.connect(gain).connect(ctx.destination)
    osc.start(t)
    osc.stop(t + 1.3)
  }, [])

  const start = useCallback(() => {
    if (timerRef.current) return
    const Ctx = window.AudioContext || window.webkitAudioContext
    if (!Ctx) return
    ctxRef.current = ctxRef.current || new Ctx()
    ctxRef.current.resume()
    ping()
    timerRef.current = setInterval(ping, 520)
    setPlaying(true)
  }, [ping])

  const stop = useCallback(() => {
    clearInterval(timerRef.current)
    timerRef.current = null
    setPlaying(false)
  }, [])

  useEffect(() => () => { clearInterval(timerRef.current); ctxRef.current?.close() }, [])

  return { playing, toggle: () => (playing ? stop() : start()) }
}
