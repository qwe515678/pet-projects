'use client'
import { motion, AnimatePresence } from 'framer-motion'
export default function Template({ children }: { children: React.ReactNode }) {
    return (
        <AnimatePresence>
            <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className='w-full pt-2' exit={{ opacity: 0, x: 10 }}>
                {children}
            </motion.div>
        </AnimatePresence>
    )
}