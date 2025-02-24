// import React from 'react'
import CustomLens from "./Utils/CustomLens";
import CustomFrame from "./Utils/CustomFrame";
import CustomTemple from "./Utils/CustomTemple";
import { useState } from "react";
import { SketchPicker } from "react-color";

const ColorComponent = ({ selectedSection }) => {
  const [selectedColor, setSelectedColor] = useState("#FFFFFF");
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
    } else if (selectedSection === "lenses") {
      CustomLens.updateLensesColor(color.hex);
    }
  };

  const handleCustomColorClick = () => {
    setShowColorPicker(!showColorPicker); 
  };

  return (
    <>
        
      <div className="flex flex-col p-4 ">
      <div className="text-xl text-white font-semibold ">Color</div>
        {/* Color palette */}
        <div className="flex flex-wrap gap-15">
          {colors.map((color, index) => (
            <div
              key={index}
              className={`w-10 h-10 rounded-full bg-cover bg-center transition-all duration-300 ${
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

        {showColorPicker && (
          <div className="absolute top-100 mx-10">
            <SketchPicker
              color={selectedColor} 
              onChangeComplete={handleColorSelect} 
            />
          </div>
        )}
      </div>
    </>
  );
};

export default ColorComponent;