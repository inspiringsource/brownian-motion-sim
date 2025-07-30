"use client";

import React, { useRef, useEffect } from "react";
import p5 from "p5";

const P5Wrapper = ({ sketch, language, temperature }) => {
  const wrapperRef = useRef();
  const p5InstanceRef = useRef();

  useEffect(() => {
    if (wrapperRef.current && !p5InstanceRef.current) {
      p5InstanceRef.current = new p5(
        (p) => sketch(p, language),
        wrapperRef.current
      );
    }
    return () => {
      if (p5InstanceRef.current) {
        p5InstanceRef.current.remove();
        p5InstanceRef.current = null;
      }
    };
  }, []); // Only create once

  // Handle language updates without recreating the sketch
  useEffect(() => {
    if (p5InstanceRef.current && p5InstanceRef.current.updateLanguage) {
      p5InstanceRef.current.updateLanguage(language);
    }
  }, [language]);

  // Handle temperature updates
  useEffect(() => {
    if (p5InstanceRef.current && p5InstanceRef.current.updateTemperature) {
      p5InstanceRef.current.updateTemperature(temperature);
    }
  }, [temperature]);

  return (
    <div
      ref={wrapperRef}
      style={{ display: "flex", justifyContent: "center" }}
    ></div>
  );
};

export default P5Wrapper;
