
import { useRef, useEffect, useState } from "react"; // Added useState to control the function availability
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { LoaderManager } from "../AssetLoader";
import { vreeStore } from "../VreeStore"; // Import the vreeStore
import { observer } from "mobx-react-lite";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import OutlineManager from "./Utils/OutlineManager"; // Import the OutlineManager
import { CSS2DRenderer } from "three/examples/jsm/renderers/CSS2DRenderer"; // Import CSS2DRenderer
import Labels from "./Utils/Labels"; // Import Labels component
import CustomLens from "./Utils/CustomLens";
import CustomFrame from "./Utils/CustomFrame";
import CustomTemple from "./Utils/CustomTemple";

const MainCanvasVree = observer(() => {
  const canvasRef = useRef(null);
  const composerRef = useRef(null);
  const outlineManagerRef = useRef(null); // Store the OutlineManager instance
  const labelRendererRef = useRef(null); // Store the CSS2DRenderer instance
  const isAssetsLoaded = useRef(false); // Track whether assets are loaded
  const [addLabelsToScene, setAddLabelsToScene] = useState(null); // State to hold the addLabelsToScene function

  useEffect(() => {
    const scene = new THREE.Scene(); // Declare scene directly in useEffect
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth * 0.6 / window.innerHeight*0.9,
      0.1,
      1000
    );
    camera.position.z = 3;

    // Set up lights and renderer
    const ambientLight = new THREE.AmbientLight(0xffffff, 5);
    scene.add(ambientLight);
    

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
    });
    renderer.setSize(window.innerWidth * 0.6, window.innerHeight*0.9);
    renderer.shadowMap.enabled = true;

    // Set up CSS2DRenderer for labels
    const labelRenderer = new CSS2DRenderer();
    labelRenderer.setSize(
      canvasRef.current.clientWidth,
      canvasRef.current.clientHeight
    );
    labelRenderer.domElement.style.position = "absolute";
    labelRenderer.domElement.style.top = "0px";
    labelRenderer.domElement.style.pointerEvents = "none";
    labelRenderer.domElement.style.zIndex = "10"; // Ensure labels are rendered above the scene

    canvasRef.current.parentElement.appendChild(labelRenderer.domElement);

    // Set up asset loader
    const loader = new LoaderManager(scene, new CSS2DRenderer());
    loader.setScene(scene); // Pass scene directly to the loader

    loader.setOnCompleteCallback(() => {
          const frame = new CustomFrame();
        const temple = new CustomTemple();
        const lenses = new CustomLens();
      startRendering();
      handleSelectSection();
      isAssetsLoaded.current = true; // Mark assets as loaded
    });

    if (!isAssetsLoaded.current) {
      loader.loadEnvironmentTexture("/assets/environment/brown_photostudio_02_1k.hdr");
      loader.loadGLTFModel("/assets/glbs/sampleModel.glb");
    }

    // OrbitControls for camera interaction
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.2;
    controls.screenSpacePanning = false;

    // Set up EffectComposer for post-processing
    const composer = new EffectComposer(renderer);
    const renderPass = new RenderPass(scene, camera);
    composer.addPass(renderPass);

    composerRef.current = composer;

    // Initialize OutlineManager
    outlineManagerRef.current = new OutlineManager(composer, scene, camera);

    const textureLoader = new THREE.TextureLoader();
    const simpleShadow = textureLoader.load("/assets/shadow/shadow.jpg");

    const sphereShadow = new THREE.Mesh(
      new THREE.PlaneGeometry(1, 1),
      new THREE.MeshBasicMaterial({
        color: 0x000000,
        transparent: true,
        alphaMap: simpleShadow,
      })
    );
    sphereShadow.rotation.x = -Math.PI * 0.5;
    sphereShadow.position.set(0, -0.5, -1);
    sphereShadow.scale.set(5, 3.5, 5);
    scene.add(sphereShadow);

    // Animation loop
    const startRendering = () => {
      requestAnimationFrame(startRendering);
      controls.update();
      composer.render();
      labelRenderer.render(scene, camera); // Render the labels
    };

    // Handle window resizing
    const onWindowResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth * 0.6, window.innerHeight);
      composer.setSize(window.innerWidth * 0.6, window.innerHeight);
      labelRenderer.setSize(window.innerWidth * 0.6, window.innerHeight);
    };
    window.addEventListener("resize", onWindowResize);

    // Define addLabelsToScene inside useEffect
    const addLabelsToSceneFunc = (labels) => {
      labels.forEach((label) => {
        if (!scene.children.includes(label)) {
          console.log("Adding label to the scene:", label);
          scene.add(label); // Add to the scene

          // Add click event listener for the label
          label.element.addEventListener('click', (e) => {
            handleLabelClick(label);
          });
        } else {
          console.log("Label already in the scene:", label);
        }
      });
    };

    // Set addLabelsToScene function in the state
    setAddLabelsToScene(() => addLabelsToSceneFunc);

    const handleLabelClick = (label) => {
      // You can access the label name or other attributes to trigger actions
      console.log(`Label ${label.name} clicked!`);
      vreeStore.setSelectedSection(label.name); // Update the selected section
    };

    // Cleanup on unmount
    return () => {
      window.removeEventListener("resize", onWindowResize);
      controls.dispose();
      // document.body.removeChild(labelRenderer.domElement);
    };
  }, []); // Empty dependency array ensures this runs only once on mount

  useEffect(() => {
    handleSelectSection();
  }, [vreeStore.selectedSection]);

  const handleSelectSection = () => {
    switch (vreeStore.selectedSection) {
      case "frame":
        handleSelectFrame();
        break;
      case "temple":
        handleSelectTemple();
        break;
      case "lenses":
        handleSelectLenses();
        break;
      default:
        break;
    }
  };

  const handleSelectFrame = () => {
    vreeStore.selectedSection = "frame";
    if (vreeStore.frameMesh) {
      outlineManagerRef.current.setSelectedObjects([vreeStore.frameMesh]);
    } else {
      console.warn("Frame mesh not loaded yet.");
    }
  };

  const handleSelectLenses = () => {
    vreeStore.selectedSection = "lenses";
    if (vreeStore.lensesMesh) {
      outlineManagerRef.current.setSelectedObjects(vreeStore.lensesMesh);
    } else {
      console.warn("Lenses mesh not loaded yet.");
    }
  };

  const handleSelectTemple = () => {
    vreeStore.selectedSection = "temple";
    if (vreeStore.templeMesh) {
      outlineManagerRef.current.setSelectedObjects(vreeStore.templeMesh);
    } else {
      console.warn("Temple mesh not loaded yet.");
    }
  };

  return (
    <div>
      <canvas ref={canvasRef} className="webgl h-screen" />
      {addLabelsToScene && <Labels addToScene={addLabelsToScene} />}
    </div>
  );
});

export default MainCanvasVree;


// import { useRef, useEffect, useState } from "react"; // Added useState to control the function availability
// import * as THREE from "three";
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
// import { LoaderManager } from "../AssetLoader";
// import { vreeStore } from "../VreeStore"; // Import the vreeStore
// import { observer } from "mobx-react-lite";
// import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
// import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
// import OutlineManager from "./Utils/OutlineManager"; // Import the OutlineManager
// import { CSS2DRenderer } from "three/examples/jsm/renderers/CSS2DRenderer"; // Import CSS2DRenderer
// import Labels from "./Utils/Labels"; // Import Labels component
// import CustomLens from "./Utils/CustomLens";
// import CustomFrame from "./Utils/CustomFrame";
// import CustomTemple from "./Utils/CustomTemple";

// const MainCanvasVree = observer(() => {
//   const canvasRef = useRef(null);
//   const composerRef = useRef(null);
//   const outlineManagerRef = useRef(null); // Store the OutlineManager instance
//   const labelRendererRef = useRef(null); // Store the CSS2DRenderer instance
//   const isAssetsLoaded = useRef(false); // Track whether assets are loaded
//   const [addLabelsToScene, setAddLabelsToScene] = useState(null); // State to hold the addLabelsToScene function

//   useEffect(() => {
//     const scene = new THREE.Scene(); // Declare scene directly in useEffect
//     const camera = new THREE.PerspectiveCamera(
//       75,
//       window.innerWidth * 0.6 / window.innerHeight,
//       0.1,
//       1000
//     );
//     camera.position.z = 2.5;

//     // Set up lights and renderer
//     const ambientLight = new THREE.AmbientLight(0xffffff, 5);
//     scene.add(ambientLight);
//     const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
//     directionalLight.position.set(5, 5, 5);
//     directionalLight.castShadow = true;
//     scene.add(directionalLight);

//     const renderer = new THREE.WebGLRenderer({
//       canvas: canvasRef.current,
//       alpha: true,
//     });
//     renderer.setSize(window.innerWidth * 0.6, window.innerHeight);
//     renderer.shadowMap.enabled = true;

//     // Set up CSS2DRenderer for labels
//     const labelRenderer = new CSS2DRenderer();
//     labelRenderer.setSize(
//       canvasRef.current.clientWidth,
//       canvasRef.current.clientHeight
//     );
//     labelRenderer.domElement.style.position = "absolute";
//     labelRenderer.domElement.style.top = "0px";
//     labelRenderer.domElement.style.pointerEvents = "none";
//     labelRenderer.domElement.style.zIndex = "10"; // Ensure labels are rendered above the scene

//     canvasRef.current.parentElement.appendChild(labelRenderer.domElement);

//     // Set up asset loader
//     const loader = new LoaderManager();
//     loader.setScene(scene); // Pass scene directly to the loader

//     loader.setOnCompleteCallback(() => {
//       const frame = new CustomFrame();
//       const temple = new CustomTemple();
//       const lenses = new CustomLens();
//       startRendering();
//       isAssetsLoaded.current = true; // Mark assets as loaded
//       outlineManagerRef.current.setMeshes(
//         vreeStore.frameMesh,
//         vreeStore.templeMesh,
//         vreeStore.lensesMesh
//       );
//       outlineManagerRef.current.handleSelectSection(vreeStore.selectedSection); // Trigger initial selection
//     });

//     if (!isAssetsLoaded.current) {
//       loader.loadEnvironmentTexture("/assets/environment/brown_photostudio_02_1k.hdr");
//       loader.loadGLTFModel("/assets/glbs/sampleModel.glb");
//     }

//     // OrbitControls for camera interaction
//     const controls = new OrbitControls(camera, renderer.domElement);
//     controls.enableDamping = true;
//     controls.dampingFactor = 0.2;
//     controls.screenSpacePanning = false;

//     // Set up EffectComposer for post-processing
//     const composer = new EffectComposer(renderer);
//     const renderPass = new RenderPass(scene, camera);
//     composer.addPass(renderPass);

//     composerRef.current = composer;

//     // Initialize OutlineManager
//     outlineManagerRef.current = new OutlineManager(composer, scene, camera);

//     const textureLoader = new THREE.TextureLoader();
//     const simpleShadow = textureLoader.load("/assets/shadow/shadow.jpg");

//     const sphereShadow = new THREE.Mesh(
//       new THREE.PlaneGeometry(1, 1),
//       new THREE.MeshBasicMaterial({
//         color: 0x000000,
//         transparent: true,
//         alphaMap: simpleShadow,
//       })
//     );
//     sphereShadow.rotation.x = -Math.PI * 0.5;
//     sphereShadow.position.set(0, -0.5, -1);
//     sphereShadow.scale.set(5, 3.5, 5);
//     scene.add(sphereShadow);

//     // Animation loop
//     const startRendering = () => {
//       requestAnimationFrame(startRendering);
//       controls.update();
//       composer.render();
//       labelRenderer.render(scene, camera); // Render the labels
//     };

//     // Handle window resizing
//     const onWindowResize = () => {
//       camera.aspect = window.innerWidth / window.innerHeight;
//       camera.updateProjectionMatrix();
//       renderer.setSize(window.innerWidth * 0.6, window.innerHeight);
//       composer.setSize(window.innerWidth * 0.6, window.innerHeight);
//       labelRenderer.setSize(window.innerWidth * 0.6, window.innerHeight);
//     };
//     window.addEventListener("resize", onWindowResize);

//     // Define addLabelsToScene inside useEffect
//     const addLabelsToSceneFunc = (labels) => {
//       labels.forEach((label) => {
//         if (!scene.children.includes(label)) {
//           console.log("Adding label to the scene:", label);
//           scene.add(label); // Add to the scene

//           // Add click event listener for the label
//           label.element.addEventListener('click', (e) => {
//             handleLabelClick(label);
//           });
//         } else {
//           console.log("Label already in the scene:", label);
//         }
//       });
//     };

//     // Set addLabelsToScene function in the state
//     setAddLabelsToScene(() => addLabelsToSceneFunc);

//     const handleLabelClick = (label) => {
//       // You can access the label name or other attributes to trigger actions
//       console.log(`Label ${label.name} clicked!`);
//       vreeStore.setSelectedSection(label.name); // Update the selected section
//     };

//     // Cleanup on unmount
//     return () => {
//       window.removeEventListener("resize", onWindowResize);
//       controls.dispose();
//       // document.body.removeChild(labelRenderer.domElement);
//     };
//   }, []); // Empty dependency array ensures this runs only once on mount

//   useEffect(() => {
//     outlineManagerRef.current.handleSelectSection(vreeStore.selectedSection); // Trigger selection when section changes
//   }, [vreeStore.selectedSection]);

//   return (
//     <div>
//       <canvas ref={canvasRef} className="webgl min-h-screen" />
//       {addLabelsToScene && <Labels addToScene={addLabelsToScene} />}
//     </div>
//   );
// });

// export default MainCanvasVree;


// import { useRef, useEffect } from "react";
// import * as THREE from "three";
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
// import { LoaderManager } from "../AssetLoader";
// import { vreeStore } from "../VreeStore"; // Import the vreeStore
// import { observer } from "mobx-react-lite";
// import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
// import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
// import OutlineManager from "./Utils/OutlineManager"; // Import the OutlineManager
// import { CSS2DRenderer } from "three/examples/jsm/renderers/CSS2DRenderer"; // Import CSS2DRenderer
// import Labels from "./Utils/Labels"; // Import Labels component

// const MainCanvasVree = observer(() => {
//   const canvasRef = useRef(null);
//   const composerRef = useRef(null);
//   const outlineManagerRef = useRef(null); // Store the OutlineManager instance
//   const labelRendererRef = useRef(null); // Store the CSS2DRenderer instance
//   const sceneRef = useRef(new THREE.Scene()); // Use useRef to store the scene
//   const isAssetsLoaded = useRef(false); // Track whether assets are loaded

//   useEffect(() => {
//     const camera = new THREE.PerspectiveCamera(
//       75,
//       window.innerWidth * 0.6 / window.innerHeight,
//       0.1,
//       1000
//     );
//     camera.position.z = 3;

//     // Set up lights and renderer
//     const ambientLight = new THREE.AmbientLight(0xffffff, 10);
//     sceneRef.current.add(ambientLight);
//     const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
//     directionalLight.position.set(5, 5, 5);
//     directionalLight.castShadow = true;
//     sceneRef.current.add(directionalLight);

//     const renderer = new THREE.WebGLRenderer({
//       canvas: canvasRef.current,
//       alpha: true,
//     });
//     renderer.setSize(window.innerWidth * 0.6, window.innerHeight);
//     renderer.shadowMap.enabled = true;

//     // Set up CSS2DRenderer for labels
//     const labelRenderer = new CSS2DRenderer();
//     labelRenderer.setSize(
//       canvasRef.current.clientWidth,
//       canvasRef.current.clientHeight
//     );
//     labelRenderer.domElement.style.position = "absolute";
//     labelRenderer.domElement.style.top = "0px";
//     labelRenderer.domElement.style.pointerEvents = "none";
//     labelRenderer.domElement.style.zIndex = "10"; // Ensure labels are rendered above the scene

//     canvasRef.current.parentElement.appendChild(labelRenderer.domElement);

//     // Set up asset loader
//     const loader = new LoaderManager();
//     loader.setScene(sceneRef.current);

//     loader.setOnCompleteCallback(() => {
//       startRendering();
//       handleSelectSection();
//       isAssetsLoaded.current = true; // Mark assets as loaded
//     });

//     if (!isAssetsLoaded.current) {
//       loader.loadEnvironmentTexture("/assets/environment/brown_photostudio_02_1k.hdr");
//       loader.loadGLTFModel("/assets/glbs/sampleModel.glb");
//     }

//     // OrbitControls for camera interaction
//     const controls = new OrbitControls(camera, renderer.domElement);
//     controls.enableDamping = true;
//     controls.dampingFactor = 0.2;
//     controls.screenSpacePanning = false;

//     // Set up EffectComposer for post-processing
//     const composer = new EffectComposer(renderer);
//     const renderPass = new RenderPass(sceneRef.current, camera);
//     composer.addPass(renderPass);

//     composerRef.current = composer;

//     // Initialize OutlineManager
//     outlineManagerRef.current = new OutlineManager(composer, sceneRef.current, camera);

//     const textureLoader = new THREE.TextureLoader();
//     const simpleShadow = textureLoader.load("/assets/shadow/shadow.jpg");

//     const sphereShadow = new THREE.Mesh(
//       new THREE.PlaneGeometry(1, 1),
//       new THREE.MeshBasicMaterial({
//         color: 0x000000,
//         transparent: true,
//         alphaMap: simpleShadow,
//       })
//     );
//     sphereShadow.rotation.x = -Math.PI * 0.5;
//     sphereShadow.position.set(0, -0.5, -1);
//     sphereShadow.scale.set(5, 3.5, 5);
//     sceneRef.current.add(sphereShadow);

//     // Animation loop
//     const startRendering = () => {
//       requestAnimationFrame(startRendering);
//       controls.update();
//       composer.render();
//       labelRenderer.render(sceneRef.current, camera); // Render the labels
//     };

//     // Handle window resizing
//     const onWindowResize = () => {
//       camera.aspect = window.innerWidth / window.innerHeight;
//       camera.updateProjectionMatrix();
//       renderer.setSize(window.innerWidth * 0.6, window.innerHeight);
//       composer.setSize(window.innerWidth * 0.6, window.innerHeight);
//       labelRenderer.setSize(window.innerWidth * 0.6, window.innerHeight);
//     };
//     window.addEventListener("resize", onWindowResize);

//     // Cleanup on unmount
//     return () => {
//       window.removeEventListener("resize", onWindowResize);
//       controls.dispose();
//       // document.body.removeChild(labelRenderer.domElement);
//     };
//   }, []);

//   useEffect(() => {
//     handleSelectSection();
//   }, [vreeStore.selectedSection]);

//   const handleSelectSection = () => {
//     switch (vreeStore.selectedSection) {
//       case "frame":
//         handleSelectFrame();
//         break;
//       case "temple":
//         handleSelectTemple();
//         break;
//       case "lenses":
//         handleSelectLenses();
//         break;
//       default:
//         break;
//     }
//   };

//   const handleSelectFrame = () => {
//     vreeStore.selectedSection = "frame";
//     if (vreeStore.frameMesh) {
//       outlineManagerRef.current.setSelectedObjects([vreeStore.frameMesh]);
//     } else {
//       console.warn("Frame mesh not loaded yet.");
//     }
//   };

//   const handleSelectLenses = () => {
//     vreeStore.selectedSection = "lenses";
//     if (vreeStore.lensesMesh) {
//       outlineManagerRef.current.setSelectedObjects(vreeStore.lensesMesh);
//     } else {
//       console.warn("Lenses mesh not loaded yet.");
//     }
//   };

//   const handleSelectTemple = () => {
//     vreeStore.selectedSection = "temple";
//     if (vreeStore.templeMesh) {
//       outlineManagerRef.current.setSelectedObjects(vreeStore.templeMesh);
//     } else {
//       console.warn("Temple mesh not loaded yet.");
//     }
//   };

//   // Add labels to the scene, with check for duplicates
//   const addLabelsToScene = (labels) => {
//     labels.forEach((label) => {
//       if (!sceneRef.current.children.includes(label)) {
//         console.log("Adding label to the scene:", label);
//         sceneRef.current.add(label); // Add to the scene

//         // Add click event listener for the label
//         label.element.addEventListener('click', (e) => {
//           handleLabelClick(label);
//         });
//       } else {
//         console.log("Label already in the scene:", label);
//       }
//     });
//   };

//   const handleLabelClick = (label) => {
//     // You can access the label name or other attributes to trigger actions
//     console.log(`Label ${label.name} clicked!`);
//     vreeStore.setSelectedSection(label.name); // Update the selected section
//   };

//   return (
//     <div>
//       <canvas ref={canvasRef} className="webgl min-h-screen" />
//       {console.log(sceneRef.current.children)}
//       <Labels addToScene={addLabelsToScene} />
//     </div>
//   );
// });

// export default MainCanvasVree;




// import { useRef, useEffect } from "react";
// import * as THREE from "three";
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
// import { LoaderManager } from "../AssetLoader";
// import { vreeStore } from "../VreeStore"; // Import the vreeStore
// import { observer } from "mobx-react-lite";
// import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
// import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
// import OutlineManager from "./Utils/OutlineManager"; // Import the OutlineManager
// import { CSS2DRenderer } from "three/examples/jsm/renderers/CSS2DRenderer"; // Import CSS2DRenderer
// import Labels from "./Utils/Labels"; // Import Labels component

// // Import the custom classes
// import CustomFrame from "./Utils/CustomFrame";
// import CustomTemple from "./Utils/CustomTemple";
// import CustomLens from "./Utils/CustomLens";

// const MainCanvasVree = observer(() => {
//   const canvasRef = useRef(null);
//   const composerRef = useRef(null);
//   const outlineManagerRef = useRef(null); // Store the OutlineManager instance
//   const labelRendererRef = useRef(null); // Store the CSS2DRenderer instance
//   const sceneRef = useRef(new THREE.Scene()); // Use useRef to store the scene

//   useEffect(() => {
//     const camera = new THREE.PerspectiveCamera(
//       75,
//       window.innerWidth * 0.6 / window.innerHeight,
//       0.1,
//       1000
//     );
//     camera.position.z = 3;

//     // Set up lights and renderer
//     const ambientLight = new THREE.AmbientLight(0xffffff, 10);
//     sceneRef.current.add(ambientLight);
//     const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
//     directionalLight.position.set(5, 5, 5);
//     directionalLight.castShadow = true;
//     sceneRef.current.add(directionalLight);

//     const renderer = new THREE.WebGLRenderer({
//       canvas: canvasRef.current,
//       alpha: true,
//     });
//     renderer.setSize(window.innerWidth * 0.6, window.innerHeight);
//     renderer.shadowMap.enabled = true;

//     // Set up CSS2DRenderer for labels
//     const labelRenderer = new CSS2DRenderer();
//     labelRenderer.setSize(
//       canvasRef.current.clientWidth,
//       canvasRef.current.clientHeight
//     );
//     labelRenderer.domElement.style.position = "absolute";
//     labelRenderer.domElement.style.top = "0px";
//     labelRenderer.domElement.style.pointerEvents = "none";
//     labelRenderer.domElement.style.zIndex = "1"; // Ensure labels are rendered above the scene

//     canvasRef.current.parentElement.appendChild(labelRenderer.domElement);

//     // Set up asset loader
//     const loader = new LoaderManager();
//     loader.setScene(sceneRef.current);

//     loader.setOnCompleteCallback(() => {
//       startRendering();
//       handleSelectSection();
//     });

//     loader.loadEnvironmentTexture("/assets/environment/brown_photostudio_02_1k.hdr");
//     loader.loadGLTFModel("/assets/glbs/sampleModel.glb");

//     // OrbitControls for camera interaction
//     const controls = new OrbitControls(camera, renderer.domElement);
//     controls.enableDamping = true;
//     controls.dampingFactor = 0.2;
//     controls.screenSpacePanning = false;

//     // Set up EffectComposer for post-processing
//     const composer = new EffectComposer(renderer);
//     const renderPass = new RenderPass(sceneRef.current, camera);
//     composer.addPass(renderPass);

//     composerRef.current = composer;

//     // Initialize OutlineManager
//     outlineManagerRef.current = new OutlineManager(composer, sceneRef.current, camera);

//     const textureLoader = new THREE.TextureLoader();
//     const simpleShadow = textureLoader.load("/assets/shadow/shadow.jpg");

//     const sphereShadow = new THREE.Mesh(
//       new THREE.PlaneGeometry(1, 1),
//       new THREE.MeshBasicMaterial({
//         color: 0x000000,
//         transparent: true,
//         alphaMap: simpleShadow,
//       })
//     );
//     sphereShadow.rotation.x = -Math.PI * 0.5;
//     sphereShadow.position.set(0, -0.5, -1);
//     sphereShadow.scale.set(5, 3.5, 5);
//     sceneRef.current.add(sphereShadow);

//     // Create instances of CustomFrame, CustomLens, and CustomTemple
//     // const customFrame = new CustomFrame();
//     // const customLens = new CustomLens();
//     // const customTemple = new CustomTemple();

//     // Animation loop
//     const startRendering = () => {
//       requestAnimationFrame(startRendering);
//       controls.update();
//       composer.render();
//       labelRenderer.render(sceneRef.current, camera); // Render the labels
//     };

//     // Handle window resizing
//     const onWindowResize = () => {
//       camera.aspect = window.innerWidth / window.innerHeight;
//       camera.updateProjectionMatrix();
//       renderer.setSize(window.innerWidth * 0.6, window.innerHeight);
//       composer.setSize(window.innerWidth * 0.6, window.innerHeight);
//       labelRenderer.setSize(window.innerWidth * 0.6, window.innerHeight);
//     };
//     window.addEventListener("resize", onWindowResize);

//     // Cleanup on unmount
//     return () => {
//       window.removeEventListener("resize", onWindowResize);
//       controls.dispose();
//       // document.body.removeChild(labelRenderer.domElement);
//     };
//   }, []);

//   useEffect(() => {
//     handleSelectSection();
//   }, [vreeStore.selectedSection]);

//   const handleSelectSection = () => {
//     switch (vreeStore.selectedSection) {
//       case "frame":
//         handleSelectFrame();
//         break;
//       case "temple":
//         handleSelectTemple();
//         break;
//       case "lenses":
//         handleSelectLenses();
//         break;
//       default:
//         break;
//     }
//   };

//   const handleSelectFrame = () => {
//     vreeStore.selectedSection = "frame";
//     if (vreeStore.frameMesh) {
//       outlineManagerRef.current.setSelectedObjects([vreeStore.frameMesh]);
//     } else {
//       console.warn("Frame mesh not loaded yet.");
//     }
//   };

//   const handleSelectLenses = () => {
//     vreeStore.selectedSection = "lenses";
//     if (vreeStore.lensesMesh) {
//       outlineManagerRef.current.setSelectedObjects(vreeStore.lensesMesh);
//     } else {
//       console.warn("Lenses mesh not loaded yet.");
//     }
//   };

//   const handleSelectTemple = () => {
//     vreeStore.selectedSection = "temple";
//     if (vreeStore.templeMesh) {
//       outlineManagerRef.current.setSelectedObjects(vreeStore.templeMesh);
//     } else {
//       console.warn("Temple mesh not loaded yet.");
//     }
//   };

//   // Add labels to the scene
//   const addLabelsToScene = (labels) => {
//     labels.forEach((label) => {
//       sceneRef.current.add(label); // Add to the scene
//       // Add click event listener for the label
//       label.element.addEventListener('click', (e) => {
//         handleLabelClick(label);
//       });
//     });
//   };

//   const handleLabelClick = (label) => {
//     // You can access the label name or other attributes to trigger actions
//     console.log(`Label ${label.name} clicked!`);
//     vreeStore.setSelectedSection(label.name); // Update the selected section
//   };

//   return (
//     <div>
//       <canvas ref={canvasRef} className="webgl min-h-screen" />
//       <Labels addToScene={addLabelsToScene} />
//     </div>
//   );
// });

// export default MainCanvasVree;



