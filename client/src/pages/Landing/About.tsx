const About = () => {
  return (
    <section className="space-y-6">
      <h2 className="text-3xl font-bold fade-in-up">About Threadly</h2>
      <p className="text-neutral-300 max-w-3xl fade-in-up anim-delay-2">
        Threadly is an open, modern chat experience built with a robust tech stack. Our mission is to make real-time conversations effortless with a delightful, accessible interface.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-lg animated-card fade-in-up anim-delay-2">
          <h3 className="text-lg font-semibold mb-2">Built with care</h3>
          <p className="text-neutral-300">Crafted using React, TypeScript, TailwindCSS and Nest.js.</p>
        </div>
        <div className="p-6 rounded-lg animated-card fade-in-up anim-delay-3">
          <h3 className="text-lg font-semibold mb-2">Community-first</h3>
          <p className="text-neutral-300">We value feedback and iterate continuously.</p>
        </div>
        <div className="p-6 rounded-lg animated-card fade-in-up anim-delay-4">
          <h3 className="text-lg font-semibold mb-2">Privacy-minded</h3>
          <p className="text-neutral-300">User controls and sensible defaults keep your data safe.</p>
        </div>
      </div>
    </section>
  )
}

export default About


