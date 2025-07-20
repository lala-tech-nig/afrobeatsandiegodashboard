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
    <div className="flex h-screen w-screen overflow-hidden">
      <Sidebar setActive={setActive} active={active} />
      <main className="flex-1 bg-white overflow-auto p-4">{renderContent()}</main>
    </div>
  )
}
