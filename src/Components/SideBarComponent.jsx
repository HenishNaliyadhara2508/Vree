import React, { useState } from "react";
import TextureComponent from "./TextureComponent";
import ColorComponent from "./ColorComponent";
import MaterialProgessBar from "./MaterialProgressBar";
import { vreeStore } from "../VreeStore";
import CustomFrame from "./Utils/CustomFrame";
import CustomTemple from "./Utils/CustomTemple";
import CustomLens from "./Utils/CustomLens";

const SideBarComponent = () => {
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
              <TextureComponent selectedSection={selectedSection} />
              <ColorComponent selectedSection={selectedSection} />
              <div className="text-white font-semibold p-4">Material Properties</div>
              <div className="text-white font-semibold p-5">
                
                <MaterialProgessBar name="Metalic" value={vreeStore.frameMetalness} onChange={CustomFrame.updateFrameMetalness}/>
                {console.log(vreeStore.frameMetalness)}
                {/* {console.log(CustomFrame.updateFrameMetalness())} */}

              </div>
              <div className="text-white font-semibold p-5">
                
                <MaterialProgessBar name="Roughness" value={vreeStore.frameRoughness} onChange={CustomFrame.updateFrameRoughness}/>
              </div>
              <div className="text-white font-semibold p-5">
                
                <MaterialProgessBar name="Transparency" value={vreeStore.frameOpacity} onChange={CustomFrame.updateFrameTransparency} />
              </div>
            </>
          );
      case "temple":
        return (
          <>
            <TextureComponent selectedSection={selectedSection} />
            <ColorComponent selectedSection={selectedSection} />
            <div className="text-white font-semibold p-4">Material Properties</div>
            <div className="text-white font-semibold p-5">
             
              <MaterialProgessBar name="Metalic" value={vreeStore.templeMetalness} onChange={CustomTemple.updateTempleMetalness} />
            </div>
            <div className="text-white font-semibold p-5">
              
              <MaterialProgessBar name="Roughness" value={vreeStore.templeRoughness} onChange={CustomTemple.updateTempleRoughness} />
            </div>
            <div className="text-white font-semibold p-5">
              
              <MaterialProgessBar name="Transparency" value={vreeStore.templeTransparency} onChange={CustomTemple.updateTempleTransparency} />
            </div>
          </>
        );
      case "lenses":
        return (
          <>
            <ColorComponent selectedSection="lenses" />
            <div className="text-white font-semibold p-5">
              
              <MaterialProgessBar name="Transparency" value={vreeStore.lensTransparency} onChange={CustomLens.updateLensesTransparency} />
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <div
        style={{
          backgroundImage: 'url("/assets/background/sidebarbg.png")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          padding: "10px",
        }}
        className="absolute right-0 top-10 m-10 rounded-lg w-120 h-[80vh]" // Fixed height to fit screen
      >
        <div
          className="flex justify-between text-white p-4 transition-all duration-300"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            transition: 'all 0.3s ease-in-out',
            position: 'sticky',
            top: '0', // Fix the top section
            zIndex: '10', // To ensure it stands out
          }}
        >
          <div
            className={`cursor-pointer ${selectedSection === "frame" ? "font-bold text-xl" : "text-lg"}`}
            onClick={() => handleSectionSelect("frame")}
            style={{
              flex: 1,
              textAlign: "center",
              transition: 'all 0.3s ease',
              transform: selectedSection === "frame" ? "scale(1.2)" : "scale(1)",
              opacity: selectedSection === "frame" ? 1 : 0.7,
            }}
          >
            Frame
          </div>

          <div
            className={`cursor-pointer ${selectedSection === "temple" ? "font-bold text-xl" : "text-lg"}`}
            onClick={() => handleSectionSelect("temple")}
            style={{
              flex: 1,
              textAlign: "center",
              transition: 'all 0.3s ease',
              transform: selectedSection === "temple" ? "scale(1.2)" : "scale(1)",
              opacity: selectedSection === "temple" ? 1 : 0.7,
            }}
          >
            Temple
          </div>

          <div
            className={`cursor-pointer ${selectedSection === "lenses" ? "font-bold text-xl" : "text-lg"}`}
            onClick={() => handleSectionSelect("lenses")}
            style={{
              flex: 1,
              textAlign: "center",
              transition: 'all 0.3s ease',
              transform: selectedSection === "lenses" ? "scale(1.2)" : "scale(1)",
              opacity: selectedSection === "lenses" ? 1 : 0.7,
            }}
          >
            Lenses
          </div>
        </div>

        <div className="border-b border-violet-600"></div>

        {/* Scrollable properties section */}
        <div className="overflow-y-auto max-h-[calc(100vh-270px)]">
          {renderProperties()}
        </div>

        <div className="border-b border-gray-600"></div>

        <div className="flex justify-between p-4">
          <div className="text-white bg-gray-600 p-2 w-50 rounded text-center">Reset</div>
          <div className="text-violet-600 bg-gray-600 border border-violet-600 p-2 w-50 rounded text-center">Save</div>
        </div>
      </div>
    </>
  );
};

export default SideBarComponent;

