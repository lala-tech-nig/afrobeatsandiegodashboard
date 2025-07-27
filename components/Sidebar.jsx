// components/Sidebar.jsx
'use client'
import { FaImages, FaCalendarAlt, FaRegListAlt, FaFont, FaWpforms } from 'react-icons/fa'

const navItems = [
  { key: 'carousel', label: 'Carousel', icon: <FaImages /> },
  { key: 'calendar', label: 'Calendar', icon: <FaCalendarAlt /> },
  { key: 'events', label: 'Events', icon: <FaRegListAlt /> },
  { key: 'poppins', label: 'Poppins', icon: <FaFont /> },
  { key: 'forms', label: 'Forms', icon: <FaWpforms /> },
]

export default function Sidebar({ setActive, active, className = "" }) {
  return (
    <aside className={`hidden sm:flex flex-col items-center py-8 px-2 bg-white/80 shadow-xl rounded-r-3xl min-h-screen transition-all duration-500 w-56 ${className}`}>
      <div className="mb-10">
        <span className="text-2xl font-extrabold text-purple-600 tracking-wide">Afrobeats SD</span>
      </div>
      <nav className="flex flex-col gap-2 w-full">
        {navItems.map(item => (
          <button
            key={item.key}
            onClick={() => setActive(item.key)}
            className={`group flex items-center gap-3 px-6 py-3 rounded-xl text-base font-medium transition-all duration-300 relative overflow-hidden
              ${active === item.key
                ? 'bg-gradient-to-r from-purple-500 to-purple-400 text-white shadow-lg scale-105'
                : 'text-gray-700 hover:bg-purple-100 hover:text-purple-700'
              }`}
          >
            <span className={`text-xl transition-transform duration-300 ${active === item.key ? 'scale-125' : ''}`}>
              {item.icon}
            </span>
            <span className="transition-colors duration-300">{item.label}</span>
            {active === item.key && (
              <span className="absolute left-0 top-0 h-full w-1 bg-purple-600 rounded-r-lg animate-slide-in" />
            )}
          </button>
        ))}
      </nav>
    </aside>
  )
}

// Add this to your tailwind.config.js for the slide-in animation:
// theme: {
//   extend: {
//     keyframes: {
//       'slide-in': {
//         '0%': { height: '0%' },
//         '100%': { height: '100%' },
//       },
//     },
//     animation: {
//       'slide-in': 'slide-in 0.4s cubic-bezier(.4,0,.2,1)'
//     }
//   }
// }
