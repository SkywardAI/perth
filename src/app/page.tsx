// import Carousel from '../components/Carousel/Carousel'
// import { ArrowRightIcon } from '../components/icons'
import type { Metadata } from 'next'
import Image from 'next/image'
import { Link } from 'nextra-theme-docs'
// import { MdxIcon } from 'nextra/icons'
import docsCardDark from 'public/assets/card-1.dark.png'
import docsCard from 'public/assets/card-1.png'
import { Feature, Features } from './_components/features'
// import { MotionDiv, MotionH3 } from './_components/framer-motion'
// import { I18n } from './_components/i18n-demo'
import styles from './page.module.css'
import './page.css'
import type { FC } from 'react'

export const metadata: Metadata = {
  description:
    'Build fast, customizable, and content-rich websites with Nextra. Powered by Next.js, it offers seamless Markdown support, customizable themes, file conventions, and easy integration with MDX, making it perfect for documentation, blogs, and static websites.'
}

const IndexPage: FC = () => {
  return (
    <div className='home-content'>
      <div className='headLine'>
      <h1 className="headline">
          Make beautiful websites <br className="max-sm:hidden" />
          with Next.js & MDX
        </h1>
        <p className="subtitle">
          Simple, powerful and flexible site generation framework{' '}
          <br className="max-md:hidden" />
          with everything you love from{' '}
          <Link href="https://nextjs.org" className="text-current">
            Next.js
          </Link>
          .
        </p>
        <p className="subtitle">
          <Link className={styles.cta} href="/docs">
            Get started <span>→</span>
          </Link>
        </p>
      </div>

      <div className="features-container x:border-b nextra-border">
        <div className="content-container">
          <Features>
            <Feature index={0} large centered>
            <Image src={docsCard} alt="Background" loading="eager" />
              <Image
                src={docsCardDark}
                alt="Background (Dark)"
                loading="eager"
              />

              <h3>
                Full-power documentation <br className="show-on-mobile" />
                in minutes
              </h3>
            </Feature>
            <Feature index={1} centered>
              <h3>
                Links and images are <br className="show-on-mobile" />
                always <span className="font-light">optimized</span>
              </h3>
              <p className="mb-8 text-start">
                Nextra automatically converts Markdown links and images to use{' '}
                <Link href="https://nextjs.org/docs/routing/introduction#linking-between-pages">
                  Next.js Link
                </Link>{' '}
                and{' '}
                <Link href="https://nextjs.org/docs/basic-features/image-optimization#local-images">
                  Next.js Image
                </Link>{' '}
                when possible. No slow navigation or layout shift.
              </p>
              <div>
                <div className={styles.optimization}>
                  <div style={{ fontSize: '.9rem' }} className="leading-8">
                    <code>[Learn more](/more)</code>
                    <br />
                    <code>![Hero](/hero.png)</code>
                  </div>
                </div>
                {/* <ArrowRightIcon
                  width="1.2em"
                  className="mx-auto my-6 rotate-90 text-neutral-400"
                /> */}
                <div className={styles.optimization}>
                  <div style={{ fontSize: '.9rem' }} className="leading-8">
                    <code>{'<Link .../>'}</code>
                    <br />
                    <code>{'<Image .../>'}</code>
                  </div>
                </div>
              </div>
            </Feature>
          </Features>
          
        </div>

      </div>

    </div>
  )
}

export default IndexPage