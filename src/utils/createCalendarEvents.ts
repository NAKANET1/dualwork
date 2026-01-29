// src/utils/createCalendarEvents.ts
import type { Trigger } from "../types/trigger";
import type { CalendarEvent } from "../types/calendar";
import type { ScheduleOverride } from "../types/scheduleOverride";

export function createCalendarEvents(
  triggers: Trigger[],
  overrides: ScheduleOverride[],
): CalendarEvent[] {
  const events: CalendarEvent[] = [];

  /** override 検索用Map */
  const overrideMap = new Map<string, ScheduleOverride>();
  overrides.forEach((o) => {
    overrideMap.set(`${o.triggerId}_${o.date}`, o);
  });

  triggers.forEach((t) => {
    if (!t.enabled) return;

    const start = new Date(t.startDate);
    const end = t.endDate ? new Date(t.endDate) : addDays(start, 30);

    /** ======================
     * CALENDAR
     * ====================== */
    if (t.cycleType === "CALENDAR") {
      /** 単発 */
      if (t.repeatType === "1回") {
        if (isWeekday(start)) {
          pushEvent(events, t, formatDate(start), overrideMap);
        }
        return;
      }

      for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
        if (!isWeekday(d)) continue;

        if (t.repeatType === "毎日") {
          pushEvent(events, t, formatDate(d), overrideMap);
        }

        if (t.repeatType === "毎週") {
          const weekMap = ["日", "月", "火", "水", "木", "金", "土"];
          const day = weekMap[d.getDay()];
          if (t.weekdays?.[day]) {
            pushEvent(events, t, formatDate(d), overrideMap);
          }
        }
      }
    }

    /** ======================
     * DAY_CYCLE（平日基準）
     * ====================== */
    if (t.cycleType === "DAY_CYCLE") {
      const cycleLength = t.onDays + t.offDays;
      let workIndex = 0;

      for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
        if (!isWeekday(d)) continue;

        const isWorkDay = workIndex % cycleLength < t.onDays;
        if (isWorkDay) {
          pushEvent(events, t, formatDate(d), overrideMap);
        }
        workIndex++;
      }
    }
  });

  return events;
}

/** ======================
 * event生成（override反映）
 * ====================== */
function pushEvent(
  events: CalendarEvent[],
  trigger: Trigger,
  date: string,
  overrideMap: Map<string, ScheduleOverride>,
) {
  const override = overrideMap.get(`${trigger.id}_${date}`);

  const workType = override?.workType ?? trigger.workType;
  const backgroundColor = workType === "在宅" ? "#fca96d" : "#6ba4ff";

  events.push({
    title: trigger.name,
    date,
    backgroundColor,
    triggerId: trigger.id,
    workType,
  });
}

/** utilities */
function isWeekday(date: Date): boolean {
  const d = date.getDay();
  return d >= 1 && d <= 5;
}

function formatDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

function addDays(date: Date, days: number): Date {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}
