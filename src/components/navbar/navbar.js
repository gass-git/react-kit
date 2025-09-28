import { useState } from 'react'
import './styles.css'
import selectionSound from '../../assets/sounds/selection.wav'
import useSound from 'use-sound'
import { Link } from 'react-router-dom'

export default function Navbar({ links }) {
  const [selected, setSelected] = useState(links[0].name)
  const [playSound] = useSound(selectionSound, { volume: 0.9 })
  const [rippleAnimation, setRippleAnimation] = useState({coords: {x: 0, y: 0}, isActive: false})

  /*
  * In order for the CSS animation to be shown, the animation class has to rapidly
  * be removed and re-inserted into the DOM.
  */
  function rippleEffect(e){
    // Position of the container (in the viewport) from where the event has been passed.
    const rect = e.currentTarget.getBoundingClientRect();

    // Relative position within the container. 
    const [x,y] = [e.clientX - rect.left, e.clientY - rect.top];

    setRippleAnimation({coords: {x: x, y: y}, isActive: false})
    requestAnimationFrame(() => {setRippleAnimation(prev => ({ ...prev, isActive: true }))})
  }

  return (
      <div className='main-container'>
        <div className='items-container'>
            {links.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={selected !== link.name || 'selected'}
                  onClick={(e) => {
                    setSelected(link.name)
                    playSound()
                    rippleEffect(e)
                  }}
                >
                  {selected !== link.name ||
                    <div 
                      className={!rippleAnimation.isActive || 'ripple'} 
                      style={{ left: `${rippleAnimation.coords.x}px`, top: `${rippleAnimation.coords.y}px` }}
                    />
                  }
                  {link.name}
                </Link>
            ))}
        </div>
      </div>
  )
}
