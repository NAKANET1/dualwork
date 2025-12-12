import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import jaLocale from "@fullcalendar/core/locales/ja";

type CalendarEvent = {
  id?: string;
  title: string;
  date: string;
};

type CalendarProps = {
  events?: CalendarEvent[];
  onDateClick?: (dateStr: string) => void;
  onEventClick?: (eventId: string) => void;

  // 月変更時
  onMonthChange?: (title: string) => void;
};

function Calendar({
  events = [],
  onDateClick,
  onEventClick,
  onMonthChange,
}: CalendarProps) {
  return (
    <FullCalendar
      plugins={[dayGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      locales={[jaLocale]}
      locale="ja"
      height="auto"
      events={events}
      dateClick={(info) => onDateClick?.(info.dateStr)}
      eventClick={(info) => onEventClick?.(info.event.id!)}
      // カレンダーの月が変わる度に呼ばれる
      datesSet={(info) => {
        onMonthChange?.(info.view.title);
      }}
    />
  );
}

export default Calendar;
