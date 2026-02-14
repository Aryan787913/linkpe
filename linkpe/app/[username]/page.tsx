import { createClient } from '@supabase/supabase-js'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import LinkButton from './LinkButton'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

interface PageProps {
  params: {
    username: string
  }
}

export default async function ProfilePage({ params }: PageProps) {
  const { username } = params

  // Fetch profile
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('username', username.toLowerCase())
    .single()

  if (!profile) {
    notFound()
  }

  // Fetch links
  const { data: links } = await supabase
    .from('links')
    .select('*')
    .eq('user_id', profile.id)
    .order('position', { ascending: true })

  return (
    <div className="min-h-screen gradient-primary px-6 py-12">
      <div className="max-w-2xl mx-auto">
        {/* Profile Card */}
        <div className="bg-white/95 backdrop-blur-lg rounded-3xl p-8 shadow-2xl mb-6">
          {/* Avatar */}
          <div className="flex justify-center mb-6">
            <div className="relative w-32 h-32 rounded-full overflow-hidden bg-gray-200 ring-4 ring-white shadow-xl">
              {profile.avatar_url ? (
                <Image
                  src={profile.avatar_url}
                  alt={profile.username}
                  fill
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-primary">
                  <span className="text-4xl font-bold text-white">
                    {profile.username[0].toUpperCase()}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Username */}
          <h1 className="text-3xl font-bold text-center mb-2">
            @{profile.username}
          </h1>

          {/* Bio */}
          {profile.bio && (
            <p className="text-gray-600 text-center max-w-md mx-auto leading-relaxed">
              {profile.bio}
            </p>
          )}
        </div>

        {/* Links */}
        <div className="space-y-4">
          {links && links.length > 0 ? (
            links.map((link) => (
              <LinkButton key={link.id} link={link} />
            ))
          ) : (
            <div className="text-center text-white/80 py-12">
              No links yet
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-12">
          <a
            href="/"
            className="inline-block text-white/80 hover:text-white text-sm font-medium"
          >
            Create your own LinkPe →
          </a>
        </div>
      </div>
    </div>
  )
}

export async function generateMetadata({ params }: PageProps) {
  const { username } = params

  const { data: profile } = await supabase
    .from('profiles')
    .select('username, bio')
    .eq('username', username.toLowerCase())
    .single()

  if (!profile) {
    return {
      title: 'User not found',
    }
  }

  return {
    title: `@${profile.username} | LinkPe`,
    description: profile.bio || `Check out @${profile.username}'s links`,
  }
}
