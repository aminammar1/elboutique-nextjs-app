import { cn } from '@/lib/utils';
import { AlertCircle, CheckCheck } from 'lucide-react';
import { m, AnimatePresence } from 'framer-motion';

export default function Toast({ status = 'success', message }) {
  return (
    <AnimatePresence>
      <m.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 20 }}
        transition={{ duration: 0.4, type: 'spring' }}
        className={cn(
          'fixed bottom-2 right-5 z-[99999] shadow-lg flex items-center gap-4 p-4 rounded-lg w-80',
          'border-l-4 bg-white text-slate-800',
          status === 'success' ? 'border-green-500' : 'border-red-500'
        )}
        role='alert'
      >
        {status === 'success' ? (
          <CheckCheck className='w-6 h-6 text-green-600' />
        ) : (
          <AlertCircle className='w-6 h-6 text-red-600' />
        )}
        <div className='text-sm font-medium flex-1'>{message}</div>
      </m.div>
    </AnimatePresence>
  )
}
