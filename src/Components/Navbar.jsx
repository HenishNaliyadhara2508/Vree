import React, { useState } from "react";
import { vreeStore } from "../VreeStore";
import { observer } from "mobx-react-lite";

const Navbar = observer( () => {
  const toggleMode = () => {
    vreeStore.toggleDarkMode();

    // // Change background image for body based on dark mode
    if (vreeStore.isDarkMode) {
      // If it's dark mode, set the background image to dark
      document.body.style.backgroundImage = "url('/assets/background/background.png')";
      document.body.classList.remove("light-mode");
      document.body.classList.add("dark-mode");
    } else {
      // If it's light mode, set the background image to light
      document.body.style.backgroundImage = "url('/assets/background/light-background.jpg')";
      document.body.classList.remove("dark-mode");
      document.body.classList.add("light-mode");
    }
  };

  return (
    <div className="absolute top-0 left-0 right-0 m-5">
      <div className="flex justify-between">
        {/* Logo */}
        <img
          src="/assets/logo/logo.svg"
          alt="Vree"
          className="h-10"
        />

        {/* Sun/Moon icon for toggling dark mode */}
        <img
          src={vreeStore.isDarkMode ? "/assets/icons/sun.png" : "/assets/icons/moon.png"}
          alt="Toggle Dark Mode"
          className="h-10 cursor-pointer"
          onClick={toggleMode}
        />
      </div>
    </div>
  );
});

export default Navbar;
