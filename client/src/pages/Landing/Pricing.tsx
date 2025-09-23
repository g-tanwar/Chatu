const Pricing = () => {
  return (
    <section>
      <h2 className="text-3xl font-bold mb-6 fade-in-up">Simple, transparent pricing</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-lg animated-card fade-in-up anim-delay-2">
          <h3 className="text-xl font-semibold">Free</h3>
          <p className="text-neutral-300">Everything you need to chat with friends.</p>
          <ul className="mt-4 space-y-2 text-sm text-neutral-300">
            <li>Unlimited 1:1 messages</li>
            <li>Public channels</li>
            <li>Basic media support</li>
          </ul>
          <div className="mt-6 text-3xl font-bold">$0</div>
        </div>
        <div className="p-6 rounded-lg animated-card fade-in-up anim-delay-3 ring-2 ring-neutral-600">
          <h3 className="text-xl font-semibold">Pro</h3>
          <p className="text-neutral-300">For small teams that need more power.</p>
          <ul className="mt-4 space-y-2 text-sm text-neutral-300">
            <li>Private channels</li>
            <li>Priority connection</li>
            <li>Advanced media</li>
          </ul>
          <div className="mt-6 text-3xl font-bold">$9<span className="text-base font-medium">/mo</span></div>
        </div>
        <div className="p-6 rounded-lg animated-card fade-in-up anim-delay-4">
          <h3 className="text-xl font-semibold">Enterprise</h3>
          <p className="text-neutral-300">Custom solutions for larger orgs.</p>
          <ul className="mt-4 space-y-2 text-sm text-neutral-300">
            <li>Custom SLAs</li>
            <li>Dedicated support</li>
            <li>SSO & Compliance</li>
          </ul>
          <div className="mt-6 text-3xl font-bold">Contact</div>
        </div>
      </div>
    </section>
  )
}

export default Pricing


