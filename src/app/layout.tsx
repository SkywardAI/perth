// import Layout from '../components/Layout/layout'
// import Chatbot from '../components/Chatbot/Chatbot'

import { GitHubIcon } from 'nextra/icons'

import { Footer, Layout, Navbar } from 'nextra-theme-docs'
import { Banner, Head } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'
import 'nextra-theme-docs/style.css'

export const metadata = {
  // Define your metadata here
  // For more information on metadata API, see: https://nextjs.org/docs/app/building-your-application/optimizing/metadata
}
 
const banner = <Banner 
  storageKey="theme">
  <a href="https://github.com/SkywardAI/perth" target="_blank">🎉 SkywardAI perth is under active development. Read more →</a>
  </Banner>

const navbar = (
  <Navbar
    logo={<b>SkywardAI</b>}
    projectLink="https://github.com/SkywardAI/perth"
    projectIcon={
      <GitHubIcon height={"24"}></GitHubIcon>
    }

    align='right'
  />
)

const footer = <Footer>Apache 2.0 {new Date().getFullYear()} © SkywardAI.</Footer>

export default async function RootLayout({ children }) {
  return (
    <html
      // Not required, but good for SEO
      lang="en"
      // Required to be set
      dir="ltr"
      // Suggested by `next-themes` package https://github.com/pacocoursey/next-themes#with-app
      suppressHydrationWarning
    >
      <Head>

      </Head>
      <body>
      <Layout

      navigation={{
        prev: true,
        next: true
      }}

      banner={banner}
      navbar={navbar}
      pageMap={await getPageMap()}
      footer={footer}
    >
      {children}
      {/* <Chatbot /> */}
    </Layout>
      </body>
    </html>
  )
}
