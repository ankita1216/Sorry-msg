import { Music, VolumeX } from 'lucide-react'

export default function MusicToggle({ playing, onToggle }) {
  return (
    <button className="music" onClick={onToggle} aria-pressed={playing} aria-label={playing ? 'Mute music' : 'Play music'}>
      {playing ? <Music size={20} /> : <VolumeX size={20} />}
    </button>
  )
}
