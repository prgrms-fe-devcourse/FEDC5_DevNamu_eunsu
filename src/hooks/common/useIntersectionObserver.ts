import { useCallback, useEffect, useRef } from "react";

const useIntersectionObserver = (onIntersect: () => void, options: IntersectionObserverInit) => {
  const observerRef = useRef<IntersectionObserver | null>(null);

  const callback = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting) {
        onIntersect();
      }
    },
    [onIntersect],
  );

  useEffect(() => {
    observerRef.current = new IntersectionObserver(callback, options);
    return () => observerRef.current?.disconnect();
  }, [callback, options]);

  return observerRef;
};

export default useIntersectionObserver;
