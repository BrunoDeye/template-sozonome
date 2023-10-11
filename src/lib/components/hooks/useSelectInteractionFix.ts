import { useRef } from "react";

const useSelectInteractionFix = (selectors: string) => {
  const timeoutRef = useRef<number | undefined>();
  const root = typeof document !== 'undefined' && document.querySelector<HTMLElement>(selectors);

  if (!root) {
    return (open: boolean) => open;
  }

  const disableClicks = () => {
    root.style.setProperty("pointer-events", "none");
  };

  const enableClicks = () => {
    root.style.removeProperty("pointer-events");
    // or root.removeAttribute("style") to remove empty attribute.
  };

  const openChangeHandler = (open: boolean) => {
    if (open) {
      clearTimeout(timeoutRef.current);
      disableClicks();
    } else {
      // Casting it here because Node is returning `Timeout` and this handler will run in the browser.
      timeoutRef.current = setTimeout(enableClicks, 50) as unknown as number;
    }
  };

  return openChangeHandler;
};

export default useSelectInteractionFix;