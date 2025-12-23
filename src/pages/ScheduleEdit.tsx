import { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom"; // location.stateよりparamsの方が一般的
import { db } from "../../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";

// タイポ修正: compornents -> components
import Layout from "../compornents/Layout";
import ScheduleTable from "../compornents/ScheduleTable";
import Button from "../compornents/Button";

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
  // URLパラメータ（/edit/:id）から取得する方が、リロードに強く一般的です
  // location.stateを使う場合は、そのままでもOKです
  const { id: scheduleId } = useParams<{ id: string }>();

  const [loading, setLoading] = useState(true);
  const [scheduleData, setScheduleData] = useState<ScheduleDoc>({
    name: "",
    workType: "工作",
    repeatType: "1回",
    interval: 1,
    weekdays: { 月: false, 火: false, 水: false, 木: false, 金: false },
    startDate: "",
    endDate: null,
    enabled: true,
  });

  // 🔹 データ取得ロジックの整理
  useEffect(() => {
    if (!scheduleId) {
      alert("編集対象のIDが見つかりません");
      navigate("/schedules"); // 一覧へ戻す
      return;
    }

    const fetchSchedule = async () => {
      try {
        const docRef = doc(db, "triggers", scheduleId);
        const snap = await getDoc(docRef);

        if (!snap.exists()) {
          alert("データが存在しません");
          navigate(-1);
          return;
        }

        // 型安全にデータをセット
        setScheduleData(snap.data() as ScheduleDoc);
      } catch (error) {
        console.error("Firestore Fetch Error:", error);
        alert("データの取得に失敗しました");
      } finally {
        setLoading(false);
      }
    };

    fetchSchedule();
  }, [scheduleId, navigate]);

  // 🔹 保存処理 (useCallbackでラップすると子要素の不要な再レンダリングを防げます)
  const handleSave = useCallback(async () => {
    if (!scheduleId) return;

    try {
      const docRef = doc(db, "triggers", scheduleId);
      // endDateの空文字ケアなど
      const submitData = {
        ...scheduleData,
        endDate: scheduleData.endDate || null,
      };

      await updateDoc(docRef, submitData);
      alert("更新が完了しました");
      navigate(-1);
    } catch (error) {
      console.error("Update Error:", error);
      alert("更新に失敗しました");
    }
  }, [scheduleId, scheduleData, navigate]);

  if (loading) {
    return <Layout title="スケジュール編集">読み込み中...</Layout>;
  }

  return (
    <Layout title="スケジュール編集">
      <div className="mt-6">
        {/* Propsを整理して渡す例 */}
        <ScheduleTable
          {...scheduleData} // プロパティ名が一致していればスプレッド構文で簡潔に書けます
          initialEndDate={scheduleData.endDate ?? ""}
          onChange={setScheduleData}
          nameList={[]} // 必要に応じて
        />
      </div>

      <div className="flex justify-center gap-10 mt-10">
        <Button label="保存" size="lg" color="blue" onClick={handleSave} />
        <Button label="戻る" size="lg" color="gray" onClick={() => navigate(-1)} />
      </div>
    </Layout>
  );
}

export default ScheduleEdit;