import { cn } from '@/lib/utils'
import { AlertCircle, CheckCheck } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Toast({ status = 'success', message }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, type: 'spring' }}
      className={cn(
        'fixed top-6 left-1/2 transform -translate-x-1/2 z-[99999] flex items-center gap-4 p-4 px-6 rounded-xl shadow-lg backdrop-blur-md',
        'bg-white/80 border border-gray-300',
        status === 'success' ? 'text-green-800 border-green-500' : 'text-red-800 border-red-500'
      )}
      role="alert"
    >
      {status === 'success' ? (
        <CheckCheck className="w-6 h-6 text-green-600" />
      ) : (
        <AlertCircle className="w-6 h-6 text-red-700" />
      )}
      <div className="text-base font-medium">{message}</div>
    </motion.div>
  )
}
