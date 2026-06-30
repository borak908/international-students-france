'use client'

import { useState, useRef } from 'react'

// Replace YOUR_BUTTONDOWN_USERNAME with your actual Buttondown username
// (the part after buttondown.com/ in your Buttondown URL)
const BUTTONDOWN_USERNAME = 'YOUR_BUTTONDOWN_USERNAME'

interface NewsletterSignupProps {
  variant?: 'blog' | 'city'
}

export default function NewsletterSignup({ variant = 'blog' }: NewsletterSignupProps) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const inputRef = useRef<HTMLInputElement>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const email = inputRef.current?.value?.trim()
    if (!email) return

    setStatus('loading')
    try {
      const res = await fetch(
        `https://buttondown.com/api/emails/embed-subscribe/${BUTTONDOWN_USERNAME}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams({ email_address: email }),
        }
      )
      // Buttondown returns 200 or 201 on success; other codes are errors
      if (res.ok || res.status === 201) {
        setStatus('success')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className={`rounded-2xl p-6 text-center ${variant === 'city' ? 'bg-[#EDF0F8] border border-[#C5D0EC]' : 'bg-[#EDF0F8] border border-[#C5D0EC]'}`}>
        <div className="text-3xl mb-2">✅</div>
        <p className="font-bold text-stone-800 text-sm">You&apos;re on the list</p>
        <p className="text-stone-500 text-xs mt-1">We&apos;ll let you know when we add cities or update rankings.</p>
      </div>
    )
  }

  return (
    <div className={`rounded-2xl p-6 ${variant === 'city' ? 'bg-[#EDF0F8] border border-[#C5D0EC]' : 'bg-[#F5F2ED] border border-stone-200'}`}>
      <div className="flex items-start gap-3 mb-4">
        <span className="text-2xl flex-shrink-0">📬</span>
        <div>
          <p className="font-bold text-stone-800 text-sm leading-snug">
            Get notified when we add new cities or update rankings
          </p>
          <p className="text-stone-500 text-xs mt-1 leading-relaxed">
            No weekly digest. No sponsored content. Just a short email when the data changes.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
        <input
          ref={inputRef}
          type="email"
          name="email_address"
          required
          placeholder="your@email.com"
          disabled={status === 'loading'}
          className="flex-1 bg-white border border-stone-200 rounded-full px-4 py-2.5 text-sm text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-[#1E3A6E] disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="bg-[#1E3A6E] hover:bg-[#162D58] disabled:opacity-60 text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-colors whitespace-nowrap"
        >
          {status === 'loading' ? 'Subscribing…' : 'Notify me'}
        </button>
      </form>

      {status === 'error' && (
        <p className="text-xs text-red-600 mt-2">Something went wrong — please try again.</p>
      )}

      <p className="text-[10px] text-stone-400 mt-3">
        Powered by Buttondown · Unsubscribe any time · No spam
      </p>
    </div>
  )
}
