import { useEffect, useState } from 'react';

type Weekdays = {
  月: boolean;
  火: boolean;
  水: boolean;
  木: boolean;
  金: boolean;
};

export type ScheduleFormData = {
  name: string;
  workType: string;
  cycleType: 'CALENDAR' | 'DAY_CYCLE';
  repeatType: string;
  interval: number;
  weekdays: Weekdays;
  onDays: number;
  offDays: number;
  startDate: string;
  endDate: string;
  enabled: boolean;
};

type ScheduleTableProps = {
  nameList: string[];

  initialName?: string;
  initialWorkType?: string;
  initialRepeatType?: string;
  initialInterval?: number;
  initialWeekdays?: Weekdays;
  initialStartDate?: string;
  initialEndDate?: string;
  initialEnabled?: boolean;

  onChange: (data: ScheduleFormData) => void;
};

function ScheduleTable({
  nameList,
  initialName = '',
  initialWorkType = '在宅',
  initialRepeatType = '1回',
  initialInterval = 0,
  initialWeekdays = { 月: false, 火: false, 水: false, 木: false, 金: false },
  initialStartDate = '',
  initialEndDate = '',
  initialEnabled = true,
  onChange,
}: ScheduleTableProps) {
  /** 基本情報 */
  const [name, setName] = useState(initialName);
  const [workType, setWorkType] = useState(initialWorkType);

  /** 繰り返し方式 */
  const [cycleType, setCycleType] = useState<'CALENDAR' | 'DAY_CYCLE'>('CALENDAR');

  /** 曜日・週単位 */
  const [repeatType, setRepeatType] = useState(initialRepeatType);
  const [interval, setInterval] = useState(initialInterval);
  const [weekdays, setWeekdays] = useState(initialWeekdays);

  /** 日数パターン */
  const [onDays, setOnDays] = useState(1);
  const [offDays, setOffDays] = useState(0);

  /** 期間・状態 */
  const [startDate, setStartDate] = useState(initialStartDate);
  const [endDate, setEndDate] = useState(initialEndDate);
  const [enabled, setEnabled] = useState(initialEnabled);

  useEffect(() => {
    // 1回：曜日はすべて解除
    if (repeatType === '1回') {
      setWeekdays({
        月: false,
        火: false,
        水: false,
        木: false,
        金: false,
      });
      setEndDate('');
      return;
    }

    // 毎日：平日（月〜金）を強制ON
    if (repeatType === '毎日') {
      setWeekdays({
        月: true,
        火: true,
        水: true,
        木: true,
        金: true,
      });
      return;
    }

    // 毎週・毎月：ここでは何もしない（ユーザー操作を尊重）
  }, [repeatType]);

  /** 曜日切替 */
  const toggleWeekday = (day: keyof Weekdays) => {
    setWeekdays((prev) => ({ ...prev, [day]: !prev[day] }));
  };

  /** 親へ常に最新状態を通知 */
  useEffect(() => {
    onChange({
      name,
      workType,
      cycleType,
      repeatType,
      interval,
      weekdays,
      onDays,
      offDays,
      startDate,
      endDate,
      enabled,
    });
  }, [
    name,
    workType,
    cycleType,
    repeatType,
    interval,
    weekdays,
    onDays,
    offDays,
    startDate,
    endDate,
    enabled,
    onChange,
  ]);

  return (
    <div className="w-200 mx-auto">
      <table className="w-full border-collapse border border-gray-300">
        <tbody>
          {/* 名前 */}
          <tr>
            <td className="border border-gray-300 p-3 bg-gray-100 w-1/3">名前</td>
            <td className="border border-gray-300 p-3">
              <select
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border border-gray-300 rounded p-2 w-full"
              >
                <option value="">選択してください</option>
                {nameList.map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
            </td>
          </tr>

          {/* 勤務タイプ */}
          <tr>
            <td className="border border-gray-300 p-3 bg-gray-100">勤務タイプ</td>
            <td className="border border-gray-300 p-3">
              {['在宅', '出社'].map((type) => (
                <label key={type} className="mr-4 cursor-pointer">
                  <input
                    type="radio"
                    value={type}
                    checked={workType === type}
                    onChange={(e) => setWorkType(e.target.value)}
                  />{' '}
                  {type}
                </label>
              ))}
            </td>
          </tr>

          {/* 繰り返し方式 */}
          <tr>
            <td className="border border-gray-300 p-3 bg-gray-100">繰り返し方法</td>
            <td className="border border-gray-300 p-3">
              <label className="mr-4 cursor-pointer">
                <input type="radio" checked={cycleType === 'CALENDAR'} onChange={() => setCycleType('CALENDAR')} />{' '}
                曜日・週単位
              </label>
              <label className="cursor-pointer">
                <input type="radio" checked={cycleType === 'DAY_CYCLE'} onChange={() => setCycleType('DAY_CYCLE')} />{' '}
                日数パターン
              </label>
            </td>
          </tr>

          {/* 曜日・週単位 */}
          {cycleType === 'CALENDAR' && (
            <>
              <tr>
                <td className="border border-gray-300 p-3 bg-gray-100">繰り返し</td>
                <td className="border border-gray-300 p-3">
                  {['1回', '毎日', '毎週', '毎月'].map((type) => (
                    <label key={type} className="mr-4 cursor-pointer">
                      <input
                        type="radio"
                        value={type}
                        checked={repeatType === type}
                        onChange={(e) => setRepeatType(e.target.value)}
                      />{' '}
                      {type}
                    </label>
                  ))}
                </td>
              </tr>

              <tr>
                <td className="border border-gray-300 p-3 bg-gray-100">間隔</td>
                <td className="border border-gray-300 p-3">
                  <input
                    type="number"
                    min={0}
                    value={interval}
                    disabled={repeatType === '1回' || repeatType === '毎日'}
                    onChange={(e) => setInterval(Number(e.target.value || 0))}
                    className="border border-gray-300 rounded p-2 w-full disabled:bg-gray-100"
                  />
                </td>
              </tr>

              <tr>
                <td className="border border-gray-300 p-3 bg-gray-100">曜日</td>
                <td className="border border-gray-300 p-3">
                  {Object.keys(weekdays).map((day) => (
                    <label key={day} className="mr-4 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={weekdays[day as keyof Weekdays]}
                        disabled={repeatType === '1回' || repeatType === '毎日'}
                        onChange={() => toggleWeekday(day as keyof Weekdays)}
                      />{' '}
                      {day}
                    </label>
                  ))}
                </td>
              </tr>
            </>
          )}

          {/* 日数パターン */}
          {cycleType === 'DAY_CYCLE' && (
            <tr>
              <td className="border border-gray-300 p-3 bg-gray-100">日数パターン</td>
              <td className="border border-gray-300 p-3">
                実行
                <input
                  type="number"
                  min={1}
                  value={onDays}
                  onChange={(e) => setOnDays(Number(e.target.value))}
                  className="border border-gray-300 rounded p-1 w-16 mx-2"
                />
                日 ／ 休止
                <input
                  type="number"
                  min={0}
                  value={offDays}
                  onChange={(e) => setOffDays(Number(e.target.value))}
                  className="border border-gray-300 rounded p-1 w-16 mx-2"
                />
                日
              </td>
            </tr>
          )}

          {/* 開始日 */}
          <tr>
            <td className="border border-gray-300 p-3 bg-gray-100">開始日</td>
            <td className="border border-gray-300 p-3">
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="border border-gray-300 rounded p-2 w-full"
              />
            </td>
          </tr>

          {/* 終了日 */}
          <tr>
            <td className="border border-gray-300 p-3 bg-gray-100">終了日</td>
            <td className="border border-gray-300 p-3">
              <input
                type="date"
                value={endDate}
                disabled={cycleType === 'CALENDAR' && repeatType === '1回'}
                onChange={(e) => setEndDate(e.target.value)}
                className="border border-gray-300 rounded p-2 w-full disabled:bg-gray-100"
              />
            </td>
          </tr>

          {/* 有効 */}
          <tr>
            <td className="border border-gray-300 p-3 bg-gray-100">有効</td>
            <td className="border border-gray-300 p-3">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={enabled} onChange={() => setEnabled(!enabled)} />
                有効
              </label>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default ScheduleTable;
