'use client'
import React, { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import styles from './footer.module.css'
import { Github, Linkedin, Twitter, Newspaper } from 'lucide-react'

export default function Footer() {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <footer
      className={
        resolvedTheme === 'dark' ? styles.footerDark : styles.footerLight
      }>
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
        ].map((section) => (
          <div key={section.title} className={styles.footerSection}>
            <h2>{section.title}</h2>
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

      <div className={styles.socialMedia}>
        <a
          href="https://github.com/SkywardAI"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.socialIcon}>
          <Github size={24} />
        </a>
        <a
          href="https://www.linkedin.com/in/bowen-li-10101197/"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.socialIcon}>
          <Linkedin size={24} />
        </a>
        <a
          href="https://x.com/AisukoLi"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.socialIcon}>
          <Twitter size={24} />
        </a>
        <a
          href="https://aisuko.substack.com"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.socialIcon}>
          <Newspaper size={24} />
        </a>
      </div>

      <div className={styles.footerBottom}>
        <p>
          © 2024 - {new Date().getFullYear()} SkywardAI. All Rights Reserved.
        </p>
      </div>
    </footer>
  )
}
