'use client'
import Link from "next/link";
import { HeaderColorContext } from '@/components/context';
import { useContext } from "react";
import { motion } from "framer-motion";
import { IoMenu } from "react-icons/io5";

export default function Header() {
    const colorContext = useContext(HeaderColorContext)
    return (
        <div className="py-2 border-b border-dashed flex gap-3 sticky top-0 z-50 left-0 right-0 bg-background/45 backdrop-blur-md">
            <Link href={`/`} className="px-4 py-2 rounded-md border border-black bg-white text-sm hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition duration-200 ">Home</Link>
            <motion.div animate={{ background: colorContext?.headerColor }} className="h-10 rounded-md border border-black flex-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition duration-200 flex justify-center items-center"><IoMenu className="text-2xl" /></motion.div>
        </div>
    )
}