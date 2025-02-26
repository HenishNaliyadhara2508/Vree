import { makeAutoObservable } from "mobx";
import * as THREE from "three";

class VreeStore {
  frameMesh = null;
  lensesMesh = [];
  templeMesh = [];
  isDarkMode = true;
  selectedSection = "frame";

  lensColor = "#ffffff";
  lensTransparency = 0.8;
  lensOpacity = 0.2;
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

  availableTextures = [
    "original.jpg", "texture1.png", "texture2.jpg", "texture3.jpg"
  ];

  availableColors = [
    "#FFFFFF", "#D5BC93", "#AC252B", "#185848", "#025D98", "#D2A693", "Custom"
  ];

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
    this.lensesMesh[0].material.opacity = 0.2;
    this.lensesMesh[1].material.opacity = 0.2;

    // Resetting Temple Properties
    this.templeTexture = "original.jpg";
    const loader = new THREE.TextureLoader();
    loader.load(`/assets/texture/${this.templeTexture}`, (texture) => {
      // texture.colorSpace = THREE.SRGBColorSpace;
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
      // texture.colorSpace = THREE.SRGBColorSpace;
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
    this.frameMesh.material.transparent = true;
    this.frameMesh.material.opacity = 1;

    // Explicitly mark material updates
    this.frameMesh.material.needsUpdate = true;
    this.templeMesh[0].material.needsUpdate = true;
    this.templeMesh[1].material.needsUpdate = true;
    this.lensesMesh[0].material.needsUpdate = true;
    this.lensesMesh[1].material.needsUpdate = true;
}

setSelectedSection(section) {
  this.selectedSection = section;
}

saveToJSON() {
  return {
    glbUrl: "./assets/glbs/sampleModel.glb",
    groups: [
      {
        displayName: "Frame",
        meshNode: ["frame"],
        selectedTexture: this.frameTexture,
        selectedColor: this.frameColor,
        roughness: this.frameRoughness,
        metalness: this.frameMetalness,
        transparency: this.frameOpacity,
        availableTextures: this.availableTextures,
      },
      {
        displayName: "Temple",
        meshNode: ["left_temple", "right_temple"],
        selectedTexture: this.templeTexture,
        selectedColor: this.templeColor,
        roughness: this.templeRoughness,
        metalness: this.templeMetalness,
        transparency: this.templeTransparency,
        availableTextures: this.availableTextures,
      },
      {
        displayName: "Lenses",
        meshNode: ["left_lens", "right_lens"],
        selectedTexture: this.lensesTexture,
        selectedColor: this.lensColor,
        roughness: 0,
        metalness: 0.6,
        transparency: this.lensTransparency,
      },
    ],
    textures: this.availableTextures,
    colors: this.availableColors,
  };
}



}

export const vreeStore = new VreeStore();
