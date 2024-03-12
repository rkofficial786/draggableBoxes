import React from "react";

const Box = ({ box, index, handleBoxMouseDown, handleBoxMouseMove, handleBoxMouseUp }) => {
  return (
    <div
      key={index}
      style={{
        width: box.width,
        height: box.height,
        borderRadius: box.borderRadius,
        background: "#3498db",
        margin: "10px",
        display: "inline-block",
        left: `${box.position.x}px`,
        top: `${box.position.y}px`,
      }}
      className="boxMain draggable_box"
      onMouseDown={(event) => handleBoxMouseDown(event, index)}
      onMouseMove={(event) => handleBoxMouseMove(event, index)}
      onMouseUp={handleBoxMouseUp}
    >
      {box.text}
    </div>
  );
};

export default Box;
