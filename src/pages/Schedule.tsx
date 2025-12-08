import Layout from "../compornents/Layout";
import Button from "../compornents/Button";
import { useNavigate } from "react-router-dom";

function Home() {
const navigate = useNavigate();

return (
    <Layout
    title="スケジュール管理"
    rightButtons={
        <>
            <Button label="スケジュール追加" onClick={() => navigate("/Schedule-reg")} />
        </>
    }
    >
    <div className="flex flex-col items-center gap-4 mt-10">


    </div>
    </Layout>
);
}

export default Home;
