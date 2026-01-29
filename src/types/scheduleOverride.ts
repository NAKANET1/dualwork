export type ScheduleOverride = {
  id: string;
  triggerId: string;
  date: string; // YYYY-MM-DD
  workType: "在宅" | "出勤";
};
