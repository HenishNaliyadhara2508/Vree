import { useRef, useEffect } from "react";
import * as THREE from "three";
import { CSS2DObject } from "three/examples/jsm/renderers/CSS2DRenderer.js";

const Button = ({ label, position, onClick }) => {
  const buttonRef = useRef(null);

  useEffect(() => {
    const div = document.createElement("div");
    div.className = "css2d-button"; // A simple class for button styling
    div.innerText = label;
    div.addEventListener("click", onClick);

    // Create a CSS2DObject to display the button in 3D space
    const css2dObject = new CSS2DObject(div);
    css2dObject.position.set(position.x, position.y, position.z);
    
    buttonRef.current = css2dObject;

    return () => {
      div.removeEventListener("click", onClick); // Cleanup event listener
    };
  }, [label, position, onClick]);

  return null;
};

export default Button;
