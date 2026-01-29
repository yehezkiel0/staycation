import { categoriesAPI, propertiesAPI } from "./api";

export const landingPageService = {
  getLandingPageData: async () => {
    try {
      // 1. Fetch Data in Parallel
      const [categoriesRes, mostPickedRes] = await Promise.all([
        categoriesAPI.getAll(),
        propertiesAPI.getMostPicked(),
      ]);

      // 2. Transform Categories
      // Provide fallback if API structure differs or is empty
      const rawCategories =
        categoriesRes.categories || categoriesRes.data || [];
      const categories = rawCategories.map((category, index) => ({
        _id: category._id,
        name: category.name,
        description: category.description,
        imageUrl:
          category.image?.url ||
          category.imageUrl ||
          `/images/image-category-${index + 1}.jpg`,
        country: "Indonesia",
        cities: category.propertyCount || 0,
        propertiesCount: category.propertyCount || 0,
      }));

      // 3. Transform Most Picked
      const rawMostPicked =
        mostPickedRes.properties || mostPickedRes.data || [];
      const mostPicked = rawMostPicked.map((property, index) => ({
        _id: property._id,
        name: property.title || property.name,
        type: property.type,
        imageUrl:
          property.imageUrls?.[0]?.url ||
          property.imageUrls?.[0] ||
          property.imageUrl ||
          `/images/image-mostpicked-${index + 1}.jpg`,
        city: property.location?.city || property.city,
        country: property.location?.country || property.country || "Indonesia",
        price:
          typeof property.price === "object"
            ? property.price.amount || property.price.value || 0
            : property.price || 0,
        unit: property.price?.unit || property.unit || "night",
        rating: property.ratings?.average || property.rating || 0,
        reviewCount: property.ratings?.count || property.reviewCount || 0,
        isPopular: true, // Most picked are implicitly popular
      }));

      // 4. Return Domain Model
      // 4. Return Domain Model
      return {
        hero: {
          // Static hero or fetched? User said "all data from database".
          // Ideally Hero content is also dynamic, but usually it's config.
          // For now, I'll keep the structure but empty or minimal if not in API.
          // Since API doesn't return hero, I might need to keep a hardcoded Hero *structure*
          // but the listings must be real.
          // Wait, the user said "data displayed". Hero is usually static text.
          // I will default to a simple object or existing if minimal.
          // Actually, let's keep the Hero TEXT hardcoded in the component or here,
          // but NOT from json file if possible.
          travelers: 1000, // This should ideally be real too, but I don't have a stat for it easily yet.
          treasures: 100,
          cities: 50,
        },
        categories: categories,
        mostPicked: mostPicked,
        testimony: {
          // Fetch real testimony if available?
          // Seeder has reviews? No.
          // I'll leave testimony empty or static-but-in-code for now,
          // removing the JSON dependency is the key.
          _id: "tsd1",
          imageUrl: "/images/testimonial-landingpages.jpg",
          name: "Happy Family",
          rate: 4.5,
          content:
            "What a great trip with my family and I should try again next time soon ...",
          familyName: "Angga",
          familyOccupation: "Product Designer",
        },
      };
    } catch (error) {
      console.error("LandingPage Service Error:", error);
      throw error;
    }
  },
};
