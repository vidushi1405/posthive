import { Link } from "react-router-dom"
import { Instagram, Twitter, Mail } from "lucide-react"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-black py-12 md:py-16 border-t border-gray-800 font-poppins text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        
        {/* Brand */}
        <div className="col-span-1 md:col-span-2 flex flex-col items-center md:items-start w-full p-6">
          <h1 className="!text-7xl font-tangerine font-bold text-white text-center w-full mb-4">Posthive</h1>
          <div className="text-left max-w-2xl">
            <p className="text-md text-gray-400 leading-relaxed font-poppins">
              Your favorite choice for creating, sharing, and discovering amazing blog content.
              Whether you're a reader, a writer, or just someone who loves storytelling, Posthive
              empowers you with a beautiful platform to explore your voice and reach a broader audience.
            </p>
            <p className="text-xs text-gray-500 mt-4 font-poppins">&copy; {currentYear} Posthive. All rights reserved.</p>
          </div>
        </div>

        {/* Contact Us */}
        <div className="w-full p-6">
          <h3 className="text-5xl font-tangerine font-bold text-white mb-4 text-center">Contact Us</h3>
          <div className="space-y-4 text-md text-gray-300 font-poppins text-center md:text-left">
            
            {/* Email */}
            <div className="flex flex-col">
              <span className="text-gray-500 font-medium">Email</span>
              <a href="mailto:info@posthive.com" className="hover:text-white transition-colors">
                info@posthive.com
              </a>
            </div>

            {/* Phone */}
            <div className="flex flex-col">
              <span className="text-gray-500 font-medium">Phone</span>
              <a href="tel:+11234567890" className="hover:text-white transition-colors">
                +91 6892734671
              </a>
            </div>

            {/* Address */}
            <div className="flex flex-col">
              <span className="text-gray-500 font-medium">Address</span>
              <address className="not-italic">
                123 Blog Street, Suite 456<br />
                Blogger City, Banglore
              </address>
            </div>
          </div>
        </div>
      </div>

      {/* Follow Us Section */}
      <div className="mt-10 flex flex-col items-center justify-center text-center">
        <h3 className="text-4xl font-tangerine font-bold text-white mb-6">Follow Us</h3>
        <div className="flex space-x-20">
          <a href="#" className="w-15 h-15 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700">
            <Instagram className="w-8 h-10 text-pink-500" />
          </a>
          <a href="#" className="w-15 h-15 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700">
            <Twitter className="w-8 h-8 text-blue-400" />
          </a>
          <a href="#" className="w-15 h-15 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700">
            <Mail className="w-8 h-8 text-gray-400" />
          </a>
        </div>
      </div>
    </footer>
  )
}