import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen gradient-primary flex items-center justify-center px-6">
      <div className="text-center">
        <div className="text-8xl font-bold text-white mb-4">404</div>
        <h1 className="text-3xl font-bold text-white mb-4">User not found</h1>
        <p className="text-white/80 mb-8">
          This LinkPe profile doesn't exist yet
        </p>
        <Link
          href="/"
          className="inline-block px-8 py-3 bg-white text-purple-600 rounded-full font-semibold hover:bg-gray-100"
        >
          Go Home
        </Link>
      </div>
    </div>
  )
}
