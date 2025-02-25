import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { OutlinePass } from "three/examples/jsm/postprocessing/OutlinePass.js";

const OutlinePassManager = ({ scene, camera, composer, selectedMeshes }) => {
  const outlinePassRef = useRef(null);

  useEffect(() => {
    if (!scene || !camera || !composer) return; // Check if scene, camera, and composer are ready

    // Only instantiate the OutlinePass when the camera and scene are ready
    if (!outlinePassRef.current) {
      const outlinePass = new OutlinePass(
        new THREE.Vector2(window.innerWidth * 0.6, window.innerHeight),
        scene,
        camera
      );

      outlinePass.edgeStrength = 10; // Adjust the outline strength
      outlinePass.edgeGlow = 1;      // Glow effect for outlines
      outlinePass.edgeThickness = 2; // Reduce the thickness of the outline
      outlinePass.pulsePeriod = 0;   // Set pulse period to 0 if you don’t want it pulsing
      outlinePass.edgeColor = new THREE.Color(0x9013FE); // Set outline color to #9013FE

      composer.addPass(outlinePass);
      outlinePassRef.current = outlinePass;
    }

    // Update the selected meshes for outline
    if (outlinePassRef.current) {
      outlinePassRef.current.selectedObjects = selectedMeshes;
    }

  }, [scene, camera, composer, selectedMeshes]);

  return null;
};

export default OutlinePassManager;
