import Hero from "../../components/Hero"
import RoadmapSection from "../../components/RoadMapSection" // New: Use RoadmapSection
import Navbar from "../../components/NavBar"
import Footer from "@/components/Footer"

export default function HomePage() {
  return (
    <div className="bg-black overflow-hidden">
      <Navbar />
      <Hero />
      <RoadmapSection />
      <Footer/>
    </div>
  )
}