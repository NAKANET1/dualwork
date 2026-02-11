import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';

import Layout from '../compornents/Layout';
import Button from '../compornents/Button';
import Calendar from '../compornents/Calendar';
import ScheduleOverrideDrawer from '../compornents/ScheduleOverrideDrawer';
import { db } from '../../firebase';

import { createCalendarEvents } from '../utils/createCalendarEvents';
import type { CalendarEvent } from '../types/calendar';
import type { Trigger } from '../types/trigger';
import type { ScheduleOverride } from '../types/scheduleOverride';

function Home() {
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const [calendarTitle, setCalendarTitle] = useState('');
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [range, setRange] = useState<{ start: Date; end: Date } | null>(null);

  /** Drawer 制御 */
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);

  /** スケジュール取得 */
  const fetchSchedules = useCallback(async () => {
    if (!range) return;

    setLoading(true); // ← 開始
    const triggerSnap = await getDocs(collection(db, 'triggers'));
    const triggers: Trigger[] = triggerSnap.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<Trigger, 'id'>),
    }));

    const overrideSnap = await getDocs(collection(db, 'scheduleOverrides'));
    const overrides: ScheduleOverride[] = overrideSnap.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<ScheduleOverride, 'id'>),
    }));

    /** イベント生成 */
    const calendarEvents = createCalendarEvents(triggers, overrides, range.start, range.end);

    setEvents(calendarEvents);
    setLoading(false);
  }, [range]);

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
            onClick={() => navigate('/member')}
          />
          <Button
            icon={<img src="../public/CalendarIcon.png" alt="icon" />}
            label="スケジュール"
            onClick={() => navigate('/schedule')}
          />
        </>
      }
    >
      <div className="relative flex flex-col items-center min-h-[500px] justify-center">
        {/* ===== Calendar は常に存在させる ===== */}
        <Calendar
          events={events}
          onMonthChange={(title, start, end) => {
            setCalendarTitle(title);
            setRange({ start, end });
          }}
          onEventClick={handleEventClick}
        />

        {/* ===== Loading Overlay ===== */}
        {loading && (
          <div className="absolute inset-0 bg-white/70 flex flex-col items-center justify-center z-10">
            <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin" />
            <p className="mt-4 text-gray-600">スケジュールを読み込み中...</p>
          </div>
        )}
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
          onSaved={fetchSchedules}
        />
      )}
    </Layout>
  );
}

export default Home;
