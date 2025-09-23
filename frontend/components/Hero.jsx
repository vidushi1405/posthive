import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section className="relative min-h-screen bg-black grid-bg flex items-center justify-center">
      {/* Central Text Content */}
      <div className="flex flex-col items-center justify-center text-center relative z-10 px-4 py-20">
        <h1 className="!text-7xl sm:!text-8xl md:!text-9xl font-tangerine text-white leading-none tracking-tight">
          Posthive
        </h1>
        <p className="text-xl md:text-2xl font-poppins text-gray-400 mt-4 max-w-2xl">
          The blogging platform for your next big idea.
        </p>

        {/* Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <Link to="/signin">
            <Button size="lg" className="bg-black text-white hover:bg-gray-800">
              Get started
            </Button>
          </Link>
          <a href="/blogs" target="_blank" rel="noopener noreferrer">
            <Button size="lg" className="border-white text-white hover:bg-white hover:text-black">
              Explore Blogs
            </Button>
          </a>
        </div>
      </div>
      
      {/* Optional: Add a simple glow effect */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute top-[20%] left-[20%] w-[500px] h-[500px] bg-indigo-500 rounded-full blur-3xl mix-blend-multiply" />
        <div className="absolute bottom-[20%] right-[20%] w-[500px] h-[500px] bg-pink-500 rounded-full blur-3xl mix-blend-multiply" />
      </div>
    </section>
  );
}