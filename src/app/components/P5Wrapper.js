"use client";


import React, { useRef, useEffect } from "react";
import p5 from "p5";

const P5Wrapper = ({ sketch }) => {
  const wrapperRef = useRef();

  useEffect(() => {
    let p5Instance;
    if (wrapperRef.current) {
      p5Instance = new p5(sketch, wrapperRef.current);
    }
    return () => {
      if (p5Instance) p5Instance.remove();
    };
  }, [sketch]);

  return <div ref={wrapperRef}></div>;
};

export default P5Wrapper;