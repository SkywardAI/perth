'use client'
import Link from 'next/link'
import React, { useState } from 'react'
import styles from './Header.module.css'
import { ChevronDown } from 'lucide-react'

export default function Header() {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  const handleMouseEnter = (menu: string) => setActiveDropdown(menu)
  const handleMouseLeave = () => setActiveDropdown(null)

  return (
    <header className={styles.header}>
      <div className={styles.navbar}>
        {/* 左侧：品牌 + 导航菜单 */}
        <div className={styles.navLeft}>
          {/* Brand */}
          <div className={styles.brand}>
            <Link href="/">SkywardAI</Link>
          </div>

          {/* Navigation */}
          <nav className={styles.navbarItems}>
            <div
              className={styles.navItem}
              onMouseEnter={() => handleMouseEnter('products')}
              onMouseLeave={handleMouseLeave}>
              <button className={styles.navButton}>
                Products{' '}
                <ChevronDown size={14} className={styles.dropdownIcon} />
              </button>
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

            <div
              className={styles.navItem}
              onMouseEnter={() => handleMouseEnter('solutions')}
              onMouseLeave={handleMouseLeave}>
              <button className={styles.navButton}>
                Solutions{' '}
                <ChevronDown size={14} className={styles.dropdownIcon} />
              </button>
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

            <div className={styles.navItem}>
              <Link href="/showcase">Showcase</Link>
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}
