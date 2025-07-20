// components/Events.jsx
'use client'

import { useState } from 'react'
import confetti from 'canvas-confetti'

export default function Events() {
  const [form, setForm] = useState({
    title: '',
    time: '',
    thumbnail: '',
    image: '',
    link: '',
    description: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const values = Object.values(form)
    if (values.every((val) => val.trim() !== '')) {
      confetti({ particleCount: 150, spread: 80, origin: { y: 0.6 } })
      const end = Date.now() + 10000
      const interval = setInterval(() => {
        if (Date.now() > end) return clearInterval(interval)
        confetti({ particleCount: 5, spread: 70, origin: { y: 0.6 } })
      }, 200)
    } else {
      alert('Please fill in all fields.')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-bold">Create Event</h2>
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
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-800"
      >
        Publish Event
      </button>
    </form>
  )
}
