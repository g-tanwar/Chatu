import { Link, NavLink } from 'react-router-dom'
import Logo from '../../../assets/logo.png'

const Navbar = () => {
  const navLinkClass = ({ isActive }: { isActive: boolean }) => `px-3 py-2 rounded-md text-sm md:text-base ${isActive ? 'bg-neutral-800 text-white' : 'text-neutral-300 hover:text-white hover:bg-neutral-800'} duration-150`

  return (
    <header className="w-full border-b border-neutral-800 bg-neutral-900/80 backdrop-blur sticky top-0 z-40">
      <div className="max-w-[1200px] mx-auto px-4 md:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/landing" className="flex items-center gap-2">
          <img src={Logo} alt="brand" className="h-8 w-8" />
          <span className="font-semibold text-white">Threadly</span>
        </Link>
        <nav className="hidden md:flex items-center gap-1">
          <NavLink to="/features" className={navLinkClass}>Features</NavLink>
          <NavLink to="/pricing" className={navLinkClass}>Pricing</NavLink>
          <NavLink to="/about" className={navLinkClass}>About</NavLink>
          <NavLink to="/contact" className={navLinkClass}>Contact</NavLink>
        </nav>
        <div className="flex items-center gap-2">
          <Link to="/login" className="px-3 py-2 text-sm md:text-base text-neutral-300 hover:text-white">Log in</Link>
          <Link to="/register" className="px-3 py-2 rounded-md bg-white text-neutral-900 text-sm md:text-base hover:opacity-90">Get started</Link>
        </div>
      </div>
    </header>
  )
}

export default Navbar


