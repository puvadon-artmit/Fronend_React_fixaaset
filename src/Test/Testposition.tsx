import { useState } from "react";
import Home from "../image/trendy-house24.jpg";
import "./Testposition.css";

export default function Testposition() {
  const [clickPosition, setClickPosition] = useState({ x: 0, y: 0 });
  const [inputX, setInputX] = useState("");
  const [inputY, setInputY] = useState("");

  const handleClick = (e:any) => {
    const rect = e.target.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100; 
    const y = ((e.clientY - rect.top) / rect.height) * 100; 
    setClickPosition({ x, y });
    setInputX(x.toFixed(2));
    setInputY(y.toFixed(2));
  };

  const handleInputChange = (e:any) => {
    const { name, value } = e.target;
    if (name === "x") {
      setInputX(value);
    } else if (name === "y") {
      setInputY(value);
    }
  };

  const handleSetPosition = () => {
    const parsedX = parseFloat(inputX);
    const parsedY = parseFloat(inputY);

    if (!isNaN(parsedX) && !isNaN(parsedY)) {
      setClickPosition({ x: parsedX, y: parsedY });
    }
  };

  return (
    <div className="flex justify-center">
      <div className="image-container" onClick={handleClick}>
        <img
          src={Home}
          alt=""
          style={{ maxWidth: "100%", height: "auto" }}
        />
        {clickPosition.x !== 0 && clickPosition.y !== 0 && (
          <div
            className="click-point"
            style={{ left: `${clickPosition.x}%`, top: `${clickPosition.y}%` }}
          ></div>
        )}
      </div>
      <div className="position-info">
        <div>
          <label>X:</label>
          <input
            type="text"
            name="x"
            value={inputX}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Y:</label>
          <input
            type="text"
            name="y"
            value={inputY}
            onChange={handleInputChange}
          />
        </div>
        <button onClick={handleSetPosition}>Set Position</button>
      </div>
    </div>
  );
}
