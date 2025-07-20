// components/Carousel.jsx
'use client'

import { useState } from 'react'
import confetti from 'canvas-confetti'

export default function Carousel() {
  const [images, setImages] = useState([null, null, null])

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
      const end = Date.now() + 10000
      const interval = setInterval(() => {
        if (Date.now() > end) return clearInterval(interval)
        confetti({ particleCount: 5, spread: 70, origin: { y: 0.6 } })
      }, 200)
    } else {
      alert('Please upload all 3 images before publishing.')
    }
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Carousel Image Upload</h2>
      {[0, 1, 2].map((index) => (
        <div key={index} className="flex items-center gap-4">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleImageChange(e, index)}
          />
          {images[index] && (
            <img src={images[index]} alt={`preview-${index}`} className="h-20 w-20 object-cover" />
          )}
        </div>
      ))}
      <button
        onClick={handlePublish}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-800"
      >
        Publish Carousel
      </button>
    </div>
  )
}
