'use client'

import React, { useState, useEffect } from 'react'
import styles from './Carousel.module.css'

const images = [
  '/main-1.png',
  '/main-2.png',
  '/main-3.png',
  '/main-4.png',
  '/main-5.png',
  '/main-6.png',
]

export default function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className={styles.container}>
      <img
        src={images[currentIndex]}
        alt="Main Visual"
        className={styles.image}
      />

      <div className={styles.indicators}>
        {images.map((_, index) => (
          <span
            key={index}
            className={`${styles.indicator} ${
              currentIndex === index ? styles.active : ''
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  )
}
