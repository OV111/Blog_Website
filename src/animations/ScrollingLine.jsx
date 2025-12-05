import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export function ScrollLine() {
  const lineRef = useRef(null);
  const wrapperRef = useRef(null)
  useEffect(() => {
    const line = lineRef.current;
    const wrapper = wrapperRef.current

    const length = line.getTotalLength();
    line.style.strokeDasharray = length;
    line.style.strokeDashoffset = length;

    let ctx = gsap.context(() => {
      gsap.to(line, {
        strokeDashoffset: 0,
        ease: "none",
        scrollTrigger: {
          trigger: "wrapper",
          start: "top top",
          end: "bottom bottom",
          scrub: true,
        },
      },wrapper);
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="scroll-wrapper h-[200vh] pl-20 ">
      <svg width="5" height="1500">
        <line
          ref={lineRef}
          x1="1"
          y1="0"
          x2="2"
          y2="1500"
          stroke="black"
          strokeWidth="4"
        />
      </svg>
    </div>
  );
}
