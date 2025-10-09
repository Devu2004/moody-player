import { useState } from "react";
import CameraFeed from "./components/CameraFeed";

function App() {
  const [Song, setSong] = useState([]); // Empty array 

  return (
    <>
      <CameraFeed setSong={setSong} Song={Song} />
    </>
  );
}

export default App;
