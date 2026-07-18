import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: { absolute: 'Privacy Policy | Compare Study France' },
  description:
    'How Compare Study France handles data: no accounts, cookieless Vercel Web Analytics, transient hosting logs, and newsletter email handling via Buttondown.',
  alternates: { canonical: 'https://comparestudyfrance.com/privacy' },
  robots: { index: true, follow: true },
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-8">
      <h2 className="text-lg font-bold text-stone-800 mb-2">{title}</h2>
      <div className="text-sm text-stone-600 leading-relaxed space-y-3">{children}</div>
    </section>
  )
}

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      <h1 className="text-3xl font-bold text-stone-800 mb-2">Privacy Policy</h1>
      <p className="text-xs text-stone-400 mb-8">Last updated: 18 July 2026</p>

      <p className="text-sm text-stone-600 leading-relaxed mb-8">
        Compare Study France (&ldquo;we&rdquo;, &ldquo;this site&rdquo;) is an independent,
        informational website about studying in France. This policy explains what limited data
        is processed when you visit <span className="font-medium">comparestudyfrance.com</span>.
        We keep both the site and this policy as data-minimal as possible.
      </p>

      <Section title="No accounts, no login">
        <p>
          This site has no account system and no login. You can read every page without
          identifying yourself. We do not sell any personal data.
        </p>
      </Section>

      <Section title="Hosting and server logs">
        <p>
          The site is hosted on Vercel. Like virtually all web hosts, Vercel&rsquo;s
          infrastructure transiently processes technical request data &mdash; including your IP
          address, browser type, and the pages requested &mdash; in order to deliver the site
          and to maintain its security and reliability. This limited processing is necessary for
          us to operate the website and is carried out on the basis of our legitimate interest in
          serving and securing the site. It is performed by Vercel acting as our hosting provider.
        </p>
      </Section>

      <Section title="Analytics">
        <p>
          We use <span className="font-medium">Vercel Web Analytics</span> to understand
          aggregate traffic, such as which pages are most visited. It is privacy-friendly and
          cookieless: it does <span className="font-medium">not</span> set cookies, does not store
          any identifier on your device, and does not track you across other websites. It
          processes your IP address transiently to produce an anonymous, aggregated visit count
          and does not retain data that identifies you individually.
        </p>
        <p>
          Because no cookies or device identifiers are used for analytics, this site does not
          display a cookie-consent banner.
        </p>
      </Section>

      <Section title="Newsletter">
        <p>
          If you choose to subscribe to our newsletter, the email address you enter is processed
          by our newsletter provider, Buttondown, for the sole purpose of sending you the
          newsletter. This is done on the basis of your consent, which you give by submitting the
          form. You can withdraw consent at any time using the unsubscribe link included in every
          email. We do not use your email address for any other purpose.
        </p>
      </Section>

      <Section title="Cookies">
        <p>
          This site sets no first-party tracking cookies and uses no advertising cookies.
        </p>
      </Section>

      <Section title="Third-party links">
        <p>
          Our pages link to external sites such as universities, government services, and
          reference sources. Those sites have their own privacy practices, which we do not
          control.
        </p>
      </Section>

      <Section title="Your rights">
        <p>
          Under the GDPR you have the right to access, rectification, and erasure of personal
          data concerning you, among other rights. Because this site itself stores no personal
          data about you (unless you subscribe to the newsletter), most requests will relate to
          the transient technical data processed by our hosting and analytics providers, or to a
          newsletter subscription. You can exercise these rights by contacting us at the address
          below, and we will assist.
        </p>
      </Section>

      <Section title="Contact">
        <p>
          For any privacy question, contact:{' '}
          <a href="mailto:b79119018@gmail.com" className="text-[#1E3A6E] underline">
            b79119018@gmail.com
          </a>.
        </p>
      </Section>

      <p className="text-xs text-stone-400 mt-10">
        This page is provided for transparency and general information and does not constitute
        legal advice.
      </p>
    </div>
  )
}
