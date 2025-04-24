import { useEffect } from "react";

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
