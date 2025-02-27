// import * as THREE from "three";
// import { OutlinePass } from "three/examples/jsm/postprocessing/OutlinePass.js";

// class OutlineManager {
//   constructor(composer, scene, camera) {
//     this.composer = composer;
//     this.scene = scene;
//     this.camera = camera;
//     this.outlinePass = new OutlinePass(
//       new THREE.Vector2(window.innerWidth * 0.6, window.innerHeight),
//       this.scene,
//       this.camera
//     );
//     this.outlinePass.edgeStrength = 3;
//     this.outlinePass.edgeGlow = 1;
//     this.outlinePass.edgeThickness = 1;
//     this.outlinePass.visibleEdgeColor.set("#a774ff");
//     this.composer.addPass(this.outlinePass);

//     // Track meshes
//     this.meshes = {
//       frame: null,
//       temple: null,
//       lenses: null,
//     };
//   }

//   // Set the meshes for each section
//   setMeshes(frameMesh, templeMesh, lensesMesh) {
//     if (frameMesh instanceof THREE.Mesh) this.meshes.frame = frameMesh;
//     if (templeMesh instanceof THREE.Mesh) this.meshes.temple = templeMesh;
//     if (lensesMesh instanceof THREE.Mesh) this.meshes.lenses = lensesMesh;
//   }

//   // Method to select an object and apply the outline effect
//   selectObject(section) {
//     const mesh = this.meshes[section];

//     if (!mesh) {
//       console.warn(`${section} mesh not loaded yet.`);
//       return;
//     }

//     // Ensure that we're dealing with a valid object that can traverse
//     if (mesh instanceof THREE.Object3D) {
//       // Clear previous selection before applying the new one
//       this.clearSelectedObjects(); 
//       this.setSelectedObjects([mesh]);
//     } else {
//       console.error(`${section} is not a valid THREE.Object3D or Mesh.`);
//     }
//   }

//   // Method to set selected objects for the outline effect
//   setSelectedObjects(objects) {
//     this.outlinePass.selectedObjects = objects;
//     objects.forEach((object) => {
//       if (object instanceof THREE.Object3D) {
//         object.material.side = THREE.FrontSide;
//         object.castShadow = true;
//       }
//     });
//   }

//   // Clear selected objects (no outline)
//   clearSelectedObjects() {
//     this.outlinePass.selectedObjects = [];
//   }

//   // Method to enable/disable the outline effect
//   setOutlineEffect(enabled) {
//     this.outlinePass.enabled = enabled;
//   }

//   // Handle selection for each section
//   handleSelectFrame() {
//     this.selectObject('frame');
//   }

//   handleSelectTemple() {
//     this.selectObject('temple');
//   }

//   handleSelectLenses() {
//     this.selectObject('lenses');
//   }

//   handleSelectSection(selectedSection) {
//     switch (selectedSection) {
//       case "frame":
//         this.handleSelectFrame();
//         break;
//       case "temple":
//         this.handleSelectTemple();
//         break;
//       case "lenses":
//         this.handleSelectLenses();
//         break;
//       default:
//         this.clearSelectedObjects();
//         break;
//     }
//   }
// }

// export default OutlineManager;





// // src/Utils/OutlineManager.js

import * as THREE from "three";
import { OutlinePass } from "three/examples/jsm/postprocessing/OutlinePass.js";

class OutlineManager {
  constructor(composer, scene, camera) {
    this.composer = composer;
    this.scene = scene;
    this.camera = camera;
    this.outlinePass = new OutlinePass(
      new THREE.Vector2(window.innerWidth * 0.6, window.innerHeight),
      this.scene,
      this.camera
    );
    this.outlinePass.edgeStrength = 3;
    this.outlinePass.edgeGlow = 1;
    this.outlinePass.edgeThickness = 1;
    this.outlinePass.visibleEdgeColor.set("#a774ff");
    this.composer.addPass(this.outlinePass);
  }

  setSelectedObjects(objects) {
    this.outlinePass.selectedObjects = objects;
    objects.forEach((object) => {
      object.material.side = THREE.FrontSide;
      object.castShadow = true;
    });
  }

  clearSelectedObjects() {
    this.outlinePass.selectedObjects = [];
  }

  setOutlineEffect(enabled) {
    this.outlinePass.enabled = enabled;
  }
}

export default OutlineManager;
