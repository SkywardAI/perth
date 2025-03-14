import Layout from '../components/Layout/layout'
import Chatbot from '../components/Chatbot/Chatbot'

export default function RootLayout({ children }) {
  return (
    <Layout>
      {children}
      <Chatbot />
    </Layout>
  )
}
