import Link from 'next/link'

export default function BackToHomeButton() {
    return (
        <Link href="/" className="inline-flex items-center px-4 py-2 space-x-3 text-sm font-semibold transition duration-150 ease-in bg-white border border-gray-300 rounded-md hover:bg-slate-50">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4 mr-2"><path strokeLinecap="round" strokeLinejoin="round" d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5"></path></svg>
            Back To Home
        </Link>
    )
}