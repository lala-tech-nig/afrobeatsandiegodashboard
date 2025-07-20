// components/Forms.jsx
'use client'

import { useState } from 'react'
import { FaPhoneAlt, FaUser, FaEnvelope, FaCheckCircle, FaTimesCircle, FaCamera, FaYoutube, FaMapMarkerAlt, FaMoneyBillWave, FaEye, FaCalendarCheck, FaChevronLeft, FaChevronRight } from 'react-icons/fa'

const bookCalls = [
  { id: 1, name: 'Ada', email: 'ada@mail.com', phone: '08011112222', message: 'Want to schedule a call', attended: false }
  // Add more items for testing pagination
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
  // Add more items for testing pagination
]

const PAGE_SIZE = 5

export default function Forms() {
  const [bookings, setBookings] = useState(bookCalls)
  const [connects, setConnects] = useState(connectForms)

  // Pagination state
  const [bookPage, setBookPage] = useState(1)
  const [connectPage, setConnectPage] = useState(1)

  const toggleAttend = (id) => {
    setBookings(prev => prev.map(b => b.id === id ? { ...b, attended: !b.attended } : b))
  }

  const toggleSeen = (id) => {
    setConnects(prev => prev.map(c => c.id === id ? { ...c, seen: !c.seen } : c))
  }

  // Pagination logic
  const bookTotalPages = Math.ceil(bookings.length / PAGE_SIZE)
  const connectTotalPages = Math.ceil(connects.length / PAGE_SIZE)
  const pagedBookings = bookings.slice((bookPage - 1) * PAGE_SIZE, bookPage * PAGE_SIZE)
  const pagedConnects = connects.slice((connectPage - 1) * PAGE_SIZE, connectPage * PAGE_SIZE)

  return (
    <div className="space-y-12 animate-fade-in">
      {/* Book Calls Section */}
      <div>
        <h2 className="text-2xl font-extrabold text-purple-700 flex items-center gap-2 mb-4">
          <FaPhoneAlt className="text-purple-400 animate-pulse" /> Book Calls
        </h2>
        <div className="overflow-x-auto rounded-2xl shadow-lg bg-white/90">
          <table className="min-w-full divide-y divide-purple-100">
            <thead>
              <tr className="bg-gradient-to-r from-purple-100 to-purple-50">
                <th className="px-4 py-3 text-left font-semibold text-purple-700">#</th>
                <th className="px-4 py-3 text-left font-semibold text-purple-700"><FaUser className="inline mr-1" />Name</th>
                <th className="px-4 py-3 text-left font-semibold text-purple-700"><FaEnvelope className="inline mr-1" />Email</th>
                <th className="px-4 py-3 text-left font-semibold text-purple-700"><FaPhoneAlt className="inline mr-1" />Phone</th>
                <th className="px-4 py-3 text-left font-semibold text-purple-700">Message</th>
                <th className="px-4 py-3 text-center font-semibold text-purple-700">Attended</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-purple-50">
              {pagedBookings.map((b, idx) => (
                <tr key={b.id} className="hover:bg-purple-50 transition-colors duration-200">
                  <td className="px-4 py-3">{(bookPage - 1) * PAGE_SIZE + idx + 1}</td>
                  <td className="px-4 py-3">{b.name}</td>
                  <td className="px-4 py-3">{b.email}</td>
                  <td className="px-4 py-3">{b.phone}</td>
                  <td className="px-4 py-3">{b.message}</td>
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => toggleAttend(b.id)}
                      className={`transition-all duration-300 rounded-full p-2 focus:outline-none
                        ${b.attended ? 'bg-green-100 text-green-600 scale-110' : 'bg-purple-100 text-purple-400 hover:bg-purple-200'}
                      `}
                      title={b.attended ? 'Attended' : 'Mark as attended'}
                    >
                      {b.attended
                        ? <FaCheckCircle className="text-xl animate-fade-in" />
                        : <FaTimesCircle className="text-xl" />}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* Pagination Controls */}
          {bookTotalPages > 1 && (
            <div className="flex justify-end items-center gap-2 px-4 py-3">
              <button
                onClick={() => setBookPage(p => Math.max(1, p - 1))}
                disabled={bookPage === 1}
                className="p-2 rounded-full bg-purple-100 text-purple-600 hover:bg-purple-200 transition disabled:opacity-50"
              >
                <FaChevronLeft />
              </button>
              <span className="text-purple-700 font-semibold">{bookPage} / {bookTotalPages}</span>
              <button
                onClick={() => setBookPage(p => Math.min(bookTotalPages, p + 1))}
                disabled={bookPage === bookTotalPages}
                className="p-2 rounded-full bg-purple-100 text-purple-600 hover:bg-purple-200 transition disabled:opacity-50"
              >
                <FaChevronRight />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Let's Connect Section */}
      <div>
        <h2 className="text-2xl font-extrabold text-purple-700 flex items-center gap-2 mb-4">
          <FaCalendarCheck className="text-purple-400 animate-pulse" /> Let's Connect
        </h2>
        <div className="overflow-x-auto rounded-2xl shadow-lg bg-white/90">
          <table className="min-w-full divide-y divide-purple-100">
            <thead>
              <tr className="bg-gradient-to-r from-purple-100 to-purple-50">
                <th className="px-4 py-3 text-left font-semibold text-purple-700">#</th>
                <th className="px-4 py-3 text-left font-semibold text-purple-700"><FaUser className="inline mr-1" />Name</th>
                <th className="px-4 py-3 text-left font-semibold text-purple-700">Role</th>
                <th className="px-4 py-3 text-left font-semibold text-purple-700"><FaCamera className="inline mr-1" />Equipment</th>
                <th className="px-4 py-3 text-left font-semibold text-purple-700"><FaYoutube className="inline mr-1" />Demo</th>
                <th className="px-4 py-3 text-left font-semibold text-purple-700">Style</th>
                <th className="px-4 py-3 text-left font-semibold text-purple-700">Description</th>
                <th className="px-4 py-3 text-left font-semibold text-purple-700"><FaMoneyBillWave className="inline mr-1" />Rate</th>
                <th className="px-4 py-3 text-left font-semibold text-purple-700"><FaMapMarkerAlt className="inline mr-1" />Location</th>
                <th className="px-4 py-3 text-left font-semibold text-purple-700">Availability</th>
                <th className="px-4 py-3 text-center font-semibold text-purple-700"><FaEye className="inline mr-1" />Seen</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-purple-50">
              {pagedConnects.map((c, idx) => (
                <tr key={c.id} className="hover:bg-purple-50 transition-colors duration-200">
                  <td className="px-4 py-3">{(connectPage - 1) * PAGE_SIZE + idx + 1}</td>
                  <td className="px-4 py-3">{c.name}</td>
                  <td className="px-4 py-3">{c.role}</td>
                  <td className="px-4 py-3">{c.equipment}</td>
                  <td className="px-4 py-3">
                    <a
                      href={`https://${c.demo}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-purple-600 underline hover:text-purple-800 transition-colors"
                    >
                      {c.demo}
                    </a>
                  </td>
                  <td className="px-4 py-3">{c.style}</td>
                  <td className="px-4 py-3">{c.description}</td>
                  <td className="px-4 py-3">{c.rate}</td>
                  <td className="px-4 py-3">{c.location}</td>
                  <td className="px-4 py-3">{c.availability}</td>
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => toggleSeen(c.id)}
                      className={`transition-all duration-300 rounded-full p-2 focus:outline-none
                        ${c.seen ? 'bg-green-100 text-green-600 scale-110' : 'bg-purple-100 text-purple-400 hover:bg-purple-200'}
                      `}
                      title={c.seen ? 'Seen' : 'Mark as seen'}
                    >
                      {c.seen
                        ? <FaCheckCircle className="text-xl animate-fade-in" />
                        : <FaEye className="text-xl" />}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* Pagination Controls */}
          {connectTotalPages > 1 && (
            <div className="flex justify-end items-center gap-2 px-4 py-3">
              <button
                onClick={() => setConnectPage(p => Math.max(1, p - 1))}
                disabled={connectPage === 1}
                className="p-2 rounded-full bg-purple-100 text-purple-600 hover:bg-purple-200 transition disabled:opacity-50"
              >
                <FaChevronLeft />
              </button>
              <span className="text-purple-700 font-semibold">{connectPage} / {connectTotalPages}</span>
              <button
                onClick={() => setConnectPage(p => Math.min(connectTotalPages, p + 1))}
                disabled={connectPage === connectTotalPages}
                className="p-2 rounded-full bg-purple-100 text-purple-600 hover:bg-purple-200 transition disabled:opacity-50"
              >
                <FaChevronRight />
              </button>
            </div>
          )}
        </div>
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
// }
