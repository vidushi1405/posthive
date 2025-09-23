import { Link } from "react-router-dom"

export default function AuthLayout({ children, title, subtitle }) {
  return (
    <div className="relative w-full min-h-screen bg-black flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-20 left-10 w-32 h-40 bg-purple-500 rounded-xl transform -rotate-12 opacity-30 blur-xl" />
        <div className="absolute top-40 right-20 w-28 h-36 bg-cyan-500 rounded-xl transform rotate-12 opacity-20 blur-xl" />
        <div className="absolute bottom-32 left-20 w-36 h-44 bg-pink-500 rounded-xl transform rotate-6 opacity-40 blur-xl" />
        <div className="absolute bottom-20 right-10 w-32 h-40 bg-yellow-500 rounded-xl transform -rotate-6 opacity-30 blur-xl" />
      </div>

      {/* Main Content */}
      <div className="max-w-md w-full space-y-8 relative z-10">
        {/* Header */}
        <div className="text-center">
          <Link to="/">
            <h1 className="text-4xl font-tangerine font-bold text-white mb-2">Postify</h1>
          </Link>
          <p className="text-xs tracking-[0.3em] uppercase font-poppins font-medium text-gray-400 mb-8">
            The platform for your thoughts
          </p>
          <h2 className="text-3xl font-poppins font-bold text-white">{title}</h2>
          <p className="mt-2 text-sm text-gray-400">{subtitle}</p>
        </div>

        {/* Form Container */}
        <div className="bg-gray-900 rounded-2xl shadow-xl p-8 border border-gray-700">
          {children}
        </div>
      </div>
    </div>
  )
}
