import Layout from "../compornents/Layout";
import Button from "../compornents/Button";
import Table from "../compornents/MemberTable"
import { useNavigate } from "react-router-dom";

function Home() {
const navigate = useNavigate();

return (
    <Layout title="メンバー編集">
          <div className="mt-6">
        <Table />
      </div>
    <div className="flex flex-row items-center  gap-4 mt-10 ">
    <Button label="メンバー" onClick={() => navigate("/member")} />
        <Button label="キャンセル" onClick={() => navigate("/member")} />
    </div>
    </Layout>
);
}

export default Home;