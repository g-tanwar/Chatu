import { LazyLoadImage } from "react-lazy-load-image-component"
import Logo from '../../assets/brand-logo.png';
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="flex flex-col items-center p-6 md:p-10 text-center">
        <LazyLoadImage
          src={Logo}
          alt="logo"
          effect="blur"
          className="max-w-[420px] md:max-w-[500px] drop-shadow-lg"
        />
        <h1 className="text-3xl md:text-4xl font-bold mt-4">Welcome back to Threadly</h1>
        <p className="text-lg md:text-xl text-neutral-300 mt-3 px-3 max-w-2xl">Modern, fast and secure chat. Build channels, connect with friends, and enjoy seamless realtime messaging.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 text-left w-full max-w-3xl">
          <div className="p-4 rounded-md bg-neutral-800 border border-neutral-700">
            <div className="font-semibold">1:1 or Channels</div>
            <div className="text-neutral-400 text-sm">Start private chats or create public spaces.</div>
          </div>
          <div className="p-4 rounded-md bg-neutral-800 border border-neutral-700">
            <div className="font-semibold">Friend Controls</div>
            <div className="text-neutral-400 text-sm">Add, accept, or block in a click.</div>
          </div>
          <div className="p-4 rounded-md bg-neutral-800 border border-neutral-700">
            <div className="font-semibold">Realtime</div>
            <div className="text-neutral-400 text-sm">Instant delivery and presence updates.</div>
          </div>
        </div>
        <Link
          to='/addfriend'
          className="bg-white text-neutral-900 rounded-md px-6 py-3 text-lg font-medium mt-8 hover:opacity-90">
          Find Your Friends
        </Link>
      </div>
    </div>
  )
}

export default Home