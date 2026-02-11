export type CalendarEvent = {
  title: string;
  date: string;
  backgroundColor: string;
  borderColor?: string;

  /** 単発変更用 */
  triggerId: string;
  workType: '在宅' | '出勤';
};
