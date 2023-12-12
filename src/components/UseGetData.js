import { useEffect, useState } from 'react';
import axios from 'axios';

const promiseWrapper = (promise) => {
  let status = 'pending';
  let result;

  const s = promise.then(
    (value) => {
      status = 'success';
      result = value;
    },
    (error) => {
      status = 'error';
      result = error;
    },
  );

  const read = () => {
    switch (status) {
      case 'pending':
        throw s;
      case 'success':
        return result;
      case 'error':
        throw result;
      default:
        throw new Error('Unknown status.');
    }
  };
  return { read };
};

function useGetData(config) {
  const [resource, setResource] = useState(null);
  console.log('X');
  useEffect(() => {
    console.log('E');
    const promise = axios(config).then((response) => response.data);
    setResource(promiseWrapper(promise));
  }, [...Object.values(config.params)]);
  return resource?.read();
}

export default useGetData;
