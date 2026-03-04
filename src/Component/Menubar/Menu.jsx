import { useEffect, useRef } from 'react'
import { Link } from 'react-router'
import gsap from 'gsap'
import './Menu.css'

function Menu({ isMenuOpen, onMenuClose }) {
  const menuRef = useRef(null)
  const pagesRef = useRef([])
  const infoRef = useRef([])
  const titleRef = useRef([])
  const mediaRef = useRef(null)
  const tlMenuRef = useRef(null)

  const clipPath = {
    init: 'inset(0% 0% 0% 0%)',
    bottom: 'inset(100% 0% 0% 0%)',
    top: 'inset(0% 0% 100% 0%)',
  }

  const menuPages = [
    { name: 'HOME', path: '/' },
    { name: 'MODELS', path: '/MODEL' },
    { name: 'DASHBOARD', path: '/Dashboard' },
    { name: 'ABOUT', path: '/About' }
  ]

  const handleLinkClick = () => {
    if (onMenuClose) {
      onMenuClose()
    }
  }

  useEffect(() => {
    // Initialize menu
    gsap.set(menuRef.current, { pointerEvents: 'none', clipPath: clipPath.bottom })
    gsap.set(pagesRef.current, { yPercent: 200, autoAlpha: 0 })
    gsap.set(infoRef.current, { yPercent: 100, autoAlpha: 0 })
    gsap.set(titleRef.current, { yPercent: 100, rotateY: 20, scale: 0.2 })
    gsap.set(mediaRef.current, { clipPath: clipPath.top })

    // Create timeline
    tlMenuRef.current = gsap.timeline({
      paused: true,
      defaults: { duration: 1.6, ease: 'expo.inOut' }
    })

    tlMenuRef.current
      .to(pagesRef.current, { yPercent: 0, autoAlpha: 1, stagger: 0.032 }, 0.24)
      .to(infoRef.current, { yPercent: 0, autoAlpha: 1, stagger: 0.032 }, 0.24)
      .to(titleRef.current, { yPercent: 0, rotateY: 0, scale: 1, stagger: 0.032 }, 0)
      .to(mediaRef.current, { clipPath: clipPath.init }, 0)
  }, [])

  useEffect(() => {
    if (isMenuOpen) {
      gsap.to(menuRef.current, {
        duration: 1.2,
        pointerEvents: 'auto',
        clipPath: clipPath.init,
        ease: 'expo.inOut',
      })
      tlMenuRef.current.play()
    } else {
      gsap.to(menuRef.current, {
        duration: 0.8,
        clipPath: clipPath.top,
        ease: 'expo.inOut',
        onComplete: () => {
          gsap.set(menuRef.current, { pointerEvents: 'none', clipPath: clipPath.bottom })
        },
      })
      tlMenuRef.current.reverse(2)
    }
  }, [isMenuOpen])

  return (
    <div className="menu humane-font" ref={menuRef}>
      <div className="menu_wrapper">
        <div className="menu_row1">
          <div className="menu_row">
            <div className="menu_row_pages humane-font">
              {menuPages.map((page, i) => (
                <Link to={page.path} key={i} onClick={handleLinkClick} className='hover:bg-[#d0ff00] '>
                  <h2 className='' ref={el => pagesRef.current[i] = el}>{page.name}</h2>
                </Link>
              ))}
            </div>
          </div>

          <div className="menu_row_info">
            {/* <div className="menu_row_info_location">
              {['AI-Verse', 'AI Model Marketplace', 'Powered by React', 'Made with ❤️'].map((text, i) => (
                <span key={i} ref={el => infoRef.current[i] = el}>{text}</span>
              ))}
            </div> */}

            <div className="menu_row_info_social">
              {['Instagram', 'Linkedin', 'Twitter', 'Facebook'].map((social, i) => (
                <span key={i} ref={el => infoRef.current[i + 4] = el}>{social}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="menu_row">
          <div className="menu_row_media" ref={mediaRef}>
            {/* <img src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExd2c3dndiMmliZ3lhY2t6dDM5MnFqbTYwcmxlMmJ4bXA2aTcycWY3NiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l0MYSgw9ol1zwkuQM/giphy.gif" alt="AI Animation" /> */}
            <img src="https://i.pinimg.com/originals/41/66/75/416675ec5caab078c055f8349865ceb6.gif" alt='AI Animation'></img>
          </div>

          <div className="menu_row_title">
            {['A', 'I', '-', 'V', 'E', 'R', 'S', 'E'].map((letter, i) => (
              <h1 key={i} ref={el => titleRef.current[i] = el}>{letter}</h1>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Menu