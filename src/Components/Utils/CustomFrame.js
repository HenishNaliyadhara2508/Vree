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
