import "./App.css";
import ColorComponent from "./Components/ColorComponent";
import MainCanvasVree from "./Components/MainCanvasVree";
import TextureComponent from "./Components/TextureComponent";

function App() {
  return (
    <>
      <div className="" >
      <MainCanvasVree />
      <TextureComponent selectedSection="frame" className="" />
      <ColorComponent selectedSection="frame"/>
      </div>
    </>
  );
}

export default App;
