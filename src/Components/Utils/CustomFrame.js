import * as THREE from "three";
import { vreeStore } from "../../VreeStore";
class CustomFrame {
    constructor() {
        vreeStore.frameTexture = null;
        vreeStore.frameColor = vreeStore.frameMesh.material.color;

        vreeStore.frameMetalness = vreeStore.frameMesh.material.metalness;
        vreeStore.frameRoughness = vreeStore.frameMesh.material.roughness;
        // vreeStore.frameMesh.material.transparent = true;
        vreeStore.frameTransparency = vreeStore.frameMesh.material.opacity;
      }
    
      static updateFrameTexture(texturePath, textureName) {
        vreeStore.frameTexture = textureName;
        const loader = new THREE.TextureLoader();
        loader.load(texturePath, (texture) => {
          texture.colorSpace = THREE.SRGBColorSpace;
          vreeStore.frameMesh.material.map = texture;
          vreeStore.frameMesh.material.needsUpdate = true;
        });
      }
    
      static updateFrameColor(color) {
        vreeStore.frameColor = color;
        vreeStore.frameMesh.material.color = new THREE.Color(color);
      }
    
      static updateFrameMetalness(metalness) {
        vreeStore.frameMetalness = metalness;
        vreeStore.frameMesh.material.metalness = metalness;
      }
    
      static updateFrameRoughness(roughness) {
        vreeStore.frameRoughness = roughness;
        vreeStore.frameMesh.material.roughness = roughness;
      }
    
      static updateFrameTransparency(transparency) {
        vreeStore.frameTransparency = transparency;
        vreeStore.frameMesh.material.opacity = transparency;
      }
}
export default CustomFrame;

// import { observer } from "mobx-react";
// import { vreeStore } from "../../VreeStore";
// import * as THREE from "three";
// 
// 
// class CustomFrame {
//   constructor() {
//     // Initialize frame properties by setting them via store actions
//     vreeStore.setFrameMetalness(vreeStore.frameMesh.material.metalness);
//     vreeStore.setFrameColor(vreeStore.frameMesh.material.color.getHexString()); // Store the color in hex format
//     vreeStore.setFrameTransparency(vreeStore.frameMesh.material.opacity);
//   }

//   static updateFrameTexture(texturePath, textureName) {
//     vreeStore.setFrameTexture(textureName); // Use the action to update the texture name
//     const loader = new THREE.TextureLoader();
//     loader.load(texturePath, (texture) => {
//       texture.colorSpace = THREE.SRGBColorSpace;
//       vreeStore.frameMesh.material.map = texture;
//       vreeStore.frameMesh.material.needsUpdate = true;
//     });
//   }

//   static updateFrameColor(color) {
//     vreeStore.setFrameColor(color); // Use the action to update the color in store
//     vreeStore.frameMesh.material.color = new THREE.Color(color);
//   }

//   static updateFrameMetalness(metalness) {
//     vreeStore.setFrameMetalness(metalness); // Use the action to update metalness in store
//     vreeStore.frameMesh.material.metalness = metalness;
//   }

//   static updateFrameRoughness(roughness) {
//     vreeStore.setFrameRoughness(roughness); // Use the action to update roughness in store
//     vreeStore.frameMesh.material.roughness = roughness;
//   }

//   static updateFrameTransparency(transparency) {
//     vreeStore.setFrameTransparency(transparency); // Use the action to update transparency in store
//     vreeStore.frameMesh.material.opacity = transparency;
//   }

//   render() {
//     // Any rendering logic here for your class-based component if needed
//     return null; // Assuming no JSX render, just managing state.
//   }
// }

// export default observer(CustomFrame);

