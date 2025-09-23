const Features = () => {
  const features = [
    { title: 'Realtime messaging', desc: 'Instant delivery powered by Socket.io for a snappy experience.' },
    { title: 'Channels', desc: 'Organize discussions by topics with private or public channels.' },
    { title: 'Media support', desc: 'Share images and rich content seamlessly in your conversations.' },
    { title: 'Presence & status', desc: 'Know who is online, typing, or away in real time.' },
    { title: 'Privacy controls', desc: 'Block, unblock, and manage friend requests with confidence.' },
    { title: 'Responsive UI', desc: 'A clean dark UI that adapts beautifully to all screens.' },
  ]

  return (
    <section>
      <h2 className="text-3xl font-bold mb-6 fade-in-up">Powerful features, simple experience</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((f, idx) => (
          <div key={f.title} className={`p-6 rounded-lg animated-card fade-in-up anim-delay-${(idx%5)+1}`}>
            <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
            <p className="text-neutral-300">{f.desc}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 p-6 rounded-lg animated-card fade-in-up anim-delay-3">
        <h3 className="text-2xl font-semibold mb-2">Ready to try it?</h3>
        <p className="text-neutral-200">Create a free account and start chatting in seconds.</p>
      </div>
    </section>
  )
}

export default Features


