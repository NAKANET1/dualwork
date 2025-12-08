import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Usecase from "./pages/Usecase";
import Home from "./pages/Home";
import Member from "./pages/Member";
import MemberReg from "./pages/MemberReg";
import MemberEdit from "./pages/MemberEdit";
import Schedule from "./pages/Schedule";
import ScheduleReg from "./pages/ScheduleReg";
import ScheduleEdit from "./pages/ScheduleEdit";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/usecase" element={<Usecase />} />
        <Route path="/" element={<Home />} />
        <Route path="/member" element={<Member />} />
        <Route path="/member-reg" element={<MemberReg />} />
        <Route path="/member-edit" element={<MemberEdit />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/schedule-reg" element={<ScheduleReg />} />
        <Route path="/schedule-edit" element={<ScheduleEdit />} />
      </Routes>
    </Router>
  );
}

export default App;
