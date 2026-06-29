export default function ContactPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-20">
      <h1 className="text-4xl font-bold text-white text-center mb-4">Contact Us</h1>
      <p className="text-zinc-400 text-center mb-12">Have questions? We're here to help.</p>
      
      <div className="bg-zinc-900 rounded-xl p-8 border border-zinc-800">
        <form className="space-y-6">
          <div>
            <label className="text-white text-sm font-medium block mb-2">Email</label>
            <input type="email" className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white" placeholder="you@example.com" />
          </div>
          <div>
            <label className="text-white text-sm font-medium block mb-2">Message</label>
            <textarea rows={5} className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white" placeholder="Your message..." />
          </div>
          <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-xl transition">
            Send Message
          </button>
        </form>
        <div className="mt-6 text-center text-zinc-500 text-sm">
          <p>📧 support@zrp.io</p>
          <p className="mt-1">🐦 @zrp_ai</p>
        </div>
      </div>
    </div>
  );
}
