import { HiChatAlt2 } from "react-icons/hi";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="flex flex-col items-center p-6 md:p-10 text-center fade-in-up">
        <div className="w-24 h-24 mb-6 rounded-3xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
          <HiChatAlt2 className="text-white text-5xl" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold mt-4">Welcome back to Threadly</h1>
        <p className="text-lg md:text-xl text-neutral-600 dark:text-neutral-300 mt-3 px-3 max-w-2xl">Modern, fast and secure chat. Build channels, connect with friends, and enjoy seamless realtime messaging.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 text-left w-full max-w-3xl">
          <div className="p-4 rounded-xl bg-white/50 dark:bg-black/20 border border-black/5 dark:border-white/5 backdrop-blur-sm">
            <div className="font-bold text-neutral-800 dark:text-neutral-100">1:1 or Channels</div>
            <div className="text-neutral-500 dark:text-neutral-400 text-sm mt-1">Start private chats or create public spaces.</div>
          </div>
          <div className="p-4 rounded-xl bg-white/50 dark:bg-black/20 border border-black/5 dark:border-white/5 backdrop-blur-sm">
            <div className="font-bold text-neutral-800 dark:text-neutral-100">Friend Controls</div>
            <div className="text-neutral-500 dark:text-neutral-400 text-sm mt-1">Add, accept, or block in a click.</div>
          </div>
          <div className="p-4 rounded-xl bg-white/50 dark:bg-black/20 border border-black/5 dark:border-white/5 backdrop-blur-sm">
            <div className="font-bold text-neutral-800 dark:text-neutral-100">Realtime</div>
            <div className="text-neutral-500 dark:text-neutral-400 text-sm mt-1">Instant delivery and presence updates.</div>
          </div>
        </div>
        <Link
          to='/addfriend'
          className="bg-indigo-600 text-white rounded-xl px-6 py-3 text-lg font-medium mt-8 hover:bg-indigo-500 shadow-md transition-all duration-200">
          Find Your Friends
        </Link>
      </div>
    </div>
  )
}

export default Home