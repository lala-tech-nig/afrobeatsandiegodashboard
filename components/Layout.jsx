'use client'

import { useState } from 'react'
import {
  Home,
  Calendar,
  Images,
  MessageCircle,
  Share2,
} from 'lucide-react'

import HomePage from './HomePage'
import Carousel from './CarouselPage'
import Calendar from './CalendarPage'
import Poppin from './PoppinPage'
import Connect from './ConnectPage'

const tabs = [
  { key: 'home', label: 'Home', icon: <Home size={18} /> },
  { key: 'carousel', label: 'Carousel', icon: <Images size={18} /> },
  { key: 'calendar', label: 'Calendar', icon: <Calendar size={18} /> },
  { key: 'poppin', label: 'Poppin', icon: <MessageCircle size={18} /> },
  { key: 'connect', label: 'Connect', icon: <Share2 size={18} /> },
]

export default function Layout() {
  const [activeTab, setActiveTab] = useState('home')

  const renderComponent = () => {
    switch (activeTab) {
      case 'carousel':
        return <CarouselPage />
      case 'calendar':
        return <CalendarPage />
      case 'poppin':
        return <PoppinPage />
      case 'connect':
        return <ConnectPage />
      default:
        return <HomePage />
    }
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white p-4 shadow-md">
        <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
        <nav className="space-y-2">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`w-full flex items-center space-x-3 px-4 py-2 rounded-md text-left hover:bg-gray-200 transition ${
                activeTab === tab.key ? 'bg-gray-200 font-semibold' : ''
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6 overflow-y-auto">
        {renderComponent()}
      </main>
    </div>
  )
}
