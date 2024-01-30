import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Note from "./Note";

function App() {

  
  return (
    
    <BrowserRouter>
    <div className="Side">
      <button className="Button-create-note"> Boutton pour créer des notes</button>
    </div>
      <Routes>
        <Route path="/notes" element={<Note />}></Route>
      </Routes>
    </BrowserRouter>


  );
}

export default App;
