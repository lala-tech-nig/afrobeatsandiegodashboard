// components/Poppins.jsx
'use client'

import { useState } from 'react'
import confetti from 'canvas-confetti'

export default function Poppins() {
  const [form, setForm] = useState({
    thumbnail: '',
    trending: true,
    title: '',
    profileImage: '',
    author: '',
    views: '',
    timeAgo: '',
    link: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (Object.values(form).every(val => val.trim() !== '')) {
      confetti({ particleCount: 150, spread: 80, origin: { y: 0.6 } })
      const end = Date.now() + 10000
      const interval = setInterval(() => {
        if (Date.now() > end) return clearInterval(interval)
        confetti({ particleCount: 5, spread: 70, origin: { y: 0.6 } })
      }, 200)
    } else {
      alert('All fields are required')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-bold">Add Poppins News</h2>
      {Object.keys(form).map((key) => (
        <div key={key}>
          <label className="block capitalize font-semibold">{key}</label>
          <input
            type="text"
            name={key}
            value={form[key]}
            onChange={handleChange}
            className="border p-2 w-full"
          />
        </div>
      ))}
      <button
        type="submit"
        className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-800"
      >
        Publish
      </button>
    </form>
  )
}
