// components/Calendar.jsx
'use client'

import { useState } from 'react'

const sampleEvents = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    eventTitle: 'Tech Talk',
    eventDetails: 'A deep dive into AI.',
    eventDate: '2025-08-10',
    phone: '1234567890',
    location: 'Lagos',
    image: null,
    imageUrl: '',
    posted: false,
  },
]

export default function Calendar() {
  const [events, setEvents] = useState(sampleEvents)

  const togglePosted = (id) => {
    setEvents(events.map(ev => ev.id === id ? { ...ev, posted: !ev.posted } : ev))
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Submitted Events</h2>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">SN</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Title</th>
            <th className="border p-2">Details</th>
            <th className="border p-2">Date</th>
            <th className="border p-2">Phone</th>
            <th className="border p-2">Location</th>
            <th className="border p-2">Posted</th>
          </tr>
        </thead>
        <tbody>
          {events.map((ev, idx) => (
            <tr key={ev.id}>
              <td className="border p-2">{idx + 1}</td>
              <td className="border p-2">{ev.name}</td>
              <td className="border p-2">{ev.email}</td>
              <td className="border p-2">{ev.eventTitle}</td>
              <td className="border p-2">{ev.eventDetails}</td>
              <td className="border p-2">{ev.eventDate}</td>
              <td className="border p-2">{ev.phone}</td>
              <td className="border p-2">{ev.location}</td>
              <td className="border p-2">
                <input type="checkbox" checked={ev.posted} onChange={() => togglePosted(ev.id)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
