export function generatePersonSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Davis Ernst",
    url: "https://davisernst.com",
    jobTitle: "Computer Science Student",
    affiliation: {
      "@type": "Organization",
      name: "University of Saskatchewan",
    },
    sameAs: [
      "https://github.com/davisernst04",
      "https://linkedin.com/in/davis-ernst-987391362",
    ],
  };
}

export function generateWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Davis Ernst Portfolio",
    url: "https://davisernst.com",
    description:
      "Personal portfolio of Davis Ernst, showcasing projects.",
    author: {
      "@type": "Person",
      name: "Davis Ernst",
    },
  };
}

