import { useState, useEffect } from "react";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      setIsPending(true);
      setError(null);

      try {
        const response = await fetch(url, { signal: controller.signal });
        if (!response.ok) {
          throw new Error(`${response.status} - ${response.statusText}`);
        }
        const json = await response.json();
        setData(json);
        setIsPending(false);
        setError(null);
      } catch (err) {
        if (err.name === "AbortError") {
          console.log("Fetch was aborted");
        } else {
          setIsPending(false);
          setError(err.message);
        }
      }
    };
    fetchData();
    return () => {
      controller.abort();
    };
  }, [url]);

  return { data, isPending, error };
};

export default useFetch;
