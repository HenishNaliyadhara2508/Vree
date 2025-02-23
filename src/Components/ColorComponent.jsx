// import React from 'react'
import CustomLens from "./Utils/CustomLens";
import CustomFrame from "./Utils/CustomFrame";
import CustomTemple from "./Utils/CustomTemple";
import { useState } from "react";
// import { SketchPicker } from "react-color";

const ColorComponent = ({ selectedSection }) => {
  const [selectedColor, setSelectedColor] = useState(null);
  const [showColorPicker, setShowColorPicker] = useState(false); // For showing the color picker
  const colors = [
    "#FFFFFF",
    "#D5BC93",
    "#AC252B",
    "#185848",
    "#025D98",
    "#D2A693",
    "Custom",
  ];

  const handleColorSelect = (color) => {
    setSelectedColor(color.hex); 
    if (selectedSection === "frame") {
      CustomFrame.updateFrameColor(color.hex);
    } else if (selectedSection === "temple") {
      CustomTemple.updateTempleColor(color.hex);
    } else if (selectedSection === "lense") {
      CustomLens.updateLenseColor(color.hex);
    }
  };

  const handleCustomColorClick = () => {
    setShowColorPicker(!showColorPicker); 
  };

  return (
    <>
      <div className="flex flex-col items-center p-4">
        {/* Color palette */}
        <div className="flex space-x-4 mb-4">
          {colors.map((color, index) => (
            <div
              key={index}
              className={`w-13 h-13 rounded-full bg-cover bg-center transition-all duration-300 ${
                selectedColor === color
                  ? "border-4 border-blue-500"
                  : "hover:border-4 hover:border-white"
              }`}
              style={{
                backgroundColor: color === "Custom" ? "#FFFFFF" : color,
                backgroundImage:
                  color === "Custom"
                    ? `url('/assets/texture/custom.png')`
                    : "none",
              }}
              onClick={() => {
                if (color === "Custom") {
                  handleCustomColorClick(); 
                } else {
                  handleColorSelect({ hex: color }); 
                }
              }}
            />
          ))}
        </div>

        {/* {showColorPicker && (
          <div className="absolute top-60 left-100 z-50">
            <SketchPicker
              color={selectedColor} 
              onChangeComplete={handleColorSelect} 
            />
          </div>
        )} */}
      </div>
    </>
  );
};

export default ColorComponent;