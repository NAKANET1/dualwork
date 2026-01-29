import Layout from "../compornents/Layout";
import Button from "../compornents/Button";
import { useNavigate } from "react-router-dom";
import { ReusableTable } from "../compornents/ReusableTable";
import type { Column } from "../compornents/ReusableTable";

import { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";

/** Firestore 実体 */
type ScheduleEntity = {
  id: string;
  name: string;
  workType: string;
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

/** 一覧表示用 */
type ScheduleRow = {
  id: string;
  name: string;
  workType: string;
  trigger: string;
  start: string;
  end: string;
  enabled: boolean;
  original: ScheduleEntity;
};

function ScheduleList() {
  const navigate = useNavigate();
  const [rows, setRows] = useState<ScheduleRow[]>([]);

  useEffect(() => {
    const fetchSchedules = async () => {
      const snapshot = await getDocs(collection(db, "triggers"));

      const list: ScheduleRow[] = snapshot.docs.map((docSnap) => {
        const d = docSnap.data();

        const entity: ScheduleEntity = {
          id: docSnap.id,
          name: d.name,
          workType: d.workType,
          cycleType: d.cycleType,
          repeatType: d.repeatType,
          interval: d.interval,
          weekdays: d.weekdays,
          onDays: d.onDays,
          offDays: d.offDays,
          startDate: d.startDate,
          endDate: d.endDate ?? null,
          enabled: d.enabled,
        };

        /** トリガー表示文字列 */
        let triggerText = "";

        if (entity.cycleType === "CALENDAR") {
          const activeDays = Object.entries(entity.weekdays)
            .filter(([, v]) => v)
            .map(([k]) => k)
            .join(",");

          triggerText =
            entity.repeatType === "1回"
              ? "1回"
              : `${entity.repeatType} / ${entity.interval}（${activeDays || "曜日指定なし"}）`;
        } else {
          triggerText = `実行 ${entity.onDays} 日 / 休止 ${entity.offDays} 日`;
        }

        return {
          id: entity.id,
          name: entity.name,
          workType: entity.workType,
          trigger: triggerText,
          start: entity.startDate,
          end: entity.endDate ?? "-",
          enabled: entity.enabled,
          original: entity,
        };
      });

      setRows(list);
    };

    fetchSchedules();
  }, []);

  // 削除
  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`${name} を削除しますか？`)) return;

    await deleteDoc(doc(db, "triggers", id));
    setRows((prev) => prev.filter((r) => r.id !== id));
  };

  const scheduleColumns: Column<ScheduleRow>[] = [
    { key: "name", label: "名前", accessor: (r) => r.name },
    { key: "workType", label: "勤務タイプ", accessor: (r) => r.workType },
    { key: "trigger", label: "トリガー", accessor: (r) => r.trigger },
    { key: "start", label: "開始日", accessor: (r) => r.start },
    { key: "end", label: "終了日", accessor: (r) => r.end },
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
          onClick={() => navigate(`/schedule-edit/${row.id}`, {})}
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
    <Layout
      title="スケジュール管理"
      rightButtons={
        <>
          <Button
            label="戻る"
            size="md"
            color="gray"
            onClick={() => navigate(-1)}
          />
          <Button
            label="スケジュール登録"
            onClick={() => navigate("/schedule-registration")}
          />
        </>
      }
    >
      <div className="w-200 mx-auto mt-10">
        <ReusableTable columns={scheduleColumns} data={rows} />
      </div>
    </Layout>
  );
}

export default ScheduleList;
