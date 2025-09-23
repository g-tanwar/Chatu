import { Link } from 'react-router-dom'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import Brand from '../../assets/brand-logo.png'

const LandingHome = () => {
  return (
    <section className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="space-y-6 fade-in-up anim-delay-1">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
            Chat faster. Connect deeper. Built for modern teams.
          </h1>
          <p className="text-neutral-300 text-lg">
            A sleek, secure chat platform with real-time messaging, channels, and smart friend controls. Powered by React, Nest.js and Socket.io.
          </p>
          <div className="flex items-center gap-3">
            <Link to="/register" className="bg-white text-neutral-900 px-5 py-3 rounded-md font-medium hover:opacity-90">Create free account</Link>
            <Link to="/login" className="px-5 py-3 rounded-md border border-neutral-700 hover:border-neutral-500 hover:text-white text-neutral-300">Sign in</Link>
          </div>
          <div className="flex items-center gap-6 text-neutral-400 text-sm">
            <div>Realtime</div>
            <div>End-to-end privacy controls</div>
            <div>No credit card</div>
          </div>
        </div>
        <div className="flex justify-center md:justify-end fade-in-up anim-delay-2">
          <LazyLoadImage src={Brand} alt="Brand" effect="blur" className="max-w-[420px] floaty" />
        </div>
      </div>

      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-lg animated-card fade-in-up anim-delay-2">
          <h3 className="text-xl font-semibold mb-2">One-to-one and channels</h3>
          <p className="text-neutral-300">Create private chats or public channels, organize conversations your way.</p>
        </div>
        <div className="p-6 rounded-lg animated-card fade-in-up anim-delay-3">
          <h3 className="text-xl font-semibold mb-2">Smart friend control</h3>
          <p className="text-neutral-300">Send requests, accept, or block with a single click.</p>
        </div>
        <div className="p-6 rounded-lg animated-card fade-in-up anim-delay-4">
          <h3 className="text-xl font-semibold mb-2">Fast and reliable</h3>
          <p className="text-neutral-300">Optimized front-end with instant updates via websockets.</p>
        </div>
      </div>
    </section>
  )
}

export default LandingHome


