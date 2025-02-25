import { makeAutoObservable } from "mobx";
import * as THREE from "three";

class VreeStore {
  frameMesh = null;
  lensesMesh = [];
  templeMesh = [];
  isDarkMode = true;

  lensColor = "#ffffff";
  lensTransparency = 0;

  templeTexture = null;
  templeIntialTexture = null;
  templeColor = "#ffffff";
  templeMetalness = 0.1;
  templeRoughness = 0.2;
  templeTransparency = 0;

  frameTexture = null;
  frameIntialTexture = null;
  frameColor = "#ffffff";
  frameMetalness = 0.2;
  frameRoughness = 0.1;
  frameTransparency = 0;

  constructor() {
    makeAutoObservable(this);
  }

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
  }
  resetAllProperties() {
    // Resetting Lens Properties
    this.lensColor = "#ffffff";
    this.lensesMesh[0].material.color = new THREE.Color("#ffffff");
    this.lensesMesh[1].material.color = new THREE.Color("#ffffff");

    this.lensTransparency = 0.8;
    this.lensesMesh[0].material.opacity = 0.8;
    this.lensesMesh[1].material.opacity = 0.8;

    // Resetting Temple Properties
    this.templeTexture = "original.jpg";
    const loader = new THREE.TextureLoader();
    loader.load(`/assets/texture/${this.templeTexture}`, (texture) => {
      texture.colorSpace = THREE.SRGBColorSpace;
      this.templeMesh[0].material.map = texture;
      this.templeMesh[1].material.map = texture;
      this.templeMesh[0].material.needsUpdate = true;
      this.templeMesh[1].material.needsUpdate = true;
    });

    this.templeColor = "#ffffff";
    this.templeMesh[0].material.color = new THREE.Color("#ffffff");
    this.templeMesh[1].material.color = new THREE.Color("#ffffff");

    this.templeMetalness = 0.1;
    this.templeMesh[0].material.metalness = this.templeMetalness;
    this.templeMesh[1].material.metalness = this.templeMetalness;

    this.templeRoughness = 0.2;
    this.templeMesh[0].material.roughness = this.templeRoughness;
    this.templeMesh[1].material.roughness = this.templeRoughness;

    this.templeTransparency = 0;
    this.templeMesh[0].material.opacity = this.templeTransparency;
    this.templeMesh[1].material.opacity = this.templeTransparency;

    // Resetting Frame Properties
    this.frameTexture = "original.jpg";
    loader.load(`/assets/texture/${this.frameTexture}`, (texture) => {
      texture.colorSpace = THREE.SRGBColorSpace;
      this.frameMesh.material.map = texture;
      this.frameMesh.material.needsUpdate = true;
    });

    this.frameColor = "#ffffff";
    this.frameMesh.material.color = new THREE.Color("#ffffff");

    this.frameMetalness = 0.2;
    this.frameMesh.material.metalness = this.frameMetalness;

    this.frameRoughness = 0.1;
    this.frameMesh.material.roughness = this.frameRoughness;

    this.frameTransparency = 0;
    this.frameMesh.material.opacity = this.frameTransparency;

    // Explicitly mark material updates
    this.frameMesh.material.needsUpdate = true;
    this.templeMesh[0].material.needsUpdate = true;
    this.templeMesh[1].material.needsUpdate = true;
    this.lensesMesh[0].material.needsUpdate = true;
    this.lensesMesh[1].material.needsUpdate = true;
}

setFrameTexture(textureName) {
  this.frameTexture = textureName;
}
setFrameMetalness(metalness) {
  this.frameMetalness = metalness;
}

setFrameColor(color) {
  this.frameColor = color;
}

setFrameTransparency(transparency) {
  this.frameTransparency = transparency;
}

setTempleMetalness(metalness) {
  this.templeMetalness = metalness;
}

setTempleColor(color) {
  this.templeColor = color;
}

setTempleTransparency(transparency) {
  this.templeTransparency = transparency;
}

setLensColor(color) {
  this.lensColor = color;
}

setLensTransparency(transparency) {
  this.lensTransparency = transparency;
}


}

export const vreeStore = new VreeStore();
