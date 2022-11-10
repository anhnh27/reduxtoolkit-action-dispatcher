import {useEffect} from 'react';
import {counterDispatcher} from './counterSlice';

const TestDispatcher = () => {
  useEffect(() => {
    counterDispatcher.saveForm({text: 'Sir Alex'});
    counterDispatcher.incrementByAmount(10);
  }, []);

  return null;
};

export default TestDispatcher;
