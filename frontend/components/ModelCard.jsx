import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

export function ModelCard() {
  return (
    <div className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Colored Bars (full height) */}
      <div className="absolute inset-0 flex justify-center z-0 gap-x-4">
        <div className="w-16 bg-pink-300 mr-1"></div>
        <div className="w-16 bg-blue-300"></div>
      </div>

      {/* Foreground Card */}
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-sm mx-auto border border-gray-100 relative z-10">
        <h2 className="text-2xl font-serif text-black mb-6 text-center">let's cut to the chase</h2>
        <p className="text-sm text-gray-600 mb-8 leading-relaxed text-center">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum in lorem sed nulla tempor consectetur. Sed
          in tempor nulla, vel consectetur lorem. Vestibulum consectetur lorem sed nulla tempor.
        </p>

        <div className="space-y-3">
          <Link to="/create" className="block">
            <Button className="w-full bg-black hover:bg-gray-800 text-white py-3 rounded-lg font-medium text-sm">
              LET'S DO THIS
            </Button>
          </Link>

          <Link to="/connect" className="block">
            <Button
              className="w-full border-black text-black hover:bg-gray-50 py-3 rounded-lg font-medium bg-transparent text-sm"
            >
              CONNECT WITH US
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
