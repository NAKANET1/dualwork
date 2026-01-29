import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

import type { CalendarEvent } from "../types/calendar";

type CalendarProps = {
  events: CalendarEvent[];
  onMonthChange: (title: string) => void;
  onEventClick?: (event: CalendarEvent) => void;
};

function Calendar({ events, onMonthChange, onEventClick }: CalendarProps) {
  return (
    <div className="w-full max-w-5xl">
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        locale="ja"
        height="auto"
        /** 月が変わったときにタイトル通知 */
        datesSet={(arg) => {
          onMonthChange(arg.view.title);
        }}
        /** カレンダーに表示するイベント */
        events={events.map((e) => ({
          title: e.title,
          date: e.date,
          backgroundColor: e.backgroundColor,

          /** クリック時に必要な情報を保持 */
          extendedProps: {
            triggerId: e.triggerId,
            workType: e.workType,
            date: e.date,
            title: e.title,
          },
        }))}
        /** 予定クリック */
        eventClick={(info) => {
          if (!onEventClick) return;

          onEventClick({
            title: info.event.title,
            date: info.event.startStr,
            backgroundColor: info.event.backgroundColor || "#999",
            triggerId: info.event.extendedProps.triggerId,
            workType: info.event.extendedProps.workType,
          });
        }}
      />
    </div>
  );
}

export default Calendar;
