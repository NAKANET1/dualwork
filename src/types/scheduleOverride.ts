export type ScheduleOverride = {
  id: string;
  triggerId: string;
  date: string;
  workType: "在宅" | "出勤";
};
