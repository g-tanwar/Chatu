import { FC } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './navbar'
import Footer from './footer'

const LandingLayout: FC = () => {
  return (
    <div className="min-h-full flex flex-col bg-transparent text-neutral-800 dark:text-white transition-colors duration-300">
      <Navbar />
      <main className="flex-1 w-full max-w-[1200px] mx-auto px-4 md:px-6 lg:px-8 py-8 overflow-y-auto scrollbar-hide">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default LandingLayout


