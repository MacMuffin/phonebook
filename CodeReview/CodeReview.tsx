import React, { useState, useEffect } from "react";

type MousePositionType = { x: number; y: number };
type WindowSizeType = { height: number; width: number };

const mathLib = () => {
  // Please use the created MousePositionType here as type instead of any,
  // because otherwise it could lead to an error accessing the properties x and y of the object if for example a string is passed.
  const distanceCalculator = (point1: any, point2: any): number =>
    Math.sqrt(
      Math.pow(point1.x - point2.x, 2) + Math.pow(point1.y - point2.y, 2)
    );
  return { distanceCalculator };
};

function App() {
  const [position, setPosition] = useState<MousePositionType>({ x: 0, y: 0 });
  const [windowSize, setWindowSize] = useState<WindowSizeType>({
    height: 0,
    width: 0,
  });
  let [distance, setDistance] = useState(0);
  const { distanceCalculator } = mathLib(); // hooks should start with an use. In this case: useMathLib

  const handleMouseMove = (e: { clientX: number; clientY: number }) =>
    setPosition({ x: e.clientX, y: e.clientY });

  const handleResize = () =>
    // because you can already use the window object in React, you can use the window.innerWidth and window.innerHeight to get the window size initsially
    setWindowSize({ height: window.innerHeight, width: window.innerWidth });

  useEffect(() => {
    setDistance(
      distanceCalculator(position, {
        x: windowSize.width / 2,
        y: windowSize.height / 2,
      })
    );
    /** This events should be registered in an seperated useEffect, which will register the event only once on mounting
     * for example:
     * useEffect(() => {
     *  window.addEventListener('mousemove', handleMouseMove);
     * window.addEventListener('resize', handleResize);
     * return () => {
     * window.removeEventListener('mousemove', handleMouseMove);
     * window.removeEventListener('resize', handleResize);
     * }
     * }, []);
     *
     * The return is important, because otherwise, when this component will mount again, it will register every time a new eventhandler
     * withouth removing the old one.
     * This will cause a memory leak.
     */
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);
  }, [position, windowSize.width, windowSize.height]);

  return (
    <>
      <div>
        Mouse Position: {position.x}:{position.y}
      </div>{" "}
      <div>
        Window Size: {windowSize.width}:{windowSize.height}{" "}
      </div>
      <div>Distance to center: {distance.toFixed(2)}</div>{" "}
    </>
  );
}

export default App;
