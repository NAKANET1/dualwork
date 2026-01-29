import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase";
import {
  addDoc,
  collection,
  serverTimestamp,
  getDocs,
} from "firebase/firestore";

import Layout from "../compornents/Layout";
import ScheduleTable from "../compornents/ScheduleTable";
import Button from "../compornents/Button";

type ScheduleData = {
  name: string;
  workType: string;
  cycleType: "CALENDAR" | "DAY_CYCLE";
  repeatType: string;
  interval: number;
  weekdays: { [key: string]: boolean };
  onDays: number;
  offDays: number;
  startDate: string;
  endDate: string;
  enabled: boolean;
};

function ScheduleReg() {
  const navigate = useNavigate();

  /** members から取得した名前一覧 */
  const [nameList, setNameList] = useState<string[]>([]);

  /** ScheduleTable から受け取る状態 */
  const [scheduleData, setScheduleData] = useState<ScheduleData>({
    name: "",
    workType: "在宅",
    cycleType: "CALENDAR",
    repeatType: "1回",
    interval: 1,
    weekdays: { 月: false, 火: false, 水: false, 木: false, 金: false },
    onDays: 1,
    offDays: 0,
    startDate: "",
    endDate: "",
    enabled: true,
  });

  /** members 取得 */
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const snapshot = await getDocs(collection(db, "members"));
        const names = snapshot.docs.map((doc) => doc.data().name as string);
        setNameList(names);
      } catch (error) {
        console.error("members 取得エラー:", error);
      }
    };

    fetchMembers();
  }, []);

  /** 登録処理 */
  const handleRegister = async () => {
    try {
      if (!scheduleData.name) {
        return alert("名前を選択してください");
      }

      if (!scheduleData.startDate) {
        alert("開始日を選択してください");
        return;
      }
      await addDoc(collection(db, "triggers"), {
        ...scheduleData,
        endDate: scheduleData.endDate || null,
        createdAt: serverTimestamp(),
      });

      alert("スケジュールを登録しました");
      navigate(-1);
    } catch (error) {
      console.error("登録エラー:", error);
      alert("登録に失敗しました");
    }
  };

  return (
    <Layout title="スケジュール登録">
      <div className="mt-6">
        <ScheduleTable
          nameList={nameList}
          initialName=""
          initialWorkType="在宅"
          initialRepeatType="1回"
          initialInterval={1}
          initialWeekdays={{
            月: false,
            火: false,
            水: false,
            木: false,
            金: false,
          }}
          initialStartDate=""
          initialEndDate=""
          initialEnabled={true}
          onChange={setScheduleData}
        />
      </div>

      <div className="flex justify-center gap-10 mt-10">
        <Button label="登録" size="lg" color="blue" onClick={handleRegister} />
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

export default ScheduleReg;
