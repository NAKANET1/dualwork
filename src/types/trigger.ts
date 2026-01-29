export type Trigger = {
  id: string;
  name: string;
  workType: "在宅" | "出勤";
  cycleType: "CALENDAR" | "DAY_CYCLE";
  repeatType: string;
  interval: number;
  weekdays: { [key: string]: boolean };
  onDays: number;
  offDays: number;
  startDate: string;
  endDate: string | null;
  enabled: boolean;
};
