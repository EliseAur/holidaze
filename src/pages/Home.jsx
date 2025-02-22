import { useEffect, useState } from "react";
import { fetchVenues } from "../api/fetchVenues";
import { FilterVenues, VenueCard } from "../components";

function Home() {
  const [venues, setVenues] = useState([]); // Initialize the state with an empty array

  useEffect(() => {
    async function getVenues() {
      try {
        const venues = await fetchVenues();
        console.log("Fetched venues:", venues); // Log the fetched venues
        setVenues(venues); // Store the fetched venues in the state
      } catch (error) {
        console.error("Error fetching venues:", error);
      }
    }

    getVenues();
  }, []);

  return (
    <main className="bg-beige py-8 lg:px-8  max-w-96 px-3 sm:max-w-2xl sm:px-4 md:max-w-3xl md:px-6 lg:max-w-6xl mx-auto">
      <h2 className="text-3xl font-black italic">Latest venues</h2>
      <p className="font-bold text-lg">Find your next getaway</p>
      <FilterVenues />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
        {venues.map((venue) => (
          <VenueCard key={venue.id} venue={venue} />
        ))}
        {/* <ProductCard key={product.id} product={product} /> */}
        {/* <VenueCard />
        <VenueCard />
        <VenueCard />
        <VenueCard />
        <VenueCard />
        <VenueCard /> */}
      </div>
      <button className="bg-lightGreen text-black font-bold py-2 px-4 rounded mt-4 shadow-custom-dark hover:bg-darkGreen mx-auto block">
        Load More Venues
      </button>
    </main>
  );
}

export default Home;
