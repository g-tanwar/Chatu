import { Link, NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '../../../redux/store'
import { HiChatAlt2 } from 'react-icons/hi'

const Navbar = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const navLinkClass = ({ isActive }: { isActive: boolean }) => `px-3 py-2 rounded-xl font-medium text-sm md:text-base ${isActive ? 'bg-indigo-600 text-white shadow-md' : 'text-neutral-600 dark:text-neutral-300 hover:text-indigo-600 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800/50'} transition-all duration-200`

  return (
    <header className="w-full border-b border-black/5 dark:border-white/5 bg-white/20 dark:bg-black/20 backdrop-blur-xl sticky top-0 z-40 transition-colors duration-300">
      <div className="max-w-[1200px] mx-auto px-4 md:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/landing" className="flex items-center gap-3 group">
          <div className="h-8 w-8 rounded-lg bg-indigo-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-sm shadow-indigo-500/30">
            <HiChatAlt2 className="text-white text-lg" />
          </div>
          <span className="font-bold text-lg text-neutral-800 dark:text-white tracking-tight">Threadly</span>
        </Link>
        <nav className="hidden md:flex items-center gap-1 bg-white/30 dark:bg-neutral-900/40 p-1 rounded-2xl border border-black/5 dark:border-white/5">
          <NavLink to="/features" className={navLinkClass}>Features</NavLink>
          <NavLink to="/pricing" className={navLinkClass}>Pricing</NavLink>
          <NavLink to="/about" className={navLinkClass}>About</NavLink>
          <NavLink to="/contact" className={navLinkClass}>Contact</NavLink>
        </nav>
        <div className="flex items-center gap-3">
          {!user ? (
            <>
              <Link to="/login" className="px-4 py-2 font-medium text-sm md:text-base text-neutral-600 dark:text-neutral-300 hover:text-indigo-600 dark:hover:text-white transition-colors">Log in</Link>
              <Link to="/register" className="px-5 py-2.5 rounded-xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-sm md:text-base font-semibold hover:scale-105 shadow-md hover:shadow-lg transition-all duration-200">Get started</Link>
            </>
          ) : (
            <Link to="/home" className="px-5 py-2.5 rounded-xl bg-indigo-600 text-white text-sm md:text-base font-semibold hover:bg-indigo-500 shadow-md hover:shadow-lg transition-all duration-200">Go to App</Link>
          )}
        </div>
      </div>
    </header>
  )
}

export default Navbar


