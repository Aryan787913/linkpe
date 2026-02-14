'use client'

import { useState, useEffect } from 'react'
import { supabase, Profile, Link as LinkType } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import AvatarUpload from '@/components/AvatarUpload'
import { FiTrash2, FiExternalLink, FiMenu } from 'react-icons/fi'

export default function DashboardPage() {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [links, setLinks] = useState<LinkType[]>([])
  const [loading, setLoading] = useState(true)
  const [bio, setBio] = useState('')
  const [newLinkTitle, setNewLinkTitle] = useState('')
  const [newLinkUrl, setNewLinkUrl] = useState('')
  const [totalClicks, setTotalClicks] = useState(0)
  const [draggedItem, setDraggedItem] = useState<number | null>(null)
  const router = useRouter()

  useEffect(() => {
    loadUserData()
  }, [])

  const loadUserData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        router.push('/login')
        return
      }

      // Load profile
      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

      if (!profileData) {
        router.push('/setup')
        return
      }

      setProfile(profileData)
      setBio(profileData.bio || '')

      // Load links
      const { data: linksData } = await supabase
        .from('links')
        .select('*')
        .eq('user_id', user.id)
        .order('position', { ascending: true })

      if (linksData) {
        setLinks(linksData)
        const total = linksData.reduce((sum, link) => sum + link.clicks, 0)
        setTotalClicks(total)
      }
    } catch (error) {
      console.error('Error loading data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  const updateBio = async () => {
    if (!profile) return

    const { error } = await supabase
      .from('profiles')
      .update({ bio })
      .eq('id', profile.id)

    if (!error) {
      alert('Bio updated!')
    }
  }

  const addLink = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!profile) return

    // Check link limit for free users
    if (!profile.is_pro && links.length >= 3) {
      alert('Free users can only add 3 links. Upgrade to Pro for unlimited links!')
      return
    }

    let url = newLinkUrl
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      url = 'https://' + url
    }

    const { data, error } = await supabase
      .from('links')
      .insert([
        {
          user_id: profile.id,
          title: newLinkTitle,
          url: url,
          position: links.length,
        },
      ])
      .select()
      .single()

    if (!error && data) {
      setLinks([...links, data])
      setNewLinkTitle('')
      setNewLinkUrl('')
    }
  }

  const deleteLink = async (id: string) => {
    const { error } = await supabase
      .from('links')
      .delete()
      .eq('id', id)

    if (!error) {
      setLinks(links.filter(link => link.id !== id))
    }
  }

  const handleDragStart = (index: number) => {
    setDraggedItem(index)
  }

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault()
    if (draggedItem === null || draggedItem === index) return

    const newLinks = [...links]
    const draggedLink = newLinks[draggedItem]
    newLinks.splice(draggedItem, 1)
    newLinks.splice(index, 0, draggedLink)
    
    setLinks(newLinks)
    setDraggedItem(index)
  }

  const handleDragEnd = async () => {
    if (draggedItem === null) return

    // Update positions in database
    const updates = links.map((link, index) => 
      supabase
        .from('links')
        .update({ position: index })
        .eq('id', link.id)
    )

    await Promise.all(updates)
    setDraggedItem(null)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl font-semibold text-gray-400">Loading...</div>
      </div>
    )
  }

  if (!profile) return null

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-gradient">LinkPe</div>
          <div className="flex items-center gap-4">
            <a
              href={`/${profile.username}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-gray-600 hover:text-black"
            >
              <FiExternalLink /> View Profile
            </a>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm text-gray-600 hover:text-black"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Left Column - Profile */}
          <div className="md:col-span-1 space-y-6">
            {/* Avatar */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <AvatarUpload
                userId={profile.id}
                currentUrl={profile.avatar_url}
                onUpload={(url) => setProfile({ ...profile, avatar_url: url })}
              />
            </div>

            {/* Username */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="text-sm text-gray-500 mb-1">Your LinkPe</div>
              <div className="text-lg font-semibold">@{profile.username}</div>
              <a
                href={`/${profile.username}`}
                target="_blank"
                className="text-sm text-blue-600 hover:underline"
              >
                linkpe.com/{profile.username}
              </a>
            </div>

            {/* Analytics */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="text-sm text-gray-500 mb-1">Total Clicks</div>
              <div className="text-4xl font-bold text-gradient">{totalClicks}</div>
            </div>

            {/* Pro Badge */}
            {!profile.is_pro && (
              <a
                href="https://rzp.io/rzp/WP29Eiw"
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-gradient-primary text-white rounded-2xl p-6 shadow-lg hover:shadow-xl text-center"
              >
                <div className="text-2xl font-bold mb-2">✨ Upgrade to Pro</div>
                <div className="text-sm opacity-90">Unlimited links & more</div>
              </a>
            )}
            {profile.is_pro && (
              <div className="bg-gradient-primary text-white rounded-2xl p-6 shadow-sm text-center">
                <div className="text-2xl font-bold">⭐ Pro Member</div>
              </div>
            )}
          </div>

          {/* Right Column - Content */}
          <div className="md:col-span-2 space-y-6">
            {/* Bio */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-xl font-bold mb-4">Bio</h2>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Tell the world about yourself..."
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-purple-500 resize-none"
              />
              <button
                onClick={updateBio}
                className="mt-3 px-6 py-2 bg-black text-white rounded-lg text-sm font-medium hover:bg-gray-800"
              >
                Save Bio
              </button>
            </div>

            {/* Add Link */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-xl font-bold mb-4">
                Add Link
                {!profile.is_pro && (
                  <span className="ml-2 text-sm font-normal text-gray-500">
                    ({links.length}/3 used)
                  </span>
                )}
              </h2>
              <form onSubmit={addLink} className="space-y-4">
                <input
                  type="text"
                  value={newLinkTitle}
                  onChange={(e) => setNewLinkTitle(e.target.value)}
                  placeholder="Link title (e.g., Instagram)"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-purple-500"
                />
                <input
                  type="text"
                  value={newLinkUrl}
                  onChange={(e) => setNewLinkUrl(e.target.value)}
                  placeholder="URL (e.g., instagram.com/username)"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-purple-500"
                />
                <button
                  type="submit"
                  className="w-full py-3 bg-black text-white rounded-xl font-semibold hover:bg-gray-800"
                >
                  Add Link
                </button>
              </form>
            </div>

            {/* Links List */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-xl font-bold mb-4">Your Links</h2>
              {links.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No links yet. Add your first link above!</p>
              ) : (
                <div className="space-y-3">
                  {links.map((link, index) => (
                    <div
                      key={link.id}
                      draggable
                      onDragStart={() => handleDragStart(index)}
                      onDragOver={(e) => handleDragOver(e, index)}
                      onDragEnd={handleDragEnd}
                      className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 cursor-move"
                    >
                      <FiMenu className="text-gray-400" />
                      <div className="flex-1">
                        <div className="font-semibold">{link.title}</div>
                        <div className="text-sm text-gray-500 truncate">{link.url}</div>
                        <div className="text-xs text-gray-400 mt-1">{link.clicks} clicks</div>
                      </div>
                      <button
                        onClick={() => deleteLink(link.id)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                      >
                        <FiTrash2 size={18} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
