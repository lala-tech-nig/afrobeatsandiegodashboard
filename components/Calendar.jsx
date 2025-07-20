// components/Calendar.jsx
'use client'

import { useState } from 'react'
import { FaUser, FaEnvelope, FaHeading, FaRegFileAlt, FaCalendarAlt, FaPhoneAlt, FaMapMarkerAlt, FaCheckCircle, FaTimesCircle, FaChevronLeft, FaChevronRight } from 'react-icons/fa'

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
  // Add more events for pagination demo
]

const PAGE_SIZE = 5

export default function Calendar() {
  const [events, setEvents] = useState(sampleEvents)
  const [page, setPage] = useState(1)

  const togglePosted = (id) => {
    setEvents(events.map(ev => ev.id === id ? { ...ev, posted: !ev.posted } : ev))
  }

  const totalPages = Math.ceil(events.length / PAGE_SIZE)
  const pagedEvents = events.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  return (
    <div className="max-w-5xl mx-auto bg-white/90 rounded-2xl shadow-lg p-6 animate-fade-in">
      <h2 className="text-2xl font-extrabold text-purple-700 flex items-center gap-2 mb-6">
        <FaCalendarAlt className="text-purple-400 animate-bounce" /> Submitted Events
      </h2>
      <div className="overflow-x-auto rounded-xl">
        <table className="min-w-full divide-y divide-purple-100">
          <thead>
            <tr className="bg-gradient-to-r from-purple-100 to-purple-50">
              <th className="px-4 py-3 text-left font-semibold text-purple-700">#</th>
              <th className="px-4 py-3 text-left font-semibold text-purple-700"><FaUser className="inline mr-1" />Name</th>
              <th className="px-4 py-3 text-left font-semibold text-purple-700"><FaEnvelope className="inline mr-1" />Email</th>
              <th className="px-4 py-3 text-left font-semibold text-purple-700"><FaHeading className="inline mr-1" />Title</th>
              <th className="px-4 py-3 text-left font-semibold text-purple-700"><FaRegFileAlt className="inline mr-1" />Details</th>
              <th className="px-4 py-3 text-left font-semibold text-purple-700"><FaCalendarAlt className="inline mr-1" />Date</th>
              <th className="px-4 py-3 text-left font-semibold text-purple-700"><FaPhoneAlt className="inline mr-1" />Phone</th>
              <th className="px-4 py-3 text-left font-semibold text-purple-700"><FaMapMarkerAlt className="inline mr-1" />Location</th>
              <th className="px-4 py-3 text-center font-semibold text-purple-700">Posted</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-purple-50">
            {pagedEvents.map((ev, idx) => (
              <tr key={ev.id} className="hover:bg-purple-50 transition-colors duration-200">
                <td className="px-4 py-3">{(page - 1) * PAGE_SIZE + idx + 1}</td>
                <td className="px-4 py-3">{ev.name}</td>
                <td className="px-4 py-3">{ev.email}</td>
                <td className="px-4 py-3">{ev.eventTitle}</td>
                <td className="px-4 py-3">{ev.eventDetails}</td>
                <td className="px-4 py-3">{ev.eventDate}</td>
                <td className="px-4 py-3">{ev.phone}</td>
                <td className="px-4 py-3">{ev.location}</td>
                <td className="px-4 py-3 text-center">
                  <button
                    onClick={() => togglePosted(ev.id)}
                    className={`transition-all duration-300 rounded-full p-2 focus:outline-none
                      ${ev.posted ? 'bg-green-100 text-green-600 scale-110' : 'bg-purple-100 text-purple-400 hover:bg-purple-200'}
                    `}
                    title={ev.posted ? 'Posted' : 'Mark as posted'}
                  >
                    {ev.posted
                      ? <FaCheckCircle className="text-xl animate-fade-in" />
                      : <FaTimesCircle className="text-xl" />}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-end items-center gap-2 px-4 py-3">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="p-2 rounded-full bg-purple-100 text-purple-600 hover:bg-purple-200 transition disabled:opacity-50"
            >
              <FaChevronLeft />
            </button>
            <span className="text-purple-700 font-semibold">{page} / {totalPages}</span>
            <button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="p-2 rounded-full bg-purple-100 text-purple-600 hover:bg-purple-200 transition disabled:opacity-50"
            >
              <FaChevronRight />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

// Add these to your tailwind.config.js for animation support:
// theme: {
//   extend: {
//     keyframes: {
//       'fade-in': { '0%': { opacity: 0 }, '100%': { opacity: 1 } },
//     },
//     animation: {
//       'fade-in': 'fade-in 0.7s ease',
//     },
//   },
//
