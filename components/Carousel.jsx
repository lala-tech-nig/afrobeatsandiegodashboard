// components/Carousel.jsx
'use client'

import { useState } from 'react'
import confetti from 'canvas-confetti'
import { FaImage, FaCheckCircle, FaUpload } from 'react-icons/fa'

export default function Carousel() {
  const [images, setImages] = useState([null, null, null])
  const [submitted, setSubmitted] = useState(false)

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

  const handlePublish = () => {
    if (images.every(img => img)) {
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
        className="w-full bg-gradient-to-r from-purple-500 to-purple-700 text-white font-bold py-3 rounded-xl shadow-md hover:scale-105 hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
      >
        <FaCheckCircle className="animate-pulse" /> Publish Carousel
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
