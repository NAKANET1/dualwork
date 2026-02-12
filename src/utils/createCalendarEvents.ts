import type { Trigger } from '../types/trigger';
import type { CalendarEvent } from '../types/calendar';
import type { ScheduleOverride } from '../types/scheduleOverride';

export function createCalendarEvents(
  triggers: Trigger[],
  overrides: ScheduleOverride[],
  _viewStart: Date,
  viewEnd: Date,
): CalendarEvent[] {
  const events: CalendarEvent[] = [];

  // override 検索用Map
  const overrideMap = new Map<string, ScheduleOverride>();
  overrides.forEach((o) => {
    overrideMap.set(`${o.triggerId}_${o.date}`, o);
  });

  triggers.forEach((t) => {
    if (!t.enabled) return;

    // 開始日
    const start = new Date(t.startDate);

    // 無期限なら表示範囲まで
    const end = t.endDate ? new Date(t.endDate) : new Date(viewEnd);

    // カレンダー
    if (t.cycleType === 'CALENDAR') {
      // 単発
      if (t.repeatType === '1回') {
        if (isWeekday(start)) {
          pushEvent(events, t, formatDateLocal(start), overrideMap);
        }
        return;
      }

      for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
        if (!isWeekday(d)) continue;

        if (t.repeatType === '毎日') {
          pushEvent(events, t, formatDateLocal(d), overrideMap);
        }

        if (t.repeatType === '毎週') {
          const weekMap = ['日', '月', '火', '水', '木', '金', '土'];
          const day = weekMap[d.getDay()];
          if (t.weekdays?.[day]) {
            pushEvent(events, t, formatDateLocal(d), overrideMap);
          }
        }
      }
    }

    // 日数パターン
    if (t.cycleType === 'DAY_CYCLE') {
      const cycleLength = t.onDays + t.offDays;
      let workIndex = 0;

      for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
        if (!isWeekday(d)) continue;

        const isWorkDay = workIndex % cycleLength < t.onDays;
        if (isWorkDay) {
          pushEvent(events, t, formatDateLocal(d), overrideMap);
        }
        workIndex++;
      }
    }
  });

  return events;
}

/** event生成（override反映）*/
function pushEvent(
  events: CalendarEvent[],
  trigger: Trigger,
  date: string,
  overrideMap: Map<string, ScheduleOverride>,
) {
  const override = overrideMap.get(`${trigger.id}_${date}`);

  const workType = override?.workType ?? trigger.workType;
  const isRemote = workType === '在宅';

  const backgroundColor = isRemote ? '#ffc194' : '#8db9ff';
  const borderColor = isRemote ? '#f97316' : '#3b82f6';

  const title = isRemote ? `🏠 ${trigger.name}` : `🏢 ${trigger.name}`;

  events.push({
    title,
    date,
    backgroundColor,
    borderColor,
    triggerId: trigger.id,
    workType,
  });
}

/** utilities */
function isWeekday(date: Date): boolean {
  const d = date.getDay();
  return d >= 1 && d <= 5;
}

function formatDateLocal(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}
