import { useState } from 'react'
import './styles.css'
import selectionSound from '../../assets/sounds/selection.wav'
import useSound from 'use-sound'

export default function Navbar() {
  const links = ['home', 'skills', 'projects', 'activity', 'about', 'blog']
  const [selected, setSelected] = useState(links[0])
  const [playSound] = useSound(selectionSound, { volume: 0.9 })
  const [showRipple, setShowRipple] = useState(false)
  const [coords, setCoords] = useState({x: 0, y: 0})


  function handleClick(link, nativeEvent) {
    setSelected(link)
    playSound()
    rippleEffect(nativeEvent)
  }

  // TODO: explore the implementation of using "requestAnimationFrame" instead of the hacky setTimeout() 
  // implementation for reseting the animation.

  
  function rippleEffect(nativeEvent){
    // React first commits the “false” state, the browser notices the class was removed, and 
    // when you re-add it, the CSS animation runs again.
    setCoords({x: nativeEvent.offsetX, y: nativeEvent.offsetY})
    setShowRipple(false)
    setTimeout(() => {setShowRipple(true)},0) 
  }

  return (
      <div className='main-container'>
        <div className='items-container'>
            {links.map((link) => (
              <div
                key={link}
                className={selected !== link || "selected"}
                onClick={(e) => handleClick(link, e.nativeEvent)}
              >
                {
                  showRipple && selected === link ? 
                  <div 
                    className='ripple' 
                    style={{ left: `${coords.x}px`, top: `${coords.y}px` }}
                  /> 
                  :
                  null
                }
                {link}
              </div>
            ))}
        </div>
      </div>
  )
}
