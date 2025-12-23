import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../compornents/Layout";
import Button from "../compornents/Button";
import Calendar from "../compornents/Calendar";

function Home() {
  const navigate = useNavigate();
  const [calendarTitle, setCalendarTitle] = useState("");

  return (
    <Layout
      title={calendarTitle}
      rightButtons={
        <>
          <Button
            icon={
              <img src="../public/PeopleIcon.png" alt="icon"/>
            }
            label="メンバー"
            onClick={() => navigate("/member")}
          />
          <Button icon={<img src="../public/CalendarIcon.png" alt="icon"/>
            }label="スケジュール" onClick={() => navigate("/schedule")} />
        </>
      }
    >
      <div className="flex flex-col items-center">
        {/* 月が変わるとタイトルが更新される */}
        <Calendar onMonthChange={(title) => setCalendarTitle(title)} />
      </div>
    </Layout>
  );
}

export default Home;
