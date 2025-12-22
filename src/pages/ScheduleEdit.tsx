import Layout from "../compornents/Layout";
import ScheduleTable from "../compornents/ScheduleTable";
import Button from "../compornents/Button";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";

import { db } from "../../firebase";
import { doc, updateDoc } from "firebase/firestore";

/**
 * Firestore に保存するスケジュールドキュメント型
 * ※ id はドキュメントパスで管理するため含めない
 */
type ScheduleDoc = {
  name: string;
  workType: string;
  repeatType: string;
  interval: number;
  weekdays: {
    月: boolean;
    火: boolean;
    水: boolean;
    木: boolean;
    金: boolean;
  };
  startDate: string;
  endDate: string | null;
  enabled: boolean;
};

function ScheduleEdit() {
  const navigate = useNavigate();
  const location = useLocation();

  // 一覧画面から渡された編集対象
  const schedule = location.state?.schedule;
  const nameList: string[] = location.state?.nameList || [];

  // 編集中データ
  const [scheduleData, setScheduleData] = useState<ScheduleDoc>({
    name: schedule?.name ?? "",
    workType: schedule?.workType ?? "在宅",
    repeatType: schedule?.repeatType ?? "1回",
    interval: schedule?.interval ?? 1,
    weekdays: schedule?.weekdays ?? {
      月: false,
      火: false,
      水: false,
      木: false,
      金: false,
    },
    startDate: schedule?.startDate ?? "",
    endDate: schedule?.endDate ?? null,
    enabled: schedule?.enabled ?? true,
  });

  // 保存処理
  const handleSave = async () => {
    if (!schedule?.id) {
      alert("編集対象が見つかりません");
      return;
    }

    try {
      await updateDoc(doc(db, "triggers", schedule.id), {
        ...scheduleData,
        endDate: scheduleData.endDate || null,
      });

      alert("スケジュールを更新しました");
      navigate(-1);
    } catch (error) {
      console.error("更新エラー:", error);
      alert("更新に失敗しました");
    }
  };

  return (
    <Layout title="スケジュール編集">
      <div className="mt-6">
        <ScheduleTable
          nameList={nameList}
          initialName={scheduleData.name}
          initialWorkType={scheduleData.workType}
          initialRepeatType={scheduleData.repeatType}
          initialInterval={scheduleData.interval}
          initialWeekdays={scheduleData.weekdays}
          initialStartDate={scheduleData.startDate}
          initialEndDate={scheduleData.endDate ?? ""}
          initialEnabled={scheduleData.enabled}
          onChange={setScheduleData}
        />
      </div>

      <div className="flex justify-center gap-10 mt-10">
        <Button label="保存" size="lg" color="blue" onClick={handleSave} />
        <Button
          label="戻る"
          size="lg"
          color="gray"
          onClick={() => navigate(-1)}
        />
      </div>
    </Layout>
  );
}

export default ScheduleEdit;
