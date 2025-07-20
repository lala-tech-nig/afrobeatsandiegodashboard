// components/Events.jsx
'use client'

import { useState } from 'react'
import confetti from 'canvas-confetti'
import { FaCalendarAlt, FaClock, FaImage, FaLink, FaRegFileAlt, FaHeading, FaCheckCircle } from 'react-icons/fa'

const fields = [
  { key: 'title', label: 'Title', icon: <FaHeading /> },
  { key: 'time', label: 'Time', icon: <FaClock /> },
  { key: 'thumbnail', label: 'Thumbnail URL', icon: <FaImage /> },
  { key: 'image', label: 'Image URL', icon: <FaImage /> },
  { key: 'link', label: 'Event Link', icon: <FaLink /> },
  { key: 'description', label: 'Description', icon: <FaRegFileAlt /> },
]

export default function Events() {
  const [form, setForm] = useState({
    title: '',
    time: '',
    thumbnail: '',
    image: '',
    link: '',
    description: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const values = Object.values(form)
    if (values.every((val) => val.trim() !== '')) {
      confetti({ particleCount: 150, spread: 80, origin: { y: 0.6 } })
      setSubmitted(true)
      setTimeout(() => setSubmitted(false), 2000)
      const end = Date.now() + 1000
      const interval = setInterval(() => {
        if (Date.now() > end) return clearInterval(interval)
        confetti({ particleCount: 5, spread: 70, origin: { y: 0.6 } })
      }, 200)
    } else {
      alert('Please fill in all fields.')
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto bg-white/90 rounded-2xl shadow-lg p-8 space-y-6 animate-fade-in"
    >
      <h2 className="text-2xl font-extrabold text-purple-700 flex items-center gap-2 mb-4">
        <FaCalendarAlt className="text-purple-400 animate-bounce" /> Create Event
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {fields.map(({ key, label, icon }) => (
          <div key={key} className="flex flex-col gap-1">
            <label className="flex items-center gap-2 font-semibold text-gray-700">
              <span className="text-purple-500">{icon}</span>
              {label}
            </label>
            {key === 'description' ? (
              <textarea
                name={key}
                value={form[key]}
                onChange={handleChange}
                className="border border-purple-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all duration-200 bg-white/80 resize-none min-h-[60px]"
                placeholder={label}
                autoComplete="off"
              />
            ) : (
              <input
                type="text"
                name={key}
                value={form[key]}
                onChange={handleChange}
                className="border border-purple-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all duration-200 bg-white/80"
                placeholder={label}
                autoComplete="off"
              />
            )}
          </div>
        ))}
      </div>
      <button
        type="submit"
        className="w-full bg-gradient-to-r from-purple-500 to-purple-700 text-white font-bold py-3 rounded-xl shadow-md hover:scale-105 hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
      >
        <FaCheckCircle className="animate-pulse" /> Publish Event
      </button>
      {submitted && (
        <div className="text-green-600 text-center font-semibold animate-fade-in-down mt-2">
          🎉 Event published successfully!
        </div>
      )}
    </form>
  )
}

// Add these to your tailwind.config.js for animation support:
// theme: {
//   extend: {
//     keyframes: {
//       'fade-in': { '0%': { opacity: 0 }, '100%': { opacity: 1 } },
//       'fade-in-down': { '0%': { opacity: 0, transform: 'translateY(-20px)' }, '100%': { opacity: 1, transform: 'translateY(0)' } },
//     },
//     animation: {
//       'fade-in': 'fade-in 0.7s ease',
//       'fade-in-down': 'fade-in-down 0.7s ease',
//     },
//   },
// }
