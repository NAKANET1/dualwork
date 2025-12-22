import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
        <Route path="/" element={<Home />} />
        <Route path="/member" element={<Member />} />
        <Route path="/member-registration" element={<MemberReg />} />
        <Route path="/member-edit/:id" element={<MemberEdit />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/schedule-registration" element={<ScheduleReg />} />
        <Route path="/schedule-edit" element={<ScheduleEdit />} />
      </Routes>
    </Router>
  );
}

export default App;
