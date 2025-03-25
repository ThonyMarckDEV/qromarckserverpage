import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Network, 
  Server, 
  Cpu, 
  Cloud, 
  Activity,
  RefreshCw,
  Check,
  X
} from 'lucide-react'

function App() {
  const [selectedTool, setSelectedTool] = useState(null)
  const [testResults, setTestResults] = useState({})
  const [loading, setLoading] = useState(false)

  const SERVER_URL = 'https://qromarckserver.thonymarckdev.online'

  const performPing = async (host) => {
    const startTime = performance.now()
    try {
      const response = await fetch(host, { 
        method: 'HEAD',
        mode: 'no-cors',
        cache: 'no-store'
      })
      const endTime = performance.now()
      return {
        success: true,
        time: (endTime - startTime).toFixed(2)
      }
    } catch (error) {
      return {
        success: false,
        error: error.message
      }
    }
  }

  const runServerTest = async (testName, testFunction) => {
    setLoading(true)
    setSelectedTool(testName)
    setTestResults({})

    try {
      const result = await testFunction()
      setTestResults({
        [testName]: result
      })
    } catch (error) {
      setTestResults({
        [testName]: {
          success: false,
          error: error.message
        }
      })
    } finally {
      setLoading(false)
    }
  }

  const renderTestResult = (testName) => {
    const result = testResults[testName]
    if (!result) return null

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`
          p-4 rounded-xl text-center mt-4
          ${result.success 
            ? 'bg-green-900/30 border-green-500' 
            : 'bg-red-900/30 border-red-500'}
          border
        `}
      >
        <div className="flex justify-center items-center space-x-2">
          {result.success ? <Check className="text-green-400" /> : <X className="text-red-400" />}
          <h3 className="text-xl font-semibold">
            {testName} {result.success ? 'Successful' : 'Failed'}
          </h3>
        </div>
        {result.time && (
          <p className="text-white mt-2">
            Response Time: {result.time} ms
          </p>
        )}
        {result.error && (
          <p className="text-white mt-2">
            Error: {result.error}
          </p>
        )}
      </motion.div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-blue-900 to-purple-900 overflow-hidden relative flex items-center justify-center p-4">
      <motion.div 
        className="relative z-10 w-full max-w-4xl bg-black/40 backdrop-blur-3xl rounded-3xl p-8 md:p-12"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{
          opacity: 1,
          scale: 1
        }}
        transition={{
          duration: 1.5,
          type: "spring"
        }}
      >
        {/* Server Info Section */}
        <motion.h1
          className="text-4xl md:text-6xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 text-center"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, type: "spring" }}
        >
          QROMARCK SERVER
        </motion.h1>

        {/* Server Details Grid */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, type: "spring" }}
        >
          {[
            { icon: Server, label: "Sistema", value: "Ubuntu 24.02 LTS" },
            { icon: Cpu, label: "Núcleos", value: "6 Cores" },
            { icon: Cloud, label: "Estado", value: "Operativo" },
            { icon: Activity, label: "RAM", value: "8 GB" }
          ].map((item) => {
            const Icon = item.icon
            return (
              <motion.div
                key={item.label}
                className="bg-blue-900/20 p-4 rounded-xl border border-blue-500/30 flex items-center space-x-3"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Icon className="text-blue-400 w-6 h-6" />
                <div>
                  <div className="text-blue-300 text-sm">{item.label}</div>
                  <div className="text-xl font-bold text-white">{item.value}</div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Ping Test Section */}
        <motion.div className="mb-8">
          <h2 className="text-2xl font-semibold text-white mb-4 text-center">
            Ping Test
          </h2>
          <div className="grid grid-cols-1 gap-4">
            <motion.button
              className={`
                flex flex-col items-center justify-center 
                p-4 rounded-xl 
                ${selectedTool === 'Ping' 
                  ? 'bg-blue-600/50 border-blue-500' 
                  : 'bg-blue-900/20 border-blue-500/30 hover:bg-blue-900/40'}
                border transition-all
              `}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => runServerTest("Ping", () => performPing(SERVER_URL))}
            >
              <Network className="w-8 h-8 text-blue-400 mb-2" />
              <span className="text-white">Ping Server</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Test Results Section */}
        {Object.keys(testResults).map(testName => renderTestResult(testName))}

        {/* Loading Indicator */}
        {loading && (
          <motion.div
            className="flex justify-center items-center space-x-2 text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <RefreshCw className="animate-spin" />
            <span>Running Ping Test...</span>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}

export default App;