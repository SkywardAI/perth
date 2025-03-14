'use client'
import React from 'react'
import styles from './Layout.module.css'
import Header from './Header'
import Footer from './Footer'

export default function Layout({ children }) {
  return (
    <html lang="en">
      <body className={styles.body}>
        <Header />
        <main className={styles.main}>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
