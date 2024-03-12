import React, { useState } from "react";
import "./App.css";

const DraggableBox = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseDown = (event) => {
    setIsDragging(true);
    setOffset({
      x: event.clientX - position.x,
      y: event.clientY - position.y,
    });
  };

  const handleMouseMove = (event) => {
    if (isDragging) {
      const x = event.clientX - offset.x;
      const y = event.clientY - offset.y;
      setPosition({ x, y });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div
      className="draggable-box"
      style={{ left: `${position.x}px`, top: `${position.y}px` }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <p>Drag me!</p>
    </div>
  );
};

function Draggable() {
  return (
    <div className="App">
      <DraggableBox />
    </div>
  );
}

export default Draggable;
