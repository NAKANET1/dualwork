// src/pages/ScheduleList.tsx
import Layout from "../compornents/Layout";
import Button from "../compornents/Button";
import { useNavigate } from "react-router-dom";
import { ReusableTable } from "../compornents/ReusableTable";
import type { Column } from "../compornents/ReusableTable";


type Schedule = {
  id: number;
  name: string;
  workType: string;
  trigger: string;
  start: string;
  end: string;
  enabled: boolean;
};

function ScheduleList() {
  const navigate = useNavigate();

  // 仮データ
  const scheduleData: Schedule[] = [
    {
      id: 1,
      name: "山田",
      workType: "出社",
      trigger: "毎週",
      start: "2025-01-01",
      end: "2025-12-31",
      enabled: true,
    },
  ];

  // 削除処理
  const handleDelete = (name: string) => {
    if (confirm(`${name} を削除しますか？`)) {
      alert(`${name} を削除しました`);
    }
  };

  // カラム設定
  const scheduleColumns: Column<Schedule>[] = [
    { key: "name", label: "名前", accessor: r => r.name },
    { key: "workType", label: "勤務タイプ", accessor: r => r.workType },
    { key: "trigger", label: "トリガー", accessor: r => r.trigger },
    { key: "start", label: "開始日", accessor: r => r.start },
    { key: "end", label: "終了日", accessor: r => r.end },
    { key: "enabled", label: "有効", accessor: r => (r.enabled ? "有効" : "無効") },
    {
      key: "edit",
      label: "編集",
      render: (row) => (
        <Button
          label="編集"
          size="sm"
          color="blue"
          onClick={() => navigate(`/schedule-edit?id=${row.id}`)}
        />
      ),
    },
    {
      key: "delete",
      label: "削除",
      render: (row) => (
        <Button
          label="削除"
          size="sm"
          color="red"
          onClick={() => handleDelete(row.name)}
        />
      ),
    },
  ];

  return (
    <Layout
      title="スケジュール管理"
      rightButtons={
        <Button
          label="スケジュール追加"
          onClick={() => navigate("/schedule-reg")}
        />
      }
    >
      <div className="w-200 mx-auto flex flex-col items-center gap-4 mt-10">
        <ReusableTable columns={scheduleColumns} data={scheduleData} />
      </div>
    </Layout>
  );
}

export default ScheduleList;
