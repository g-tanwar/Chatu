const Footer = () => {
  return (
    <footer className="w-full border-t border-neutral-800">
      <div className="max-w-[1200px] mx-auto px-4 md:px-6 lg:px-8 py-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-neutral-400">
        <div>© {new Date().getFullYear()} Threadly. All rights reserved.</div>
        <div className="flex items-center gap-4">
          <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-white">GitHub</a>
          <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-white">Twitter</a>
          <a href="https://example.com" target="_blank" rel="noreferrer" className="hover:text-white">Docs</a>
        </div>
      </div>
    </footer>
  )
}

export default Footer


