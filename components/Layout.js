import Link from 'next/link'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function Layout({ children }) {
  return (
    <div className="layout">
      <header>
        <Navbar />
      </header>
      <div className="page-content">
        { children }
      </div>

      <Footer/>
    </div>
  )
}