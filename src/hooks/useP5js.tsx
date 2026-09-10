import { useRef, useEffect } from 'react'
import p5 from 'p5';

const useP5js = (sketch: (s: p5) => void) => {
  const p5ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const instance = new p5(sketch, p5ref.current as HTMLDivElement);
    return () => {
      setTimeout(() => instance.remove(), 0);
    };
  }, [sketch]);

  return p5ref;
};

export default useP5js;