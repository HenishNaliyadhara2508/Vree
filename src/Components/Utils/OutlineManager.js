// src/Utils/OutlineManager.js

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
    this.outlinePass.edgeStrength = 2;
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
