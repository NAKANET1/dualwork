import Layout from "../compornents/Layout";
import Button from "../compornents/Button";
import { useNavigate } from "react-router-dom";
import { ReusableTable } from "../compornents/ReusableTable";
import type { Column } from "../compornents/ReusableTable";

import { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";

type Schedule = {
  id: string;
  name: string;
  workType: string;
  trigger: string;
  start: string;
  end: string;
  enabled: boolean;
};


function ScheduleList() {
  const navigate = useNavigate();
  const [scheduleData, setScheduleData] = useState<Schedule[]>([]);

  // Firestore 取得
  useEffect(() => {
    const fetchSchedules = async () => {
      const snapshot = await getDocs(collection(db, "triggers"));

      const list: Schedule[] = snapshot.docs.map((docSnap) => {
        const d = docSnap.data();

        return {
          id: docSnap.id,
          name: d.name,
          workType: d.workType,
          trigger: `${d.repeatType}（${d.interval}）`,
          start: d.startDate,
          end: d.endDate ?? "",
          enabled: d.enabled,
        };
      });

      setScheduleData(list);
    };

    fetchSchedules();
  }, []);

  // 削除処理
  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`${name} を削除しますか？`)) return;

    await deleteDoc(doc(db, "triggers", id));
    setScheduleData((prev) => prev.filter((s) => s.id !== id));
  };

  // カラム設定
  const scheduleColumns: Column<Schedule>[] = [
    { key: "name", label: "名前", accessor: (r) => r.name },
    { key: "workType", label: "勤務タイプ", accessor: (r) => r.workType },
    { key: "trigger", label: "トリガー", accessor: (r) => r.trigger },
    { key: "start", label: "開始日", accessor: (r) => r.start },
    { key: "end", label: "終了日", accessor: (r) => r.end || "-" },
    {
      key: "enabled",
      label: "有効",
      accessor: (r) => (r.enabled ? "有効" : "無効"),
    },
    {
      key: "edit",
      label: "編集",
      render: (row) => (
        <Button
          label="編集"
          size="sm"
          color="blue"
          onClick={() =>
            navigate("/schedule-edit", {
              state: { schedule: row },
            })
          }
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
          onClick={() => handleDelete(row.id, row.name)}
        />
      ),
    },
  ];

  return (
    <Layout title="スケジュール管理">
      <div className="w-200 mx-auto mt-10">
        <ReusableTable columns={scheduleColumns} data={scheduleData} />
      </div>
    </Layout>
  );
}

export default ScheduleList;
