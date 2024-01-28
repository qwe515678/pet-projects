import Link from "next/link";

export default function Header() {
    return (
        <div className="py-2 border-b border-dashed flex gap-3 sticky top-0 z-50 left-0 right-0 bg-background">
            <Link href={`/`} className="px-4 py-2 rounded-md border border-black bg-white text-sm hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition duration-200 ">Home</Link>
            <div className="h-10 bg-gradient-to-r from-sky-300 to-blue-300 rounded-md border border-black flex-1" />
        </div>
    )
}