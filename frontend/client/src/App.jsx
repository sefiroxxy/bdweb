import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "/src/components/Home.jsx";
import Login from "/src/components/Login.jsx";
import Navbar from "/src/components/Navbar.jsx";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
