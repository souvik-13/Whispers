import { BrowserRouter, Routes, Route } from "react-router-dom";

import Footer from "./partials/Footer"
import Navbar from "./partials/Navbar"
import Home from "./views/Home";
import Register from "./views/Register";
import Login from "./views/Login";
import Secrets from "./views/Secrets";
import Logout from "./views/Logout";
import Submit from "./views/Submit";

function App() {
  return (
    <>
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/secrets" element={<Secrets />} />
          <Route path="/submit" element={<Submit />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </>
  )
}

export default App
