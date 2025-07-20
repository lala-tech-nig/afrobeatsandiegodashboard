// components/Sidebar.jsx
'use client'

export default function Sidebar({ setActive, active }) {
  const items = ['carousel', 'calendar', 'events', 'poppins', 'forms']

  return (
    <aside className="w-40 bg-gray-200 h-full flex flex-col">
      {items.map((item) => (
        <button
          key={item}
          onClick={() => setActive(item)}
          className={`p-4 border-b text-left font-bold uppercase ${
            active === item ? 'bg-white text-black' : 'hover:bg-gray-300'
          }`}
        >
          {item}
        </button>
      ))}
    </aside>
  )
}
