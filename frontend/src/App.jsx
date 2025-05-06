
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import Dashboard from "./Dashboard";
import Dashboard1 from "./Dashboard1";
import Dashboard2 from "./Dashboard2";
import Dashboard3 from "./Dashboard3";
import Dashboard4 from "./Dashboard4";
import Dashboard5 from "./Dashboard5";
import Student from "./Student";
import Student2 from "./Student2";
import Student3 from "./Student3";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/student" element={<Student />} />
        <Route path="/student2" element={<Student2/>} />
        <Route path="/student3" element={<Student3 />} />
     
     
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
