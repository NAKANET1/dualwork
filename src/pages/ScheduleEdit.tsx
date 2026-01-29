import { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../../firebase";
import {
  doc,
  getDoc,
  updateDoc,
  collection,
  getDocs,
} from "firebase/firestore";

import Layout from "../compornents/Layout";
import ScheduleTable from "../compornents/ScheduleTable";
import Button from "../compornents/Button";

type ScheduleDoc = {
  name: string;
  workType: string;
  cycleType: "CALENDAR" | "DAY_CYCLE";
  repeatType: string;
  interval: number;
  weekdays: {
    月: boolean;
    火: boolean;
    水: boolean;
    木: boolean;
    金: boolean;
  };
  onDays: number;
  offDays: number;
  startDate: string;
  endDate: string | null;
  enabled: boolean;
};

function ScheduleEdit() {
  const navigate = useNavigate();
  const { id: scheduleId } = useParams<{ id: string }>();

  const [loading, setLoading] = useState(true);
  const [nameList, setNameList] = useState<string[]>([]);
  const [scheduleData, setScheduleData] = useState<ScheduleDoc | null>(null);

  /** members 取得 */
  useEffect(() => {
    const fetchMembers = async () => {
      const snapshot = await getDocs(collection(db, "members"));
      setNameList(snapshot.docs.map((d) => d.data().name as string));
    };
    fetchMembers();
  }, []);

  /** schedule 取得 */
  useEffect(() => {
    if (!scheduleId) {
      alert("編集対象のIDが見つかりません");
      navigate(-1);
      return;
    }

    const fetchSchedule = async () => {
      try {
        const snap = await getDoc(doc(db, "triggers", scheduleId));
        if (!snap.exists()) {
          alert("データが存在しません");
          navigate(-1);
          return;
        }
        setScheduleData(snap.data() as ScheduleDoc);
      } catch (e) {
        console.error(e);
        alert("データ取得に失敗しました");
      } finally {
        setLoading(false);
      }
    };

    fetchSchedule();
  }, [scheduleId, navigate]);

  /** 保存 */
  const handleSave = useCallback(async () => {
    if (!scheduleId || !scheduleData) return;

    try {
      await updateDoc(doc(db, "triggers", scheduleId), {
        ...scheduleData,
        endDate: scheduleData.endDate || null,
      });
      alert("更新が完了しました");
      navigate(-1);
    } catch (e) {
      console.error(e);
      alert("更新に失敗しました");
    }
  }, [scheduleId, scheduleData, navigate]);

  if (loading || !scheduleData) {
    return <Layout title="スケジュール編集">読み込み中...</Layout>;
  }

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
