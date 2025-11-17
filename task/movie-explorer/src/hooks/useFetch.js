import { useEffect, useState } from "react";

/**
 * useFetch(url)
 * - Works for both All Shows and Search API
 * - Safe cancellation when URL changes
 * - Proper error & loading handling
 */
const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // No URL → clear old data
    if (!url) {
      setData([]);
      setLoading(false);
      setError(null);
      return;
    }

    const controller = new AbortController(); // Better cancel method
    const signal = controller.signal;

    setLoading(true);
    setError(null);

    fetch(url, { signal })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch data");
        return res.json();
      })
      .then((json) => {
        if (!signal.aborted) setData(json);
      })
      .catch((err) => {
        if (!signal.aborted) setError(err.message || "Error fetching data");
      })
      .finally(() => {
        if (!signal.aborted) setLoading(false);
      });

    // Cleanup → abort current fetch
    return () => controller.abort();
  }, [url]);

  return { data, loading, error };
};

export default useFetch;
