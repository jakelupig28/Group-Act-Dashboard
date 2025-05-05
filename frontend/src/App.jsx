
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import Dashboard from "./Dashboard";
import Dashboard1 from "./Dashboard1";
import Dashboard2 from "./Dashboard2";
import Dashboard3 from "./Dashboard3";
import Dashboard4 from "./Dashboard4";
import Dashboard5 from "./Dashboard5";
import Staff from "./Staff";
import Staff2 from "./Staff2";
import Staff3 from "./Staff3";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/staff" element={<Staff />} />
        <Route path="/staff2" element={<Staff2/>} />
        <Route path="/staff3" element={<Staff3 />} />
     
     
        <Route path="/admin1" element={<Dashboard1 />} />
        <Route path="/admin2" element={<Dashboard2 />} />
        <Route path="/admin3" element={<Dashboard3 />} />
        <Route path="/admin4" element={<Dashboard4 />} />
        <Route path="/admin5" element={<Dashboard5 />} />
      </Routes>
    </Router>
  );
}

export default App;
