'use client'

import { Link as LinkType } from '@/lib/supabase'
import { supabase } from '@/lib/supabase'

interface LinkButtonProps {
  link: LinkType
}

export default function LinkButton({ link }: LinkButtonProps) {
  const handleClick = async () => {
    // Increment click count
    await supabase
      .from('links')
      .update({ clicks: link.clicks + 1 })
      .eq('id', link.id)

    // Open link in new tab
    window.open(link.url, '_blank', 'noopener,noreferrer')
  }

  return (
    <button
      onClick={handleClick}
      className="w-full bg-white hover:bg-gray-50 text-gray-900 font-semibold py-5 px-6 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 text-center"
    >
      {link.title}
    </button>
  )
}
