import * as THREE from "three";
import { vreeStore } from "../../VreeStore";
class CustomLens {
  constructor() {
    vreeStore.lensesMesh = [
      vreeStore.frameMesh.children[0],
      vreeStore.frameMesh.children[2],
    ];
    vreeStore.lensColor = vreeStore.lensesMesh[0].material.color;
    vreeStore.lensesMesh[0].material.transparent = true;
    vreeStore.lensesMesh[1].material.transparent = true;
    
    vreeStore.lensesMesh[0].material.opacity = vreeStore.lensOpacity 
    // vreeStore.lensesMesh[0].material.opacity = 0.8;
    // Ensure transparency is enabled for lenses material
  }

  static updateLensesColor(color) {
    vreeStore.lensColor = color;
    vreeStore.lensesMesh[0].material.color = new THREE.Color(color);
    vreeStore.lensesMesh[1].material.color = new THREE.Color(color);
  }

  static updateLensesTransparency(transparency) {
    vreeStore.lensTransparency = transparency;
    vreeStore.lensesMesh[0].material.opacity = 1 - transparency;
    vreeStore.lensesMesh[1].material.opacity = 1 - transparency;

    vreeStore.lensesMesh[0].material.transparent = true;
    vreeStore.lensesMesh[1].material.transparent = true;
    vreeStore.lensesMesh[0].material.needsUpdate = true;
    vreeStore.lensesMesh[1].material.needsUpdate = true;
  }
}

export default CustomLens;
