// src/pages/Home.tsx
import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";

import Layout from "../compornents/Layout";
import Button from "../compornents/Button";
import Calendar from "../compornents/Calendar";
import ScheduleOverrideDrawer from "../compornents/ScheduleOverrideDrawer";
import { db } from "../../firebase";

import { createCalendarEvents } from "../utils/createCalendarEvents";
import type { CalendarEvent } from "../types/calendar";
import type { Trigger } from "../types/trigger";
import type { ScheduleOverride } from "../types/scheduleOverride";

function Home() {
  const navigate = useNavigate();

  const [calendarTitle, setCalendarTitle] = useState("");
  const [events, setEvents] = useState<CalendarEvent[]>([]);

  /** Drawer 制御 */
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(
    null,
  );

  /** スケジュール取得 */
  const fetchSchedules = useCallback(async () => {
    /** triggers */
    const triggerSnap = await getDocs(collection(db, "triggers"));
    const triggers: Trigger[] = triggerSnap.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<Trigger, "id">),
    }));

    /** overrides */
    const overrideSnap = await getDocs(collection(db, "scheduleOverrides"));
    const overrides: ScheduleOverride[] = overrideSnap.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<ScheduleOverride, "id">),
    }));

    /** イベント生成 */
    const calendarEvents = createCalendarEvents(triggers, overrides);
    setEvents(calendarEvents);
  }, []);

  /** 初回ロード */
  useEffect(() => {
    fetchSchedules();
  }, [fetchSchedules]);

  /** 予定クリック */
  const handleEventClick = (event: CalendarEvent) => {
    setSelectedEvent(event);
    setDrawerOpen(true);
  };

  return (
    <Layout
      title={calendarTitle}
      rightButtons={
        <>
          <Button
            icon={<img src="../public/PeopleIcon.png" alt="icon" />}
            label="メンバー"
            onClick={() => navigate("/member")}
          />
          <Button
            icon={<img src="../public/CalendarIcon.png" alt="icon" />}
            label="スケジュール"
            onClick={() => navigate("/schedule")}
          />
        </>
      }
    >
      <div className="flex flex-col items-center">
        <Calendar
          events={events}
          onMonthChange={setCalendarTitle}
          onEventClick={handleEventClick}
        />
      </div>

      {/* ===== 単発変更 Drawer ===== */}
      {selectedEvent && (
        <ScheduleOverrideDrawer
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          triggerId={selectedEvent.triggerId}
          date={selectedEvent.date}
          name={selectedEvent.title}
          initialWorkType={selectedEvent.workType}
          onSaved={fetchSchedules} // ← 再取得
        />
      )}
    </Layout>
  );
}

export default Home;
