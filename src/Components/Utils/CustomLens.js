import * as THREE from "three";
import { vreeStore } from "../../VreeStore";
class CustomLens {
    constructor() {
      vreeStore.lensesMesh = [vreeStore.frameMesh.children[0], vreeStore.frameMesh.children[2]];
      vreeStore.lensColor = vreeStore.lensesMesh[0].material.color;
      vreeStore.lensTransparency = vreeStore.lensesMesh[0].material.opacity;
      console.log(vreeStore.lensesMesh[0].material.opacity, "lensopacity");
      // Ensure transparency is enabled for lenses material
      vreeStore.lensesMesh[0].material.transparent = true;
      vreeStore.lensesMesh[1].material.transparent = true;
    }
  
    static updateLensesColor(color) {
      vreeStore.lensColor = color;
      vreeStore.lensesMesh[0].material.color = new THREE.Color(color);
      vreeStore.lensesMesh[1].material.color = new THREE.Color(color);
    }
  
    static updateLensesTransparency(transparency) {
      vreeStore.lensTransparency = transparency;
      console.log(transparency, "transparency");
      vreeStore.lensesMesh[0].material.opacity = 1 - transparency;
      vreeStore.lensesMesh[1].material.opacity = 1 - transparency;
      
      // Ensure material updates
      vreeStore.lensesMesh[0].material.needsUpdate = true;
      vreeStore.lensesMesh[1].material.needsUpdate = true;
    }
  }
  
  export default CustomLens;
  
