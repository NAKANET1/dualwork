import { useState } from "react";

type ScheduleTableProps = {
nameList: string[];
initialName?: string;
initialWorkType?: string;
initialRepeatType?: string;
initialInterval?: number;
initialWeekdays?: {
    月: boolean;
    火: boolean;
    水: boolean;
    木: boolean;
    金: boolean;
};
initialStartDate?: string;
initialEndDate?: string;
initialEnabled?: boolean;
};

function ScheduleTable({
nameList,
initialName = "",
initialWorkType = "在宅",
initialRepeatType = "1回",
initialInterval = 1,
initialWeekdays = { 月: false, 火: false, 水: false, 木: false, 金: false },
initialStartDate = "",
initialEndDate = "",
initialEnabled = true,
}: ScheduleTableProps) {
const [name, setName] = useState(initialName);
const [workType, setWorkType] = useState(initialWorkType);
const [repeatType, setRepeatType] = useState(initialRepeatType);
const [interval, setInterval] = useState(initialInterval);
const [weekdays, setWeekdays] = useState(initialWeekdays);
const [startDate, setStartDate] = useState(initialStartDate);
const [endDate, setEndDate] = useState(initialEndDate);
const [enabled, setEnabled] = useState(initialEnabled);

const toggleWeekday = (day: keyof typeof weekdays) => {
    setWeekdays({ ...weekdays, [day]: !weekdays[day] });
};

return (
    <div className="w-200 mx-auto">
<table className="w-full border-collapse border border-gray-300">
        <tbody>
          {/* 1行目 名前 */}
        <tr>
            <td className="border border-gray-300 p-3 bg-gray-100 w-1/3">
            名前
            </td>
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

          {/* 2行目 勤務タイプ */}
        <tr>
            <td className="border border-gray-300 p-3 bg-gray-100">
            勤務タイプ
            </td>
            <td className="border border-gray-300 p-3">
            <label className="mr-3 cursor-pointer">
                <input
                className="cursor-pointer"
                type="radio"
                value="在宅"
                checked={workType === "在宅"}
                onChange={(e) => setWorkType(e.target.value)}
                />{" "}
                在宅
            </label>
            <label className="cursor-pointer">
                <input
                className="cursor-pointer"
                type="radio"
                value="出社"
                checked={workType === "出社"}
                onChange={(e) => setWorkType(e.target.value)}
                />{" "}
                出社
            </label>
            </td>
        </tr>

          {/* 3行目 繰り返し */}
        <tr>
            <td className="border border-gray-300 p-3 bg-gray-100">繰り返し</td>
            <td className="border border-gray-300 p-3 ">
            {["1回", "毎日", "毎週", "毎月"].map((type) => (
                <label key={type} className="mr-3 cursor-pointer">
                <input
                className="cursor-pointer"
                    type="radio"
                    value={type}
                    checked={repeatType === type}
                    onChange={(e) => setRepeatType(e.target.value)}
                />{" "}
                {type}
                </label>
            ))}
            </td>
        </tr>

          {/* 4行目 間隔 */}
        <tr>
            <td className="border border-gray-300 p-3 bg-gray-100">間隔</td>
            <td className="border border-gray-300 p-3">
            <input
                type="number"
                min={0}
                value={interval}
                onChange={(e) =>
                setInterval(parseInt(e.target.value || "1", 10))
                }
                className="border border-gray-300 rounded p-2 w-full"
            />
            </td>
        </tr>

          {/* 5行目 曜日 */}
        <tr>
            <td className="border border-gray-300 p-3 bg-gray-100">曜日</td>
            <td className="border border-gray-300 p-3">
            {Object.keys(weekdays).map((day) => (
                <label key={day} className="mr-5 cursor-pointer">
                <input
                    className="cursor-pointer"
                    type="checkbox"
                    checked={weekdays[day as keyof typeof weekdays]}
                    onChange={() => toggleWeekday(day as keyof typeof weekdays)}
                />{" "}
                {day}
                </label>
            ))}
            </td>
        </tr>

          {/* 6行目 開始日 */}
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

          {/* 7行目 終了日 */}
        <tr>
            <td className="border border-gray-300 p-3 bg-gray-100">終了日</td>
            <td className="border border-gray-300 p-3">
            <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="border border-gray-300 rounded p-2 w-full"
            />
            </td>
        </tr>

          {/* 8行目 有効 */}
        <tr>
            <td className="border border-gray-300 p-3 bg-gray-100">有効</td>
            <td className="border border-gray-300 p-3">
            <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                type="checkbox"
                checked={enabled}
                onChange={() => setEnabled(!enabled)}
                className="w-5 h-5"
                />
                <span>有効</span>
            </label>
            </td>
        </tr>
        </tbody>
            </table>
    </div>
);
}

export default ScheduleTable;
