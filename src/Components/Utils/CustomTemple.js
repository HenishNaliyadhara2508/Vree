import * as THREE from "three";
import { vreeStore } from "../../VreeStore";


class CustomTemple {
  constructor() {
    vreeStore.templeMesh = [
      vreeStore.frameMesh.children[1],
      vreeStore.frameMesh.children[3],
    ];
    vreeStore.templeTexture = null;
    vreeStore.templeColor = vreeStore.templeMesh[0].material.color;
    vreeStore.templeMetalness = vreeStore.templeMesh[0].material.metalness;
    vreeStore.templeRoughness = vreeStore.templeMesh[0].material.roughness;
    vreeStore.templeTransparency = vreeStore.templeMesh[0].material.opacity;
  }

  static updateTempleTexture(texturePath, textureName) {
    vreeStore.templeTexture = textureName;
    const loader = new THREE.TextureLoader();
    loader.load(texturePath, (texture) => {
      // texture.colorSpace = THREE.SRGBColorSpace;
      vreeStore.templeMesh[0].material.map = texture;
      vreeStore.templeMesh[1].material.map = texture;
    });
  }

  static updateTempleColor(color) {
    vreeStore.templeColor = color;
    console.log(color, "color");
    vreeStore.templeMesh[0].material.color = new THREE.Color(color);
    vreeStore.templeMesh[1].material.color = new THREE.Color(color);
  }

  static updateTempleMetalness(metalness) {
    vreeStore.templeMetalness = metalness;
    console.log(metalness, "metalness");
    vreeStore.templeMesh[0].material.metalness = metalness;
    vreeStore.templeMesh[1].material.metalness = metalness;

    vreeStore.templeMesh[0].material.needsUpdate = true;
    vreeStore.templeMesh[1].material.needsUpdate = true;
  }

  static updateTempleRoughness(roughness) {
    vreeStore.templeRoughness = roughness;
    vreeStore.templeMesh[0].material.roughness = roughness;
    vreeStore.templeMesh[1].material.roughness = roughness;
    
    vreeStore.templeMesh[0].material.needsUpdate = true;
    vreeStore.templeMesh[1].material.needsUpdate = true;
  }

  static updateTempleTransparency(transparency) {
    vreeStore.templeTransparency = transparency;
    vreeStore.templeMesh[0].material.opacity = 1 - transparency;
    vreeStore.templeMesh[1].material.opacity = 1 - transparency;


    vreeStore.templeMesh[0].material.transparent = true;
    vreeStore.templeMesh[1].material.transparent = true;
    vreeStore.templeMesh[0].material.needsUpdate = true;
    vreeStore.templeMesh[1].material.needsUpdate = true;
  }
}

export default CustomTemple;
