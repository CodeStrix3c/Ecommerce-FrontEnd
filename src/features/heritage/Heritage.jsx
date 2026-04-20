import React from "react";

function Heritage() {
  return (
    <div className="bg-white text-gray-800">

      {/* ================= HERO ================= */}
      <section className="relative h-[600px] w-full">
        <img
          src="/assets/images/namda.webp"
          alt="Kashmiri Craft"
          className="w-full h-full object-cover brightness-50"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4 pt-20">
          <h1 className="text-4xl md:text-6xl font-bold">
            Kashmiri Art & Craft Heritage
          </h1>

          <p className="mt-4 max-w-2xl text-lg leading-relaxed">
            Preserving centuries-old craftsmanship through handmade excellence,
            Kashmiri art reflects unmatched skill, patience, and cultural identity.
            Each creation carries the legacy of artisans who dedicate their lives
            to mastering timeless techniques passed down through generations.
          </p>
        </div>
      </section>

      {/* ================= INTRO ================= */}
      <section className="max-w-6xl mx-auto px-6 py-14 text-center">
        <h2 className="text-3xl font-semibold mb-4">
          Legacy of Handmade Excellence
        </h2>

        <p className="text-gray-600 leading-relaxed">
          Kashmiri handicrafts are known for their intricate designs,
          patience-driven processes, and deep cultural significance. From the
          softness of Pashmina to the precision of hand-knotted carpets and the
          elegance of papier-mâché, each product is crafted entirely by hand.
          These creations are not mass-produced, but carefully built over days,
          weeks, or even months, making every piece unique and valuable. They
          represent not only artistic excellence but also the heritage, identity,
          and livelihood of skilled artisans across Kashmir.
        </p>
      </section>

      {/* ================= MAIN CRAFTS ================= */}
      <section className="bg-gray-100 py-16 px-6">
        <h2 className="text-3xl font-semibold text-center mb-12">
          Major Kashmiri Crafts
        </h2>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">

          {/* Pashmina */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden hover:scale-105 transition">
            <img
              src="/assets/images/pashminashawlimage.png"
              className="h-56 w-full object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold">Pashmina Shawls</h3>
              <p className="text-sm text-gray-600 mt-2">
                Made from the fine undercoat of Himalayan goats, Pashmina shawls
                are woven by hand using traditional techniques. Known for their
                exceptional softness and warmth, each shawl can take weeks to
                complete and reflects true luxury craftsmanship.
              </p>
            </div>
          </div>

          {/* Carpets */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden hover:scale-105 transition">
            <img
              src="https://images.unsplash.com/photo-1600166898405-da9535204843?q=80&w=1000&auto=format&fit=crop"
              className="h-56 w-full object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold">Kashmiri Carpets</h3>
              <p className="text-sm text-gray-600 mt-2">
                Kashmiri carpets are hand-knotted with thousands of knots per
                square inch, often featuring Persian-inspired floral and
                geometric patterns. These carpets require months or even years
                of dedication, making them timeless works of art.
              </p>
            </div>
          </div>

          {/* Wood carving */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden hover:scale-105 transition">
            <img
              src="/assets/images/tray.webp"
              className="h-56 w-full object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold">Walnut Wood Carving</h3>
              <p className="text-sm text-gray-600 mt-2">
                Walnut wood carving is a signature craft of Kashmir, known for
                its deep, intricate carvings on high-quality wood. Each piece is
                carefully shaped and engraved by skilled artisans, showcasing
                natural beauty and artistic detail.
              </p>
            </div>
          </div>

          {/* Papier Mache */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden hover:scale-105 transition">
            <img
              src="/assets/images/papermachie.webp"
              className="h-56 w-full object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold">Papier-Mâché</h3>
              <p className="text-sm text-gray-600 mt-2">
                Papier-mâché art involves shaping paper pulp into decorative
                items and painting them with vibrant colors and detailed floral
                motifs. This delicate craft reflects creativity, precision, and
                traditional Kashmiri aesthetics.
              </p>
            </div>
          </div>

          {/* Copperware */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden hover:scale-105 transition">
            <img
              src="/assets/images/copper.webp"
              className="h-56 w-full object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold">Copperware</h3>
              <p className="text-sm text-gray-600 mt-2">
                Kashmiri copperware is handcrafted and engraved with traditional
                patterns. These items are both functional and decorative,
                representing a blend of utility and artistic heritage.
              </p>
            </div>
          </div>

          {/* Kani Shawl */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden hover:scale-105 transition">
            <img
              src="/assets/images/kani.jpg"
              className="h-56 w-full object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold">Kani Shawls</h3>
              <p className="text-sm text-gray-600 mt-2">
                Kani shawls are woven using small wooden sticks called “kanis”,
                creating complex patterns without embroidery. This rare and
                labor-intensive technique makes each shawl a masterpiece of
                textile art.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ================= PROCESS ================= */}
      <section className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-10 items-center">
        <img
          src="/assets/images/wellow.webp"
          className="rounded-xl shadow-lg"
        />
        <div>
          <h2 className="text-3xl font-semibold mb-4">
            Craftsmanship Process
          </h2>

          <p className="text-gray-600 leading-relaxed">
            Each Kashmiri craft undergoes a detailed and labor-intensive process,
            starting from sourcing raw materials to designing, shaping, weaving,
            or carving. Unlike machine-made goods, every step is performed
            manually with precision and care.
          </p>

          <p className="text-gray-600 mt-4">
            Artisans spend years perfecting their skills, often learning from
            previous generations. This dedication ensures that every product
            reflects authenticity, craftsmanship, and cultural depth.
          </p>
        </div>
      </section>

      {/* ================= IMPORTANCE ================= */}
      <section className="bg-green-50 py-16 px-6 text-center">
        <h2 className="text-3xl font-semibold mb-6">
          Why These Crafts Matter
        </h2>

        <p className="max-w-3xl mx-auto text-gray-600 leading-relaxed">
          Kashmiri handicrafts are more than just products — they are a living
          heritage that supports thousands of artisan families. By promoting and
          purchasing these crafts, we help preserve traditional skills, empower
          local communities, and ensure that this rich cultural legacy continues
          for future generations.
        </p>
      </section>

      {/* ================= CTA ================= */}
      <section className="bg-black text-white py-12 text-center">
        <h2 className="text-2xl md:text-3xl font-semibold">
          Support Local Artisans
        </h2>
        <p className="mt-3 text-gray-300">
          Choose handmade. Preserve heritage.
        </p>
      </section>

    </div>
  );
}

export default Heritage;