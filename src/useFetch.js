import { useState, useEffect } from "react";

const useFetch = (url) => {
  const [isPending, setIsPending] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortCont = new AbortController();
    setTimeout(() => {
      fetch(url, {signal: abortCont.signal,headers: {"Content-Type": "application/json"},})
        .then((res) => {
          if (!res.ok) {
            throw Error("could not fetch the data for that resource");
          }
          return res.json();
        })
        .then((data) => {
          setData(data);
          setIsPending(false);
          setError(null);
        })
        .catch((err) => {
          if (err.name === 'AbortError'){
            console.log('fetch aborted');
          }
          setIsPending(false);
          setError(err.message);
        });
    }, 1000);
    return () => abortCont.abort();
  }, [url]);

  return {
    data,
    isPending,
    error,
  };
};

export default useFetch;
