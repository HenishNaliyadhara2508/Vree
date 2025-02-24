import { useRef, useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { LoaderManager } from "../AssetLoader"; 
import CustomFrame from "./Utils/CustomFrame"; 
import CustomLenses from "./Utils/CustomLens"; 
import CustomTemple from "./Utils/CustomTemple"; 

const MainCanvasVree = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth*0.6 / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 3;

    // Ambient Light
    const ambientLight = new THREE.AmbientLight(0xeeeeee, 2);
    scene.add(ambientLight);

    // Set up the renderer
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
    });
    renderer.setSize(window.innerWidth*0.6, window.innerHeight);

    // Set up asset loader
    const loader = new LoaderManager();
    loader.setScene(scene);

    // Call when everything is loaded
    loader.setOnCompleteCallback(() => {
      const frame = new CustomFrame();
      const lenses = new CustomLenses();
      const temple = new CustomTemple();
      startRendering();
    });

    // Load assets (textures and models)
    // loader.loadTexture("/assets/background/background.png");
    loader.loadEnvironmentTexture("/assets/environment/brown_photostudio_02_1k.hdr");
    loader.loadGLTFModel("/assets/glbs/sampleModel.glb");

    // OrbitControls for camera interaction
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.2;
    controls.screenSpacePanning = false;

    // Animation loop
    const startRendering = () => {
      requestAnimationFrame(startRendering);
      controls.update();
      renderer.render(scene, camera);
    };

    // Handle window resizing
    const onWindowResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onWindowResize);

    // Cleanup on unmount
    return () => {
      window.removeEventListener("resize", onWindowResize);
      controls.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} className="webgl min-h-screen" />;
};

export default MainCanvasVree;
