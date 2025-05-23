import React from 'react'
import { motion } from 'framer-motion'
import MainFeature from '../components/MainFeature'
import ApperIcon from '../components/ApperIcon'

const Home = () => {
  const features = [
    {
      icon: "Users",
      title: "Multiplayer Racing",
      description: "Race against up to 8 players in real-time"
    },
    {
      icon: "Settings",
      title: "Kart Customization",
      description: "Customize your kart with unique parts and colors"
    },
    {
      icon: "Zap",
      title: "Power-ups",
      description: "Collect and deploy strategic power-ups during races"
    },
    {
      icon: "Trophy",
      title: "Leaderboards",
      description: "Compete for the top spot on global rankings"
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-surface-50 to-surface-100 dark:from-surface-900 dark:to-surface-800">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 racing-gradient opacity-10"></div>
        <div className="container mx-auto px-4 py-12 md:py-20 lg:py-24 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="mb-6 md:mb-8">
              <img 
                src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=400&fit=crop&crop=center" 
                alt="Racing track"
                className="w-full h-48 md:h-64 lg:h-80 object-cover rounded-2xl shadow-racing mx-auto"
              />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-surface-900 dark:text-white mb-4 md:mb-6 font-heading">
              Welcome to{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                KartBlitz
              </span>
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl text-surface-600 dark:text-surface-300 mb-8 md:mb-12 leading-relaxed">
              Experience the thrill of high-speed kart racing with friends. 
              Customize your ride, master the tracks, and become the ultimate champion.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-16 md:mb-20"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group"
              >
                <div className="bg-white dark:bg-surface-800 p-6 md:p-8 rounded-2xl shadow-card hover:shadow-racing transition-all duration-300 transform hover:-translate-y-2 neumorphic dark:neumorphic-dark border border-surface-200 dark:border-surface-700">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center mb-4 md:mb-6 group-hover:scale-110 transition-transform duration-300">
                    <ApperIcon name={feature.icon} className="h-6 w-6 md:h-8 md:w-8 text-white" />
                  </div>
                  <h3 className="text-lg md:text-xl font-semibold text-surface-900 dark:text-white mb-2 md:mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-surface-600 dark:text-surface-400 text-sm md:text-base leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Main Interactive Feature */}
      <section className="py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 md:mb-16"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-surface-900 dark:text-white mb-4 md:mb-6 font-heading">
              Race Control Center
            </h2>
            <p className="text-lg md:text-xl text-surface-600 dark:text-surface-300 max-w-3xl mx-auto leading-relaxed">
              Configure your racing experience, create custom races, and manage your kart setup all in one place.
            </p>
          </motion.div>
          <MainFeature />
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 md:py-20 lg:py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-r from-primary via-accent to-secondary p-8 md:p-12 lg:p-16 rounded-2xl text-center text-white shadow-racing"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 font-heading">
              Ready to Race?
            </h2>
            <p className="text-lg md:text-xl mb-8 md:mb-10 opacity-90 max-w-2xl mx-auto leading-relaxed">
              Join thousands of racers worldwide and experience the ultimate kart racing adventure.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="bg-white text-primary px-8 py-4 rounded-xl font-semibold text-lg hover:bg-surface-100 transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 min-w-[200px]">
                Start Racing
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-primary transition-all duration-300 min-w-[200px]">
                View Tracks
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Home