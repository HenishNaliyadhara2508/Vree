import * as THREE from "three";
import { CSS2DRenderer, GLTFLoader } from "three/examples/jsm/Addons.js";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";
import { vreeStore } from "./VreeStore";

export class LoaderManager {
  constructor(scene,css2DRenderer) {
    this.loadedAssets = {
      environmentTexture: false,
      gltfModel: false,
    };
    this.scene = null;
    this.onCompleteCallback = null;
    this.outlines = []; // Store outlines separately
    this.assetsLoaded = false; // Track if assets are fully loaded
  }

  setScene(scene) {
    this.scene = scene;
  }

  setOnCompleteCallback(callback) {
    this.onCompleteCallback = callback;
  }

  loadEnvironmentTexture(path) {
    const loader = new RGBELoader();
    loader.load(
      path,
      (texture) => {
        texture.mapping = THREE.EquirectangularReflectionMapping;
        this.loadedAssets.environmentTexture = texture;
        this.checkAssetsLoaded();
      },
      undefined,
      (error) => {
        console.error("Error loading HDR texture:", error);
      }
    );
  }

  loadGLTFModel(path) {
    const loader = new GLTFLoader();
    loader.load(path, (gltf) => {
      this.loadedAssets.gltfModel = gltf.scene;
      console.log(this.scene, "scene");

      // Assign to vreeStore
      vreeStore.frameMesh = this.loadedAssets.gltfModel.children[0];
      vreeStore.lensesMesh = [
        gltf.scene.getObjectByName("left_lens"),
        gltf.scene.getObjectByName("right_lens"),
      ];
      vreeStore.templeMesh = [
        gltf.scene.getObjectByName("left_temple"),
        gltf.scene.getObjectByName("right_temple"),
      ];
      vreeStore.frameIntialTexture =
        this.loadedAssets.gltfModel.children[0].material.map;
      vreeStore.templeIntialTexture =
        this.loadedAssets.gltfModel.children[0].children[1].material.map;
      console.log(this.loadedAssets.gltfModel.children[0], "gltfModel");
      this.checkAssetsLoaded();
    });
  }

  checkAssetsLoaded() {
    const { environmentTexture, gltfModel } = this.loadedAssets;
    if (environmentTexture && gltfModel && !this.assetsLoaded) {
      this.assetsLoaded = true; // Prevent loading the assets again
      this.addAssetsToScene();
    }
  }

  // Clean up the scene before re-adding meshes
  removeMeshesFromScene() {
    if (this.scene) {
      console.log("Attempting to remove meshes from the scene...");
  
      // Iterate through the scene's children and remove meshes by name and type
      this.scene.children.forEach((child) => {
        // Explicitly check for each lens and temple mesh and remove them
        if (child.name === "left_lens" && child.type === "Mesh") {
          console.log("Removing left_lens from scene");
          this.scene.remove(child);
        }
        if (child.name === "right_lens" && child.type === "Mesh") {
          console.log("Removing right_lens from scene");
          this.scene.remove(child);
        }
        if (child.name === "left_temple" && child.type === "Mesh") {
          console.log("Removing left_temple from scene");
          this.scene.remove(child);
        }
        if (child.name === "right_temple" && child.type === "Mesh") {
          console.log("Removing right_temple from scene");
          this.scene.remove(child);
        }
        if (child.name === "frame" && child.type === "Mesh") {
          console.log("Removing frame from scene");
          this.scene.remove(child);
        }
      });
  
      console.log("Scene children after removal:", this.scene.children);
    }
  }

  // Then add the meshes back after removal
  addAssetsToScene() {
    if (this.scene) {
      this.removeMeshesFromScene(); // Remove any existing meshes
      // console.log(this.removeMeshesFromScene())
      this.scene.environment = this.loadedAssets.environmentTexture;

      // Add meshes to the scene only if not already added
      if (vreeStore.frameMesh && !this.scene.children.includes(vreeStore.frameMesh)) {
        this.scene.add(vreeStore.frameMesh);
      }
      if (vreeStore.lensesMesh[0] && !this.scene.children.includes(vreeStore.lensesMesh[0])) {
        this.scene.add(vreeStore.lensesMesh[0]);
      }
      if (vreeStore.lensesMesh[1] && !this.scene.children.includes(vreeStore.lensesMesh[1])) {
        this.scene.add(vreeStore.lensesMesh[1]);
      }
      if (vreeStore.templeMesh[0] && !this.scene.children.includes(vreeStore.templeMesh[0])) {
        this.scene.add(vreeStore.templeMesh[0]);
      }
      if (vreeStore.templeMesh[1] && !this.scene.children.includes(vreeStore.templeMesh[1])) {
        this.scene.add(vreeStore.templeMesh[1]);
      }

      console.log(this.scene);
      
      // Call onCompleteCallback if available
      if (this.onCompleteCallback) {
        this.onCompleteCallback();
      }
    }
  }

  // MobX actions to update the selectedSection state
  handleSelectFrame = () => {
    vreeStore.setSelectedSection("frame");
    console.log("Frame selected");
  };

  handleSelectLenses = () => {
    vreeStore.setSelectedSection("lenses");
    console.log("Lenses selected");
  };

  handleSelectTemple = () => {
    vreeStore.setSelectedSection("temple");
    console.log("Temple selected");
  };
}
