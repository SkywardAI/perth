'use client'
import Link from 'next/link'
import React, { useState } from 'react'
import styles from './Layout.module.css'
import { Github, Linkedin, Twitter, Facebook } from 'lucide-react'

export default function Layout({ children }) {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  const handleMouseEnter = (menu: string) => setActiveDropdown(menu)
  const handleMouseLeave = () => setActiveDropdown(null)

  return (
    <html lang="en">
      <body className={styles.body}>
        {/* Header */}
        <header className={styles.header}>
          <div className={styles.navbar}>
            {/* Brand */}
            <div className={styles.brand}>
              <Link href="/">SkywardAI</Link>
            </div>

            {/* Navigation */}
            <nav className={styles.navbarItems}>
              {/* Products Dropdown */}
              <div
                className={styles.navItem}
                onMouseEnter={() => handleMouseEnter('products')}
                onMouseLeave={handleMouseLeave}>
                <button className={styles.navButton}>Products</button>
                {activeDropdown === 'products' && (
                  <ul className={styles.dropdown}>
                    {['AI Powered Chatbot', 'RAG', 'E-Commerce'].map((item) => (
                      <li key={item} className={styles.dropdownItem}>
                        <a
                          href="https://github.com/SkywardAI"
                          target="_blank"
                          rel="noopener noreferrer">
                          {item}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Solutions Dropdown */}
              <div
                className={styles.navItem}
                onMouseEnter={() => handleMouseEnter('solutions')}
                onMouseLeave={handleMouseLeave}>
                <button className={styles.navButton}>Solutions</button>
                {activeDropdown === 'solutions' && (
                  <ul className={styles.dropdown}>
                    {['Getting Started', 'API Reference', 'FAQ'].map((item) => (
                      <li key={item} className={styles.dropdownItem}>
                        <a
                          href="https://github.com/SkywardAI"
                          target="_blank"
                          rel="noopener noreferrer">
                          {item}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Showcase Link */}
              <div className={styles.navItem}>
                <Link href="/showcase">Showcase</Link>
              </div>
            </nav>
          </div>
        </header>

        {/* Main Content */}
        <main className={styles.main}>{children}</main>

        {/* Footer */}
        <footer className={styles.footer}>
          <div className={styles.footerContent}>
            {[
              {
                title: 'Product',
                items: ['AI Powered Chatbot', 'RAG', 'E-Commerce'],
              },
              {
                title: 'Solutions',
                items: ['Getting Started', 'API Reference', 'FAQ'],
              },
              { title: 'Showcase', items: ['AI Powered Chatbot'] },
            ].map((section) => (
              <div key={section.title} className={styles.footerSection}>
                <h3>{section.title}</h3>
                <ul className={styles.footerLinks}>
                  {section.items.map((item) => (
                    <li key={item}>
                      <a
                        href="https://github.com/SkywardAI"
                        target="_blank"
                        rel="noopener noreferrer">
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* 社交媒体链接 */}
          <div className={styles.socialMedia}>
            <a
              href="https://github.com/SkywardAI"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialIcon}>
              <Github size={24} />
            </a>
            <a
              href="https://linkedin.com/company/SkywardAI"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialIcon}>
              <Linkedin size={24} />
            </a>
            <a
              href="https://twitter.com/SkywardAI"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialIcon}>
              <Twitter size={24} />
            </a>
            <a
              href="https://facebook.com/SkywardAI"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialIcon}>
              <Facebook size={24} />
            </a>
          </div>

          {/* 底部版权信息 */}
          <div className={styles.footerBottom}>
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
