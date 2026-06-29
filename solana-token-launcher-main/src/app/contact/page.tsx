// src/app/contact/page.tsx
'use client';

import { useState } from 'react';
import { Mail, MessageSquare, Send, Twitter, Github, ExternalLink } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({
    type: null,
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: null, message: '' });

    try {
      // For now, we'll simulate sending
      await new Promise(resolve => setTimeout(resolve, 1500));
      setStatus({
        type: 'success',
        message: '✅ Message sent! We\'ll get back to you soon.',
      });
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      setStatus({
        type: 'error',
        message: '❌ Something went wrong. Please try again or email us directly.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-20">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <span className="text-purple-400 text-sm font-semibold uppercase tracking-wider">Contact</span>
        <h1 className="text-4xl md:text-5xl font-bold text-white mt-2 mb-4">
          Get in <span className="text-purple-400">Touch</span>
        </h1>
        <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
          Have questions about token creation? Need help with your launch? We're here to help.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Contact Info Cards */}
        <div className="md:col-span-1 space-y-6">
          <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-purple-900/20 flex items-center justify-center">
                <Mail className="h-5 w-5 text-purple-400" />
              </div>
              <h3 className="text-white font-semibold">Email</h3>
            </div>
            <a
              href="mailto:contact@zrp.one"
              className="text-zinc-300 hover:text-purple-400 transition text-sm"
            >
              contact@zrp.one
            </a>
          </div>

          <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-purple-900/20 flex items-center justify-center">
                <Twitter className="h-5 w-5 text-purple-400" />
              </div>
              <h3 className="text-white font-semibold">X (Twitter)</h3>
            </div>
            <a
              href="https://x.com/zrp_ai"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-300 hover:text-purple-400 transition text-sm flex items-center gap-1"
            >
              @zrp_ai <ExternalLink className="h-3 w-3" />
            </a>
          </div>

          <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-purple-900/20 flex items-center justify-center">
                <MessageSquare className="h-5 w-5 text-purple-400" />
              </div>
              <h3 className="text-white font-semibold">Discord</h3>
            </div>
            <a
              href="https://discord.com/invite/W4qS4xkbn"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-300 hover:text-purple-400 transition text-sm flex items-center gap-1"
            >
              Join our Discord <ExternalLink className="h-3 w-3" />
            </a>
          </div>

          <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-purple-900/20 flex items-center justify-center">
                <Github className="h-5 w-5 text-purple-400" />
              </div>
              <h3 className="text-white font-semibold">GitHub</h3>
            </div>
            <a
              href="https://github.com/LeonidasSpart/solanalaunchpad"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-300 hover:text-purple-400 transition text-sm flex items-center gap-1"
            >
              LeonidasSpart <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>

        {/* Contact Form */}
        <div className="md:col-span-2 bg-zinc-900 rounded-xl p-6 md:p-8 border border-zinc-800">
          <h2 className="text-2xl font-bold text-white mb-2">Send Us a Message</h2>
          <p className="text-zinc-400 text-sm mb-6">
            Fill out the form below and we'll get back to you as soon as possible.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-white text-sm font-medium block mb-1.5">Your Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="John Doe"
                className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-purple-500 text-sm"
              />
            </div>

            <div>
              <label className="text-white text-sm font-medium block mb-1.5">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="you@example.com"
                className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-purple-500 text-sm"
              />
            </div>

            <div>
              <label className="text-white text-sm font-medium block mb-1.5">Subject</label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                placeholder="Token creation question"
                className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-purple-500 text-sm"
              />
            </div>

            <div>
              <label className="text-white text-sm font-medium block mb-1.5">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                placeholder="How can we help you?"
                className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-purple-500 text-sm"
              />
            </div>

            {status.type && (
              <div className={`rounded-xl p-4 ${
                status.type === 'success'
                  ? 'bg-green-900/20 border border-green-500/30'
                  : 'bg-red-900/20 border border-red-500/30'
              }`}>
                <p className={`text-sm ${status.type === 'success' ? 'text-green-300' : 'text-red-300'}`}>
                  {status.message}
                </p>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-purple-600 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                'Sending...'
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  Send Message
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      {/* FAQ Contact Section */}
      <div className="mt-16 bg-zinc-900 rounded-xl p-8 border border-zinc-800 text-center">
        <h2 className="text-2xl font-bold text-white mb-2">Prefer to Check Our FAQ?</h2>
        <p className="text-zinc-400 text-sm mb-4">
          Many common questions are answered in our comprehensive FAQ section.
        </p>
        <a
          href="/faq"
          className="inline-block px-6 py-3 bg-zinc-800 hover:bg-zinc-700 text-white font-semibold rounded-xl transition border border-zinc-700"
        >
          View FAQ
        </a>
      </div>
    </div>
  );
}
