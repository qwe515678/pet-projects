'use client'
import { motion } from 'framer-motion'
export default function Template({ children }: { children: React.ReactNode }) {
    return (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className='w-full pt-2'>
            {children}
        </motion.div>
    )
}