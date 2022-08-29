import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LocalGame from "./pages/LocalGame/LocalGame";
import StartPage from "./pages/StartPage/StartPage";
import JoinPage from "./pages/JoinPage/JoinPage";
import OnlineGame from "./pages/OnlineGame/OnlineGame";

import "./style/responsive.scss";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/">
            <Route index element={<StartPage />} exact />
            <Route path="local" element={<LocalGame />} />
            <Route path="join" element={<JoinPage />} />
            <Route path="game" element={<OnlineGame />}/>
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
