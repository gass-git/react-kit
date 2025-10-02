import { useState } from 'react'
import './Navbar.css'
import selectionSound from './selection.wav'
import useSound from 'use-sound'
import { Link } from 'react-router-dom'
import { useMediaQuery } from 'react-responsive'

export function Navbar({ links }) {
  const [selected, setSelected] = useState(links[0])
  const [playSound] = useSound(selectionSound, { volume: 0.9 })
  const [rippleAnimation, setRippleAnimation] = useState({coords: {x: 0, y: 0}, isActive: false})
  const isMobile = useMediaQuery({maxWidth:800})

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


  // todo: avoid ripple effect been shown on view resize

  return (
      <div className='main-container'>
        <div className='items-container'>
            {isMobile ?
            <>
            <Link
              key={selected.name}
              to={selected.path}
              className={selected === selected.name ? 'selected' : 'not-selected'}
            >
              {selected.name}
            </Link>
            <span>
              ▼
            </span>
            </>
            :
            links.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={selected.name === link.name ? 'selected' : 'not-selected'}
                  onClick={(e) => {
                    setSelected(link)
                    playSound()
                    rippleEffect(e)
                  }}
                >
                  {selected.name !== link.name ||
                    <div 
                      className={rippleAnimation.isActive ? 'ripple' : ''} 
                      style={{ left: `${rippleAnimation.coords.x}px`, top: `${rippleAnimation.coords.y}px` }}
                    />
                  }
                  {link.name}
                </Link>
            ))
          }
        </div>
      </div>
  )
}