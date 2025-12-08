import Layout from "../compornents/Layout";
import Button from "../compornents/Button";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  // 現在年月を取得
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1; // 0-11 なので +1
  const title = `${year}年${month}月`;

  return (
    <Layout
      title={title} // 動的タイトル
      rightButtons={
        <>
            <Button label="メンバー" onClick={() => navigate("/member")} />
            <Button label="スケジュール" onClick={() => navigate("/schedule")} />
        </>
      }
    >
      <div className="flex flex-col items-center gap-4 mt-10">
      </div>
    </Layout>
  );
}

export default Home;
