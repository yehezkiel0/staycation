import { useState, useEffect } from "react";
import itemDetails from "../json/itemDetails.json";
import landingPage from "../json/landingPage.json";

const usePageData = (pageType) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate async data fetch
    const fetchData = async () => {
      setLoading(true);
      try {
        let result = null;
        if (pageType === "details") {
          result = itemDetails;
        } else if (pageType === "landing") {
          result = landingPage;
        }
        setData(result);
      } catch (error) {
        console.error("Failed to fetch page data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [pageType]);

  return { data, loading };
};

export default usePageData;
