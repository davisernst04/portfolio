import React, { useEffect } from "react";

export const useOutsideClick = (
  ref: React.RefObject<HTMLElement>,
  callback: (event: MouseEvent | TouchEvent) => void,
) => {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      if (!ref.current) return;

      // If clicking inside the element, do nothing
      if (event.target instanceof Node && ref.current.contains(event.target)) {
        return;
      }

      callback(event);
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, callback]);
};
