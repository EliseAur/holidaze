// Function to check if a single image URL is valid
export const isValidImageUrl = async (url) => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(true); // Image loaded successfully
    img.onerror = () => resolve(false); // Image failed to load
    img.src = url;
  });
};

// Function to validate all non-empty image URLs in a media array
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
