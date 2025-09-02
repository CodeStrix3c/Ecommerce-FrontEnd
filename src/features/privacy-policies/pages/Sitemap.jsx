function Sitemap() {
  const destinations = [
    'Vacation rentals & homes in 16th arrondissement',
    'Vacation rentals & homes in 1st arrondissement',
    'Vacation rentals & homes in 2nd arrondissement',
    'Vacation rentals & homes in 3rd arrondissement',
    'Vacation rentals & homes in 4th arrondissement',
    'Vacation rentals & homes in 5th arrondissement',
    'Vacation rentals & homes in 6th arrondissement',
    'Vacation rentals & homes in 7th arrondissement',
  ];

  return (
    <div className="py-8 text-[#222222] lg:mt-32">
      <h1 className="pb-6 text-2xl font-bold sm:text-3xl md:text-4xl">
        Top Destinations
      </h1>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {[...Array(4)].map((_, colIndex) => (
          <div
            key={colIndex}
            className="space-y-3 text-base sm:text-lg md:text-xl"
          >
            {destinations.map((place, idx) => (
              <a
                key={`${colIndex}-${idx}`}
                href="#"
                className="block underline hover:text-[#FF5A5F]"
              >
                {place}
              </a>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Sitemap;
