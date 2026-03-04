import { useRef } from 'react'
import gsap from 'gsap'
import './Navbar.css'
import { useContext } from 'react'
import { AuthContext } from '../../Authcontext'
import { useNavigate } from 'react-router'
import { Link } from 'react-router'

function Navbar({ isMenuOpen, onMenuToggle }) {
  const buttonRef = useRef(null)
const {user , logout} = useContext(AuthContext)
const navigate = useNavigate();
const handelLogout = async () => {
  await logout();
  navigate('/')
}
  const handleClick = () => {
    gsap.timeline()
      .to(buttonRef.current, {
        duration: 0.8,
        autoAlpha: 0,
        pointerEvents: 'none',
      })
      .to(buttonRef.current, {
        duration: 0.8,
        autoAlpha: 1,
        pointerEvents: 'auto'
      })

    onMenuToggle()
  }

  return (
    <div className="nav font-sans">
        {/* nav_logo */}
      <div className=""> 
        <span><Link to="/" className='text-2xl font-black tracking-tighter'>AIMANIA</Link></span>
      </div>
  <div className="hidden md:block text-[12px] tracking-[0.2em] uppercase opacity-50">
          AI Automation Specialists
        </div>
        {user ? ( <div onClick={handelLogout} className="hidden md:block text-[12px] tracking-[0.2em] uppercase opacity-50">
          Sing Out
        </div>):(<div><Link to="/login"className="hidden md:block text-[12px] tracking-[0.2em] uppercase opacity-50">
          Please Regester Here
        </Link></div>)}
        <div className="hidden md:block text-[12px] tracking-[0.2em] uppercase opacity-50">
          STUDIO SINNERS
        </div>
      {/* <div className="nav_menu">
        <div className="nav_menu_button --open-menu" onClick={handleClick} ref={buttonRef}>
          <div className="nav_menu_button_text">
            <span>{isMenuOpen ? 'Close' : 'Menu'}</span>
          </div>
          <div className="nav_menu_button_circle"></div>
        </div>
      </div> */}
        <div className="flex items-center gap-2 cursor-pointer group" onClick={handleClick} ref={buttonRef}>
          <span className="text-[12px] uppercase font-bold">{isMenuOpen ? 'Close' : 'Menu'}</span>
          <div className="w-6 h-4 flex flex-col justify-between">
            <span className="w-full h-0.5 bg-white"></span>
            <span className="w-full h-0.5 bg-white"></span>
          </div>
        </div>
    </div>
  )
}

export default Navbar
