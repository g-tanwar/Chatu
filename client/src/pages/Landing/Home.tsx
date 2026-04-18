import { Link } from 'react-router-dom'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import Brand from '../../assets/brand-logo.png'
import { HiChatAlt2, HiUserGroup, HiOutlineShieldCheck, HiLightningBolt } from 'react-icons/hi'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'

const LandingHome = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <section className="w-full min-h-full flex flex-col justify-center">
      {/* Hero Welcome Container */}
      <div className="flex flex-col md:flex-row items-center justify-between bg-white/50 dark:bg-black/20 backdrop-blur-md rounded-3xl p-8 md:p-12 border border-black/5 dark:border-white/5 shadow-xl transition-colors duration-300">
        <div className="space-y-6 max-w-xl z-10 fade-in-up">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-neutral-800 dark:text-neutral-100">
            {user ? 'Welcome back,' : "Let's connect"}
            <span className="block text-indigo-600 dark:text-indigo-400 mt-2">{user ? user.username : 'the world.'}</span>
          </h1>
          <p className="text-lg text-neutral-600 dark:text-neutral-300 font-medium">
            Experience lightning-fast instant messaging, create dedicated channels, and connect with your close friends in an ultra-secure environment.
          </p>
          <div className="flex flex-wrap items-center gap-4 pt-2">
            {user ? (
              <>
                <Link to="/create" className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-medium shadow-lg hover:bg-indigo-500 hover:-translate-y-0.5 transition-all duration-200">New Channel</Link>
                <Link to="/addfriend" className="bg-white dark:bg-neutral-800 text-neutral-800 dark:text-white px-6 py-3 rounded-xl font-medium shadow-md border border-neutral-200 dark:border-neutral-700 hover:border-neutral-300 dark:hover:border-neutral-600 hover:-translate-y-0.5 transition-all duration-200">Find Friends</Link>
              </>
            ) : (
              <>
                <Link to="/register" className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-medium shadow-lg hover:bg-indigo-500 hover:-translate-y-0.5 transition-all duration-200">Create Free Account</Link>
                <Link to="/login" className="bg-white dark:bg-neutral-800 text-neutral-800 dark:text-white px-6 py-3 rounded-xl font-medium shadow-md border border-neutral-200 dark:border-neutral-700 hover:border-neutral-300 dark:hover:border-neutral-600 hover:-translate-y-0.5 transition-all duration-200">Sign In</Link>
              </>
            )}
          </div>
        </div>
        
        {/* Floating Brand Graphic */}
        <div className="hidden md:flex justify-end transition-opacity duration-300 fade-in-up anim-delay-2 pl-8">
          <div className="relative">
             <div className="absolute inset-0 bg-indigo-500/20 dark:bg-indigo-500/40 blur-3xl rounded-full"></div>
             <LazyLoadImage src={Brand} alt="Brand" effect="blur" className="max-w-[280px] lg:max-w-[360px] relative z-10 floaty drop-shadow-2xl" />
          </div>
        </div>
      </div>

      {/* Feature Action Cards */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 pb-6">
        {[
          { icon: <HiChatAlt2 className="text-3xl text-indigo-500" />, title: "Instant Chat", text: "Zero latency messaging inside your channels." },
          { icon: <HiUserGroup className="text-3xl text-purple-500" />, title: "Team Channels", text: "Create dedicated rooms for any topic or team." },
          { icon: <HiOutlineShieldCheck className="text-3xl text-emerald-500" />, title: "Private Spaces", text: "Complete end-to-end privacy controls to maintain safety." },
          { icon: <HiLightningBolt className="text-3xl text-amber-500" />, title: "Blazing Fast", text: "Optimized modern React UI rendering consistently." }
        ].map((feat, idx) => (
          <div key={idx} className="bg-white/50 dark:bg-neutral-800/40 backdrop-blur-sm p-6 rounded-2xl border border-black/5 dark:border-white/5 shadow-sm hover:-translate-y-1 hover:shadow-xl transition-all duration-300 fade-in-up" style={{ animationDelay: `${0.1 * (idx + 1)}s` }}>
            <div className="mb-4 bg-white dark:bg-neutral-900 w-12 h-12 rounded-xl flex items-center justify-center shadow-sm border border-neutral-100 dark:border-neutral-800">
              {feat.icon}
            </div>
            <h3 className="text-lg font-bold text-neutral-800 dark:text-neutral-100 mb-2">{feat.title}</h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed font-medium">{feat.text}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default LandingHome
