import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

import type { CalendarEvent } from '../types/calendar';

type CalendarProps = {
  events: CalendarEvent[];
  onMonthChange: (title: string, start: Date, end: Date) => void;
  onEventClick?: (event: CalendarEvent) => void;
};

function Calendar({ events, onMonthChange, onEventClick }: CalendarProps) {
  return (
    <div className="w-full max-w-5xl">
      <div className="relative">
        {/* ===== 凡例（headerの右側に重ねる）===== */}
        <div className="absolute right-0 top-2 z-10 flex items-center gap-4 text-base font-medium">
          {/* 在宅 */}
          <div className="flex items-center gap-2">
            <span className="text-xl">🏠</span>
            <span className="px-3 py-1 rounded bg-[#ffc194]/20 ">在宅</span>
          </div>

          {/* 出社 */}
          <div className="flex items-center gap-2">
            <span className="text-xl">🏢</span>
            <span className="px-3 py-1 rounded bg-[#6ba4ff]/20">出社</span>
          </div>
        </div>
      </div>

      {/* ===== FullCalendar ===== */}
      <div className="  w-full max-w-5xl  [&_.fc-button]:active:translate-y-[1px] [&_.fc-button]:transition">
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          locale="ja"
          height="auto"
          eventClassNames={() => 'cursor-pointer'}
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: '',
          }}
          buttonText={{
            today: '今月',
          }}
          datesSet={(arg) => {
            onMonthChange(arg.view.title, arg.view.currentStart, arg.view.currentEnd);
          }}
          events={events.map((e) => ({
            title: e.title,
            date: e.date,
            backgroundColor: e.backgroundColor,
            borderColor: e.borderColor,
            textColor: '#000000',
            extendedProps: {
              triggerId: e.triggerId,
              workType: e.workType,
              date: e.date,
              title: e.title,
            },
          }))}
          eventClick={(info) => {
            if (!onEventClick) return;

            onEventClick({
              title: info.event.title,
              date: info.event.startStr,
              backgroundColor: info.event.backgroundColor || '#000000',
              triggerId: info.event.extendedProps.triggerId,
              workType: info.event.extendedProps.workType,
            });
          }}
        />
      </div>
    </div>
  );
}

export default Calendar;
