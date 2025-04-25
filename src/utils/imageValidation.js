/**
 * Checks if a single image URL is valid.
 *
 * This function attempts to load the image from the provided URL and resolves
 * to `true` if the image loads successfully, or `false` if it fails.
 *
 * @param {string} url - The URL of the image to validate.
 * @returns {Promise<boolean>} A promise that resolves to `true` if the image is valid, or `false` otherwise.
 */
export const isValidImageUrl = async (url) => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(true); // Image loaded successfully
    img.onerror = () => resolve(false); // Image failed to load
    img.src = url;
  });
};

/**
 * Validates all non-empty image URLs in a media array.
 *
 * This function iterates through the `media` array, checks if each URL is valid
 * using `isValidImageUrl`, and sets an error for invalid URLs using the `setError` function.
 *
 * @param {Array} media - An array of media objects, each containing a `url` property.
 * @param {Function} setError - A function to set validation errors for invalid URLs.
 * @returns {Promise<boolean>} A promise that resolves to `true` if all URLs are valid, or `false` if any URL is invalid.
 */
export const validateImageUrls = async (media, setError) => {
  for (let i = 0; i < media.length; i++) {
    const url = media[i].url;
    if (url && url.trim() !== "") {
      const isValid = await isValidImageUrl(url);
      if (!isValid) {
        setError(`media.${i}.url`, {
          type: "manual",
          message: "The URL does not point to a valid image.",
        });
        return false; // Stop validation and return false
      }
    }
  }
  return true; // All URLs are valid
};
