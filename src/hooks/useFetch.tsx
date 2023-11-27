import { useState, useEffect } from 'react';

function useFetch(url: string) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const json = await response.json();
        setData(json);
        setLoading(false);
      } catch (e: any) {
        setError(e);
        setLoading(false);
      }
    };
    fetchData();
  }, [url]);

  return { data, loading, error };
}

export default useFetch;
