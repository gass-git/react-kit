import { useState } from 'react'
import './styles.css'
import selectionSound from '../../assets/sounds/selection.wav'
import useSound from 'use-sound'

export default function Navbar() {
  const links = ['home', 'skills', 'projects', 'activity', 'about', 'blog']
  const [selected, setSelected] = useState(links[0])
  const [playSound] = useSound(selectionSound, { volume: 0.9 })

  function handleClick(link) {
    setSelected(link)
    playSound()
  }

  return (
      <div className='main-container'>
        <div className='items-container'>
            {links.map((link) => (
              <div
                key={link}
                className={selected !== link || "selected"}
                onClick={() => handleClick(link)}
              >
                {link}
              </div>
            ))}
        </div>
      </div>
  )
}
