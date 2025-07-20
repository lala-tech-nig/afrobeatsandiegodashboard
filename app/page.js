// app/layout.jsx
'use client'
import { useState } from 'react'
import Sidebar from '@/components/Sidebar'
import Carousel from '@/components/Carousel'
import Calendar from '@/components/Calendar'
import Events from '@/components/Events'
import Poppins from '@/components/Poppins'
import Forms from '@/components/Forms'

export default function Layout() {
  const [active, setActive] = useState('carousel')

  const renderContent = () => {
    switch (active) {
      case 'carousel':
        return <Carousel />
      case 'calendar':
        return <Calendar />
      case 'events':
        return <Events />
      case 'poppins':
        return <Poppins />
      case 'forms':
        return <Forms />
      default:
        return null
    }
  }

  return (
    <div className="flex min-h-screen w-full bg-gradient-to-br from-purple-200 via-purple-100 to-purple-50 font-sans transition-colors duration-700">
      <Sidebar setActive={setActive} active={active} className="w-72" /> {/* Pass custom width if Sidebar supports it */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-8">
        <div className="w-full max-w-5xl min-h-[70vh] sm:min-h-[80vh] bg-white/90 rounded-3xl shadow-2xl p-4 sm:p-10 transition-all duration-500 ease-in-out transform hover:scale-[1.01] hover:shadow-3xl">
          <h1 className="text-2xl sm:text-3xl font-extrabold mb-6 sm:mb-8 text-purple-700 tracking-tight animate-fade-in-down font-sans">
            {active.charAt(0).toUpperCase() + active.slice(1)}
          </h1>
          <div className="animate-fade-in">{renderContent()}</div>
        </div>
      </main>
    </div>
  )
}
