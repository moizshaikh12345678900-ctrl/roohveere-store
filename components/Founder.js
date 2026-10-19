export default function Founder() {
  return (
    <section id="story" className="bg-[#f8f1e9] py-16 px-6 sm:py-20 lg:px-20 font-sans">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        
        {/* Founder Copy (Text Section - Left) */}
        <div className="max-w-xl">
          <span className="inline-flex items-center rounded-full px-3.5 py-1.5 bg-[#ffe4e9] text-[#c23c5a] text-[9px] font-bold tracking-[1.2px] mb-4 uppercase">
            OUR STORY
          </span>

          <h2 className="font-serif text-3xl sm:text-4xl text-[#2c1d18] leading-tight">
            RoohVeere <span className="italic font-normal text-2xl sm:text-3xl text-[#5a433c]">by Sirishti Chhabria</span>
          </h2>

          <p className="font-serif italic text-lg text-[#8d1239] mt-2 mb-6">
            Rooted In Soul, Worn With Pride.
          </p>

          <div className="space-y-4 text-sm sm:text-base text-[#6e5d56] leading-relaxed">
            <p>
              RoohVeere is a heartfelt tribute — <i>Rooh</i>, meaning “soul,” and <i>Veere</i>, lovingly taken from the name of Sirishti&apos;s mother, <i>Veeri</i>. Together, they signify <strong>“the soul of Veeri”</strong>, a brand built on love, inspiration, and cherished values.
            </p>
            <p>
              Founded in <strong>2025</strong> by Sirishti Chhabria, RoohVeere blends timeless elegance with a personal touch. Each creation is more than just a product — it is a story, a memory, and a reflection of individuality.
            </p>
            <p>
              At RoohVeere, beauty begins with the soul.
            </p>
          </div>

          {/* Signature */}
          <div className="font-serif italic text-xl text-[#4c342b] mt-8">
            Sirishti Chhabria
            <small className="block not-italic text-xs font-sans text-[#88747a] tracking-widest uppercase mt-1">
              Founder & Creative Director
            </small>
          </div>
        </div>

        {/* Founder Image (Right) */}
        <div className="relative w-full max-w-[400px] h-[440px] sm:h-[480px] mx-auto rounded-2xl overflow-hidden bg-[#e5d5c5] shadow-lg">
          <img
            src="https://www.roohveere.com/images/founder_portrait.jpg"
            alt="Sirishti Chhabria, founder of RoohVeere"
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.style.display = "none";
              e.currentTarget.parentElement.classList.add("portrait-fallback");
            }}
          />
        </div>

      </div>
    </section>
  );
}