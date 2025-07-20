'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Home,
  Calendar,
  Images,
  MessageCircle,
  Share2,
} from 'lucide-react'

const navItems = [
  { label: 'Home', path: '/', icon: <Home size={20} /> },
  { label: 'Carousel', path: '/carousel', icon: <Images size={20} /> },
  { label: 'Calendar', path: '/calendar', icon: <Calendar size={20} /> },
  { label: 'Poppin', path: '/poppin', icon: <MessageCircle size={20} /> },
  { label: 'Connect', path: '/connect', icon: <Share2 size={20} /> },
]

export default function DashboardLayout({ children }) {
  const pathname = usePathname()

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-4">
        <div className="text-xl font-bold mb-6">Dashboard</div>
        <nav className="space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`flex items-center space-x-3 px-3 py-2 rounded-md hover:bg-gray-200 transition ${
                pathname === item.path ? 'bg-gray-200 font-semibold' : ''
              }`}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      </aside>

      {/* Content Area */}
      <main className="flex-1 p-6 overflow-y-auto">{children}</main>
    </div>
  )
}
