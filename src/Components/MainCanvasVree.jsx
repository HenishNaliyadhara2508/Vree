import { useRef, useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { LoaderManager } from "../AssetLoader";
import { vreeStore } from "../VreeStore"; // Import the vreeStore
import { observer } from "mobx-react-lite";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { OutlinePass } from "three/examples/jsm/postprocessing/OutlinePass.js";

const MainCanvasVree = observer(() => {
  const canvasRef = useRef(null);
  const loaderRef = useRef(null); // Create a ref for the LoaderManager instance
  const composerRef = useRef(null); // Create a ref for the EffectComposer instance
  const outlinePassRef = useRef(null); // Create a ref for OutlinePass instance

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth * 0.6 / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 3;

    // Ambient Light to provide soft light from all directions
    const ambientLight = new THREE.AmbientLight(0xeeeeee, 1); // Soft light for general illumination
    scene.add(ambientLight);

    // Directional Light to cast shadows and light the scene
    const directionalLight = new THREE.DirectionalLight(0xffffff, 2); // White light with intensity 2
    directionalLight.position.set(5, 5, 5); // Position the light in the scene
    directionalLight.castShadow = true; // Enable shadows
    scene.add(directionalLight);

    // Set up the renderer
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
    });
    renderer.setSize(window.innerWidth * 0.6, window.innerHeight);

    // Set up asset loader
    const loader = new LoaderManager();
    loader.setScene(scene);

    loader.setOnCompleteCallback(() => {
      startRendering();
    });

    loader.loadEnvironmentTexture("/assets/environment/brown_photostudio_02_1k.hdr");
    loader.loadGLTFModel("/assets/glbs/sampleModel.glb");

    // OrbitControls for camera interaction
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.2;
    controls.screenSpacePanning = false;

    // Set up EffectComposer for post-processing
    const composer = new EffectComposer(renderer);
    const renderPass = new RenderPass(scene, camera);
    composer.addPass(renderPass);

    // OutlinePass setup
    const outlinePass = new OutlinePass(
      new THREE.Vector2(window.innerWidth * 0.6, window.innerHeight),
      scene,
      camera
    );
    outlinePass.edgeStrength = 2; // Adjust the outline strength
    outlinePass.edgeGlow = 1;      // Glow effect for outlines
    outlinePass.edgeThickness = 1; // Reduce the thickness of the outline
    // outlinePass.pulsePeriod = 0;   // Set pulse period to 0 if you don’t want it pulsing
    
    console.log(outlinePass.edgeColor, "outlinePass.edgeColor");
    // Set the outline color to #9013FE (purple)
    outlinePass.edgeColor = new THREE.Color(0x9013FE); // Ensure color is set correctly
    console.log(outlinePass.edgeColor, "outlinePass.edgeColor");
    composer.addPass(outlinePass);

    composerRef.current = composer;
    outlinePassRef.current = outlinePass;

    // Animation loop
    const startRendering = () => {
      requestAnimationFrame(startRendering);
      controls.update();
      composer.render();
    };

    // Handle window resizing
    const onWindowResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth * 0.6, window.innerHeight);
      composer.setSize(window.innerWidth * 0.6, window.innerHeight);
    };
    window.addEventListener("resize", onWindowResize);

    // Cleanup on unmount
    return () => {
      window.removeEventListener("resize", onWindowResize);
      controls.dispose();
    };
  }, []);

  const handleSelectFrame = () => {
    // onSectionChange("frame"); 
    if (vreeStore.frameMesh) {
      outlinePassRef.current.selectedObjects = [vreeStore.frameMesh];
      vreeStore.frameMesh.renderOrder = 1;  // Ensure frame mesh appears in front
      vreeStore.frameMesh.material.side = THREE.FrontSide;  // Ensure only front side is rendered
    } else {
      console.warn("Frame mesh not loaded yet.");
    }
  };

  const handleSelectLenses = () => {
    // onSectionChange("lenses");
    outlinePassRef.current.selectedObjects = vreeStore.lensesMesh;
    vreeStore.lensesMesh.forEach((mesh) => {
      mesh.renderOrder = 1;
      mesh.material.side = THREE.FrontSide;  // Only render the front side for lenses
    });
  };

  const handleSelectTemple = () => {
    // onSectionChange("temple");
    outlinePassRef.current.selectedObjects = vreeStore.templeMesh;
    vreeStore.templeMesh.forEach((mesh) => {
      mesh.renderOrder = 1;
      mesh.material.side = THREE.FrontSide;  // Only render the front side for temple meshes
    });
  };

  // const handleClearOutlines = () => {
  //   outlinePassRef.current.selectedObjects = [];
  // };

  return (
    <div>
      <canvas ref={canvasRef} className="webgl min-h-screen" />
      <div className="button-container space-x-4 absolute top-30 left-4">
        <button onClick={handleSelectFrame} className="button rounded border border-violet-500 bg-violet-700"> Frame</button>
        <button onClick={handleSelectLenses} className="button rounded border border-violet-500 bg-violet-700"> Lenses</button>
        <button onClick={handleSelectTemple} className="button rounded border border-violet-500 bg-violet-700">Temple</button>
        {/* <button onClick={handleClearOutlines} className="button rounded border border-violet-500 bg-violet-700">Clear</button> */}
      </div>
    </div>
  );
});

export default MainCanvasVree;
