import { useRef } from 'react'
import './SpotlightCard.css'

// Card with a soft radial highlight that follows the pointer. Extra props
// (e.g. data-reveal) pass through to the root element.
const SpotlightCard = ({ children, className = '', as: Tag = 'div', ...rest }) => {
  const divRef = useRef(null)

  const handleMouseMove = e => {
    const el = divRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    el.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`)
    el.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`)
  }

  return (
    <Tag ref={divRef} onMouseMove={handleMouseMove} className={`card-spotlight ${className}`} {...rest}>
      {children}
    </Tag>
  )
}

export default SpotlightCard
