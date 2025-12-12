import Layout from "../compornents/Layout";
import ScheduleTable from "../compornents/ScheduleTable";
import Button from "../compornents/Button";
import { useNavigate, useLocation } from "react-router-dom";

function ScheduleReg() {
  const navigate = useNavigate();
  const location = useLocation();
  const nameList = location.state?.nameList || [];

  return (
    <Layout title="スケジュール登録">
      <div className="mt-6">
        <ScheduleTable
          nameList={nameList}
          initialName=""
          initialWorkType="在宅"
          initialRepeatType="1回"
          initialInterval={1}
          initialWeekdays={{ 月: false, 火: false, 水: false, 木: false, 金: false }}
          initialStartDate=""
          initialEndDate=""
          initialEnabled={true}
        />
      </div>

      <div className="flex justify-center gap-10 mt-10">
        <Button
          label="登録"
          size="lg"
          color="blue"
          onClick={() => console.log("新規登録実行")}
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

export default ScheduleReg;
