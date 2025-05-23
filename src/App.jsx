import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import ApperIcon from './components/ApperIcon'

function App() {
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark' : ''}`}>
      <Router>
        {/* Header with Dark Mode Toggle */}
        <header className="bg-gradient-to-r from-primary via-accent to-secondary p-4 shadow-racing">
          <div className="container mx-auto flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg">
                <ApperIcon name="Zap" className="h-6 w-6 text-primary" />
              </div>
              <h1 className="text-white font-bold text-xl md:text-2xl lg:text-3xl font-heading tracking-tight">
                KartBlitz
              </h1>
            </div>
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-all duration-200 backdrop-blur-sm"
            >
              <ApperIcon 
                name={darkMode ? "Sun" : "Moon"} 
                className="h-5 w-5 text-white" 
              />
            </button>
          </div>
        </header>

        {/* Main Content */}
        <main className="bg-surface-50 dark:bg-surface-900 min-h-screen transition-colors duration-300">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </Router>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={darkMode ? "dark" : "light"}
        className="z-50"
        toastClassName="shadow-lg border border-surface-200 dark:border-surface-700"
      />
    </div>
  )
}

export default App