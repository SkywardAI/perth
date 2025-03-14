'use client'
import Link from 'next/link'
import React, { useState } from 'react'

export default function Layout({ children }) {
  const [showProducts, setShowProducts] = useState(false)
  const [showSolutions, setShowSolutions] = useState(false)

  return (
    <html lang="en">
      <body style={{ fontFamily: 'Arial, sans-serif', color: '#333' }}>
        {/* Header */}
        <header
          style={{
            backgroundColor: '#f5f5f5',
            borderBottom: '1px solid #ddd',
            padding: '0.75rem 1rem',
          }}>
          <div
            style={{
              maxWidth: '1200px',
              margin: '0 auto',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            {/* Brand */}
            <div style={{ fontWeight: 'bold', fontSize: '1.5rem' }}>
              <Link href="/">SkywardAI</Link>
            </div>
            {/* Navigation */}
            <nav style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ position: 'relative', marginRight: '1rem' }}>
                <button
                  onClick={() => setShowProducts((prev) => !prev)}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '1rem',
                    color: 'black',
                  }}>
                  Products
                </button>
                {showProducts && (
                  <ul
                    style={{
                      position: 'absolute',
                      top: '100%',
                      left: 0,
                      backgroundColor: '#fff',
                      listStyle: 'none',
                      margin: 0,
                      padding: '0.5rem 1rem',
                      boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
                      zIndex: 1000,
                    }}>
                    <li style={{ marginBottom: '0.5rem' }}>
                      <a
                        href="https://github.com/SkywardAI"
                        target="_blank"
                        rel="noopener noreferrer">
                        AI Powered Chatbot
                      </a>
                    </li>
                    <li style={{ marginBottom: '0.5rem' }}>
                      <a
                        href="https://github.com/SkywardAI"
                        target="_blank"
                        rel="noopener noreferrer">
                        RAG
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://github.com/SkywardAI"
                        target="_blank"
                        rel="noopener noreferrer">
                        E-Commerce
                      </a>
                    </li>
                  </ul>
                )}
              </div>
              <div style={{ position: 'relative', marginRight: '1rem' }}>
                <button
                  onClick={() => setShowSolutions((prev) => !prev)}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '1rem',
                    color: 'black',
                  }}>
                  Solutions
                </button>
                {showSolutions && (
                  <ul
                    style={{
                      position: 'absolute',
                      top: '100%',
                      left: 0,
                      backgroundColor: '#fff',
                      listStyle: 'none',
                      margin: 0,
                      padding: '0.5rem 1rem',
                      boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
                      zIndex: 1000,
                    }}>
                    <li style={{ marginBottom: '0.5rem' }}>
                      <a
                        href="https://github.com/SkywardAI"
                        target="_blank"
                        rel="noopener noreferrer">
                        Getting Started
                      </a>
                    </li>
                    <li style={{ marginBottom: '0.5rem' }}>
                      <a
                        href="https://github.com/SkywardAI"
                        target="_blank"
                        rel="noopener noreferrer">
                        API Reference
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://github.com/SkywardAI"
                        target="_blank"
                        rel="noopener noreferrer">
                        FAQ
                      </a>
                    </li>
                  </ul>
                )}
              </div>
              <div style={{ marginRight: '1rem' }}>
                <Link href="/showcase">Showcase</Link>
              </div>
            </nav>
          </div>
        </header>

        <main
          style={{
            maxWidth: '1200px',
            margin: '2rem auto',
            padding: '0 1rem',
            textAlign: 'center',
          }}>
          {children}
        </main>

        {/* Footer */}
        <footer
          style={{
            backgroundColor: '#f5f5f5',
            borderTop: '1px solid #ddd',
            padding: '2rem 1rem',
          }}>
          <div
            style={{
              maxWidth: '1200px',
              margin: '0 auto',
              display: 'flex',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
            }}>
            <div style={{ marginBottom: '1rem' }}>
              <h3>Product</h3>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                <li>
                  <a
                    href="https://github.com/SkywardAI"
                    target="_blank"
                    rel="noopener noreferrer">
                    AI Powered Chatbot
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/SkywardAI"
                    target="_blank"
                    rel="noopener noreferrer">
                    RAG
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/SkywardAI"
                    target="_blank"
                    rel="noopener noreferrer">
                    E-Commerce
                  </a>
                </li>
              </ul>
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <h3>SOLUTIONS</h3>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                <li>
                  <a
                    href="https://github.com/SkywardAI"
                    target="_blank"
                    rel="noopener noreferrer">
                    Getting Started
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/SkywardAI"
                    target="_blank"
                    rel="noopener noreferrer">
                    API Reference
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/SkywardAI"
                    target="_blank"
                    rel="noopener noreferrer">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <h3>Showcase</h3>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                <li>
                  <a
                    href="https://github.com/SkywardAI"
                    target="_blank"
                    rel="noopener noreferrer">
                    AI Powered Chatbot
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div style={{ textAlign: 'center', marginTop: '1rem' }}>
            <p>
              © 2024 - {new Date().getFullYear()} SkywardAI. All Rights
              Reserved.
            </p>
          </div>
        </footer>
      </body>
    </html>
  )
}
