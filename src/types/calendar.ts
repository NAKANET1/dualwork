export type CalendarEvent = {
  title: string;
  date: string;
  backgroundColor: string;

  /** 単発変更用（必須） */
  triggerId: string;
  workType: "在宅" | "出勤";
};
