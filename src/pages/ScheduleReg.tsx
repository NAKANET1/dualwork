import Layout from "../compornents/Layout";
import Button from "../compornents/Button";
import { useNavigate } from "react-router-dom";

function Home() {
const navigate = useNavigate();

return (
    <Layout
    title="スケジュール登録"

    >
    <div className="flex flex-col items-center gap-4 mt-10">
    <Button label="スケジュール追加" onClick={() => navigate("/Schedule-reg")} />

    </div>
    </Layout>
);
}

export default Home;
