import { RefObject, useEffect } from "react";

function useClickOutside(
  ref: RefObject<HTMLElement>,
  callback: Function
): void {
  const handleClick = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      callback();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [ref, callback]);
}

export default useClickOutside;
