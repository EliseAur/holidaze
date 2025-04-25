import { validateImageUrls } from "./index";

export const validateAndFilterVenueImages = async (media, setError) => {
  // Check if the first image URL is empty
  if (!media[0].url) {
    setError("media.0.url", {
      type: "manual",
      message: "URL is required for the first image.",
    });
    return false;
  }

  // Validate all non-empty image URLs
  const areImagesValid = await validateImageUrls(media, setError);
  if (!areImagesValid) {
    return false;
  }

  // Remove empty or invalid URLs for images 2, 3, and 4
  return media.filter((media, index) => index === 0 || media.url);
};
