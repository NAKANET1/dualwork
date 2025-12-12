import Layout from "../compornents/Layout";
import MemberSettingTable from "../compornents/MemberTable";
import Button from "../compornents/Button";
import { useNavigate, useLocation } from "react-router-dom";

function MemberEdit() {
  const navigate = useNavigate();
  const location = useLocation();
  const member = location.state?.member;

  return (
    <Layout title="メンバー編集">
      <div className="mt-6">
        <MemberSettingTable
          initialName={member?.name}
          initialColor={member?.color}
          initialEnabled={member?.enabled}
        />
      </div>

      <div className="flex justify-center gap-10 mt-10">
        <Button label="保存" size="lg" color="blue" onClick={() => console.log("保存処理実行")} />
        <Button label="戻る" size="lg" color="gray" onClick={() => navigate(-1)} />
      </div>
    </Layout>
  );
}

export default MemberEdit;
