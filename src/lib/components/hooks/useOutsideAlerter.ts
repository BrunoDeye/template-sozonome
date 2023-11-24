import { useEffect } from 'react';

type SetAlert = React.Dispatch<
  React.SetStateAction<{ message: string; status: string }>
>;

export default function useOutsideAlerter(ref: any, setAlert: SetAlert) {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event: any) {
      if (ref.current && !ref.current.contains(event.target)) {
        setAlert({ status: '', message: '' });
      }
    }
    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);
}
