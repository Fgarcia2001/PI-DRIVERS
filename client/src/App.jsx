import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";
import Landing from "./Views/Landing/Landing";
import Home from "./Views/Home/Home";
import Details from "./Views/Details/Details";
import Form from "./Views/Form/Form";
import Nav from "./Components/Nav/Nav";
import About from "./Components/About/About";
function App() {
  const location = useLocation();
  return (
    <div className="App">
      {(location.pathname === "/home" && <Nav />) ||
        (location.pathname === "/about" && <Nav />)}
      <Routes>
        <Route path="/" element={<Landing />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/detail/:id" element={<Details />}></Route>
        <Route path="/create" element={<Form />}></Route>
        <Route path="/about" element={<About />}></Route>
      </Routes>
    </div>
  );
}

export default App;
