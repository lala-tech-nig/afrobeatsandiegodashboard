'use client'

import { useState, useEffect } from 'react'
import {
  FaPhoneAlt, FaUser, FaEnvelope, FaCheckCircle, FaTimesCircle,
  FaCamera, FaYoutube, FaMapMarkerAlt, FaMoneyBillWave, FaEye,
  FaCalendarCheck, FaChevronLeft, FaChevronRight
} from 'react-icons/fa'
import { Dialog } from '@headlessui/react'

const PAGE_SIZE = 5

export default function Forms() {
  const [bookings, setBookings] = useState([])
  const [connects, setConnects] = useState([])

  const [bookPage, setBookPage] = useState(1)
  const [connectPage, setConnectPage] = useState(1)

  const [modalItem, setModalItem] = useState(null)
  const [modalType, setModalType] = useState('')

  useEffect(() => {
    fetch('https://afrobeatsandiegobackend.onrender.com/api/forms/book-call').then(r => r.json()).then(data => setBookings(data))
    fetch('/api/connect-forms').then(r => r.json()).then(data => setConnects(data))
  }, [])

  const toggleAttend = id =>
    setBookings(prev => prev.map(b => b.id === id ? { ...b, attended: !b.attended } : b))
  const toggleSeen = id =>
    setConnects(prev => prev.map(c => c.id === id ? { ...c, seen: !c.seen } : c))

  const pageItems = (list, page) =>
    list.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  const pagedBookings = pageItems(bookings, bookPage)
  const pagedConnects = pageItems(connects, connectPage)

  const openModal = (item, type) => {
    setModalItem(item); setModalType(type)
  }
  const closeModal = () => setModalItem(null)

  const truncate = (str, len = 20) =>
    str.length > len ? str.slice(0, len) + '…' : str

  const renderModalContent = () => {
    if (!modalItem) return null
    return (
      <div className="space-y-3">
        {Object.entries(modalItem).map(([k, v]) => (
          <div key={k}>
            <strong className="capitalize">{k.replace(/([A-Z])/g, ' $1')}:</strong>{' '}
            {v.toString()}
          </div>
        ))}
        <button
          onClick={closeModal}
          className="mt-4 px-4 py-2 bg-purple-600 text-white rounded"
        >
          Close
        </button>
      </div>
    )
  }

  return (
    <>
      {/* Modal for details */}
      <Dialog open={!!modalItem} onClose={closeModal} className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="fixed inset-0 bg-black/50" onClick={closeModal} />
        <Dialog.Panel className="relative bg-white rounded-xl p-6 max-w-md w-full mx-auto">
          <Dialog.Title className="text-xl font-semibold">
            {modalType === 'book' ? 'Booking Details' : "Let's Connect Details"}
          </Dialog.Title>
          {renderModalContent()}
        </Dialog.Panel>
      </Dialog>

      {/* Book Calls Table */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold flex items-center gap-2 text-purple-700">
          <FaPhoneAlt className="animate-pulse text-purple-400" /> Book Calls
        </h2>
        <div className="overflow-x-auto bg-white/90 rounded-2xl shadow-lg">
          <table className="min-w-full">
            <thead className="bg-purple-100">
              <tr>
                <th>#</th><th>Name</th><th>Email</th><th>Phone</th><th>Message</th><th>Attended</th>
              </tr>
            </thead>
            <tbody>
              {pagedBookings.map((b, i) => (
                <tr
                  key={b.id}
                  className="hover:bg-purple-50 cursor-pointer"
                  onClick={() => openModal(b, 'book')}
                >
                  <td>{(bookPage - 1) * PAGE_SIZE + i + 1}</td>
                  <td>{truncate(b.name)}</td>
                  <td>{truncate(b.email)}</td>
                  <td>{truncate(b.phone)}</td>
                  <td>{truncate(b.message)}</td>
                  <td className="text-center">
                    <button onClick={e => { e.stopPropagation(); toggleAttend(b.id) }}>
                      {b.attended
                        ? <FaCheckCircle className="text-green-600" />
                        : <FaTimesCircle className="text-purple-400" />}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {Math.ceil(bookings.length / PAGE_SIZE) > 1 && (
            <div className="flex items-center justify-end p-3 gap-2">
              <button onClick={() => setBookPage(p => Math.max(1, p - 1))}><FaChevronLeft /></button>
              <span>{bookPage} / {Math.ceil(bookings.length / PAGE_SIZE)}</span>
              <button onClick={() => setBookPage(p => Math.min(Math.ceil(bookings.length / PAGE_SIZE), p + 1))}><FaChevronRight /></button>
            </div>
          )}
        </div>
      </section>

      {/* Let's Connect Table */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold flex items-center gap-2 text-purple-700">
          <FaCalendarCheck className="animate-pulse text-purple-400" /> Let's Connect
        </h2>
        <div className="overflow-x-auto bg-white/90 rounded-2xl shadow-lg">
          <table className="min-w-full">
            <thead className="bg-purple-100">
              <tr>
                <th>#</th><th>Name</th><th>Role</th><th>Equipment</th><th>Demo</th><th>Rate</th><th>Seen</th>
              </tr>
            </thead>
            <tbody>
              {pagedConnects.map((c, i) => (
                <tr
                  key={c.id}
                  className="hover:bg-purple-50 cursor-pointer"
                  onClick={() => openModal(c, 'connect')}
                >
                  <td>{(connectPage - 1) * PAGE_SIZE + i + 1}</td>
                  <td>{truncate(c.name)}</td>
                  <td>{truncate(c.role)}</td>
                  <td>{truncate(c.equipment)}</td>
                  <td><a href={`https://${c.demo}`} target="_blank" onClick={e => e.stopPropagation()}>{truncate(c.demo)}</a></td>
                  <td>{truncate(c.rate)}</td>
                  <td className="text-center">
                    <button onClick={e => { e.stopPropagation(); toggleSeen(c.id) }}>
                      {c.seen
                        ? <FaCheckCircle className="text-green-600" />
                        : <FaEye className="text-purple-400" />}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {Math.ceil(connects.length / PAGE_SIZE) > 1 && (
            <div className="flex items-center justify-end p-3 gap-2">
              <button onClick={() => setConnectPage(p => Math.max(1, p - 1))}><FaChevronLeft /></button>
              <span>{connectPage} / {Math.ceil(connects.length / PAGE_SIZE)}</span>
              <button onClick={() => setConnectPage(p => Math.min(Math.ceil(connects.length / PAGE_SIZE), p + 1))}><FaChevronRight /></button>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
