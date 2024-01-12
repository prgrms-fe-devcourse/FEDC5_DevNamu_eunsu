import { RefObject, useEffect, useRef } from "react";

interface Props {
  handleIntersect: (element: Element) => void;
  options?: IntersectionObserverInit;
}

const defaultOptions = {
  root: null,
  rootMargin: "10px",
  threshold: 0.1,
};

const useIntersectionObserver = ({
  handleIntersect,
  options = defaultOptions,
}: Props): RefObject<Element> => {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const targetRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!targetRef.current) return;

    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          handleIntersect(entry.target);
        }
      });
    }, options);

    observerRef.current.observe(targetRef.current);

    return () => {
      observerRef.current?.disconnect();
    };
  }, [handleIntersect, options]);

  return targetRef;
};

export default useIntersectionObserver;
