import React from 'react'
import { motion } from 'framer-motion'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-blue-900 to-purple-900 overflow-hidden relative flex items-center justify-center p-4">
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
        className="relative z-10 w-full max-w-2xl bg-black/40 backdrop-blur-3xl rounded-3xl p-8 md:p-12 text-center"
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
        <motion.h1 
          className="text-5xl md:text-7xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, type: "spring" }}
        >
          QROMARCK SERVER
        </motion.h1>
        
        <motion.div 
          className="grid grid-cols-2 gap-4 mb-10"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, type: "spring" }}
        >
          {[
            { label: "Sistema", value: "Ubuntu 24.02 LTS" },
            { label: "Estado", value: "Operativo" },
            { label: "Núcleos", value: "6 Cores" },
            { label: "RAM", value: "8 GB" }
          ].map((item, index) => (
            <motion.div 
              key={item.label}
              className="bg-blue-900/20 p-4 rounded-xl border border-blue-500/30"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="text-blue-300 text-sm mb-2">{item.label}</div>
              <div className="text-xl font-bold text-white">{item.value}</div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          className="text-sm text-blue-200 opacity-70"
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
