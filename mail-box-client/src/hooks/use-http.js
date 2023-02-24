import React, { useEffect, useState, useCallback } from "react";

const useHttp = () => {
  // const [data, setData] = useState(null);

  // useEffect(() => {
  //   fetch(url)
  //     .then((res) => res.json())
  //     .then((data) => setData(data));
  // }, [url]);

  // return (data);

  //2nd part,
  const sendRequest = useCallback(async (requestConfig, applyData) => {

    try {
      const response = await fetch(requestConfig.url, {
        method: requestConfig.method ? requestConfig.method : 'GET',
        headers: requestConfig.headers ? requestConfig.headers : {},
        body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
      });

      if (!response.ok) {
        throw new Error('Request failed!');
      }

      const data = await response.json();
      applyData(data);
    } catch (err) {
      alert(err.message || 'Something went wrong!');
    }
  }, []);

  return { sendRequest,};
};

export default useHttp;
