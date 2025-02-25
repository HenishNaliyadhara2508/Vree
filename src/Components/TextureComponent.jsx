import { useState } from "react";
import CustomFrame from "./Utils/CustomFrame";
import CustomTemple from "./Utils/CustomTemple";

const TextureComponent = ({ selectedSection }) => {
  const [selectedTexture, setSelectedTexture] = useState(null);

  const availableTextures = [
    { path: "/assets/texture/null_image.svg", name: "null" },
    { path: "/assets/texture/original.jpg", name: "original.jpg" },
    { path: "/assets/texture/texture1.png", name: "texture1" },
    { path: "/assets/texture/texture2.jpg", name: "texture2" },
    { path: "/assets/texture/texture3.jpg", name: "texture3" },
  ];

  // Determine which textures to show based on the selected section
  const texturesToShow =
    selectedSection === "frame"
      ? [...availableTextures.slice(0, 3), availableTextures[4]] // Replace 4th texture with the 5th for frame
      : availableTextures.slice(0, 4); // Show only the first 4 textures for temple

  const handleTextureSelection = (name, path) => {
    console.log(`Selected Texture: ${name} at ${path}`);
    setSelectedTexture(name);

    if (selectedSection === "frame") {
      CustomFrame.updateFrameTexture(path, name);
    }

    if (selectedSection === "temple") {
      CustomTemple.updateTempleTexture(path, name);
    }
  };

  return (
    <div className="p-4">
      
      <div className="flex flex-wrap gap-15 mb-2">
        {texturesToShow.map((texture) => (
          <div
            key={texture.name}
            className={`relative cursor-pointer w-10 h-10 rounded-full transition-all duration-300 ${
              selectedTexture === texture.name
                ? "shadow-[0_0_20px_4px_rgba(150,100,255,0.75)] scale-105"
                : "hover:scale-110 hover:shadow-[0_0_15px_2px_rgba(245,245,245,0.75)]"
            }`}
            style={{
              backgroundImage: `url(${texture.path})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            onClick={() => handleTextureSelection(texture.name, texture.path)}
          >
            {selectedTexture === texture.name && (
              <div className="absolute inset-0 bg-black opacity-40 rounded-3xl"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TextureComponent;
