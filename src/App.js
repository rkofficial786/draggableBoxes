import React, { useEffect, useState } from "react";
import Modal from "./component/Modal";
import { IoMdAdd } from "react-icons/io";
import { IoAddCircleOutline } from "react-icons/io5";
import "./App.css";
import { predefinedBoxes } from "./data";
import Box from "./component/draggable";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleBoxMouseDown = (event, index) => {
    setIsDragging(true);

    const box = boxes[index];
    setOffset({
      x: event.clientX - box.position.x,
      y: event.clientY - box.position.y,
    });
  };

  const handleBoxMouseMove = (event, index) => {
    if (isDragging) {
      const newBoxes = [...boxes];
      const box = newBoxes[index];
      box.position = {
        x: event.clientX - offset.x,
        y: event.clientY - offset.y,
      };
      setBoxes(newBoxes);
    }
  };

  const handleBoxMouseUp = () => {
    setIsDragging(false);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const [boxes, setBoxes] = useState([]);
  const [boxDimensions, setBoxDimensions] = useState({
    width: "100",
    height: "100",
    borderRadius: "10",
    text: "",
    round: false,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    const newValue =
      type === "checkbox"
        ? boxDimensions.round == true
          ? false
          : true
        : value;

    setBoxDimensions((prevDimensions) => ({
      ...prevDimensions,
      [name]: newValue,
    }));
  };

  const handleBoxCreate = () => {
    if (
      boxDimensions.width &&
      boxDimensions.height &&
      boxDimensions.borderRadius
    ) {
      setBoxes((prevBoxes) => [
        ...prevBoxes,
        {
          width: `${boxDimensions.width}px`,
          height: `${boxDimensions.height}px`,
          borderRadius: `${
            boxDimensions.round ? 99999 : boxDimensions.borderRadius
          }px`,
          text: `${boxDimensions.text}`,
          position: {
            x: window.innerWidth / 2 - parseInt(boxDimensions.width, 10) / 2,
            y: window.innerHeight / 2 - parseInt(boxDimensions.height, 10) / 2,
          },
        },
      ]);
      setBoxDimensions({
        width: "100",
        height: "100",
        borderRadius: "10",
        text: "",
      });
      setIsModalOpen(false);
    }
  };

  const switchStyle = `
  .custom_switch {
    appearance: none;
    width: 40px;
    height: 20px;
    border-radius: 10px;
    background-color: ${boxDimensions.round ? "green" : "#433466"};
   
    position: relative;
    cursor: pointer;
    outline: none;
    transition: background-color 0.3s;
  }

  .custom_switch_thumb {
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background-color: #fff;
    position: absolute;
    top: 50%;
    left: ${boxDimensions.round ? "22px" : "2px"};
    transform: translate(0, -50%);
    transition: left 0.3s;
  }
`;

  useEffect(() => {
    setBoxes(predefinedBoxes);
  }, []);

  return (
    <div className="App">
      <style>{switchStyle}</style>

      <div className="header">
        <p>Dynamic Position</p>
        <IoMdAdd className="add_button" onClick={openModal} />
      </div>

      {isModalOpen && (
        <Modal
          title="Create Box"
          onClose={closeModal}
          content={
            <div className="inputContainer">
              <div className="singleInput">
                <label htmlFor="width">Width:</label>
                <input
                  type="number"
                  id="width"
                  name="width"
                  value={boxDimensions.width}
                  onChange={handleInputChange}
                />
              </div>

              <div className="singleInput">
                <label htmlFor="height">Height:</label>
                <input
                  type="number"
                  id="height"
                  name="height"
                  value={boxDimensions.height}
                  onChange={handleInputChange}
                />
              </div>
              <div className="singleInput">
                {" "}
                <label htmlFor="borderRadius">Border Radius:</label>
                <input
                  type="number"
                  id="borderRadius"
                  name="borderRadius"
                  value={boxDimensions.borderRadius}
                  onChange={handleInputChange}
                />
              </div>

              <div className="singleInput">
                <label htmlFor="text">Text:</label>
                <input
                  type="text"
                  id="text"
                  name="text"
                  placeholder="Enter text here..."
                  value={boxDimensions.text}
                  onChange={handleInputChange}
                />
              </div>

              <div className="switch_container">
                <label htmlFor="round" className="switch_label">
                  Round
                </label>
                <div className="switch_btn">
                  <div
                    className="custom_switch"
                    onClick={() =>
                      handleInputChange({
                        target: { name: "round", type: "checkbox" },
                      })
                    }
                  >
                    <div
                      className={`custom_switch_thumb ${
                        boxDimensions.round ? "checked" : ""
                      }`}
                    ></div>
                  </div>
                </div>
              </div>

              <button className="create_box_btn" onClick={handleBoxCreate}>
                Create
              </button>
            </div>
          }
        />
      )}

      {boxes.length < 1 && (
        <div className="getting_started">
          <p>Getting Started</p>
          <IoAddCircleOutline className="add_button" onClick={openModal} />
        </div>
      )}

      <div className="created_boxes ">
        {boxes.map((box, index) => (
          <Box
            key={index}
            box={box}
            index={index}
            handleBoxMouseDown={handleBoxMouseDown}
            handleBoxMouseMove={handleBoxMouseMove}
            handleBoxMouseUp={handleBoxMouseUp}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
