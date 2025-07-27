// components/Carousel.jsx
'use client'

import { useState } from 'react'
import confetti from 'canvas-confetti'
import { FaImage, FaCheckCircle, FaUpload } from 'react-icons/fa'

export default function Carousel() {
  const [images, setImages] = useState([null, null, null])
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleImageChange = (e, index) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const newImages = [...images]
        newImages[index] = reader.result
        setImages(newImages)
      }
      reader.readAsDataURL(file)
    }
  }

  const handlePublish = async () => {
    if (images.every(img => img)) {
      setLoading(true)
      try {
        const formData = new FormData()
        images.forEach((img, idx) => {
          const arr = img.split(',')
          const mime = arr[0].match(/:(.*?);/)[1]
          const bstr = atob(arr[1])
          let n = bstr.length
          const u8arr = new Uint8Array(n)
          while (n--) u8arr[n] = bstr.charCodeAt(n)
          const file = new File([u8arr], `carousel${idx + 1}.jpg`, { type: mime })
          formData.append('images', file)
        })

        const response = await fetch('https://afrobeatsandiegobackend.onrender.com/api/carousel/bulk', {
          method: 'POST',
          body: formData,
        })

        if (!response.ok) throw new Error('Failed to upload images')
        await response.json()

        setLoading(false)
        confetti({
          particleCount: 150,
          spread: 80,
          origin: { y: 0.6 },
        })
        setSubmitted(true)
        setTimeout(() => setSubmitted(false), 2000)
        const end = Date.now() + 1000
        const interval = setInterval(() => {
          if (Date.now() > end) return clearInterval(interval)
          confetti({ particleCount: 5, spread: 70, origin: { y: 0.6 } })
        }, 200)
      } catch (err) {
        setLoading(false)
        alert('Upload failed. Please try again.')
      }
    } else {
      alert('Please upload all 3 images before publishing.')
    }
  }

  return (
    <div className="max-w-xl mx-auto bg-white/90 rounded-2xl shadow-lg p-8 space-y-8 animate-fade-in">
      <h2 className="text-2xl font-extrabold text-purple-700 flex items-center gap-2 mb-2">
        <FaImage className="text-purple-400 animate-bounce" /> Carousel Image Upload
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {[0, 1, 2].map((index) => (
          <div key={index} className="flex flex-col items-center gap-3">
            <label className="flex flex-col items-center gap-2 cursor-pointer group">
              <span className={`w-24 h-24 flex items-center justify-center rounded-xl border-2 border-dashed transition-all duration-300
                ${images[index] ? 'border-purple-400 bg-purple-50' : 'border-purple-200 bg-white/70 group-hover:border-purple-400'}
              `}>
                {images[index] ? (
                  <img
                    src={images[index]}
                    alt={`preview-${index}`}
                    className="h-20 w-20 object-cover rounded-lg shadow-md transition-all duration-300"
                  />
                ) : (
                  <FaUpload className="text-3xl text-purple-300 group-hover:text-purple-500 transition-all duration-300" />
                )}
              </span>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageChange(e, index)}
                className="hidden"
              />
              <span className="text-sm text-purple-600 font-medium mt-1">
                {images[index] ? 'Change Image' : `Upload Image ${index + 1}`}
              </span>
            </label>
          </div>
        ))}
      </div>
      <button
        onClick={handlePublish}
        disabled={loading}
        className={`w-full bg-gradient-to-r from-purple-500 to-purple-700 text-white font-bold py-3 rounded-xl shadow-md flex items-center justify-center gap-2 transition-all duration-300
          ${loading ? 'opacity-70 cursor-not-allowed' : 'hover:scale-105 hover:shadow-xl'}
        `}
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 01-8 8z"/>
            </svg>
            Uploading...
          </span>
        ) : (
          <>
            <FaCheckCircle className="animate-pulse" /> Publish Carousel
          </>
        )}
      </button>
      {submitted && (
        <div className="text-green-600 text-center font-semibold animate-fade-in-down mt-2">
          🎉 Carousel published successfully!
        </div>
      )}
    </div>
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
