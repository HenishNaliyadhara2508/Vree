// import Lenses from "./utils/Lenses";
// import Frame from "./utils/Frame";
// import Temple from "./utils/Temple";
// import { useState } from "react";
// import { SketchPicker } from "react-color";
// import { vreeStore } from "../VreeStore";
// import { observer } from "mobx-react";

// const ColorComponent = observer(({ selectedSection }) => {
//   const [selectedColor, setSelectedColor] = useState("#FFFFFF");
//   const [showColorPicker, setShowColorPicker] = useState(false); // For showing the color picker
//   const [pickerPosition, setPickerPosition] = useState({ top: 0, left: 0 });

//   const colors = [
//     "#FFFFFF",
//     "#D5BC93",
//     "#AC252B",
//     "#185848",
//     "#025D98",
//     "#D2A693",
//     "Custom",
//   ];

//   const handleColorSelect = (color) => {
//     if (!color || !color.hex) {
//       console.error("Invalid color object:", color);
//       return;
//     }
    
//     setSelectedColor(color.hex); // Set the selected color
//     // Apply color based on the selected section (frame, temple, or lense)
//     if (selectedSection === "frame") {
//       Frame.updateFrameColor(color.hex);
//       // console.log(vreeStore.frameColor, "frameColor");
//       // console.log(vreeStore.frameTexture, "frameColor");
//     } else if (selectedSection === "temple") {
//       Temple.updateTempleColor(color.hex);
//     } else if (selectedSection === "lense") {
//       Lenses.updateLensesColor(color.hex);
//     }
//   };

//   const handleCustomColorClick = (e) => {
//     // Get the position of the clicked element
//     const rect = e.target.getBoundingClientRect();
//     // Calculate the position to place the color picker below the clicked element
//     setPickerPosition({
//       top: rect.bottom + window.scrollY, // Below the element
//       left: rect.left + window.scrollX, // Align with the left of the element
//     });
//     // Toggle the visibility of the color picker
//     setShowColorPicker(!showColorPicker);
//   };

//   return (
//     <div className="">
//       <div className={` text-xl font-bold ${vreeStore.isDarkMode ? "text-white" : "text-gray-900"}`}>Color</div>
//       <div className="flex flex-col p-4">
//         {/* Color palette */}
//         <div className="flex flex-wrap space-x-12 mx-5 my-3 overflow-x-auto mb-4">
//           {colors.map((color, index) => (
//             <div
//               key={index}
//               className={`w-13 h-13 my-3 rounded-full bg-cover bg-center transition-all duration-300 ${
//                 selectedColor === color
//                   ? "border-4 border-blue-500"
//                   : "hover:border-4 hover:border-white"
//               }`}
//               style={{
//                 backgroundColor: color === "Custom" ? "#FFFFFF" : color,
//                 backgroundImage:
//                   color === "Custom"
//                     ? `url('/assets/texture/custom.png')`
//                     : "none",
//               }}
//               onClick={(e) => {
//                 if (color === "Custom") {
//                   handleCustomColorClick(e); // Show color picker when "Custom" is clicked
//                 } else {
//                   handleColorSelect({ hex: color }); // Apply the selected predefined color
//                 }
//               }}
//             />
//           ))}
//         </div>

//         {/* Color Picker for Custom Color */}
//         {showColorPicker && (
//           <div
//             className="absolute z-50"
//             style={{
//               top: pickerPosition.top + "px", // Position the picker dynamically
//               left: pickerPosition.left + "px", // Align the picker with the clicked element
//             }}
//           >
//             <SketchPicker
//               color={selectedColor} // Initial color for the color picker
//               onChangeComplete={handleColorSelect} // Set color when user selects from the color picker
//             />
//           </div>
//         )}
//       </div>
//     </div>
//   );
// });

// export default ColorComponent;
// import Lenses from "./utils/Lenses";
// import Frame from "./utils/Frame";
// import Temple from "./utils/Temple";
// import { useState } from "react";
// import { SketchPicker } from "react-color";
// import { vreeStore } from "../VreeStore";
// import { observer } from "mobx-react";
// // import { set } from "mobx";

// const ColorComponent = observer(({ selectedSection }) => {
  
//   const [selectedColor, setSelectedColor] = useState("#FFFFFF");
//   const [showColorPicker, setShowColorPicker] = useState(false); // For showing the color picker
//   const [pickerPosition, setPickerPosition] = useState({ top: 0, left: 0 });

//   const colors = [
//     "#FFFFFF",
//     "#D5BC93",
//     "#AC252B",
//     "#185848",
//     "#025D98",
//     "#D2A693",
//     "Custom",
//   ];

//   const handleColorSelect = (color) => {
//     if (!color || !color.hex) {
//       console.error("Invalid color object:", color);
//       return;
//     }
    
//     // setSelectedColor(color.hex); // Set the selected color
//     // Apply color based on the selected section (frame, temple, or lense)
//     if (selectedSection === "frame") {
//       vreeStore.frameColor = color.hex;
//       setSelectedColor(vreeStore.frameColor)
//       Frame.updateFrameColor(color.hex);
//       // console.log(vreeStore.frameColor, "frameColor");
//       // console.log(vreeStore.frameTexture, "frameColor");
//     } else if (selectedSection === "temple") {
//       vreeStore.templeColor = color.hex;
//       setSelectedColor(vreeStore.templeColor)
//       Temple.updateTempleColor(color.hex);
//     } else if (selectedSection === "lense") {
//       vreeStore.lensColor = color.hex;
//       setSelectedColor(vreeStore.lensColor)
//       Lenses.updateLensesColor(color.hex);
//     }
//   };

//   const handleCustomColorClick = (e) => {
//     // Get the position of the clicked element
//     const rect = e.target.getBoundingClientRect();
//     // Calculate the position to place the color picker below the clicked element
//     setPickerPosition({
//       top: rect.bottom + window.scrollY, // Below the element
//       left: rect.left + window.scrollX, // Align with the left of the element
//     });
//     // Toggle the visibility of the color picker
//     setShowColorPicker(!showColorPicker);
//   };

//   return (
//     <div className="">
//       <div className={` text-xl font-bold ${vreeStore.isDarkMode ? "text-white" : "text-gray-900"}`}>Color</div>
//       <div className="flex flex-col p-4">
//         {/* Color palette */}
//         <div className="flex flex-wrap space-x-12 mx-5 my-3 overflow-x-auto mb-4">
//           {colors.map((color, index) => (
//             <div
//               key={index}
//               className={`w-13 h-13 my-3 rounded-full bg-cover bg-center transition-all duration-300 ${
//                 selectedColor === color
//                   ? "border-4 border-blue-500"
//                   : "hover:border-4 hover:border-white"
//               }`}
//               style={{
//                 backgroundColor: color === "Custom" ? "#FFFFFF" : color,
//                 backgroundImage:
//                   color === "Custom"
//                     ? `url('/assets/texture/custom.png')`
//                     : "none",
//               }}
//               onClick={(e) => {
//                 if (color === "Custom") {
//                   handleCustomColorClick(e); // Show color picker when "Custom" is clicked
//                 } else {
//                   handleColorSelect({ hex: color }); // Apply the selected predefined color
//                 }
//               }}
//             />
//           ))}
//         </div>

//         {/* Color Picker for Custom Color */}
//         {showColorPicker && (
//           <div
//             className="absolute z-50"
//             style={{
//               top: pickerPosition.top + "px", // Position the picker dynamically
//               left: pickerPosition.left + "px", // Align the picker with the clicked element
//             }}
//           >
//             <SketchPicker
//               color={selectedColor} // Initial color for the color picker
//               onChangeComplete={handleColorSelect} // Set color when user selects from the color picker
//             />
//           </div>
//         )}
//       </div>
//     </div>
//   );
// });

// export default ColorComponent;

// import CustomLens from "./Utils/CustomLens";
// import CustomFrame from "./Utils/CustomFrame";
// import CustomTemple from "./Utils/CustomTemple";
// import { useState } from "react";
// import { SketchPicker } from "react-color";
// import { vreeStore } from "../VreeStore";
// import { observer } from "mobx-react";

// const ColorComponent = observer(({ selectedSection }) => {
//   const [showColorPicker, setShowColorPicker] = useState(false); // For showing the color picker
//   const [pickerPosition, setPickerPosition] = useState({ top: 0, left: 0 });

//   const colors = [
//     "#FFFFFF",
//     "#D5BC93",
//     "#AC252B",
//     "#185848",
//     "#025D98",
//     "#D2A693",
//     "Custom",
//   ];

//   const getSelectedColor = () => {
//     if (selectedSection === "frame") {
//       return vreeStore.frameColor;
//     } else if (selectedSection === "temple") {
//       return vreeStore.templeColor;
//     } else if (selectedSection === "lense") {
//       return vreeStore.lensColor;
//     }
//     return "#FFFFFF"; // Default fallback color
//   };

//   const handleColorSelect = (color) => {
//     if (!color || !color.hex) {
//       console.error("Invalid color object:", color);
//       return;
//     }

//     if (selectedSection === "frame") {
//       vreeStore.frameColor = color.hex;
//       CustomFrame.updateFrameColor(color.hex);
//     } else if (selectedSection === "temple") {
//       vreeStore.templeColor = color.hex;
//       CustomTemple.updateTempleColor(color.hex);
//     } else if (selectedSection === "lense") {
//       vreeStore.lensColor = color.hex;
//       CustomLens.updateLensesColor(color.hex);
//     }
//   };

//   const handleCustomColorClick = (e) => {
//     // Get the position of the clicked element
//     const rect = e.target.getBoundingClientRect();
//     // Calculate the position to place the color picker below the clicked element
//     setPickerPosition({
//       top: rect.bottom + window.scrollY, // Below the element
//       left: rect.left + window.scrollX, // Align with the left of the element
//     });
//     // Toggle the visibility of the color picker
//     setShowColorPicker(!showColorPicker);
//   };

//   return (
//     <div className="">
//       <div className={` text-xl font-bold ${vreeStore.isDarkMode ? "text-white" : "text-gray-900"}`}>Color</div>
//       <div className="flex flex-col p-4">
//         {/* Color palette */}
//         <div className="flex flex-wrap space-x-12 mx-5 my-3 overflow-x-auto mb-4">
//           {colors.map((color, index) => (
//             <div
//               key={index}
//               className={`w-13 h-13 my-3 rounded-full bg-cover bg-center transition-all duration-300 ${getSelectedColor() === color
//                 ? "border-4 border-blue-500"
//                 : "hover:border-4 hover:border-white"
//                 }`}
//               style={{
//                 backgroundColor: color === "Custom" ? "#FFFFFF" : color,
//                 backgroundImage:
//                   color === "Custom"
//                     ? `url('/assets/texture/custom.png')`
//                     : "none",
//               }}
//               onClick={(e) => {
//                 if (color === "Custom") {
//                   handleCustomColorClick(e); // Show color picker when "Custom" is clicked
//                 } else {
//                   handleColorSelect({ hex: color }); // Apply the selected predefined color
//                 }
//               }}
//             />
//           ))}
//         </div>

//         {/* Color Picker for Custom Color */}
//         {showColorPicker && (
//           <div
//             className="absolute z-50"
//             style={{
//               top: pickerPosition.top + "px", // Position the picker dynamically
//               left: pickerPosition.left + "px", // Align the picker with the clicked element
//             }}
//           >
//             <SketchPicker
//               color={getSelectedColor()} // Initial color for the color picker
//               onChangeComplete={handleColorSelect} // Set color when user selects from the color picker
//             />
//           </div>
//         )}
//       </div>
//     </div>
//   );
// });
// export default ColorComponent;

import { observer } from "mobx-react";
import { SketchPicker } from "react-color";
import CustomLens from "./Utils/CustomLens";
import CustomFrame from "./Utils/CustomFrame";
import CustomTemple from "./Utils/CustomTemple";
import { vreeStore } from "../VreeStore";
import { useState } from "react";

const ColorComponent = observer(({ selectedSection }) => {
  const [showColorPicker, setShowColorPicker] = useState(false); // For showing the color picker
  const [pickerPosition, setPickerPosition] = useState({ top: 0, left: 0 });
  const colors = [
    "#FFFFFF",
    "#D5BC93",
    "#AC252B",
    "#185848",
    "#025D98",
    "#D2A693",
    "Custom",
  ];

  const getSelectedColor = () => {
    if (selectedSection === "frame") {
      return vreeStore.frameColor;
    } else if (selectedSection === "temple") {
      return vreeStore.templeColor;
    } else if (selectedSection === "lenses") {
      return vreeStore.lensColor;
    }
    return "#FFFFFF"; // Default fallback color
  };

  const handleColorSelect = (color) => {
    if (!color || !color.hex) {
      console.error("Invalid color object:", color);
      return;
    }

    // Update the selected color in the store and trigger the update on the respective section
    if (selectedSection === "frame") {
      vreeStore.frameColor = color.hex;
      CustomFrame.updateFrameColor(color.hex);
    } else if (selectedSection === "temple") {
      vreeStore.templeColor = color.hex;
      CustomTemple.updateTempleColor(color.hex);
    } else if (selectedSection === "lenses") {
      vreeStore.lensColor = color.hex;
      CustomLens.updateLensesColor(color.hex);
    }
  };

  const handleCustomColorClick = (e) => {
    // Get the position of the clicked element
    const rect = e.target.getBoundingClientRect();
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
  
    // Add an offset to the top to move the color picker slightly below the click
    const offsetY = 10;  // Adjust this value to change the distance below the click
    
    let top = rect.bottom + window.scrollY + offsetY;  // Adding offsetY to move picker down
    let left = rect.left + window.scrollX;
  
    // Ensure the color picker stays within the bounds of the viewport
    if (left + 300 > windowWidth) {
      left = windowWidth - 300; // Adjust left to fit in the screen
    }
    if (top + 400 > windowHeight) {
      top = windowHeight - 400; // Adjust top to fit in the screen
    }
  
    setPickerPosition({ top, left });
    setShowColorPicker(!showColorPicker);
  };
  

  return (
    <>
      <div className="flex flex-col">
        {/* Color palette */}
        <div className="flex flex-wrap space-x-12 mx-5 my-3 px-4 mb-4 ms-8">
          {colors.map((color, index) => (
            <div
              key={index}
              className={`w-10 h-10 border border-gray-300 my-3 rounded-full bg-cover bg-center transition-all duration-300 ${getSelectedColor() === color
                ? "shadow-[0_0_20px_4px_rgba(150,100,255,0.75)] scale-105"
                : "hover:scale-110 hover:shadow-[0_0_15px_2px_rgba(245,245,245,0.75)]"
                }`}
              style={{
                backgroundColor: color === "Custom" ? "#FFFFFF" : color,
                backgroundImage:
                  color === "Custom"
                    ? `url('/assets/texture/custom.png')`
                    : "none",
              }}
              onClick={(e) => {
                if (color === "Custom") {
                  handleCustomColorClick(e); // Show color picker when "Custom" is clicked
                } else {
                  handleColorSelect({ hex: color }); // Apply the selected predefined color
                }
              }}
            />
          ))}
        </div>

        {/* Color Picker for Custom Color */}
        {showColorPicker && (
          <div
            className="absolute z-20"
            style={{
              top: pickerPosition.top + "px", // Position the picker dynamically
              // left: pickerPosition.left + "px", // Align the picker with the clicked element
              // zIndex: 9999, // Ensure it's on top of all elements
              height: "20px"
            }}
          >
            <SketchPicker
              color={getSelectedColor()} // Initial color for the color picker
              onChangeComplete={handleColorSelect} // Set color when user selects from the color picker
            />
          </div>
        )}
      </div>
    </>
  );
});

export default ColorComponent;
