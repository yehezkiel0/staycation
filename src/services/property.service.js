import { propertiesAPI, categoriesAPI } from "./api";

// Constants
export const PRICE_RANGES = [
  { label: "Di bawah Rp 1.500.000", min: 0, max: 100 },
  { label: "Rp 1.500.000 - Rp 3.750.000", min: 100, max: 250 },
  { label: "Rp 3.750.000 - Rp 7.500.000", min: 250, max: 500 },
  { label: "Rp 7.500.000 - Rp 15.000.000", min: 500, max: 1000 },
  { label: "Di atas Rp 15.000.000", min: 1000, max: Infinity },
];

export const propertyService = {
  getDetail: async (id) => {
    try {
      const response = await propertiesAPI.getById(id);
      const data = response.property || response.data || response;

      if (!data) throw new Error("Property not found");

      // Transform/Normalize Data
      const normalizedData = {
        ...data,
        images:
          data.images && data.images.length > 0
            ? data.images.map((img) => ({
                ...img,
                url: img.url || img.imageUrl,
              }))
            : [
                { url: "/images/img-featured-1.jpg", alt: data.title },
                { url: "/images/img-featured-2.jpg", alt: data.title },
                { url: "/images/img-featured-3.jpg", alt: data.title },
              ],
        price: {
          amount:
            typeof data.price === "object"
              ? data.price.amount || data.price.value || 0
              : data.price,
          per: data.price?.per || data.price?.unit || "night",
          currency: "USD",
        },
        agent: data.agent
          ? {
              ...data.agent,
              profileImage:
                data.agent.profileImage ||
                data.agent.avatar ||
                "/images/testimonial-landingpages.jpg",
            }
          : null,
      };

      return normalizedData;
    } catch (error) {
      console.error("Property Service Error:", error);
      throw error;
    }
  },

  getAllForBrowse: async () => {
    try {
      const [categoriesRes, propertiesRes] = await Promise.all([
        categoriesAPI.getAll(),
        propertiesAPI.getAll(),
      ]);

      const categories = categoriesRes.categories || [];
      const properties = (propertiesRes.properties || []).map((p) => ({
        ...p,
        price:
          typeof p.price === "object"
            ? p.price.amount || p.price.value || 0
            : p.price,
        city: p.location?.city || p.city,
        country: p.location?.country || p.country,
      }));

      return { categories, properties };
    } catch (error) {
      console.error("Browse Service Error:", error);
      throw error;
    }
  },

  filterProperties: (properties, { category, location, priceLabel, query }) => {
    let filtered = [...properties];

    // Filter by category
    if (category && category !== "all") {
      filtered = filtered.filter(
        (property) =>
          property.category?.slug === category ||
          property.category?.name === category
      );
    }

    // Filter by location
    if (location && location !== "all") {
      filtered = filtered.filter(
        (property) => `${property.city}, ${property.country}` === location
      );
    }

    // Filter by price
    if (priceLabel && priceLabel !== "all") {
      const range = PRICE_RANGES.find((r) => r.label === priceLabel);
      if (range) {
        filtered = filtered.filter((property) => {
          const price = property.price || 0;
          return price >= range.min && price <= range.max;
        });
      }
    }

    // Filter by search query
    if (query && query.trim()) {
      const q = query.toLowerCase().trim();
      filtered = filtered.filter(
        (property) =>
          (property.title || property.name || "").toLowerCase().includes(q) ||
          (property.description || "").toLowerCase().includes(q) ||
          (property.city || "").toLowerCase().includes(q) ||
          (property.country || "").toLowerCase().includes(q)
      );
    }

    return filtered;
  },
};
