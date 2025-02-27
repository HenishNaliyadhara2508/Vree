import "./App.css";
import MainCanvasVree from "./Components/MainCanvasVree";
import Navbar from "./Components/Navbar";
import SideBarComponent from "./Components/SideBarComponent";

function App() {
  return (
    <>
      <div className="relative ">
        <Navbar />
        <div className="w-50">
          <MainCanvasVree />
        </div>
        <SideBarComponent />
      </div>
    </>
  );
}

export default App;
