import { useEffect } from "react";

/**
 * Custom hook to manage SEO metadata for a page.
 * Updates the document's title, meta description, and meta keywords dynamically.
 *
 * @param {Object} params - The parameters for the hook.
 * @param {string} params.title - The title to set for the document.
 * @param {string} params.description - The meta description to set for the document.
 * @param {string} params.keywords - The meta keywords to set for the document.
 *
 * @example
 * useSEO({
 *   title: "Holidaze | Home",
 *   description: "Find the best venues for your next vacation.",
 *   keywords: "vacation, venues, travel, booking",
 * });
 */
export default function useSEO({ title, description, keywords }) {
  useEffect(() => {
    // Update the title
    if (title) {
      document.title = title;
    }

    // Update the meta description
    if (description) {
      const metaDescription = document.querySelector(
        'meta[name="description"]',
      );
      if (metaDescription) {
        metaDescription.setAttribute("content", description);
      } else {
        const newMetaDescription = document.createElement("meta");
        newMetaDescription.name = "description";
        newMetaDescription.content = description;
        document.head.appendChild(newMetaDescription);
      }
    }

    // Update the meta keywords
    if (keywords) {
      const metaKeywords = document.querySelector('meta[name="keywords"]');
      if (metaKeywords) {
        metaKeywords.setAttribute("content", keywords);
      } else {
        const newMetaKeywords = document.createElement("meta");
        newMetaKeywords.name = "keywords";
        newMetaKeywords.content = keywords;
        document.head.appendChild(newMetaKeywords);
      }
    }
  }, [title, description, keywords]);
}
