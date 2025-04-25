import { validateImageUrls } from "./index";

/**
 * Validates and filters venue image URLs.
 *
 * This function ensures that all image URLs in the `media` array are valid and filters out
 * empty or invalid URLs. It also ensures that the first image URL is always provided.
 *
 * @param {Array} media - An array of media objects, each containing a `url` property.
 * @param {Function} setError - A function to set validation errors for invalid URLs.
 * @returns {Promise<Array|boolean>} A promise that resolves to a filtered array of valid image objects,
 *                                   or `false` if validation fails.
 */
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
