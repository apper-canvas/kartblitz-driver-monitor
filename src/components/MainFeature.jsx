import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import ApperIcon from './ApperIcon'

const MainFeature = () => {
  const [activeTab, setActiveTab] = useState('race')
  const [raceConfig, setRaceConfig] = useState({
    track: 'mario_circuit',
    laps: 3,
    players: 4,
    difficulty: 'medium',
    powerUps: true
  })
  const [kartConfig, setKartConfig] = useState({
    chassis: 'standard',
    wheels: 'normal',
    color: '#FF6B35',
    player_name: ''
  })
  const [isRacing, setIsRacing] = useState(false)
  const [raceTime, setRaceTime] = useState(0)
  const [currentLap, setCurrentLap] = useState(1)
  const [racePosition, setRacePosition] = useState(1)
  const [raceProgress, setRaceProgress] = useState(0)
  const [showResults, setShowResults] = useState(false)
  const [raceResults, setRaceResults] = useState(null)
  const [lastLapTime, setLastLapTime] = useState(0)

  const tracks = [
    { id: 'mario_circuit', name: 'Speed Circuit', difficulty: 'Easy', laps: 3 },
    { id: 'rainbow_road', name: 'Rainbow Road', difficulty: 'Hard', laps: 5 },
    { id: 'bowser_castle', name: 'Fire Castle', difficulty: 'Expert', laps: 4 },
    { id: 'coconut_mall', name: 'Shopping Mall', difficulty: 'Medium', laps: 3 }
  ]

  const kartParts = {
    chassis: [
      { id: 'standard', name: 'Standard Kart', speed: 3, acceleration: 3, handling: 3 },
      { id: 'racing', name: 'Racing Kart', speed: 5, acceleration: 2, handling: 4 },
      { id: 'heavy', name: 'Heavy Kart', speed: 4, acceleration: 1, handling: 5 },
      { id: 'light', name: 'Light Kart', speed: 2, acceleration: 5, handling: 3 }
    ],
    wheels: [
      { id: 'normal', name: 'Normal Tires', grip: 3, durability: 4 },
      { id: 'racing', name: 'Racing Slicks', grip: 5, durability: 2 },
      { id: 'offroad', name: 'Off-Road Tires', grip: 4, durability: 5 },
      { id: 'drift', name: 'Drift Tires', grip: 2, durability: 3 }
    ]
  }

  // Race timer effect
  useEffect(() => {
    let interval = null
    if (isRacing) {
      interval = setInterval(() => {
        setRaceTime(time => time + 1)
        
        // Simulate race progress
        setRaceProgress(prev => {
          const newProgress = prev + (100 / (raceConfig.laps * 60)) // Approximate 1 minute per lap
          
          // Check for lap completion
          const lapProgress = (newProgress / 100) * raceConfig.laps
          const newLap = Math.floor(lapProgress) + 1
          
          if (newLap > currentLap && newLap <= raceConfig.laps) {
            setCurrentLap(newLap)
            setLastLapTime(raceTime)
            toast.success(`Lap ${currentLap} completed! Time: ${formatTime(raceTime - lastLapTime)}`)
            
            // Simulate position changes
            const positionChange = Math.random()
            if (positionChange > 0.7 && racePosition > 1) {
              setRacePosition(pos => pos - 1)
              toast.info(`Great driving! You're now in position ${racePosition - 1}!`)
            } else if (positionChange < 0.3 && racePosition < raceConfig.players) {
              setRacePosition(pos => pos + 1)
              toast.warning(`Watch out! You dropped to position ${racePosition + 1}`)
            }
          }
          
          // Check for race completion
          if (newProgress >= 100) {
            completeRace()
          }
          
          return Math.min(newProgress, 100)
        })
      }, 1000)
    } else if (!isRacing && raceTime !== 0) {
      clearInterval(interval)
    }
    return () => clearInterval(interval)
  }, [isRacing, raceTime])

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const completeRace = () => {
    setIsRacing(false)
    const finalResults = {
      track: tracks.find(t => t.id === raceConfig.track)?.name,
      finalPosition: racePosition,
      totalTime: formatTime(raceTime),
      totalPlayers: raceConfig.players,
      lapsCompleted: raceConfig.laps,
      averageLapTime: formatTime(Math.floor(raceTime / raceConfig.laps))
    }
    setRaceResults(finalResults)
    setShowResults(true)
    
    toast.success(`🏁 Race completed! You finished in position ${racePosition}/${raceConfig.players}!`)
  }

  const handleStartRace = () => {
    if (!kartConfig.player_name.trim()) {
      toast.error("Please enter your racer name!")
      return
    }

    setIsRacing(true)
    setRaceTime(0)
    setCurrentLap(1)
    setRacePosition(Math.floor(Math.random() * Math.min(4, raceConfig.players)) + 1) // Start in a random position 1-4
    setRaceProgress(0)
    setLastLapTime(0)
    toast.success(`Race started on ${tracks.find(t => t.id === raceConfig.track)?.name}!`)
    toast.info(`You're starting in position ${racePosition}/${raceConfig.players}`)
  }

  const handleStopRace = () => {
    setIsRacing(false)
    setRaceTime(0)
    setCurrentLap(1)
    setRacePosition(1)
    setRaceProgress(0)
    setLastLapTime(0)
    toast.info("Race stopped")
  }

  const handleNewRace = () => {
    setShowResults(false)
    setRaceResults(null)
  }

  const handleConfigChange = (section, field, value) => {
    if (section === 'race') {
      setRaceConfig(prev => ({ ...prev, [field]: value }))
    } else if (section === 'kart') {
      setKartConfig(prev => ({ ...prev, [field]: value }))
    }
  }

  const getSelectedChassis = () => kartParts.chassis.find(c => c.id === kartConfig.chassis)
  const getSelectedWheels = () => kartParts.wheels.find(w => w.id === kartConfig.wheels)

  const tabVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 }
  }

  return (
    <>
      {/* Race Results Modal */}
      <AnimatePresence>
        {showResults && raceResults && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowResults(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white dark:bg-surface-800 rounded-2xl p-8 max-w-md w-full shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                  <ApperIcon name="Trophy" className="h-10 w-10 text-white" />
                </div>
                
                <h3 className="text-2xl font-bold text-surface-900 dark:text-white mb-2">
                  Race Complete!
                </h3>
                
                <div className="text-6xl font-bold mb-4">
                  {raceResults.finalPosition === 1 && <span className="text-yellow-500">🥇</span>}
                  {raceResults.finalPosition === 2 && <span className="text-gray-400">🥈</span>}
                  {raceResults.finalPosition === 3 && <span className="text-amber-600">🥉</span>}
                  {raceResults.finalPosition > 3 && <span className="text-surface-500">🏁</span>}
                </div>
                
                <div className="space-y-4 text-left bg-surface-50 dark:bg-surface-700 p-4 rounded-xl">
                  <div className="flex justify-between">
                    <span className="text-surface-600 dark:text-surface-400">Track:</span>
                    <span className="font-semibold text-surface-900 dark:text-white">{raceResults.track}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-surface-600 dark:text-surface-400">Final Position:</span>
                    <span className="font-semibold text-surface-900 dark:text-white">
                      {raceResults.finalPosition}/{raceResults.totalPlayers}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-surface-600 dark:text-surface-400">Total Time:</span>
                    <span className="font-semibold text-surface-900 dark:text-white">{raceResults.totalTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-surface-600 dark:text-surface-400">Laps:</span>
                    <span className="font-semibold text-surface-900 dark:text-white">{raceResults.lapsCompleted}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-surface-600 dark:text-surface-400">Avg Lap Time:</span>
                    <span className="font-semibold text-surface-900 dark:text-white">{raceResults.averageLapTime}</span>
                  </div>
                </div>
                
                <div className="flex gap-3 mt-6">
                  <button
                    onClick={handleNewRace}
                    className="flex-1 bg-gradient-to-r from-primary to-accent text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
                  >
                    New Race
                  </button>
                  <button
                    onClick={() => setShowResults(false)}
                    className="flex-1 border-2 border-surface-300 dark:border-surface-600 text-surface-700 dark:text-surface-300 px-6 py-3 rounded-xl font-semibold hover:border-primary hover:text-primary transition-all duration-300"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    <div className="w-full max-w-6xl mx-auto">
      {/* Racing Status Display */}
      <AnimatePresence>
        {isRacing && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="mb-8 p-6 bg-gradient-to-r from-primary to-accent rounded-2xl text-white shadow-racing"
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center animate-pulse">
                  <ApperIcon name="Zap" className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Race in Progress</h3>
                  <p className="opacity-90">{tracks.find(t => t.id === raceConfig.track)?.name}</p>
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{formatTime(raceTime)}</div>
                <div className="text-sm opacity-90">Current Time</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">Lap {currentLap}/{raceConfig.laps}</div>
                <div className="text-sm opacity-90">Current Lap</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">P{racePosition}</div>
                <div className="text-sm opacity-90">Position</div>
              </div>
              <button
                onClick={handleStopRace}
                className="bg-white/20 hover:bg-white/30 px-6 py-3 rounded-xl font-semibold transition-colors duration-300"
              >
                Stop Race
              </button>
            </div>
            
            {/* Race Progress Bar */}
            <div className="mt-6">
              <div className="flex justify-between text-sm opacity-90 mb-2">
                <span>Race Progress</span>
                <span>{Math.round(raceProgress)}%</span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-3">
                <motion.div
                  className="bg-white h-3 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${raceProgress}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
              <div className="flex justify-between text-xs opacity-75 mt-1">
                <span>Start</span>
                <span>Finish</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Control Panel */}
      <div className="bg-white dark:bg-surface-800 rounded-2xl shadow-racing border border-surface-200 dark:border-surface-700 overflow-hidden">
        {/* Tab Navigation */}
        <div className="flex border-b border-surface-200 dark:border-surface-700">
          {[
            { id: 'race', label: 'Race Setup', icon: 'Settings' },
            { id: 'kart', label: 'Kart Config', icon: 'Car' },
            { id: 'stats', label: 'Race Stats', icon: 'BarChart3' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 px-4 py-4 md:px-6 md:py-6 text-center font-semibold transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-primary to-accent text-white'
                  : 'text-surface-600 dark:text-surface-400 hover:text-surface-900 dark:hover:text-white hover:bg-surface-50 dark:hover:bg-surface-700'
              }`}
            >
              <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
                <ApperIcon name={tab.icon} className="h-5 w-5" />
                <span className="text-sm md:text-base">{tab.label}</span>
              </div>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="p-6 md:p-8 lg:p-10">
          <AnimatePresence mode="wait">
            {activeTab === 'race' && (
              <motion.div
                key="race"
                variants={tabVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-2xl md:text-3xl font-bold text-surface-900 dark:text-white mb-6 md:mb-8">
                  Race Configuration
                </h3>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
                  {/* Track Selection */}
                  <div className="space-y-4">
                    <label className="block text-lg font-semibold text-surface-900 dark:text-white">
                      Select Track
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {tracks.map((track) => (
                        <button
                          key={track.id}
                          onClick={() => handleConfigChange('race', 'track', track.id)}
                          className={`p-4 rounded-xl border-2 transition-all duration-300 text-left ${
                            raceConfig.track === track.id
                              ? 'border-primary bg-primary/10 shadow-lg'
                              : 'border-surface-200 dark:border-surface-700 hover:border-primary/50'
                          }`}
                        >
                          <div className="font-semibold text-surface-900 dark:text-white">
                            {track.name}
                          </div>
                          <div className="text-sm text-surface-600 dark:text-surface-400">
                            {track.difficulty} • {track.laps} laps
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Race Settings */}
                  <div className="space-y-6">
                    <div>
                      <label className="block text-lg font-semibold text-surface-900 dark:text-white mb-3">
                        Number of Laps: {raceConfig.laps}
                      </label>
                      <input
                        type="range"
                        min="1"
                        max="10"
                        value={raceConfig.laps}
                        onChange={(e) => handleConfigChange('race', 'laps', parseInt(e.target.value))}
                        className="w-full h-2 bg-surface-200 rounded-lg appearance-none cursor-pointer slider"
                      />
                    </div>

                    <div>
                      <label className="block text-lg font-semibold text-surface-900 dark:text-white mb-3">
                        Players: {raceConfig.players}
                      </label>
                      <input
                        type="range"
                        min="2"
                        max="8"
                        value={raceConfig.players}
                        onChange={(e) => handleConfigChange('race', 'players', parseInt(e.target.value))}
                        className="w-full h-2 bg-surface-200 rounded-lg appearance-none cursor-pointer slider"
                      />
                    </div>

                    <div>
                      <label className="block text-lg font-semibold text-surface-900 dark:text-white mb-3">
                        Difficulty
                      </label>
                      <select
                        value={raceConfig.difficulty}
                        onChange={(e) => handleConfigChange('race', 'difficulty', e.target.value)}
                        className="w-full p-3 border border-surface-300 dark:border-surface-600 rounded-xl bg-white dark:bg-surface-700 text-surface-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                      >
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                        <option value="expert">Expert</option>
                      </select>
                    </div>

                    <div className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        id="powerups"
                        checked={raceConfig.powerUps}
                        onChange={(e) => handleConfigChange('race', 'powerUps', e.target.checked)}
                        className="w-5 h-5 text-primary bg-white border-surface-300 rounded focus:ring-primary"
                      />
                      <label htmlFor="powerups" className="text-lg font-semibold text-surface-900 dark:text-white">
                        Enable Power-ups
                      </label>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'kart' && (
              <motion.div
                key="kart"
                variants={tabVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-2xl md:text-3xl font-bold text-surface-900 dark:text-white mb-6 md:mb-8">
                  Kart Customization
                </h3>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
                  {/* Kart Preview */}
                  <div className="order-2 lg:order-1">
                    <div className="bg-gradient-to-br from-surface-100 to-surface-200 dark:from-surface-700 dark:to-surface-800 p-6 md:p-8 rounded-2xl">
                      <h4 className="text-xl font-bold text-surface-900 dark:text-white mb-4">
                        Kart Preview
                      </h4>
                      <div className="text-center">
                        <div 
                          className="w-32 h-32 mx-auto rounded-2xl mb-4 flex items-center justify-center shadow-lg"
                          style={{ backgroundColor: kartConfig.color }}
                        >
                          <ApperIcon name="Car" className="h-16 w-16 text-white" />
                        </div>
                        <div className="text-sm text-surface-600 dark:text-surface-400">
                          <p>Chassis: {getSelectedChassis()?.name}</p>
                          <p>Wheels: {getSelectedWheels()?.name}</p>
                        </div>
                      </div>

                      {/* Stats Display */}
                      <div className="mt-6 space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-surface-700 dark:text-surface-300">Speed</span>
                          <div className="w-24 bg-surface-200 dark:bg-surface-600 rounded-full h-2">
                            <div 
                              className="bg-primary h-2 rounded-full"
                              style={{ width: `${(getSelectedChassis()?.speed || 0) * 20}%` }}
                            ></div>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-surface-700 dark:text-surface-300">Acceleration</span>
                          <div className="w-24 bg-surface-200 dark:bg-surface-600 rounded-full h-2">
                            <div 
                              className="bg-accent h-2 rounded-full"
                              style={{ width: `${(getSelectedChassis()?.acceleration || 0) * 20}%` }}
                            ></div>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-surface-700 dark:text-surface-300">Handling</span>
                          <div className="w-24 bg-surface-200 dark:bg-surface-600 rounded-full h-2">
                            <div 
                              className="bg-secondary h-2 rounded-full"
                              style={{ width: `${(getSelectedChassis()?.handling || 0) * 20}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Customization Options */}
                  <div className="order-1 lg:order-2 space-y-6">
                    <div>
                      <label className="block text-lg font-semibold text-surface-900 dark:text-white mb-3">
                        Racer Name
                      </label>
                      <input
                        type="text"
                        value={kartConfig.player_name}
                        onChange={(e) => handleConfigChange('kart', 'player_name', e.target.value)}
                        placeholder="Enter your racer name"
                        className="w-full p-3 border border-surface-300 dark:border-surface-600 rounded-xl bg-white dark:bg-surface-700 text-surface-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-lg font-semibold text-surface-900 dark:text-white mb-3">
                        Chassis Type
                      </label>
                      <div className="grid grid-cols-1 gap-2">
                        {kartParts.chassis.map((chassis) => (
                          <button
                            key={chassis.id}
                            onClick={() => handleConfigChange('kart', 'chassis', chassis.id)}
                            className={`p-3 rounded-xl border-2 transition-all duration-300 text-left ${
                              kartConfig.chassis === chassis.id
                                ? 'border-primary bg-primary/10'
                                : 'border-surface-200 dark:border-surface-700 hover:border-primary/50'
                            }`}
                          >
                            <div className="font-semibold text-surface-900 dark:text-white">
                              {chassis.name}
                            </div>
                            <div className="text-sm text-surface-600 dark:text-surface-400">
                              Speed: {chassis.speed}/5 • Acceleration: {chassis.acceleration}/5 • Handling: {chassis.handling}/5
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-lg font-semibold text-surface-900 dark:text-white mb-3">
                        Wheel Type
                      </label>
                      <div className="grid grid-cols-1 gap-2">
                        {kartParts.wheels.map((wheel) => (
                          <button
                            key={wheel.id}
                            onClick={() => handleConfigChange('kart', 'wheels', wheel.id)}
                            className={`p-3 rounded-xl border-2 transition-all duration-300 text-left ${
                              kartConfig.wheels === wheel.id
                                ? 'border-primary bg-primary/10'
                                : 'border-surface-200 dark:border-surface-700 hover:border-primary/50'
                            }`}
                          >
                            <div className="font-semibold text-surface-900 dark:text-white">
                              {wheel.name}
                            </div>
                            <div className="text-sm text-surface-600 dark:text-surface-400">
                              Grip: {wheel.grip}/5 • Durability: {wheel.durability}/5
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-lg font-semibold text-surface-900 dark:text-white mb-3">
                        Kart Color
                      </label>
                      <div className="flex flex-wrap gap-3">
                        {['#FF6B35', '#2E86AB', '#F7931E', '#A23B72', '#F18F01', '#C73E1D'].map((color) => (
                          <button
                            key={color}
                            onClick={() => handleConfigChange('kart', 'color', color)}
                            className={`w-12 h-12 rounded-xl border-4 transition-all duration-300 ${
                              kartConfig.color === color ? 'border-white shadow-lg scale-110' : 'border-surface-300'
                            }`}
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'stats' && (
              <motion.div
                key="stats"
                variants={tabVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-2xl md:text-3xl font-bold text-surface-900 dark:text-white mb-6 md:mb-8">
                  Race Statistics
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    { label: 'Races Completed', value: '12', icon: 'Flag' },
                    { label: 'Best Lap Time', value: '1:23.45', icon: 'Timer' },
                    { label: 'Wins', value: '8', icon: 'Trophy' },
                    { label: 'Win Rate', value: '67%', icon: 'Target' }
                  ].map((stat, index) => (
                    <div key={index} className="bg-gradient-to-br from-surface-100 to-surface-200 dark:from-surface-700 dark:to-surface-800 p-6 rounded-2xl">
                      <div className="flex items-center space-x-3 mb-2">
                        <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                          <ApperIcon name={stat.icon} className="h-5 w-5 text-white" />
                        </div>
                        <div className="text-2xl font-bold text-surface-900 dark:text-white">
                          {stat.value}
                        </div>
                      </div>
                      <div className="text-sm text-surface-600 dark:text-surface-400">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 bg-surface-50 dark:bg-surface-700 p-6 rounded-2xl">
                  <h4 className="text-xl font-bold text-surface-900 dark:text-white mb-4">
                    Recent Race History
                  </h4>
                  <div className="space-y-3">
                    {[
                      { track: 'Speed Circuit', position: '1st', time: '4:12.34' },
                      { track: 'Rainbow Road', position: '3rd', time: '8:45.12' },
                      { track: 'Fire Castle', position: '2nd', time: '6:23.78' }
                    ].map((race, index) => (
                      <div key={index} className="flex justify-between items-center p-3 bg-white dark:bg-surface-800 rounded-lg">
                        <div>
                          <div className="font-semibold text-surface-900 dark:text-white">
                            {race.track}
                          </div>
                          <div className="text-sm text-surface-600 dark:text-surface-400">
                            Position: {race.position}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold text-surface-900 dark:text-white">
                            {race.time}
                          </div>
                          <div className="text-sm text-surface-600 dark:text-surface-400">
                            Total Time
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Action Buttons */}
        <div className="px-6 py-6 md:px-8 md:py-8 lg:px-10 lg:py-10 bg-surface-50 dark:bg-surface-700 border-t border-surface-200 dark:border-surface-600">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {!isRacing ? (
              <button
                onClick={handleStartRace}
                disabled={!kartConfig.player_name.trim()}
                className="flex items-center justify-center space-x-2 bg-gradient-to-r from-primary to-accent text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-racing transition-all duration-300 transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none min-w-[200px]"
              >
                <ApperIcon name="Play" className="h-5 w-5" />
                <span>Start Race</span>
              </button>
            ) : (
              <button
                onClick={handleStopRace}
                className="flex items-center justify-center space-x-2 bg-red-500 hover:bg-red-600 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:-translate-y-1 min-w-[200px]"
              >
                <ApperIcon name="Square" className="h-5 w-5" />
                <span>Stop Race</span>
              </button>
            )}
            
            <button
              onClick={() => {
                setRaceConfig({
                  track: 'mario_circuit',
                  laps: 3,
                  players: 4,
                  difficulty: 'medium',
                  powerUps: true
                })
                setKartConfig({
                  chassis: 'standard',
                  wheels: 'normal',
                  color: '#FF6B35',
                  player_name: ''
                })
                toast.info("Settings reset to defaults")
              }}
              className="flex items-center justify-center space-x-2 border-2 border-surface-300 dark:border-surface-600 text-surface-700 dark:text-surface-300 hover:border-primary hover:text-primary px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 min-w-[200px]"
            >
              <ApperIcon name="RotateCcw" className="h-5 w-5" />
              <span>Reset</span>
            </button>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default MainFeature