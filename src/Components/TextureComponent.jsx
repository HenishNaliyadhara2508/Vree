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
      <h2 className="text-xl font-semibold mb-4">Choose Texture</h2>
      <div className="grid grid-cols-4 gap-4">
        {availableTextures.map((texture) => (
          <div
            key={texture.name}
            className={`relative cursor-pointer w-24 h-24 rounded-lg transition-all duration-300 ${
              selectedTexture === texture.name
                ? "border-4 border-blue-500 shadow-lg scale-105"
                : "hover:border-4 hover:border-white hover:scale-110"
            }`}
            style={{
              backgroundImage: `url(${texture.path})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            onClick={() =>
              handleTextureSelection(texture.name, texture.path)
            }
          >
            {selectedTexture === texture.name && (
              <div className="absolute inset-0 bg-black opacity-40 rounded-lg"></div>
            )}
            <span className="absolute bottom-2 left-2 text-white text-sm font-bold bg-black bg-opacity-60 px-2 py-1 rounded-md">
              {texture.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TextureComponent;
