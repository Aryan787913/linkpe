'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function SetupPage() {
  const [username, setUsername] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      router.push('/login')
    }
  }

  const handleSetup = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('Not authenticated')

      // Check if username is taken
      const { data: existing } = await supabase
        .from('profiles')
        .select('username')
        .eq('username', username.toLowerCase())
        .single()

      if (existing) {
        setError('Username already taken')
        setLoading(false)
        return
      }

      // Create profile
      const { error: insertError } = await supabase
        .from('profiles')
        .insert([
          {
            id: user.id,
            username: username.toLowerCase(),
            bio: '',
            avatar_url: null,
            is_pro: false,
          },
        ])

      if (insertError) throw insertError

      router.push('/dashboard')
    } catch (err: any) {
      setError(err.message || 'An error occurred')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6 gradient-primary">
      <div className="w-full max-w-md">
        <div className="text-4xl font-bold text-white text-center mb-8">LinkPe</div>

        <div className="bg-white rounded-3xl shadow-2xl p-10">
          <h1 className="text-3xl font-bold text-center mb-2">Choose your username</h1>
          <p className="text-gray-600 text-center mb-8">
            This will be your unique LinkPe URL
          </p>

          <form onSubmit={handleSetup} className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                Username
              </label>
              <div className="relative">
                <span className="absolute left-4 top-3 text-gray-500">linkpe.com/</span>
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value.replace(/[^a-z0-9_]/g, ''))}
                  placeholder="yourname"
                  required
                  minLength={3}
                  maxLength={30}
                  className="w-full pl-32 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                />
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Only lowercase letters, numbers, and underscores
              </p>
            </div>

            {error && (
              <div className="p-4 bg-red-50 text-red-800 rounded-xl text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading || username.length < 3}
              className="w-full py-3 bg-black text-white rounded-xl font-semibold hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Creating...' : 'Continue'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
