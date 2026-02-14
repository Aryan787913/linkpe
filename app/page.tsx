import Link from 'next/link'

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-semibold text-gradient">LinkPe</div>
          <Link 
            href="/login"
            className="px-6 py-2.5 bg-black text-white rounded-full font-medium hover:bg-gray-800 text-sm"
          >
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 gradient-primary">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 leading-tight">
            One Link.
            <br />
            Infinite Possibilities.
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-2xl mx-auto leading-relaxed">
            Share everything you create, curate and sell online. All from one beautiful link.
          </p>
          <Link 
            href="/login"
            className="inline-block px-10 py-4 bg-white text-purple-600 rounded-full font-semibold text-lg hover:scale-105 transform shadow-2xl"
          >
            Create Your LinkPe
          </Link>
          
          <div className="mt-16 text-white/80 text-sm">
            Join thousands of creators, influencers, and brands
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-bold text-center mb-16">
            Everything you need.
            <br />
            <span className="text-gradient">Nothing you don't.</span>
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-10 rounded-3xl shadow-lg hover:shadow-2xl">
              <div className="text-5xl mb-6">⚡</div>
              <h3 className="text-2xl font-bold mb-4">Lightning Fast</h3>
              <p className="text-gray-600 leading-relaxed">
                Set up your page in under 60 seconds. No technical skills required.
              </p>
            </div>
            
            <div className="bg-white p-10 rounded-3xl shadow-lg hover:shadow-2xl">
              <div className="text-5xl mb-6">🎨</div>
              <h3 className="text-2xl font-bold mb-4">Beautiful Design</h3>
              <p className="text-gray-600 leading-relaxed">
                Apple-inspired interface that puts your content front and center.
              </p>
            </div>
            
            <div className="bg-white p-10 rounded-3xl shadow-lg hover:shadow-2xl">
              <div className="text-5xl mb-6">📊</div>
              <h3 className="text-2xl font-bold mb-4">Track Analytics</h3>
              <p className="text-gray-600 leading-relaxed">
                See how many people click on your links and engage with your content.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 gradient-blue">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-8">
            Ready to get started?
          </h2>
          <p className="text-xl text-white/90 mb-12">
            Create your personalized link page today. It's free.
          </p>
          <Link 
            href="/login"
            className="inline-block px-10 py-4 bg-white text-blue-600 rounded-full font-semibold text-lg hover:scale-105 transform shadow-2xl"
          >
            Get Started Now
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto text-center">
          <div className="text-2xl font-semibold mb-4">LinkPe</div>
          <p className="text-gray-400 mb-6">
            Made with ❤️ in India
          </p>
          <div className="text-sm text-gray-500">
            © 2024 LinkPe. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
