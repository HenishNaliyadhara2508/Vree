import * as THREE from 'three'
import { vreeStore } from "../../VreeStore";
class CustomLens {
    constructor() {
        vreeStore.lensesMesh = [vreeStore.frameMesh.children[0],vreeStore.frameMesh.children[2]];
        vreeStore.lensColor = vreeStore.lensesMesh[0].material.color;
        vreeStore.lensTransparency = vreeStore.lensesMesh[0].material.opacity;
    
    
      }
    
      updateLensesColor(color) {
        vreeStore.lensColor = color;
        vreeStore.lensesMesh[0].material.color = new THREE.Color(color);
        vreeStore.lensesMesh[1].material.color = new THREE.Color(color);
      }
    
      updateLensesTransparency(transparency) {
        vreeStore.lensTransparency = transparency;
        vreeStore.lensesMesh[0].material.opacity = transparency;
        vreeStore.lensesMesh[1].material.opacity = transparency;
      }
}

export default CustomLens;