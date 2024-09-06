import React from "react";
import { useInView } from "react-intersection-observer";

const ScrollReveal = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <div ref={ref} className={`reveal ${inView ? "active" : ""}`}>
      <h2>This content will appear as you scroll down</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque id orci
        vitae metus ultricies tincidunt.
      </p>
    </div>
  );
};

export default ScrollReveal;
