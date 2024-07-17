import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import ListRecipe from "./pages/ListRecipe";
import DetailRecipe from "./pages/DetailRecipe";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<ListRecipe />}></Route>
        <Route exact path="/:id" element={<DetailRecipe />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
