import { useState, useEffect } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Menu, X, User, LogOut, PenTool, Home } from "lucide-react"
import api from "../services/api"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem("accessToken")
    setIsLoggedIn(!!token)
  }, [])

  const handleLogout = () => {
    api.logout()
    setIsLoggedIn(false)
    navigate("/")
  }

  const navLinks = [
    { name: "Home", href: "/", icon: Home },
    { name: "Blogs", href: "/blogs", icon: PenTool },
  ]

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 px-6 py-2 w-fit max-w-full border border-gray-700 rounded-full bg-gray-900/95 backdrop-blur-md shadow-md flex items-center space-x-4 font-poppins text-sm">
      <h1 className="!text-2xl font-tangerine text-white">
        <Link to="/" className="!text-white hover:!text-white">
          Posthive
        </Link>
      </h1>

      <div className="hidden md:flex items-center gap-3">
        {navLinks.map(({ name, href, icon: Icon }) => {
          const isActive = location.pathname === href
          return (
            <Link
              key={name}
              to={href}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full transition-colors ${
                isActive
                  ? "bg-gray-700 !text-white hover:!text-white font-semibold"
                  : "!text-gray-300 hover:!text-white hover:bg-gray-800"
              }`}
            >
              <Icon className="w-4 h-4" />
              {name}
            </Link>
          )
        })}
      </div>

      <div className="hidden md:flex items-center gap-2">
        {isLoggedIn ? (
          <>
            <Link to="/dashboard">
              <Button
                size="sm"
                className="bg-gray-700 text-white hover:bg-gray-600 font-medium"
              >
                <User className="w-4 h-4 mr-1" />
                Dashboard
              </Button>
            </Link>
            <Button size="sm" onClick={handleLogout} className="bg-red-500 text-white hover:bg-red-600">
              <LogOut className="w-4 h-4 mr-1" />
              Logout
            </Button>
          </>
        ) : (
          <>
            <Link to="/signin">
              <Button size="sm" className="bg-black text-white hover:bg-gray-800">
                Sign In
              </Button>
            </Link>
          </>
        )}
      </div>

      <div className="md:hidden">
        <Button size="sm" onClick={() => setIsMenuOpen(!isMenuOpen)} className="bg-gray-700 text-white hover:bg-gray-600">
          {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </Button>
      </div>

      {isMenuOpen && (
        <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-gray-900/95 rounded-xl shadow-lg p-4 border border-gray-700 w-64 z-50 flex flex-col space-y-3 font-poppins text-sm">
          {navLinks.map(({ name, href, icon: Icon }) => (
            <Link
              key={name}
              to={href}
              onClick={() => setIsMenuOpen(false)}
              className={`flex items-center gap-2 px-4 py-2 rounded-md ${
                location.pathname === href
                  ? "bg-gray-700 text-white font-semibold"
                  : "text-gray-300 hover:bg-gray-800 hover:text-white"
              }`}
            >
              <Icon className="w-5 h-5" />
              {name}
            </Link>
          ))}
          {isLoggedIn ? (
            <>
              <Link
                to="/dashboard"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-2 px-4 py-2 text-white hover:bg-gray-800 rounded-md"
              >
                <User className="w-5 h-5" />
                Dashboard
              </Link>
              <button
                onClick={() => {
                  handleLogout()
                  setIsMenuOpen(false)
                }}
                className="flex items-center gap-2 px-4 py-2 text-white bg-red-500 hover:bg-red-600 rounded-md"
              >
                <LogOut className="w-5 h-5" />
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/signin"
                onClick={() => setIsMenuOpen(false)}
                className="px-4 py-2 bg-black text-white hover:bg-gray-800 rounded-md text-center font-medium"
              >
                Sign In
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  )
}