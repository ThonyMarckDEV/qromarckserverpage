import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Network, 
  Server, 
  Cpu, 
  Database, 
  Terminal, 
  Cloud, 
  Activity,
  RefreshCw,
  Check,
  X
} from 'lucide-react'

function App() {
  const [selectedTool, setSelectedTool] = useState(null)
  const [pingResult, setPingResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const serverTools = [
    { 
      icon: Network, 
      label: "Ping", 
      action: () => simulatePing("qromarck.com") 
    },
    { 
      icon: Terminal, 
      label: "SSH Test", 
      action: () => alert("SSH Connection Test") 
    },
    { 
      icon: Database, 
      label: "DB Check", 
      action: () => alert("Database Connection Check") 
    },
    { 
      icon: Cpu, 
      label: "Load Test", 
      action: () => alert("Server Load Simulation") 
    }
  ]

  const simulatePing = (host) => {
    setLoading(true)
    setPingResult(null)
    setSelectedTool("Ping")

    // Simulated ping
    setTimeout(() => {
      const success = Math.random() > 0.2
      setPingResult({
        host: host,
        success: success,
        time: success ? (Math.random() * 50).toFixed(2) : null
      })
      setLoading(false)
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-blue-900 to-purple-900 overflow-hidden relative flex items-center justify-center p-4">
      {/* Background animation (same as previous version) */}
      <motion.div 
        className="absolute inset-0 overflow-hidden z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: 2 }}
      >
        {[...Array(30)].map((_, index) => (
          <motion.div
            key={index}
            className="absolute rounded-full blur-3xl opacity-20"
            style={{
              width: `${100 + Math.random() * 300}px`,
              height: `${100 + Math.random() * 300}px`,
              background: `radial-gradient(circle, rgba(30,144,255,0.3) 0%, rgba(138,43,226,0.3) 100%)`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, 50, -50, 0],
              y: [0, -50, 50, 0],
              scale: [1, 1.2, 0.8, 1],
              rotate: [0, 360],
              transition: {
                duration: 10 + Math.random() * 10,
                repeat: Infinity,
                repeatType: "reverse",
                delay: index * 0.2
              }
            }}
          />
        ))}
      </motion.div>

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

        {/* Server Tools Section */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
        >
          <h2 className="text-2xl font-semibold text-white mb-4 text-center">
            Server Tools
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {serverTools.map((tool) => (
              <motion.button
                key={tool.label}
                className={`
                  flex flex-col items-center justify-center 
                  p-4 rounded-xl 
                  ${selectedTool === tool.label 
                    ? 'bg-blue-600/50 border-blue-500' 
                    : 'bg-blue-900/20 border-blue-500/30 hover:bg-blue-900/40'}
                  border transition-all
                `}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={tool.action}
              >
                <tool.icon className="w-8 h-8 text-blue-400 mb-2" />
                <span className="text-white">{tool.label}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Ping Result Section */}
        {pingResult && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`
              p-4 rounded-xl text-center 
              ${pingResult.success 
                ? 'bg-green-900/30 border-green-500' 
                : 'bg-red-900/30 border-red-500'}
              border
            `}
          >
            <div className="flex justify-center items-center space-x-2">
              {pingResult.success ? <Check className="text-green-400" /> : <X className="text-red-400" />}
              <h3 className="text-xl font-semibold">
                {pingResult.success ? 'Ping Successful' : 'Ping Failed'}
              </h3>
            </div>
            {pingResult.success && (
              <p className="text-white mt-2">
                Ping to {pingResult.host}: {pingResult.time} ms
              </p>
            )}
          </motion.div>
        )}

        {/* Loading Indicator */}
        {loading && (
          <motion.div
            className="flex justify-center items-center space-x-2 text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <RefreshCw className="animate-spin" />
            <span>Running {selectedTool}...</span>
          </motion.div>
        )}

        {/* Timestamp */}
        <motion.div
          className="text-sm text-blue-200 opacity-70 text-center mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ delay: 1 }}
        >
          Última actualización: {new Date().toLocaleString()}
        </motion.div>
      </motion.div>
    </div>
  )
}

export default App