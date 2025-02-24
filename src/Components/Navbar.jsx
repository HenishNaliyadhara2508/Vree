import React from "react";

const Navbar = () => {
  return (
    <>
      <div className="absolute top-0 left-0 right-0 m-5 ">
        <div className="flex justify-between">
          <img src="/assets/logo/logo.svg" alt="Vree" className="h-12" />

          <img src="/assets/icons/sun.png" alt="Vree" className="h-12" />
        </div>
      </div>
    </>
  );
};

export default Navbar;
