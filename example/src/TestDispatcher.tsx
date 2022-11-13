import {useEffect, useState} from 'react';
import {ActivityIndicator} from 'react-native';
import {counterDispatcher} from './counterSlice';

const TestDispatcher = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async () => {
      await counterDispatcher.update('Hello wolrd').$result;
      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    counterDispatcher.incrementByAmount(10);
  }, []);

  if (loading) {
    return <ActivityIndicator size={'large'} />;
  }

  return null;
};

export default TestDispatcher;
