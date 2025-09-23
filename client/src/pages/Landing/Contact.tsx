import { useState } from 'react'

const Contact = () => {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <section className="max-w-2xl">
      <h2 className="text-3xl font-bold mb-6 fade-in-up">Contact us</h2>
      {sent ? (
        <div className="p-4 rounded-md animated-card text-neutral-200 fade-in-up">Thanks! We'll get back to you soon.</div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 fade-in-up">
          <div>
            <label className="block text-sm text-neutral-300 mb-1">Email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required placeholder="you@example.com" className="w-full px-3 py-2 rounded-md bg-neutral-900 border border-neutral-700 focus:outline-none focus:border-neutral-500" />
          </div>
          <div>
            <label className="block text-sm text-neutral-300 mb-1">Message</label>
            <textarea value={message} onChange={(e) => setMessage(e.target.value)} required rows={5} placeholder="How can we help?" className="w-full px-3 py-2 rounded-md bg-neutral-900 border border-neutral-700 focus:outline-none focus:border-neutral-500" />
          </div>
          <button type="submit" className="bg-white text-neutral-900 px-5 py-2 rounded-md font-medium hover:opacity-90">Send</button>
        </form>
      )}
    </section>
  )
}

export default Contact


