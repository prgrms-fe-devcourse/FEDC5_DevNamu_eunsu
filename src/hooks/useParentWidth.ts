import { useEffect, useRef, useState } from "react";

const useParentWidth = () => {
  const [parentWidth, setParentWidth] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    if (element.parentElement) setParentWidth(element.parentElement.offsetWidth);
  }, [ref]);

  return { ref, parentWidth };
};

export default useParentWidth;
