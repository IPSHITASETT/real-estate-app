import { usePropertyContext } from '../context/PropertyContext';

const useProperty = () => {
  return usePropertyContext();
};

export default useProperty;