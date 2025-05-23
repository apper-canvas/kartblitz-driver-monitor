import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import ApperIcon from '../components/ApperIcon'

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-surface-50 to-surface-100 dark:from-surface-900 dark:to-surface-800 flex items-center justify-center px-4">
      <div className="text-center max-w-lg mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <div className="w-32 h-32 mx-auto mb-8 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center shadow-racing">
            <ApperIcon name="AlertTriangle" className="h-16 w-16 text-white" />
          </div>
          
          <h1 className="text-6xl md:text-8xl font-bold text-surface-900 dark:text-white mb-4 font-heading">
            404
          </h1>
          
          <h2 className="text-2xl md:text-3xl font-semibold text-surface-800 dark:text-surface-200 mb-4">
            Track Not Found
          </h2>
          
          <p className="text-lg text-surface-600 dark:text-surface-400 mb-8 leading-relaxed">
            Looks like you've taken a wrong turn on the race track. 
            Let's get you back to the starting line!
          </p>
          
          <Link 
            to="/"
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary to-accent text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-racing transition-all duration-300 transform hover:-translate-y-1"
          >
            <ApperIcon name="Home" className="h-5 w-5" />
            <span>Back to Home</span>
          </Link>
        </motion.div>
      </div>
    </div>
  )
}

export default NotFound