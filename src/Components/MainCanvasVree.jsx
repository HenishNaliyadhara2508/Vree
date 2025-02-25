

// import { useRef, useEffect } from "react";
// import * as THREE from "three";
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
// import { LoaderManager } from "../AssetLoader";
// import { vreeStore } from "../VreeStore"; // Import the vreeStore
// import { observer } from "mobx-react-lite";
// import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
// import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
// import { OutlinePass } from "three/examples/jsm/postprocessing/OutlinePass.js";

// const MainCanvasVree = observer(() => {
//   const canvasRef = useRef(null);
//   const loaderRef = useRef(null); // Create a ref for the LoaderManager instance
//   const composerRef = useRef(null); // Create a ref for the EffectComposer instance
//   const outlinePassRef = useRef(null); // Create a ref for OutlinePass instance

//   useEffect(() => {
//     const scene = new THREE.Scene();
//     const camera = new THREE.PerspectiveCamera(
//       75,
//       window.innerWidth * 0.6 / window.innerHeight,
//       0.1,
//       1000
//     );
//     camera.position.z = 3;

//     // Ambient Light to provide soft light from all directions
//     const ambientLight = new THREE.AmbientLight(0xeeeeee, 5); // Soft light for general illumination
//     scene.add(ambientLight);

//     // Set up the renderer
//     const renderer = new THREE.WebGLRenderer({
//       canvas: canvasRef.current,
//       alpha: true,
//     });
//     renderer.setSize(window.innerWidth * 0.6, window.innerHeight);

//     // Set up asset loader
//     const loader = new LoaderManager();
//     loader.setScene(scene);

//     loader.setOnCompleteCallback(() => {
//       startRendering();
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
//     const renderPass = new RenderPass(scene, camera);
//     composer.addPass(renderPass);

//     // OutlinePass setup
//     const outlinePass = new OutlinePass(
//       new THREE.Vector2(window.innerWidth * 0.6, window.innerHeight),
//       scene,
//       camera
//     );
//     outlinePass.edgeStrength = 2; // Adjust the outline strength
//     outlinePass.edgeGlow = 1;      // Glow effect for outlines
//     outlinePass.edgeThickness = 1; // Reduce the thickness of the outline
//     // outlinePass.pulsePeriod = 0;   // Set pulse period to 0 if you don’t want it pulsing

//     outlinePass.visibleEdgeColor.set("#a774ff");
//     composer.addPass(outlinePass);

//     composerRef.current = composer;
//     outlinePassRef.current = outlinePass;

//     // Animation loop
//     const startRendering = () => {
//       requestAnimationFrame(startRendering);
//       controls.update();
//       composer.render();
//     };

//     // Handle window resizing
//     const onWindowResize = () => {
//       camera.aspect = window.innerWidth / window.innerHeight;
//       camera.updateProjectionMatrix();
//       renderer.setSize(window.innerWidth * 0.6, window.innerHeight);
//       composer.setSize(window.innerWidth * 0.6, window.innerHeight);
//     };
//     window.addEventListener("resize", onWindowResize);

//     // Cleanup on unmount
//     return () => {
//       window.removeEventListener("resize", onWindowResize);
//       controls.dispose();
//     };
//   }, []);

//   const handleSelectFrame = () => {
//     // onSectionChange("frame");
//     if (vreeStore.frameMesh) {
//       outlinePassRef.current.selectedObjects = [vreeStore.frameMesh];
//       vreeStore.frameMesh.renderOrder = 1;
//       vreeStore.frameMesh.material.side = THREE.FrontSide;
//     } else {
//       console.warn("Frame mesh not loaded yet.");
//     }
//   };

//   const handleSelectLenses = () => {
//     // onSectionChange("lenses");
//     outlinePassRef.current.selectedObjects = vreeStore.lensesMesh;
//     vreeStore.lensesMesh.forEach((mesh) => {
//       mesh.renderOrder = 1;
//       mesh.material.side = THREE.FrontSide;
//     });
//   };

//   const handleSelectTemple = () => {
//     // onSectionChange("temple");
//     outlinePassRef.current.selectedObjects = vreeStore.templeMesh;
//     vreeStore.templeMesh.forEach((mesh) => {
//       mesh.renderOrder = 1;
//       mesh.material.side = THREE.FrontSide;
//     });
//   };

//   return (
//     <div>
//       <canvas ref={canvasRef} className="webgl min-h-screen" />
//       <div className="button-container space-x-4 absolute top-30 left-4">
//         <button onClick={handleSelectFrame} className="button rounded border border-violet-500 bg-violet-700"> Frame</button>
//         <button onClick={handleSelectLenses} className="button rounded border border-violet-500 bg-violet-700"> Lenses</button>
//         <button onClick={handleSelectTemple} className="button rounded border border-violet-500 bg-violet-700">Temple</button>
//       </div>
//     </div>
//   );
// });

// export default MainCanvasVree;

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
    const ambientLight = new THREE.AmbientLight(0xffffff, 1); // Soft light for general illumination
    scene.add(ambientLight);

    // Directional light for shadow casting
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5); // Position the light
    directionalLight.castShadow = true; // Enable shadow casting
    scene.add(directionalLight);

    // Set up the renderer
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
    });
    renderer.setSize(window.innerWidth * 0.6, window.innerHeight);
    renderer.shadowMap.enabled = true; // Enable shadow mapping

    // Set up asset loader
    const loader = new LoaderManager();
    loader.setScene(scene);

    loader.setOnCompleteCallback(() => {
      startRendering();
      handleSelectFrame();
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
    outlinePass.visibleEdgeColor.set("#a774ff");
    composer.addPass(outlinePass);

    composerRef.current = composer;
    outlinePassRef.current = outlinePass;

    // Create the shadow plane with MeshStandardMaterial to interact with shadows

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
    sphereShadow.scale.set(5, 3, 5);
    scene.add(sphereShadow);

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
    if (vreeStore.frameMesh) {
      outlinePassRef.current.selectedObjects = [vreeStore.frameMesh];
      vreeStore.frameMesh.renderOrder = 1; // Ensure frame mesh appears in front
      vreeStore.frameMesh.material.side = THREE.FrontSide; // Ensure only front side is rendered
      vreeStore.frameMesh.castShadow = true; // Enable shadow casting for the frame
    } else {
      console.warn("Frame mesh not loaded yet.");
    }
  };

  const handleSelectLenses = () => {
    outlinePassRef.current.selectedObjects = vreeStore.lensesMesh;
    vreeStore.lensesMesh.forEach((mesh) => {
      mesh.renderOrder = 1;
      mesh.material.side = THREE.FrontSide; // Only render the front side for lenses
      mesh.castShadow = true; // Enable shadow casting for lenses
    });
  };

  const handleSelectTemple = () => {
    outlinePassRef.current.selectedObjects = vreeStore.templeMesh;
    vreeStore.templeMesh.forEach((mesh) => {
      mesh.renderOrder = 1;
      mesh.material.side = THREE.FrontSide; // Only render the front side for temple meshes
      mesh.castShadow = true; // Enable shadow casting for temples
    });
  };

  return (
    <div>
      <canvas ref={canvasRef} className="webgl min-h-screen" />
      <div className="button-container space-x-4 absolute top-30 left-4">
        <button onClick={handleSelectFrame} className="button rounded border border-violet-500 bg-violet-700"> Frame</button>
        <button onClick={handleSelectLenses} className="button rounded border border-violet-500 bg-violet-700"> Lenses</button>
        <button onClick={handleSelectTemple} className="button rounded border border-violet-500 bg-violet-700">Temple</button>
      </div>
    </div>
  );
});

export default MainCanvasVree;


// import { useRef, useEffect } from "react";
// import * as THREE from "three";
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
// import { LoaderManager } from "../AssetLoader";
// import { vreeStore } from "../VreeStore"; // Import the vreeStore
// import { observer } from "mobx-react-lite";
// import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
// import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
// import { OutlinePass } from "three/examples/jsm/postprocessing/OutlinePass.js";
// import { CSS2DObject } from "three/examples/jsm/renderers/CSS2DRenderer.js"; // Import CSS2DObject

// const MainCanvasVree = observer(() => {
//   const canvasRef = useRef(null);
//   const loaderRef = useRef(null); // Create a ref for the LoaderManager instance
//   const composerRef = useRef(null); // Create a ref for the EffectComposer instance
//   const outlinePassRef = useRef(null); // Create a ref for OutlinePass instance

//   useEffect(() => {
//     const scene = new THREE.Scene();
//     const camera = new THREE.PerspectiveCamera(
//       75,
//       (window.innerWidth * 0.6) / window.innerHeight,
//       0.1,
//       1000
//     );
//     camera.position.z = 3;

//     // Ambient Light to provide soft light from all directions
//     const ambientLight = new THREE.AmbientLight(0xffffff, 1); // Soft light for general illumination
//     scene.add(ambientLight);

//     // Set up the renderer
//     const renderer = new THREE.WebGLRenderer({
//       canvas: canvasRef.current,
//       alpha: true,
//     });
//     renderer.setSize(window.innerWidth * 0.6, window.innerHeight);

//     // Set up asset loader
//     const loader = new LoaderManager();
//     loader.setScene(scene);

//     loader.setOnCompleteCallback(() => {
//       startRendering();
//       handleSelectSection(); // Initially, we select based on the selectedSection in vreeStore

//       // Attach buttons to the meshes after they are loaded
//       if (vreeStore.frameMesh) {
//         addButtonToMesh(vreeStore.frameMesh, "Frame", handleSelectFrame);
//       }

//       if (vreeStore.lensesMesh) {
//         vreeStore.lensesMesh.forEach((lensMesh) => {
//           addButtonToMesh(lensMesh, "Lenses", handleSelectLenses);
//         });
//       }

//       if (vreeStore.templeMesh) {
//         vreeStore.templeMesh.forEach((templeMesh) => {
//           addButtonToMesh(templeMesh, "Temple", handleSelectTemple);
//         });
//       }
//     });

//     loader.loadEnvironmentTexture(
//       "/assets/environment/brown_photostudio_02_1k.hdr"
//     );
//     loader.loadGLTFModel("/assets/glbs/sampleModel.glb");

//     // OrbitControls for camera interaction
//     const controls = new OrbitControls(camera, renderer.domElement);
//     controls.enableDamping = true;
//     controls.dampingFactor = 0.2;
//     controls.screenSpacePanning = false;

//     // Set up EffectComposer for post-processing
//     const composer = new EffectComposer(renderer);
//     const renderPass = new RenderPass(scene, camera);
//     composer.addPass(renderPass);

//     // OutlinePass setup
//     const outlinePass = new OutlinePass(
//       new THREE.Vector2(window.innerWidth * 0.6, window.innerHeight),
//       scene,
//       camera
//     );
//     outlinePass.edgeStrength = 2; // Adjust the outline strength
//     outlinePass.edgeGlow = 1; // Glow effect for outlines
//     outlinePass.edgeThickness = 1; // Reduce the thickness of the outline
//     outlinePass.visibleEdgeColor.set("#a774ff");
//     composer.addPass(outlinePass);

//     composerRef.current = composer;
//     outlinePassRef.current = outlinePass;

//     // Animation loop
//     const startRendering = () => {
//       requestAnimationFrame(startRendering);
//       controls.update();
//       composer.render();
//     };

//     // Handle window resizing
//     const onWindowResize = () => {
//       camera.aspect = window.innerWidth / window.innerHeight;
//       camera.updateProjectionMatrix();
//       renderer.setSize(window.innerWidth * 0.6, window.innerHeight);
//       composer.setSize(window.innerWidth * 0.6, window.innerHeight);
//     };
//     window.addEventListener("resize", onWindowResize);

//     // Cleanup on unmount
//     return () => {
//       window.removeEventListener("resize", onWindowResize);
//       controls.dispose();
//     };
//   }, []);

//   useEffect(() => {
//     // Call the appropriate handler when selectedSection changes
//     handleSelectSection();
//   }, [vreeStore.selectedSection]); // React to changes in vreeStore.selectedSection

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
//       outlinePassRef.current.selectedObjects = [vreeStore.frameMesh];
//       vreeStore.frameMesh.renderOrder = 1; // Ensure frame mesh appears in front
//       vreeStore.frameMesh.material.side = THREE.FrontSide; // Ensure only front side is rendered
//     } else {
//       console.warn("Frame mesh not loaded yet.");
//     }
//   };

//   const handleSelectLenses = () => {
//     vreeStore.selectedSection = "lenses";
//     outlinePassRef.current.selectedObjects = vreeStore.lensesMesh;
//     vreeStore.lensesMesh.forEach((mesh) => {
//       mesh.renderOrder = 1;
//       mesh.material.side = THREE.FrontSide; // Only render the front side for lenses
//     });
//   };

//   const handleSelectTemple = () => {
//     vreeStore.selectedSection = "temple";
//     outlinePassRef.current.selectedObjects = vreeStore.templeMesh;
//     vreeStore.templeMesh.forEach((mesh) => {
//       mesh.renderOrder = 1;
//       mesh.material.side = THREE.FrontSide; // Only render the front side for temple meshes
//     });
//   };

//   // Create button and attach to mesh
//   const createButton = (label, onClickHandler) => {
//     const button = document.createElement("button");
//     button.innerHTML = label;
//     button.className = "radio-button rounded border border-violet-500 bg-violet-700 text-white text-sm py-2 px-4 transform transition-transform duration-200 ease-in-out hover:scale-105";
//     button.onclick = onClickHandler;
//     return button;
//   };

//   // Function to add button to mesh (using CSS2DObject)
//   const addButtonToMesh = (mesh, label, onClickHandler, position = { x: 0, y: 1, z: 0 }) => {
//     const button = createButton(label, onClickHandler);
//     const buttonObject = new CSS2DObject(button);
//     buttonObject.position.set(position.x, position.y, position.z); // Adjust position relative to the mesh
//     mesh.add(buttonObject); // Add button as a child of the mesh
//   };

//   return (
//     <div>
//       <canvas ref={canvasRef} className="webgl min-h-screen" />
//     </div>
//   );
// });

// export default MainCanvasVree;


