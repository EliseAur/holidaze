import { useState, useEffect } from "react";
// import { useParams, useOutletContext } from "react-router-dom";
import { useParams } from "react-router-dom";
import { fetchVenueDetails } from "../api";
import { VenueDetailContent, LoadingSpinner } from "../components";
// import { ErrorMessage } from "../components";

function VenueDetail() {
  const { id } = useParams();
  const [venue, setVenue] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadVenue() {
      try {
        const product = await fetchVenueDetails(id);
        setVenue(product);
      } catch (error) {
        setError({
          message: error.message,
          status: error.status,
          statusCode: error.statusCode,
        });
      }
    }

    loadVenue();
  }, [id]);

  // const handleAddToCart = (product) => {
  //   console.log("Add to Cart:", product);
  //   addToCart({ ...product, quantity: 1 });
  // };

  if (error) {
    return console.log("Error fetching venue:", error);
    // <ErrorMessage
    //   message={error.message}
    //   status={error.status}
    //   statusCode={error.statusCode}
    // />
  }

  if (!venue) {
    // return <div>Loading...</div>;
    return <LoadingSpinner />;
  }

  return <VenueDetailContent venue={venue} />;
}

export default VenueDetail;
