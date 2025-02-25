import React, { useState } from "react";
import TextureComponent from "./TextureComponent";
import ColorComponent from "./ColorComponent";
import MaterialProgessBar from "./MaterialProgressBar";
import { vreeStore } from "../VreeStore";
import CustomFrame from "./Utils/CustomFrame";
import CustomTemple from "./Utils/CustomTemple";
import CustomLens from "./Utils/CustomLens";
import { observer } from "mobx-react-lite";

const SideBarComponent = observer(() => {
  const [selectedSection, setSelectedSection] = useState("frame");

  // Handle selecting a section (Frame, Temple, or Lenses)
  const handleSectionSelect = (section) => {
    setSelectedSection(section);
  };

  // Render different properties based on the selected section
  const renderProperties = () => {
    switch (selectedSection) {
      case "frame":
        return (
          <>
            <div className={`font-semibold p-4 ${vreeStore.isDarkMode ? "text-white" : "text-black"}`}>Texture</div>
            <TextureComponent selectedSection={selectedSection} />
            <div className={`font-semibold p-4 ${vreeStore.isDarkMode ? "text-white" : "text-black"}`}>Color</div>
            <ColorComponent selectedSection={selectedSection} />
            <div className={`font-semibold p-4 ${vreeStore.isDarkMode ? "text-white" : "text-black"}`}>
              Material Properties
            </div>
            <div className={`font-semibold p-5 ${vreeStore.isDarkMode ? "text-white" : "text-black"}`}>
              <MaterialProgessBar
                name="Metalic"
                value={vreeStore.frameMetalness}
                onChange={CustomFrame.updateFrameMetalness}
              />
            </div>
            <div className={`font-semibold p-5 ${vreeStore.isDarkMode ? "text-white" : "text-black"}`}>
              <MaterialProgessBar
                name="Roughness"
                value={vreeStore.frameRoughness}
                onChange={CustomFrame.updateFrameRoughness}
              />
            </div>
            <div className={`font-semibold p-5 ${vreeStore.isDarkMode ? "text-white" : "text-black"}`}>
              <MaterialProgessBar
                name="Transparency"
                value={vreeStore.frameOpacity}
                onChange={CustomFrame.updateFrameTransparency}
              />
            </div>
          </>
        );
      case "temple":
        return (
          <>
            <div className={`font-semibold p-4 ${vreeStore.isDarkMode ? "text-white" : "text-black"}`}>Texture</div>
            <TextureComponent selectedSection={selectedSection} />
            <div className={`font-semibold p-4 ${vreeStore.isDarkMode ? "text-white" : "text-black"}`}>Color</div>
            <ColorComponent selectedSection={selectedSection} />
            <div className={`font-semibold p-4 ${vreeStore.isDarkMode ? "text-white" : "text-black"}`}>
              Material Properties
            </div>
            <div className={`font-semibold p-5 ${vreeStore.isDarkMode ? "text-white" : "text-black"}`}>
              <MaterialProgessBar
                name="Metalic"
                value={vreeStore.templeMetalness}
                onChange={CustomTemple.updateTempleMetalness}
              />
            </div>
            <div className={`font-semibold p-5 ${vreeStore.isDarkMode ? "text-white" : "text-black"}`}>
              <MaterialProgessBar
                name="Roughness"
                value={vreeStore.templeRoughness}
                onChange={CustomTemple.updateTempleRoughness}
              />
            </div>
            <div className={`font-semibold p-5 ${vreeStore.isDarkMode ? "text-white" : "text-black"}`}>
              <MaterialProgessBar
                name="Transparency"
                value={vreeStore.templeTransparency}
                onChange={CustomTemple.updateTempleTransparency}
              />
            </div>
          </>
        );
      case "lenses":
        return (
          <>
            <div className={`font-semibold p-4 ${vreeStore.isDarkMode ? "text-white" : "text-black"}`}>Color</div>
            <ColorComponent selectedSection="lenses" />
            <div className={`font-semibold p-4 ${vreeStore.isDarkMode ? "text-white" : "text-black"}`}>
              Material Properties
            </div>
            <div className={`font-semibold p-5 ${vreeStore.isDarkMode ? "text-white" : "text-black"}`}>
              <MaterialProgessBar
                name="Transparency"
                value={vreeStore.lensTransparency}
                onChange={CustomLens.updateLensesTransparency}
              />
            </div>
          </>
        );
      default:
        return null;
    }
  };

  const handleReset = () => {
    vreeStore.resetAllProperties();
  };

  return (
    <div
      style={{
        backgroundImage: 'url("/assets/background/sidebarbg.png")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: "10px",
      }}
      className="absolute right-0 top-10 bottom-10 m-10 rounded-lg w-125 border border-gray-400"
    >
      <div
        className={`flex justify-between p-2 h-10  ${vreeStore.isDarkMode ? "text-white" : "text-black"}`}
        style={{
          display: "flex",
          justifyContent: "space-between",
        //   transition: "all 0.3s ease",
          position: "sticky",
          top: "0",
          zIndex: "10",
        }}
      >
        <div
          className={`cursor-pointer ${selectedSection === "frame" ? "text-lg" : ""}`}
          onClick={() => handleSectionSelect("frame")}
          style={{
            flex: 1,
            textAlign: "center",
            transition: "all 0.3s ease",
            transform: selectedSection === "frame" ? "scale(1.2)" : "scale(1)",
            opacity: selectedSection === "frame" ? 1 : 0.7,
          }}
        >
          &larr; Frame
        </div>

        <div
          className={`cursor-pointer ${selectedSection === "temple" ? "text-lg" : ""}`}
          onClick={() => handleSectionSelect("temple")}
          style={{
            flex: 1,
            textAlign: "center",
            transition: "all 0.3s ease",
            transform: selectedSection === "temple" ? "scale(1.2)" : "scale(1)",
            opacity: selectedSection === "temple" ? 1 : 0.7,
          }}
        >
          Temple
        </div>

        <div
          className={`cursor-pointer ${selectedSection === "lenses" ? "text-lg" : ""}`}
          onClick={() => handleSectionSelect("lenses")}
          style={{
            flex: 1,
            textAlign: "center",
            transition: "all 0.3s ease",
            transform: selectedSection === "lenses" ? "scale(1.2)" : "scale(1)",
            opacity: selectedSection === "lenses" ? 1 : 0.7,
          }}
        >
          Lenses &rarr;
        </div>
      </div>

      <div className="border-b border-violet-600"></div>

      {/* Scrollable properties section */}
      <div className="overflow-y-auto h-[calc(100vh-300px)]">
        {renderProperties()}
      </div>

      <div className="border-b border-gray-600"></div>

      <div className="flex justify-between p-4 gap-1">
  <div
    className={`bg-gray-600 p-2 w-1/2 border rounded text-center ${vreeStore.isDarkMode ? "text-white border-gray-600 hover:bg-gray-700 hover:text-gray-200" : "text-black bg-white border-gray-300 hover:bg-gray-900 hover:text-white "}`}
    onClick={handleReset}
  >
    Reset
  </div>
  <div
    className={`text-violet-600 border border-violet-600 p-2 w-1/2 rounded text-center hover:bg-violet-700 hover:text-white ${vreeStore.isDarkMode ? "bg-gray-600 " : "bg-white "}`}
  >
    Save
  </div>
</div>

    </div>
  );
});

export default SideBarComponent;













// import React, { useState } from "react";
// import TextureComponent from "./TextureComponent";
// import ColorComponent from "./ColorComponent";
// import MaterialProgessBar from "./MaterialProgressBar";
// import { vreeStore } from "../VreeStore";
// import CustomFrame from "./Utils/CustomFrame";
// import CustomTemple from "./Utils/CustomTemple";
// import CustomLens from "./Utils/CustomLens";

// const SideBarComponent = () => {
//   const [selectedSectionIndex, setSelectedSectionIndex] = useState(0); // Start with 'frame' as center
//   const sections = ["frame", "temple", "lenses"]; // Define section order

//   // Handle rotating sections on arrow click
//   const handleChangeSection = (direction) => {
//     setSelectedSectionIndex((prevIndex) => {
//       if (direction === "left") {
//         return prevIndex === 0 ? sections.length - 1 : prevIndex - 1;
//       } else if (direction === "right") {
//         return prevIndex === sections.length - 1 ? 0 : prevIndex + 1;
//       }
//       return prevIndex;
//     });
//   };

//   // Render the properties based on the selected section
//   const renderProperties = () => {
//     switch (sections[selectedSectionIndex]) {
//       case "frame":
//         return (
//           <>
//             <TextureComponent
//               selectedSection={sections[selectedSectionIndex]}
//             />
//             <ColorComponent selectedSection={sections[selectedSectionIndex]} />
//             <div className="text-white font-semibold p-4">
//               Material Properties
//             </div>
//             <div className="text-white font-semibold p-5">
//               <MaterialProgessBar
//                 name="Metalic"
//                 value={vreeStore.frameMetalness}
//                 onChange={CustomFrame.updateFrameMetalness}
//               />
//             </div>
//             <div className="text-white font-semibold p-5">
//               <MaterialProgessBar
//                 name="Roughness"
//                 value={vreeStore.frameRoughness}
//                 onChange={CustomFrame.updateFrameRoughness}
//               />
//             </div>
//             <div className="text-white font-semibold p-5">
//               <MaterialProgessBar
//                 name="Transparency"
//                 value={vreeStore.frameOpacity}
//                 onChange={CustomFrame.updateFrameTransparency}
//               />
//             </div>
//           </>
//         );
//       case "temple":
//         return (
//           <>
//             <TextureComponent
//               selectedSection={sections[selectedSectionIndex]}
//             />
//             <ColorComponent selectedSection={sections[selectedSectionIndex]} />
//             <div className="text-white font-semibold p-4">
//               Material Properties
//             </div>
//             <div className="text-white font-semibold p-5">
//               <MaterialProgessBar
//                 name="Metalic"
//                 value={vreeStore.templeMetalness}
//                 onChange={CustomTemple.updateTempleMetalness}
//               />
//             </div>
//             <div className="text-white font-semibold p-5">
//               <MaterialProgessBar
//                 name="Roughness"
//                 value={vreeStore.templeRoughness}
//                 onChange={CustomTemple.updateTempleRoughness}
//               />
//             </div>
//             <div className="text-white font-semibold p-5">
//               <MaterialProgessBar
//                 name="Transparency"
//                 value={vreeStore.templeTransparency}
//                 onChange={CustomTemple.updateTempleTransparency}
//               />
//             </div>
//           </>
//         );
//       case "lenses":
//         return (
//           <>
//             <ColorComponent selectedSection="lenses" />
//             <div className="text-white font-semibold p-5">
//               <MaterialProgessBar
//                 name="Transparency"
//                 value={vreeStore.lensTransparency}
//                 onChange={CustomLens.updateLensesTransparency}
//               />
//             </div>
//           </>
//         );
//       default:
//         return null;
//     }
//   };

//   return (
//     <div
//       style={{
//         backgroundImage: 'url("/assets/background/sidebarbg.png")',
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//         padding: "10px",
//       }}
//       className="absolute right-0 top-10 m-10 rounded-lg w-120 h-[80vh]"
//     >
//       <div className="tab-section">
//         {/* Left Arrow Button */}

//         {/* Tab Content */}
//         <div className="tab-section-content">
//           {/* Left Tab */}
//           <div
//             className={`tab-content ${
//               selectedSectionIndex === 0 ? "selected" : ""
//             } text-white`}
//             onClick={() => handleChangeSection("left")}
//           >
//             ←Lenses
//           </div>

//           {/* Center Tab (the one that is visible and active) */}
//           <div
//             className={`tab-content ${
//               selectedSectionIndex === 1 ? "selected" : ""
//             } text-white`}
//           >
//             Frame
//           </div>

//           {/* Right Tab */}
//           <div
//             className={`tab-content ${
//               selectedSectionIndex === 2 ? "selected" : ""
//             } text-white `}
//             onClick={() => handleChangeSection("right")}
//           >
//             Temple→
//           </div>
//         </div>

//         {/* Right Arrow Button */}
//       </div>

//       <div className="border-b border-violet-600"></div>

//       <div className="overflow-y-auto max-h-[calc(100vh-270px)]">
//         {renderProperties()}
//       </div>

//       <div className="border-b border-gray-600"></div>

//       <div className="flex justify-between p-4">
//         <div className="text-white bg-gray-600 p-2 w-50 rounded text-center" onClick>
//           Reset
//         </div>
//         <div className="text-violet-600 bg-gray-600 border border-violet-600 p-2 w-50 rounded text-center">
//           Save
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SideBarComponent;

// import React, { useState } from "react";
// import TextureComponent from "./TextureComponent";
// import ColorComponent from "./ColorComponent";
// import MaterialProgessBar from "./MaterialProgressBar";
// import { vreeStore } from "../VreeStore";
// import CustomFrame from "./Utils/CustomFrame";
// import CustomTemple from "./Utils/CustomTemple";
// import CustomLens from "./Utils/CustomLens";

// const SideBarComponent = () => {
//   const [selectedSectionIndex, setSelectedSectionIndex] = useState(0); // Start with 'frame' as center
//   const sections = ["frame", "temple", "lenses"]; // Define section order

//   // Handle rotating sections on arrow click
//   const handleChangeSection = (direction) => {
//     setSelectedSectionIndex((prevIndex) => {
//       if (direction === "left") {
//         return prevIndex === 0 ? sections.length - 1 : prevIndex - 1;
//       } else if (direction === "right") {
//         return prevIndex === sections.length - 1 ? 0 : prevIndex + 1;
//       }
//       return prevIndex;
//     });
//   };

//   // Render the properties based on the selected section
//   const renderProperties = () => {
//     switch (sections[selectedSectionIndex]) {
//       case "frame":
//         return (
//           <>
//             <TextureComponent selectedSection={sections[selectedSectionIndex]} />
//             <ColorComponent selectedSection={sections[selectedSectionIndex]} />
//             <div className="text-white font-semibold p-4">Material Properties</div>
//             <div className="text-white font-semibold p-5">
//               <MaterialProgessBar
//                 name="Metalic"
//                 value={vreeStore.frameMetalness}
//                 onChange={CustomFrame.updateFrameMetalness}
//               />
//             </div>
//             <div className="text-white font-semibold p-5">
//               <MaterialProgessBar
//                 name="Roughness"
//                 value={vreeStore.frameRoughness}
//                 onChange={CustomFrame.updateFrameRoughness}
//               />
//             </div>
//             <div className="text-white font-semibold p-5">
//               <MaterialProgessBar
//                 name="Transparency"
//                 value={vreeStore.frameOpacity}
//                 onChange={CustomFrame.updateFrameTransparency}
//               />
//             </div>
//           </>
//         );
//       case "temple":
//         return (
//           <>
//             <TextureComponent selectedSection={sections[selectedSectionIndex]} />
//             <ColorComponent selectedSection={sections[selectedSectionIndex]} />
//             <div className="text-white font-semibold p-4">Material Properties</div>
//             <div className="text-white font-semibold p-5">
//               <MaterialProgessBar
//                 name="Metalic"
//                 value={vreeStore.templeMetalness}
//                 onChange={CustomTemple.updateTempleMetalness}
//               />
//             </div>
//             <div className="text-white font-semibold p-5">
//               <MaterialProgessBar
//                 name="Roughness"
//                 value={vreeStore.templeRoughness}
//                 onChange={CustomTemple.updateTempleRoughness}
//               />
//             </div>
//             <div className="text-white font-semibold p-5">
//               <MaterialProgessBar
//                 name="Transparency"
//                 value={vreeStore.templeTransparency}
//                 onChange={CustomTemple.updateTempleTransparency}
//               />
//             </div>
//           </>
//         );
//       case "lenses":
//         return (
//           <>
//             <ColorComponent selectedSection="lenses" />
//             <div className="text-white font-semibold p-5">
//               <MaterialProgessBar
//                 name="Transparency"
//                 value={vreeStore.lensTransparency}
//                 onChange={CustomLens.updateLensesTransparency}
//               />
//             </div>
//           </>
//         );
//       default:
//         return null;
//     }
//   };

//   return (
//     <div
//       style={{
//         backgroundImage: 'url("/assets/background/sidebarbg.png")',
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//         padding: "10px",
//       }}
//       className="absolute right-0 top-10 m-10 rounded-lg w-120 h-[80vh]"
//     >
//       <div className="tab-section">
//         {/* Left Arrow Button */}
//         <button
//           className="tab-button left-btn"
//           onClick={() => handleChangeSection("left")}
//         >
//           ←
//         </button>

//         {/* Tab Content */}
//         <div className="tab-section-content">
//           {/* Left Tab */}
//           <div
//             className={`tab-content ${
//               selectedSectionIndex === 0 ? "selected" : ""
//             } text-white`}
//             style={{
//               transform: selectedSectionIndex === 0 ? "scale(1.2)" : "scale(1)",
//               opacity: selectedSectionIndex === 0 ? 1 : 0.7,
//             }}
//           >
//             Frame
//           </div>

//           {/* Center Tab (the one that is visible and active) */}
//           <div
//             className={`tab-content ${
//               selectedSectionIndex === 1 ? "selected" : ""
//             } text-white`}
//             style={{
//               transform: selectedSectionIndex === 1 ? "scale(1.2)" : "scale(1)",
//               opacity: selectedSectionIndex === 1 ? 1 : 0.7,
//             }}
//           >
//             Temple
//           </div>

//           {/* Right Tab */}
//           <div
//             className={`tab-content ${
//               selectedSectionIndex === 2 ? "selected" : ""
//             } text-white`}
//             style={{
//               transform: selectedSectionIndex === 2 ? "scale(1.2)" : "scale(1)",
//               opacity: selectedSectionIndex === 2 ? 1 : 0.7,
//             }}
//           >
//             Lenses
//           </div>
//         </div>

//         {/* Right Arrow Button */}
//         <button
//           className="tab-button right-btn"
//           onClick={() => handleChangeSection("right")}
//         >
//           →
//         </button>
//       </div>

//       <div className="border-b border-violet-600"></div>

//       {/* Scrollable properties section */}
//       <div className="overflow-y-auto max-h-[calc(100vh-270px)]">
//         {renderProperties()}
//       </div>

//       <div className="border-b border-gray-600"></div>

//       <div className="flex justify-between p-4">
//         <div className="text-white bg-gray-600 p-2 w-50 rounded text-center">
//           Reset
//         </div>
//         <div className="text-violet-600 bg-gray-600 border border-violet-600 p-2 w-50 rounded text-center">
//           Save
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SideBarComponent;
