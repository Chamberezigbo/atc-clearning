import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import CleaningLoader from './components/CleaningLoader'
import CleanSwipeLoader from './components/CleanSwipeLoader'
import Home from './pages/Home'
import TestimonialsPage from './pages/TestimonialsPage'

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [isExiting, setIsExiting] = useState(false)

  useEffect(() => {
    const startExitTimer = window.setTimeout(() => setIsExiting(true), 1200)
    const removeLoaderTimer = window.setTimeout(() => setIsLoading(false), 1550)

    return () => {
      window.clearTimeout(startExitTimer)
      window.clearTimeout(removeLoaderTimer)
    }
  }, [])

  const isSwipePreview = new URLSearchParams(window.location.search).get('loader') === 'swipe'

  return (
    <BrowserRouter>
      {isLoading && (isSwipePreview
        ? <CleanSwipeLoader isExiting={isExiting} />
        : <CleaningLoader isExiting={isExiting} />)}
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/testimonials" element={<TestimonialsPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
