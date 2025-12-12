import Layout from "../compornents/Layout";
import ScheduleTable from "../compornents/ScheduleTable";
import Button from "../compornents/Button";
import { useNavigate, useLocation } from "react-router-dom";

function ScheduleEdit() {
  const navigate = useNavigate();
  const location = useLocation();
  const schedule = location.state?.schedule; // 編集対象のデータ
  const nameList = location.state?.nameList || []; // 名前一覧も受け取る

  return (
    <Layout title="スケジュール編集">
      <div className="mt-6">
        <ScheduleTable
          nameList={nameList}
          initialName={schedule?.name}
          initialWorkType={schedule?.workType}
          initialRepeatType={schedule?.repeatType}
          initialInterval={schedule?.interval}
          initialWeekdays={schedule?.weekdays}
          initialStartDate={schedule?.startDate}
          initialEndDate={schedule?.endDate}
          initialEnabled={schedule?.enabled}
        />
      </div>

      <div className="flex justify-center gap-10 mt-10">
        <Button
          label="保存"
          size="lg"
          color="blue"
          onClick={() => console.log("編集保存処理実行")}
        />
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
