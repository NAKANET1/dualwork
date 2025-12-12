import Layout from "../compornents/Layout";
import MemberSettingTable from "../compornents/MemberTable";
import Button from "../compornents/Button";
import { useNavigate } from "react-router-dom";

function MemberCreate() {
const navigate = useNavigate();

return (
    <Layout title="メンバー登録">
    <div className="mt-6">
        <MemberSettingTable
        initialName=""
        initialColor=""
        initialEnabled={true}
        />
    </div>

    <div className="flex justify-center gap-10 mt-10">
        <Button
        label="登録"
        size="lg" color="blue"
        onClick={() => {
            console.log("新規登録処理を実行");
        }}
        />
        <Button label="戻る" size="lg" color="gray" onClick={() => navigate(-1)} />
    </div>
    </Layout>
    );
}

export default MemberCreate;
