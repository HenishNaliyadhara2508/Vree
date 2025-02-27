import * as THREE from "three";
import { vreeStore } from "../../VreeStore";

class CustomTemple {
  constructor() {
    if (vreeStore.frameMesh && vreeStore.frameMesh.children.length > 3) {
      // Ensure there are at least 4 children in frameMesh
      vreeStore.templeMesh = [
        vreeStore.frameMesh.children[1],
        vreeStore.frameMesh.children[3],
      ];

      // Check if these children are meshes before accessing their material properties
      if (
        vreeStore.templeMesh[0] instanceof THREE.Mesh &&
        vreeStore.templeMesh[1] instanceof THREE.Mesh
      ) {
        // vreeStore.templeColor = vreeStore.templeMesh[0].material.color;
        // vreeStore.templeMetalness = vreeStore.templeMesh[0].material.metalness;
        // vreeStore.templeRoughness = vreeStore.templeMesh[0].material.roughness;
        // vreeStore.templeTransparency = vreeStore.templeMesh[0].material.opacity;
        vreeStore.templeMesh[0].material.metalness = vreeStore.templeMetalness;
        vreeStore.templeMesh[1].material.metalness = vreeStore.templeMetalness;
        vreeStore.templeMesh[0].material.roughness = vreeStore.templeRoughness;
        vreeStore.templeMesh[1].material.roughness = vreeStore.templeRoughness;
        vreeStore.templeMesh[0].material.transparent = true;
        vreeStore.templeMesh[1].material.transparent = true;

        vreeStore.templeMesh[0].material.opacity =
          1 - vreeStore.templeTransparency;
        vreeStore.templeMesh[1].material.opacity =
          1 - vreeStore.templeTransparency;
      } else {
        console.error("Temple mesh children are not valid Mesh objects.");
      }
    } else {
      console.error("Frame mesh or its children are not loaded properly.");
    }
  }

  static updateTempleTexture(texturePath, textureName) {
    if (
      vreeStore.templeMesh &&
      vreeStore.templeMesh[0] &&
      vreeStore.templeMesh[1]
    ) {
      vreeStore.templeTexture = textureName;
      if (textureName === "original.jpg") {
        vreeStore.templeMesh[0].material.map = vreeStore.templeIntialTexture;
        vreeStore.templeMesh[1].material.map = vreeStore.templeIntialTexture;
      } else {
        const loader = new THREE.TextureLoader();
        loader.load(texturePath, (texture) => {
          // Ensure the texture is applied to both temple meshes
          texture.colorSpace = THREE.SRGBColorSpace;
          texture.encoding = THREE.sRGBEncoding;
          texture.repeat.set(1, 1);
          texture.wrapS = THREE.RepeatWrapping; // Ensures that the texture is clamped to the edge (no repeat on edges)
          texture.wrapT = THREE.RepeatWrapping;
          texture.minFilter = THREE.LinearMipMapLinearFilter;
          texture.magFilter = THREE.LinearFilter;
          vreeStore.templeMesh[0].material.map = texture;
          vreeStore.templeMesh[1].material.map = texture;
        });
      }
    } else {
      console.error("Temple mesh is not properly initialized.");
    }
  }

  static updateTempleColor(color) {
    if (
      vreeStore.templeMesh &&
      vreeStore.templeMesh[0] &&
      vreeStore.templeMesh[1]
    ) {
      vreeStore.templeColor = color;
      vreeStore.templeMesh[0].material.color = new THREE.Color(color);
      vreeStore.templeMesh[1].material.color = new THREE.Color(color);
    } else {
      console.error("Temple mesh is not properly initialized.");
    }
  }

  static updateTempleMetalness(metalness) {
    if (
      vreeStore.templeMesh &&
      vreeStore.templeMesh[0] &&
      vreeStore.templeMesh[1]
    ) {
      vreeStore.templeMetalness = metalness;
      vreeStore.templeMesh[0].material.metalness = metalness;
      vreeStore.templeMesh[1].material.metalness = metalness;

      vreeStore.templeMesh[0].material.needsUpdate = true;
      vreeStore.templeMesh[1].material.needsUpdate = true;
    } else {
      console.error("Temple mesh is not properly initialized.");
    }
  }

  static updateTempleRoughness(roughness) {
    if (
      vreeStore.templeMesh &&
      vreeStore.templeMesh[0] &&
      vreeStore.templeMesh[1]
    ) {
      vreeStore.templeRoughness = roughness;
      vreeStore.templeMesh[0].material.roughness = roughness;
      vreeStore.templeMesh[1].material.roughness = roughness;

      vreeStore.templeMesh[0].material.needsUpdate = true;
      vreeStore.templeMesh[1].material.needsUpdate = true;
    } else {
      console.error("Temple mesh is not properly initialized.");
    }
  }

  static updateTempleTransparency(transparency) {
    if (
      vreeStore.templeMesh &&
      vreeStore.templeMesh[0] &&
      vreeStore.templeMesh[1]
    ) {
      vreeStore.templeTransparency = transparency;
      vreeStore.templeMesh[0].material.opacity = 1 - transparency;
      vreeStore.templeMesh[1].material.opacity = 1 - transparency;

      vreeStore.templeMesh[0].material.transparent = true;
      vreeStore.templeMesh[1].material.transparent = true;
      vreeStore.templeMesh[0].material.needsUpdate = true;
      vreeStore.templeMesh[1].material.needsUpdate = true;
    } else {
      console.error("Temple mesh is not properly initialized.");
    }
  }
}

export default CustomTemple;

// import * as THREE from "three";
// import { vreeStore } from "../../VreeStore";

// class CustomTemple {
//   constructor() {
//     vreeStore.templeMesh = [
//       vreeStore.frameMesh.children[1],
//       vreeStore.frameMesh.children[3],
//     ];
//     vreeStore.templeTexture = null;
//     vreeStore.templeColor = vreeStore.templeMesh[0].material.color;
//     vreeStore.templeMetalness = vreeStore.templeMesh[0].material.metalness;
//     vreeStore.templeRoughness = vreeStore.templeMesh[0].material.roughness;
//     vreeStore.templeTransparency = vreeStore.templeMesh[0].material.opacity;
//   }

//   static updateTempleTexture(texturePath, textureName) {
//     vreeStore.templeTexture = textureName;
//     const loader = new THREE.TextureLoader();
//     loader.load(texturePath, (texture) => {
//       // texture.colorSpace = THREE.SRGBColorSpace;
//       vreeStore.templeMesh[0].material.map = texture;
//       vreeStore.templeMesh[1].material.map = texture;
//     });
//   }

//   static updateTempleColor(color) {
//     vreeStore.templeColor = color;
//     console.log(color, "color");
//     vreeStore.templeMesh[0].material.color = new THREE.Color(color);
//     vreeStore.templeMesh[1].material.color = new THREE.Color(color);
//   }

//   static updateTempleMetalness(metalness) {
//     vreeStore.templeMetalness = metalness;
//     console.log(metalness, "metalness");
//     vreeStore.templeMesh[0].material.metalness = metalness;
//     vreeStore.templeMesh[1].material.metalness = metalness;

//     vreeStore.templeMesh[0].material.needsUpdate = true;
//     vreeStore.templeMesh[1].material.needsUpdate = true;
//   }

//   static updateTempleRoughness(roughness) {
//     vreeStore.templeRoughness = roughness;
//     vreeStore.templeMesh[0].material.roughness = roughness;
//     vreeStore.templeMesh[1].material.roughness = roughness;

//     vreeStore.templeMesh[0].material.needsUpdate = true;
//     vreeStore.templeMesh[1].material.needsUpdate = true;
//   }

//   static updateTempleTransparency(transparency) {
//     vreeStore.templeTransparency = transparency;
//     vreeStore.templeMesh[0].material.opacity = 1 - transparency;
//     vreeStore.templeMesh[1].material.opacity = 1 - transparency;

//     vreeStore.templeMesh[0].material.transparent = true;
//     vreeStore.templeMesh[1].material.transparent = true;
//     vreeStore.templeMesh[0].material.needsUpdate = true;
//     vreeStore.templeMesh[1].material.needsUpdate = true;
//   }
// }

// export default CustomTemple;
