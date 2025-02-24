
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/Addons.js";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";
import { vreeStore } from "./VreeStore";

export class LoaderManager {
  constructor() {
    this.loadedAssets = {
      
      environmentTexture: false,
      gltfModel: false,
    };
    this.scene = null; 
    this.onCompleteCallback = null; 
  }

  setScene(scene) {
    this.scene = scene;
  }

  setOnCompleteCallback(callback) {
    this.onCompleteCallback = callback;
  }

//   loadTexture(path) {
//     const loader = new THREE.TextureLoader();
//     loader.load(path, (texture) => {
//       texture.colorSpace = THREE.SRGBColorSpace;
//       this.loadedAssets.backgroundTexture = texture;
//       this.checkAssetsLoaded();
//     });
//   }


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
        console.error("Error loading HDR texture:", error); // Error handling
      }
    );
  }

  // Function to load a GLTF model
  loadGLTFModel(path) {
    const loader = new GLTFLoader();
    loader.load(path, (gltf) => {
      this.loadedAssets.gltfModel = gltf.scene;
      //frameMesh is set
      vreeStore.frameMesh = this.loadedAssets.gltfModel.children[0];
      console.log(this.loadedAssets.gltfModel.children[0], "gltfModel");


      this.checkAssetsLoaded();
    });
  }

  // Function to check if all assets are loaded
  checkAssetsLoaded() {
    const {  environmentTexture, gltfModel } =
      this.loadedAssets;
    if ( environmentTexture && gltfModel) {
      this.addAssetsToScene();
    }
  }

  // Function to add the assets to the scene
  addAssetsToScene() {
    if (this.scene) {
      // Set background texture
      this.scene.background = this.loadedAssets.backgroundTexture;

      // Set environment texture for reflections
      this.scene.environment = this.loadedAssets.environmentTexture;

      // Add the GLTF model to the scene
      const vreeObject = this.loadedAssets.gltfModel.children[0];
      console.log(vreeObject, "vreeObject");
      vreeObject.position.z = 1;
      this.scene.add(vreeObject);

      // Trigger the completion callback if it exists
      if (this.onCompleteCallback) {
        this.onCompleteCallback();
      }
    }
  }
}
