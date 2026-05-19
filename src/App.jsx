import { Routes, Route } from 'react-router-dom'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import Chatbot from './components/ui/Chatbot'
import Home from './pages/Home'
import Destinations from './pages/Destinations'
import About from './pages/About'

export default function App() {
  return (
    <div className="min-h-screen bg-deep flex flex-col">
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/destinations" element={<Destinations />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
      <Footer />
      <Chatbot />
    </div>
  )
}
