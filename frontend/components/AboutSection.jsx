import { Button } from "../components/ui/button"
import { Card, CardContent } from "../components/ui/card"
import { Instagram, Twitter, Mail } from "lucide-react"

export default function AboutSection() {
  return (
    <section className="py-16 bg-white h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">ABOUT POSTIFY</h2>

            <p className="text-gray-600 mb-6 leading-relaxed">
              Postify is a cutting-edge blogging platform designed to empower writers and content creators.
              Our mission is to provide a seamless and engaging experience for both bloggers and readers alike.
            </p>

            <p className="text-gray-600 mb-8 leading-relaxed">
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
              laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.
            </p>

            <Button className="bg-gray-900 hover:bg-gray-800 text-white px-8">GET TO KNOW ME</Button>

            {/* Social Links */}
            <div className="flex space-x-4 mt-8">
              <a
                href="#"
                className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center hover:bg-pink-200 transition-colors"
              >
                <Instagram className="w-5 h-5 text-pink-600" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center hover:bg-purple-200 transition-colors"
              >
                <Twitter className="w-5 h-5 text-purple-600" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
              >
                <Mail className="w-5 h-5 text-gray-600" />
              </a>
            </div>
          </div>

          {/* Right Content - Profile Card */}
          <div className="relative">
            {/* Main Profile Card */}
            <Card className="overflow-hidden shadow-2xl border-0">
              <div className="h-64 bg-pink-300 relative">
                {/* Image placeholder */}
                <div className="absolute inset-0 bg-white/10"></div>

                {/* Circular Badge */}
                <div className="absolute top-4 left-4 w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-amber-500 text-xs font-bold">BLOG</div>
                    <div className="text-white text-xs -mt-1">WRITER</div>
                  </div>
                </div>
              </div>

              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Siobhan Granger</h3>
                <p className="text-amber-600 font-medium mb-4">Founder & CEO</p>

                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center space-x-2">
                    <div className="w-1 h-1 bg-pink-500 rounded-full"></div>
                    <span>Storyteller & Community Builder</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-1 h-1 bg-purple-400 rounded-full"></div>
                    <span>Based in San Francisco</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-1 h-1 bg-pink-500 rounded-full"></div>
                    <span>Coffee enthusiast</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 w-20 h-24 bg-white rounded-lg shadow-lg transform rotate-12">
              <div className="w-full h-16 bg-pink-100 rounded-t-lg"></div>
              <div className="p-1">
                <div className="h-2 bg-gray-200 rounded"></div>
              </div>
            </div>

            <div className="absolute -bottom-4 -left-4 w-16 h-20 bg-white rounded-lg shadow-lg transform -rotate-12">
              <div className="w-full h-12 bg-purple-100 rounded-t-lg"></div>
              <div className="p-1">
                <div className="h-1 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
