export const useLocalStorage = (name: string): Function[] => {
  const getLocalStorage = () => {
    if (typeof window !== 'undefined') {
      const local = localStorage.getItem(name);
      // console.log('oi'+ local)
      if (local != null) {
        return JSON.parse(local);
      }
    }
    return null;
  };
  const setLocalStorage = (item: Object) => {
    localStorage.setItem(name, JSON.stringify(item));
  };
  const removeLocalStorage = () => {
    return localStorage.removeItem(name);
  };
  return [getLocalStorage, setLocalStorage, removeLocalStorage];
};
