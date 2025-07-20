// components/Forms.jsx
'use client'

import { useState } from 'react'

const bookCalls = [
  { id: 1, name: 'Ada', email: 'ada@mail.com', phone: '08011112222', message: 'Want to schedule a call', attended: false }
]

const connectForms = [
  {
    id: 1,
    name: 'Emeka',
    role: 'Cinematographer',
    equipment: 'Canon EOS R5',
    demo: 'youtube.com/emekashoots',
    style: 'Documentary',
    description: 'Creative and fast.',
    rate: '₦250k/day',
    location: 'Abuja',
    availability: 'Weekends only',
    seen: false
  }
]

export default function Forms() {
  const [bookings, setBookings] = useState(bookCalls)
  const [connects, setConnects] = useState(connectForms)

  const toggleAttend = (id) => {
    setBookings(prev => prev.map(b => b.id === id ? { ...b, attended: !b.attended } : b))
  }

  const toggleSeen = (id) => {
    setConnects(prev => prev.map(c => c.id === id ? { ...c, seen: !c.seen } : c))
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-bold mb-2">Book Calls</h2>
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">SN</th>
              <th className="border p-2">Name</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Phone</th>
              <th className="border p-2">Message</th>
              <th className="border p-2">Attended</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b, idx) => (
              <tr key={b.id}>
                <td className="border p-2">{idx + 1}</td>
                <td className="border p-2">{b.name}</td>
                <td className="border p-2">{b.email}</td>
                <td className="border p-2">{b.phone}</td>
                <td className="border p-2">{b.message}</td>
                <td className="border p-2">
                  <input type="checkbox" checked={b.attended} onChange={() => toggleAttend(b.id)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-2">Let's Connect</h2>
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">SN</th>
              <th className="border p-2">Name</th>
              <th className="border p-2">Role</th>
              <th className="border p-2">Equipment</th>
              <th className="border p-2">Demo</th>
              <th className="border p-2">Style</th>
              <th className="border p-2">Description</th>
              <th className="border p-2">Rate</th>
              <th className="border p-2">Location</th>
              <th className="border p-2">Availability</th>
              <th className="border p-2">Seen</th>
            </tr>
          </thead>
          <tbody>
            {connects.map((c, idx) => (
              <tr key={c.id}>
                <td className="border p-2">{idx + 1}</td>
                <td className="border p-2">{c.name}</td>
                <td className="border p-2">{c.role}</td>
                <td className="border p-2">{c.equipment}</td>
                <td className="border p-2">{c.demo}</td>
                <td className="border p-2">{c.style}</td>
                <td className="border p-2">{c.description}</td>
                <td className="border p-2">{c.rate}</td>
                <td className="border p-2">{c.location}</td>
                <td className="border p-2">{c.availability}</td>
                <td className="border p-2">
                  <input type="checkbox" checked={c.seen} onChange={() => toggleSeen(c.id)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
