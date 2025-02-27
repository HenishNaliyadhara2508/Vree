import { vreeStore } from "../VreeStore";
import CustomFrame from "./Utils/CustomFrame";
import CustomTemple from "./Utils/CustomTemple";
import { observer } from "mobx-react";

const TextureComponent = observer(({ selectedSection }) => {
  // Function to get the selected texture from vreeStore based on section
  const getSelectedTexture = () => {
    if (selectedSection === "frame") {
      return vreeStore.frameTexture;
    } else if (selectedSection === "temple") {
      return vreeStore.templeTexture;
    }
    return "original.jpg"; // Default texture
  };

  // Define the available textures
  const textures = [
    {
      texturePath: "/assets/texture/2342.jpg",
      textureName: "null",
      textureImage: "/assets/texture/null_image.svg",
    },
    {
      texturePath: "/assets/texture/original.jpg",
      textureName: "original.jpg",
      textureImage: "/assets/texture/original.jpg",
    },
    {
      texturePath: "/assets/texture/texture1.png",
      textureName: "texture1",
      textureImage: "/assets/texture/texture1.png",
    },
    {
      texturePath: "/assets/texture/texture2.jpg",
      textureName: "texture2",
      textureImage: "/assets/texture/texture2.jpg",
    },
  ];

  // Function to handle texture selection and update vreeStore
  const handleSelectTexture = (TextureName, TexturePath) => {
    console.log(TexturePath, TextureName, "path and name");

    if (selectedSection === "frame") {
      vreeStore.frameTexture = TextureName; // Update the selected texture for frame
      CustomFrame.updateFrameTexture(TexturePath, TextureName); // Update texture for the frame
    }

    if (selectedSection === "temple") {
      vreeStore.templeTexture = TextureName; // Update the selected texture for temple
      // if (TextureName === "original.jpg") {
      //   // If the selected texture is "original.jpg", use the initial texture from vreeStore
      //   CustomTemple.updateTempleTexture(vreeStore.templeIntialTexture, TextureName);
      // } else {
      //   // For other textures, use the selected texture
      //   CustomTemple.updateTempleTexture(TexturePath, TextureName);
      // }
      CustomTemple.updateTempleTexture(TexturePath, TextureName); // Update texture for the temple
    }
  };

  return (
    <>
      
      <div className="mx-5 my-3 flex space-x-12 ms-8 p-4">
        {textures.map((texture) => (
          <div
            key={texture.textureName}
            className={`relative cursor-pointer w-10 h-10 border border-gray-300 rounded-full bg-cover bg-center transition-all duration-300 ${
              getSelectedTexture() === texture.textureName
                ? "shadow-[0_0_20px_4px_rgba(150,100,255,0.75)] scale-105"
                : "hover:scale-110 hover:shadow-[0_0_15px_2px_rgba(245,245,245,0.75)]"
            }`}
            style={{ backgroundImage: `url(${texture.textureImage})` }}
            onClick={() =>
              handleSelectTexture(texture.textureName, texture.texturePath)
            }
          >
            {getSelectedTexture() === texture.textureName && (
              <div className="absolute inset-0 bg-black opacity-50 rounded-full"></div>
            )}
          </div>
        ))}
      </div>
    </>
  );
});

export default TextureComponent;

// import { useState } from "react";
// import CustomFrame from "./Utils/CustomFrame";
// import CustomTemple from "./Utils/CustomTemple";

// const TextureComponent = ({ selectedSection }) => {
//   const [selectedTexture, setSelectedTexture] = useState("original.jpg");

//   const availableTextures = [
//     { path: "/assets/texture/null_image.svg", name: "null" },
//     { path: "/assets/texture/original.jpg", name: "original.jpg" },
//     { path: "/assets/texture/texture1.png", name: "texture1" },
//     { path: "/assets/texture/texture2.jpg", name: "texture2" },
//     { path: "/assets/texture/texture3.jpg", name: "texture3" },
//   ];

//   // Determine which textures to show based on the selected section
//   const texturesToShow =
//     selectedSection === "frame"
//       ? [...availableTextures.slice(0, 3), availableTextures[4]] // Replace 4th texture with the 5th for frame
//       : availableTextures.slice(0, 4); // Show only the first 4 textures for temple

//   const handleTextureSelection = (name, path) => {
//     console.log(`Selected Texture: ${name} at ${path}`);
//     setSelectedTexture(name);

//     if (selectedSection === "frame") {
//       CustomFrame.updateFrameTexture(path, name);
//     }

//     if (selectedSection === "temple") {
//       CustomTemple.updateTempleTexture(path, name);
//     }
//   };

//   return (
//     <div className="p-4">

//       <div className="flex flex-wrap gap-15 mb-2">
//         {texturesToShow.map((texture) => (
//           <div
//             key={texture.name}
//             className={`relative cursor-pointer w-10 h-10 rounded-full transition-all duration-300 ${
//               selectedTexture === texture.name
//                 ? "shadow-[0_0_20px_4px_rgba(150,100,255,0.75)] scale-105"
//                 : "hover:scale-110 hover:shadow-[0_0_15px_2px_rgba(245,245,245,0.75)]"
//             }`}
//             style={{
//               backgroundImage: `url(${texture.path})`,
//               backgroundSize: "cover",
//               backgroundPosition: "center",
//             }}
//             onClick={() => handleTextureSelection(texture.name, texture.path)}
//           >
//             {selectedTexture === texture.name && (
//               <div className="absolute inset-0 bg-black opacity-40 rounded-3xl"></div>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default TextureComponent;
