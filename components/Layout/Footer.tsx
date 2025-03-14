'use client'
import React from 'react'
import styles from './Footer.module.css'
import { Github, Linkedin, Twitter, Facebook } from 'lucide-react'

export default function Footer() {
  return (
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

      <div className={styles.footerBottom}>
        <p>
          © 2024 - {new Date().getFullYear()} SkywardAI. All Rights Reserved.
        </p>
      </div>
    </footer>
  )
}
