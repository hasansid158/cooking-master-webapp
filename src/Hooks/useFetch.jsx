import { useState, useEffect } from "react";

const useFetch = (url, method = "GET") => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const [options, setOptions] = useState(null);

  const postRequest = (postData) => {
    setOptions({
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    });
  };

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async (optionData) => {
      setIsPending(true);
      setError(null);

      try {
        const response = await fetch(url, {
          ...optionData,
          signal: controller.signal,
        });
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

    if (method === "GET") {
      fetchData();
    } else if (options && method === "POST") {
      fetchData(options);
    }

    return () => {
      controller.abort();
    };
  }, [url, method, options]);

  return { data, isPending, error, postRequest };
};

export default useFetch;
