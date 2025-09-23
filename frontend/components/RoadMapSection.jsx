export default function RoadmapSection() {
  return (
    <section className="relative w-full bg-[#f5f1eb] overflow-hidden pt-2 pb-36">
      {/* Heading */}
      <div className="relative z-10 max-w-4xl mx-auto text-center px-4 mb-16">
        <h2 className="text-4xl md:text-6xl font-dancing font-bold text-black mb-4">
          Your Journey with Postify
        </h2>
        <p className="text-lg text-gray-600">
          Discover the powerful features that make your blogging experience seamless and rewarding.
        </p>
      </div>

      {/* Responsive Roadmap Image */}
      <div className="relative z-0 flex justify-center">
        <img
          src="/road.png"
          alt="Postify Roadmap"
          className="w-full h-auto object-contain"
        />
      </div>
    </section>
  );
}
