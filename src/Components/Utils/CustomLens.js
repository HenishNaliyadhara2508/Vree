import * as THREE from "three";
import { vreeStore } from "../../VreeStore";

class CustomLens {
  constructor() {
    if (vreeStore.frameMesh && vreeStore.frameMesh.children.length > 2) {
      // Safely access children of the frameMesh
      vreeStore.lensesMesh = [
        vreeStore.frameMesh.children[0],
        vreeStore.frameMesh.children[2],
      ];

      // Make sure both children are meshes
      if (vreeStore.lensesMesh[0] instanceof THREE.Mesh && vreeStore.lensesMesh[1] instanceof THREE.Mesh) {
        // vreeStore.lensColor = vreeStore.lensesMesh[0].material.color;
        // vreeStore.lensesMesh[0].material.transparent = true;
        // vreeStore.lensesMesh[1].material.transparent = true;

        // vreeStore.lensOpacity = vreeStore.lensesMesh[0].material.opacity;

        // vreeStore.lensTransparency = 1 - vreeStore.lensOpacity;
        // vreeStore.lensesMesh[0].material.opacity = 1  - vreeStore.lensTransparency;
        // vreeStore.lensesMesh[1].material.opacity = 1  - vreeStore.lensTransparency;

        vreeStore.lensesMesh[0].material.transparent = true;
        vreeStore.lensesMesh[1].material.transparent = true;
        vreeStore.lensesMesh[0].material.opacity = 1- vreeStore.lensTransparency;
        vreeStore.lensesMesh[1].material.opacity = 1- vreeStore.lensTransparency;
      } else {
        console.error("Lenses mesh children are not valid Mesh objects.");
      }
    } else {
      console.error("Frame mesh or its children are not loaded properly.");
    }
  }

  static updateLensesColor(color) {
    if (vreeStore.lensesMesh && vreeStore.lensesMesh[0] && vreeStore.lensesMesh[1]) {
      vreeStore.lensColor = color;
      vreeStore.lensesMesh[0].material.color = new THREE.Color(color);
      vreeStore.lensesMesh[1].material.color = new THREE.Color(color);
    } else {
      console.error("Lenses mesh not properly initialized.");
    }
  }

  static updateLensesTransparency(transparency) {
    if (vreeStore.lensesMesh && vreeStore.lensesMesh[0] && vreeStore.lensesMesh[1]) {
      vreeStore.lensTransparency = transparency;
      vreeStore.lensesMesh[0].material.opacity = 1 - transparency;
      vreeStore.lensesMesh[1].material.opacity = 1 - transparency;

      vreeStore.lensesMesh[0].material.transparent = true;
      vreeStore.lensesMesh[1].material.transparent = true;
      vreeStore.lensesMesh[0].material.needsUpdate = true;
      vreeStore.lensesMesh[1].material.needsUpdate = true;
    } else {
      console.error("Lenses mesh not properly initialized.");
    }
  }
}

export default CustomLens;


// import * as THREE from "three";
// import { vreeStore } from "../../VreeStore";
// class CustomLens {
//   constructor() {
//     vreeStore.lensesMesh = [
//       vreeStore.frameMesh.children[0],
//       vreeStore.frameMesh.children[2],
//     ];
//     vreeStore.lensColor = vreeStore.lensesMesh[0].material.color;
//     vreeStore.lensesMesh[0].material.transparent = true;
//     vreeStore.lensesMesh[1].material.transparent = true;
    
//     vreeStore.lensesMesh[0].material.opacity = vreeStore.lensOpacity 
//     // vreeStore.lensesMesh[0].material.opacity = 0.8;
//     // Ensure transparency is enabled for lenses material
//   }

//   static updateLensesColor(color) {
//     vreeStore.lensColor = color;
//     vreeStore.lensesMesh[0].material.color = new THREE.Color(color);
//     vreeStore.lensesMesh[1].material.color = new THREE.Color(color);
//   }

//   static updateLensesTransparency(transparency) {
//     vreeStore.lensTransparency = transparency;
//     vreeStore.lensesMesh[0].material.opacity = 1 - transparency;
//     vreeStore.lensesMesh[1].material.opacity = 1 - transparency;

//     vreeStore.lensesMesh[0].material.transparent = true;
//     vreeStore.lensesMesh[1].material.transparent = true;
//     vreeStore.lensesMesh[0].material.needsUpdate = true;
//     vreeStore.lensesMesh[1].material.needsUpdate = true;
//   }
// }

// export default CustomLens;
